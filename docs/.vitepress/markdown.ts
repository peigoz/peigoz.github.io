function hasH1Header(content) {
  if (typeof content !== 'string' || content.trim().length === 0) {
    return false
  }

  // 标准化处理：统一换行符并分割为行数组
  const lines = content.replace(/\r\n/g, '\n').split('\n')

  // 方案一：检测 # 语法标题
  const sharpPattern = /^#\s+(?!#).+$/ // 排除连续的 ##
  if (lines.some(line => sharpPattern.test(line))) {
    return true
  }
}

export const titlePlugin = md => {
  md.core.ruler.before('normalize', 'title-to-h1', state => {
    try {
      // 1. 获取 frontmatter.title
      const frontmatter = state.env.frontmatter || {}
      const title = frontmatter.title?.trim()

      // 2. 判断原文是否有一级标题
      const content = state.env?.content
      const hasHeader = hasH1Header(content)

      // 3. 插入标题
      if (title && !hasHeader) {
        state.env.content = `\n# ${title}\n${content}`
        state.src = `\n# ${title}\n${state.src}`
      }
    } catch (e) {
      console.error('[title-plugin] 插件执行错误:', e)
    }
  })
}
