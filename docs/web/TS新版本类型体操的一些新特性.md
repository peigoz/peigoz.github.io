---
title: TS新版本类型体操的一些新特性
date: 2023-03-13 21:47:15
categories:
 - TypeScript
tags:
 - TypeScript
 - TypeScript类型体操
isShowComments: true
publish: true
---

## 前言

1. TypeScript的更新迭代非常快，新版本的类型体操也有了一些新特性，本文主要介绍一下新版本的类型体操的两个新语法。包括:
`infer extends`、`satisfies`。

## infer extends(4.8版本)

1. TypeScript 支持 infer 来提取类型的一部分，通过模式匹配的方式。
  比如元组类型提取最后一个元素的类型

```ts
type Last<Arr extends unknown[]> = 
    Arr extends [...infer rest,infer Ele]
        ? Ele 
        : never;
type Res = Last<[1,2,3,4,5]>; // 5
```

2. 但是 infer 有一个问题，如果想将提取到的类型参与计算，那么会报错为unknown:

    ```ts
    type LastStr<Arr extends string[]> = 
        Arr extends [...infer rest,infer Ele]
            ? `Last:${Ele}`  // Error: Type 'Ele' is not assignable to type 'string | number | bigint | boolean | null | undefined
            : never;

    // 以往解决方法
    // 一:手动extends
    type LastStr<Arr extends string[]> = 
        Arr extends [...infer rest,infer Ele]
            ? Ele extends string
                ? `Last:${Ele}`
                : never
    // 二: 使用类型交叉
    type LastStr<Arr extends string[]> = 
        Arr extends [...infer rest,infer Ele]
            ? `Last:${Ele & string}`
            : never
    ```

3. 而通过新语法`infer extends`,也就是infer 的时候加上 extends 来约束推导的类型，这样推导出的就不再是 unknown 了，而是约束的类型。
新语法`infer extends`的使用方法如下:

    ```ts
    // inter extends 推断同时约束类型
    type LastStr<Arr extends string[]> = 
        Arr extends [...infer rest,infer Ele extends string]
            ? `Last:${Ele}`
            : never
    ```

4. 同时，`infer extends`也能实现以前实现不了的一些功能，例如string转number(也可以转 boolean、null 等类型):

```ts
type StrToNum<Str extends string> = 
    Str extends `${infer Num extends number}`
        ?Num
        : never;
type Res = StrToNum<'123'>; // 123
```

## satisfies(4.9版本)

1. 我们知道，ts 声明索引类型时有索引签名的方式，但是索引签名有一个缺点，就是编辑器无法提示索引签名的那一部分，同时使用`keyof`也不会返回索引签名的索引。如下
  
  ```ts
  interface Obj {
      [key: string]: string;
      name: string;
  }
  const obj:Obj = {
      name: 'name',
      age: 'age',
  }

  type Keys = keyof Obj; // 'name',没有age，同时在编辑器输入obj.时也不会提示age
  ```

  2. 而satisfies就是为了解决索引签名这个问题而设计的，不过需要注意的是**使用了satisfies之后不能再动态扩展索引**，它的使用方法如下:

  ```ts
  interface Obj {
      [key: string]: string;
      name: string;
      age: string|number;
  }
  const obj = {
      name: 'name',
      gender:'female'
      age: '18'
  } satisfies Obj
  // 此时obj就是Obj类型了
  type Keys = keyof Obj; // 'name'|'age'|'gender'
  // 同时
  obj.age = 18 // ok

  // 不能再扩展
  obj.height = 180 // Error: Property 'height' does not exist on type 'Obj'
  ```

::: right
参考 [TypeScript 类型体操通关秘籍](https://juejin.cn/book/7047524421182947366)
:::