---
title: 与DOM坐标计算有关的操作属性
date: 2021-01-21 16:16:55
tags:
  - JavaScript
publish: true
---

## clientWidth、clientHeight

1. 这两个属性可以获取元素的可见宽度和高度，包括内容区和内边距（不包括边框和外边距）。
2. 这些属性都是不带 px 的，返回的都是一个数字，可以直接进行计算。这些属性都是只读的，不能修改。

## clientX 、 clientY

1. 用于获取鼠标在当前的可见窗口的坐标，而 div 的偏移量是相对于整个页面（html 文档流）的。

## pageX 、 pageY

1. 可以获取鼠标相对于当前页面（html 文档流）的坐标
2. 但是这两个属性在 IE8 中不支持，所以如果要兼容 IE8，则不要使用。

## offsetWidth、offsetHeight

1. 可以获取元素整个的宽度和高度，包括内容区、内边距和边框。
2. 与 clientWidth、clientHeight 的区别是 clientWidth、clientHeight 包括了边框

## offsetParent

1. 可以用来获取当前元素的定位父元素，它会获取到离当前元素最近的开启了定位（position 值不为 static）的祖先元素。
2. 如果所有的祖先元素都没开启定位，则返回 body。

## offsetLeft、offsetTop

1. 获取当前元素相对于其定位父元素的水平偏移量以及垂直偏移量。

## scrollHeight、scrollWidth

1. 可以获取元素整个滚动区域的高度和宽度。

## scrollLeft、scrollTop

1. 获取水平滚动条和竖直滚动条滚动的距离。
2. chrome 认为浏览器的滚动条是 body 的，可以通过 body.scrollTop 来获取。而火狐等浏览器认为浏览器的滚动条是 html 的。

```JavaScript
//在chrome浏览器中
var st = document.body.scrollTop;
//在火狐IE浏览器中
var st = document.documentElement.scrollTop;

//处理兼容性问题最终方案
var st = document.body.scrollTop || document.documentElement.scrollTop;
var sl = document.body.scrollLeft || document.documentElement.scrollLeft;


//div随鼠标移动
//解决事件对象的兼容性问题
event = event || window.event;
var left = event.pageX;
var top = event.pageY;
//设置div的偏移量
box1.style.left = left + sl + "px";
box1.style.top = top + st + "px";
```

::: tip
当满足 scrollHeight - scrollTop == clientHeight 时，说明垂直滚动条滚动到底。
当满足 scrollWidth - scrollLeft == clientWidth 时，说明水平滚动条滚动到底
:::
