---
title: web性能优化话题
date: 2022-04-12 23:28:11
tags:
  - WebEngineer
publish: true
---

## 资源合并与压缩

1. 减少 http 请求数量
2. 减少请求资源的大小
   - html 压缩：HTML 代码压缩就是压缩这些在文本文件中有意义，但是在 HTML 中不显示的字符，包括空格，制表符，换行符等，还有一些其他意义的字符，如 HTML 注释也可以被压缩。
   - 如何进行 html 压缩：
     1. 使用在线网站进行压缩(现代一般使用 webpack 等打包压缩)
     2. nodejs 提供了 html-minifier 工具
     3. 后端模板引擎渲染压缩
   - css 压缩：删除无效代码、css 语义合并(多使用简写属性)
   - 如何进行 css 压缩：
     1. 使用在线网站进行压缩
     2. 使用 html-minifier 对 html 中的 css 进行压缩
     3. 使用 clean-css 对 css 进行压缩
   - js 压缩与混乱：
     1. 无效字符的删除
     2. 剔除注释
     3. 代码语义的缩减和优化
     4. 代码保护
   - 如何进行 js 压缩和混乱：
     1. 使用在线网站进行压缩
     2. 使用 html-minifier 对 html 中的 js 进行压缩 3· 使用 uglifyjs2 对 js 进行压缩
   - 文件合并存在的问题：
     1. 首屏渲染问题
     2. 缓存失效问题
   - 解决方法：
     1. 公共库合并
     2. 不同页面的合并
     3. 见机行事，随机应变
   - 如何进行文件合并：
     1. 在线网站进行文件合并
     2. nodejs 实现文件合并

## 图片相关的优化

1. 不同格式图片常用的业务场景
   - jpg 有损压缩，压缩率高，不支持透明
   - png 支持透明，浏览器兼容好
   - webp 压缩程度更好，在 ios webview 有兼容性问题
   - svg 矢量图，代码内嵌，相对较小，图片样式相对简单的场景
2. CSS 雪碧图
   1. 把你的网站上用到的一些图片整合到一张单独的图片中
   2. 减少你的网站的 HTTP 请求数量
   3. 缺点：整合图片比较大时，一次加载比较慢
   4. 雪碧图样式生成网站:www.spritecow.com
   5. 使用 CssSprite 软件一键生成
   6. 使用构建工具一键生成
3. Image inline
   1. 使用 Base64 的方式将图片的内容内嵌到 html 当中
   2. 减少你的网站的 HTTP 请求数量
4. 使用矢量图
   1. 使用 SVG 进行矢量图的绘制
   2. 使用 iconfont 解决 icon 问题
5. 在安卓下使用 webp
   1. Webp 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都非常优秀、稳定和统一。
   2. 在线转换 webp：zhitu.isux.us
   3. 使用构建工具 fis3、webpack 的 webp 插件自动批量转换
6. 选择：
   1. 小于 4kb（8kb）的图片通过构建工具自动转为 inline Image，进而减少一次 http 请求

## HTML 渲染过程的一些特点

1. 顺序执行、并发加载
   - 并发加载：一个域名的并发数量有限制的(大约 20 个)，所以会设置 3-4 个 cdn 域名进行托管，防止一个域名达到浏览器并发请求的上限
2. 是否阻塞
3. 依赖关系
4. 引入方式
   - link:可以利用缓存
   - import

## css 阻塞

1. css head 中阻塞页面的渲染
2. css 阻塞 js 的执行（js 执行会修改 DOM 树和 css 样式，故要先等其渲染完毕才执行 js）
3. css 不阻塞外部脚本的加载

## js 阻塞

1. 直接引入的 js 阻塞页面的渲染
2. js 不阻塞资源的加载
3. js 顺序执行，阻塞后续 js 逻辑的执行

## 懒加载

1. 图片进入可视区域之后再请求资源
2. 对于电商网站等图片很多，页面很长的业务场景适用
3. 可减少无效资源的加载
4. 并发加载的资源过多会阻塞 js 的加载，影响网站的正常使用
5. 原生 jquery 实现：zepto.lazyload.js

## 预加载

