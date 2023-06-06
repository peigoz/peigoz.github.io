// const sidebar = {
//   '/notes': [
//     { title: '关于', collapsable: false }],
//   '/notes/front-end': [
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
//     children: ['/notes/front-end/HTML常见问题', '/notes/front-end/CSS知识点'],
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
        '/notes/front-end/HTML常见问题',
        '/notes/front-end/CSS知识点',
        '/notes/front-end/CSS-Flex',
        '/notes/front-end/JS类型转换',
        '/notes/front-end/JS类型与常用类型判断',
        '/notes/front-end/JS事件',
        '/notes/front-end/JS函数',
        '/notes/front-end/JS作用域与执行上下文',
        '/notes/front-end/JS原型与原型链',
        '/notes/front-end/JS面向对象之对象创建模式',
        '/notes/front-end/JS闭包',
        '/notes/front-end/JS与DOM坐标计算有关的操作属性',
        '/notes/front-end/JS浏览器BOM对象',
        '/notes/front-end/JS线程机制与事件机制',
        '/notes/front-end/JS异步任务与事件循环',
        '/notes/front-end/ES6知识点',
        '/notes/front-end/一些有趣的JS工具类方法',
      ],
    },
    {
      title: '前端进阶',
      collapsable: true,
      children: [
        '/notes/front-end-promotion/web性能优化',
        '/notes/front-end-promotion/如何优雅的解耦if-else',
      ],
    },
    {
      title: '后端',
      collapsable: true,
      children: [
        '/notes/back-end/Node的IO机制',
        '/notes/back-end/影响Node的性能因素',
        '/notes/back-end/Node的CPU过载保护机制',
        '/notes/back-end/关于Koa中间件底层原理简单实现',
      ],
    },
    {
      title: '数据结构与算法',
      collapsable: true,
      children: [
        '/notes/data-structures/二叉树的DFS',
      ],
    },
    {
      title: '面试',
      collapsable: true,
      children: [
        '/notes/interview/手撕系列',
        '/notes/interview/数组转对象',
      ],
    },
  ],
}

module.exports = sidebar
