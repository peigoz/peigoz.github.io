---
title: ES6知识点
date: 2021-03-05 15:45:06
categories:
  - JavaScript
tags:
  - JavaScript
  - ES6
isShowComments: true
publish: true
---

## let 和 const

### let const 作用域范围：块级作用域{}

```javascript
//ES6之前通过IIFE（立即执行函数）模拟块级作用域
;(function() {
  //TODO...
})()
```

### let 注意

1. 不存在变量提升,在代码块内，只要 let 定义的变量，在定义语句之前使用都会报错未定义，必须在定义语句之后使用

   ```javascript
   let a = 12
   function fn() {
     //报错a未定义，不会输出undefined或12
     alert(a) //TDZ开始，暂时性死区。
     let a = 5 //TDZ结束
   }
   fn()
   ```

2. 同一个作用域里不能重复定义变量

   ```javascript
   let a = 12
   let a = 5 //报错重复定义
   a = 5 //可重新赋值
   {
     let a = 12
     {
       let a = 5
       console.log(a) //5
     }
     console.log(a) //12
   }
   ```

3. for 循环，for 循环小括号()里面是父级作用域，大括号{}里面是子级作用域。

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc' //不会报错，不会重复定义
  console.log(i) //输出三次abc
}
```

### const 注意

1. 特性和 let 一样
2. 同一作用域 const 定义变量不能修改，但是在不同块级作用域可重新定义

   ```javascript
   const a = 12
   {
     const a = 5
     console.log(a) //5
   }
   console.log(a) //12
   ```

3. const 定义变量必须同时赋值，不能先定义再赋值
4. const 定义数组和对象时可通过方法修改,如果固定对象和数组，可通过 Object.freeze()方法冻结。

   ```javascript
   const arr = ['apple', 'banana']
   arr = [] //报错不能修改
   arr.push('orange') //arr = ['apple','banana','orange']
   const person = {
     name: zpj,
     age: 18,
   }
   person.age = 19 //可以修改
   const arr = Object.freeze(['apple', 'banana'])
   ```

### 与 var 区别

1. 用 var 在全局作用域定义一个变量,属于 window。而 let 和 const 则不属于，其存在于全局块级作用域中(打印 `new Function()` 可以看到)

## 解构赋值

### 注意

1. 左右两边解构格式必须一致
2. 解构时可以给默认值

```javascript
//给数据起别名
let [name,age:g] = ['zpj',18];
console.log(name,g)  //zpj,18,输出age会报undefined
//给没有数据的一个默认值
let [a,b,c='暂无数据'] = ['aa','bb'];
console.log(a,b,c) //aa,bb,暂无数据
let [a,b,c='暂无数据'] = ['aa','bb',undefined];
console.log(a,b,c) //aa,bb,暂无数据
function show({a,b='默认'}){
    console.log(a,b)
}
show({a:11})  //11,默认
//注意:null是一个值，只是值为null
let [a,b,c='暂无数据'] = ['aa','bb',null];
console.log(a,b,c) //aa,bb,null

//错误例子
{a,b} = {'aa','bb'} //报错，此时会把{a,b}当做块级作用域执行语法
({a,b} = {'aa','bb'}) //可使用()包起来变成语句，但是不推荐这么使用

//扩展1：利用结构赋值交换位置
let a = 12;
let b = 5;
[a,b] = [b,a]

//扩展2：处理函数返回值
function getPost(){
    //xxx
    return{
        left:2
        bottom:3
    }
}
let {left,bottom} = getPost()

