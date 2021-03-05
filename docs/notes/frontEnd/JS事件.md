---
title: JS事件详解
date: 2021-01-21 16:57:51
categories:
  - JavaScript
tags:
  - JavaScript
isShowComments: true
publish: true
---

## 事件对象

1. 当事件的响应函数被触发时，浏览器每次都会将一个事件对象作为实参传递进响应函数，在事件对象中封装了当前事件相关的一切信息。  
   比如： 鼠标的坐标、键盘哪个按键被按下、鼠标滚轮滚动的方向。。。

2. 在 IE8 中，响应函数被触发时，浏览器不会传递事件对象，在 IE8 及以下的浏览器中，是将事件对象作为 window 对象的属性保存的

```JavaScript
window.onload = function () {
  //当鼠标在areaDiv中移动时，在showMsg中来显示鼠标的坐标
  //获取两个div
  var areaDiv = document.getElementById('areaDiv')
  var showMsg = document.getElementById('showMsg')
  areaDiv.onmousemove = function (event) {
    //在IE8中，响应函数被触发时，浏览器不会传递事件对象，在IE8及以下的浏览器中，是将事件对象作为window对象的属性保存的
    if (!event) {
      event = window.event
    }
    //解决事件对象的兼容性问题
    event = event || window.event
    var x = event.clientX
    var y = event.clientY
    //在showMsg中显示鼠标的坐标
    showMsg.innerHTML = 'x = ' + x + ' , y = ' + y
  }
}
```

## 事件的冒泡（Bubble）

1. 所谓的冒泡指的就是事件的向上传导，当后代元素上的事件被触发时，其祖先元素的相同事件也会被触发。
2. 在开发中大部分情况下冒泡都是有用的，如果不希望发生事件冒泡可以通过事件对象 cancelBubble 来取消冒泡。

```javascript
var s1 = document.getElementById('s1')
s1.onclick = function(event) {
  event = event || window.event
  //取消冒泡
  //可以将事件对象的cancelBubble设置为true，即可取消冒泡
  event.cancelBubble = true
}
```

## 事件的委派

1. 指将事件统一给元素的共同的祖先元素，这样当后代元素上的事件触发时，会一直冒泡到祖先元素，从而通过祖先元素的响应函数来处理后代元素的事件。
2. 通过事件的冒泡，我们可以将一个事件绑定给多个元素共同的祖先元素，即可应用到多个元素上，即使有的元素是后来添加的，此时点击后代元素会通过冒泡触发该祖先元素的事件。
3. 事件委派是利用了冒泡，通过委派可以减少事件绑定的次数，提高程序的性能。但是注意此时该祖先元素下的其他后代元素也会触发该事件，故需要通过 if 判断来筛选出我们期望触发该事件的元素。
4. target:event 中的 target 表示的是触发事件的对象。

```javascript
ul.onclick = function(event) {
  event = event || window.event
  //如果触发事件的对象是我们期望的元素，则执行，否则不执行
  if (event.target.className == 'link') {
    //执行事件。。。
  }
}
```

## 事件的绑定

1. 使用 `对象.事件 = 函数` 的形式绑定响应函数，它只能同时为一个元素的一个事件绑定一个响应函数，不能为一个元素绑定多个响应函数，否则后添加的会把前面的覆盖掉。
2. 如果需要为一个元素同时绑定多个事件，我们可以通过`addEventListener()`方法为元素绑定响应函数。

```javascript
/*
addEventListener()
  1. 通过这个方法可以为元素绑定响应函数。
  2. 参数：
    1. 事件的字符串，不用on（直接写click）。
    2. 回调函数，当事件触发时该函数会被调用。
    3. 是否在捕获阶段触发事件，需要一个布尔值，一般都传false。
  3. 使用addEventListener()可以同时为一个元素的相同事件同时绑定多个响应函数，这样当事件被触发时，响应函数将会按照函数的绑定顺序从上到下执行。
  4. 这个方法在IE8及以下的浏览器不支持，如需兼容IE8及以下，可以使用attachEvent()来绑定事件。
*/
btn01.addEventListener(
  'click',
  function() {
    alert(1)
  },
  false
)
btn02.addEventListener(
  'click',
  function() {
    alert(2)
  },
  false
)

/*
attachEvent()
  1. 通过这个方法也可以为元素绑定响应函数。
  2. 参数：
    1. 事件的字符串，要写on。
    2. 回调函数，当事件触发时该函数会被调用。
  3. 这个方法也可以同时为一个事件绑定多个处理函数，不同的是它是后绑定的先执行，执行顺序和addEventListener()相反。
  4. addEventListener()中的this指向的是绑定事件的对象（btn01）,attachEvent()中的this，指向的是window，需要统一两个方法的this。
*/
btn01.attachEvent('onclick', function() {
  alert(1)
})

/*
  解决兼容性问题，定义一个函数，来用为指定元素绑定响应函数。
  参数：
    1. obj 要绑定事件的对象
    2. eventStr 事件的字符串（不要on）
    3. callback 回调函数
*/
function bind(obj, eventStr, callback) {
  if (obj.addEventListener) {
    //大部分浏览器兼容的方式
    obj.addEventListener(eventStr, callback, false)
  } else {
    //this是谁，由调用方式决定 callback.call(obj)
    //IE8及以下
    obj.attachEvent('on' + eventStr, function() {
      //添加匿名函数的作用是此时浏览器会默认调用匿名函数function(){}()，之后再在匿名函数调用call()方法
      //如果直接写callback.call(obj)，浏览器在调用时会变成callback.call(obj)(),会报错。
      //在匿名函数中调用回调函数,在IE8中this会变成window，必须使用匿名函数才会变成obj
      callback.call(obj)
    })
  }
}
```

