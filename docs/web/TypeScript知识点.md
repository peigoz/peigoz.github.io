---
title: TypeScript知识点
date: 2021-03-26 21:46:08
categories:
  - TypeScript
tags:
  - TypeScript
isShowComments: true
publish: true
---

## TypeScript 的数据类型

1. 布尔类型(boolean)
2. 数字类型(number):整数和浮点数都可以满足 number 类型限定
3. 字符串类型(string)
4. 数组类型(array)
   - 第一种方式：`let arr:number[] = [1,2,3,4,4]`
   - 第二种方式：`let arr:Array<number> = [1,23,4,5,6.51,7]`
5. 元组类型(tuple) 属于数组的一种，规定数组的每个元素格式
   - `let arr:[string,number,boolean] = ['ts',12,true]`
6. 枚举类型(enum) 用来定义标识符

   ```ts
   enum Flag {
     success = 1,
     error = -1,
   }
   const f: Flag = Flag.success
   console.log(f, Flag.error) //1，-1
   ```

7. 任意类型(any)

   1. 建议非不得已不要使用 any

   ```typescript
   const oBox: any = document.getElementById('box') //在ts中不指定为any会报错
   oBox.style.color = 'red'
   ```

8. null 和 undefined

   ```ts
   let num: undefined //不指定会报错
   console.log(num)
   //定义未赋值变量：
   let num: number | undefined
   num = 123 //num只能赋值为number格式
   //一个元素可能是string可能是Null也可能是undefined
   let str: string | null | undefined
   str = hello
   ```

9. void 类型 表示没有任何类型，一般用于定义方法的时候方法没有返回值

   - 用法：

   ```ts
   //表示方法没有返回任何类型
   function run(): void {
     console.log('没有返回值')
   }
   ```

10. never 类型 是其他类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明 never 的变量只能被 never 类型的值所赋值，一般不会用到，可用 any 替代

    - 用法：

    ```ts
    let a: never
    a = 123 //错误写法
    //正确用法
    a = (() => {
      throw new Error('错误')
    })()
    ```

## 函数

1. 函数的定义

   ```ts
   //函数声明方法
   function run(): string {
     return 'run'
   }
   //匿名函数
   //注意：箭头函数this指向的问题，箭头函数里面的this指向上下文(即内部this等于函数外部的this)
   const run = (): string => {
     return 'run2'
   }
   //定义方法传参
   function getInfo(name: string, age: number): string {
     return `${name}---${age}`
   }
   console.log(getInfo('zhangsan', 18))
   //没有返回值的方法
   function run(): void {
     console.log('hello')
   }
   run()
   ```

2. 函数的参数

   ```ts
   //可选参数：es5 中实参和形参可以不一样，但是 ts 中必须一样，如果不一样需要配置可选参数(?)
   //注意：可选参数必须配置到参数的最后面
   function getInfo(name: string, age?: number): string {
     if (age) {
       return `${name}---${age}`
     } else {
       return `${name}---age不存在`
     }
   }
   console.log(getInfo('zhangsan'))

   //默认参数：es5 中没法设置默认参数，es6 和 ts 都可以设置默认参数
   function getInfo(name: string, age: number = 20): string {
     return `${name}---${age}`
   }
   console.log(getInfo('zhangsan')) //zhangsan---20

   //剩余参数
   function sum(a: number, b: number, c: number): number {
     return a + b + c
   }
   function sum(...result: number[]): number {
     return result.reduce((pre, cur) => {
       return pre + cur
     }, 0)
   }
   console.log(sun(1, 2, 3, 4)) //10
   function sum(a: number, ...result: number[]): number {
     return result.reduce((pre, cur) => {
       return pre + cur
     }, a)
   }
   console.log(sun(1, 2, 3, 4)) //10
   ```

