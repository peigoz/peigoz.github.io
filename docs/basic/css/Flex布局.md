---
title: CSS3 Flex布局
date: 2022-07-13 00:15:17
tags:
  - Flex
publish: true
---

## CSS flex 布局

1. [canIUse](https://caniuse.com/)：查看 css 的属性兼容情况
2. 盒子模型（box-sizing）:

   1. content-box：平时普通盒子模型，向外扩展。改变 padding、border 的值后，盒子会变大变小
   2. border-box：盒子模型，向内扩展。改变 padding、border 的值后，盒子整体大小不受影响，content 内容区大小会相应改变
   3. calc(公式)：

      1. 注意：+ - \* / 运算符两边需要加空格隔开数据

   ```css
   //错误用法
   calc(100px-2opx)
   //正确用法
   calc(100px - 20px)
   calc(25% - 2px)
   ```

3. flex 布局

   1. 父级盒子：display:flex;
   2. 兼容其他浏览器：添加浏览器前缀(-webkit-),真实开发工作中，使用 postCss、css-auto-prefix 等插件自动添加
   3. 如果父元素用了弹性（flex）布局，子元素不需要浮动（float）
   4. 父元素上的其他属性：
      1. justify-content：子元素水平排列方式
         1. center 居中
         2. space-between 两端对齐
         3. space-around 子元素两端（margin）平分剩余空间
         4. flex-start 从左往右排列
         5. flex-end 从右往左排列
      2. align-items：子元素垂直排列方式（子元素单行）
         1. center 居中
         2. flex-start 从上往下排列
         3. flex-end 从下往上排列
      3. align-content：子元素垂直排列方式（子元素多行）
         1. center 居中
         2. flex-start 从上往下排列
         3. flex-end 从下往上排列
         4. stretch 拉伸，默认值
      4. flex-direction：子元素之间排列顺序
         1. row 横向排列
         2. row-reverse 横向倒序排列
         3. column 纵向排列
         4. column-reverse 纵向倒序排列
         5. 注意：设置 column 和 column-reverse 后,子元素的 justify-content 和 align-items 会互换，即 justify-content:center，会变成视觉上的垂直居中。
      5. flex-wrap：设置子元素（超出父元素宽度后）是否在一行显示
         1. nowrap 不换行，默认值
         2. wrap 换行
      6. flex-flow:`<flex-direction> <flex-wrap>` 简写属性
         1. column wrap
   5. 子元素上的属性：
      1. flex:1 表示子元素占父元素平分后的比例系数
      2. 子元素在划分父元素宽度时，父元素会先减去有固定宽度的子元素，剩下的子元素再通过 flex 的值划分
      3. flex-grow:1 换行的子元素放大比例系数，0 表示不放大，除 0 以外其他按 grow 的值比例放大
      4. align-self：清除父元素 align-items 的影响并单独设置
      5. order 默认值 0，用来规定子元素的排序顺序，数值越小越靠前

   ```html
   <div class="box">
     <div class="cBox"></div>
   </div>
   ```

   ```css
   //不用弹性布局
   * {
     margin: 0;
     padding: 0;
     list-style: none;
   }
   .box {
     width: 500px;
     height: 500px;
     border: 1px solid #000;
     margin: 20px;
     position: relative;
   }
   .box > .cBox {
     width: 100px;
     height: 100px;
     background: red;
     position: absolute;
     //垂直水平居中
     left: 50%;
     right: 50%;
     /* margin-left: -50px;
         margin-top: -50px; */
     transform: translate(-50%, -50%);
   }

   //用flex布局
   .box {
     width: 500px;
     height: 500px;
     border: 1px solid #000;
     margin: 20px;
     display: flex;
     justify-content: center;
     align-items: center;
   }
   .box > .cBox {
     width: 100px;
     height: 100px;
     background: red;
   }
   ```

4. 例子：淘宝底部导航栏

   ```html
   //html部分
   <div class="footer">
     <ul class="nav">
       <li>首页</li>
       <li>消息</li>
       <li>购物车</li>
       <li>我的淘宝</li>
     </ul>
   </div>
   ```

   ```css
   //css部分
   * {
     margin: 0;
     padding: 0;
     list-style: none;
   }
   .footer {
     position: fixed;
     left: 0;
     bottom: 0;
     width: 100%;
   }
   .footer > .nav {
     height: 60px;
     text-align: center;
     line-height: 60px;
     color: #fff;
     background: #ccc;
     display: flex;
   }
   .nav li {
     box-sizing: border-box;
     border: 1px solid #ccccff;
     flex: 1;
   }
   ```