## 事件的传播

1. 关于事件的传播，网景公司和微软公司有不同的理解。
2. 微软公司认为事件应该是由内向外传播，也就是当事件触发时，应该先触发当前元素上的事件，然后再向当前元素的祖先元素上传播，也就是事件在冒泡阶段执行。
3. 网景公司认为事件应该是由外向内传播的，也就是当前事件触发时，应该向触发当前元素的最外层的祖先元素的事件，然后再向内传播给后代元素直到当前元素为止，也就是在事件的捕获阶段执行。
4. W3C 综合了两个公司的方案，将事件传播分成了三个阶段

   ```text
   1. 捕获阶段
     在捕获阶段时从最外层的祖先元素，向目标元素进行事件的捕获，但是默认此时不会触发事件。
   2. 目标阶段
     事件捕获到目标元素，捕获结束开始在目标元素上触发事件。
   3. 冒泡阶段
     事件从目标元素向它的祖先元素传递。，依次触发祖先元素上的事件。
   ```

5. 如果希望在捕获阶段就触发事件，可以将 `addEventListener()`的第三个参数设置为 true。一般情况下我们不会希望在捕获阶段触发事件，所以这个参数一般都是 false。
6. 在 IE8 及以下的浏览器中没有捕获阶段（没有 `addEventListener()`函数）。

## 拖拽事件

1. 拖拽的流程

   1. onmousedown:当鼠标在被拖拽元素上按下左键时，开始拖拽。
   2. onmousemove:当鼠标移动时被拖拽元素跟随鼠标移动。
   3. onmouseup:当鼠标松开时，被拖拽元素固定在当前位置。

   ```JavaScript
   //拖拽box1元素
   var box1 = document.getElementById("box1");
   //为box1绑定一个鼠标按下事件
   //如果要拖拽图片，需要对图片设置绝对定位，position：absolute；
   drag(box1);
   //提取一个专门用来拖拽的函数
   //参数： obj 开启拖拽的元素
   function drag(obj){
       //①为obj绑定一个鼠标按下事件
       obj.onmousedown = function(event){
           //取消浏览器默认行为，兼容IE8，为box1设置捕获所有鼠标按下的事件，防止chrome报错要添加if判断
           //if(box1.setCapture){
         //     box1.setCapture();
         // }
           obj.setCapture && obj.setCapture();//利用&&与运算的短路作简化判断，if判断的简写，返回第一个假或最后一个真。

           event = event || windows.event;
           //div的偏移量 鼠标.clientX - 元素.offsetLeft
           //div的偏移量 鼠标.clientY - 元素.offsetTop
           var ol = event.clientX - obj.offsetLeft;  //这里的event.clientX 和 event.clientY是鼠标点击时的值，这个值是定值
           var ot = event.client - obj.offsetTop;
           //②为document绑定一个onmousemove事件
           document.onmousemove = function(event){
               event = event || windows.event;  //与onmousedown中的event范围不一样，不是同一个event，一个是box1的event，一个是document的event
               //获取鼠标的坐标
               var left = event.clientX - ol;  //这里的event.clientX 和 event.clientY是鼠标移动时的值，是个变量
               var top = event.clientY - ot;
               //修改box1的位置
               obj.style.left = left + "px";
               obj.style.top = top + "px";
           };
           //③为document元素绑定一个鼠标松开事件
           document.onmouseup = function(){
               //取消document的onmousemove事件
               document.onmousemove = null;
               //取消document的onmouseup事件
               document.onmouseup = null;
               //取消box1对事件的捕获
               obj.releaseCapture && obj.releaseCapture(); //防止chrome报错，判断是否存在该方法，存在则调用
           }
           //取消浏览器默认行为
           return false;
     };
   }
   ```

2. 取消浏览器默认行为
   1. 当我们拖拽一个网页中的内容时，浏览器会默认去搜索引擎中搜索内容，此时会导致拖拽功能的异常。这个是浏览器提供的默认行为，如果不希望发生这个行为，可通过 return false 来取消默认行为。
   2. 但是这个方法对 IE8 不起作用。如果要兼容 IE8 需要对拖拽元素使用 `setCapture()`方法

```text
setCapture()
1. 当调用于一个元素的setCapture()以后，这个元素将会把下一次所有的其他元素（包括点击刷新浏览器窗口甚至点击桌面）鼠标按下相关事件捕获到自身上.
2. 使用releaseCapture()取消元素对事件的捕获。
3. setCapture()方法只有IE支持，但是在火狐中调用不会报错，而在chrome中调用则会报错。
```

