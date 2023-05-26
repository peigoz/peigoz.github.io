---
title: Node 的 CPU 过载保护机制
date: 2021-05-24 22:50:44
categories:
  - Node
tags:
  - Node
  - 过载保护
isShowComments: true
publish: true
---

## 什么是过载保护

1. 在 Node.js 中最大的瓶颈在于 CPU，因此我们需要针对 CPU 的过载进行保护。当 CPU 使用率超出一定范围时，进行请求熔断处理，直接报错返回，在压力恢复时，正常响应用户请求。

## 实现方案

1. 实现方案前存在的几个问题:
   1. 获取当前进程所在的 CPU 使用率的方法；
   2. 应尽量避免影响服务性能；
   3. 什么时候触发过载，能否减少误处理情况；
   4. 请求丢弃方法和优先级；

### 获取 CPU 使用率

1. Node.js 进程启动后，都会绑定在单核 CPU 上。假设机器有 2 个 CPU 内核，我们只启动了一个进程，那么在没有其他外在因素影响的情况下，Node.js 即使跑满 CPU，也最多只占用了 50% 的总机器的 CPU 利用率。
2. 我们需要获取当前进程下的 CPU 使用情况，而不是整体机器的 CPU， 因此需要使用 PS 这个命令，而不是利用 Node.js 本身的 OS 模块 。

   ```text
   /* 在 Linux 或者 Mac下获取当前 Node.js 进程下的进程信息：
   *   pid 是进程 ID；
   *   rss 是实际内存占用；
   *   vsz 是虚拟内存占用；
   *   pcpu 是 CPU 使用率；
   *   comm 是进程执行的指令。
   */
   $ ps -p ${process.pid} -o pid,rss,vsz,pcpu,comm
   ```

3. 在 node 中执行修改命令，并获取执行结果的代码如下

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);
/**
 * @description 使用 ps 命令获取进程信息
 */
async _getPs() {
    // 命令行
    const cmd = `ps -p ${process.pid} -o pid,rss,vsz,pcpu,comm`;
    // 获取执行结果
    const { stdout, stderr } = await exec(cmd);
    if(stderr) { // 异常情况
      console.log(stderr);
      return false;
    }
    return stdout;
}
```

### 性能影响

1. 由于在 Node.js 就只有一个主线程，因此必须严格减少框架在主线程的占用时间，控制框架基础模块的性能损耗，从而将主线程资源更多服务于业务，增强业务并发处理能力。为了满足这点，我们需要做两件事情：
   1. 只处理需要的数据，因此在第一步获取 CPU 使用率的基础上，我们需要缩减一些字段，只获取 CPU 信息即可(即 pcpu)；
   2. 定时落地 CPU 信息到内存中，而非根据用户访问来实时计算

```js
let overloadTimes = 0
/**
* @maxOverloadNum 表示最大持续超出负载次数，当大于该值时才会判断为超出负载了
* @maxCpuPercentage 表示单次 CPU 使用率是否大于该分位值，大于则记录一次超载次数。
*/
async check(maxOverloadNum =30, maxCpuPercentage=80) {
     /// 定时处理逻辑
     setInterval(async () => {
        try {
            const cpuInfo = await this._getProcessInfo();
            if(!cpuInfo) { // 异常不处理
                return;
            }
            if(cpuInfo > maxCpuPercentage) {
                overloadTimes++;
            } else {
                overloadTimes = 0;
                return isOverload = false;
            }
            if(overloadTimes > maxOverloadNum){
                isOverload = true;
            }
        } catch(err){
            console.log(err);
            return;
        }
    }, 2000);
}

  /**
   * @description 获取进程信息
   */
  async _getProcessInfo() {
    let pidInfo, cpuInfo

    if (platform === 'win32') {
      // windows 平台
      pidInfo = await this._getWmic()
    } else {
      // 其他平台 linux & mac
      pidInfo = await this._getPs()
    }
    cpuInfo = await this._parseInOs(pidInfo)

    if (!cpuInfo || cpuInfo == '') {
      // 异常处理
      return false
    }
    /// 命令行数据，字段解析处理
    console.log(parseFloat(cpuInfo))
    return parseFloat(cpuInfo).toFixed(4)
  }