3. 函数重载

   - java 中方法的重载：重载指的是两个或两个以上同名函数，但它们的次数不一样，这时会出现函数重载的情况
   - ts 中的重载：通过为同一个函数提供多个函数类型定义来实现多个功能的目的
   - ts 为了兼容 es5 和 es6，重载的写法和 java 有所区别

     ```ts
     //es5 中出现同名的方法，下面的会替换上面的方法
     function css(config) {
       //...
     }
     function css(config, value) {
       //...
     }
     //ts 中的重载
     function getInfo(name: string): string
     function getInfo(age: number): number
     function getInfo(str: any): any {
       if (typeof str === 'string') {
         return '我叫:' + str
       } else {
         return str
       }
     }
     console.log(getInfo('张三')) //我叫：张三
     console.log(getInfo(20)) //20
     console.log(getInfo(true)) //报错，匹配到 string 和 number 以外的参数类型

     function getInfo(name: string): string
     function getInfo(name: string, age: number): string
     function getInfo(name: any, age?: any): any {
       //加?代表可以兼容第一个 getInfo，有 age 实现第二个函数，没有则实现第一个,不加会报错
       if (age) {
         return '我叫:' + name + '我的年龄是：' + age
       } else {
         return '我叫:' + name
       }
     }
     console.log(getInfo('张三')) //我叫：张三
     console.log(getInfo(20)) //报错,在上面两个函数中，只传入一个代表为上面函数，此时参数类型应该为 string
     console.log(getInfo('张三', 20)) //我叫：张三 我的年龄是：20
     ```

## TypeScript 中的类

### 类与对象

1. 类(Class):定义了一切事物的抽象特点
2. 对象(Object):类的实例
3. 面向对象(OOP)三大特性:继承、封装、多态

### 具体用法

1. es5 中实现类

   ```js
   function Person(name, age) {
     this.name = '张三'
     this.age = age
     this.run = function() {
       console.log(this.name + '....')
     }
     this.age = function() {
       console.log(this.name, this.age)
     }
   }
   //实例方法：原型链上的属性会被多个实例共享 构造函数上的不会
   Person.prototype.work = function() {
     console.log(this.name + '工作....')
   }
   var p = new Person()
   p.run()
   p.work()

   //静态方法：
   Person.getInfo = function() {
     console.log('我是静态方法')
   }
   //调用静态方法
   Person.getInfo()

   //Web 类继承 Person 类 原型链+对象冒充的组合继承模式
   //1.对象冒充
   function Web() {
     Person.call(this) //对象冒充实现继承
   }
   var w = new Web()
   w.run() //张三... 对象冒充可以继承构造函数里面的属性和方法
   w.work() //error:但是不能继承原型链上面的属性和方法

   //2.原型链：既可以继承构造函数上面的属性和方法，也可以继承原型链上面的属性和方法,但是实例化的时候没法给父类传参
   function Web2() {
     //...
   }
   Web.prototype = new Person() //原型链实现继承
   var w2 = new Web()
   w2.run() //张三...
   w2.work() //张三工作...

   var w3 = new Web('赵四', 20) //张三，undefined 实例化的时候没法给父类传参

   //3. 组合继承
   //写法一：
   function Web3(name, age) {
     Person.call(this, name, age) //对象冒充继承，实例化子类可以给父类传参
   }
   Web.prototype = new Person()
   //让子类型的原型的 constructor 指向子类型,本来位于 Object 对象并指向 Supper，即 sub.**proto**.**proto**.constructor=Supper
   //现在在 Super 实例对象创建 constructor 属性并指向 Student,即 sub.**proto**.constructor = Student
   Web.prototype.constructor = Web //修正 construction
   //写法二：
   function Web4(name, age) {
     Person.call(this, name, age) //对象冒充继承，实例化子类可以给父类传参
   }
   Web.prototype = Person.prototype //矫正原型链实现原型链继承
   Web.prototype.constructor = Web //修正 constructor
   ```

2. ts 中实现类的定义

   ```js
   class Person {
     name: string //属性 前面省略了 public 关键词
     constructor(name: string) {
       //构造函数 实例化类的时候触发的方法
       this.name = name
     }
     run(): void {
       alert(this.name)
     }
   }
   const p = new Person('张三')
   p.run()
   ```

