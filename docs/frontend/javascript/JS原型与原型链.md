---
title: JS面向对象
date: 2021-01-23 17:28:07
tags:
  - JavaScript
publish: true
---

## JS 原型对象(prototype)概念

1. 我们所创建的每一个函数，解析器都会向函数中添加一个属性 prototype，这个属性对应着一个对象，这个对象就是原型对象。
2. 如果函数作为普通的函数调用，prototype 没有任何作用，当函数以构造函数的形式调用时，它所创建的对象中都会有一个隐含的属性指向该构造函数的原型对象，可以通过**\_\_proto\_\_**来访问该属性
3. 原型对象就相当于一个公共的区域，所有同一类的实例都可以访问到这个原型对象，我们可以将对象中共有的内容，统一设置到原型对象中。
4. 当我们访问对象的一个属性或方法时，它会先在对象自身中寻找，如果有则直接使用，如果没有则会去原型对象中寻找，如果找到则返回。如果没有则继续沿着原型链往下寻找，直到原型链尽头(null)为止。
5. 我们创建构造函数时，可以将这些对象共有的属性和方法统一放到该构造函数的原型对象中，这样不用分别为每一个对象添加，实现同一类的实例可以共同访问该原型对象，也不会污染到全局作用域，就可以使每个对象都具有这些属性和方法。
6. 使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型中有，也会返回 true。
   可以使用 hasOwnProperty 方法检查对象自身中（**不包含原型对象**）是否含有某个属性。有则会返回 true

```JavaScript

function MyClass(name){
  //...
  this.name = name
}
//向 MyClass 的原型对象中添加属性 a
MyClass.prototype.a = 123;
//向 MyClass 的原型对象中添加一个方法
MyClass.prototype.sayHello = function (){
  console.log(this.name);
};
var mc = new MyClass('name');
console.log(mc.a); //a
//调用原型对象方法
MyClass.sayHello();

mc.hasOwnProperty("name"); //

//第一个是自身的原型，第二个是MyClass的原型,其为Object对象原型，第三个则为Object对象原型的原型，不存在为null
ms.__proto__.__proto__.__proto__ == null;

```

## 原型链概念

1. 原型对象也是对象，它也有原型。当我们在使用一个对象的属性或方法时，① 会先在自身中寻找，自身中如果有，则直接使用，② 如果没有则去原型对象中寻找，如果原型对象中有则使用，③ 如果没有则继续去原型对象的原型中寻找。 知道找到 Object 对象（这里指最外层 MyClass 对象）的原型，Object 对象的原型没有原型。如果在 Object 的原型中依然没有找到，则返回 undefined。
2. 当我们直接在页面中打印一个对象时，实际上是输出该对象的 toString()方法的返回值。如果我们希望输出对象时不输出默认的`[object Object]`返回值，可以为对象添加一个 toString()方法（修改默认 toString()方法）。

```JavaScript
var per = new Person("apple",18,"男");
//修改默认toString()方法
Person.prototype.toString = function(){
  return this.name + this.age + this.gender;
};
console.log(per);  //实际上是console.log(per.toString());
```

## 原型与原型链

### 原型

