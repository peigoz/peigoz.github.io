---
title: 前端一些常用的npm库
date: 2022-06-10 23:50:10
tags:
  - Tool
publish: true
---

## 前端其他库

1. moon(3kb mini->1kb) 一个类似 vue 风格的轻量 mvvm 库
2. hyperapp(1kb mini->0.3kb) 一个类似 react 风格的轻量 mvvm 库
3. [mp-html](https://github.com/jin-yufeng/mp-html) 小程序富文本解析库
4. [常用的文件夹名字](https://github.com/hujiulong/blog/blob/master/demo/data/the_most_frequent_names.md) (起名困难症)

## 可视化 Mock 接口管理工具

1. [rap2-delos](https://github.com/thx/rap2-delos)
2. [rap2-dolores](https://github.com/thx/rap2-dolores)

## 技术选型

1. 定义目录结构及开发和部署流程。
2. 配置路由。
3. 开发视图层。
4. 管理样式。
5. 管理组件。
6. 绑定用户输入。
7. 与服务器通信。
8. 管理事件和数据。
9. 处理模块间通信。
10. 测试。

## CSS 常用库

1. oocss.org
2. meyerweb.com/eric/tools/css/reset
3. github:necolas/normalize.css
4. thx.github.io/cube/doc/neat (推荐)
5. type.css 针对中文字体排版的库

## js 工具类

1. lodash 一个一致性、模块化、高性能的 JavaScript 实用工具库。
2. ramda 一个很重要的库，提供了许多有用的方法，每个 JavaScript 程序员都应该掌握这个工具
3. day.js 一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样，体积只有 2kb
4. big.js 一个小型，快速的 JavaScript 库，用于任意精度的十进制算术运算
5. qs 一个 url 参数转化 (parse 和 stringify) 的轻量级 js 库
6. decimal.js 实现 JavaScript 的任意精度的十进制类型库
7. immer.js 是 mobx 的作者写的一个 immutable 库，核心实现是利用 ES6 的 proxy，几乎以最小的成本实现了 js 的不可变数据结构，解决了许多日常开发中的棘手问题。
8. mitt 一个小而精美的模拟事件总线的发布订阅库,
9. crypto-js 是一个纯 javascript 写的加密算法类库 ，可以非常方便地在 javascript 进行 MD5、SHA1、SHA2、SHA3、RIPEMD-160 哈希散列，进行 AES、DES、Rabbit、RC4、Triple DES 加解密
10. nanoid 生成唯一 id 的库,性能比 uuid 要好
11. comlink 谷歌的专用于 webWorker 的库,原始基于 RPC 实现 postMessage 和 ES6 代理

## 表单验证

1. [Validate.js](https://github.com/ansman/validate.js) 一个强大的 js 表单校验库
2. vuelidate Vue 中的表单校验库
3. VeeValidate Vue 中的表单校验库

## dom 库

1. JQuery 封装了各种 dom / 事件操作，设计思想值得研究借鉴
2. zepto jquery 的轻量级版本，适合移动端操作
3. fastclick 一个简单易用的库，它消除了移动端浏览器上的物理点击和触发一个 click 事件之间的 300ms 的延迟。目的就是在不干扰你目前的逻辑的同时，让你的应用感觉不到延迟，反应更加灵敏。(已修复)

## 文件处理

1. file-saver 一个在客户端保存文件的解决方案，非常适合在客户端上生成文件的 Web 应用程序
2. js-xlsx 一个强大的解析和编写 excel 文件的库

## 网络请求

1. axios 一个基于 Promise 的 HTTP 库，可用在 Node.js 和浏览器上发起 HTTP 请求，支持所有现代浏览器，甚至包括 IE8+
2. superagent 基于 Ajax 的优化，可以与 Node.js HTTP 客户端搭配使用
3. fly.js 一个基于 promise 的 http 请求库，可以用在 node.js, Weex, 微信小程序，浏览器，React Native 中

## 动画库

1. Anime.js 一个 JavaScript 动画库，可以处理 CSS 属性，单个 CSS 转换，SVG 或任何 DOM 属性以及 JavaScript 对象
2. Velocity 一个高效的 Javascript 动画引擎，与 jQuery 的 \$.animate () 有相同的 API, 同时还支持彩色动画、转换、循环、画架、SVG 支持和滚动等效果
3. Vivus 一个零依赖的 JavaScript 动画库，可以让我们用 SVG 制作动画，使其具有被绘制的外观
4. GreenSock JS 一个 JavaScript 动画库，用于创建高性能、零依赖、跨浏览器动画，已在超过 400 万个网站上使用，并且可以在 React、Vue、Angular 项目中使用
5. Scroll Reveal 零依赖，为 web 和移动浏览器提供了简单的滚动动画，以动画的方式显示滚动中的内容
6. better-scroll
7. Kute.js 一个强大高性能且可扩展的原生 JavaScript 动画引擎，具有跨浏览器动画的基本功能
8. Typed.js 一个轻松实现打字效果的 js 插件
9. fullPage.js 一个可轻易创建全屏滚动网站的 js 滚动动画库，兼容性无可替代
10. iscroll 移动端使用的一款轻量级滚动插件
11. [swiper.js](https://www.swiper.com.cn/api/index.html) 一款强大的 js 跨端触摸滑动插件
12. MixItUp 是用于 DOM 操作的高性能，无依赖库，使您能够使用精美的动画过滤，排序，添加和删除 DOM 元素的 js 动画库
13. [Lottie](https://github.com/airbnb/lottie-web) 一个用于 Android，iOS，Web 和 Windows 的库，用于解析使用 Bodymovin 导出为 json 的 Adobe After Effects 动画，并在移动设备和网络上呈现它们
14. driver.js 一个引导用户遮罩效果的动画库

## 鼠标/键盘相关

1. KeyboardJS 一个在浏览器中使用的库（与 node.js 兼容）. 它使开发人员可以轻松设置键绑定和使用组合键来设置复杂的绑定.
2. SortableJS 功能强大的 JavaScript 拖拽库

## 图形/图像处理

1. html2canvas 一个强大的使用 js 开发的浏览器网页截图工具
2. dom-to-image 一个可以将任意 DOM 节点转换为用 JavaScript 编写的矢量（SVG）或光栅（PNG 或 JPEG）图像的库
3. pica 一个在浏览器中调整图像大小，而不会出现像素失真，处理速度非常快的图片处理库
4. Lena.js 一个轻量级的可以给你图像加各种滤镜的 js 库
5. Compressor.js 一个使用本地 canvas.toBlob API 进行图像有损压缩的 js 库
6. Fabric.js 一个易于使用的基于 HTML5 canvas 元素的图片编辑器
7. merge-images 一个将多张图片合并成一张图的 js 插件
8. cropperjs 一款强大的图片裁切库，支持灵活的图片裁切方式
9. Grade 一个基于图像中的前 2 种主要颜色生成互补渐变背景的库

## 表单表格

1. [x-spreadsheet](https://github.com/myliang/x-spreadsheet) 一个基于 web 的简单易用的表格插件

## node 相关库

1. undici 一个可以替代 node 原生 http 服务器的库,官方宣称性能比 http 要好
2. undici-fetch 可在服务器使用 fetch 进行网络请求
