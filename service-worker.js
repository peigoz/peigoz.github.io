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
    "revision": "5aa1282a316eb0eaa02924e380725c12"
  },
  {
    "url": "assets/css/0.styles.bf99bb7a.css",
    "revision": "9ca145db5aabbc023f39860b1f61f742"
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
    "url": "assets/js/1.5a3c4300.js",
    "revision": "133c38dc5c70f5f1b17c036ff42742da"
  },
  {
    "url": "assets/js/10.9d40a8fb.js",
    "revision": "5b217cd9b1d0e5af9bb36acbff9705a4"
  },
  {
    "url": "assets/js/11.8cb2e2fc.js",
    "revision": "be36d1ef90c8905c8b7cca1c4bee09f0"
  },
  {
    "url": "assets/js/12.0092494e.js",
    "revision": "3f75481ecc9a40e549952d0f09583b53"
  },
  {
    "url": "assets/js/13.57bb5b02.js",
    "revision": "745f5cf7a8bd4137542621a5a99df7a5"
  },
  {
    "url": "assets/js/14.0ce397d1.js",
    "revision": "b01c7e08ac962b8c2c0eda1c81296cd5"
  },
  {
    "url": "assets/js/15.fc4e5e78.js",
    "revision": "c24806ff0d3010052eac6041e28342fa"
  },
  {
    "url": "assets/js/16.95b8859f.js",
    "revision": "a8dd273d3734ffe66caf3073a8838a0a"
  },
  {
    "url": "assets/js/17.9a8539d0.js",
    "revision": "893b40353eaf2e6eeb89475a83cc813e"
  },
  {
    "url": "assets/js/18.9b96ee42.js",
    "revision": "9ba2f433893bbb9beb8c6baae612e325"
  },
  {
    "url": "assets/js/19.3243748f.js",
    "revision": "7b124ab4993809162d423dd0006e3c3c"
  },
  {
    "url": "assets/js/2.c44fe0ac.js",
    "revision": "fbf70c690b4bb6128979bc8217b8335f"
  },
  {
    "url": "assets/js/20.f376347a.js",
    "revision": "14541813309b24f4bf33d781977f36d3"
  },
  {
    "url": "assets/js/21.e9b80c88.js",
    "revision": "6fe0943ca3b6daf1545a395ecfb4669b"
  },
  {
    "url": "assets/js/22.2308d53d.js",
    "revision": "934a5e4408bc6303f65639e6f7057765"
  },
  {
    "url": "assets/js/23.0dbc7dff.js",
    "revision": "885f5c7eb7fc2c945a589cd2296d0b78"
  },
  {
    "url": "assets/js/24.69596285.js",
    "revision": "2cf508c95045b5e6b75653d596578873"
  },
  {
    "url": "assets/js/25.0fcc1bc3.js",
    "revision": "0861fe502e71dd583bbc1cad9d6b91dd"
  },
  {
    "url": "assets/js/26.56e07ae6.js",
    "revision": "e6b985721a75ab6d1ae060c60656b432"
  },
  {
    "url": "assets/js/27.923217a4.js",
    "revision": "8ec4441defbeb870ad6e512e80c5733b"
  },
  {
    "url": "assets/js/28.cf5198eb.js",
    "revision": "48fa43036bd7e07d2a0f4e8725e9d27b"
  },
  {
    "url": "assets/js/29.58fb11f5.js",
    "revision": "7cf7b8554a4bfb8c768113eb17342335"
  },
  {
    "url": "assets/js/3.7e09364a.js",
    "revision": "74847a26042c7276d0d902dd6aa11095"
  },
  {
    "url": "assets/js/30.f33dcffd.js",
    "revision": "5fff992b782a3a9cc90b2fd01f966086"
  },
  {
    "url": "assets/js/31.2ceab4e5.js",
    "revision": "bf07cd09119d28b19b94034749565088"
  },
  {
    "url": "assets/js/32.6469c073.js",
    "revision": "2e3392c316888b0ea3d1575705c4eb0d"
  },
  {
    "url": "assets/js/33.ebb79316.js",
    "revision": "fd29d33f048f830f14b6d1ba9b5b6a28"
  },
  {
    "url": "assets/js/34.3956a6a6.js",
    "revision": "e42fb6e871ba69285fe831480807eb77"
  },
  {
    "url": "assets/js/35.0ab27a6d.js",
    "revision": "3b3e3ea5d2355cfac1fe3cc02c87a7f5"
  },
  {
    "url": "assets/js/36.e66cd0d4.js",
    "revision": "4179c959b074e1d0d5d6a5ebaf699783"
  },
  {
    "url": "assets/js/37.ba9aebff.js",
    "revision": "8521e05ca610ea0a75a7658253aac52b"
  },
  {
    "url": "assets/js/38.5a804c2f.js",
    "revision": "4d2cfa5191840f147d1f5a9bda178310"
  },
  {
    "url": "assets/js/39.b738a459.js",
    "revision": "e9a100f5ba57ee102c2dec781ddbf405"
  },
  {
    "url": "assets/js/40.9d3ae7e2.js",
    "revision": "7eba896e65cdb6ef190fedac4bd35f05"
  },
  {
    "url": "assets/js/41.f3f8ae14.js",
    "revision": "fff519eeb773880bb4f97b53da29315b"
  },
  {
    "url": "assets/js/42.c955a9d5.js",
    "revision": "3b792e32014ade6c0e326ce8fb319103"
  },
  {
    "url": "assets/js/43.6c0e0661.js",
    "revision": "c392b53e053cd25dce974a6e43e1bc68"
  },
  {
    "url": "assets/js/44.dcadf561.js",
    "revision": "73cb9b35371ff4f06908557cacc73825"
  },
  {
    "url": "assets/js/45.5ce2ab27.js",
    "revision": "ce4a0356995591cfdd6f52835bc6c858"
  },
  {
    "url": "assets/js/46.c6dfd9e1.js",
    "revision": "7eb2fbb851de368e8e48f30457b1d37d"
  },
  {
    "url": "assets/js/47.512695b7.js",
    "revision": "96495a3e78d62206122e3cb5f07963d2"
  },
  {
    "url": "assets/js/48.c6178ee7.js",
    "revision": "823b63e2046ad57cce966c017c081d1c"
  },
  {
    "url": "assets/js/49.11dbd86d.js",
    "revision": "b793d55b18b43047243c4be92b39e273"
  },
  {
    "url": "assets/js/5.3ce188ae.js",
    "revision": "c4dcba5f0d3f74940f0b6543ae2077ea"
  },
  {
    "url": "assets/js/50.f45f94fe.js",
    "revision": "3b126a5157688f58e348c8a8bf84881f"
  },
  {
    "url": "assets/js/51.ec8cfe25.js",
    "revision": "c4ea09cd88a10ced00f2b2b04798f64b"
  },
  {
    "url": "assets/js/52.df923090.js",
    "revision": "05bb3d4b38d76045e1a52b6f40c94354"
  },
  {
    "url": "assets/js/53.83838fe9.js",
    "revision": "08bf665f9ff1d8160f66ebc79f502310"
  },
  {
    "url": "assets/js/54.a0abdd08.js",
    "revision": "657ed2367f85e4903cddffb868d96b32"
  },
  {
    "url": "assets/js/55.53c28132.js",
    "revision": "a8a8f81b8b35172f3537a30c35d5597d"
  },
  {
    "url": "assets/js/56.ce9ddadf.js",
    "revision": "a4d02dce0be063cfe5e29d673ec8395f"
  },
  {
    "url": "assets/js/57.7f705527.js",
    "revision": "c36029247d9bc1aa042d0a309490f262"
  },
  {
    "url": "assets/js/58.1a25e9e7.js",
    "revision": "3647177d0fffd93d4f9557396a59477f"
  },
  {
    "url": "assets/js/59.b53013a6.js",
    "revision": "9e91feb582c5a76f3aba9dfc1df3a936"
  },
  {
    "url": "assets/js/6.f266f7c8.js",
    "revision": "1fa6a09fefc3f048cc186660f704a5ba"
  },
  {
    "url": "assets/js/60.7f1b6b67.js",
    "revision": "1a74493b5cccbf57e72379501ec4f2d3"
  },
  {
    "url": "assets/js/7.9bdfd8d2.js",
    "revision": "b8ab513c18cd98643e30670780111214"
  },
  {
    "url": "assets/js/8.1b5653b1.js",
    "revision": "b3929364ff646cce162a9cfdd835f723"
  },
  {
    "url": "assets/js/9.6a21c626.js",
    "revision": "3c7ff7b5fc17507166246d878a0cd58d"
  },
  {
    "url": "assets/js/app.95b02471.js",
    "revision": "d18cbb4d871110822d6f187c8aed40e0"
  },
  {
    "url": "avatar.jpg",
    "revision": "6f3b22e2bc46301092b0814d9d4dc72b"
  },
  {
    "url": "blog/关于此博客.html",
    "revision": "3d2925ef3128e3faeb8ff9e51ded436f"
  },
  {
    "url": "categories/Blog/index.html",
    "revision": "6ba157d523342aae9f702bcd8e7169cc"
  },
  {
    "url": "categories/CSS/index.html",
    "revision": "0de08a24161966a608107bc7ef725d2a"
  },
  {
    "url": "categories/HTML/CSS/index.html",
    "revision": "5df9275aec25fb8ffd72e966b96a5fdc"
  },
  {
    "url": "categories/index.html",
    "revision": "74cd3974923889b76134083476297165"
  },
  {
    "url": "categories/JavaScript/index.html",
    "revision": "d8917d11250efa745e8f5bdb9ce41069"
  },
  {
    "url": "categories/JavaScript/page/2/index.html",
    "revision": "342a2f0fea95f84cfece46616ad429e1"
  },
  {
    "url": "categories/LeetCode/index.html",
    "revision": "842aec91ced35271e98e66676389c350"
  },
  {
    "url": "categories/Nest/index.html",
    "revision": "03683872ce1f1f1afb3072042c49d3be"
  },
  {
    "url": "categories/Node/index.html",
    "revision": "50b15ac8e883440ed30a568a78480937"
  },
  {
    "url": "categories/performance/index.html",
    "revision": "26b01d8c91008f8e139373d6e8c55769"
  },
  {
    "url": "categories/React/index.html",
    "revision": "3bb176f698d6e6cd61b940cacf6bfd1f"
  },
  {
    "url": "categories/SoftWare/index.html",
    "revision": "3ee86e1f861d4cc18ae1beac90b90f08"
  },
  {
    "url": "categories/TypeScript/index.html",
    "revision": "b0488694dc4838f1ac5508fe1cac682a"
  },
  {
    "url": "categories/Vue/index.html",
    "revision": "5a23c60e37606a1dc252594a3f9803dc"
  },
  {
    "url": "categories/代码优化/index.html",
    "revision": "7026393615206deb4f792576bedabb94"
  },
  {
    "url": "categories/团队协作/index.html",
    "revision": "5f92264b27538663df494db7c2930c15"
  },
  {
    "url": "categories/面试/index.html",
    "revision": "9edb679dec7738ce970b82e0df0c504e"
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
    "revision": "cfc7028e9b03fb56908460f3b78d64e1"
  },
  {
    "url": "js/disable-user-zoom.js",
    "revision": "4680bfe617977eaf44721b98aa919a90"
  },
  {
    "url": "leetcode/01.两数之和-类型体操版本.html",
    "revision": "6dea13c29336ee6e0fa9ab02db7efc52"
  },
  {
    "url": "leetcode/120.三角形最小路径和.html",
    "revision": "3001dc9f371be2e8077489b674fb77bf"
  },
  {
    "url": "listen.png",
    "revision": "6f316dbcb3053f98cf7d9cf1f8c578a4"
  },
  {
    "url": "notes/backEnd/Node的CPU过载保护机制.html",
    "revision": "1e350dbbf8626da3b9561713c1179d69"
  },
  {
    "url": "notes/backEnd/Node的IO机制.html",
    "revision": "1fd8f11394aec993abba985165a7edb8"
  },
  {
    "url": "notes/backEnd/影响Node的性能因素.html",
    "revision": "3b029558c2d1743478bcd18265c8e3c5"
  },
  {
    "url": "notes/front-end-promotion/web性能优化.html",
    "revision": "858c85590ff8c04200224faf58d9f1c5"
  },
  {
    "url": "notes/front-end-promotion/关于Koa中间件底层原理简单实现.html",
    "revision": "1640fcbb6ddf66629bd4489fdec959dd"
  },
  {
    "url": "notes/front-end-promotion/如何优雅的解耦if-else.html",
    "revision": "b8d7d8bd71b909287e1bad1b7f690d91"
  },
  {
    "url": "notes/frontEnd/CSS-Flex.html",
    "revision": "1b9187cef11e14c7c34107befad21166"
  },
  {
    "url": "notes/frontEnd/CSS知识点.html",
    "revision": "caa0ac8a746b61d661f0a8acc8fc3608"
  },
  {
    "url": "notes/frontEnd/ES6知识点.html",
    "revision": "e6ff1bb36dc54149ace47e8f892e352c"
  },
  {
    "url": "notes/frontEnd/HTML常见问题.html",
    "revision": "97daf33aefa04b22c3687a36951cba79"
  },
  {
    "url": "notes/frontEnd/JS与DOM坐标计算有关的操作属性.html",
    "revision": "d22d7cba6000a2866a8a1ff05f8ac3a8"
  },
  {
    "url": "notes/frontEnd/JS事件.html",
    "revision": "53c0dd638301c7f599cb4fd8fd6b84a0"
  },
  {
    "url": "notes/frontEnd/JS作用域与执行上下文.html",
    "revision": "3ec40faf996633d6580eb4940e8d43e1"
  },
  {
    "url": "notes/frontEnd/JS函数.html",
    "revision": "056b01df10e37668edacbfa3186ba72a"
  },
  {
    "url": "notes/frontEnd/JS原型与原型链.html",
    "revision": "710162dcf3a3ee776b218597dd64bf67"
  },
  {
    "url": "notes/frontEnd/JS异步任务与事件循环.html",
    "revision": "bf01c355bb84b23de28f46ff65ff3feb"
  },
  {
    "url": "notes/frontEnd/JS浏览器BOM对象.html",
    "revision": "2d4a39bb46da4e6389e9aea81e2795c8"
  },
  {
    "url": "notes/frontEnd/JS类型与常用类型判断.html",
    "revision": "b2934720d4d247b0d94e2bd896587d78"
  },
  {
    "url": "notes/frontEnd/JS类型转换.html",
    "revision": "e89a8403f43914e4f26c6a6813efbc84"
  },
  {
    "url": "notes/frontEnd/JS线程机制与事件机制.html",
    "revision": "51177836f2475aace9cb1d11090f0ffb"
  },
  {
    "url": "notes/frontEnd/JS闭包.html",
    "revision": "b9d0cdb3169c0b869cf49f8f04efa5c6"
  },
  {
    "url": "notes/frontEnd/JS面向对象之对象创建模式.html",
    "revision": "07b8ad65464f29349a5b5e90ff29d5a5"
  },
  {
    "url": "notes/frontEnd/一些有趣的JS工具类方法.html",
    "revision": "8ab6f7d93bca945f51631ea3412d38dc"
  },
  {
    "url": "notes/index.html",
    "revision": "fbed7b0f8f568d31e5267e12cd370bee"
  },
  {
    "url": "notes/interview/手撕系列.html",
    "revision": "47188c0ef51e8a3689a166f034edf112"
  },
  {
    "url": "notes/interview/数组转对象.html",
    "revision": "c973bc59edac60b924d0f4a32e464c62"
  },
  {
    "url": "server/Nest入门.html",
    "revision": "26dbbad78ecb98854327ec069d044929"
  },
  {
    "url": "server/Nest其他相关.html",
    "revision": "9f37dda88398fde32cb82fa2d627b9e9"
  },
  {
    "url": "server/Nest登录认证.html",
    "revision": "824f966df7a893c305047e861059ea2e"
  },
  {
    "url": "software/精品软件推荐.html",
    "revision": "24163419f9a76c700c90a988b3df4464"
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
    "revision": "2cbdc797281707d5bfe3fe3a51fe1716"
  },
  {
    "url": "tag/CSS/index.html",
    "revision": "9d2c0b82bcc2c861128939b904879917"
  },
  {
    "url": "tag/ES6/index.html",
    "revision": "1bbf0eb66e19a6e113931bc77cdbe13e"
  },
  {
    "url": "tag/Flex/index.html",
    "revision": "4b3b6896e3ee9bc0236405f13debedbc"
  },
  {
    "url": "tag/Git/index.html",
    "revision": "9148d138c9dd52919ecd9d9bfcb81640"
  },
  {
    "url": "tag/Github/index.html",
    "revision": "ce99256b4403c5db826697d9c485e6b7"
  },
  {
    "url": "tag/Html/Css/index.html",
    "revision": "b9500e46e47314158d2fa2821923d44d"
  },
  {
    "url": "tag/I/O/index.html",
    "revision": "44c59391b070bd2f0335858b959557b8"
  },
  {
    "url": "tag/index.html",
    "revision": "bde043a4bf33377a1bd2794d688bbf35"
  },
  {
    "url": "tag/JavaScript/index.html",
    "revision": "de5203f94100dafb3a64d4972b994af9"
  },
  {
    "url": "tag/JavaScript/page/2/index.html",
    "revision": "092d4db9eb5fc04b4a778ab702696712"
  },
  {
    "url": "tag/LeetCode/index.html",
    "revision": "03710befdc3798d984bf01b583107771"
  },
  {
    "url": "tag/Lifecycle/index.html",
    "revision": "f694eb45c25a1dc78e79b397a0eb36be"
  },
  {
    "url": "tag/Nest/index.html",
    "revision": "e517992b33ed91931f5591e7368087ea"
  },
  {
    "url": "tag/Node/index.html",
    "revision": "5a4f2b94106a62ae5f242c1a808df8d7"
  },
  {
    "url": "tag/NPM/index.html",
    "revision": "1c13355bbb83249b8d8708749f1b305b"
  },
  {
    "url": "tag/React/index.html",
    "revision": "cdca46af37983e568779366d553fcaa9"
  },
  {
    "url": "tag/SoftWare/index.html",
    "revision": "74af5b417abd6c777eb25c344b9f8853"
  },
  {
    "url": "tag/TypeScript/index.html",
    "revision": "333ed0f6f7ea89b18b6b5d57ae76c93e"
  },
  {
    "url": "tag/TypeScript类型体操/index.html",
    "revision": "4fed641c7a51bb95e4348cf16e72097e"
  },
  {
    "url": "tag/Vue/index.html",
    "revision": "f1d4ada33e3271890528632117974958"
  },
  {
    "url": "tag/Vuepress/index.html",
    "revision": "881b9803a974c82f0f29679a0c666d7a"
  },
  {
    "url": "tag/web/index.html",
    "revision": "8555995d7f32be2224357ca043bf38eb"
  },
  {
    "url": "tag/函数式编程/index.html",
    "revision": "cf0b99349f7e71b208300671941a1493"
  },
  {
    "url": "tag/性能/index.html",
    "revision": "e63799878e0198bc2ed7f24b21436fc0"
  },
  {
    "url": "tag/性能优化/index.html",
    "revision": "86565e78fd0d4bd99da455b5a95a3460"
  },
  {
    "url": "tag/算法/index.html",
    "revision": "9b32655c633d594145d8fc500fe452e3"
  },
  {
    "url": "tag/设计模式/index.html",
    "revision": "88ae9de0809726fe0cb44c96d02337b0"
  },
  {
    "url": "tag/过载保护/index.html",
    "revision": "aef22c3c5eb82f2a99e5e2fd8b62a9cd"
  },
  {
    "url": "tag/面试/index.html",
    "revision": "cd302805367c96a483147df054fa9c39"
  },
  {
    "url": "team/git-rebase和git-merge区别.html",
    "revision": "60d00ee40513cd398955acee2a5f48f5"
  },
  {
    "url": "team/github.html",
    "revision": "f209f8e30ce7a2285d5d05ba8953f5be"
  },
  {
    "url": "team/工作中常见的Git命令.html",
    "revision": "48aaadd3525dbeb68ca1758663cad860"
  },
  {
    "url": "timeline/index.html",
    "revision": "47e22192ee3be17a20b2bcc2ed50a3c9"
  },
  {
    "url": "web/TS几个常用类型之间区别.html",
    "revision": "e7da0fd7e0e02474812e6a2d35e775fc"
  },
  {
    "url": "web/TS新版本类型体操的一些新特性.html",
    "revision": "fd08352d25f3ece40668d7955ed04607"
  },
  {
    "url": "web/TS类型体操中的一些特殊情况.html",
    "revision": "4edd01d25a2a94785008087df115915b"
  },
  {
    "url": "web/TypeScript知识点.html",
    "revision": "a8dbf6c89089ac80fed7408040f8fe1e"
  },
  {
    "url": "web/Vue与React各个生命周期.html",
    "revision": "00037fc0bb3ba288b7dad029e73c9d13"
  },
  {
    "url": "web/前端一些常用的npm库.html",
    "revision": "77b08e8eee177b9111e7e45f46fa15c3"
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
