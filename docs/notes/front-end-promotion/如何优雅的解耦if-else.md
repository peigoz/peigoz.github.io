---
title: 如何优化的解耦代码里的if-else
date: 2023-03-07 19:42:39
categories:
 - 代码优化
tags:
 - 设计模式
 - web
 - 函数式编程
isShowComments: true
publish: true
---

## 前言

1. 在项目中， 我们经常会遇到这样的场景， 一个函数里面有很多的if-else， 代码的可读性和可维护性都很差， 但是又不知道怎么优化， 今天就来聊聊这个问题。

## 一个用来判断多边形形状的函数

  ```js
  // Bad
  function getShapeType (shape) {
    if (shape === 'triangle') {
      return '三角形'
    } else if (shape === 'square') {
      return '正方形'
    } else if (shape === 'circle') {
      return ' 圆形'
    } else if (shape === 'rectangle') {
      return '矩形'
    } else {
      return ' 未知形状'
    }
  }

  // Good
  function getShapeType (shape) {
    const shapeMap = {
      triangle: '三角形',
      square: '正方形',
      circle: '圆形',
      rectangle: '矩形'
    }
    return shapeMap[shape] || '未知形状'
  }
  ```
  
1. 从上面的例子可以看出， 用对象的方式来优化代码， 代码的可读性和可维护性都有了很大的提升， 当然如果语句不多的这种情况我认为用switch-case也可。至少看起来虽然不简洁，但是也不至于造成阅读障碍，不过这种方式在一些情况下还是有一些问题的，例如if-else的条件变为范围判断。如下判断年龄的函数

## 一个用来年龄的函数

```js
// Bad
function getAgeType (age) {
  if (age < 18) {
    return '未成年'
  } else if (age >= 18 && age < 30) {
    return '青年'
  } else if (age >= 30 && age < 50) {
    return '中年'
  } else if (age >= 50) {
    return '老年'
  }
}
```

1. 上面所示代码，一系列的if和判断条件，看起来很乱，而且很难维护，如果要增加一个年龄段，就要修改很多地方，这样的代码是不可取的。那么有没有更好的方法呢？
2. 有的，当条件判断比较复杂且判断语句达到一定数量以上，我一般会使管道函数的形式进行优化。

## 管道函数

1. 什么是管道函数呢?一般来说，上一个函数的 return 值会作为下一个函数的参数，这样就形成了一个管道，这种方式可以让我们的代码更加简洁，更加易读，更加易维护。

```js
// 利用reduce实现管道函数的例子如下:
function pipe (...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value)
  }
}

function add1 (x) {
  return x + 1
}

function mul2 (x) {
  return x * 2
}

const add1Mul2 = pipe(add1, mul2)
console.log(add1Mul2(5)) // (5 + 1 ) * 2 = 12
```

2. 这其实也是一种函数组合的思想,下面我分别用上面两种形式来实现上面的年龄判断函数。

```js
// 用对象形式优化年龄判断函数
function getAgeType (age) {
  const ageMap = {
    '未成年': age => age < 18,
    '青年': age => age >= 18 && age < 30,
    '中年': age => age >= 30 && age < 50,
    '老年': age => age >= 50
  }
  const ageType = Object.keys(ageMap).find(key => ageMap[key](age))
  return ageType || '未知年龄'
}

// 用管道函数优化年龄判断函数
function isYoung (age) {
  if(age < 18){
    // do something
    return '未成年'
  }

  // do something
  return age
}

function isMiddle (age) {
  if(age >= 18 && age < 30){
    // do something
    return '青年'
  }

  // do something
  return age
}

function isOld (age) {
  if(age >= 30 && age < 50){
    // do something
    return '中年'
  }

  // do something
  return age
}

function isVeryOld (age) {
  if(age >= 50){
    // do something
    return '老年'
  }

  // do something
  return age
}

function getAgeType (age) {
  const ageType = pipe(isYoung, isMiddle, isOld, isVeryOld)(age)
  return ageType === age ? '未知年龄' : ageType
}
```

3. 我们会发现，咋一看用管道函数实现起来比原来更加繁琐复杂。但是实际上，这种方式的优势在于:  
   1. 我们可以很方便的增加一个年龄段，只需要增加一个函数即可，而不需要修改其他大部分的代码，这样的代码可读性和可维护性都会更好。
   2. 我们可以很方便的对每个函数进行单元测试，这样的代码也更加健壮。
   3. 我们可以更加自由的对每一个年龄段的情况进行更多业务上的处理，而不是只是简单的返回一个字符串。如果有更多复杂的数据处理和业务，这里我们也可以使用一个context上下文来实现管道函数之间状态和数据的共享，这样的代码也更加健壮。
4. 实际业务中，我会直接使用lodash-es的flow方法， 用法和上面的pipe方法类似。类似下面的代码:

```js
import { flow } from 'lodash-es'
const lifeCycle = [isYoung, isMiddle, isOld, isVeryOld]
const getAgeType = flow(lifeCycle)

const ctx = {
  age: 18,
  name: '张三'
  // other status...
}

function isYoung (ctx) {
  if(ctx.age < 18){
    // do something
    ctx.ageType = '未成年'
  }

  // do something
  return ctx
}
```

5. 实际上，我认为这种抽离每一个条件为单独分支进行独立处理的思想，和设计模式里面的责任链模式是一致的(使用了ctx携带状态时还是一种状态机的实现)，只不过这里的责任链是通过函数的调用来实现的。这里我也贴一下责任链模式的代码，供大家参考。

## 附加: 类形式的责任链实现(参考掘金河马老师)

```js
class Chain {
  constructor(handler) {
    this.handler = handler;
    this.successor = null;
  }

  setSuccessor(successor) {
    this.successor = successor;
    return this;
  }

  passRequest(...args) {
    const ctx = this.handler(...args);
    // 这里执行后续条件判断改为上一个函数是否设置了ctx.result = 'next'
    if (ctx.result === 'next') {
      return this.successor && this.successor.passRequest(...args);
    }
    return ctx;
  }
}
const getAgeType = (age) => {
  const chainYoung = new Chain(isYoung);
  const chainMiddle = new Chain(isMiddle);
  const chainOld = new Chain(isOld);
  const chainVeryOld = new Chain(isVeryOld);

  chainYoung.setSuccessor(chainMiddle);
  chainMiddle.setSuccessor(chainOld);
  chainOld.setSuccessor(chainVeryOld);

  const ctx = chainYoung.passRequest(age);
  const ageType = ctx.ageType || '未知年龄';
};

```

## 总结

1. 我认为这种 pipe 和 flow 的方式，可以用来优化处理复杂数据流的条件判断，只要能够把每个条件判断抽象成一个函数，就可以用这种方式来优化代码。
2. 实际上这种管道函数，在更加抽象的纬度，也类似于一种中间件，这种中间件的事件，在很多知名库都有所涉及，例如webpack的plugin，koa的middleware，vue的plugin,babel插件等等，这些都是一种中间件的实现，只不过他们在这之上封装更多细节和业务上的功能。底层思想其实是类似的。这里我也贴上我的另一篇文章，[关于Koa的中间件简单实现原理]()，供大家参考。

::: right
[参考链接:代码越写越乱？那是因为你没用责任链](https://juejin.cn/post/7100859237735563301)
:::
