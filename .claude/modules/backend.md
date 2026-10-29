# docs/backend 模块

> 上级：[根级 CLAUDE.md](../../CLAUDE.md) · 路径：`docs/backend`

## 职责

服务端相关知识：Node.js 运行时与框架、Rust 语言特性、数据库与缓存。21 篇，约 7.8 万字。

## 目录与侧边栏

| 目录 | 侧边栏名称 | 篇数 | 内容范围 |
| --- | --- | --- | --- |
| `basic/` | 基础 | 1 | 缓存概念 |
| `sql/` | 数据库 | 3 | MySQL、Redis、通用数据库概念 |
| `nodejs/` | Nodejs | 8 | Nest 框架、Koa 中间件、I/O、性能与过载保护 |
| `rust/` | Rust | 9 | 所有权/借用、智能指针、生命周期、wasm |

## 文章清单

### nodejs/（8 篇）

| 文章 | 主题 |
| --- | --- |
| `Nest入门.md` | Nest 基础用法（约 2.4 万字，本模块最长） |
| `Nest其他相关.md` | 中间件、守卫、拦截器 |
| `Nest登录认证.md` | JWT / 认证流程 |
| `Node的IO机制.md` | 事件驱动 I/O |
| `Node的CPU过载保护机制.md` | 单线程模型的过载应对 |
| `影响Node的性能因素.md` | 性能瓶颈排查 |
| `关于Koa中间件底层原理简单实现.md` | 洋葱模型手写实现 |
| `Node制作工具常用库.md` | CLI 工具常用依赖 |

### rust/（9 篇）

| 文章 | 主题 |
| --- | --- |
| `前端视角下的Rust简单概念理解.md` | 借用/所有权入门 |
| `Rust 中的拷贝和克隆.md` | Copy vs Clone |
| `Rust生命周期的消除规则.md` | 生命周期省略 |
| `理解Deref解引用.md` | Deref 与自动解引用 |
| `理解Rc和Arc.md` | 引用计数智能指针 |
| `理解Cell和RefCell.md` | 内部可变性 |
| `理解miri 与 栈借用.md` | 借用检查工具链 |
| `Rust编译的 wasm 在 Vite 中使用.md` | wasm-pack + Vite 集成 |
| `如何在vscode中用rust刷leetcode.md` | 本地刷题环境搭建 |

### sql/ 与 basic/（4 篇）

`数据库基本概念.md`、`Mysql 基本概念.md`、`Redis 常用数据结构和应用场景.md`、`缓存.md`

## 写作约定

- 与前端模块不同，这里的文章多为「从前端视角切入后端概念」，续写时保持这个叙述角度。
- Rust 系列有 7 篇以「理解 XXX」命名，是成系列的，新增篇章建议沿用命名。
- 常用 `::: tip` 容器（12 处）；无 mermaid 图；代码块约 102 个。

## 注意事项

- 数据库类文章时间较新（2026 年），语法与版本请以文章内的版本号为准。
- 新增子分类目录必须在 `docs/.vitepress/configs/dirname-translate.ts` 注册中文名。