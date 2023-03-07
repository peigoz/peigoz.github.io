/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "99e7d897a7d2ebd070e8b67da1ac8eed"
  },
  {
    "url": "assets/css/0.styles.1b092d94.css",
    "revision": "f3099109f32cd92bb13749e24cff0a88"
  },
  {
    "url": "assets/img/alipay.8701cc62.svg",
    "revision": "8701cc6229ab9a0b625126cdc1838777"
  },
  {
    "url": "assets/img/bg.2cfdbb33.svg",
    "revision": "2cfdbb338a1d44d700b493d7ecbe65d3"
  },
  {
    "url": "assets/img/github.23fc8f81.svg",
    "revision": "23fc8f81f92bb2981d8f9e089d7df14a"
  },
  {
    "url": "assets/img/love.335eff6a.svg",
    "revision": "335eff6a0aefd9ce25d8624c9cae2f54"
  },
  {
    "url": "assets/img/paypal.0614c8ec.svg",
    "revision": "0614c8ec69152b15a48a6508c9ab7373"
  },
  {
    "url": "assets/img/qq.63e39c8c.svg",
    "revision": "63e39c8cb5ba4f6931ea28f722e0f065"
  },
  {
    "url": "assets/img/wechat.702bca7b.svg",
    "revision": "702bca7befb1db3ac5dace5bb9912188"
  },
  {
    "url": "assets/js/1.f63e506c.js",
    "revision": "d17ed48d2ef9b7132708724a92c1c179"
  },
  {
    "url": "assets/js/10.1a6080cf.js",
    "revision": "0f378f59bfb1a9a45fdcf2ab2809b65e"
  },
  {
    "url": "assets/js/11.8ecc8393.js",
    "revision": "acf4477421200aff4a71cc6b48d7e08c"
  },
  {
    "url": "assets/js/12.f43da75e.js",
    "revision": "c2284731c0c49ed6bf5ae2d608d29fea"
  },
  {
    "url": "assets/js/13.7e08e908.js",
    "revision": "2504c4d91699edd8c0e76ef2516ae6a8"
  },
  {
    "url": "assets/js/14.b3039d63.js",
    "revision": "406b9cf17db8ac34d265acae21b543dc"
  },
  {
    "url": "assets/js/15.9d753da6.js",
    "revision": "610f31987ba7d47d7f44422bcac82d80"
  },
  {
    "url": "assets/js/16.25ce7c0c.js",
    "revision": "da2a8fc21144b7de5d33e7b85f6ac632"
  },
  {
    "url": "assets/js/17.869480a5.js",
    "revision": "1df5e628c44ad4b10d035ef0c154639d"
  },
  {
    "url": "assets/js/18.611d331e.js",
    "revision": "22df86b3a05b8c87a09e18db9ec9b2b7"
  },
  {
    "url": "assets/js/19.ed000768.js",
    "revision": "9ee9346733921481270653b8984c0784"
  },
  {
    "url": "assets/js/2.4628556c.js",
    "revision": "be92ac815eb7d57a5666926cc97d66d7"
  },
  {
    "url": "assets/js/20.6d45dc51.js",
    "revision": "e926029e05fd152f7421921396f2ac21"
  },
  {
    "url": "assets/js/21.c95c3205.js",
    "revision": "8cb56954f01dd0e290721502ab16eb14"
  },
  {
    "url": "assets/js/22.1d55dec4.js",
    "revision": "42607e82397d4cc46eb6b833e16b2673"
  },
  {
    "url": "assets/js/23.eb5cf03e.js",
    "revision": "57c1e1fd6d4a5bff558f4e282df45b69"
  },
  {
    "url": "assets/js/24.5c7822a5.js",
    "revision": "525910ec601d2d9234e49da98ab8d95d"
  },
  {
    "url": "assets/js/25.92c459e3.js",
    "revision": "9fb13efa98c2addf6d999bb12bf71220"
  },
  {
    "url": "assets/js/26.60d73e57.js",
    "revision": "dd6cec974393643688a9260d3e2642da"
  },
  {
    "url": "assets/js/27.5f1b8e18.js",
    "revision": "dda0cddd8049ec5512758111ab3d7e9d"
  },
  {
    "url": "assets/js/28.3225e13c.js",
    "revision": "6b2cff7dd4c8a06455c10e1884480500"
  },
  {
    "url": "assets/js/29.466aec6c.js",
    "revision": "1a1d196196be9325921b4e8f3de50356"
  },
  {
    "url": "assets/js/30.f635db76.js",
    "revision": "b3184eb36ce4432a25a7b0ac2ed05449"
  },
  {
    "url": "assets/js/31.7b6ce9d0.js",
    "revision": "9030b10a29828c8ade7f670ae4dcd30d"
  },
  {
    "url": "assets/js/32.6e317859.js",
    "revision": "8a3867168255a9a52ca8a4bf4a7d4f21"
  },
  {
    "url": "assets/js/33.b3914c32.js",
    "revision": "9cd7988540c76ad39f75dc8c6a142a1b"
  },
  {
    "url": "assets/js/34.607c504d.js",
    "revision": "1d2cfaf8e5171e9e65143de8575e2843"
  },
  {
    "url": "assets/js/35.aefb68a6.js",
    "revision": "438e7fab9af18f7ee15daef83ef1a444"
  },
  {
    "url": "assets/js/36.91dc0a07.js",
    "revision": "09b31e763bee38982950a2beb58a4ff1"
  },
  {
    "url": "assets/js/37.11070ec6.js",
    "revision": "d5af1c74a797f4b4d0f5561fb95f3bab"
  },
  {
    "url": "assets/js/38.5e915fdf.js",
    "revision": "07523759f3412439f177790cd2853a0d"
  },
  {
    "url": "assets/js/39.94919f48.js",
    "revision": "bf1d144cc8a20e6763d963f37073565c"
  },
  {
    "url": "assets/js/4.c92ef278.js",
    "revision": "950ae2cd77de1d4f335c2e355430a884"
  },
  {
    "url": "assets/js/40.e3bbff23.js",
    "revision": "217db81b6404286e761fd81e6d4a7a70"
  },
  {
    "url": "assets/js/41.ec623aa2.js",
    "revision": "cf34c8d538913cdc9c88b0bce9739050"
  },
  {
    "url": "assets/js/42.c42592b6.js",
    "revision": "8be17cd1ce60e0faa4d317f35510b396"
  },
  {
    "url": "assets/js/43.16386cc7.js",
    "revision": "a3e9519ac024fa703b237980c0b2e6e5"
  },
  {
    "url": "assets/js/44.17e7cbb8.js",
    "revision": "e5a77f93bf22257190cb5ae41bf534e7"
  },
  {
    "url": "assets/js/45.0147b378.js",
    "revision": "9f583fd497276aa252f50b6555cec7c8"
  },
  {
    "url": "assets/js/46.34ad308a.js",
    "revision": "2b8c0bbf676a235bbc3027aaf89e7630"
  },
  {
    "url": "assets/js/47.04b4be2f.js",
    "revision": "2d0185924a7e5850c6ae5adfa23e41db"
  },
  {
    "url": "assets/js/48.c86da7c5.js",
    "revision": "c9933dc4bd94d94cc0e0677afe03ca1f"
  },
  {
    "url": "assets/js/49.d9833616.js",
    "revision": "2728c7dbd0cf8cb9682aff5ef36a8cb9"
  },
  {
    "url": "assets/js/5.bf1c74e8.js",
    "revision": "2d0d70cbbe49781b6701fb481f245349"
  },
  {
    "url": "assets/js/50.e0a6b4e1.js",
    "revision": "a5e0a5f9876e6b9aa17a52fcfa225288"
  },
  {
    "url": "assets/js/51.2b767bd8.js",
    "revision": "4e86ed0d0d52aa3d8b5632160203180d"
  },
  {
    "url": "assets/js/52.a304ec04.js",
    "revision": "7dce42bcc4e7eac616330282c2423474"
  },
  {
    "url": "assets/js/53.916e3a87.js",
    "revision": "51ff93f71837e262c9d2cfa2316b74e7"
  },
  {
    "url": "assets/js/6.691c30f1.js",
    "revision": "8d01d1331b777caff312a68e46d04fd7"
  },
  {
    "url": "assets/js/7.40437218.js",
    "revision": "8b45bacf65482f749a8fe68bf564981c"
  },
  {
    "url": "assets/js/8.e40b0393.js",
    "revision": "75135eb38a2e7eba585b366ead619f50"
  },
  {
    "url": "assets/js/9.28f08d22.js",
    "revision": "63d52d3cc1e4b13034e76345748187ef"
  },
  {
    "url": "assets/js/app.cba9591b.js",
    "revision": "254d9fcc3252b8b647cb904ba08ddeff"
  },
  {
    "url": "avatar.jpg",
    "revision": "6f3b22e2bc46301092b0814d9d4dc72b"
  },
  {
    "url": "blog/关于此博客.html",
    "revision": "675e72a0038f5eb89e4434e34dcf45cd"
  },
  {
    "url": "categories/Blog/index.html",
    "revision": "3fafd6fef1bb1357f3ac54aac57812ba"
  },
  {
    "url": "categories/CSS/index.html",
    "revision": "3fc0b529060c0523662349a35023a187"
  },
  {
    "url": "categories/HTML/CSS/index.html",
    "revision": "2be6f25aa268ed2d2759a68618bdf419"
  },
  {
    "url": "categories/index.html",
    "revision": "112db450de4e8836de4f305b0266795a"
  },
  {
    "url": "categories/JavaScript/index.html",
    "revision": "e60083194145b30aafa6897d7af0bc38"
  },
  {
    "url": "categories/JavaScript/page/2/index.html",
    "revision": "21d4bd2e52f9acf82f9dd833d88ba627"
  },
  {
    "url": "categories/LeetCode/index.html",
    "revision": "8c37725d5e74001efb74c61494409bb7"
  },
  {
    "url": "categories/Nest/index.html",
    "revision": "707cc76e37d79342dc044bb1f162740f"
  },
  {
    "url": "categories/Node/index.html",
    "revision": "3ebef9ac4fabf2fd890f1d7843339bd1"
  },
  {
    "url": "categories/performance/index.html",
    "revision": "aaeda898e155198a51a3e974ad7bc030"
  },
  {
    "url": "categories/React/index.html",
    "revision": "b22c64d03035a2489a4a4c309b946559"
  },
  {
    "url": "categories/SoftWare/index.html",
    "revision": "c5470e531c54f53cea56312c1c73be56"
  },
  {
    "url": "categories/TypeScript/index.html",
    "revision": "02481d5b21cea8d4f9b1bc8cd10bfb92"
  },
  {
    "url": "categories/Vue/index.html",
    "revision": "f31ba74c8fb6de2f584424cd62ded385"
  },
  {
    "url": "categories/团队协作/index.html",
    "revision": "a114fe5ac9268d2c5f4e843215dc32ad"
  },
  {
    "url": "categories/面试/index.html",
    "revision": "559f3f2e0a4c982dcaf9569edcb70f0c"
  },
  {
    "url": "font-class/demo_index.html",
    "revision": "62572e63419f2336afb84f7cde8b2102"
  },
  {
    "url": "font-class/demo.css",
    "revision": "31103ad158e19b978f7e730ff5ac959b"
  },
  {
    "url": "font-class/iconfont.css",
    "revision": "9a3a28c952249e9980fd925b1a5e0856"
  },
  {
    "url": "font-class/iconfont.eot",
    "revision": "961684b5d18646a138b04dcf044956cc"
  },
  {
    "url": "font-class/iconfont.js",
    "revision": "e1ab2a79f26ef5c817ad99370c13f0ed"
  },
  {
    "url": "font-class/iconfont.svg",
    "revision": "a53cc563adc4f8bcb342f99839151c05"
  },
  {
    "url": "font-class/iconfont.ttf",
    "revision": "f37408732edb143f2e538c63155df0b0"
  },
  {
    "url": "font-class/iconfont.woff",
    "revision": "866c5af6ca836588607efcca95ace556"
  },
  {
    "url": "font-class/iconfont.woff2",
    "revision": "51bb32b8fe05d06163e182ee47e119da"
  },
  {
    "url": "icons/addqq.jpg",
    "revision": "408e8822198e4640eac27e86260747a3"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "d07911a2a261459b5c4e5536f69bdf28"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "3c4030075c78d8296b86f3f9971c8120"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "52cd9c1ead6164907671c89f9d65dbe0"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "ac6babf370a9254134be4d7c26d38d03"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "b851986183cb50a6e687f0ce56929a9f"
  },
  {
    "url": "icons/wecharGet.png",
    "revision": "f0402464aacb96d03ab47fe03245c79c"
  },
  {
    "url": "index.html",
    "revision": "c2bd49bb9ca084ea61c497525a6af4ef"
  },
  {
    "url": "js/disable-user-zoom.js",
    "revision": "4680bfe617977eaf44721b98aa919a90"
  },
  {
    "url": "leetcode/01.两数之和-类型体操版本.html",
    "revision": "dec24c57934d5ab5e60b60513602656c"
  },
  {
    "url": "leetcode/120.三角形最小路径和.html",
    "revision": "0fbfafff6864d136ff03dfaeb23428f2"
  },
  {
    "url": "listen.png",
    "revision": "6f316dbcb3053f98cf7d9cf1f8c578a4"
  },
  {
    "url": "notes/backEnd/Node的CPU过载保护机制.html",
    "revision": "7502b0230828a91278a881308d648592"
  },
  {
    "url": "notes/backEnd/Node的IO机制.html",
    "revision": "49ef22a1e5ef387ea87e05843d7b82d3"
  },
  {
    "url": "notes/backEnd/影响Node的性能因素.html",
    "revision": "9d9d8ccb9902283ea217f4aebcf41ce7"
  },
  {
    "url": "notes/front-end-promotion/web性能优化.html",
    "revision": "d3724156c41a7ecc2ab291bfd2d3b15a"
  },
  {
    "url": "notes/frontEnd/CSS-Flex.html",
    "revision": "7eae2abe88dd6d12ba552b050ff12d13"
  },
  {
    "url": "notes/frontEnd/CSS知识点.html",
    "revision": "73bfaa324a896adda2062e0e54f2bb92"
  },
  {
    "url": "notes/frontEnd/ES6知识点.html",
    "revision": "0c4add41edd132d05aa671f717f75508"
  },
  {
    "url": "notes/frontEnd/HTML常见问题.html",
    "revision": "3199b08d62eeb1a676791d8e33391e8b"
  },
  {
    "url": "notes/frontEnd/JS与DOM坐标计算有关的操作属性.html",
    "revision": "aac1a4827e1bb79ed0d550b46de3d091"
  },
  {
    "url": "notes/frontEnd/JS事件.html",
    "revision": "5141d028e4a31d2faa1c6201768dd7a0"
  },
  {
    "url": "notes/frontEnd/JS作用域与执行上下文.html",
    "revision": "781fefa30ec3ad76b726f6e212d555f4"
  },
  {
    "url": "notes/frontEnd/JS函数.html",
    "revision": "8baf7fe85a72073e37b438d3709c3153"
  },
  {
    "url": "notes/frontEnd/JS原型与原型链.html",
    "revision": "670d2c994b051e64987659aa051cafa8"
  },
  {
    "url": "notes/frontEnd/JS异步任务与事件循环.html",
    "revision": "8210e3b0fcab2eb7bdee174a1901e8f9"
  },
  {
    "url": "notes/frontEnd/JS浏览器BOM对象.html",
    "revision": "4eba248db2dc8c2e7ace806c9d835818"
  },
  {
    "url": "notes/frontEnd/JS类型与常用类型判断.html",
    "revision": "c103c7e8a0363f1392a3e11038df0993"
  },
  {
    "url": "notes/frontEnd/JS类型转换.html",
    "revision": "f3fb7b6b6a21916d56c25f680e1a2039"
  },
  {
    "url": "notes/frontEnd/JS线程机制与事件机制.html",
    "revision": "af4eb9e2e011afebb9eb85ad197b08e7"
  },
  {
    "url": "notes/frontEnd/JS闭包.html",
    "revision": "630e7154b2383c2136fecc915ce6f1f3"
  },
  {
    "url": "notes/frontEnd/JS面向对象之对象创建模式.html",
    "revision": "af7ebac82364d63f2fea693d2bc67395"
  },
  {
    "url": "notes/frontEnd/一些有趣的JS工具类方法.html",
    "revision": "dc7860d2634c65c1a451af919bc65262"
  },
  {
    "url": "notes/index.html",
    "revision": "ddc31d54186b6f0a30cfcbeb28de5606"
  },
  {
    "url": "notes/interview/手撕系列.html",
    "revision": "465241a1b74b6057b3a1ec8a7826d3bc"
  },
  {
    "url": "notes/interview/数组转对象.html",
    "revision": "327d4f50d8dc05c00c5edd92a8310553"
  },
  {
    "url": "server/Nest入门.html",
    "revision": "e886e5b508d31f95028f3737ab5ad006"
  },
  {
    "url": "server/Nest其他相关.html",
    "revision": "db0fb20f018a37d4741553cf978303e5"
  },
  {
    "url": "server/Nest登录认证.html",
    "revision": "141028aa8dc713278a912b64a5c595f9"
  },
  {
    "url": "software/精品软件推荐.html",
    "revision": "83976799121bed0c3baa127d8a6e0e98"
  },
  {
    "url": "sponsor-qrcode/join-me.png",
    "revision": "f559000d959705d0060ba2b351a735fc"
  },
  {
    "url": "sponsor-qrcode/qrcode-wechat.png",
    "revision": "639b015e8cacc2a65dfd967a7d9b84a9"
  },
  {
    "url": "suggestion/index.html",
    "revision": "cac9917b7e2a7d56f890b1dfbe21e461"
  },
  {
    "url": "tag/CSS/index.html",
    "revision": "23751cc802b510a8b5e1bb4e62ea2c97"
  },
  {
    "url": "tag/ES6/index.html",
    "revision": "f55bc8934b12587d09b352e3bc928124"
  },
  {
    "url": "tag/Flex/index.html",
    "revision": "aae01a6691da195fbbffb2c214e38712"
  },
  {
    "url": "tag/Git/index.html",
    "revision": "fb9e6b5749c8101262943dda884c46a9"
  },
  {
    "url": "tag/Github/index.html",
    "revision": "2ad22af1e33122d1922a418445323505"
  },
  {
    "url": "tag/Html/Css/index.html",
    "revision": "5e5ec8f90a7ccbfcdbbf34d209cb9ab9"
  },
  {
    "url": "tag/I/O/index.html",
    "revision": "5dea7ded0bf3566abb6a1b2f9b99b538"
  },
  {
    "url": "tag/index.html",
    "revision": "7f7318fe6573bb03b564b59bf9766b65"
  },
  {
    "url": "tag/JavaScript/index.html",
    "revision": "d746490dd463d35400d18e65b6b4e360"
  },
  {
    "url": "tag/JavaScript/page/2/index.html",
    "revision": "603029bc94dfbc38e13a6cc39342665c"
  },
  {
    "url": "tag/LeetCode/index.html",
    "revision": "b3d4c3e5d0e7d59ef6e8cd5d8ab78a70"
  },
  {
    "url": "tag/Lifecycle/index.html",
    "revision": "1f08284b4b469d2676d7875d78573f1f"
  },
  {
    "url": "tag/Nest/index.html",
    "revision": "8b3852ed54b0e1fdf71149e4e0012f5a"
  },
  {
    "url": "tag/Node/index.html",
    "revision": "3fa50e21baa6e45b489cd46fdb6487cb"
  },
  {
    "url": "tag/NPM/index.html",
    "revision": "a816a2e3b56b99f1c3122cc197c8ed06"
  },
  {
    "url": "tag/React/index.html",
    "revision": "aaa9729400e2c23d0430c5f192ffcac0"
  },
  {
    "url": "tag/SoftWare/index.html",
    "revision": "8d1e51a963a00618ac36bf6d392d7ab7"
  },
  {
    "url": "tag/TypeScript/index.html",
    "revision": "32453b511e7b3860e95541838585fb17"
  },
  {
    "url": "tag/TypeScript类型体操/index.html",
    "revision": "f8373a32cec59e0832e3e0f1060d50df"
  },
  {
    "url": "tag/Vue/index.html",
    "revision": "cbfc3630a1fec8cacef83dbfa272ef29"
  },
  {
    "url": "tag/Vuepress/index.html",
    "revision": "5294b82dee40b779cd552a5464eb3626"
  },
  {
    "url": "tag/web/index.html",
    "revision": "48bae6759ef5d164bfba952842029f2b"
  },
  {
    "url": "tag/性能/index.html",
    "revision": "fa6b0c4cf973c79678cae5772d9e5c07"
  },
  {
    "url": "tag/性能优化/index.html",
    "revision": "e7f92625146ef3e3a8003da30a6fb9c4"
  },
  {
    "url": "tag/登录认证/index.html",
    "revision": "7b52bdaa535555be0b414927d36d5971"
  },
  {
    "url": "tag/算法/index.html",
    "revision": "16ddfdc09d913f465c1b75a3e70d6952"
  },
  {
    "url": "tag/过载保护/index.html",
    "revision": "8b201a6be3e7bd5e51be9e3c26f00a08"
  },
  {
    "url": "tag/面试/index.html",
    "revision": "99bc396c156accd424771d927881bc74"
  },
  {
    "url": "team/git-rebase和git-merge区别.html",
    "revision": "73b5e122aafcacd4fbf72949962f9cd2"
  },
  {
    "url": "team/github.html",
    "revision": "4a0fd0614e3e5d64d3bed3e6bded6cbe"
  },
  {
    "url": "timeline/index.html",
    "revision": "f89a3f091703bd114c3eba4f1bb53d0e"
  },
  {
    "url": "web/TypeScript知识点.html",
    "revision": "ea066850f1b69e9547629b4b3db6a2a9"
  },
  {
    "url": "web/Vue与React各个生命周期.html",
    "revision": "eb1dd58cba21d4d9b438e3f847e79678"
  },
  {
    "url": "web/前端一些常用的npm库.html",
    "revision": "d81d6abbb53fa880abcd829e8f17d310"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