1. 图片等静态资源在使用之前的提前请求
2. 资源使用到时能直接从缓存中加载，提升用户体验
3. 页面展示的依赖关系维护
4. 预加载方式：
   1. 直接设置 image 标签的 src，display:none
   2. 使用 new Image()对象
   3. 使用 XMLHttpRequest()请求
5. 原生 jquery：preload.js. 预加载方式：
   1. 直接设置 image 标签的 src，display:none
   2. 使用 new Image()对象
   3. 使用 XMLHttpRequest()请求
6. 原生 jquery：preload.js

## 重绘和回流

1. css 性能让 javascript 变慢
   - 虽然浏览器 css 和 dom 渲染引擎和 js 解析引擎是分开的，但是他们会相互作用，渲染引擎会阻塞 js 解析引擎，js 解析引擎也会阻塞渲染引擎。
   - 频繁触发重绘与回流，会导致 U 频繁渲染，最终导致 js 变慢
2. 回流
   - 当 render tree 中的一部分（或全部）因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流（reflow）
   - 当页面布局和几何属性改变时就需要回流
   - 触发页面重布局的属性：
     1. 盒子模型相关属性会触发重布局（width height padding margin display border-width border min-height）
     2. 定位属性及浮动也会触发重布局（top bottom left right position float clear）
     3. 改变节点内部文字结构也会触发重布局（text-align overflow-y font-weight overflow font-family line-height vertival-align white-space font-size）
3. 重绘
   - 当 render tree 中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如 background-color。则就叫称为重绘。
   - 只触发重绘的属性：
     1. 和边框背景颜色有关的属性（color border-style border-radius visibility text-decoration background background-image background-position background-repeat background-size outline-color outline outline-style outline-width box-shadow）
4. 回流必将引起重绘，而重绘不一定会引起回流
5. 新建 DOM 的过程
   1. 获取 DOM 后分割为多个图层
   2. 对每个图层的节点计算样式结果（Recalculate style--样式重计算）
   3. 为每个节点生成图形和位置（Layout-回流和重布局）
   4. 将每个节点绘制填充到图层位图中（Paint Setup 和 Paint--重绘）
   5. 图层作为纹理上传至 GPU
   6. 符合多个图层到页面上生成最终屏幕图像（Composite Layers--图层重组）
6. 性能优化：
   1. 将频繁重绘回流的 DOM 元素单独作为一个独立图层，那么这个 DOM 元素的重绘和回流的影响只会在这个图层中（原则上少创建图层，最终图层重组时会耗费很大性能）。
      - Chrome 创建图层的条件
        1. 3D 或透视变换 CSS 属性(perspective transform:translateZ(0) will-change:transform)
        2. 使用加速视频解码的 video 节点
        3. 拥有 3D(WebGL)上下文或加速的 2D 上下文的`<canvas>`节点
        4. 混合插件（如 Flash）
        5. 对自己的 opacity 做 CSS 动画或使用一个动画 webkit 变换的元素
        6. 拥有加速 CSS 过滤器的元素
        7. 元素有一个包含复合层的后代节点（一个元素拥有一个子元素，该子元素在自己的层里）
        8. 元素有一个 z-index 较低且包含一个复合层的兄弟元素（换句话说就是该元素在复合层上面渲染）
   2. 避免使用触发重绘、回流的 CSS 属性
   3. 实战优化点：
      1. 用 translate 替代 top 改变，top 会触发 Layout 回流，translate 不会
      2. 用 opacity 替代 visibility，前提要将 opacity 所修改的图层独立出去。visibility 会触发 Print 重绘，opacity 重绘和回流都不会触发
      3. 不要一条一条地修改 DOM 的样式,预先定义好 class ,然后修改 DOM 的 className
      4. 把 DOM 离线后修改,比如:先把 DOM 给 display:none (有一次 Reflow) ,然后你修改 100 次,然后再把它显示出来
      5. 不要把 DOM 结点的属性值（offsetHeight offsetWidth）放在一个循环里当成循环里的变量,可使用一个变量储存起来它的值，不要多次读取
      6. 不要使用 table 布局,可能很小的一个小改动会造成整个 table 的重新布局
      7. 动画实现的速度的选择，选择合适的动画速度和间隔时间
      8. 对于动画新建图层
      9. 启用 GPU 硬件加速

