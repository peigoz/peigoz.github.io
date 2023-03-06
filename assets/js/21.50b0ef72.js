(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{552:function(s,t,e){"use strict";e.r(t);var a=e(3),v=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"node-服务器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#node-服务器"}},[s._v("#")]),s._v(" Node 服务器")]),s._v(" "),e("ol",[e("li",[s._v("Node.js 作为后台服务性能是非常关键的一点，而影响 Node.js 的性能不仅仅要考虑其本身的因素，还应该考虑所在服务器的一些因素。Node.js 的事件循环机制和 cluster 模式就是一种 Node.js 潜在的内在因素，而网络 I/O 、磁盘 I/O 以及其他内存、句柄的一些问题则是因为服务器的资源因素导致的性能问题。")])]),s._v(" "),e("h2",{attrs:{id:"cpu-密集型计算"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cpu-密集型计算"}},[s._v("#")]),s._v(" CPU 密集型计算")]),s._v(" "),e("ol",[e("li",[s._v("CPU 负责了程序的运行和业务逻辑的处理，而 CPU 密集型表示的主要是 CPU 承载了比较复杂的运算。")]),s._v(" "),e("li",[s._v("在 Node.js 中有以下几种情况，会影响到主线程的运行，应该主动避免：\n"),e("ol",[e("li",[s._v("大的数据循环，比如没有利用好数据流，一次性处理非常大的数组；")]),s._v(" "),e("li",[s._v("字符串处理转化，比如加解密、字符串序列化等；")]),s._v(" "),e("li",[s._v("图片、视频的计算处理，比如对图片进行裁剪、缩放或者切割等。")])])])]),s._v(" "),e("h2",{attrs:{id:"网络-i-o"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#网络-i-o"}},[s._v("#")]),s._v(" 网络 I/O")]),s._v(" "),e("ol",[e("li",[s._v("网络 I/O 中有 2 种相关的类型，同步阻塞 I/O 和 异步非阻塞 I/O：\n"),e("ol",[e("li",[s._v("同步阻塞 I/O 的字面意思是发出网络请求后需要等待返回后，再处理其他计算；")]),s._v(" "),e("li",[s._v("异步非阻塞 I/O 就是发起网络 I/O 后，还可以处理其他的计算，这也是为什么 Node.js 在处理网络 I/O 性能较高的原因。")])])]),s._v(" "),e("li",[s._v("对于 CPU 密集型的 IO，如果要提升性能\n"),e("ol",[e("li",[s._v("通道复用，比如我们现在每次访问主进程时都会发起一个 TCP 到 子进程，如果能够通道复用，减少 TCP 握手，那么就可以提升该接口的性能，或者将某些内部服务使用 UDP 来实现。")]),s._v(" "),e("li",[s._v("增加缓存，对于相同响应的返回数据，增加缓存处理，避免不必要的计算，对于上面的计算，我们完全可以缓存计算结果，这样来减少网络 I/O。")]),s._v(" "),e("li",[s._v("长链接链接池，有一些网络 I/O 是长链接的形式，比如 MySQL、Memcached 或者 Redis，为了避免排队使用长链接的问题，可以使用链接池，而由于 Redis 和 Node.js 是单线程非阻塞处理，因此可以不用链接池。")])])]),s._v(" "),e("li",[s._v("网络 I/O 一般不影响主线程逻辑，往往网络 I/O 请求的服务反而是瓶颈端，从而影响 Node.js 中涉及该网络服务的请求。其次网络 I/O 堆积较多会侧面影响：\n服务器本身的网络模块问题；\nNode.js 性能，导致其他服务接口受影响。\n因此在网络 I/O 瓶颈时需要考虑修改服务器网络相关的配置。")])]),s._v(" "),e("h2",{attrs:{id:"磁盘-i-o"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#磁盘-i-o"}},[s._v("#")]),s._v(" 磁盘 I/O")]),s._v(" "),e("ol",[e("li",[s._v("服务器的磁盘性能是一定的，如果在高并发情况下，磁盘 I/O 压力较大，从而导致磁盘 I/O 的服务性能下降。")]),s._v(" "),e("li",[s._v("在实际开发过程中，最常见的磁盘 I/O 场景，那就是日志模块，因为日志是需要写文件，从而会有频繁的日志写入。和网络 I/O 相似，磁盘 I/O 也会从侧面的影响机器性能，导致 Node.js 服务性能受影响。")])]),s._v(" "),e("p",[s._v("总结: 在上面 3 种情况中，只有 CPU 密集计算会真正影响到 Node.js 服务性能，而网络 I/O 和磁盘 I/O 都是直接影响服务器性能，从而侧面影响到 Node.js 服务性能")]),s._v(" "),e("h2",{attrs:{id:"集群服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#集群服务"}},[s._v("#")]),s._v(" 集群服务")]),s._v(" "),e("ol",[e("li",[s._v("后台服务一般都有集群的概念，无论是多机器部署，还是单机器（Node.js cluster 模式）。在进程分发的主节点 Nginx 和 Master 都可能会存在性能影响因素点。")])]),s._v(" "),e("h3",{attrs:{id:"多进程-cluster-模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#多进程-cluster-模式"}},[s._v("#")]),s._v(" 多进程 cluster 模式")]),s._v(" "),e("h4",{attrs:{id:"cluster-模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cluster-模式"}},[s._v("#")]),s._v(" cluster 模式")]),s._v(" "),e("ol",[e("li",[s._v("如果我们使用 node app.js 方式运行，就启动了一个进程，只能在一个 CPU 中进行运算，无法应用服务器的多核 CPU，因此我们需要寻求一些解决方案。你能想到的解决方案肯定是多进程分发策略，即主进程接收所有请求，然后通过一定的负载均衡策略分发到不同的 Node.js 子进程中。")]),s._v(" "),e("li",[s._v("这一方案有 2 个不同的实现：\n"),e("ol",[e("li",[s._v("主进程监听一个端口，子进程不监听端口，通过主进程分发请求到子进程；")]),s._v(" "),e("li",[s._v("主进程和子进程分别监听不同端口，通过主进程分发请求到子进程。")])])]),s._v(" "),e("li",[s._v("在 Node.js 中的 cluster 模式使用的是第一个实现,也就是一个主进程和多个子进程，从而形成一个集群的概念。")])]),s._v(" "),e("h4",{attrs:{id:"实际开发"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实际开发"}},[s._v("#")]),s._v(" 实际开发")]),s._v(" "),e("ol",[e("li",[s._v("在实际应用过程中这种模式也是存在性能瓶颈问题的。即主进程 master 进程会存在瓶颈，因为所有的请求都必须经过 master 进程进行分发，同时接收处理 worker 进程的返回。")]),s._v(" "),e("li",[s._v("在实际开发过程中，遇到一个问题，由于我们所用机器是一个 96 核以上的服务器，因此启用了比较多的 worker 进程，而主进程只有一个，从而在单机高并发时（2 万以上的每秒并发请求）会导致 master 进程处理瓶颈，这样就影响到了服务性能，并且这时候你会发现 worker 进程的 CPU 并没有任何压力。")]),s._v(" "),e("li",[s._v("总结:大概在 2 万以上的并发时，master 进程会存在性能瓶颈。")])]),s._v(" "),e("h2",{attrs:{id:"其他相关"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他相关"}},[s._v("#")]),s._v(" 其他相关")]),s._v(" "),e("ol",[e("li",[s._v("对于 Node.js 后台服务，我们不仅仅要考虑其本身的性能影响，更应该考虑它对服务器资源竞争产生的性能影响。比如无节制地使用服务器的内存或者句柄，都会导致服务器的异常，而服务器的异常则从侧面影响到 Node.js 本身的性能")])]),s._v(" "),e("h3",{attrs:{id:"内存限制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#内存限制"}},[s._v("#")]),s._v(" 内存限制")]),s._v(" "),e("ol",[e("li",[s._v("在 32 位服务器上 Node.js 的内存限制是 0.7 G，而在 64 位服务器上则是 1.4 G，而这个限制主要是因为 Node.js 的垃圾回收线程在超过限制内存时，回收时长循环会大于 1s，从而会影响性能问题。")]),s._v(" "),e("li",[s._v("实际我们一般会启用多个进程，如果每个进程损耗 1.4 G，那么加起来可能超出了服务器内存上限，从而导致服务器瘫痪。其次如果内存不会超出服务器上限，而是在达到一定上限时，也就是我们上面说的 0.7 G 和 1.4 G，会导致服务器重启，从而会导致接口请求失败的问题。")])]),s._v(" "),e("h3",{attrs:{id:"句柄限制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#句柄限制"}},[s._v("#")]),s._v(" 句柄限制")]),s._v(" "),e("ol",[e("li",[s._v("句柄可以简单理解为一个 ID 索引，通过这个索引可以访问到其他的资源，比如说文件句柄、网络 I/O 操作句柄等等，而一般服务器句柄都有上限。当 Node.js 没有控制好句柄，比如说无限的打开文件并未关闭，就会出现句柄泄漏问题，而这样会导致服务器异常，从而影响 Node.js 服务。")])]),s._v(" "),e("p",[s._v("总结: 以上这两点我们都需要有一定的工具检测方法，在服务上限之前进行检测，其次也需要有一定的定位的方法，在出现现网异常时，能够定位出具体的问题，具体检测方法在后续会进行更新说明。")])])}),[],!1,null,null,null);t.default=v.exports}}]);