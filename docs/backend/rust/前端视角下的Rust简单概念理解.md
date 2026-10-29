---
title: 前端视角下的 Rust 简单概念理解
date: 2025-01-08 19:51:48
tags:
 - Rust
isShowComments: true
publish: true
---

## 前言

1. Rust 的语法设计确实繁琐复杂，但是编程语言底层思想终归是万变不离其宗的。在学习 TS 类型体操和函数式编程思想后，去学习 Rust 的过程中，我发现很多地方有异曲同工之妙。于是重新梳理了一下以便帮助自己更好地去理解 rust 一些概念。

## 结构体 Struct

类似于 TS 中的对象，也可以用来表示具名元组和定义新的类型。

### 🌰Struct 例子

1. 定义一个对象

    ```typescript
    // 定义接口
    interface Animals{
      age: number
      sex: string
    }
    // 约束对象
    const dog:Animals = {
      age: 3,
      sex: "male",
    }
    
    ```

    ```rust
    // 定义特征
    struct Animals{
      age: u16,
      sex: &str
    }
    // 约束对象
    let dog = Animals{
      age: 3,
      sex: "male",
    }
    ```

2. 定义一个具名元组

    ```typescript
    const point: [number, number, number] = #[0, 0, 0]
    ```

    ```rust
    struct Color(i32, i32, i32);
    struct Point(i32, i32, i32);

    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
    ```

3. 定义一个新的类型

    ```typescript
    type Age = number
    const age: Age = 3
    ```

    ```rust
    struct Age(u16); // 定义一个Age类型，只能存储u16类型的数据
    let age = Age(3);

    struct Wrapper(Vec<String>);
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    ```

4. Struct + impl = Class

    ```typescript
    class Dog{
      constructor(public age:number){}
      sing(){
        console.log('wanwan...')
      }
    }
    const dog = new Dog(3)
    dog.age // 3
    dog.sing() // wanwan...
    ```

    ```rust
    struct Dog{
      age: u16
    }
    impl Dog{
      fn sing(&self){
        println!("wanwan...")
      }
    }
    let dog = Dog{age:3};
    dog.age // 3
    dog.sing() // wanwan...
    ```

## 特征 Trait

类似 TS 中的抽象类，一般用于接口约束，表示要实现某个特征方法。  

### 🌰Trait 例子

1. 实现接口约束：  

    ```typescript
    // 定义接口
    interface Animals{
      call(sound:string):void
    }
    // 实现接口
    abstract class BaseAnimals implements Animals{
      call(sound:string):void
      // 可以有默认实现
      sing():void{
        console.log('wanwan...')
      }
    }
    // Dog继承了BaseAnimals，相当于要去实现Animals接口，且有默认sing的能力
    class Dog extends BaseAnimals{
      call(sound){
        console.log(sound)
      }
    }
    ```

    ```rust
    // 定义特征
    trait Animals{
      fn call(&self,sound:&str);
      // 可以有默认实现
      fn sing(&self){
        println!("wanwan...")
      }
    }
    // 为Dog实现Animals特征,可以简单理解为继承了Animals抽象类
    impl Animals for Dog{
      fn call(&self,sound:&str){
        println!("{}",sound)
      }
    }
    ```
