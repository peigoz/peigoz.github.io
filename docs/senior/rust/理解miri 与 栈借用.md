---
title: 理解miri 与 栈借用(抄录文章)
date: 2025-03-24 01:29:27
tags:
 - Rust
isShowComments: true
publish: true
---

## 什么是指针混叠(pointer aliasing)?

1. 对于同一块内存，存在多个指针指向，或者说，两个指针指向的内存存在重叠。比如：

```rust
let s = S { a: 1, b: 2 };
// 1. 两个指针指向同一个地址
let p1 = &mut s;
let p2 = &mut s;

// 2. 两个指针指向的内存存在重叠
let p1 = &mut s;
let p2 = &mut s.b;
```

## 指针混叠有什么问题？

rust一方面通过借用规则来保证安全，给程序加了很多限制，让我们写起来很费劲。另一方面因为这些限制的存在，rust编译器可以对程序做很多优化。  

比如当一个值的引用是不可变引用时，编译器知道无论怎么操作，最终这块内存的内容不会发生改变。那么再次读取时就只需读cache，而不需要去内存中读。  

编译器可以跟踪所有引用的情况，从而在可以的时候做出优化。  

设想存在指针混叠：

```rust
let s = S { a: 1, b: 2 };
let p1 = &s;
let p2 = &mut s.b;
```

p1保存了s的不可变引用，以为s可以不被修改了，结果没想到还有个p2能偷偷修改s内部的值。没有了不可变的保证，编译器的优化很可能导致问题，程序产生未定义行为(UB)。

## rust是怎么解决这个问题的？

借用栈(borrow stack)。

首先了解再借用(reborrow)的概念。
按理来说，在可变引用存在的期间，是不允许再创建不可变引用的，但是很多时候确实需要临时读一下值，因此允许这样：

```rust
let mut a = 0;

let p1 = &mut a;

let p2 = &*p1; // 先解引用，再借用
println!("{}", p2);

*p1 += 2;
```

在p2那里明显出现了指针混叠，对于同一个a同时存在可变和不可变引用。但是我们知道这里是没有问题的，因为在p1被使用之前，p2已经做完了所有的工作。

可以想象存在一个栈：

- 一开始生成一个可变引用p1，放入栈，其为活跃(live)指针。
- 然后又产生一个不可变引用p2，放入栈，此时p2成了栈顶，活跃指针变成了p2。
- 使用p2 完成工作后，出栈，活跃指针重新变为p1。
- 使用p1，p1出栈。

只要保证使用时只能使用栈顶的指针，指针混叠就不会出现问题。反过来，这样是不允许的.

```rust
let mut a = 0;

let p1 = &mut a;
let p2 = &*p1;

*p1 += 2;  // 报错
println!("{}", p2);
```

这一切都是safe rust所保证的，使用顺序不对，就不让过编译。

## 那在 unsafe 中呢？

对于引用，在unsafe中也是一样的规则

```rust
unsafe {
    let mut a = 0;
    
    let p1 = &mut a;
    let p2 = &*p1;
    
    *p1 += 2;  // 照样报错
    println!("{}", p2);
}
```

但是如果出现裸指针，就无法保证了：

```rust
// 不报错了!
unsafe {
    let mut a = 0;

    let p1 = &mut a;
    let p2 = p1 as *const i32;

    *p1 += 2;
    println!("{}", &*p2);
    println!("{}", p1);
}
```

不报错是不是说明程序这么写没问题呀?
不是。在unsafe中正需要你自己来保证正确性，不留神的话就会写出UB来：

```rust
let mut x = 42;

let reference: &i32 = &x;
let mutable_ptr: *mut i32 = reference as *const i32 as *mut i32;

// 尝试通过裸指针修改不可变引用的数据，这是 UB 行为
unsafe {
    *mutable_ptr = 10;
}

println!("Modified value: {}", x);
```

什么是UB(Undefined Behavior)？
按照rust的规则写代码，rust保证给你正确的程序。
超出rust的规则写代码，rust不保证给你写出什么东西来。

## 有没有什么办法检测不小心写出的UB?

这就是miri做的事。

```shell
# 不想每次都加 +nightly-2025-03-22 也可以通过rustup override set nightly-2025-03-22 对当前项目的Rust版本进行覆盖
# 安装 miri
rustup +nightly-2025-03-22 component add miri
# 运行 miri
cargo +nightly-2025-03-22 miri test
```