3. ts 中实现继承 extends、super

   ```js
   class Web extends Person {
     constructor(name: string) {
       super(name)
     }
     work() {
       alert(`${this.name}...`)
     }
   }
   const w = new Web('李四')
   w.run() //李四
   w.work() //李四...
   ```

4. 类中的修饰符

   - public: 公有，默认值。在当前类里面、子类、类外面 都可以访问
   - protected: 保护类型，在当前类里面、子类中可以访问，在类外部无法访问
   - private: 私有，在当前类里面可以访问，子类、类外部无法访问

   ```js
   //子类访问
   const w = new Web('李四')
   w.run() //run 方法是父类中的方法，父类中访问 name 属性
   w.work() //子类中访问 name 属性
   //类外部访问共有属性
   const s = new Person('王五')
   console.log(s.name) //王五
   ```

5. 静态属性 静态方法

   ```js
   function Person() {
     //实例方法
     this.run = function () {}
   }
   //静态方法
   Person.staticRun = function () {
     return '静态方法'
   }
   Person.staticRun() //静态方法的调用
   //静态属性
   Person.name = '哈哈'

   class Person {
     private name: string
     static sex = 'name'
     constructor(name: string) {
       this.name = name
     }
     //实例方法
     run() {
       alert(`${this.name}。。。`)
     }
     //静态方法 在静态方法里面没法直接调用类里面的 name 属性,解决方法:设置为静态属性
     static print() {
       console.log('this is static' + Person.sex + this.sex)
     }
   }
   Person.print() //this is static 男 男
   ```

6. 多态
   - 定义：父类定义一个方法不去实现，让继承它的子类去实现，每一个子类有不同的表现
   - 多态属于继承
7. 抽象类和抽象方法

   - typescript 中的抽象类：提供给其他类继承的基类，不能直接被实例化。
   - 用 abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
   - 抽象类和抽象方法用来定义标准。
   - 抽象方法只能出现在抽象类中。

   ```ts
   //抽象类和抽象方法用来定义标准：Animal 这个类要求它的子类必须包含 call 方法
   abstract class Animal {
     //多态，定义方法不实现，让子类去实现
     abstract call(): string
   }
   //const a = new Animal() //错误的写法,抽象类无法实例化

   class Dog extends Animal {
     //抽象类的子类必须实现父类中的抽象方法
     call() {
       return '汪汪汪》。。'
     }
   }
   class cat extends Animal {
     call() {
       return '喵喵喵》。。'
     }
   }
   ```

#### TypeScript 中的接口

1. 接口

   - 接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。typescript 中的接口类似于 java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。
   - 接口也是定义标准的一种

2. 属性接口

   - 作用：对 json 的约束
   - 用途：行为和动作的规范，对批量方法进行约束

   ```ts
   //ts 定义方法必须传入参数
   function printLabel(label: string): void {
     console.log('printLabel' + label)
   }
   printLabel('hhh')

   //ts 中自定义方法传入参数对 json 进行约束：必须传入一个对象，对象中要有 label 属性，值为字符串
   function printLabel(labelInfo: { label: string }): void {
     console.log('printLabel' + label)
   }
   //printLabel('hhh') //错误
   //printLabel({name:'hhh'}) //错误
   printLabel({ label: 'hhh' }) //正确

   //接口:对批量方法传入的参数进行约束。属性接口
   interface fullName {
     firstName: string //注意：分号结束
     secondName: string
   }
   function printName(name: fullName) {
     //必须传入 firstName secondName,值为字符串类型
     console.log(name.firstName + '--' + name.secondName)
   }
   function printName2(name: fullName) {
     //必须传入 firstName secondName,值为字符串类型，传入顺序无要求
     console.log(name.firstName + '@@@' + name.secondName)
   }
   //传参
   printName({ firstName: '张', secondName: '三', age: 20 }) //报错，这种写法传入对象只能拥有 firstName secondName，不能有其他属性 age

   const obj = { firstName: '张', secondName: '三', age: 20 }
   printName(obj) //可正常运行，直接传入一个对象表示对象中拥有 firstName secondName 即可，可以拥有其他属性，但是在 printName 中无法获取 age 属性的值，会报错
   ```

