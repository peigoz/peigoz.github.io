---
title: JS类型与常用类型判断
date: 2021-01-22 13:02:33
categories:
  - JavaScript
tags:
  - JavaScript
isShowComments: true
publish: true
---

## JS 数据类型

1. JS 目前有 8 种数据类型:分为基本数据类型和引用数据类型两大类。  
   基本数据类型有 7 种:Number、String、Boolean、Null、undefined、symbol(ES6)、BigInt(ES2020）  
    引用数据类型只有 1 种:Object
2. Object 包含以下多种引用类型:Function,Array,Object，Date、正则、Math

## undefined 与 null 的区别

1.undefined 代表定义了未赋值。null 代表定义了且赋值为 null。

## == 和 === 有什么区别

1. == 会进行类型[隐式转换](./JS类型转换.md)，===则不会

## 严格区别变量类型与数据类型

1. 数据的类型:
   1. 基本类型:保存的就是基本类型的数据值。
   2. 对象类型:保存的内存空间地址值(该值指向一块内存空间地址)。
2. 变量的类型(变量内存值的类型)：
   1. 基本类型：保存的就是基本类型的数据。
   2. 引用类型：保存的内存空间地址值。

## 关于赋值和内存的问题

1. 问题：var a = xxx，a 内存中保存的是什么?
   如果 xxx 是基本数据，保存的就是这个数据。
   如果 xxx 是对象，保存的就是这个对象的地址值。
   如果 xxx 是变量，保存的就是这个变量内存中保存的内容（可能是基本数据也可能是地址值）。

## 关于引用变量赋值问题

1. （多）个引用变量指向同一个对象，通过一个变量修改对象内部数据，另一个变量看到的是修改之后的数据。
2. （多）个引用变量指向同一个对象，让其中一个引用变量指向另一个对象，另一个变量依然指向前一个变量。

```JavaScript
var obj1 = {name:'tom'};
var obj2 = obj1;
obj1.name = 'Jack';
console.log(obj2.name); //Jack
function fn(obj){
    obj.name = 'a';
}
fn(obj1);
console.log(obj2,name); //a

var a = {age:12};
var b = a;
a = {name:'Bob',age:13};
console.log(b.age,a.name,a.age);  //12 , Bob , 13
function fn2(obj){
    obj = {age:15};  //将a的地址值赋值给obj，obj再指向函数内部的另一个对象（= 和 . 的区别），此时obj会成为垃圾对象在函数执行完毕被释放
}
fn2(a);  //13
```

## 在 js 调用函数时传递变量参数是值传递还是引用传递?

- 理解 1：都是值（包括基本值/地址值）传递。
- 理解 2：可能是值传递，也可能是引用传递（地址值）。

```JavaScript
var a = 3;
function fn(a){
    a=a+1;
}
fn(a); //此时传递的是全局变量a的值3
console.log(a);  //输出的是全局变量a，不是函数中的a
```

## JS 引擎如何管理内存?

1. 内存生命周期
   1. 分配一块小空间，得到它的使用权。
   2. 存储数据，可以反复进行操作。
   3. 释放小内存空间。
2. 释放内存
   1. 局部变量：函数执行时创建，函数执行完毕即刻自动释放。
   2. 对象：成为垃圾对象 ==> 垃圾回收器(Garbage Collection）回收

```JavaScript
var a =3;
var obj = {};
obj = null;  //此时依然还有两个内存空间，一个是全局变量a一个是obj值为null。只是null占用空间要比对象小的多。

function fn(){
    var b = {};
}
fn();  //b是自动释放，b所指向的对象是在后面的某个时刻被垃圾回收器回收。
```

## 常用类型判断

1. Number、String、Boolean、BigInt:判断是否是该类型用 typeof,判断具体用全等: === 、`toString()`

   ::: danger

   ```javascript
   //判断是否为NaN要用Number.isNaN()
   const a = NaN
   console.log(Number.isNaN(a))
   //注意: 使用new String('abc')创建字符串会导致typeof判断为object，此时需要通过instanceof判断
   const b = new String('abc')
   console.log(typeof b === 'object') //true
   console.log(b instanceof String) //true
   ```

   :::

2. Undefined:typeof 和 ===

   ```javascript
   const a = undefined
   console.log(typeof a === 'undefined')
   console.log(a === undefined)
   ```

3. Null:只能用===
   ::: danger

   ```javascript
   const a = null
   console.log(typeof a) //'object'
   ```

   :::

4. symbol:typeof

   ```javascript
   let sym1 = Symbol()
   console.log(typeof sym1) // 'symbol'
   ```

5. Array:instanceof、对象的 constructor 属性、`Array.isArray()` 检验值是否为数组

   ```javascript
   let arr = [1, 2, 3]
   console.log(arr instanceof Array) //true
   console.log(arr.constructor === Array) //true
   console.log(Array.isArray(arr)) //true
   ```

6. Function:一般只会用 instanceof 判断是否为某个类下面的实例

   ```JavaScript
   let a = new Person()
   console.log(a instanceof Person)
   ```
