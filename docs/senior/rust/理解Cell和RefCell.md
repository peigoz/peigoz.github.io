---
title: 理解Cell和RefCell
date: 2025-06-16 06:19:04
tags:
  - Rust
isShowComments: true
publish: true
---

## Cell 和 RefCell 的作用

Rust 的借用规则（同一时刻，只能拥有一个可变引用，或者多个不可变引用）带来安全提升的同时，却也损失了灵活性，在有些时候，我们可能需要对一个不可变引用的目标进行数据的修改，这对于正常的 Rust 代码来说，是不可能实现的。所以 Rust 提供了  `Cell`  和  `RefCell`  用于内部可变性。

### 内部可变性

简单来说，对一个不可变的值进行可变借用，但这个并不符合 Rust 的基本借用规则

```rust
fn main() {
    let x = 5;
    let y = &mut x; // 报错
}

// --------------------------
fn main(){
    let mut x = 1;
    let y = &x; // 可以对一个可变值进行不可变借用。
    let z = &x;
    println!("{x},{y},{z}"); // 1,1,1
    x += 1; // 修改前所有不可变借用已 drop
    println!("{x}"); // 2
}
```

我们不能对一个不可变的值进行可变借用，这会破坏 Rust 的安全性保证，相反，可以对一个可变值进行不可变借用。原因是：当值不可变时，可能存在多个不可变的引用指向它，此时若将其中一个修改为可变的，会造成可变引用与不可变引用共存的情况；而当值可变时，最多只会有一个可变引用指向它。

### 一个 Messenger 的例子

```rust
// 定义在外部库中的特征
pub trait Messenger {
    fn send(&self, msg: String);
}

// --------------------------
// 我们的代码中的数据结构和实现
struct MsgQueue {
    msg_cache: Vec<String>,
}

impl Messenger for MsgQueue {
    fn send(&self, msg: String) {
        self.msg_cache.push(msg)
    }
}
```

如上所示，外部库中定义了一个消息发送器特征  `Messenger`，它只有一个发送消息的功能：`fn send(&self, msg: String)`，因为发送消息不需要修改自身，因此原作者在定义时，使用了  `&self`  的不可变借用，这个无可厚非。  
而我们要在自己的代码中使用该特征实现一个异步消息队列，出于性能的考虑，消息先写到本地缓存(内存)中，然后批量发送出去，因此在  `send`  方法中，需要将消息先行插入到本地缓存  `msg_cache`  中。但是由于该  `send`  方法的签名是  `&self`（该定义在外部库中，不能修改为 `&mut self`），因此上述代码会报错。

## [Cell](https://course.rs/advance/smart-pointer/cell-refcell.html#cell)

`Cell`  和  `RefCell`  在功能上没有区别，区别在于  `Cell<T>`  适用于  `T`  实现  `Copy`  的情况：

```rust
use std::cell::Cell;
fn main() {
    let c = Cell::new(1);
    let one = c.get(); // 因为实现了 Copy，get 时会 copy 一份当前状态
    c.set(2); // 这里的 set 并不影响 one 的数据
    let two = c.get();
    println!("{},{}", one, two); // 1,2

    let three = &c; // 和 get 不同，这里通过借用，本质指向同一个地址 c
    three.set(3); // 同 c.set()
    println!("{},{},{},{}", one, two, c.get(), three.get()); // 1,2,3,3,3
}

// --------------------------
fn main(){
    let c = Cell::new(String::from("1")); // 报错，因为 String 没有实现 Copy 特征
}
```

## [RefCell](https://course.rs/advance/smart-pointer/cell-refcell.html#refcell)

由于  `Cell`  类型针对的是实现了  `Copy`  特征的值类型，因此在实际开发中，`Cell`  使用的并不多，因为我们要解决的往往是可变、不可变引用共存导致的问题，此时就需要借助于  `RefCell`  来达成目的。  
用 `RefCell` 修改上面所说的 Messenger 例子：

```rust
use std::cell::RefCell;
pub trait Messenger {
    fn send(&self, msg: String);
}

pub struct MsgQueue {
    msg_cache: RefCell<Vec<String>>, // 用 RefCell 包裹
}

impl Messenger for MsgQueue {
    fn send(&self, msg: String) {
        self.msg_cache.borrow_mut().push(msg) // 利用 RefCell 让 &self 中的 msg_cache 成为一个可变值，然后实现对其的修改
    }
}

fn main() {
    let mq = MsgQueue {
        msg_cache: RefCell::new(Vec::new()),
    };
    mq.send("hello, world".to_string());
}
```

需要注意的是：使用 `RefCell` 可以绕过编译器借用规则，实现编译期可变、不可变引用共存：

```rust
let b = RefCell::new(String::from("Hello world"));
let s1 = s.borrow();
let s2 = s.borrow_mut(); // 编译器不报错
println!("{},{}", s1, s2);
```

::: danger ❗️注意
`RefCell`  实际上并没有解决可变引用和引用可以共存的问题，只是将报错从编译期推迟到运行时，从编译器错误变成了  `panic`  异常，上面代码运行时依然会抛出异常，你需要确保自己的代码是正确的
:::

## 总结

1. `Cell` 只适用于 `Copy` 类型（常见的 Copy 类型见 [Rust 中的拷贝和克隆](./Rust%20中的拷贝和克隆.md)），用于提供值，而 `RefCell` 用于提供引用
2. `Cell` 不会 `panic`，而 `RefCell` 会， `RefCell`只是将借用规则从编译期推迟到程序运行期，并不能帮你绕过这个规则
3. `RefCell` 适用于需要内部可变性时或者一个引用被在多处代码使用、修改以至于难于管理借用关系时，用来简化程序代码
4. 优先使用 `Cell`，性能更佳