1. 函数的 prototype 属性
   1. 每个函数都有一个 prototype 属性，它默认指向一个 Object 空对象（即称为：原型对象）
   2. 原型对象中有一个属性 constructor，它指向函数对象
   3. 构造函数和它的原型对象是相互引用的关系
   4. 图解如下
      ![prototype与constructor](https://blog.peigo.top/peigo/2021-01-23-21-37-30.jpg)
2. 给原型对象添加属性（一般都是方法）

   1. 作用：函数的所有实例对象自动拥有原型中的属性（方法）

      ```JavaScript
        // 每个函数都有一个prototype属性, 它默认指向一个Object空对象(即称为: 原型对象)
      console.log(Date.prototype, typeof Date.prototype)
      function Fun () {//alt + shift +r(重命名rename)

      }
      console.log(Fun.prototype)  // 默认指向一个Object空对象(没有我们的属性)

      // 原型对象中有一个属性constructor, 它指向函数对象
      console.log(Date.prototype.constructor===Date)
      console.log(Fun.prototype.constructor===Fun)

      //给原型对象添加属性(一般是方法) ===>实例对象可以访问
      Fun.prototype.test = function () {
        console.log('test()')
      }
      var fun = new Fun()
      fun.test()
      console.log(fun.constructor===Fun) //true  fun.__proto__ = Fn.prototype
      ```

3. 显式原型与隐式原型
   1. 每个函数 function 都有一个 prototype，即显式原型(属性)
   2. 每个实例对象都有一个**\_\_proto\_\_**，可称为隐式原型(属性)
   3. 对象的隐式原型的值为其对应构造函数的显式原型的值(fun.\_\_proto\_\_ = Fun.prototype)
   4. 所有函数(Fun)的隐式原型**\_\_proto\_\_**属性的值都是一样的，等于 Function(JS 内置函数对象) 的显式原型 prototype 的值。
   5. 内存结构图解
      ![显式原型与隐式](https://blog.peigo.top/peigo/2021-01-23-21-42-34.png)
      ::: danger
      总结：
      1. 函数的 prototype 属性：在定义函数时自动添加的，默认值是一个空 Object 对象
      2. 对象的**\_\_proto\_\_**属性：创建对象时自动添加的，默认值为构造函数的 prototype 属性值
      3. 程序员能直接操作显式原型，但不能直接操作隐式原型（ES6 之前）
         :::

```JavaScript
//定义构造函数
function Fn() {   // 内部语句: this.prototype = {}

}
// 1. 每个函数function都有一个prototype，即显式原型属性, 默认指向一个空的Object对象
console.log(Fn.prototype)
// 2. 每个实例对象都有一个__proto__，可称为隐式原型
//和显示原型指向同一个空的Object对象，两者存的都是用一个地址值（引用变量）
//创建实例对象
var fn = new Fn()  // 内部语句: this.__proto__ = Fn.prototype
console.log(fn.__proto__)
// 3. 对象的隐式原型的值为其对应构造函数的显式原型的值
console.log(Fn.prototype===fn.__proto__) // true
//给原型添加方法
Fn.prototype.test = function () {
  console.log('test()')
}
//通过实例调用原型的方法
fn.test()
```

### 原型链（图解）

1. 别名：隐式原型链
2. 作用：查找对象的属性（方法）
3. 访问一个对象的属性时
   1. 先在自身属性中寻找，找到返回
   2. 如果没有，在沿着**\_\_proto\_\_**这条链向上寻找，找到返回
   3. 如果最终没有找到，返回 undefined
4. 构造函数/原型/实体对象的关系（图解）
   ![构造函数/原型/实体对象的关系1](https://blog.peigo.top/peigo/2021-01-23-21-58-53.png)
5. 构造函数/原型/实体对象的关系 2（图解）
   ![构造函数/原型/实体对象的关系](https://blog.peigo.top/peigo/2021-01-23-21-24-16.png)
6. 原型链的补充：

   1. 函数的显式原型指向的对象默认是空 Object 实例对象。(但 Object(JS 内置对象，) 不满足)

      ```Javascript
      console.log(Fn.prototype instanceof Object) // true
      console.log(Object.prototype instanceof Object) // false
      console.log(Function.prototype instanceof Object) // true
      ```

   2. 所有函数都是 Function(JS 内置函数对象) 的实例（包括 Function 本身）。

      ```JavaScript
      console.log(Function.__proto__===Function.prototype)  //true
      ```

   3. Object 的原型对象是原型链的尽头

      ```JavaScript
      console.log(Object.prototype.__proto__) // null
      ```

7. 原型的属性问题

   1. 读取对象的属性值时：会自动到原型链中查找
   2. 设置对象的属性值时：不会查找原型链，如果当前对象中没有此属性，直接添加此属性并设置其值
   3. 方法一般定义在原型中，属性一般通过构造函数定义在对象本身上

      ```JavaScript
      function Fn() {
      }
      Fn.prototype.a = 'xxx'
      var fn1 = new Fn()
      console.log(fn1.a) //xxx

      var fn2 = new Fn()
      fn2.a = 'yyy'
      console.log(fn1.a, fn2.a) //xxx yyy

      function Person(name, age) {
        this.name = name
        this.age = age
      }
      Person.prototype.setName = function (name) {
        this.name = name
      }
      ```
