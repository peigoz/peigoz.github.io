---
title: JS异步任务与事件循环
date: 2021-04-03 16:22:10
categories:
  - JavaScript
tags:
  - JavaScript
isShowComments: true
publish: true
---

## JS 事件循环

### 事件循环

1. JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。为了协调事件、用户交互、脚本、UI 渲染和网络处理等行为，防止主线程的不阻塞，Event Loop 的方案应用而生。
2. Event Loop 包含两类：一类是基于 [Browsing Context][1]，一种是基于 [Worker][2]。二者的运行是独立的，也就是说，每一个 JavaScript 运行的"线程环境"都有一个独立的 Event Loop，每一个 Web Worker 也有一个独立的 Event Loop。

> 本文所涉及到的事件循环是基于 Browsing Context。

### 任务队列

根据规范，事件循环是通过任务队列的机制来进行协调的。一个 Event Loop 中，可以有一个或者多个任务队列(task queue)，一个任务队列便是一系列有序任务(task)的集合；每个任务都有一个任务源(task source)，源自同一个任务源的 task 必须放到同一个任务队列，从不同源来的则被添加到不同队列。setTimeout/Promise 等 API 便是任务源，而进入任务队列的是他们指定的具体执行任务。

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

- 在此次 tick 中选择最先进入队列的任务(oldest task)，如果有则执行(一次)
- 检查是否存在 Microtasks，如果存在则不停地执行，直至清空 Microtasks Queue
- 更新 render
- 主线程重复执行上述步骤

在上诉 tick 的基础上需要了解几点：

- JS 分为同步任务和异步任务
- 同步任务都在主线程上执行，形成一个执行栈
- 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件。
- 一旦执行栈中的所有同步任务执行完毕（此时 JS 引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。

![Event Loop](https://blog.peigo.top/peigo/2021-03-05-16-35-53.png)

### 宏任务

(macro)task，可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

浏览器为了能够使得 JS 内部(macro)task 与 DOM 任务能够有序的执行，会在一个(macro)task 执行结束后，在下一个(macro)task 执行开始前，对页面进行重新渲染，流程如下：

```text
(macro)task->渲染->(macro)task->...
```

#### 宏任务包含

```text
script(整体代码)
setTimeout
setInterval
I/O
UI交互事件(requestAnimationFrame)
postMessage
MessageChannel
setImmediate(Node.js 环境)
```

### 微任务

microtask,可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前 task 任务后，下一个 task 之前，在渲染之前。

所以它的响应速度相比 setTimeout（setTimeout 是 task）会更快，因为无需等渲染。也就是说，在某一个 macrotask 执行完后，就会将在它执行期间产生的所有 microtask 都执行完毕（在渲染前）。

#### 微任务包含

```text
Promise.then
Object.observe(已废弃)
MutationObserver
process.nextTick(Node.js 环境)
```

### 运行机制

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
- 渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）

如图：

![运行机制](https://blog.peigo.top/peigo/2021-03-05-16-36-43.jpg)

### 总结

#### 概念

js 是单线程执行的，js 中的任务按顺序一个一个的执行，但是一个任务耗时太长，那么后面的任务就需要等待，为了解决这种情况，将任务分为了同步任务和异步任务，而异步任务又可以分为微任务(microtask )和宏任务(macrotask )。。

#### JS 事件循环机制

1. 同步和异步任务分别进入不同的执行 "场所"，同步的进入主线程，异步的进入 Event Table 并注册函数
2. 当指定的事情完成时，Event Table 会将这个函数移入 Event Queue。
3. 主线程内的任务执行完毕为空，会去 Event Queue 读取对应的函数，进入主线程执行。
4. 上述过程会不断重复，也就是常说的 Event Loop (事件循环)。

#### 宏任务微任务执行顺序

1. 在挂起任务时，JS 引擎会将所有任务按照类别分到这两个队列中
2. 首先在 macrotask 的队列（这个队列也被叫做 task queue）中取出第一个任务
3. 执行完毕后取出 microtask 队列中的所有任务顺序执行；
4. 之后再取 macrotask 任务，周而复始，直至两个队列的任务都取完

[1]: https://html.spec.whatwg.org/multipage/browsers.html#browsing-context
[2]: https://www.w3.org/TR/workers/#worker

::: right
[参考链接](https://github.com/TigerHee/shareJS)
:::
