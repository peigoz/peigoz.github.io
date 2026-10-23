/**
 * 博客图床资源基址（七牛云 CDN，域名为 blog.peigo.top 子域）。
 *
 * 换图床 / CDN 域名时注意：
 * 1. 本常量仅覆盖 .vitepress 配置文件（config.mts、blog-theme.ts）内的引用；
 * 2. docs/index.md 的 frontmatter（logo、赞赏二维码）与 Markdown 正文插图
 *    仍是字面量，需对仓库执行一次全局替换 "https://blog.peigo.top" => "https://新域名"。
 */
export const BLOG_ASSET_BASE = 'https://blog.peigo.top/peigo'
// 由 docs 下全部文章 frontmatter 提取（2026-10-23），按使用频次降序
export const BLOG_TAGS = [
  'JavaScript',
  'Rust',
  'Node',
  'AI',
  '数据结构与算法',
  'Web',
  'TypeScript',
  '数据库',
  '代码协同',
  'Tool',
  '面试',
  'Info',
  'CSS',
  '设计模式',
  'Linux',
  'HTML',
]