3. 接口可选属性

   ```ts
   interface fullName {
     firstName: string //注意：分号结束
     secondName?: string //可选属性，可传可不传
   }

   //案例
   interface Config {
     type: string
     url: string
     data?: string
     dataType: string
   }
   //原生 js 封装的 ajax
   function ajax(config: Config) {
     var xhr = new XMLHttpRequest()

     xhr.open(config.type, config.url, true)
     xhr.send(config.data)
     xhr.onreadystatechange = function() {
       if (xhr.readyState == 4 && xhr.status == 200) {
         console.log('success')
         if (config.dataType == 'json') {
           console.log(JSON.parse(xhr.responseText))
         } else {
           console.log(xhr.responseText)
         }
       }
     }
   }
   ajax({
     type: 'get',
     data: 'name=zhangsan',
     url: 'http://a.itying.com/api/productlist', //api
     dataType: 'json',
   })
   ```

4. 函数类型接口

   - 对方法传入的参数以及返回值进行约束

   ```ts
   //加密的函数类型接口:参数和返回值为 string
   interface encrypt {
     (key: string, value: string): string
   }
   const md5: encrypt = function(key: string, value: string): string {
     return `${key}--${value}`
   }
   md5('name', 'zhangsan')
   ```

5. 可索引接口

   - 数组、对象的约束(不常用)

   ```ts
   //ts 定义数组的方式
   var arr: number[] = [123, 2, 3, 3]
   var arr1: Array<string> = ['122', '334', '532']

   //可索引的接口 对数组的约束
   interface UserArr {
     [index: number]: string
   }
   var arr2: UserArr = ['aaa', 'vbb']

   //可索引的接口 对对象的约束
   interface UserObj {
     [index: string]: string
   }
   var obj: UserObj = {
     name: '张三',
   }
   ```

6. 类类型接口

   - 对类的约束 和 抽象类有点相似

   ```ts
   interface Animal {
     name: string
     call(str: string): void //参数可不传，要传则只能传 string 类型
   }
   class Dog implements Animal {
     name: string
     constructor(name: string) {
       this.name = name
     }
     call() {
       console.log(this.name + '汪汪汪。。。')
     }
   }
   class Cat implements Animal {
     name: string
     constructor(name: string) {
       this.name = name
     }
     call(sound: string) {
       console.log(this.name + sound + '。。。')
     }
   }
   const c = new Cat('小猫')
   d.call('喵喵喵') //小猫喵喵喵。。。
   ```

7. 接口扩展

   - 接口可以继承接口

   ```ts
   interface Animal {
     eat(): void
   }
   interface Person extends Animal {
     work(): void
   }
   class Programmer {
     public name: string
     constructor(name: string) {
       this.name = name
     }
     coding(code: string) {
       console.log(this.name + code)
     }
   }
   class Web extends Programmer implements Person {
     public name: string
     constructor(name: string) {
       super(name)
     }
     eat() {
       console.log(this.name + '喜欢吃水果')
     }
     work() {
       console.log(this.name + '写代码')
     }
   }
   const w = new Web('zhong')
   w.eat()
   w.coding('写 ts 代码') //zhong 写 ts 代码
   ```

## 泛型

1. 泛型的定义

   - 泛型，软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
   - 在像 C#和 Java 这样的语言中，以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。
   - 通俗理解：泛型就是解决类 接口 方法的复用性、以及对不特定数据类型的支持。

2. 泛型函数

   ```ts
   //只能返回 string 类型的数据
   function getData(value: string): string {
     return value
   }

   //同时返回 string 类型和 number 类型 (代码冗余),使用 any 可以解决这个问题，但是意味着放弃了类型检查
   function getData1(value: string): string {
     return value
   }
   function getDat2(value: number): number {
     return value
   }

   //传入什么，返回什么。例如：传入 Number 类型则必须返回 number 类型
   //使用 any 传入的参数类型和返回的参数类型可以不一致
   function getData(value: any): any {
     return value
   }
   //使用泛型：可以支持不特定的数据类型，具体什么类型是在调用这个方法的时候决定的 要求：传入的参数和返回的参数一致
   function getData<T>(value: T): T {
     return value
   }
   getData<number>(123)
   getData<string>('123')
   ```

