---
title: 理解Deref解引用
date: 2025-06-18 09:00:40
tags:
 - Rust
isShowComments: true
publish: true
---

## 常规引用下的 `&` 和 `*`

常规引用 `&` （c 语言叫取地址符）是一个指针类型，包含了目标数据存储的内存地址。对常规引用使用  `*`  操作符，就可以通过解引用的方式获取到内存地址对应的数据值

```rust
fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

## 智能指针下的解引用

智能指针往往是基于结构体实现，同时实现了 `Deref` 和 `Drop` 特征的特殊指针类型，对于智能指针而言：

- `Deref`  让智能指针像引用那样工作，同时支持解引用，例如  `*T`
- `Drop`  让智能指针离开作用域后会自动执行对应代码，例如做一些资源回收或数据清除等收尾工作  
  除了上述功能外，常见的智能指针还有其他能力如：动态字符串  `String` 、动态数组  `Vec`、`Box<T>` 堆对象分配、`Rc/Arc`多所有权机制、`Cell/RefCell` 内部可变性等等

例如对 `Box<T>` 智能指针解引用：

```rust
fn main() {
    let x = Box::new(1);
    let sum = *x + 1; // 智能指针 x 被 * 解引用为 1，然后再进行求和
}
```

::: tip 💡 提示  
对于智能指针而言，在解引用过程中实际上 Rust 为我们调用了以下方法 `*(x.deref())`，首先调用  `deref`  方法返回值的常规引用，然后通过  `*`  对常规引用进行解引用，最终获取到目标值 。同时也是因为 `deref` 返回引用类型，所以值的所有权并不会因为 `*` 解引用而被转移  
:::

我们也可以对自定义的结构体实现 `Deref` 特征，以支持 `*` 操作符解引用：

```rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}
impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0 // 这里返回一个常规引用类型，以便给 * 操作符解引用,
    }
}

fn main() {
    let x = MyBox::new(5); // 实现了 deref 特征，返回了常规引用，可以被 *y 解引用

    assert_eq!(5, *x);
}
```

## [隐式 Deref 转换](https://course.rs/advance/smart-pointer/deref.html#%E5%87%BD%E6%95%B0%E5%92%8C%E6%96%B9%E6%B3%95%E4%B8%AD%E7%9A%84%E9%9A%90%E5%BC%8F-deref-%E8%BD%AC%E6%8D%A2)

若一个类型实现了  `Deref`  特征，那它的引用在以下场景下：

1. 函数参数传递时
2. 方法调用时 ​
3. `let` 绑定赋值​
4. `return` 返回值

会进行隐式的  `Deref`  转换（对该引用进行 `*` 操作调用 `deref` 方法），且该转换是可以连续进行的，直到匹配为止。例如：

```rust
fn main() {
    let s1 = String::from("hello world");
    display(&s1); // // 自动将 String 智能智能的引用 &s 转化为函数签名定义的 &str 类型
    let s2 = Box::new(String::from("hello world"));
    display(&s2) // 连续的转换 Box<String> -> String -> &str

    let s3: &str = &s2; // 自动解引用为 &str 类型 "hello world"
    let s4: String = s2.to_string(); // 这里还发生了自动引用，即 s2 变为 &s2。接着自动解引用为 &str 类型，以匹配 to_string 方法。最后在重新转为 String 类型
    // 由于自动引用，所以上面的代码和下面是等价的
    // let s4:String = (&s2).to_string()
}

fn display(s: &str) {
    println!("{}",s);
}
```

::: tip 👀补充
当使用 `object.something()` 调用方法时，Rust 会自动为 `object` 添加 `&`、`&mut` 或 `*` 以便使 `object` 与方法签名匹配
:::

## [引用归一化](https://course.rs/advance/smart-pointer/deref.html#%E5%BC%95%E7%94%A8%E5%BD%92%E4%B8%80%E5%8C%96)

实际上，在 Rust 标准库中也会 `&T` 实现了 `Deref` 特征，但与智能指针不同的是，该方法返回值是 T 类型，而非 `&T` 类型，目的是为了把多重`&`，例如  `&&&&&&&v`，归一成  `&v`。

```rust
impl<T: ?Sized> Deref for &T {
    type Target = T;

    fn deref(&self) -> &T {
        *self
    }
}
```

在这段源码中，`&T`  被自动解引用为  `T`，也就是  `&T: Deref<Target=T>` 。 按照这个代码，`&&&&T`  会被自动解引用为  `&&&T`，然后再自动解引用为  `&&T`，以此类推， 直到最终变成  `&T`（此时也就是调用智能指针本身的引用进行解引用）

## [三种 Deref 转换](https://course.rs/advance/smart-pointer/deref.html#%E4%B8%89%E7%A7%8D-deref-%E8%BD%AC%E6%8D%A2)

Rust 存在三种 Deref 转换：

1. `T: Deref<Target=U>`：调用 `deref`方法返回新的引用将  `&T`  转换成  `&U`，也就是前面看到的例子
2. `T: Deref<Target=U>`，将  `&mut T`  转换成  `&U`
3. `T: DerefMut<Target=U>`，将  `&mut T`  转换成  `&mut U`，实现  `DerefMut`  必须要先实现  `Deref`  特征

为前面 `MyBox` 实现 `Deref` 特征：

```rust
use std::ops::DerefMut;
impl<T> DerefMut for MyBox<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.v
    }
}

fn main() {
    let mut s = MyBox::new(String::from("hello, "));
    display(&mut s) // 将 `&mut MyBox<String>` 转换为 `&mut String`
}

fn display(s: &mut String) {
    s.push_str("world");
    println!("{}", s);
}
```

## 总结

1. `Deref`  是 Rust 中最常见的隐式类型转换，发生在如函数参数、方法调用等场景下，而且它可以连续的实现如  `Box<String> -> String -> &str`  的隐式转换，只要链条上的类型实现了  `Deref`  特征。
2. `Deref` 可以把可变引用隐式的转换成不可变引用，反之则不行
3. `DerefMut` 特征用于将  `&mut T`  转换成  `&mut U` ，同时也会发生隐式 `Deref` 转换
