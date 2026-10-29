# docs/.vitepress 模块

> 上级：[根级 CLAUDE.md](../../CLAUDE.md) · 路径：`docs/.vitepress`

## 职责

站点的全部构建配置：VitePress 主配置、`@sugarat/theme` 博客主题配置、主题与配色重载、导航、动态侧边栏生成。

## 目录结构

```
docs/.vitepress/
├── config.mts              # defineConfig 站点主配置（导航、head、sitemap、markdown 插件、outline）
├── blog-theme.ts           # getThemeConfig：评论(giscus)、页脚、themeColor、作者、版权卡
├── shims-vue.d.ts          # .vue 模块类型声明
├── configs/
│   ├── nav.ts              # 顶部导航（前端/后端/AI/工程基础/其他/关于我）
│   ├── sidebar.ts          # 运行时扫描 docs 生成侧边栏，并把顺序写入 sidebar-cache.ts
│   ├── sidebar-cache.ts    # 侧边栏顺序缓存（构建时会被 sidebar.ts 重写）
│   ├── dirname-translate.ts# 目录名 → 中文侧边栏标题的映射表
│   ├── constants.ts        # BLOG_ASSET_BASE 等常量
│   └── utils.ts            # sidebar 生成用的工具函数
└── theme/
    ├── index.ts            # 主题入口：继承 BlogTheme，注册 XmindViewer 组件，引入两份样式
    ├── style.scss          # 布局层重载：首页背景图、侧边栏折叠动画
    ├── user-theme.scss     # 主题色 + 正文配色重载（已启用）
    ├── components/         # XmindViewer.vue、Loading.vue
    └── assets/             # 首页背景图（浅色/深色 webp）
```

## 关键机制

- **动态侧边栏**：`sidebar.ts` 在构建时递归扫描 `docs/`，按 `dirname-translate.ts` 把目录名翻译成中文标题。新增子分类目录若不登记映射表，侧边栏会显示英文目录名。
- **顺序持久化**：生成结果写回 `sidebar-cache.ts`。手动调顺序直接改该文件的数组即可；但**再跑一次构建会被重写**，需要在 `sidebar.ts` 的排序逻辑里调整。
- **主题色覆盖**：`user-theme.scss` 顶部用 `:root:root` 覆盖 `--vp-c-brand-*`，而不是改 `blog-theme.ts` 的 `themeColor: 'el-blue'`。原因与约束见根文档「配色体系」。
- **llmstxt 插件**：`config.mts` 的 `vite.plugins` 引入 `vitepress-plugin-llms`，构建时产出 `llms.txt` / `llms-full.txt`。
- **移动端缩放禁用**：`head` 中覆盖 viewport 并引入 `/js/disable-user-zoom.js`。

## 常见改动

| 想改什么 | 改哪里 |
| --- | --- |
| 顶部导航 | `configs/nav.ts` |
| 侧边栏标题中文名 | `configs/dirname-translate.ts` |
| 侧边栏文章顺序 | `configs/sidebar-cache.ts`（注意构建会重写） |
| 评论、页脚、作者、ICP | `blog-theme.ts` |
| 站点标题、description、sitemap、head | `config.mts` |
| 首页背景图、布局类样式 | `theme/style.scss` |
| 品牌色、正文配色 | `theme/user-theme.scss` |

## 注意事项

- `docs/.vitepress/dist` 是构建产物，禁止手工编辑。
- 改了 `config.mts` / `blog-theme.ts` 会触发 dev server 整体重启，属正常现象。
- **不要同时跑 `pnpm dev` 和 `pnpm build`**：dev server 会监听 `dist`，构建输出会触发它反复 reload，最终 esbuild 崩溃。
- 模块级 AI 文档统一放在 `.claude/modules/`，**不要放进 `docs/`**，否则会被 VitePress 编译成可访问页面。