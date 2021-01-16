// const sidebar = {
//   '/notes': [
//     { title: '关于', collapsable: false }],
//   '/notes/frontEnd': [
//     {
//       title: '前端',
//       collapsable: true,
//       children: ['/HTML常见问题', '/CSS知识点'],
//     },
//   ],
// }
// const sidebar = [
//   {
//     title: '关于',
//     path: '/notes/',
//     collapsable: false,
//   },
//   {
//     title: '前端',
//     collapsable: true,
//     children: ['/notes/frontEnd/HTML常见问题', '/notes/frontEnd/CSS知识点'],
//   },
// ]
const sidebar = {
  '/notes/': [
    {
      title: '关于',
      path: '/notes/',
      collapsable: false,
    },
    {
      title: '前端',
      collapsable: true,
      children: ['/notes/frontEnd/HTML常见问题', '/notes/frontEnd/CSS知识点','/notes/frontEnd/一些有趣的JS工具类方法'],
    },
  ],
}

module.exports = sidebar
