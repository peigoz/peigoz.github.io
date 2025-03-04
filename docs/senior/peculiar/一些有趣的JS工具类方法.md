---
title: 一些有趣的JS工具方法
date: 2021-1-15 16:22:46
tags:
  - JavaScript
publish: true
---

::: tip

### 数组取随机数

:::

```javascript
/**
 *
 * @param {*} array 源数组
 * @param {*} length 打乱后的数组长度
 */
function randomArr(array, length) {
  //sort会影响原数组，进行浅拷贝
  const sortArr = [..array]
  return sortArr.sort(randomSort).slice(-length)
}
function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1
}

```

::: tip

### 时间处理函数

:::

```javascript
/**
 *
 * @param date 处理的时间戳字符串
 * @param fmt 输出格式，如yyyy-MM-dd hh:mm:ss
 */
function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
```

::: tip

### 防抖函数

:::

1. 分为非立即执行版和立即执行版。注意 this 的指向，下面用箭头函数纠正 this。
2. 使用场景:如多张图片加载时，会造成 dom 高度获取不正确，此时可以给图片绑定 load 事件，当最后一张图片加载完毕即可触发事件获取 dom 高度等

```javascript
/**
 * 非立即执行版:触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
 * @param func 防抖函数
 * @param wait 等待间隔，1000为1s
 */
function debounce(func, wait = 50) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * 立即执行版:触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
 * @param func 防抖函数
 * @param wait 等待间隔，1000为1s
 */
function debounce(func,wait) {
  let timer;
  return (...args)=>{}
      if (timer) clearTimeout(timer);

      let callNow = !timer;
      timer = setTimeout(() => {
          timer = null;
      }, wait)

      if (callNow) func.apply(this, args)
  }
}
```

::: tip

### 节流函数

:::

1. 分为时间戳版和定时器版。节流会稀释函数的执行频率。注意 this 的指向，下面用箭头函数纠正 this。
2. 使用场景:如稀释用户在 input 输入框的操作触发函数

```javascript
/**
 * 时间戳版:所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数
 * @param func 节流函数
 * @param wait 触发间隔，1000为1s
 */
function throttle(func, wait) {
  let previous = 0
  return (...args) => {
    let now = Date.now()
    if (now - previous > wait) {
      func.apply(this, args)
      previous = now
    }
  }
}

/**
 * 定时器版
 * @param func 节流函数
 * @param wait 触发间隔，1000为1s
 */
function throttle(func, wait) {
  let timer
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        func.apply(this, args)
      }, wait)
    }
  }
}
```

::: tip

### 基于防抖的节流函数

:::

1. 无论是防抖还是节流函数都有他们局限性，在用户频繁输入但是又要获取最后一次输入时的结果时，明显上面都无法满足需求，所以需要对他们进行改造。
2. 使用场景:如本地保存用户输入数据至 localStorage 或 sessionStorage，即要保证不频繁保存，又要保证保存用户最后一次输入结果。

```JavaScript

/**
 * 定时器版
 * @param func 节流函数
 * @param delay 触发间隔，1000为1s
 */
export function throttle(fn, delay=500) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0, timer = null
  // 将throttle处理结果当作函数返回

  return (...args)=> {
    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
    // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
       clearTimeout(timer)
       timer = setTimeout(function () {
          last = now
          fn.apply(this, args)
        }, delay)
    } else {
        // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
        last = now
        fn.apply(this, args)
    }
  }
}

```

::: tip

### 深拷贝函数

:::

```javascript
function deepClone(obj) {
  // 如果是 值类型 或 null，则直接return
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  // 定义结果对象
  let copy = {}

  // 如果对象是数组，则定义结果数组
  if (obj.constructor === Array) {
    copy = []
  }

  // 遍历对象的key
  for (let key in obj) {
    // 如果key是对象的自有属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用深拷贝方法
      copy[key] = deepClone(obj[key])
    }
  }

  return copy
}
```

<!-- //匹配 "字母开头-" 的字符串，如:'aaa-','bbb-'，'ccc-',并且把()匹配到的内容进行捕获，如上面例子为'aaa'，'bbb','ccc'
const ICON_REGEXP = /^(\w+\-)/
function getClass(icon) {
  console.log(ICON_REGEXP.test(icon));
  if (ICON_REGEXP.test(icon)) {
    return icon.replace(ICON_REGEXP, (...args) => {
      //第一个为匹配到的icon-,第二个为()捕获的内容，可以有多个，顺序输出，第三个为匹配对象在原对象的下标值，第四个为原字符串本身
      console.log(args); //['icon-','icon',0,'iconfont']
      return args[1] === 'reco' ? `iconfont ${args[0]}` : `${args[1]} ${args[0]}`
    })
  }
  return ''
}
console.log(getClass('icon-open iconfont')); -->
