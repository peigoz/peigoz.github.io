---
title: TS几个常用类型之间区别
date: 2023-03-14 21:45:24
tags:
 - TypeScript
publish: true
sticky: 2
---

## 4中特殊类型

1. **never** 代表不可达，比如函数抛异常的时候，返回值就是 never。
2. **void** 代表空，可以是 undefined 或 never。
3. **any** 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
4. **unknown** 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。

## any 与 unknown

1. any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值，而 any 除了可以接收任意类型的值，也可以赋值给任意类型（除了 never）。类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。

```ts
// 这里只能用any，不能用unknown，因为函数参数是逆变的
// 不存在有类型为unknown子类型(也就是不存在 unknown extends XXX)的情况
type GetReturnType<Func extends Function> = 
    Func extends (...args: any[]) => infer ReturnType 
        ? ReturnType : never;
```

## 逆变和协变

1. **协变**: 子类型可以赋值给父类型
2. **逆变**: 父类型可以赋值给子类型,只有函数参数才有逆变

```ts
interface Parent{
  name:string;
  gender:string;
}
interface Son extends Parent{
  age:number;
}

let getParentName = (parent:Parent):string=>{
    return parent.name;
}

let getSonName = (son:Son):string =>{
    return son.name;
}

// 参数处逆变，Parent的参数可以赋值给Son，因为参数为Parent类型内部使用到的，Son也都会有，类型安全
getParentName = getSonName; // ok
getSonName = getParentName; // error
```

## tuple与array

1. 元组类型的 length 是数字字面量，而数组的 length 是 number。

```ts
// 可以根据这两个特性来判断元组类型
type NotEqual<A, B> = 
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? false : true;

type IsTuple<T> = 
    T extends [...params: infer Rest] 
        ? NotEqual<Rest['length'], number> 
        : false
type A = isTuple<[1, 2, 3]> // true
type B = isTuple<number[]> // false
```

::: right
参考 [TypeScript 类型体操通关秘籍](https://juejin.cn/book/7047524421182947366)
:::