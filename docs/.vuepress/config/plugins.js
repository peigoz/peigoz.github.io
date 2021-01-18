const plugins = [
  [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: {
        message: '发现新内容可用',
        buttonText: '刷新',
      },
    },
  ],
  ['@vuepress-reco/extract-code'],
  [
    'vuepress-plugin-nuggets-style-copy',
    {
      copyText: 'Copy',
      tip: {
        content: '复制成功!',
      },
    },
  ],
  [
    //先安装在配置， npm install @vuepress-plugin-meting --save
    'meting',
    {
      metingApi: 'https://api.i-meto.com/meting/api',
      meting: {
        server: 'netease',
        type: 'playlist',
        mid: '5463601707',
      }, // 不配置该项的话不会出现全局播放器
      aplayer: {
        lrcType: 3,
        mini: true,
        theme: '#03a6ff',
      },
      mobile: {
        lrc: false,
      },
    },
  ],
  [
    'ribbon-animation',
    {
      size: 90, // 默认数据
      opacity: 0.3, //  透明度
      zIndex: -1, //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: '80%',
        // 色带HSL亮度量
        colorBrightness: '60%',
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: 'center',
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true,
      },
      ribbonShow: false, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true, // 滑动彩带
    },
  ],
  [
    '@vuepress/blog',
    {
      sitemap: {
        hostname: 'https://www.peigp.top',
      },
    },
  ],
  [
    'vuepress-plugin-sponsor',
    {
      theme: 'simple',
      //alipay: '/sponsor-qrcode/qrcode-alipay.png',
      wechat: '/sponsor-qrcode/qrcode-wechat.png',
      //qq: '/sponsor-qrcode/qrcode-qq.png',
      //paypal: 'https://www.paypal.me/yokefellow',
      duration: 2000,
    },
  ],
]

module.exports = plugins