## 浏览器存储

1. Cookie
   1. 用于浏览器端和服务器端的交互:因为 HTTP 请求无状态，所以需要 cookie 去维持客户端状态(设计出来的初衷)
   2. 客户端自身数据的存储,但是存在限制:
      1. 作为浏览器存储，大小 4KB 左右
      2. 需要设置过期时间 expire
      3. 在 cookie 中设置了 HttpOnly 属性，那么通过 js 脚本将无法读取到 cookie 信息，这样能有效的防止 XSS 攻击
      4. cookie 存储数据能力逐渐被 localstorage 替代
      5. cookie 中在相关域名下面——cdn 的流量损耗
         - 解决方法：cdn 的域名和主站的域名要分开
2. LocalStorage
   1. HTML5 设计出来专门用于浏览器存储的
   2. 大小为 5M 左右
   3. 仅在客户端使用，不和服务端进行通信
   4. 接口封装较好
   5. 浏览器本地缓存方案
3. SessionStorage
   1. 会话级别的浏览器存储
   2. 大小为 5M 左右
   3. 仅在客户端使用，不和服务端进行通信
   4. 接口封装较好
   5. 对于表单信息的维护
4. IndexedDB

   1. IndexedDB 是一种低级 API，用于客户端存储大量结构化数据。该 API 使用索引来实现对该数据的高性能搜索。虽然 WebStorage 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。IndexedDB 提供了一个解决方案。
   2. 为应用创建离线版本

   ```txt
   1. indexedDB 对象：浏览器原生提供indexedDB对象
   API:
       1. indexedDB.open():打开数据库,第一个参数是数据库名称，格式为字符串，不可省略；第二个参数是数据库版本，是一个大于0的正整数,可省略
       2. indexedDB.deleteDatabase():删除一个数据库，参数为数据库的名字
       3. indexedDB.cmp():比较两个值是否为 indexedDB 的相同的主键,返回一个整数，表示比较的结果：0表示相同，1表示第一个主键大于第二个主键，-1表示第一个主键小于第二个主键。

   2. IDBRequest 对象: 执行indexedDB.open()方法和indexedDB.deleteDatabase()方法会返回这个对象
   API:
       1. IDBRequest.readyState：等于pending表示操作正在进行，等于done表示操作正在完成。
       2. IDBRequest.result：返回请求的结果。如果请求失败、结果不可用，读取该属性会报错。
       3. IDBRequest.error：请求失败时，返回错误对象。
       4. IDBRequest.source：返回请求的来源（比如索引对象或 ObjectStore）。
       5. IDBRequest.transaction：返回当前请求正在进行的事务，如果不包含事务，返回null。
       6. IDBRequest.onsuccess：指定success事件的监听函数。
       7. IDBRequest.onerror：指定error事件的监听函数。

   3. IDBOpenDBRequest 对象：继承 IDBRequest 对象，提供了两个额外的事件监听属性。
   API:
       1. IDBOpenDBRequest.onblocked：指定blocked事件（upgradeneeded事件触发时，数据库仍然在使用）的监听函数。
       2. IDBOpenDBRequest.onupgradeneeded：upgradeneeded事件的监听函数。

   4. IDBDatabase 对象:从IDBOpenDBRequest对象的result（event.target.result）属性上面，拿到一个IDBDatabase对象，它表示连接的数据库
   属性:
       1. IDBDatabase.name：字符串，数据库名称
       2. IDBDatabase.version：整数，数据库版本。数据库第一次创建时，该属性为空字符串。
       3. IDBDatabase.objectStoreNames：DOMStringList 对象（字符串的集合），包含当前数据的所有 object store 的名字。
       4. IDBDatabase.onabort：指定 abort 事件（事务中止）的监听函数。
       5. IDBDatabase.onclose：指定 close 事件（数据库意外关闭）的监听函数。
       6. IDBDatabase.onerror：指定 error 事件（访问数据库失败）的监听函数。
       7. IDBDatabase.onversionchange：数据库版本变化时触发（发生upgradeneeded事件，或调用indexedDB.deleteDatabase()）
   API:
       1. IDBDatabase.close()：关闭数据库连接，实际会等所有事务完成后再关闭。
       2. IDBDatabase.createObjectStore()：创建存放数据的对象仓库，类似于传统关系型数据库的表格，返回一个 IDBObjectStore 对象。该方法只能在versionchange事件监听函数中调用。
       3. IDBDatabase.deleteObjectStore()：删除指定的对象仓库。该方法只能在versionchange事件监听函数中调用。
       4. IDBDatabase.transaction()：返回一个 IDBTransaction 事务对象。

   5. IDBObjectStore 对象:执行IDBDatabase.createObjectStore()方法返回的一个对象。
   属性：
       1. IDBObjectStore.indexNames：返回一个类似数组的对象（DOMStringList），包含了当前对象仓库的所有索引。
       2. IDBObjectStore.keyPath：返回当前对象仓库的主键。
       3. IDBObjectStore.name：返回当前对象仓库的名称。
       4. IDBObjectStore.transaction：返回当前对象仓库所属的事务对象。
       5. IDBObjectStore.autoIncrement：布尔值，表示主键是否会自动递增。
   API:
       1. IDBObjectStore.add(): 用于向对象仓库添加数据，返回一个 IDBRequest 对象。该方法只用于添加数据，如果主键相同会报错，因此更新数据必须使用put()方法。第一个参数是键值，第二个参数是主键
       2. IDBObjectStore.put(): 用于更新某个主键对应的数据记录，如果对应的键值不存在，则插入一条新的记录。该方法返回一个 IDBRequest 对象。
       3. IDBObjectStore.clear(): 删除当前对象仓库的所有记录。该方法返回一个 IDBRequest 对象
       4. IDBObjectStore.delete(): 用于删除指定主键的记录。该方法返回一个 IDBRequest 对象
       5. IDBObjectStore.count(): 用于计算记录的数量。该方法返回一个 IDBRequest 对象。
       6. IDBObjectStore.getKey(): 用于获取主键。该方法返回一个 IDBRequest 对象。
       7. IDBObjectStore.get(): 用于获取主键对应的数据记录。该方法返回一个 IDBRequest 对象
       8. DBObjectStore.getAll(): 用于获取对象仓库的记录。该方法返回一个 IDBRequest 对象。
       9. IDBObjectStore.getAllKeys():用于获取所有符合条件的主键。该方法返回一个 IDBRequest 对象。
       10. IDBObjectStore.index(): 返回指定名称的索引对象 IDBIndex
       11. IDBObjectStore.createIndex(): 用于新建当前数据库的一个索引。该方法只能在VersionChange监听函数里面调用。
       12. IDBObjectStore.deleteIndex(): 用于删除指定的索引。该方法只能在VersionChange监听函数里面调用。
       13. IDBObjectStore.openCursor(): 用于获取一个指针对象。
       14. IDBObjectStore.openKeyCursor(): 用于获取一个主键指针对象。

    6. IDBTransaction 对象 :执行IDBDatabase.transaction()方法返回的对象。用来异步操作数据库事务，所有的读写操作都要通过这个对象进行。
    注意：
       1. 事务的执行顺序是按照创建的顺序，而不是发出请求的顺序。
       2. 事务有可能失败，只有监听到事务的complete事件，才能保证事务操作成功。
    属性:
       1. IDBTransaction.db：返回当前事务所在的数据库对象 IDBDatabase。
       2. IDBTransaction.error：返回当前事务的错误。如果事务没有结束，或者事务成功结束，或者被手动终止，该方法返回null。
       3. IDBTransaction.mode：返回当前事务的模式，默认是readonly（只读），另一个值是readwrite。
       4. IDBTransaction.objectStoreNames：返回一个类似数组的对象 DOMStringList，成员是当前事务涉及的对象仓库的名字。
       5. IDBTransaction.onabort：指定abort事件（事务中断）的监听函数。
       6. IDBTransaction.oncomplete：指定complete事件（事务成功）的监听函数。
       7. IDBTransaction.onerror：指定error事件（事务失败）的监听函数。
       8. IDBTransaction 对象有以下方法。
   方法：
       1. IDBTransaction.abort()：终止当前事务，回滚所有已经进行的变更。
       2. IDBTransaction.objectStore(name)：返回指定名称的对象仓库 IDBObjectStore。

   7. IDBIndex 对象：IDBObjectStore.index()方法可以获取 IDBIndex 对象，IDBIndex 对象代表数据库的索引，通过这个对象可以获取数据库里面的记录
   属性：
       1. IDBIndex.name：字符串，索引的名称。
       2. IDBIndex.objectStore：索引所在的对象仓库。
       3. IDBIndex.keyPath：索引的主键。
       4. IDBIndex.multiEntry：布尔值，针对keyPath为数组的情况，如果设为true，创建数组时，每个数组成员都会有一个条目，否则每个数组都只有一个条目。
       5. IDBIndex.unique：布尔值，表示创建索引时是否允许相同的主键。
   API: IDBIndex 对象有以下方法，它们都是异步的，立即返回的都是一个 IDBRequest 对象。
       1. IDBIndex.count()：用来获取记录的数量。它可以接受主键或 IDBKeyRange 对象作为参数，这时只返回符合主键的记录数量，否则返回所有记录的数量。
       2. IDBIndex.get(key)：用来获取符合指定主键的数据记录。
       3. IDBIndex.getKey(key)：用来获取指定的主键。
       4. IDBIndex.getAll()：用来获取所有的数据记录。它可以接受两个参数，都是可选的，第一个参数用来指定主键，第二个参数用来指定返回记录的数量。如果数据集比较大，建议使用IDBCursor 对象。
       5. IDBIndex.getAllKeys()：该方法与IDBIndex.getAll()方法相似，区别是获取所有主键。
       6. IDBIndex.openCursor()：用来获取一个 IDBCursor 对象，用来遍历索引里面的所有条目。
       7. IDBIndex.openKeyCursor()：该方法与IDBIndex.openCursor()方法相似，区别是遍历所有条目的主键。

   8. IDBCursor 对象:代表指针对象，用来遍历数据仓库（IDBObjectStore）或索引（IDBIndex）的记录。一般通过IDBObjectStore.openCursor()方法获得
   属性:
       1. IDBCursor.source：返回正在遍历的对象仓库或索引。
       2. IDBCursor.direction：字符串，表示指针遍历的方向。共有四个可能的值：next（从头开始向后遍历）、nextunique（从头开始向后遍历，重复的值只遍历一次）、prev（从尾部开始向前遍历）、prevunique（从尾部开始向前遍历，重复的值只遍历一次）。该属性通过IDBObjectStore.openCursor()方法的第二个参数指定，一旦指定就不能改变了。
       3. IDBCursor.key：返回当前记录的主键。
       4. IDBCursor.value：返回当前记录的数据值。
       5. IDBCursor.primaryKey：返回当前记录的主键。对于数据仓库（objectStore）来说，这个属性等同于IDBCursor.key；对于索引，IDBCursor.key返回索引的位置值，该属性返回数据记录的主键。
   API:
       1. IDBCursor.advance(n)：指针向前移动 n 个位置。
       2. IDBCursor.continue()：指针向前移动一个位置。它可以接受一个主键作为参数，这时会跳转到这个主键。
       3. IDBCursor.continuePrimaryKey()：该方法需要两个参数，第一个是key，第二个是primaryKey，将指针移到符合这两个参数的位置。
       4. IDBCursor.delete()：用来删除当前位置的记录，返回一个 IDBRequest 对象。该方法不会改变指针的位置。
       5. IDBCursor.update()：用来更新当前位置的记录，返回一个 IDBRequest 对象。它的参数是要写入数据库的新的值。

   9. IDBKeyRange 对象:代表数据仓库（object store）里面的一组主键。根据这组主键，可以获取数据仓库或索引里面的一组记录。
   属性：
       1. IDBKeyRange.lower：返回下限
       2. IDBKeyRange.lowerOpen：布尔值，表示下限是否为开区间（即下限是否排除在范围之外）
       3. IDBKeyRange.upper：返回上限
       4. IDBKeyRange.upperOpen：布尔值，表示上限是否为开区间（即上限是否排除在范围之外）
   静态方法:
       1. IDBKeyRange.lowerBound()：指定下限。
       2. IDBKeyRange.upperBound()：指定上限。
       3. IDBKeyRange.bound()：同时指定上下限。
       4. IDBKeyRange.only()：指定只包含一个值
   ```

