---
title: JS闭包
date: 2021-01-25 20:59:18
categories:
  - JavaScript
tags:
  - JavaScript
isShowComments: true
publish: true
---

## 引入闭包

```JavaScript
//btns为按钮数组
//遍历加监听
  for (var i = 0,length=btns.length; i < length; i++) {
    var btn = btns[i]
    //将btn所对应的下标保存在btn上
    btn.index = i
    btn.onclick = function () {
      alert('第'+(this.index+1)+'个')
    }
  }*/

  //利用闭包
  for (var i = 0,length=btns.length; i < length; i++) {
    (function (j) {
      var btn = btns[j]
      btn.onclick = function () {
        alert('第'+(j+1)+'个')
      }
    })(i)
  }
```

## 理解闭包

### 如何产生闭包

1. 当一个嵌套的内部（子）函数引用了嵌套的外部（父）函数的变量（函数）时，就产生了闭包

### 闭包是什么

1. 使用 chrome 调试查看
2. 理解一：闭包是嵌套的内部函数（绝大部分人）
3. 理解二：包含被引用变量（函数）的对象（极少数人）
   ::: tip
   注意：闭包存在于嵌套的内部函数中
   :::

### 产生闭包的条件

1. 函数嵌套
2. 内部函数引用了外部函数的数据（变量/函数）
3. 执行外部函数（不需要执行内部函数）

```JavaScript
 function fn1 () {
    var a = 2
    var b = 'abc'
    function fn2 () { //执行函数定义就会产生闭包(不用调用内部函数)
      console.log(a)
    }
    // fn2()
  }
  fn1()
```

## 常见的闭包

1. 将函数作为另一个函数的返回值
2. 将函数作为实参传递给另一个函数调用

```JavaScript
  // 1. 将函数作为另一个函数的返回值
  function fn1() {
    var a = 2
    function fn2() {
      a++
      console.log(a)
    }
    return fn2
  }
  var f = fn1()
  f() // 3
  f() // 4，a的值在增加，a没有消失

  // 2. 将函数作为实参传递给另一个函数调用
  function showDelay(msg, time) {
    setTimeout(function () {
      alert(msg) //内部引用了外部函数的变量msg
    }, time)
  }
  showDelay('闭包', 2000)
```

##　闭包的作用

1. 使用函数内部的变量在函数执行完后，仍然存活在内存中（延长了局部变量的生命周期）
2. 让函数外部可以操作（读写）到函数内部的数据（变量/函数）

```JavaScript
//问题:
//  1. 函数执行完后, 函数内部声明的局部变量是否还存在?  一般是不存在, 存在于闭包中的变量才可能存在
//  2. 在函数外部能直接访问函数内部的局部变量吗? 不能, 但我们可以通过闭包让外部操作它
  function fn1() {
      //此时闭包就已经产生了（函数提升，内部函数对象已经创建了）
    var a = 2
    function fn2() {  //如果是用表达式声明函数var fn2 = function(){}那么闭包将会在这里执行完函数定义才产生
      a++
      console.log(a)
      // return a
    }
    function fn3() {
      a--
      console.log(a)
    }
    return fn3  //通过return内部函数使得外部可以操作闭包中变量
  }

  //情况一：
  var f = fn1()//执行完函数fn1后，fn1、fn2和fn3（函数名，变量）被自动释放，但是fn3的对象被f引用
  //fn3（变量）所指定的函数对象的地址值被赋值给了f，导致外部依然能操作到函数内部的a变量，这也是存在于闭包
  f() // 1
  f() // 0

  //情况二：
  fn1() //如果直接执行fn1并且不赋值给变量，那么闭包中的变量也将成为垃圾对象被回收

  //情况三
  fn1()() //fn1执行完毕立马执行返回值，此时fn3()会进入执行上下文栈，函数执行没有结束，闭包存在，能正常输出a的值
  fn1()()() //此时fn3、fn1、window已经依次出栈，函数已经执行完毕且没有对象引用闭包，会使得成为垃圾对象被回收，
  //故第三次执行时会报错

  f = null //闭包死亡（包含闭包的函数对象成为了垃圾对象）
```

## 闭包的生命周期

1. 产生：在嵌套内部函数定义执行（执行函数定义）完时就产生了（不是调用函数时产生的）
2. 死亡：在嵌套的内部函数成为垃圾对象时

## 闭包的应用：定义 JS 模块

