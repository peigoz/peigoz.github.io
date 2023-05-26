---
title: 关于Koa洋葱模型中间件底层原理简单实现
date: 2023-04-26 00:17:13
categories:
 - 代码优化
tags:
 - 函数式编程
isShowComments: true
publish: true
---

## 异步版本

1. 不调用await next()会阻塞后面流程

```js
class AsyncInterceptor {

  constructor() {
    this.aspects = [] // 用于存储拦截切面
  }

  use (/* async */ functor) { // 注册拦截切面
    this.aspects.push(functor)
    return this
  }

  async run (context) { // 执行注册的拦截切面
    const aspects = this.aspects

    // 将注册的拦截切面包装成一个洋葱模型
    const proc = aspects.reduceRight(function (a, b) { // eslint-disable-line
      return async () => {
        await b(context, a)
      }
    }, () => Promise.resolve())

    try {
      await proc() // 从外到里执行这个洋葱模型
    } catch (ex) {
      console.error(ex.message)
    }

    return context
  }

}

function wait (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const asyncInter = new AsyncInterceptor()

const task = function (id) {
  return async (ctx, next) => {
    console.log(`task ${id} begin`)
    ctx.count++
    await wait(1000)
    console.log(`count: ${ctx.count}`)
    await next()
    console.log(`task ${id} end`)
  }
}

// 将多个任务以拦截切面的方式注册到拦截器中
asyncInter.use(task(0))
asyncInter.use(task(1))
asyncInter.use(task(2))
asyncInter.use(task(3))
asyncInter.use(task(4))

// 从外到里依次执行拦截切面
asyncInter.run({ count: 0 })

// Input:
// "task 0 begin"
// "count: 1"
// "task 1 begin"
// "count: 2"
// "task 2 begin"
// "count: 3"
// "task 3 begin"
// "count: 4"
// "task 4 begin"
// "count: 5"
// "task 4 end"
// "task 3 end"
// "task 2 end"
// "task 1 end"
// "task 0 end"
```

## 同步版本

1. 在浏览器端可能我们并不希望阻塞主流程，如果不调用next()就简单跳过后面函数即可

```js
class Interceptor {

  constructor() {
    this.aspects = [] // 用于存储拦截切面
  }

  use (/* async */ functor) { // 注册拦截切面
    this.aspects.push(functor)
    return this
  }

  run (context) { // 执行注册的拦截切面
    const aspects = this.aspects

    // 将注册的拦截切面包装成一个洋葱模型
    const proc = aspects.reduceRight(function (a, b) { // eslint-disable-line
      return () => {
        b(context, a)
      }
    }, () => null)

    try {
      proc() // 从外到里执行这个洋葱模型
    } catch (ex) {
      console.error(ex.message)
    }

    return context
  }

}

const inter = new Interceptor()
inter.use((ctx, next) => {
  next()
  ctx.id = 'isEnd'
  console.log(ctx.id)
})
inter.use((ctx, next) => {
  ctx.id = 1
  console.log(ctx.id)
  next()
  ctx.id = 4
  console.log(ctx.id)
})
inter.use((ctx, next) => {
  ctx.id = 2
  console.log(ctx.id)
  // next() // 跳过后面的3和6
  ctx.id = 5
  console.log(ctx.id)
})
inter.use((ctx, next) => {
  ctx.id = 3
  console.log(ctx.id)
  next()
  ctx.id = 6
  console.log(ctx.id)
})

inter.run({ id: 0 })

// Input:
// 1
// 2
// 5
// 4
isEnd
```

::: right
参考 [从前端到全栈](https://juejin.cn/book/7133100888566005763)
:::
