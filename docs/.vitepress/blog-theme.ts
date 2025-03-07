// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // markdown 图表支持（会增加一定的构建耗时）
  // mermaid: true
  comment: {
    type: 'giscus',
    options: {
      repo: 'peigoz/peigoz.github.io',
      repoId: 'MDEwOlJlcG9zaXRvcnkzMzAyMzI2NTQ=',
      category: 'Announcements',
      categoryId: 'DIC_kwDOE67zTs4Cge7H',
      inputPosition: 'top',
      loading: 'lazy'
    },
    mobileMinify: true
  },
  home: {
    analysis: {
      articles: {
        title: ['博客文章']
      }
    }
  },
  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    // copyright: 'MIT License | 粥里有勺糖',
    version: false,
    icpRecord: {
      name: '粤ICP备19037674号',
      link: 'https://beian.miit.gov.cn/'
    },
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: 'peigoz',

  // 友链
  friend: [
    // {
    //   nickname: '粥里有勺糖',
    //   des: '你的指尖用于改变世界的力量',
    //   avatar:
    //     'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
    //   url: 'https://sugarat.top',
    // },
    // {
    //   nickname: 'Vitepress',
    //   des: 'Vite & Vue Powered Static Site Generator',
    //   avatar:
    //     'https://vitepress.dev/vitepress-logo-large.webp',
    //   url: 'https://vitepress.dev/',
    // },
  ],

  // 公告
  // popover: {
  //   title: '公告',
  //   body: [
  //     {
  //       type: 'title',
  //       content: '如果你也喜欢前端',
  //       style: 'text-align: center;',
  //     },
  //     {
  //       type: 'title',
  //       content: '欢迎加入QQ交流群 🎉🎉🎉',
  //       style: 'text-align: center;',
  //     },
  //     {
  //       type: 'text',
  //       content: 'QQ 群 ：512250251',
  //       style: 'text-align: center;',
  //     },
  //   ],
  //   duration: 0,
  //   twinkle: false,
  // },
  recommend: false,
  buttonAfterArticle: {
    openTitle: '赞赏',
    closeTitle: '下次一定',
    content: '<img src="https://blog.peigo.top/peigo/qrcode-wechat.png">',
    icon: 'wechatPay'
  }
})

export { blogTheme }
