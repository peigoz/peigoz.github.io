const nav = [
  { text: '主页', link: '/', icon: 'reco-home' },
  { text: '学习笔记', link: '/notes/', icon: 'icon-book iconfont' },
  {
    text: '课外分类',
    icon: 'reco-category',
    items: [
      { text: '博客', link: '/categories/Blog/', icon: 'reco-blog' },
      { text: '软件', link: '/categories/SoftWare/', icon: 'icon-yingyongruanjian iconfont' },
      { text: 'LeetCode', link: '/categories/leetcode/', icon: 'reco-coding' },
    ],
  },
  { text: '标签', link: '/tag/', icon: 'reco-tag' },
  { text: '时间线', link: '/timeline/', icon: 'reco-date' },
  { text: '留言板', link: '/suggestion/', icon: 'reco-suggestion' },
]
module.exports = nav
