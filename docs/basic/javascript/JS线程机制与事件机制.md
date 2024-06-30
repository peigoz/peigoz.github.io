---
title: 线程机制与事件机制
date: 2021-01-25 21:27:25
tags:
  - JavaScript
publish: true
---

## 进程与线程

1. 图解：
   1. 程序 A 为多进程程序，程序 B 为单进程程序
   2. 一个进程有多个线程则为多线程程序，一个进程只有一个线程则为单线程程序（与该程序有多少个进程没有关系）
      ![进程与线程](https://blog.peigo.top/peigo/2021-01-25-21-29-04.png)

## 定时器引发的思考

### 定时器真是定时执行的吗?

1. 定时器并不能保证真正定时执行
2. 一般会延迟一丁点（可以接受），也有可能延迟很长时间（不能接受）

### 定时器回调函数是在分线程执行的吗?

1. 在主线程执行的，js 是单线程的

### 定时器是如何实现的?

1. 事件循环模型

## JS 是单线程的

### 如何证明 js 执行是单线程的?

1. `setTimeout()`的回调函数是在主线程执行的
2. 定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行

### 为什么 js 要用单线程模式，而不用多线程模式?

1. JavaScript 的单线程，与它的用途有关
2. 作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM
3. 这决定了它只能是单线程，否则会带来很复杂的同步问题
4. H5 提出了实现多线程的方案：Web Workers
5. 只能是主线程更新界面

### 代码的分类

1. 初始化代码
2. 回调代码（回调函数里面的代码）

## js 引擎执行代码的基本流程

1. 先执行初始化代码：包含一些特别的代码 回调函数（异步执行）
2. 后面在某个时刻才会执行回调函数

```javascript
setTimeout(function() {
  console.log('timeout 2222')
  alert('22222222')
}, 2000)
setTimeout(function() {
  console.log('timeout 1111')
  alert('1111111')
}, 1000)
setTimeout(function() {
  console.log('timeout() 00000')
}, 0) //回调代码，会在初始化代码执行完后的某个时刻才会执行，也就是后面的console先输出完毕再输出timeout000
function fn() {
  console.log('fn()')
}
fn()

console.log('alert()之前')
alert('------') //暂停当前主线程的执行, 同时暂停计时, 点击确定后, 恢复程序执行和继续往下计时
console.log('alert()之后')
```

## 事件循环模型

### 所有代码分类

1. 初始化执行代码（同步代码）：包含绑定 dom 事件监听，设置定时器，发送 ajax 请求的代码
2. 回调执行代码（异步代码）：处理回调逻辑

### JS 引擎执行代码的基本流程

1. 初始化代码 ==> 回调代码

### 模型的 2 个重要组成部分

1. 事件（定时器/DOM/Ajax）管理模块
2. 回调队列

### 模型的运转流程

1. 执行初始化代码，将事件回调函数交给对应模块管理
2. 当事件发生时，管理模块会将回调函数及其数据添加到回调列队中
3. 只有当初始化代码执行完毕后（可能要一定时间），才会遍历读取回调队列中的回调函数执行
4. 事件循环模型图解
   ![事件循环模型图](https://blog.peigo.top/peigo/2021-01-25-21-35-33.png)
5. 浏览器运行原理图解
   ![浏览器运行原理图解](https://blog.peigo.top/peigo/2021-01-25-21-40-27.png)

## Web Workers

1. H5 规范提供了 js 分线程的实现，取名为 Web Workers
2. 相关 API
   Worker：构造函数，加载分线程执行的 js 文件
   Worker.prototype.onmessage：用于接收另一个线程的回调函数
   Worker.prototype.postMessage：向另一个线程发送信息
3. 不足
   1. worker 内代码不能操作 DOM（全局对象不再是 window，不能更新 UI）
   2. 不能跨域加载 JS
   3. 不是每个浏览器都支持这个新特性
4. 图解
   ![Web Workers](https://blog.peigo.top/peigo/2021-01-25-21-47-59.png)

::: details

```JavaScript
 // 1 1 2 3 5 8    f(n) = f(n-1) + f(n-2)
  function fibonacci(n) {
    return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2)  //递归调用
  }
  // console.log(fibonacci(7))
  var input = document.getElementById('number')
  document.getElementById('btn').onclick = function () {
    var number = input.value
    var result = fibonacci(number)
    alert(result)
  }

  //利用Web Workers
  //流程：主线程向分线程发送数据==>分线程接收到主线程的发送的数据==>分线程向主线程返回数据==>主线程接收分线程返回的数据
    var input = document.getElementById('number')
  document.getElementById('btn').onclick = function () {
    var number = input.value

    //创建一个Worker对象
    var worker = new Worker('worker.js')  //向Worker对象中传入一个分线程文件链接路径
    // 绑定接收消息的监听
    worker.onmessage = function (event) {
      console.log('主线程接收分线程返回的数据: '+event.data)
      alert(event.data)
    }

    // 向分线程发送消息
    worker.postMessage(number)
    console.log('主线程向分线程发送数据: '+number)
  }
  // console.log(this) // window
```

```JavaScript
//分线程文件worker.js中的代码
function fibonacci(n) {
  return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2)  //递归调用
}

console.log(this)
this.onmessage = function (event) {
  var number = event.data
  console.log('分线程接收到主线程发送的数据: '+number)
  //计算
  var result = fibonacci(number)
  postMessage(result)
  console.log('分线程向主线程返回数据: '+result)
  // alert(result)  alert是window的方法, 在分线程不能调用，console是浏览器提供实现的，和window没关系
  // 分线程中的全局对象不再是window, 所以在分线程中不可能更新界面
}
```

:::