//扩展3：处理模块返回值
import {a,b,c} from './mod'
```

## 字符串模版

1. 语法： `${变量}`
2. 优点：可以随意换行
3. 关于字符串的一些方法
   - 字符串查找：
     1. str.includes() 返回值 true/false
     2. str.indexOf() 有返回索引位置，没有则返回-1
     3. 判断浏览器：includes，查找单词：正则表达式
   - 字符串是否以谁开头：
     1. str.statsWith(检测信息) 返回值 true/false
     2. 正则表达式
   - 字符串是否以谁结尾：
     1. str.endsWith(检测信息) 返回值 true/false
     2. 正则表达式
   - 重复字符串：
     1. str.repeat(重复次数)
   - 填充字符串：
     1. str.padStart(整个字符串长度，填充数据) 从前面开始填充
     2. str.padEnd(整个字符串长度，填充数据) 从后面开始填充

## 函数的默认参数

1. 函数默认参数

   ```javascript
   function show({ a = 1, b = 2 } = {}) {
     console.log(a, b)
   }
   show()
   ```

2. 函数的参数（形参）默认已经定义了，不能在函数内部使用 let/const 重新定义

## 扩展运算符、rest 运算符（...）

1. 展开数组、json

   ```javascript
   let arr = ['apple', 'banana', 'orange']
   console.log(arr) //['apple','banana','orange']
   console.log(...arr) //apple banana orange
   ```

2. 重置数组、json

```javascript
//[1,2,3,4,5]  ...[1,2,3,4,5] --> 1,2,3,4,5
//1,2,3,4,5 --> ...a --> [1,2,3,4,5]
function show(a) {
  console.log(a)
}
show(1, 2, 3, 4, 5) //1
function show(...a) {
  console.log(a)
}
show(1, 2, 3, 4, 5) //[1,2,3,4,5]
//扩展：剩余参数处理，必须放在最后
function show(a, b, ...c) {
  console.log(a, b) //1,2
  console.log(c) //[3,4,5]
}
show(1, 2, 3, 4, 5)
```

## 箭头函数

### 语法:函数名= (参数)=>{函数执行语句}

### 箭头函数简写

1. 如果有且仅有一个参数，()可以不写
2. 如果函数体里面有且仅有一个语句并且是 return 语句，`{}` 和 `return` 也可以不写

```javascript
function show(a) {
  return a * a
}
//箭头函数简写
show = a => a * a
```

### 箭头函数注意点

1. this 问题，指向定义函数所在的对象，不再是运行时所在的对象。
2. 箭头函数里面没有 arguments，用 rest 运算符重置数组代替。

   ```javascript
   let show = (...args) => {
     console.log(args)
   }
   show(1, 2, 3, 4, 5)
   ```

3. 箭头函数不能当构造函数
4. 函数参数最后可以有逗号

```javascript
function show(a, b, c) {
  console.log(a, b, c)
}
show(1, 2, 3)
```

## 数组方法

### forEach

1. arr.forEach(function(val,index,arr){},[this 指向])

### map

1. `arr.map()` : '映射' 做数据交互时非常有用
2. 正常情况下，需要配合 return，返回是一个新数组
3. 若没有 return 则相当于 forEach，且返回一个数组，参数都为 undefined
4. 注意：平时只要用 map，一定要有 return
5. 作用：重新整理数据结构（后台返回 json 数据）

```javascript
let arr = [
  { title: 'aaa', read: 100, hot: true },
  { title: 'bbb', read: 100, hot: true },
  { title: 'ccc', read: 100, hot: true },
]
let newArr = arr.map((item, index, arr) => {
  let json = {}
  json.t = `我是${item.title}`
  json.r = item.read + 10
  json.hot = item.hot == true && '真棒！！'
  return json
})
console.log(newArr)
let testArr = [{ TEST: [{ a: 'test1' }] }]
obj = { b: 'test2', c: 'test3' }
testArr.forEach(item => {
  item['TEST'] = item['TEST'].map(element => {
    return { ...element, ...obj }
  })
  //相当于Object.assign(item['TEST'][0],obj)
})
console.log(testArr[0]) //{TEST:[{a:'test1',b:'test2',c:'test3'}]}
```

### filter

1. `arr.filter()` :筛选，return 返回 true 则保留对应 item

### some

1. `arr.some()`: 查找，遍历数组里面某一个条件符合条件返回 true

### every

1. `arr.every()`:查找，遍历数组里面所有元素都符合条件才返回 true

```javascript
let b = arr.some((item, index, arr) => {
  return item.title == 'aaa'
})
console.log(b) //遍历的数组有title是aaa的，所以返回true
```

### reduce

1. arr.reduce((prev,cur,index,arr)=>{return prev+cur},number[pre 的初始值])
2. 作用：用来求和、平均数、阶乘、重组数组为对象等
3. ES2017 新增幂运算符**，2 的 4 次方：2**4

```javascript
//reduce进阶用法，重组关系图,数组转对象:
//  [{name:'张三',age:18,wife:'李四'},{name:'王五',age:18,wife:'赵六'}]
//=>{'张三':{age:18,wife:'李四'},'王五':{age:18,wife:'赵六'}}
const graph = [
  { name: '张三', age: 18, wife: '李四' },
  { name: '王五', age: 18, wife: '赵六' },
]
const newGraph = graph.reduce((graph, family) => {
  return {
    ...graph,
    [family.name]: {
      age: family.age,
      wife: family.wife,
    },
  }
}, {})
```

### reduceRight

1. `arr.reduceRight()`: 与 reduce 区别在于 reduceRight 是从右往左计算的

### 以上方法接收两个函数

1. 循环回调函数，注意，当回调函数使用箭头函数形式时，this 会被固定指向当前函数所在的对象。
2. this 指向谁

### for...of

1. for...of...循环数组
   1. arr.keys() 数组下标
   2. arr.values() 数组的值
   3. arr.entries() 数组的某一项

```javascript
let arr = ['apple', 'banana', 'orange', 'tomato']
//循环数组值
for (let val of arr) {
  console.log(val)
}
//循环数组索引
for (let index of arr.keys()) {
  console.log(index)
}
//循环索引带值
for (let item of arr.entries()) {
  console.log(item) //数组4个数组，item[0]为索引，item[1]为值
}
//利用解构赋值直接输出索引和值
for (let [key, value] of arr.entries()) {
  console.log(key, value)
}
```

### find

1. `arr.find()`: 查找第一个符合条件的数组成员，如果没找到则返回 undefined

```javascript
let arr = [23, 12, 34, 60, 78, 23]
let res = arr.find((val, index, arr) => {
  return val > 60 //res = 78
})
```

### findIndex

1. `arr.findIndex()`：查找符合条件的值的位置，没找到返回-1

### fill

1. `arr.fill(res,begin,end)`：从 begin 位置开始往空数组填充数据到 end 位置为止，不包括 end 位置

### includes

1. `arr.includes()`：和字符串的 str.includes()一样
2. 区别 indexOf(),返回值不同。

### Array.from()

1. 作用：把伪数组（获取一组元素，arguments...）对象转成数组

```JavaScript
let aLi = document.querySelectorAll('ul li')
//let arrLi = [].slice.call(aLi) //ES5之前方法
//let arrLi = Array.from(aLi)  //ES6方法
let arrLi = [...aLi] //ES6方法
arrLi.pop()
console.log(arrLi)
```

### Array.of()

1. 作用：将一组值转换为数组，类似'...'重置数组

   ```javascript
   let arr = Array.of('apple', 'banana', 'orange')
   console.log(arr) //['apple', 'banana', 'orange']
   ```

## 对象

### json

1. 对象简介语法

```javascript
let name = 'Bob'
let age = 18
let json = {
    name,  //name:name
    age,   //age:age
}
/*showA:function(){
    return this.name
}*/
//不要用箭头函数，否则会改变this指向
showA(){
    return this.name
}
```

### Object.is()

1. 作用：用来比较两个值是否相等
2. 比较两个东西相等： == 、 ===

```javascript
//ES6之前
console.log(Number.isNaN(NaN))
//ES6
let b = Object.is(NaN, NaN)
console.log(b) //true
console.log(Object.is(+0, -0)) //false
```

### Object.assign(target,source1,source2...)

1. 作用：
   1. 用来合并对象（json,数组）
   2. 合并参数
2. 与...的区别:
   1. Object.assign 会改变原数据，解构赋值不会改变原数据

```javascript
let json = { a: 1 }
let json2 = { a: 2, b: 2 }
let json3 = { c: 3 }
let obj = Object.assign({}, json, json2, json3)
console.log(obj) //{a:2,b:2,c:3}后面的覆盖前面的

