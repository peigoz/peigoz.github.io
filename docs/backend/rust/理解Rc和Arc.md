---
title: 理解Rc和Arc
date: 2025-06-17 03:39:16
tags:
 - Rust
isShowComments: true
publish: true
---

## 所有权

所有的程序都必须和计算机内存打交道，如何从内存中申请空间来存放程序的运行内容，如何在不需要的时候释放这些空间，成了重中之重，也是所有编程语言设计的难点之一。在计算机语言不断演变过程中，出现了三种流派：

- **垃圾回收机制(GC)**，在程序运行时不断寻找不再使用的内存，如：JS、Go
- **手动管理内存的分配和释放**, 在程序中，通过函数调用的方式来申请和释放内存， 如：C++
- **通过所有权来管理内存**，编译器在编译时会根据一系列规则进行检查，如：Rust  
  在 Rust 中，所有权的规则如下：

1. Rust 中每一个值（内存）都被一个变量所拥有，该变量被称为值的所有者
2. 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
3. 当所有者（变量）离开作用域范围时，这个值将被丢弃(drop)  
   变量所有权的检查只发生在编译期，因此对于程序运行期，不会有任何性能上的损失。

### 所有权补充

::: tip 💡 提示  
存在于栈上的数据（基本数据类型）并不会发生所有权转移，而是会发生自动拷贝。  
只有存在于堆中的数据才会产生所有权转移。  
:::

```rust
let x: &str = "hello, world";
let y = x; // 发生拷贝，没有所有权的概念。因为 &str 是基本数据类型，并不是存在堆上
println!("{},{}",x,y); // 正常使用 x,y

let s1 = String::from("hello");  // String 类型存在堆上
let s2 = s1; // 发生所有权转移，后续使用 s1 将报错
```

## Rc 和 Arc 的作用

Rust 所有权机制要求一个值只能有一个所有者，在大多数情况下，都没有问题，但是考虑以下情况：

- 在图（链表）数据结构中，多个边可能会拥有同一个节点，该节点直到没有边指向它时，才应该被释放清理
- 在多线程中，多个线程可能会持有同一个数据，但是你受限于 Rust 的安全机制，无法同时获取该数据的可变引用  
  为了解决此类问题，Rust 在所有权机制之外又引入了额外的措施来简化相应的实现：通过引用计数的方式，允许一个数据资源在同一时刻拥有多个所有者。

这种实现机制就是  `Rc`  和  `Arc`，前者适用于单线程，后者适用于多线程。二者大部分情况下都相同

## [`Rc<T>`](https://course.rs/advance/smart-pointer/rc-arc.html#rct)

引用计数(reference counting)，顾名思义，通过记录一个数据被引用的次数来确定该数据是否正在被使用。当引用次数归零时，就代表该数据不再被使用，因此可以被清理释放。  
事实上，`Rc<T>`  是**指向底层数据的不可变的引用**，因此你无法通过它来修改数据，这也符合 Rust 的借用规则：要么存在多个不可变借用，要么只能存在一个可变借用。

::: tip 💡 提示  
实际开发中我们往往需要对数据进行修改，这时单独使用  `Rc<T>`  无法满足我们的需求，需要配合其它数据类型来一起使用，例如内部可变性的  `RefCell<T>`  类型。  
:::

Rc 没有实现 `Send` 特征，无法在多线程中使用：

```rust
use std::rc::Rc;
use std::thread;

fn main() {
    let s = Rc::new(String::from("多线程漫游者"));
    for _ in 0..10 {
        let s = Rc::clone(&s);
        let handle = thread::spawn(move || {
           println!("{}", s) // 报错
        });
    }
}
```

`Rc` 除了没有实现 `Send` 特征外，还有更深层的原因：由于  `Rc<T>`  需要管理引用计数，但是该计数器并没有使用任何并发原语，因此无法实现原子化的计数操作，最终会导致计数错误。

### Rc::clone

智能指针  `Rc<T>`  在创建时，会将引用计数加 1，此时获取引用计数的关联函数  `Rc::strong_count`  返回的值将是  `1`。在需要多所有权的场景时，我们可以使用`Rc::clone`  克隆了一份  `Rc`智能指针，同时将该智能指针的引用计数增加 `1`。

::: tip 💡 提示  
`RC::clone` **仅仅复制了智能指针并增加了引用计数，并没有克隆底层数据，因此复制下效率非常高**。此时多个 `RC` 指针共同指向同一份数据（`Rc` 指针不可以修改数组，相当于多个不可变引用）。  
:::

```rust
fn main() {
    let s = String::from("hello, world");
    // s在这里被转移给a
    let a = Box::new(s);
    // 报错！此处继续尝试将 s 转移给 b
    let b = Box::new(s);
}
```

