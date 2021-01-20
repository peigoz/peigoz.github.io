const nav = require('./nav.js')
const sidebar = require('./sidebar.js')

const themeConfig = {
  type: 'blog',
  logo: '/listen.png',
  author: 'peigo',
  authorAvatar: '/avatar.jpg',
  record: '粤ICP备19037674号',
  recordLink: 'https://beian.miit.gov.cn',
  startYear: '2020',
  smoothScroll: true,
  // 博客配置
  blogConfig: {
    socialLinks: [
      // 信息栏展示社交信息
      { icon: 'reco-github', link: 'https://github.com/candane' },
      { icon: 'reco-mayun', link: 'https://gitee.com/candane' },
      { icon: 'reco-mail', link: 'mailto:candane@126.com' },
    ],
  },
  nav,
  sidebar,
  subSidebar: 'auto',
  valineConfig: {
    appId: 's9fDsrgzx2t0wP1PHUDdyBXJ-gzGzoHsz',
    appKey: 'RjWWOTBfXBzeHmgGy4rXelWv',
  },
  // 最后更新时间
  lastUpdated: '最后更新时间',
  activeHeaderLinks: false,
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  sidebarDepth: 2,
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'],
  },
}
module.exports = themeConfig