5. PWA
   1. PWA （Progressive Web Apps）是一种 Web App 新模型并不是具体指某一种前沿的技术或者某一个单一的知识点，我们从英文缩写来看就能看出来，这是一个渐进式的 WebApp ，是通过一系列新的 Web 特性，配合优秀的 UI 交互设计，逐步的增强 Web App 的用户体验。
   2. 可靠：在没有网络的环境中也能提供基本的页面访问，而不会出现"未连接到互联网"的页面。
   3. 快速：针对网页渲染及网络数据访问有较好优化。
   4. 融入（Engaging）：应用可以被增加到手机桌面，并且和普通应用一样有全屏、推送等特性。
   5. 检查是否是 PWA：lighthouse
6. Service Worker
   1. Service Worker 是一个脚本，浏览器独立于当前网页，将其在后台运行，为实现一些不依赖页面或者用户交互的特性打开了一扇大门。在未来这些特性将包括推送消息背景后台同步，geofencing （地理围栏定位） ，但它将推出的第一个首要特性，就是拦截和处理网络请求的能力，包括以编程方式来管理被缓存的响应。
   2. 使用拦截和处理网络请求的能力，去实现一个离线应用
   3. 使用 Service Worker 在后台运行同时能和页面通信的能力，去实现大规模后台数据的处理