使用 Rc 解决：

```rust
use std::rc::Rc;
fn main() {
    let s = Rc::new(String::from("hello, world")); // 使用 Rc::new 创建了一个新的 Rc<String> 智能指针并赋给变量 s
    let a = Rc::clone(&s); // a 和 s 是共享了底层的字符串,这里也可以使用 s.clone()。从可读性角度更推荐显示调用 Rc::clone
    assert_eq!(2, Rc::strong_count(&a)); // 此时 a 和 s 是同一个智能指针的两个副本，因此通过它们两个获取引用计数的结果都是 2
    let b = Rc::clone(&s);
    assert_eq!(3, Rc::strong_count(&s));
}
```

### 一个 Tools 的例子

考虑一个场景，有很多小工具，每个工具都有自己的主人，但是存在多个工具属于同一个主人的情况，此时使用  `Rc<T>`  就非常适合：

```rust
use std::rc::Rc;

struct Owner {
    name: String,
    // …其它字段
}

struct Gadget {
    id: i32,
    owner: Rc<Owner>,
    // …其它字段
}

fn main() {
    // 创建一个基于引用计数的 `Owner`.
    let gadget_owner: Rc<Owner> = Rc::new(Owner {
        name: "Gadget Man".to_string(),
    });

    // 创建两个不同的工具，它们属于同一个主人
    let gadget1 = Gadget {
        id: 1,
        owner: Rc::clone(&gadget_owner),
    };
    let gadget2 = Gadget {
        id: 2,
        owner: Rc::clone(&gadget_owner),
    };

    // 释放掉第一个 `Rc<Owner>`
    drop(gadget_owner);

    // 尽管在上面我们释放了 gadget_owner，但是依然可以在这里使用 owner 的信息
    // 原因是在 drop 之前，存在三个指向 Gadget Man 的智能指针引用，上面仅仅
    // drop 掉其中一个智能指针引用，而不是 drop 掉 owner 数据，外面还有两个
    // 引用指向底层的 owner 数据，引用计数尚未清零
    // 因此 owner 数据依然可以被使用
    println!("Gadget {} owned by {}", gadget1.id, gadget1.owner.name);
    println!("Gadget {} owned by {}", gadget2.id, gadget2.owner.name);

    // 在函数最后，`gadget1` 和 `gadget2` 也被释放，最终引用计数归零，随后底层
    // 数据也被清理释放
}
```

以上代码很好的展示了  `Rc<T>`  的用途，当然你也可以用借用的方式，但是结构体中的引用类型会带来引用生命周期的问题，而且随着  `Gadget`  在代码的各个地方使用，引用生命周期也将变得更加复杂，此时使用 Rc 就可以很好简化程序中的代码。

## Arc

`Arc`  是  `Atomic Rc`  的缩写，顾名思义：原子化的  `Rc<T>`  智能指针。原子化是一种并发原语，能保证我们的数据能够安全的在线程间共享。  
`Arc` 通常会配合互斥锁  `Mutex<T>`类型一起使用，保证多线程的并发安全问题。

::: warning ⚠️ 注意  
原子化或者其它锁虽然可以带来的线程安全，但是都会伴随着性能损耗，而且这种性能损耗不小。  
:::

`Arc`  和  `Rc`  拥有完全一样的 API，使用 `Arc` 处理 `Rc` 无法在多线程中使用的问题：

```rust
use std::sync::Arc; // Arc 和 Rc 并没有定义在同一个模块，
use std::thread;

fn main() {
    let s = Arc::new(String::from("多线程漫游者"));
    for _ in 0..10 {
        let s = Arc::clone(&s);
        let handle = thread::spawn(move || {
           println!("{}", s)
        });
    }
}
```

## 总结

1. `Rc/Arc`  是不可变引用，你无法修改它指向的值，只能进行读取，如果要修改，需要配合内部可变性  `RefCell`  或互斥锁  `Mutex`（通常 `Rc` 搭配 `RefCell`、`Arc` 搭配 `Mutex`）
2. 一旦最后一个拥有者消失，则资源会自动被回收，这个生命周期是在编译期就确定下来的
3. `Rc`  只能用于同一线程内部，想要用于多线程之间的对象共享，则需要使用  `Arc`
4. `Rc<T>`  是一个智能指针，实现了  `Deref`  特征，因此你无需先解开  `Rc`  指针，再使用里面的  `T`，而是可以直接使用  `T`，例如上例中的  `gadget1.owner.name`
5. `Arc`有一定的性能损耗，但是需要线程安全的代码其实占比并不高，大部分时候我们开发的程序都在一个线程内
6. `Rc/Arc` 的 `clone` 方法仅仅只是克隆智能指针，并不会克隆底层数据，因此性能很高
