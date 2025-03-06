---
title: Rust生命周期的消除规则
date: 2025-03-04 18:08:29
tags:
 - rust
isShowComments: true
publish: true
---

## 前言

1. rust 的编译器编译器使用三条消除规则来确定哪些场景不需要显式地去标注生命周期。其中第一条规则应用在输入生命周期上，第二、三条应用在输出生命周期上。若编译器发现三条规则都不适用时，就会报错，提示你需要手动标注生命周期。

## 消除规则

1. **每一个引用参数都会获得独自的生命周期。**  
  一个引用参数的函数就有一个生命周期标注: `fn foo<'a>(x: &'a i32)`，两个引用参数的有两个生命周期标注: `fn foo<'a, 'b>(x: &'a i32, y: &'b i32)`，依此类推。
2. **若只有一个输入生命周期（函数参数中只有一个引用类型），那么该生命周期会被赋给所有的输出生命周期，也就是所有返回值的生命周期都等于该输入生命周期。**  
  函数 `fn foo(x: &i32) -> &i32`，`x` 参数的生命周期会被自动赋给返回值 `&i32`，因此该函数等同于 `fn foo<'a>(x: &'a i32) -> &'a i32`。
3. **若有多个输入生命周期，但其中一个是 `&self` 或 `&mut self`，那么 `&self` 的生命周期会被赋给所有的输出生命周期。**  
  拥有 `&self` 形式的参数，说明该函数是一个 **方法**，该规则让方法的使用便利度大幅提升。
4. impl 块消除

```rust
impl<'a> Reader for BufReader<'a> {
    // methods go here
    // impl内部实际上没有用到'a
}
// 等同于
impl Reader for BufReader<'_> {
    // methods go here
}
```

## 其他规则

1. 函数的返回值如果是一个引用类型，那么它的生命周期只会来源于：  
    - 函数参数的生命周期
    - 函数体中某个新建引用的生命周期(悬垂引用场景)
2. 如果在结构体中使用引用类型,那么需要为结构体中的每一个引用标注上生命周期。且最好对内部字段的引用lifetime和这个字段类型本身的lifetime分开：  

    ```rust
    struct Interface<'text, 'manager> {
      manager: &'manager mut Manager<'text>
    }
    struct Manager<'text> {
      text: &'text str
    }

    // 生命周期约束消除
    // Rust 2015
    struct Ref<'a, T: 'a> {
        field: &'a T
    }

    // Rust 2018
    struct Ref<'a, T> {
        field: &'a T
    }
    ```

3. 用 Fn 特征解决闭包生命周期：

    ```rust
    fn main() {
      let closure_slision = fun(|x: &i32| -> &i32 { x });
      assert_eq!(*closure_slision(&45), 45);
    }

    fn fun<T, F: Fn(&T) -> &T>(f: F) -> F {
      f
    }
    ```
