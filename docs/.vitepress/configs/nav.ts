export const nav = [
  { text: '主页', link: '/' },
  {
    text: '前端',
    items: [
      {text: 'HTML', link: '/frontend/html/HTML常见问题'},
      {text: 'CSS', link: '/frontend/css/CSS知识点'},
      {text: 'JavaScript', link: '/frontend/javascript/JS类型转换'},
      {text: 'TypeScript', link: '/frontend/typescript/TypeScript知识点'},
      {text: '框架与工程化', link: '/frontend/senior/Vue与React各个生命周期'},
      {text: '奇技淫巧', link: '/frontend/tricks/一些有趣的JS工具类方法'},
    ],
  },
  {
    text: '后端',
    items: [
      {text: '基础', link: '/backend/basic/缓存'},
      {text: '数据库', link: '/backend/sql/数据库基本概念'},
      {text: 'NodeJs', link: '/backend/nodejs/Node的CPU过载保护机制'},
      {text: 'Rust', link: '/backend/rust/前端视角下的Rust简单概念理解'},
    ],
  },
  {
    text: 'AI',
    items: [
      {text: '模型', link: '/ai/model/大模型提示词技巧'},
      {text: 'Agent', link: '/ai/agent/Agent 开发思维导图'},
    ],
  },
  {
    text: '工程基础',
    items: [
      { text: '设计模式', link: '/engineer-basic/design-pattern/如何优雅的解耦if-else' },
      { text: '操作系统', link: '/engineer-basic/operation-system/常用unix命令' },
      { text: '数据结构与算法', link: '/engineer-basic/structure-algorithm/二叉树的DFS' },
      { text: '代码协同', link: '/engineer-basic/team/Volta常用命令' },
    ],
  },
  // { text: '踩坑笔记', link: '/bug-fix/' },
  {
    text: '其他',
    items: [
      { text: '面试系列', link: '/mixture/interview/手撕系列' },
      { text: '工具软件', link: '/mixture/tools/软件推荐' },
    ],
  },
  { text: '关于我', link: '/about' },
]