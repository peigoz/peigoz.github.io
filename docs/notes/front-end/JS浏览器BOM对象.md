---
title: 浏览器对象模型BOM
date: 2021-01-24 19:00:41
categories:
  - JavaScript
tags:
  - JavaScript
isShowComments: true
publish: true
---

## BOM,浏览器对象模型

1. BOM 可以使我们通过 JS 来操作浏览器。
2. 在 BOM 中为我们提供了一组对象，用来完成对浏览器的操作。
3. BOM 对象包括:Window、Navigator、Location、History、Screen
4. 这些 BOM 对象在浏览器中都是作为 window 对象的属性保存的（即这些对象都是全局对象），可以通过 window 对象来使用，也可以直接使用。

```JavaScript
console.log(window.navigator);
console.log(navigator);
```

### Window

1. Window 对象包含以下方法:
   1. `alert()`: 弹出带有确定按钮的消息警告框
   2. `confirm()`: 弹出带有确定和取消按钮的消息警告框。点击确定返回 true,点击取消返回 false。
   3. `prompt()`: 弹出带有提示用户消息的输入对话框。
   4. `close()`: 关闭浏览器窗口。
   5. window 定时器:`setInterval()`、`clearInterval()`、`setTimeout()`、`clearTimeout()`
      ::: tip
      window 定时器返回一个 Number 类型的数值。这个数值用来作为定时器的唯一标识。创建第一个返回 1，表示这是一号定时器。往后依次累加，且不分 setInterval 和 setTimeout
      :::

### Navigator

1. 代表当前浏览器的信息，通过该对象可以来识别不同的浏览器。
2. 由于历史原因，Navigator 对象中的大部分属性都已经不能帮助我们使用浏览器了（失去作用）。
3. navigator.userAgent

   1. 在 IE11 前我们会使用 navigator.userAgent 来判断浏览器的信息,userAgent 是一个字符串，这个字符串中包含有用来描述浏览器信息的内容，不同的浏览器会有不同的 userAgent。
   2. 在 IE11 中已经将微软和 IE 相关的标识都去除掉，所以已经无法通过 UserAgent 来识别一个浏览器是否是 IE 了。
   3. 如果不能通过 UserAgent 判断，此时还可以通过一些浏览器中特有的对象来判断浏览器的信息。如：ActiveXObject

      ```text
      //火狐的userAgent
        Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0
      //Chrome的userAgent
        Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36
      //IE8
        Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
      //IE9
        Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
      //IE10
        Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
      //IE11
        Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko
      ```

      ```JavaScript
      //判断浏览器
      var ua = navigator.userAgent;
      if(/firefox/i.test(ua)){
        console.log("火狐浏览器");
      }else if(/chrome/i.test(ua)){
        console.log("Chrome浏览器");
      }else if("ActiveXObject" in window){
        // 使用 /msie/i.test(ua) 不能判断IE11,只能通过in检查window对象是否含有ActiveXObject构造函数，因为只有IE浏览器中含有
        console.log("IE浏览器");
      }
      ```

### Location

1. 该对象中封装了浏览器的地址栏的信息。
2. 如果直接打印 Location，则可以获取到地址栏的信息（当前页面的完整路径）。
3. 如果直接将 location 属性修改为一个完整的路径或者相对路径，则此时页面会自动跳转到该路径，并且会生成相应的历史记录。
4. `assign()`: 用来跳转到其他的页面，作用和直接修改 location 一样。
5. `reload()` :
   1. 用于重新加载页面，作用和刷新按钮一样。
   2. 如果在方法中传入一个 true 作为参数，则会强制清空缓存刷新页面，作用和 ctrl+F5 一样。
6. `replace()`:可以使用一个新的页面替换当前页面，调用完毕也会跳转页面，不同的是，使用 replace()跳转的页面不会生成历史记录，不能使用回退按钮回退页面。

```JavaScript
console.log(location);
location = "http://www.baidu.com"; //直接跳转百度页面
location = "text01.html";  //跳转到text01页面
location.assign("http://www.baidu.con"); //直接跳转百度页面
location.reload();  //刷新页面，在文本框中输入的内容还会存在
location.reload(true);  //强制清空缓存在刷新页面，在文本框中输入的内容也会清除，需要重新输入
```

### History

1. 对象用来操作浏览器向前或向后翻页。
2. length: 属性，可以获取到当前访问的链接数量。
3. `back()`: 方法，可以用来回退到上一个页面，作用和浏览器的回退按钮功能一样。
4. `forward()`: 可以调整到下一个页面，作用和浏览器的前进按钮功能一样。
5. `go()`: 可以用来跳转到指定的页面。传入一个整数作为参数，正整数表示向前跳转,负整数表示向后跳转

```JavaScript
history.go(1);
```

### Screen

1. 代表用户的屏幕信息，通过该对象可以获取到用户的显示器的相关信息。
2. screen.width: 属性返回以像素计的访问者屏幕宽度。
3. screen.height: 属性返回以像素计的访问者屏幕的高度
4. screen.availWidth: 属性返回访问者屏幕的宽度，以像素计，减去诸如窗口工具条之类的界面特征。
5. screen.availHeight: 属性返回访问者屏幕的高度，以像素计，减去诸如窗口工具条之类的界面特征。
6. screen.colorDepth: 属性返回用于显示一种颜色的比特数。
7. screen.pixelDepth: 属性返回屏幕的像素深度。