let obj1 = { a: 1, b: 1, c: 1 }
let obj2 = { a: 2, b: 2 }
let obj3 = Object.assign(obj1, obj2)
console.log(obj1) //{a:2,b:2,c:1} 原数据被改变
console.log(obj2) //{a:2,b:2}
console.log(obj3) //{a:2,b:2,c:1}

let obj4 = { a: 1, b: 1, c: 1 }
let obj5 = { a: 2, b: 2 }
let obj6 = { ...obj4, ...obj5 }
console.log(obj4) //{a:1,b:1,c:1} 原数据不改变
console.log(obj5) //{a:2,b:2}
console.log(obj6) //{a:2,b:2,c:1}
```

### ES2017

1. Object.keys()
2. Object.entries()
3. Object.values()
4. ...运算符
5. 以上同数组的方法一致

```javascript
let json = { a: 1, b: 2 }
let json2 = { ...json, c: 3 }
delete json2.b
console.log(json2) //{a:1,c:3}
```

## promise

### 作用

1. 解决异步回调问题(传统方式，大部分用回调函数，事件)

   ```javascript
   let a = 10
   let promise = new Promise(function(resolve, reject) {
     //resolve,  成功调用
     //reject,  失败调用
   })
   //promise.then(success,fail)
   promise.then(
     res => {
       console.log(res)
     },
     err => {
       console.log(err)
     }
   )
   promise.catch(err => {
     //reject,发生错误，别名
     console.log(err)
   })
   //利用链式编码
   new Promise.then(res => {}).catch(err => {})
   ```

### Promise.resolve(XX)

1. 将现有的对象转成一个 promise 对象，且为 resolve 成功状态

### Promise.reject(XX)

1. 将现有的对象转成一个 promise 对象，且为 reject 失败状态

   ```javascript
   let p1 = Promise.resolve('aa')
   p1.then(res => {
     console.log(res) //aa
   })
   //等价于
   let p1 = new Promise(resolve => {
     resolve('aa')
   })
   p1.then(res => {
     console.log(res)
   })
   ```

### Promise.all([p1,p2,p3])

1. 把多个 promise 放进一个数组里面，结果仍然是一个 promise 对象
2. 注意：必须确保数组里面所有的 promise 对象都是 resolve 状态才会执行 resolve 语句，否则会执行 reject 语句

   ```javascript
   let p1 = Promise.resolve('aaa')
   let p2 = Promise.resolve('bbb')
   let p3 = Promise.resolve('ccc')
   Promise.all([p1, p2, p3])
     .then(res => {
       let [res1, res2, res3] = res
       console.log(res1, res2, res3)
     })
     .catch(err => {
       console.log(err)
     })
   ```

### Promise.race([p1,p2,p3])

1. 与 all 类似，不同的是只要数组里面的 promise 对象有一个为 resolve 状态，则会执行 resolve 语句，否则执行 reject 语句

```javascript
let p = new Promise(function(resolve, reject) {
  $.ajax({
    url: 'data/1.txt',
    dataType: 'json',
    success(arr) {
      resolve(arr)
    },
    error(res) {
      reject(res)
    },
  })
})
p.then(
  function(arr) {
    alert('成功')
  },
  function(res) {
    alert('失败')
  }
)

