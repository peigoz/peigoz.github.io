---
title: JS隐式类型转换
date: 2021-01-20 20:56:43
tags:
  - JavaScript
publish: true
---

## 其他类型转化为 String

1. 调用被转换数据类型的 `toString()`方法

   ```text
   1. 该方法不会影响原变量，它会将转换结果返回，可通过 a = a.toString(); 重新赋值给原变量。
   2. 注意：null 和 undefined 这两个值没有 toString() 方法，如果调用会报错。
   ```

2. 调用 `String()`函数，并将被转换的数据作为参数传递给函数。`a = String(a)`

   ```text
   1. 使用 String() 函数做强制转换时，对于 Number 和 Boolean 实际上就是调用的 toString() 方法.
   2. 对于 null 和 undefined，会将 null undefined 直接转换为"null" 、"undefined"字符串。
   ```

3. String 隐式类型转换

   ```text
   1. 任何值和字符串做加法运算时，都会先转换为字符串，然后再和字符串做连接运算。
   2. 我们可以利用这一特点，可以将任意的数据类型 + 一个"" （a = a +"";）即可使其变为 String 类型。
   3. 这是一种隐性的类型转换。由浏览器自动完成，实际上它也是调用 String 函数（这种方式用的更多一些）。
   ```

## 其他类型转化为 Number

1. 使用 `Number()`函数

   1. 字符串 --> 数字

      ```text
      1. 如果是纯数字的字符串，则直接将其转换为数字。
      2. 如果字符串中有非数字的内容，则转换为 NaN。
      3. 如果字符串是一个空串或者是一个全是空格的字符串，则转换为 0。
      ```

   2. 布尔值 --> 数字

      ```text
      1. true --> 1
      2. false --> 0
      ```

   3. Null --> 数字 0

   4. Undefined --> 数字 NaN

2. `parseInt()`与`parseFloat()`函数

   1. `parseInt()`函数 把一个字符串转换为一个整数

      ```text
      1. 将一个字符串中有效的整数内容提取出来，转换为 Number。如 "123px" --> 123 "a123" --> NaN "12.a3" --> 12
      2. 可传递第二个参数表示以什么进制解析。a = parseInt(a , 10) 表示以 10 进制解析
      ```

   2. `parseFloat()`函数 把一个字符串转换为一个浮点数

      ```text
      作用和`parseInt()`类似，不同的是可以提取出小数。如 "123.45.67" --> 123.45 "123.5px" --> 123.5
      ```

   ::: danger
   如果对非 String(数值也一样)使用这两个函数，它会将值先转换为 String，然后再操作。 True --> "True" --> NaN
   :::

3. Number 隐式类型转换

   ```text
   1. 对于非 number 类型的值，它会将该数据先转换 number，然后再运算。
   2. 可以对一个其他数据类型使用+ (`a = +a`)，来将其转换为 Number 类型。
   3. 隐式类型转换它的原理和 Number 函数一样，且这是转换为 Number 类型最方便的方式。
   ```

## 其他类型转换为 Boolean

1. 使用 Boolean()函数

   1. 数字 --> 布尔值

      ```text
      1. 除了 0 和 NaN，其余的都是 true。
      ```

   2. 字符串 --> 布尔值

      ```text
      1. 除了空串""，其余的包括空格字符串" "都是 true。
      ```

   3. null 和 undefined --> false

   4. object 对象类型 --> true

2. Boolean 隐式类型转换

   ```text
   1. 如果对一个非 boolean 类型值进行非运算，则会将其转换为 Boolean 类型值，然后再取反。
   2. 所以我们利用这个特点可以为一个任意类型取两次反!(a = !!a)，来将其转换为 Boolean 类型。

   ```
