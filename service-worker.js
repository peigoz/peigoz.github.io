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
    "revision": "08070596c37f4c464ff53484fa5f3bac"
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
    "url": "assets/js/11.94925f1c.js",
    "revision": "e0595287da7f8e99eb1839dd97ddf842"
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
    "url": "assets/js/14.5c9d7f65.js",
    "revision": "65ada84bc8458e9bff1d6432f49fa02c"
  },
  {
    "url": "assets/js/15.82857edc.js",
    "revision": "2db32e73609b3c0aa0458be16d44a34c"
  },
  {
    "url": "assets/js/16.52fe471b.js",
    "revision": "b6b1f2a960cfc441cfed2a25a4147b8b"
  },
  {
    "url": "assets/js/17.869480a5.js",
    "revision": "1df5e628c44ad4b10d035ef0c154639d"
  },
  {
    "url": "assets/js/18.9e9fe5d7.js",
    "revision": "df51debb5d7bcb10a200bfcdf4ee65a6"
  },
  {
    "url": "assets/js/19.9f32b097.js",
    "revision": "ac6a8d1e18e2899ac1e3b1c2f3419b3f"
  },
  {
    "url": "assets/js/2.4628556c.js",
    "revision": "be92ac815eb7d57a5666926cc97d66d7"
  },
  {
    "url": "assets/js/20.4a0952de.js",
    "revision": "3f612cbc780d77ac5aa7c2fe23d397c2"
  },
  {
    "url": "assets/js/21.fecc800e.js",
    "revision": "b50d41e517f7ba2d75d312b4086606d8"
  },
  {
    "url": "assets/js/22.1d55dec4.js",
    "revision": "42607e82397d4cc46eb6b833e16b2673"
  },
  {
    "url": "assets/js/23.d8c15889.js",
    "revision": "1d4964d8584de5aa54c7ae34bc93074c"
  },
  {
    "url": "assets/js/24.7448df96.js",
    "revision": "a06fd812fc53fc25be6a9372c9e25f32"
  },
  {
    "url": "assets/js/25.acef6d98.js",
    "revision": "f1568cc5354c22cfa9858f3a27b26bb7"
  },
  {
    "url": "assets/js/26.57143942.js",
    "revision": "1752bfb459f15b5cd789fead0fb7efd1"
  },
  {
    "url": "assets/js/27.c3b46787.js",
    "revision": "d43b5acf4665cb654f337e5b584ec8e9"
  },
  {
    "url": "assets/js/28.a29aa994.js",
    "revision": "80b81a939e2bd189544317a778dbd1d2"
  },
  {
    "url": "assets/js/29.2bfec2fc.js",
    "revision": "c6f0cee8c35a8954d335c6ee27537adb"
  },
  {
    "url": "assets/js/30.8f76c0b5.js",
    "revision": "1ea2e2c23658509c2041601873bbcee4"
  },
  {
    "url": "assets/js/31.18c22883.js",
    "revision": "4b0a1781c1d6be3c8610f8c8cda1877a"
  },
  {
    "url": "assets/js/32.dd924d0f.js",
    "revision": "deeebd75f5bb5ab7ffeea5db40c4cfc2"
  },
  {
    "url": "assets/js/33.95090ded.js",
    "revision": "bec6be2dbd79c1546e8229bcf689d532"
  },
  {
    "url": "assets/js/34.35d7307d.js",
    "revision": "16217c98b5f94e63b518e46331f582ee"
  },
  {
    "url": "assets/js/35.18ff6d4d.js",
    "revision": "2c43a4ce5dd3a84d730659158301bee8"
  },
  {
    "url": "assets/js/36.4f005d02.js",
    "revision": "0a6cb43360f563bc0dbe30c94280f4f4"
  },
  {
    "url": "assets/js/37.7b9f7399.js",
    "revision": "1fd7414f4beee66f3b78f8a090f80207"
  },
  {
    "url": "assets/js/38.6fb61536.js",
    "revision": "5eb4e44f3bc879222c1bfac998ccd0be"
  },
  {
    "url": "assets/js/39.61d346d9.js",
    "revision": "33587b5fdbf89c87998b2a197943e418"
  },
  {
    "url": "assets/js/4.c92ef278.js",
    "revision": "950ae2cd77de1d4f335c2e355430a884"
  },
  {
    "url": "assets/js/40.ee6ffd64.js",
    "revision": "639dedc2ada761e4360167bc61f3e42c"
  },
  {
    "url": "assets/js/41.8fb5aa78.js",
    "revision": "1f6c11eea6009e98a9c6847171d00897"
  },
  {
    "url": "assets/js/42.4ff09188.js",
    "revision": "594bfd1f2194574723763b08c496c435"
  },
  {
    "url": "assets/js/43.fd03c932.js",
    "revision": "c98e1a0925fb82e41aece815bc2db6dc"
  },
  {
    "url": "assets/js/44.41583645.js",
    "revision": "cf39472b0fe28580ac31db83d5778971"
  },
  {
    "url": "assets/js/45.83867678.js",
    "revision": "322e579a13fa3d8b39555a9de278fdcd"
  },
  {
    "url": "assets/js/46.a640185d.js",
    "revision": "863796f6917fb1f1ea4457faf5cc9999"
  },
  {
    "url": "assets/js/47.1fb61b28.js",
    "revision": "6d0dc127ec91b13483a13a9c5651f507"
  },
  {
    "url": "assets/js/48.da86823f.js",
    "revision": "60088f72f58d852bc0b21f1f6fa853d6"
  },
  {
    "url": "assets/js/49.93cb4886.js",
    "revision": "b7d9132fc0701c4b8e4a173d65cc6e53"
  },
  {
    "url": "assets/js/5.bf1c74e8.js",
    "revision": "2d0d70cbbe49781b6701fb481f245349"
  },
  {
    "url": "assets/js/50.e70a3ad5.js",
    "revision": "5c75f8afccaf1803d17076ca60d34beb"
  },
  {
    "url": "assets/js/51.e2096b24.js",
    "revision": "720912f7f0666a03afdc91d5972d0419"
  },
  {
    "url": "assets/js/52.c27aca6f.js",
    "revision": "bf65bc99b8065abfc674b1bce56a737f"
  },
  {
    "url": "assets/js/53.72d91aba.js",
    "revision": "9f7d3a6390814e56e5ea0ebe042951bb"
  },
  {
    "url": "assets/js/54.d4df5932.js",
    "revision": "2768e553ac370f1e7aa9e8ea766b22d3"
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
    "url": "assets/js/app.d0b9e502.js",
    "revision": "dea8de77da4da8082b65bf4b4401f2b9"
  },
  {
    "url": "avatar.jpg",
    "revision": "6f3b22e2bc46301092b0814d9d4dc72b"
  },
  {
    "url": "blog/关于此博客.html",
    "revision": "b1ba43f771675cb841a00022e4d95e2f"
  },
  {
    "url": "categories/Blog/index.html",
    "revision": "d9cf73656a3e50f293ed9b85ee6d740d"
  },
  {
    "url": "categories/CSS/index.html",
    "revision": "5a5f4f8b4623a25344653f8597e8cabc"
  },
  {
    "url": "categories/HTML/CSS/index.html",
    "revision": "9a46778d8bcc29272ef73ff35ca92a0b"
  },
  {
    "url": "categories/index.html",
    "revision": "541e11c6b5a51bb71cb766980317ad15"
  },
  {
    "url": "categories/JavaScript/index.html",
    "revision": "d28540c3178e99f86e56af6b9cebbda8"
  },
  {
    "url": "categories/JavaScript/page/2/index.html",
    "revision": "40a5b95d1c9b1f8a7c66305cf56751eb"
  },
  {
    "url": "categories/LeetCode/index.html",
    "revision": "7aa6ff1ec28bee3daa0a2c1f4c4a9148"
  },
  {
    "url": "categories/Nest/index.html",
    "revision": "de471a024c3caab8bb9cd09ca7a97662"
  },
  {
    "url": "categories/Node/index.html",
    "revision": "9bdd93a5ba1e999bd4c0845abbc6bc82"
  },
  {
    "url": "categories/performance/index.html",
    "revision": "bd930a4ac7da4e58a878039d4ee0d67d"
  },
  {
    "url": "categories/React/index.html",
    "revision": "5389dcc7069904cde5e7080cb9506942"
  },
  {
    "url": "categories/SoftWare/index.html",
    "revision": "36c56abc9d0a994f6cc532d922b7015a"
  },
  {
    "url": "categories/TypeScript/index.html",
    "revision": "6fb0a9e6c6c68de827c6a0a122235042"
  },
  {
    "url": "categories/Vue/index.html",
    "revision": "4912c85b01352be352c11f6ab13ad4b9"
  },
  {
    "url": "categories/代码优化/index.html",
    "revision": "76a15b85a6673453b4f3a8d307b35ca0"
  },
  {
    "url": "categories/团队协作/index.html",
    "revision": "fa17ba55bd1b9d063b53c9347f4972a2"
  },
  {
    "url": "categories/面试/index.html",
    "revision": "363aec7e447a8c47291ba726bf9e6050"
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
    "revision": "2d048608dba91194e89c0a4937944aef"
  },
  {
    "url": "js/disable-user-zoom.js",
    "revision": "4680bfe617977eaf44721b98aa919a90"
  },
  {
    "url": "leetcode/01.两数之和-类型体操版本.html",
    "revision": "3cc0a41f0b05df94830958bab8a3dfff"
  },
  {
    "url": "leetcode/120.三角形最小路径和.html",
    "revision": "38380a7a7c6f3d7e69725c78d82e893e"
  },
  {
    "url": "listen.png",
    "revision": "6f316dbcb3053f98cf7d9cf1f8c578a4"
  },
  {
    "url": "notes/backEnd/Node的CPU过载保护机制.html",
    "revision": "8b5feb787a39a64d79c7959dfb0fd5f7"
  },
  {
    "url": "notes/backEnd/Node的IO机制.html",
    "revision": "7c54c684233861bf87097c8248f36ad8"
  },
  {
    "url": "notes/backEnd/影响Node的性能因素.html",
    "revision": "a4912306444afcdf767c1ce66e3d9add"
  },
  {
    "url": "notes/front-end-promotion/web性能优化.html",
    "revision": "c0f500a17dc9cedb449222284e6591ab"
  },
  {
    "url": "notes/front-end-promotion/如何优雅的解耦if-else.html",
    "revision": "da61f1770574ee23f1e0b77cc3533566"
  },
  {
    "url": "notes/frontEnd/CSS-Flex.html",
    "revision": "575c699289092c299e6beefce253f9eb"
  },
  {
    "url": "notes/frontEnd/CSS知识点.html",
    "revision": "41b8eb89643f4075c86f6823f3d104c1"
  },
  {
    "url": "notes/frontEnd/ES6知识点.html",
    "revision": "d42b91605b8755bcdca7ec1744b97246"
  },
  {
    "url": "notes/frontEnd/HTML常见问题.html",
    "revision": "570f3a07bce6a9adc5ec9068844f0488"
  },
  {
    "url": "notes/frontEnd/JS与DOM坐标计算有关的操作属性.html",
    "revision": "76f914f226799a0f3708d9ea31b69837"
  },
  {
    "url": "notes/frontEnd/JS事件.html",
    "revision": "a7b69a54f9923dd82ac6f31985343076"
  },
  {
    "url": "notes/frontEnd/JS作用域与执行上下文.html",
    "revision": "45f91a9680d4cf52ddfbc8e439cb79bf"
  },
  {
    "url": "notes/frontEnd/JS函数.html",
    "revision": "22447eeac2dd3985024669d4964da1d8"
  },
  {
    "url": "notes/frontEnd/JS原型与原型链.html",
    "revision": "a36fac0256e96737564fde5132552500"
  },
  {
    "url": "notes/frontEnd/JS异步任务与事件循环.html",
    "revision": "ce187a9fbfd9f29cfb71eb936da4458f"
  },
  {
    "url": "notes/frontEnd/JS浏览器BOM对象.html",
    "revision": "ed81db934d9c162c60dcd73600bc4d14"
  },
  {
    "url": "notes/frontEnd/JS类型与常用类型判断.html",
    "revision": "50b16146cec58e411897bdfd74b2832e"
  },
  {
    "url": "notes/frontEnd/JS类型转换.html",
    "revision": "566338522c649beb25a9a37f5caeb523"
  },
  {
    "url": "notes/frontEnd/JS线程机制与事件机制.html",
    "revision": "f45acaca5dde5505b4d4178e27c4b9d6"
  },
  {
    "url": "notes/frontEnd/JS闭包.html",
    "revision": "3991507cf74d1872be46e06057201a68"
  },
  {
    "url": "notes/frontEnd/JS面向对象之对象创建模式.html",
    "revision": "5d06b9602a6ba58a060ce876cd1bd208"
  },
  {
    "url": "notes/frontEnd/一些有趣的JS工具类方法.html",
    "revision": "e61af24782d82fe245c81375daacecfc"
  },
  {
    "url": "notes/index.html",
    "revision": "4f418e92c47048ce6864f787acc6d985"
  },
  {
    "url": "notes/interview/手撕系列.html",
    "revision": "fed2e90913430809fd26411d0eae05b7"
  },
  {
    "url": "notes/interview/数组转对象.html",
    "revision": "42e33328144a4b860e18a7ca1011a712"
  },
  {
    "url": "server/Nest入门.html",
    "revision": "52e6f5b744282c5b1121277c5d524b50"
  },
  {
    "url": "server/Nest其他相关.html",
    "revision": "36ff1ae606c5c41cad4070a913bbe69d"
  },
  {
    "url": "server/Nest登录认证.html",
    "revision": "423153bcf984fcd47f5d7a1658faf4d3"
  },
  {
    "url": "software/精品软件推荐.html",
    "revision": "5d95ba735cd8310c9114119e6f55605f"
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
    "revision": "55e7b17f603006819e0afdff8346701e"
  },
  {
    "url": "tag/CSS/index.html",
    "revision": "998a185426d75122e239cfd381b2ea4e"
  },
  {
    "url": "tag/ES6/index.html",
    "revision": "829626806661c675fd7b7959cb3466e6"
  },
  {
    "url": "tag/Flex/index.html",
    "revision": "542a3826df80300f9454d902d412a8b8"
  },
  {
    "url": "tag/Git/index.html",
    "revision": "befc299d0a11470fcba224cbccdde261"
  },
  {
    "url": "tag/Github/index.html",
    "revision": "e530aec4e2cae01b660186dbcb1e80f7"
  },
  {
    "url": "tag/Html/Css/index.html",
    "revision": "3cfb4ea0e195ca8be9e7519e9bd92734"
  },
  {
    "url": "tag/I/O/index.html",
    "revision": "03f72fcd372766bbc1aa7823e7687d41"
  },
  {
    "url": "tag/index.html",
    "revision": "8eb1337cfd448665744a502ea75e1cce"
  },
  {
    "url": "tag/JavaScript/index.html",
    "revision": "947a38b9f1906214b8daba5a1dcc8aa0"
  },
  {
    "url": "tag/JavaScript/page/2/index.html",
    "revision": "021bf999909bc9104cd10bb9047ff52a"
  },
  {
    "url": "tag/LeetCode/index.html",
    "revision": "326e2aabf3f84d2c97cff43b019cc873"
  },
  {
    "url": "tag/Lifecycle/index.html",
    "revision": "2701a21c157ab2283f8f51bd6ff81955"
  },
  {
    "url": "tag/Nest/index.html",
    "revision": "0fe657b6873d0f8c628d241eb15fa972"
  },
  {
    "url": "tag/Node/index.html",
    "revision": "ed2bc571b0d88192d995322987969280"
  },
  {
    "url": "tag/NPM/index.html",
    "revision": "820324fe59ab7262dccfdcb3a1e404cc"
  },
  {
    "url": "tag/React/index.html",
    "revision": "886df1ef1741b0a296de2ec812e0378e"
  },
  {
    "url": "tag/SoftWare/index.html",
    "revision": "fe053ec21cc026eeb676e0976e36688e"
  },
  {
    "url": "tag/TypeScript/index.html",
    "revision": "3051aa107f4e2a1303dad06cbac4f742"
  },
  {
    "url": "tag/TypeScript类型体操/index.html",
    "revision": "6be131b3c2a0760e1f242603b01948e5"
  },
  {
    "url": "tag/Vue/index.html",
    "revision": "817d351aa47e128274bc841b429a64b8"
  },
  {
    "url": "tag/Vuepress/index.html",
    "revision": "6c52e8090e00d50c4c8b2e8eda241d5f"
  },
  {
    "url": "tag/web/index.html",
    "revision": "1e18e409c0fb4101afd7989213b2677d"
  },
  {
    "url": "tag/函数式编程/index.html",
    "revision": "c740f3855428dcae004881f0e8823a52"
  },
  {
    "url": "tag/性能/index.html",
    "revision": "50ee03c2d996cd693bb4f7fcbe0c5151"
  },
  {
    "url": "tag/性能优化/index.html",
    "revision": "8685c2b779c43ead400f67091c42d1d8"
  },
  {
    "url": "tag/登录认证/index.html",
    "revision": "3920436ba0fc78b7abcad328f897a39e"
  },
  {
    "url": "tag/算法/index.html",
    "revision": "4d0ca05a94d1e5dcd2853c25d58d0c40"
  },
  {
    "url": "tag/设计模式/index.html",
    "revision": "78937229462d79f9bd84f544b66390e9"
  },
  {
    "url": "tag/过载保护/index.html",
    "revision": "2d4e3f89b617fea28f9f47fb5443778c"
  },
  {
    "url": "tag/面试/index.html",
    "revision": "a230838219c447e3684f7b69aa799d83"
  },
  {
    "url": "team/git-rebase和git-merge区别.html",
    "revision": "c739abf8e1e201b0ca5d19d30ef5b1df"
  },
  {
    "url": "team/github.html",
    "revision": "bcfc1b96d2b72add23cf21b2ead6308a"
  },
  {
    "url": "timeline/index.html",
    "revision": "3ea11500b0149b082a74684d52e7cca7"
  },
  {
    "url": "web/TypeScript知识点.html",
    "revision": "f76f46fdee0179f1bd3ea9e1a4c635ad"
  },
  {
    "url": "web/Vue与React各个生命周期.html",
    "revision": "284b78b7fad3abc8df3919119689c6af"
  },
  {
    "url": "web/前端一些常用的npm库.html",
    "revision": "8090182a6e5631105147e7870157b736"
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
