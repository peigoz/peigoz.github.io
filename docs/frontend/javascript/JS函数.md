---
title: JS函数
date: 2021-01-22 17:41:15
tags:
  - JavaScript
publish: true
---

## 函数的基本概念

1. 函数也是一个对象。不同的是函数中可以封装一些功能（代码），在需要时可以执行这些功能（代码）。
2. 函数中可以封装一些可执行的程序代码，在需要的时候重复调用。
3. 使用 typeof 检查一个函数对象时，会返回 function。
4. 封装到函数中的代码不会立即执行，函数中的代码会在调用该函数的时候才会执行。

## 创建函数的几种方式

1. 使用 函数表达式

   ```JavaScript
   //相当于给变量赋值一个匿名函数，此时如果使用var会有函数提升的效果
   const fun1 = function(){
       console.log("这是我的第一个函数~~");
   }

   ```

2. 使用 函数声明

   ```JavaScript
   //函数声明
   function fun2(){
       console.log("这是我的第二个函数~~");
   }

   ```

3. 将要封装的代码以字符串的形式传递给构造函数。(基本不用)

   ```JavaScript
   //创建一个函数对象
   var fun3 = new Function("console.log('这是我的第三个函数');");
   //调用函数
   fun3();
   ```

## 函数的参数

1. 可以在函数的()中来指定一个或多个形参（形式参数），多个形参之间使用","隔开，声明形参就相当于在函数内部声明了对应的变量，但是并不赋值。
2. 在调用函数时，可以在()中指定实参(实际参数)，实参将会赋值给函数中对应的形参。
3. 调用函数时解析器不会检查实参的数据类型。所以要注意是否有可能会接收到非法的参数，如果有则需要对参数的类型进行检查。函数的实参可以是任意的数据类型（可以是一个对象、函数 ）
4. 调用函数时，解析器也不会检查实参的数量，多余的实参不会被赋值。如果实参的数量少于形参数量则没有对应实参的形参将会被赋值 undefined
5. **当我们的参数过多时，可以将参数封装到一个对象中，然后通过对象传递。优点：可以随意改变实参位置，只要保证属性名是对的就行。且调用函数更加方便**

## 构造函数

1. 构造函数就是一个普通的函数，创建方式和普通函数没有区别，不同的是构造函数习惯上首字母大写。
2. 构造函数和普通函数的区别是调用方式的不同，普通函数是直接调用，构造函数需要使用 new 关键字来调用。
3. 构造函数的执行流程：
   1. 立刻创建一个新的对象
   2. 将新建的对象设置为函数中 this，在构造函数中可以使用 this 来引用新建的对象。
   3. 逐行执行函数中的代码
   4. 将新建的对象作为函数的返回值返回
4. 使用同一个构造函数创建的对象，我们称为一类对象，也将一个构造函数称为一个类。我们将通过一个构造函数创建的对象称为是该类的实例。
5. 使用 instanceof 可以检查一个对象是否是一个类的实例。
   ::: tip
   所有的对象都是 Object 的实例。任何对象和 Object 做 instanceof 检查时都会返回 true。
   :::

```JavaScript
function Person(name,age,gender){
    this.name = name; //此时的this是新创建的对象
    this.age = age;
    this.gender = gender;
    this.sayName = sayName;
}
function sayName(){
    console.log(this.name);
}
const per1 = new Person("apple",18,"男");  //this指向per1。
per1.sayName(); //apple
```

## 回调函数

1. 什么函数才是回调函数?
   1. 函数是我们定义的。
   2. 并且没有调用该函数。
   3. 最终它（在某个时刻或某个条件下）还是执行了。
2. 常见的回调函数?

   1. dom 事件回调函数。==> this 是发生事件的 dom 元素
   2. 定时器回调函数。 ==> this 是 window
   3. ajax 请求回调函数。
   4. 生命周期回调函数。

   ```JavaScript
   document.getElementById('btn').onclick = function () { // dom事件回调函数
       alert(this.innerHTML)
   }
   //定时器
   //超时（延时）定时器 setTimeout( )
   //循环定时器 setInterval()
   setTimeout(function(){ // 定时器回调函数
       console.log("2 秒执行一次");
   },2000);
   ```

