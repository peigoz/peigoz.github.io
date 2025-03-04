export const nav = [
  { text: '主页', link: '/' },
  {
    text: '前端基础',
    items: [
      { text: 'HTML', link: '/basic/html/HTML常见问题', },
      { text: 'CSS', link: '/basic/css/CSS知识点', },
      { text: 'JavaScript', link: '/basic/javascript/JS类型转换', },
    ]
  },
  {
    text: '工程进阶',
    items: [
      { text: '大前端', link: '/senior/engineer/Vue与React各个生命周期', },
      { text: 'TypeScript', link: '/senior/typescript/TypeScript知识点', },
      { text: 'NodeJs', link: '/senior/nodejs/Node的CPU过载保护机制', },
      { text: '代码协同', link: '/senior/team/Volta常用命令', },
      { text: '百宝箱', link: '/senior/peculiar/一些有趣的JS工具类方法', },
      { text: 'Rust', link: '/senior/rust/前端视角下的Rust简单概念理解', },
    ],
  },
  {
    text: '工程基础',
    items: [
      { text: '数据结构与算法', link: '/engineer-basic/structure-algorithm/二叉树的DFS' },
      { text: '设计模式', link: '/engineer-basic/design-pattern/如何优雅的解耦if-else', },
      { text: '操作系统', link: '/engineer-basic/operation-system/常用unix命令', },
    ],
  },
  // { text: '踩坑笔记', link: '/fix-bug/' },
  {
    text: '大杂烩',
    items: [
      { text: '面试系列', link: '/mixture/interview/手撕系列' },
      { text: '软件推荐', link: '/mixture/tools/软件推荐', },
    ],
  },
  { text: '关于我', link: '/about' },
]