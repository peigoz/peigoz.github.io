---
title: TS类型体操中的一些特殊情况
date: 2023-02-06 16:57:42
tags:
 - TypeScript
publish: true
sticky: 1
top: 3
---

## Any

1. any 类型与任何类型的交叉都是 any，也就是 string(任何类型) & any 结果是 any。
2. any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
3. any 可以是任何类型，任何类型也都是 any

```ts
type IsAny<T> = 'A' extends ('B' & T) ? true : false
type Test<T> = T extends true ? 1 : 2;

type res = Test<any>; // 1 | 2

// 判断类型相等,由于any，不可以这样写
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
type IsEqualRes = IsEqual<any, string>; // true
```

## IsEqual

1. 如果是两个条件类型 `T1 extends U1 ? X1 : Y1` 和 `T2 extends U2 ? X2 : Y2` 相关的话，那 T1 和 T2 相关、X1 和 X2 相关、Y1 和 Y2 相关，而 U1 和 U2 相等。
2. 利用两个条件类型判断**相关性**的时候会判断右边部分是否相等的这个性质
3. 相关并不代表相等。相关性: 任意类型 extends any 都是 true，相等: 则为false

```ts
type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true : false;
type IsEqualRes = IsEqual2<any, string>; // false
```

## Never

1. never 在条件类型中比较特殊，如果条件类型左边是类型参数，并且传入的是 never，此时直接返回 never，不会再进行判断。

```ts
// error
type TestNever<T> = T extends number ? 1 : 2;
type A = TestNever<never>; // 直接返回never,不会返回1或者2

// correct，避免条件类型判断左边直接使用类型参数
type IsNever<T> = [T] extends [never] ? true : false
type B = TestNever<never>; // true
```

## Readonly

1. 加上readonly后的类型为原来类型的子类型。
2. 需要注意的是在类型体操中，`T[] extends readonly T[]` 的判断是基于类型 `T[]` 是否可以被赋值给类型 `readonly T[]`。由于 `T[]` 不是只读类型，所以它可以被赋值给 `readonly T[]`。

```ts
// readonly unknown[] 为 unknown[] 的子类型,但是 readonly unknown[] extends unknown[] 为 false
type Test<T> = T extends readonly unknown[] ? true : false;
type Test1<T> = T extends unknown[] ? true : false;

type A = Test<unknown[]>; // true
type B = Test1<readonly unknown[]>; // false
```

## Union

1. 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。
2. 联合类型遇到字符串时的处理也会触发分布式条件类型。
3. boolean 也是联合类型，是 true | false，参数为boolean也会触发分布式条件类型。

  ```ts
  type Union = 'a' | 'b' | 'c';
  // 条件类型左边直接引用该类型参数，会触发分布式条件类型
  type Test<T> = T extends 'a' ? 'isA' : T;
  // 条件类型左边变为【T】,不直接引用该类型参数，不会触发分布式条件类型，会直接把联合类型当成一个整体传入
  type Test2<T> = [T] extends ['a'] ? 'isA' : T;
  // 字符串模板类型也会触发分布式条件类型
  type Test3<T> = `${T}--`;

  // 类型参数为联合类型，会把每一个元素单独传入来做类型运算，最后再合并成联合类型
  type A = Test<Union>; // 'isA' | 'b' | 'c'
  type B = Test2<Union>; // 'a' | 'b' | 'c'，整体返回T
  type C = Test3<Union>; // 'a--' | 'b--' | 'c--'
  ```
  
3. 根据它遇到条件类型时会分散成单个传入做计算的特性来判断是否为 union 类型。
  
  ```ts
  type IsUnion<A, B = A> =
    A extends A
        ? [B] extends [A]
            ? false
            : true
        : never

  type A = IsUnion<1 | 2>; // true
  type B = IsUnion<1>; // false

  /**
   * 解析: 
   * 1. A 是单个类型，B 是整个联合类型，所以根据 [B] extends [A] 是否成立来判断是否是联合类型
   * 2. [1|2] extend [1] 为 false，所以不是联合类型，[1] extend [1] 为 true
   * 3. 不可以 [A] extends [B]，因为 [1] extend [1|2] 和 [1] extend [1] 都为 true，所以无法判断
   */
  ```

## GetOptional

1. 可选索引的特性：可选索引的值为 undefined 和值类型的联合类型。

```ts
// 提取索引类型中的可选索引
type GetOptional<Obj extends  Record<string, any>> = {
    [
        Key in keyof Obj 
            as {} extends Pick<Obj, Key> ? Key : never
    ] : Obj[Key];
}
type obj = {
    a: number;
    b?: string;
}
type P = Pick<obj,'b'>; // { b?: string|undefined },值为undefined 和值类型的联合类型。
type A = GetOptional<obj>; // { b?: string }

/**
 * 解析:
 *  1. 可选的意思是这个索引可能没有，没有的时候，那 Pick<Obj, Key> 就是空的，所以 {} extends Pick<Obj, Key> 为 true
 *  2. { b?: string|undefined } 类似于 { b: string } | {}，所以值为undefined 和值类型的联合类型
 *  3. {} extends Pick<Obj, Key> ? Key : never，如果是可选索引，那么返回 Key，否则返回 never
 *  4. 注意: { b: string|undefined } 并不是可选类型，加上?才是， 即{ b?: string|undefined }
 */
```

## GetRequired

1. 实现了 GetOptional，那反过来就是 GetRequired，也就是过滤所有非可选的索引构造成新的索引类型。

```ts
type isRequired<Key extends keyof Obj, Obj> = 
    {} extends Pick<Obj, Key> ? never : Key;

type GetRequired<Obj extends Record<string, any>> = { 
    [Key in keyof Obj as isRequired<Key, Obj>]: Obj[Key] 
}
```

## ClassProps

1. keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。

```ts
type ClassPublicProps<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key]    
}
```

## RemoveIndexSignature

1. 索引签名: 索引签名不能构造成字符串字面量类型，因为它没有名字，而普通索引类型有key，可以依据key的类型判断。

```ts
type Dog = {
  [key: string]: any;
  sleep(): void;
}

//  sleep 是具体的索引，[key: string]: any 就是可索引签名，代表可以添加任意个 string 类型的索引。

// 删除索引类型中的可索引签名,如果索引是字符串字面量类型，那么就保留，否则返回 never，代表过滤掉。
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [
      Key in keyof Obj 
          as Key extends `${infer Str}`? Str : never
  ]: Obj[Key]
}
type A = RemoveIndexSignature<Dog>; // { sleep(): void }
```

## FunctionParams

1. 在 TypeScript 中有函数参数是有逆变的性质的，也就是如果参数可能是多个类型，参数类型会变成它们的交叉类型。
2. 利用这个特性可以实现联合转交叉。 `A|B` => `A&B`

```ts
type UnionToIntersection<U> = 
    (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
        ? R
        : never

type A = UnionToIntersection<1 | 2>; // 1 & 2 = never
type B = UnionToIntersection<{a:1} | {b:2}>; // {a:1} & {b:2} 
```

::: right
参考 [TypeScript 类型体操通关秘籍](https://juejin.cn/book/7047524421182947366)
:::