//在index.js中调用 check 方法，并且用来捕获异常，避免引起服务器崩溃。
cpuOverload.check().then().catch(err => {
  console.log(err)
});
```

### 概率丢弃

1. 在获取 CPU 值以后，我们可以根据当前 CPU 的情况进行一些丢弃处理，但是应尽量避免出现误处理的情况。比如当前 CPU 某个时刻出现了过高，但是立马恢复了，这种情况下我们是不能进行丢弃请求的，只有当 CPU 长期处于一个高负载情况下才能进行请求丢弃
2. 一般来说，判断是否需要丢弃的逻辑和概率公式如下

```js
/**
 * overloadTimes，用 o 表示，指 CPU 过载持续次数，该值越高则丢弃概率越大，设定取值范围为 0 ~ 10；overloadTimes 可以看作是直线型，但是影响系数为 0.1
 * currentCpuPercentage，用 c 表示，指 CPU 当前负载越高，占用率越大则丢弃概率越大，这里设定范围为 0 ~ 10，10 代表是最大值 100% ； currentCpuPercentage 则是一个指数型增长模型。
 * baseProbability，用 b 表示，是负载最大时的丢弃概率，取值范围为 0 ~ 1。baseProbability 我们也可以看作是直线型；但是影响系数为 1
 * 其中 o 取最大值 100，c 取最大值 10，b 为固定值，这里假设为 0.7，那么求出来的最大概率是 0.7 ；那么在 o 为 30，c 为 90 的概率则是 0.19 ，因此会丢弃 19% 的用户请求。
 */

P = ((0.1 * o * Math.exp(c)) / (10 * Math.exp(10))) * b

//将上面的 10 * Math.exp(10) 作为一个 const 值，避免重复计算,如下
/**
 * @description 获取丢弃概率
 */
_setProbability() {
     let o = overloadTimes >= 100 ? 100 : overloadTimes;
     let c = currentCpuPercentage >= 100 ? 10 : currentCpuPercentage/10;
     currentProbability = ((0.1 * o) * Math.exp(c) / maxValue * this.baseProbability).toFixed(4);
}

//最后我们在 isAvailable 函数中判断当前的随机数是否大于等于概率值，如果小于概率值则丢弃该请求，大于则认为允许请求继续访问，
isAvailable(path, uuid) {
    if(isOverload) {
      if(this._getRandomNum() <= this._getProbability()) {
          return false;
      }
      return true;
    }
    return true;
}
```

### 优先级处理

1. 在某些情况下，我们需要做一定的优化，避免一些重要的请求无法触达用户，因此还需要做一些优化级和同一个 uuid 进行优化的策略。需要考虑以下两点
   1. 优先级问题，因为有些核心的请求我们不希望用户在访问时出现丢弃的情况，比如支付或者其他核心重要的流程；
   2. 其次对于一个用户，我们允许了该用户访问其中一个接口，那么其他接口在短时间内应该也允许请求，不然会导致有些接口响应成功，有些失败，那么用户还是无法正常使用

#### 优先级的实现

1. 优先级实现最简单的方式，就是接受一个白名单参数，如果设置了则会在白名单中的请求通过处理，无须校验，如果不在才会进行检查，代码实现如下

```js
isAvailable(path, uuid) {
    if(this.whiteList.includes(path)) {
        return true;
    }
    if(isOverload) {
        if(this._getRandomNum() <= currentProbability) {
            return false;
        }
        return true;
    }
    return true;
}
```

#### uuid 处理

1. 这部分我们需要考虑以下几点
   1. 时效性，如果存储没有时效会导致存储数据过大，从而引起内存异常问题
   2. 其次应该考虑使用共享内存 Redis 方式，因为有可能是多机器部署。

```js
//这里为了简单化，会使用本地内存的方式，但是也需要考虑上限，超过上限剔除第一个元素，
isAvailable(path, uuid) {
    if(path && this.whiteList.includes(path)) { // 判断是否在白名单内
        return true;
    }
    if(uuid && canAccessList.includes(uuid)){ // 判断是否已经放行过
        return true;
    }
    if(isOverload) {
         if(this._getRandomNum() <= currentProbability) {
            removeCount++;
            return false;
          }
    }
    if(uuid) { // 需要将 uuid 加入放行数组
        if(canAccessList.length > maxUser){
            canAccessList.shift()
        }
        canAccessList.push(uuid);
    }
    return true;
}

```

## 总结

1. 随着并发越来越高，如果没有负载保护用户的处理时长会越来越长，但是有了负载保护就可以避免雪崩现象，从而保护服务器可以正常地提供服务。