3. 泛型类

   ```ts
   //比如有个最小堆算法，需要同时支持返回数字和字符串两种类型。通过类的泛型来实现
   class MinClass {
     public list: number[] = []
     add(num: number) {
       this.list.push(num)
     }
     min(): number {
       return Math.min(...this.list)
     }
   }
   const m = new MinClass()
   m.add(2)
   m.add(3)
   m.min() //2

   //类的泛型
   class MinClass<T> {
     public list: T[] = []
     add(value: T): void {
       this.list.push(value)
     }
     min(): T {
       const sortNumber = (a, b): number => {
         return a - b
       }
       const newList = this.list.sort(sortNumber)
       return newList[0]
     }
   }
   const m1 = new MinClass<number>() //实例化类，并且制定了类的 T 代表的类型是 number 类型
   ```

4. 泛型接口

   ```ts
   //函数接口
   interface ConfigFn {
     (value1: string, value2: string): string
   }
   const setData: ConfigFn = function(val1: string, val2: string): string {
     return val1 + val2
   }
   setData('name', 'zhong')

   //泛型接口
   //写法一：
   interface ConfigFn {
     <T>(value1: T, value2: T): T
   }
   //写法二：
   interface ConfigFn<T> {
     (value1: T, value2: T): T
   }
   //用法一：
   const getData: ConfigFn = function<T>(val: T, val2: T): T {
     return val1 + val2
   }
   getData<string>('name', 'zhong')

   //用法二：
   function getData<T>(val: T, val2: T): T {
     return val1 + val2
   }
   const myGetData: ConfigFn<string> = getData
   myGetData('name', 'zhong')
   ```

5. 泛类

   - 泛型可以帮助我们避免重复的代码以及对不特定数据类型的支持（类型检验），下面我们看看把类当做参数的泛型类

   ```ts
   /**
    * - 1、定义个类
    * - 2、把类作为参数来约束数据传入的类型
    */
   //定义一个 User 的类,这个类的作用就是映射数据库字段
   //然后定义一个 MysqlDb 的类,这个类用于操作数据库
   //然后把 User 类作为参数传入到 MysqlDb 中
   class User {
     username: string | undefined
     password: string | undefined
   }
   class MysqlDb {
     add(user: User): boolean {
       console.log(user)
       return true
     }
   }
   const u = new User()
   u.username = 'zhong'
   u.password = 'root'
   const Db = new MysqlDb()
   Db.add(u)

   //校验多个类的时候要反复修改 MysqlDb,使用泛型类避免
   //操作数据库的泛型类
   class MysqlDb<T> {
     add(info: T): boolean {
       console.log(info)
       return true
     }
     updated(info: T, id: number): boolean {
       console.log(info)
       console.log(id)
       return true
     }
   }
   //想给 User 表增加数据
   //1、定义一个 User 类和数据库进行映射
   class User {
     username: string | undefined
     password: string | undefined
   }
   const u = new User()
   u.username = 'zhong'
   u.password = 'root'
   //类当作参数的泛型类
   const Db = new MysqlDb<User>()
   Db.add(u)

   //2.定义一个 ArticleCate 类和数据库进行映射
   class ArticleCate {
     title: string | undefined
     desc: string | undefined
     status: number | undefined
     constructor(params: {
       title: string | undefined
       desc: string | undefined
       status?: number | undefined
     }) {
       this.title = params.title
       this.desc = params.desc
       this.status = params.status
     }
   }
   const a = new ArticleCate({
     title: '分类',
     desc: '描述',
   })
   const b = new new ArticleCate({
     title: '分类 11',
     desc: '描述 111',
   })()
   b.status = 1
   const Db = new MysqlDb<ArticleCate>()
   Db.add(a)
   Db.updated(b, 12)
   ```

## 模块化