::: tip miri
miri 目前只能在 *nightly Rust* 上安装，*+nightly-2025-03-22* 告诉 *rustup* 我们想要安装的 nightly 版本，也可以直接通过 *rustup +nightly component add miri* 安装，这里指定版本是因为 miri 有时候会因为某些版本而出错。可以通过[这个网址](https://rust-lang.github.io/rustup-components-history/)获取可以运行的版本信息。
:::

## 为了保证不出UB，应该遵守哪些规则？

### 1. 对于引用和该引用产生的指针

可以想象引用和其产生的指针之间，遵守借用栈的规则：

```rust
// miri不允许
unsafe {
    let mut data = 10;
    let ref1 = &mut data; // ref1 入栈
    let ptr1 = ref1 as *mut _; // ptr1 入栈

    *ref1 += 1; // ptr1出栈，ref1出栈
    *ptr1 += 2; // 【错误】使用了已出栈的借用

    println!("{}", data);
}


// miri允许
unsafe {
    let mut data = 10;
    let ref1 = &mut data; // ref1 入栈
    let ptr1 = ref1 as *mut _; // ptr1 入栈

    *ptr1 += 2; // ptr1出栈
    *ref1 += 1; // ref1出栈

    println!("{}", data);
}
```

对于不同引用产生的指针，miri可以区分出各自属于哪个引用（用miri的术语，属于哪个tag），从而遵守借用栈规则：

```rust
// 产生过程为 &mut -> *mut -> &mut -> *mut，然后先使用第一个*mut
unsafe {
    let mut data = 10;
    let ref1 = &mut data;
    let ptr1 = ref1 as *mut _;
    let ref2 = &mut *ptr1;
    let ptr2 = ref2 as *mut _;

    // Access the first raw pointer first
    *ptr1 += 2; // 【miri报错】

    // Then access things in "borrow stack" order
    *ptr2 += 4;
    *ref2 += 3;
    *ptr1 += 2;
    *ref1 += 1;

    println!("{}", data);
}
```

很明显，ptr1属于ref1，ptr2属于ref2，ref1之后又产生的新的引用ref2，ref2在栈顶。你不能在ptr2之前使用ptr1。

当去除报错那一行后，miri表示满意。

### 2. 对于同一引用产生的多个指针

当一个引用产生一个指针，然后用该指针产生更多指针时，这些指针之间可以不区分先后顺序随意使用。它们共享同一个tag。

```rust
unsafe {
    let mut data = [0; 10];
    let ref1_at_0 = &mut data[0];            // Reference to 0th element
    // 下面这些指针都指向同一个位置
    let ptr2_at_0 = ref1_at_0 as *mut i32;   // Ptr to 0th element
    let ptr3_at_0 = ptr2_at_0;               // Ptr to 0th element
    let ptr4_at_0 = ptr2_at_0.add(0);        // Ptr to 0th element
    let ptr5_at_0 = ptr3_at_0.add(1).sub(1); // Ptr to 0th element

    // 完全不管顺序地乱七八糟地用
    *ptr3_at_0 += 3;
    *ptr2_at_0 += 2;
    *ptr4_at_0 += 4;
    *ptr5_at_0 += 5;
    *ptr3_at_0 += 3;
    *ptr2_at_0 += 2;
    *ref1_at_0 += 1;

    // Should be [20, 0, 0, ...]
    println!("{:?}", &data[..]);
}
```

miri表示没意见。

因为编译器只会根据引用来调整优化，裸指针的信息它无法获知。因此你一旦获得一个引用的指针，就可以用它生成更多指针来随意使用。

因此当我们需要使用裸指针时，最好在用引用生成裸指针后，就一直只使用裸指针，不要和引用混在一起用。最后需要返回引用时，再将裸指针转回引用。

### 3. 对于不可变引用

我们知道，对于不可变引用，可以随意产生更多的不可变引用，使用顺序也没有限制。  
同时，不可变引用不能产生可变引用：

```rust
let a = 0;
let ref1 = &a;
let ref2 = &mut *ref1; // 【报错】不允许再借用成可变引用
*ref += 1;
println!("{}",ref1);
```

当一个不可变引用入栈，需要保证：在其出栈时，其引用的值不会发生任何变化。  

换到指针，也是一样的：

```rust
unsafe {
    let mut data = 10;
    let sref = &data;
    let sptr = sref as *mut i32; // 【报错】不允许将不可变引用转成可变指针

    *sptr += 4;
    opaque_read(sref);
}
```

强行转换成可变指针，编译可通过，但miri会有意见：

```rust
unsafe {
    let mut data = 10;
    let sref = &data;
    let sptr = sref as *const i32 as *mut i32;

    *sptr += 4; // 【miri报错】no item granting write access to tag <1621> at alloc742 found in borrow stack.
    opaque_read(sref);
}
```

但如果你不真正修改值，miri可以网开一面：

```rust
unsafe {
    let mut data = 10;
    let sref = &data;
    let sptr = sref as *const i32 as *mut i32;

    //*sptr += 4;
    println!("{}", sptr); // 允许
    opaque_read(sref);
}
```

### 4. 对于数组

普通情况下，rust无法通过下标来判断对数组不同部分的借用是不相交的：

```rust
unsafe {
    let mut data = [0; 10];
    let ref1_at_0 = &mut data[0];           // 0号元素的引用
    let ref2_at_1 = &mut data[1];           // 1号元素的引用 【报错】
    let ptr3_at_0 = ref1_at_0 as *mut i32;  // 指向0号元素的指针
    let ptr4_at_1 = ref2_at_1 as *mut i32;   // 指向1号元素的指针

    *ptr4_at_1 += 4;
    *ptr3_at_0 += 3;
    *ref2_at_1 += 2;
    *ref1_at_0 += 1;

    // Should be [3, 3, 0, ...]
    println!("{:?}", &data[..]);
}
```

不行，不允许对data进行两次可变引用。  

但是rust提供了一个方法，将不安全操作封装成一个安全方法split_at_mut，将一个切片拆成两个切片：

```rust
unsafe {
    let mut data = [0; 10];

    let slice1 = &mut data[..];
    // 将一个可变切片分割成两个可变切片
    let (slice2_at_0, slice3_at_1) = slice1.split_at_mut(1); 
    
    let ref4_at_0 = &mut slice2_at_0[0];   // 引用0号元素
    let ref5_at_1 = &mut slice3_at_1[0];   // 引用1号元素
    let ptr6_at_0 = ref4_at_0 as *mut i32; // 0号元素的指针
    let ptr7_at_1 = ref5_at_1 as *mut i32; // 1号元素的指针

    *ptr7_at_1 += 7;
    *ptr6_at_0 += 6;
    *ref5_at_1 += 5;
    *ref4_at_0 += 4;

    // Should be [10, 12, 0, ...]
    println!("{:?}", &data[..]);
}
```

通过split_at_mut，把一个可变切片引用，变成了多个可变切片引用。这样下来，我们的借用栈更像是一棵树了：

```text
第四层   ptr6_at_0   ptr7_at_1
第三层   ref4_at_0   ref5_at_1
第二层 slice2_at_0   slice3_at_1
             \        /
第一层          slice1
```

### 5. 对于RefCell/Cell

由于这两个具有内部可变性，因此其不可变引用可以修改其内部的值。

```rust
let mut data = Cell::new(10);
let ref = &data;
ref.set(3);
```

这意味着什么？

我们知道不可变引用向rust保证了其引用值不会改变，因此rust才敢放心地去优化。但是现在居然有一个不可变引用，无法保证值不被修改？！那rust还怎么敢搞优化呢？

所以，Cell/RefCell 是两个特例。当出现这两个东西时，rust知道它们没有不变性保证，不会去优化它们。
这是通过内部实现中的UnsafeCell做到的。

因为其不可变引用实际上可变的特性，其栈式借用也有些不一样的地方：

```rust
unsafe {
    let mut data = UnsafeCell::new(10);
    let mref1 = &mut data;              // UnsafeCell的可变借用
    let ptr2 = mref1.get();             // 内部值的裸指针
    let sref3 = &*mref1;                // UnsafeCell的不可变引用

    *ptr2 += 2;                         // 不报错 
    println!("{}", sref3.get());        
    *sref3.get() += 3;                  
    *mref1.get() += 1;                  

    println!("{}", *data.get());
}
```

不对呀，按照借用栈的规则，ptr2属于mref1，sref3在mref1之后入栈，不能在sref3之前访问ptr2呀。

因为对于 &UnsafeCell\<T>，其实际上是可变的，而且可以无限复制(因为在名义上是一个不可变引用)，其行为和 *mut T 一样。
因此上面代码可以看做从 &mut data 中创建了两个裸指针(ptr2和sref3)。而在之前的例子中我们知道从一个引用产生的多个裸指针可以随意顺序使用。

::: tip 原文链接
这是《Rust 圣经》评论区大佬总结的抄录，觉得讲的特别好所以抄录了一遍。原文链接在[这里](https://course.rs/too-many-lists/unsafe-queue/stacked-borrow.html)
:::