$ajax({
  url: 'data/1.txt',
  dataType: 'json',
}).then(
  arr => {
    alert(arr)
  },
  res => {
    alert('失败')
  }
)
//使用promise.all同时读取三个文件
Promise.all([
  $ajax({ url: 'data/1.txt', dataType: 'json' }),
  ajax({ url: 'data/2.txt', dataType: 'json' }),
  ajax({ url: 'data/3.txt', dataType: 'json' }),
]).then(
  arr => {
    //(([data1,data2,data3])=>{})也可以直接在参数这里解构赋值
    let [data1, data2, data3] = arr //解构赋值
    console.log(arr)
  },
  res => {
    alert('失败')
  }
)
```

## 模块化

### 注意：需要放到服务器环境

### 如何定义模块

1. export 数据

```javascript
export const a = 13;
export{
    a as aaa.
    b as bbb
}
export default 12
```

### 如何使用模块

1. import '路径'
   1. 可以是相对路径，也可以是绝对路径
   2. import 模块只能导入一次
   3. 引入模块中数据不加{}表示引入模块的 default 并为其起别名
   4. 有提升效果，import 会自动提升至顶部，首先执行（类似函数提升）
   5. 导入的模块内容，如果模块里面有定时器更行数据，那么外部也会跟着改动，不像 Common 规范缓存。
2. import()
   1. 类似 node 中的 require,可以动态引入,默认的 import 语法不能写到 if、for 之类里面,
   2. 返回值是一个 promise 对象，可以使用 then 等方法
   3. 优点：
      1. 按需加载
      2. 可以写到 if、for 语句中
      3. 路径也可以动态
      4. 结合 promise、async、await 使用
3. 常见的模块化规范
   1. CommonJS、AMD、CMD、ES6 的 Modules

```javascript
//使用模块
<script type='module'>
    import './mode.js'
    import {aaa as apple,bbb as banana} from './mode.js'
    import * as mode1 from './mode.js'
    import a,{aaa,bbb} from './mode.js'
    //动态引入
    function config(sign){
        switch(sign){
            case 1:
                return './mode1.js'
                break
            case 2 :
                return './mode2.js'
                break
        }
    }
    import(config(1)).then(res=>{
        console.log(res.a)
    })
    //结合promise
    Promise.all([
        import('./mode1.js'),
        import('./mode2.js')
    ]).then(([mode1,mode2]) =>{
        console.log(mode1,mode2)
    })