## 缓存

### Cache-Control（Response、Request,http1.1 提出来的）

1. max-age
   - 服务器告诉客户端，在 0~max-age 这段时间内资源都是最新的，不必向服务端重新发起请求，可以直接从缓存中读取
   - max-age 优先级比 expires(过期时间)要更高
2. s-maxage
   - s-maxage 优先级高于 max-age，但是只对 public 缓存设备(例如 CDN)才生效，此时会重新向 CDN 发起请求，CDN 返回 304 状态码，并将缓存资源发送给客户端
   - 在 s-maxage 设置的时间内，CDN 不会更新，超过 s-maxage 后才会去源服务器请求更新资源
3. private
   - 可从私有服务器读取，如浏览器客户端
   - 设置 maxage
4. public
   - 只能从公有服务器读取，如 CDN
   - 设置 s-maxage
5. no-cache
   - Cache-Control 配置了 no-cache，不会像 max-age 那样直接去浏览器读相关的缓存而完全不发请求到服务端，它会先发起请求去读取服务端信息判断客户端的资源有没有过期
6. no-store
   - 不使用缓存

### Expires（http1.0）

1. 缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。
2. 告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求

### Last-Modified/If-Modified-Since

1. 基于客户端和服务端协商的缓存机制
2. last-modified —— response header
3. if-modified-since —— request header
4. 需要与 cache-control 共同使用
5. 比 max-age 优先级低
6. 缺点：
    - 某些服务端不能获取精确的修改时间
    - 文件修改时间改了，但文件内容却没有变

### Etag/If-None-Match

1. 文件内容的 hash 值
2. etag —— response header
3. if-none-match —— request header
4. 需要与 cache-control 共同使用

### 分级缓存策略

1. 200 状态(from cache):这一层由 expires/cache-control 控制
   1. expires（http 1.0 版有效）是绝对时间
   2. cache-control（http1.1 版有效），相对时间，两者都存在时 cache-control 覆盖 expires,只要 cache-control 没有失效，浏览器只访问自己的缓存
2. 304 状态：这一层由 last-modified/etag 控制
   1. 当上一层失效时或用户点击 refresh，F5 时，浏览器就会发送请求给服务器，如果服务器端没有变化，则返回 304 给浏览器
3. 200 状态：当浏览器本地没有缓存或者上一层失效时，或者用户使用 CTL+F5 强制时，浏览器直接去服务器下载最新数据

## 服务端优化

### 多层次的优化方案

1. 构建层模板编译
2. 数据无关的 prerender 的方式
3. 服务端渲染
