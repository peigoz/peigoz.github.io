---
title: 面向对象之对象创建模式
date: 2021-01-24 19:31:27
categories:
  - JavaScript
tags:
  - JavaScript
isShowComments: true
publish: true
---

### Object 构造函数模式

```JavaScript
var p = new Object() //p = {}
  // 再动态添加属性/方法
  p.name = 'Tom'
  p.age = 12
  p.setName = function (name) {
    this.name = name
  }
```

### 对象字面量模式

```JavaScript
var  p = {
    name: 'Tom',
    age: 12,
    setName: function (name) {
      this.name = name
    }
  }
```

### 工厂模式

1. 通过工厂函数动态创建对象并返回
2. 适用场景：需要创建多个对象
3. 问题：对象没有一个具体的类型，都是 Object 类型,语义不明确

```JavaScript
function createPerson(name, age) { //返回一个对象的函数===>工厂函数
    var obj = {
      name: name,
      age: age,
      setName: function (name) {
        this.name = name
      }
    }
    return obj
  }
  // 创建2个人
  var p1 = createPerson('Tom', 12)
  var p2 = createPerson('Bob', 13)  // p1、p2是Object类型

  function createStudent(name, price) {
    var obj = {
      name: name,
      price: price
    }
    return obj
  }
  var s = createStudent('Candy', 12000)  // s也是Object类型
```

### 自定义构造函数模式

1. 自定义构造函数，通过 new 创建对象
2. 适用创建：需要创建多个类型确定的对象
3. 问题：每个对象都有相同的数据（方法），浪费内存

```JavaScript
//定义类型
  function Person(name, age) {
    this.name = name
    this.age = age
    this.setName = function (name) {
      this.name = name
    }
  }
  var p1 = new Person('Tom', 12)
  p1.setName('Jack')
  console.log(p1.name, p1.age)
  console.log(p1 instanceof Person)

  function Student (name, price) {
    this.name = name
    this.price = price
  }
  var s = new Student('Bob', 13000)
  console.log(s instanceof Student)

  var p2 = new Person('JACK', 23) //此时p2也会有相同的setName方法，创建的每个实例都有相同但是不是指向同一个地址的方法对象，浪费内存
  console.log(p1, p2)
```

### 方式五：构造函数+原型的组合模式

1. 自定义构造函数，属性在函数中初始化，方法添加在原型上
2. 适用场景：需要创建多个类型确定且有方法的对象

```JavaScript
function Person(name, age) { //在构造函数中只初始化一般函数
    this.name = name
    this.age = age
  }
  Person.prototype.setName = function (name) {
    this.name = name
  }

  var p1 = new Person('Tom', 23)
  var p2 = new Person('Jack', 24)
  console.log(p1, p2)
```

### 继承模式

#### 基于原型链继承

1. 实现流程:

   1. 定义父类型构造函数
   2. 给父类型的原型添加方法
   3. 定义子类型的构造函数
   4. 创建父类型的实例对象赋值给子类型的原型
   5. 将子类型原型的构造属性（constructor）设置为子类型
   6. 给子类型原型添加方法
   7. 创建子类型的对象：可以调用父类型的方法

2. 缺点: 实例化子类的时候没法给父类传参

   ```JavaScript
   //父类型
     function Supper() {
       this.supProp = 'Supper property'
     }
     Supper.prototype.showSupperProp = function () {
       console.log(this.supProp)
     }

     //子类型
     function Sub() {
       this.subProp = 'Sub property'
     }
     // 子类型的原型为父类型的一个实例对象
     Sub.prototype = new Supper()
     console.log(sub.constructor) // Supper 表示寻找sub实例对象对应的构造函数
     // 让子类型的原型的constructor指向子类型,本来位于Object对象并指向Supper，即sub.__proto__.__proto__.constructor=Supper
       //现在在Super实例对象创建constructor属性并指向Student,即sub.__proto__.constructor = Student
     Sub.prototype.constructor = Sub
     Sub.prototype.showSubProp = function () {
       console.log(this.subProp)
     }

     var sub = new Sub()
     console.log(sub.constructor) //Sub
     sub.showSupperProp()
     // sub.toString()
     sub.showSubProp()

     console.log(sub)  // Sub
   ```

3. 图解
   ![基于原型链继承](https://blog.peigo.top/peigo/2021-01-24-20-29-23.png)

#### 借用构造函数继承

1. 实现流程:
   1. 定义父类型构造函数
   2. 定义子类型构造函数
   3. 在子类型构造函数中调用父类型构造
2. 关键：在子类型构造函数中通过 `call()` 调用父类型构造函数
3. 缺点: 不能继承父类原型链上面的属性和方法

```JavaScript
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  function Student(name, age, price) {
    Person.call(this, name, age)  // 相当于: this.Person(name, age)
    /*this.name = name
    this.age = age*/
    this.price = price
  }

  var s = new Student('Tom', 20, 14000)
  console.log(s.name, s.age, s.price)
```

#### 原型链+借用构造函数的组合继承

1. 利用原型链实现对父类型对象的方法继承
2. 利用 `call()` 借用父类型构造函数初始化相同属性

```JavaScript
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  Person.prototype.setName = function (name) {
    this.name = name
  }

  function Student(name, age, price) {
    Person.call(this, name, age)  // 为了得到属性
    this.price = price
  }

  //写法一：
  Student.prototype = new Person() // 为了能看到父类型的方法
  //写法二:
  Student.prototype = Person.prototype  //矫正原型链实现原型链继承

  Student.prototype.constructor = Student //修正constructor属性

  Student.prototype.setPrice = function (price) {
    this.price = price
  }

  var stu = new Student('Tom', 24, 15000)
  stu.setName('Bob')
  stu.setPrice(16000)
  console.log(stu.name, stu.age, stu.price)
```

::: primary
在后续 Typescript 章节会对此部分重新详细解释
:::

#### Class 的 extends 实现继承(ES6章节说明)

## new 一个对象背后做了些什么

1. 创建一个空对象{}
2. 给对象设置**\_\_proto\_\_**，值为构造函数对象的 prototype 属性值，this.\_\_proto\_\_ = Fn.prototype
3. 执行构造函数题（给空对象添加属性/方法）