</script>
```

## 类

### 类的写法

1. 注意：ES6 类的定义没有提升特性，必须先定义再 new，在 ES5 中构造函数模拟就可以，函数有提升特性
2. 矫正 this：
   1. fn.call(this 指向,args1,args2...)
   2. fn.apply(this 指向,[args1,args2...])
   3. fn.bind()

### class 里面取值函数（getter），存值函数（setter）

### 静态方法:类身上的方法

1. 静态方法可以被子类继承

```javascript
//ES5之前
function Person(name,age){
    this.name = name
}
Person.prototype.showName = function(){
    return this.name
}
//ES6
let aaa = 'showAge'
class Person(){  //函数表达式写法：const Person = class{}
    constructor(name,age){ //类的构造方法（函数），调用new Person时会自动执行构造方法
        this.name = name;
        this.age = age
        this.showName = this.showName.bind(this) //修正this
    }
    showName(){
        return `名字为${this.name}`
    }
    //函数名也可以使用变量形式
    [aaa](){
        return ·年龄为${this.age}·
    }
    get aaa(){
        return `获取aaa的值`
    }
    set aaa(val){
        console.log(`设置aaa的值为${val}`)
    }
    //静态方法
    static way(){
        return '类身上的静态方法'
    }
}
let p1 = new Person('Box',18)
console.log(p1.showName()，p1.showAge(),p1[aaa]())
p1.aaa = '123'  //设置aaa的值为123
console.log(p1.aaa)  //获取aaa的值
//调用静态方法
console.log(Person.way())
```

### 类的继承

```javascript
//ES5之前
//以函数的形式来写对象
function Person(name, age) {
  this.name = name
  this.age = age
}
//添加方法
Person.prototype.showName = function() {
  alert(this.name)
}
//ES5的继承
//继承属性
function Worker(name, age, job) {
  Person.call(this, name, age)
  this.job = job
}
//继承方法
Worker.prototype = new Person()
Worker.prototype.constructor = Worker
Worker.prototype.showJob = function() {
  alert(this.job)
}