## 鼠标滚轮滚动事件

1. onmousewheel
   1. 该事件会在鼠标滚轮滚动时触发，但是火狐不支持该属性。
   2. 在火狐中需要使用 DOMMousecroll 来绑定滚动事件，且该事件需要通过 `addEventListener()`函数来绑定。
2. event.wheelDelta(在 IE 是 window.event.wheelDelta)

   1. 可以获取鼠标滚轮滚动的方向。
   2. 向上滚动返回 120；向下滚动返回 -120(每滚动一次返回一次)
   3. wheelDelta 这个值一般不看大小，只看正负。
   4. wheelDelta 这个属性火狐也不支持，在火狐中需要使用 event.detail 来获取滚动的方向，且向上返回 -3 ，向下返回 3。

   ```JavaScript
   //在IE和chrome中绑定滚轮事件
   box1.onmousewheel = function(){
     //事件处理。。。
   };
   //在火狐中绑定滚轮事件
   //bind()函数在上面可查
   bind(box1,"DOMMouseScroll",function(){
       //事件处理。。。
   });

   //进行事件提取简化，方案一
   function fun(){
     //事件处理。。。
   };
   box1.onmousewheel = fun;
   bind(box1,"DOMouseScroll",fun);

   //进一步提取简化，方案二
   box1.onmousewheel = function(event){
     //当鼠标滚轮向下滚动时，box1变长，向上滚动变短
     event = event || window.event;
     //判断滚轮滚动方向，兼容火狐
     if(event.wheelDelta > 0 || event.detail < 0){
         //向上滚动box变短
         box1.style.height = box1.clientHeight - 10 + "px";
     }else{
         //向下滚动box变长
         box1.style.height = box1.clientHeight + 10 + "px";
     }
     //取消默认滚轮行为，兼容IE、火狐、chrome
     event.preventDefault && event.preventDefault(); //如果存在该方法则调用
     return false;
   };
   bind(box1."DOMMouseScroll",box1.mousewheel); //直接将box1.mousewheel作为回调函数调用
   ```

3. 取消浏览器默认滚动行为
   1. 当滚轮滚动时，如果浏览器有滚动条，滚动条会随之滚动，这是浏览器的默认行为，如果不希望发生默认行为，需要使用 return false 取消默认行为。
   2. 但是在火狐浏览器中，使用的是`addEventListener()`方法绑定的响应函数（DOMMouseScroll），该方法取消默认行为时不能使用 return false。`addEventListener()`方法需要调用 `event.preventDefault()`方法取消默认行为。
   3. 但是在 IE8 中不支持`event.preventDefault()`方法，直接调用会报错。故如需使用需要添加 if 判断或与运算短路。

## 键盘事件

1. onkeydown

   1. 键盘按键被按下时触发该事件
   2. 对于 onkeydown 事件来说，如果一直按着某个按键不松开，则此时事件会一直被触发。
   3. 当 onkeydown 连续触发(按下键盘按键不放)时，第一次和第二次之间会间隔时间稍微长一点，之后触发时间会非常短。这种设计是为了防止用户误操作的发生(防止按下一个 a 键立马出现多个 a)。
   4. 在文本框中输入内容属于 onkeydown 的默认行为，如果在 onkeydown 事件中取消默认行为，则输入的内容将不会出现在文本框中(但此时依然会触发 onkeydown 事件)。

2. onkeyup
   1. 键盘按键松开时触发该事件，且默认只会触发一次。
3. 键盘事件一般都会绑定给一些可以获取到焦点的对象或者是 document。

   ```javascript
   //给document绑定键盘事件
   document.onkeydown = function(event) {
     //输出按键编码
     event = event || window.event
     console.log(event.keyCode)
     //判断Y键是否被按下
     if (event.keyCode === 89) {
       //Y被按下事件。。。   使用 === 全等防止浏览器自动类型转换
     }
     //判断y和ctrl键是否同时被按下
     if (event.keyCode === 89 && event.ctrlkey) {
       //同时被按下事件。。。
     }
   }

   //给获取焦点对象input绑定键盘事件
   var input = document.getElementsByTagName('input')[0]
   input.onkeydown = function() {
     console.log('按键被按下，除了数字都会显示在文本框中')
     if (event.keyCode >= 48 && event.keyCode <= 57) {
       return false //禁止输入数字，数字按键被按下了，但是不会显示在文本框
     }
   }
   ```

4. keyCode
   1. 通过 event.keyCode 来获取按键的编码由此来判断是哪个按键被按下。
   2. 除了 keyCode，事件对象中还提供了以下几个属性：
      - altkey 判断 alt 键是否被按下
      - ctrlkey 判断 ctrl 键是否被按下
      - shiftkey 判断 shift 键是否被按下
      - 如果按下则返回 true，否则返回 false。
   3. 数字 0~9 键的 keyCode 码是 48~57 。
