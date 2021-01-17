---
title: 一些有趣的JS工具方法
date: 2021-1-15 16:22:46
categories:
  - JavaScript
tags:
  - javascript
publish: true
---

::: primary
数组取随机数
:::

```javascript
/**
 *
 * @param {*} array 源数组
 * @param {*} length 打乱后的数组长度
 */
function randomArr(array, length) {
  //sort会影响原数组，进行浅拷贝
  const sortArr = [..array]
  return sortArr.sort(randomSort).slice(-length)
}
function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1
}

```

<!-- //匹配 "字母开头-" 的字符串，如:'aaa-','bbb-'，'ccc-',并且把()匹配到的内容进行捕获，如上面例子为'aaa'，'bbb','ccc'
const ICON_REGEXP = /^(\w+\-)/
function getClass(icon) {
  console.log(ICON_REGEXP.test(icon));
  if (ICON_REGEXP.test(icon)) {
    return icon.replace(ICON_REGEXP, (...args) => {
      //第一个为匹配到的icon-,第二个为()捕获的内容，可以有多个，顺序输出，第三个为匹配对象在原对象的下标值，第四个为原字符串本身
      console.log(args); //['icon-','icon',0,'iconfont']
      return args[1] === 'reco' ? `iconfont ${args[0]}` : `${args[1]} ${args[0]}`
    })
  }
  return ''
}
console.log(getClass('icon-open iconfont')); -->
