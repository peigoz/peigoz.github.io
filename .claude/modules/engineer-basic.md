# docs/engineer-basic 模块

> 上级：[根级 CLAUDE.md](../../CLAUDE.md) · 路径：`docs/engineer-basic`

## 职责

工程通用基础：设计模式、操作系统与命令行、数据结构与算法、代码协同工具。12 篇，约 4.4 万字。

## 目录与侧边栏

| 目录 | 侧边栏名称 | 篇数 | 内容范围 |
| --- | --- | --- | --- |
| `design-pattern/` | 设计模式 | 1 | 用策略/表驱动消除 if-else |
| `operation-system/` | 操作系统 | 1 | 常用 unix 命令 |
| `structure-algorithm/` | 数据结构与算法 | 6 | 排序、二叉树、二分、刷题总结 |
| `team/` | 代码协同 | 4 | Git 工作流与命令、GitHub 搜索、Volta |

## 文章清单

### structure-algorithm/（6 篇，核心区）

| 文章 | 主题 | 规模 |
| --- | --- | --- |
| `算法刷题总结二.md` | 题型归纳（第二辑） | 约 1.4 万字，本模块最长 |
| `算法刷题总结一.md` | 题型归纳（第一辑） | 约 4 千字 |
| `二叉树的DFS.md` | 递归与迭代两种 DFS 写法 | 约 2.4 千字 |
| `快速排序.md` | 快排实现与复杂度 | 约 1.8 千字 |
| `详解二分查找.md` | 边界条件处理 | 约 1.8 千字 |
| `三角形最小路径和(120).md` | 一道 DP 题的 3 种解法 | 约 1.6 千字 |

### team/（4 篇）

`工作中常见的Git命令.md`、`git-rebase和git-merge区别.md`、`GitHub搜索技巧.md`、`Volta常用命令.md`

### design-pattern/ 与 operation-system/

`如何优雅的解耦if-else.md`、`常用unix命令.md`

## 写作约定

- 算法文章统一是「题目 → 思路 → 代码」结构，代码块约 49 个，以 `js` 为主。
- 不使用 `::: tip` 容器、不使用 mermaid；纯正文 + 代码块。
- 刷题总结类文章按「一、二」编号持续追加，新增时沿用编号。

## 注意事项

- 新增算法文章放在 `structure-algorithm/`，文件名用题目本身的表述，便于侧边栏检索。
- `team/` 的侧边栏中文名是「代码协同」（见 `dirname-translate.ts`），不要误以为是团队管理类内容。