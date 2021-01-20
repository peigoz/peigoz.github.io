const nav = [
  { text: '主页', link: '/', icon: 'reco-home' },
  { text: '学习笔记', link: '/notes/', icon: 'icon-book iconfont' },
  {
    text: '课外分类',
    icon: 'reco-category',
    items: [
      { text: '博客', link: '/categories/Blog/', icon: 'reco-blog' },
      { text: '软件', link: '/categories/SoftWare/', icon: 'icon-yingyongruanjian iconfont' },
      // { text: '后端', link: '/categories/' },
      // { text: '团队协作', link: '/team/categories/' },
      // {text: '前端',items:[
      //   { text: 'Html-Css', link: '/categories/html-css/' }
      // ]},
      // {text: '团队协作',items:[
      //   { text: 'Git-Github', link: '/categories/git-github/' }q
      // ]}
    ],
  },
  { text: '标签', link: '/tag/', icon: 'reco-tag' },
  { text: '时间线', link: '/timeline/', icon: 'reco-date' },
  { text: '留言板', link: '/suggestion/', icon: 'reco-suggestion' },
]
module.exports = nav
