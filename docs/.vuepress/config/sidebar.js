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
      children: [
        '/notes/frontEnd/HTML常见问题',
        '/notes/frontEnd/CSS知识点',
        '/notes/frontEnd/JS类型转换',
        '/notes/frontEnd/JS类型与常用类型判断',
        '/notes/frontEnd/JS事件',
        '/notes/frontEnd/JS与DOM坐标计算有关的操作属性',
        '/notes/frontEnd/一些有趣的JS工具类方法',
      ],
    },
  ],
}

module.exports = sidebar
