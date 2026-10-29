# docs/frontend 模块

> 上级：[根级 CLAUDE.md](../../CLAUDE.md) · 路径：`docs/frontend`

## 职责

纯前端知识沉淀：HTML / CSS / JavaScript 基础，TypeScript 与类型体操，框架与工程化，零散技巧。是站点体量最大的模块（28 篇，约 15.5 万字）。

## 目录与侧边栏

| 目录 | 侧边栏名称 | 篇数 | 内容范围 |
| --- | --- | --- | --- |
| `html/` | HTML | 1 | HTML 语义化与常见问题 |
| `css/` | CSS | 2 | CSS 知识点、Flex 布局 |
| `javascript/` | JavaScript | 13 | 类型与转换、闭包、原型链、事件循环、BOM、面向对象 |
| `typescript/` | TypeScript | 4 | 知识点总汇、类型区别、类型体操 |
| `senior/` | 框架与工程化 | 5 | 性能优化、构建工具、npm 生态、Vue/React |
| `tricks/` | 工具集散 | 3 | CSS 冷门技巧、JS 工具函数、TS 类型体操题 |

## 文章清单

### javascript/（13 篇，核心区）

| 文章 | 主题 |
| --- | --- |
| `JS类型转换.md` | 隐式类型转换规则 |
| `JS类型与常用类型判断.md` | 类型判断方式对比 |
| `ES6知识点.md` | ES6+ 语法总汇（本模块最长，约 2.5 万字） |
| `JS函数.md` | 函数声明、this、参数 |
| `JS作用域与执行上下文.md` | 作用域链与执行上下文 |
| `JS闭包.md` | 闭包原理与应用 |
| `JS原型与原型链.md` | 面向对象与原型链 |
| `JS面向对象之对象创建模式.md` | 工厂/构造函数/原型模式 |
| `JS事件.md` | 事件流、委托、绑定 |
| `JS异步任务与事件循环.md` | 宏任务/微任务 |
| `JS线程机制与事件机制.md` | 浏览器线程模型 |
| `JS浏览器BOM对象.md` | BOM 常用 API |
| `JS与DOM坐标计算有关的属性.md` | offset/scroll/client 系列 |

### typescript/（4 篇）

`TypeScript知识点.md`（约 2.2 万字）、`几个常用类型之间区别.md`、`类型体操中的一些特殊情况.md`、`新版本类型体操的一些新特性.md`

### senior/（5 篇）

`web性能优化.md`（约 1.4 万字）、`2023-2025年前端领域的技术演进Top5.md`、`vite虚拟模块实现约定式路由.md`、`前端一些常用的npm库.md`、`Vue与React各个生命周期.md`

### css/ html/ tricks/

`CSS知识点.md`、`Flex布局.md`、`HTML常见问题.md`、`CSS冷门技巧(一).md`、`一些有趣的JS工具类方法.md`、`01.两数之和-类型体操版本.md`

## 写作约定

- frontmatter 必需：`title`、`date`、`tags`、`publish: true`。
- 早期文章（2019–2022）的 `date` 格式不统一，存在 `2021-1-15 16:22:46` 这种单位数月/日，新增文章统一写 `YYYY-MM-DD HH:MM:SS`。
- 常用 `::: tip` / `::: warning` 容器（本模块共 9 处），暂无 mermaid 图。
- 代码块以 `js` / `ts` 为主，约 133 个。

## 注意事项

- JavaScript 区文章偏早期笔记风格，结构为「概念 → 示例 → 面试要点」，续写时保持一致。
- 新增子分类目录必须在 `docs/.vitepress/configs/dirname-translate.ts` 注册中文名，否则侧边栏显示英文。