//ES6
//class声明的是类，constructor声明的是构造函数
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  //构造函数方法不用写在原型对象上
  showName() {
    alert(this.name)
  }
}
//ES6继承
class worker extends Person {
  constructor(name, age, job) {
    super(name, age) //继承父类的属性，方法通过extends自动继承
    this.job = job
  }
  showName() {
    //添加子类的showName方法,会覆盖掉父类的showName方法
    super.showName() //避免父类的showName方法被覆盖，在子类的showName中以父类的方法执行
    //TODO 做子类自己的事情
    console.log(this.name)
  }
  //添加子类自己的方法
  showJob() {
    alert(this.job)
  }
}
```

## symbol 数据类型

1. Symbol 不能像 Number、String、Array 类型那样使用 new
2. Symbol() 返回值是一个唯一值，用来做为一个 key，定义一些唯一或者私有的数据
3. 用 typeof 检测会返回 symbol
4. symbol 是一个单独的数据类型，就叫 symbol，基本类型
5. 如果 symbol 作为 key，用 for in 循环不会遍历 symbol 直接跳过，

```javascript
let sym = Symbol('box')
console.log(sym)
let json = {
  a: 'apple',
  b: 'banana',
  [sym]: 'key',
}
for (let key in json) {
  console.log(key) //a b
}
```

## generator 函数

1. 解决异步深度嵌套的问题（现在一般用 async）
2. 可使用 for...of...自动遍历 generator，但是 return 的返回值不会遍历
3. generator 不仅可以配合 for...of...还可以通过解构赋值、扩展运算符、Array.from 将值赋给相应对象
4. generator 也可结合 axios 数据请求
5. 关于异步的解决方案：
   1. 回调函数
   2. 事件监听
   3. 发布/订阅
   4. promise 对象

```javascript
//定义generator函数
function* show() {
  yield 'hello'
  yield 'world'
  return '没了'
}
//调用generator函数，手动一步步调用
let s = show() //返回show对象给s
console.log(s.next()) //{value:'hello',done:false}
console.log(s.next()) //{value:'world',done:false}
console.log(s.next()) //{value:'没了',done:true}
//通过for...of...自动遍历
for (let val of s) {
  console.log(val)
}
//通过解构赋值
let [a, b] = show()
//通过扩展运算符
console.log(...show())
```

## async

### 特点

1. await 只能放到 async 函数中
2. 相比 generator 语义化更强
3. await 后面可以是 promise 对象，也可以是数字、字符串、布尔
4. async 函数返回是一个 promise 对象
5. 只要 await 语句后面的 promise 状态变成 reject，那么整个 async 函数会中断，后续代码将不会执行

### promise、generator、async 读取文件 fs.readFile 对比

```javascript
const fs = require('fs')
//简单封装，fs封装成一个Promise对象
const readFile = function(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(file.Name, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

//promise方式
readFile('data/a.txt')
  .then(res => {
    console.log(res.toString())
    return readFile('data/b.txt')
  })
  .then(res => {
    console.log(res.toString())
    return readFile('data/c.txt')
  })
  .then(res => {
    console.log(res.toString())
  })
//generator方式
function* gen() {
  yield readFile('data/a.txt')
  yield readFile('data/b.txt')
  yield readFile('data/c.txt')
}
let g = gen()
g.next()
  .value.then(res => {
    console.log(res.toString())
    return g.next().value
  })
  .then(res => {
    console.log(res.toString())
    return g.next().value
  })
  .then(res => {
    console.log(res.toString())
  })
//async方式
async function fn() {
  let f1 = await readFile('data/a.txt')
  console.log(f1.toString())
  let f2 = await readFile('data/b.txt')
  console.log(f2.toString())
  let f3 = await readFile('data/c.txt')
  console.log(f3.toString())
}
//async结合Promise.all
async function fn() {
  let [f1, f2, f3] = await Promise.all([
    readFile('data/a.txt'),
    readFile('data/b.txt'),
    readFile('data/c.txt'),
  ])
  console.log(f1.toString())
  console.log(f2.toString())
  console.log(f3.toString())
}
fn()
```

### 如何解决 async 函数中抛出错误，影响后续代码执行

1. 使用 try{错误异常代码}catch(e){} 语句
2. promise 本身 catch
3. 建议任何 await promise 的语句都放入 try{}catch(e){}

```javascript
//try{}catch(e){}
async function fn(){
    try{
        let f1 = await readFile('data/a.txt')
        let f2 = await readFile('data/b.txt')
        let f3 = await readFile('data/c.txt')
    }catch(e){}
    console.log(f1.toString())
    console.log(f2.toString())
    console.log(f3.toString())
}
fn()
//promise本身catch,比较麻烦，需要一个个catch
async function fn(){
    let f1 = await readFile('data/a.txt').catch{(err)=>{
        console.log(err)
    }}
    console.log(f1.toString())
    let f2 = await readFile('data/b.txt').catch{(err)=>{
        console.log(err)
    }}
    console.log(f2.toString())
    let f3 = await readFile('data/c.txt').catch{(err)=>{
        console.log(err)
    }}
    console.log(f3.toString())
}
```

## Set、WeakSet 数据结构

### set

1. 类似数组，区别是 set 数组成员中不能有重复的值，后面添加的重复的值不会显示出来
2. set 数组中的 key 和 value 值相等
3. 可使用 for...of...、forEach 循环遍历 Set 数组
4. 初始化只能添加数组，不能添加对象，如果需要往 set 数组中添加对象，需要使用 add()方法

### 使用 set

1. Set.size 返回 Set 数组中成员的个数（Set 数组长度）
2. Set.add() 往 Set 数组中添加新值
3. Set.delete() 往 Set 数组中删除值
4. Set.has() 检测 Set 数组中是否有某个值，返回值为 true/false
5. Set.clear() 清空 Set 数组

```javascript
//定义一个set
let setArr = new Set()
let json = {
    a:'aaa',
    b:'bbb'
}
//直接使用 let setArr = new Set({a:'aaa'})会报错
setArr.add('a').add('b').add('json')
setArr.delete('a')
let setArr2 = new Set(['a','b'，'c'])
console.log(setArr2)

//循环遍历
for(let item of setArr2){//默认为setArr2.values()
    console.log(item) //a，b，c
}
setArr2.forEach((value,index)=>{
    console.log(index,value)
})
```

### set 作用

1. 利用 set 去除数组重复项

```javascript
let arr = [1, 2, 2, 3, 3, 4, 4, 4, 5, 6, 7, 5, 6, 8]
//let set = new Set(arr)
//let newArr = [...set]
let newArr = [...new Set(arr)]
```

### set 数据结构变成数组

1. 目的:可以使用 map 和 filter 循环等数据方法
2. 用法：[...set]

```javascript
let set = new Set([1, 2, 3])
set = new Set([...set].map(val => val * 2))
console.log(set) //2,4,6
```

### WeakSet(不推荐使用)

1. WeakSet 没有 size、clear()
2. 官方建议：
   1. new Set([]) 存储数组
   2. new WeakSet({}) 存储 json 对象

## map、WeakMap 数据结构

### map 数据结构

1. 类似 json,区别是 json 中数据的 key 只能是字符串，而 map 中的 key 可以是任意数据类型

### 使用 map

1. map.set(key,value) 设置一个值
2. map.get(key) 获取 key 值对应的 value
3. map.delete(key) 删除 key 值对应的项
4. map.has(key) 判断有没有 key
5. map.clear() 清空 map

```javascript
let map = new Map()
let json = {
  a: 1,
  b: 2,
}
map.set('a', 'apple')
map.set(json, 'aaa')
map.set('aaa', json)
console.log(map.get(json)) //aaa

//循环遍历
for (let [key, value] of map) {
  //默认为map.entries()
  console.log(key, value)
}
map.forEach((value, index) => {
  console.log(index, value)
})
```

### WeakMap

1. 区别是 WeakMap 中的 key 只能是对象

### 总结

1. Set 里面是数组，不重复，没有 key，没有 get 方法
2. Map 对 json 功能增强，key 可以是任意数据类型值

## 数字（数值）变化

1. 二进制（bin）： let a = 0b1001
2. 八进制（Oct）：let b = 0o701
3. 十六进制（Hex）：let c = #ccc
4. Number 上的方法：
   1. Number.isFinite() 判断是否是数值（负值小数也是数值，但 NaN 不是）
   2. Number.isInteger() 判断是否是整数
   3. Number.Number() 将基本数据类型的数字转换为 Number 对象
   4. Number.parseInt() 字符串转换为整数
   5. Number.parseFloat() 字符串转换为浮点数
   6. Number.isSafeInteger() 判断是否是安全整数
   7. Number.MAX_SAFE_INTEGER 最大安全整数
   8. Number.MIN_SAFE_INTEGER 最小安全整数
5. 安全整数：-（2**53-1）~（2**53-1）
6. Math 上的方法：
   1. Math.abs() 返回绝对值
   2. Math.sqrt() 返回平方根
   3. Math.cbrt() 返回开立方根
   4. Math.sin（）返回正弦
   5. Math.trunc() 截取保留浮点数中的整数部分
   6. Math.sign() 判断是否是负数，负数返回-1，整数返回 1，0 返回 0，-0 返回-0，非数值返回 NaN
   7. Math.ceil() 向上舍入
   8. Math.floor() 向下舍入
   9. Math.round() 四舍五入

## ES9 新增

### 命名捕获

1. 语法 (?<名字>)

```javascript
//ES9之前
let str = '2019-12-12'
let reg = /(\d{4})-(\d{2})-(\d{2})/
let dateArr = str.match(reg)
console.log(dateArr) //[2019-12-12,2019,12,12]
let year = dateArr[1]
let month = dateArr[2]
let day = dateArr[3]
//ES9
let str = '2019-12-12'
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
console.log(str.match(reg).groups) //{year:2019,month:12,day:12}
let { year, month, day } = str.match(reg).groups
```

### 反向引用命名捕获

1. 语法：\k<名字>
2. 反向引用 \1 \2 反向替换：$1 $2

```javascript
let reg = /^(?<Strive>welcome)-\k<Strive>$/

let str = 'a-a'
let str2 = 'Strive-Strive'
let str3 = 'welcome-welcome'
console.log(reg.test(str), reg.test(str2), reg.test(str3)) //false,false,true
```

### 反向引用命名替换： \$<名字>

```javascript
let str = '2019-12-12'
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
//配合命名替换
str = str.replace(reg, '$<year>/?<month>/?<day>')
console.log(str) //2019/12/12
//配合函数
str.replace(reg, (...args) => {
  let [year, month, day] = args[args.length - 1]
  return `${year}/${month}/${day}`
})
```

3.dotAll 模式 /s 1. 之前 '.' 在正则里表示匹配任意东西，但是不包括\n、\t 等,加上 s 后'.'会匹配任意东西包括\n、\t 等

```javascript
let reg = /^\w+.\w+$/s
let str = 'wsfd\nsf'
console.log(str.test(reg)) //true
```

### 标签函数

```javascript
function fn(args) {
  return args[0].toUpperCase()
}
console.log(fn`aaa`) //AAA
```

### proxy:代理

1. 扩展（增强）对象、方法（函数）一些功能
2. proxy 是设计模式的一种，代理模式
3. 作用：比如 Vue 中拦截、平时预警、上报、扩展功能、统计、增强对象...
4. 语法：new Proxy(target[被代理对象],handler[对代理对象进行的操作])

### Reflect:反射

1. 类似 fn.call()、fn.apply()
2. Reflect.apply(fn[调用的函数],this[this 指向],args[参数数组])
3. Object.xxx 语言内部方法未来将逐渐放到 Reflect 对象身上，未来将通过 Reflect 对象身上直接拿到语言内部的方法

```javascript
handler:{
    set(){},    //设置代理对象时触发
    get(){},    //获取代理对象时触发
    deleteProperty(){}, //删除代理对象时触发
    has(){},    //检测代理对象时触发 'xxx' in obj
    apply(){}   //执行对象（调用函数）时触发，一般配合Reflect使用
    ...
}

//使用proxy
//get()
let obj={
    name:'Bob'
}
let newObj = new Proxy(obj,{
    get(target,property){ //target指向代理对象obj,property指向用户访问newObj的属性
        //console.log(target,property)  //{name:'Bob'},name
        return target[property] //会使newObj.name指向obj.name
    }
})
console.log(newObj.name) //指向get的返回值

//例子：访问对象属性时，不存在则返回"该对象没有该属性" ，默认是不存在该属性则返回undefined，
let obj={
    name:'Bob'
}
let newObj = new Proxy(obj,{
    get(target,property){
        if(property in target){
            return target[property]
        }else{
            //throw new ReferenceError(`该对象上没有${property}属性`)
            //console.warn(`该对象上没有${property}属性`)
        }
    }
})
console.log(newObj.name)
console.log(newObj,age)

//set()
let obj = new Proxy({},{
    set(target,prop,value){
        console.log(target,prop,value)
    }
})
obj.a = 123 //{},'a',123
//例子：判断设置的age属性，值为整数，且不超过200
let obj = new Proxy({},{
    set(target,prop,value){
        if(prop = 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError(`年龄必须为整数`)
            }
            if(value > 200){
                throw new RangeError(`年龄必须小于200岁`)
            }
            target[prop] = value
        }
    }
})
obj.age = 14

//deleteProperty()、has()
let json = {
    a:1,
    b:2
}
let newJson = Proxy(json,{
    deleteProperty(target,property){
        console.log(`将要删除${property}属性`)
        delete target[property]
    },
    has(target,property){
        console.log(`判断中...`)
        return property in target
    }
})
delete newJson.a
console.log('a' in newJson)  //true

//apply()
function fn(){
    return '我是函数'
}
let newFn = new Proxy(fn,{
    apply(){
        return `执行函数中...`
    }
})
console.log(newFn())  //执行函数中

//Reflect
console.log(Math.ceil(4.6))  //5
let res = Reflect.apply(Math.ceil,null,[4.6])
console.log(res) //5
//Reflect对象内部方法
console.log('assign' in Object)  //true
console.log(Reflect.has(Object,'assign'))  //true
'assign' in Object -> Reflect.has(Object,'assign')
let json = {a:1,b:2}
delete json.a  -> Reflect.deleteProperty(json,'a')

//apply()配合Reflect
function sum(a,b){
    return a+b
}
let newSum = new Proxy(sum,{
    apply(target,context,args){
        //console.log(target,context,args) //sum,undefined,[2,3]
        //console.log(...arguments)  //sum,undefined,[2,3]
        return Reflect.apply(...arguments)**2 //拦截后要做的事，将执行结果平方
    }
})
console.log(newSum(2,3)) //25
```