1. 概念
   - 模块的的概念（官方）：关于术语的一点说明：请务必注意一点，Typescript 1.5 里术语名已经发生了变化。"内部模块"现在称做"命名空间"。
     "外部模块"现在则简称为“模块”，模块在其自身的作用域里执行，而不是在全局作用域里；这意味着定义在一个模块里的变量、函数、类等等在模块外部是不可见的，除非你明确地使用 export 形式之一导出它们。
   - 相反，如果想使用其它模块导出的变量、函数、类、接口等的时候，你必须要导入它们，可以使用 import 形式之一。
2. 模块的概念（自己理解）：
   - 我们可以把一些公共的功能单独抽离成一个文件作为一个模块。
   - 模块里面的变量、函数、类等默认是私有的，如果我们要在外部访问模块里面的数据（变量、函数、类）
   - 我们需要通过 export 暴露模块里面的数据（变量、函数、类）。
   - 暴露后我们通过 import 引入模块就可以使用模块里面暴露的数据（变量、函数、类...）

## 命名空间

1. 命名空间：
   - 在代码量较大的情况下，为了避免各种变量命名相冲实，可将相似功能的函数、类、接口等放置到命名空间内
   - 同 Java 的包、.Net 的命名空间一样，Typescript 的命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象。命名空间内的对象通过 export 导出
2. 命名空间和模块的区别
   - 命名空间：内部模块，主要用于组织代码，避免命名冲实。
   - 模块：ts 的外部模块的简称，侧重代码的复用，一个模块里可能会有多个命名空间。

## 装饰器

1. 概念
   - 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为。
   - 通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。
   - 常见的装饰器有：类装饰器、属性装饰器、方法装装饰器、参数装饰器
   - 装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）
   - 装饰器是过去几年中 js 最大的成就之一，已是 ES7 的标准特性之一
2. 类装饰器

   - 类装饰器在类声明之前被声明（紧靠着类声明）。类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。传入一个参数

   ```ts
   //普通装饰器
   function logClass(params: string) {
     console.log(params) //params 就是当前类，可以在不修改类的前提下给类扩展功能
     params.prototype.apiUrl = 'xxxx 动态扩张属性'
     params.prototype.run = function() {
       console.log('run....')
     }
   }

   //调用普通装饰器，不用传参
   @logClass
   class HttpClient {
     constructor() {}
     getData() {}
   }
   const http = new HttpClient()
   console.log(http.apiUrl) //xxxx 动态扩张属性
   http.run() //run....

   //装饰器工厂(可传参)
   function logClass(params: string) {
     return function(target: any) {
       console.log(target)
       console.log(params) //http://www.candane.top
       target.prototype.apiUrl = params
     }
   }
   //调用装饰器工厂(可传参),表示把 hello 赋值给 params，把当前类赋值给 target
   @logClass('http://www.candane.top')
   class HttpClient {
     constructor() {}
     getData() {}
   }
   const http = new HttpClient()
   console.log(http.aiUrl)

   //重载构造函数案例:
   // 类装饰器表达式在运行时当作函数被调用，类的构造函数作为其唯一的参数
   // 如果类装饰器返回一个值，它会使用提供的构造函数来替换当前类的声明
   function logClass(target: string) {
     console.log(target) //当前类
     return class extends target {
       apiUrl: any = '我是重载修改后的数据'
       getData() {
         console.log(this.apiUrl)
       }
     }
   }

   @logClass('http://www.candane.top')
   class HttpClient {
     public apiUrl: string | undefined
     constructor() {
       this.apiUrl = '我是构造函数里面的 apiUrl'
     }
     getData() {
       console.log(this.apiUrl)
     }
   }
   const http = new HttpClient()
   http.getData() //我是重载修改后的数据
   ```