## IIFE(立即执行函数表达式:Immediately-Invoked Function Expression)

1. 作用
   1. 隐藏实现（在浏览器看不到执行代码）
   2. 不会污染外部（全局）命名空间
   3. 用来它编写 js 模块

```JavaScript
(function () { //匿名函数自调用
    var a = 3
    console.log(a + 3)
})()

;(function () {
    var a = 1
    function test () {
      console.log(++a)
    }
    window.$ = function () { // 向外暴露一个全局函数
      return {
        test: test
      }
    }
  })()
$().test() // 1. $是一个函数 2. $执行后返回的是一个对象
```

## 函数的 arguments

1. 在调用函数时，浏览器每次都会传递进了两个隐含的参数。
   - 函数上下文对象 this
   - 封装实参的对象 arguments
2. arguments
   1. arguments 是一个类数组对象。，它也可以通过索引来操作数据，也可以获取长度。
   2. 在调用函数时，我们所传递的实参都会在 arguments 中保存。
   3. arguments.length 可以用来获取实参的长度。
   4. 即使不定义形参，也可以通过 arguments 来使用实参，只是比较麻烦。(arguments[0],表示第一个实参，arguments[1],表示第二个实参...依此类推)
   5. arguments 有一个属性 callee，这个属性对应一个函数对象，即当前正在指向的函数的对象
3. callee
   1. callee 是 arguments 对象的一个属性。它可以用于引用该函数的函数体内当前正在执行的函数。这在函数的名称是未知时很有用，例如在没有名称的函数表达式 (也称为 “匿名函数”) 内。
   2. 当一个函数必须调用自身的时候, 避免使用 arguments.callee(), 要么通过给函数表达式一个名字 , 要么使用一个函数声明

```javascript
function create() {
  return function(n) {
    if (n <= 1) return 1
    return n * arguments.callee(n - 1)
  }
}

var result = create()(5) // returns 120 (5 * 4 * 3 * 2 * 1)
```

## 调用函数的几种方式

1. `test()`：直接调用
2. `obj.test()`：通过对象调用
3. `new test()`：new 调用（构造函数）
4. `test.call/apply(obj)`：临时让 test 成为 obj 的方法进行调用

## 函数的返回值

1. 可以使用 return 来设置函数的返回值。
2. return 后的值将会作为函数的执行结果返回。可以定义一个变量，来接受该结果。
3. 在函数中 return 后的语句都不会执行。如果 return 语句后不跟任何值就相当于返回一个 undefined，如果函数中不写 return 语句，也会返回 undefined。
4. return 返回值可以是任意的数据类型，也可以是一个对象、函数。

## 函数中的 this

1. 以函数的形式调用时，this 永远都是 window。（函数本质上就相当于 window 对象的方法）
2. 以方法的形式调用时，this 就是调用方法的那个对象。
3. 当以构造函数的形式调用时，this 就是新创建的那个对象。
4. 使用 call()和 apply()方法调用时，this 是指定的那个对象。

   ```JavaScript
   function Person(color) {
      console.log(this)
      this.color = color;
      this.getColor = function () {
         console.log(this)
         return this.color;
      };
      this.setColor = function (color) {
         console.log(this)
         this.color = color;
      };
   }
   Person("red"); //this是谁? window

   var p = new Person("yello"); //this是谁? p
   p.getColor(); //this是谁? p

   var obj = {};
   p.setColor.call(obj, "black"); //this是谁? obj

   var test = p.setColor;
   test(); //this是谁? window

   function fun1() {
      function fun2() {
         console.log(this);
      }
      fun2(); //this是谁? window
   }
   fun1();
   ```

5. 如何确定 this 的值?
   1. test()：window
   2. p.test()： p
   3. new test()： 新创建的对象
   4. p.call(obj)：obj
