const plugins = require('./config/plugins.js')
const themeConfig = require('./config/theme')
// const nPath = require('path')

module.exports = {
  // 简体中文
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  title: '别来无恙',
  description: '一枚小前端，专注于分享我的所见所闻',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    //增加manifest.json
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'meta', // 移动端禁止用户缩放
      {
        name: 'viewport',
        content:
          'width=device-width,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
    ],
    ['link', { rel: 'stylesheet', href: '/css/style.css' }], //
    ['script', { charset: 'utf-8', src: '/js/disable-user-zoom.js' }], // 移动端,禁止用户缩放,引入你写的js
  ],
  theme: 'reco',
  themeConfig,
  plugins,
}