3. 属性装饰器

   - 属性装饰器表达式会在运行时当作函数被调用，传入下列两个参数
     1. 对于静态成员来说是类的构造器，对于实例成员是类的原型对象
     2. 成员的名字

   ```ts
   //类装饰器
   function logClass(params: string) {
     return function(target: any) {
       console.log(target)
       console.log(params)
     }
   }
   //属性装饰器
   function logProperty(params: any) {
     return function(target: any, attr: any) {
       console.log(params) //http://www.candane.top
       console.log(target)
       console.log(attr) //url
       target[attr] = params //将 url 的值从 xxxx 修改为http://www.candane.top
     }
   }
   //调用装饰器工厂(可传参),表示把 hello 赋值给 params，把当前类赋值给 target
   @logClass('xxxx')
   class HttpClient {
     @logProperty('http://www.candane.top') //属性装饰器装饰 url，后面不需要加分号
     public url: any | undefined
     constructor() {}
     getData() {
       console.log(this.url)
     }
   }
   const http = new HttpClient()
   http.getData() //http://www.candane.top
   ```

4. 方法装饰器

   - 它会被应用到方法的属性描述符上，可以用来监视、修改或者替换方法定义
   - 方法装饰器会在运行时传入下列 3 个参数:
     1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象.
     2. 成员的名字
     3. 成员的属性描述符

   ```ts
   //方法装饰器
   function logMethod(prams: any) {
     return function(target: any, methodName: any, desc: any) {
       console.log(target)
       console.log(methodName) //getData
       console.log(desc.value) //打印当前方法
       //动态添加属性
       target.apiUrl = 'xxxx'
       //动态添加方法
       target.fun = function() {
         console.log('fun...')
       }
       //修改装饰器的方法，把装饰器方法里面传入的所有参数修改为 string 类型
       //1. 保存当前方法
       const oMethod = desc.value
       desc.value = function(...args: any[]) {
         args = args.map(value => {
           return String(value)
         })
         oMethod.apply(this, args)
       }
     }
   }
   class HttpClient {
     public url: any | undefined
     constructor() {}
     @logMethod('http://www.candane.top')
     getData() {
       console.log(this.url)
     }
   }
   const http = new HttpClient()
   http.fun() //fun...
   ```

5. 方法参数装饰器

   - 参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下列 3 个参数:
     1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象.
     2. 方法的名称
     3. 参数在函数参数列表中的索引

   ```ts
   function logParams(params: any) {
     return function(target: any, methodName: any, paramsIndex: any) {
       console.log(params) //xxxx
       console.log(target) //当前类对象
       console.log(methodName) //方法名称 getData
       console.log(paramsIndex) //索引位置 0，最后执行 getData 方法本身，打印 uuid 12345
     }
   }
   class HttpClient {
     public url: any | undefined
     constructor() {}
     getData(@logParams('xxxx') uuid: any) {
       console.log(this.uuid)
     }
   }
   const http = new HttpClient()
   http.getData(12345) //fun...
   ```

6. 装饰器执行顺序

   - 属性 >> 方法 >> 方法参数 >> 类
   - 同类装饰器从后往前执行

   ```ts
   function logClass1(params: string) {
     return function(target: any) {
       console.log('类装饰器 1')
     }
   }
   function logClass2(params: string) {
     return function(target: any) {
       console.log('类装饰器 2')
     }
   }
   function logAttribute(params?: string) {
     return function(target: any, attrName: any) {
       console.log('属性装饰器')
     }
   }
   function logMethod(params?: string) {
     return function(target: any, attrName: any, desc: any) {
       console.log('方法装饰器')
     }
   }
   function logParams1(params?: string) {
     return function(target: any, attrName: any, desc: any) {
       console.log('方法参数装饰器 1')
     }
   }
   function logParams2(params?: string) {
     return function(target: any, attrName: any, desc: any) {
       console.log('方法参数装饰器 2')
     }
   }
   @logClass1('xxx')
   @logClass2('yyy')
   class HttpClient {
     @logAttribute()
     public url: any | undefined
     constructor() {}
     @logMethod()
     getData() {
       console.log('getData')
     }
     setData(@logParams1() attr1: any, @logParams2() attr2: any) {}
   }
   const http = new HttpClient() //属性装饰器=>方法装饰器=>方法参数装饰器 2=>方法参数装饰器 1=>类装饰器 2=>类装饰器 1
   ```