1. 具有特定功能的 js 文件
2. 将所有的数据和功能都封装在一个函数内部（私有的）
3. 只向外暴露一个包含 n 个方法的对象或函数
4. 模块的使用者，只需要通过模块暴露的对象调用方法来实现对应的功能

```JavaScript
//方式一
function myModule() {
  //私有数据
  var msg = 'My atguigu'
  //操作数据的函数
  function doSomething() {
    console.log('doSomething() '+msg.toUpperCase())
  }
  function doOtherthing () {
    console.log('doOtherthing() '+msg.toLowerCase())
  }

  //向外暴露对象(给外部使用的方法)
  return {
    doSomething: doSomething,
    doOtherthing: doOtherthing
  }
}
//调用内部方法
  var module = myModule()
  module.doSomething()
  module.doOtherthing()
  module = null //及时释放闭包，防止内存泄漏
  //推荐方式二，通过匿名函数自调用，将向外暴露的方法直接添加为Window的属性
  (function (w) {
  //私有数据
  var msg = 'My atguigu'
  //操作数据的函数
  function doSomething() {
    console.log('doSomething() '+msg.toUpperCase())
  }
  function doOtherthing () {
    console.log('doOtherthing() '+msg.toLowerCase())
  }

  //向外暴露对象(给外部使用的方法)
  w.myModule2 = {  //Window.mYModule2    this == window
    doSomething: doSomething,
    doOtherthing: doOtherthing
  }
})(window) //传入window可以在项目压缩代码时将内部变量的Window都压缩为w
//调用内部方法
  myModule2.doSomething()
  myModule2.doOtherthing()
  myModule2 = null
```

## 闭包的缺点及解决方法

### 闭包的缺点

1. 函数执行完毕后，函数内的局部变量没有释放，占用内存时间会变长
2. 容易造成内存泄漏

### 解决方法

1. 能不用闭包就不用
2. 及时释放（赋值 null 让内部函数成为垃圾对象 ==> 回收闭包）

## 内存溢出与内存泄漏

### 内存溢出

1. 一种程序运行出现的错误，当程序运行需要的内存超过了剩余的内存时，就会抛出内存溢出的错误

### 内存泄漏

1. 占用的（无用）内存没有及时释放
2. 内存泄漏积累多了就容易导致内存溢出
3. 常见的内存泄漏：
   1. 意外的全局变量
   2. 没有及时清理的计时器或回调函数
   3. 闭包

```JavaScript
// 1. 内存溢出
  var obj = {}
  for (var i = 0; i < 10000; i++) {
    obj[i] = new Array(10000000)
    console.log('-----')
  }

  // 2. 内存泄露
    // 意外的全局变量
  function fn() {
    a = new Array(10000000)  //此时a是全局变量，函数执行完后仍然存在占用的内存没有被释放，应该使用var定义
    console.log(a)
  }
  fn()

   // 没有及时清理的计时器或回调函数
  var intervalId = setInterval(function () { //启动循环定时器后不及时关闭清理，导致定时器一直在执行
    console.log('----')
  }, 1000)

  // clearInterval(intervalId) 关闭定时器

    // 闭包，没有及时释放闭包中的对象（函数）
  function fn1() {
    var a = 4
    function fn2() {
      console.log(++a)
    }
    return fn2
  }
  var f = fn1()
  f()

  // f = null  释放闭包中对象
```

## 有关闭包面试题

```JavaScript
//代码片段一
  var name = "The Window";
  var object = {
    name : "My Object",
    getNameFunc : function(){ //函数中的this指向Object
      return function(){
        return this.name; //函数中的this是指向Window，此时内部函数没有引用外部函数的变量，没有产生闭包
      };
    }
  };
  alert(object.getNameFunc()());  //?  the window

  //代码片段二
  var name2 = "The Window";
  var object2 = {
    name2 : "My Object",
    getNameFunc : function(){
      var that = this;  //这里的this指向object
      return function(){
        return that.name2; //产生闭包that
      };
    }
  };
  alert(object2.getNameFunc()()); //?  my object

  //代码片段三,调用过程输出了什么
    function fun(n,o) {
    console.log(o)
    return {
      fun:function(m){
        return fun(m,n)
      }
    }
  }
  var a = fun(0) //undefined
  a.fun(1) //0
  a.fun(2) //0
  a.fun(3)//0

  var b = fun(0).fun(1).fun(2).fun(3)//undefined,0,1,2

  var c = fun(0).fun(1) //undefined , 0
  c.fun(2) //1
  c.fun(3)//1
```
