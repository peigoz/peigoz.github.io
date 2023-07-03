---
title: CSS冷门技巧(一)
date: 2023-07-02 23:45:43
categories:
 - CSS
tags:
 - CSS
isShowComments: true
publish: true
---

## will-change

### 属性介绍

1. [will-change](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change) 为 web 开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。

### 场景使用

1. 当我们编写一些动画组件例如进度条、滚动动画，轮播图等时，往往会因为用户的行为频繁触发动画进而导致页面大面积重排，而重排是非常消耗性能的，加上浏览器的CPU计算能力有限，便会导致掉帧卡顿。所以我们可以在动画开始前使用`will-change:transform`属性来告诉浏览器元素会发生改变，这样浏览器就会提前将该元素单独提取出一个独立图层，并会触发GPU硬件加速模式，从而提高动画的流畅度。
2. 开启GPU硬件加速模式，(也可以使用`transform:translate3d()`)会让浏览器在渲染动画时从CPU转向GPU，实现硬件加速。
3. 需要注意的是:  
    - 一个页面声明will-change的节点数量不宜过多，一般不高于5个以上，否则会因为图层过多反而影响性能。
    - 尽量不要对节点及其父节点声明position:absolute/fixed，当多个绝对定位的节点开启GPU硬件加速模式后会有几个节点凭空消失。
    - 在元素变化完成后删除will-change，这样浏览器就可以恢复优化所占用的资源。所以尽量不要在样式表中使用，不好销毁，推荐通过js动态添加和移除。
    - 设置的时机,告诉浏览器为已经发生的变化进行优化是没有用的，这样做是否定了will-change背后的整个概念。相反，你应该找到一种方法，至少可以稍微提前预测会发生变化的东西，并在那时设置will-change。
      1. 如果元素在`hover`时启动动画，你可以在其祖先元素通过`.ancestor:hover .element`设置，而不是等已经`hover`启动时(即`.element:hover`)再设置。
      2. 如果元素在点击时启动动画，你可以在点击事件的处理函数中设置will-change，或者在hover状态设置。而不是在动画开始(`.ele:active`)时。

## content-visibility

### 属性介绍

1. [content-visibility](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content-visibility) 控制元素是否渲染其内容，以及施加一组强局限，由此允许用户代理有机会在不需要时省略大片的布局和渲染工作。此属性使用户代理得以在不需要时跳过元素的渲染工作（包括布局和绘制）——由此使页面的初始加载明显变快。此外，它还允许用户代理在不需要时跳过元素的布局和绘制工作，从而使页面的交互性能得到提升。
2. 它有几个常见的取值:  

  ```css
  content-visibility: visible; 
  content-visibility: hidden; 
  content-visibility: auto;
  ```

#### content-visibility: visible

1. 默认值，没有任何效果，相当于没有添加 content-visibility，元素的渲染与往常一致。

#### content-visibility: hidden

1. 类似display:none和 visibility:hidden结合，元素不会渲染，但是会保留布局空间，并且不可被点击。设置了 content-visibility: hidden 的元素，其元素的子元素将被隐藏，但是，它的渲染状态将会被缓存。所以，当 content-visibility: hidden 被移除时，用户代理无需重头开始渲染它和它的子元素。
2. 因此，如果我们将这个属性应用在一些一开始需要被隐藏，但是其后在页面的某一时刻需要被渲染，或者是一些需要被频繁切换显示、隐藏状态的元素上，其渲染效率将会有一个非常大的提升。

#### content-visibility: auto

1. 如果该元素不在屏幕上，并且与用户无关，则不会渲染其后代元素。当元素出现在屏幕上时，开始渲染其后代元素。一般用的比较多

### 使用场景: 利用 content-visibility: auto 实现虚拟列表

1. 假设，我们存在这样一个 HTML 结构，含有大量的文本内容。

```html
<div class="contain">
    <div class="paragraph">...</div>
    // ... 包含了 N 个 paragraph且每个 paragraph 都有大量的文本内容
    <div class="paragraph">...</div>
</div>
```

2. 如果我们未对页面进行优化处理，在页面刷新的一瞬间，所有节点都会进行渲染，那么我们页面可能就会因为大量的节点渲染而导致卡顿掉帧。理论上我们非常希望对于仍未看到，仍旧未滚动到的区域，可以延迟加载，只有到我们需要展示、滚动到该处时，页面内容才进行渲染。那么基于这种场景，
`content-visibility: auto`就派上用场了，它允许浏览器对于设置了该属性的元素进行判断，如果该元素当前不处于视口内，则不渲染该元素。此时，我们只需要添加一行 CSS 代码，即可实现虚拟列表的效果。

```css
.paragraph {
  content-visibility: auto;
}
```

### 一些问题

1. 由于设置了`content-visibility: auto`的节点是动态加载的，所以会导致滚动条初始高度不准确，且在滚动过程中也会因为不断加载新的节点导致滚动条抖动的问题，此时我们可以对未渲染节点的高度进行预估，并利用`contain-intrinsic-size`属性设置每个节点的高度，起到占位符的作用。

    ```css
    .paragraph {
        content-visibility: auto;
        // 假设每个段落高度320px，如果无法准确知道高度，也可以填写一个大概的值
        contain-intrinsic-size: 320px;
    }
    ```

2. 目前兼容性还不是很好，大约只有71.15%的浏览器支持(2023/7/4)，但是该属性属于渐进增强一类的功能，即便​失效，也完全不影响页面本身的展示。
3. 元素设置了 `content-visibility: auto` 且未被渲染，也并不会影响全局的搜索功能，即就是通过Ctrl+F依然可以搜索到未渲染的文本节点。

### content-visibility: auto VS LazyLoad

1. `LazyLoad`：通常而言，`LazyLoad` 的作用在于，当页面未滚动到相应区域，该区域内的资源（网络请求）不会被加载。反之，当页面滚动到相应区域，相关资源的请求才会被发起。
2. 如果 `content-visibility: auto` 要能够替代 LazyLoad，则需要做到，初始化渲染的时候，在页面当前展示范围外的，设定了 `content-visibility: auto` 的元素内的一些静态资源不会被加载。

::: right
参考 [玩转 CSS 的艺术之美](https://juejin.cn/book/6850413616484040711/section/6850413616580657159?scrollMenuIndex=1)  
参考 [使用will-change来提高页面的渲染速度](https://juejin.cn/post/7015387929870598158)  
参考 [使用 content-visibility 优化渲染性能](https://juejin.cn/post/7108921365628977166#heading-7)  
:::
