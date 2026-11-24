import BlogTheme from '@sugarat/theme'
import type {EnhanceAppContext} from 'vitepress'
import XmindViewer from './components/XmindViewer.vue'

// 自定义样式重载
import './style.scss'

// 自定义主题色与正文样式重载（浅色/深色两套配色）
// import './user-theme.scss'

// 淡蓝柔和主题：后引入覆盖 user-theme.scss 的 CSS 变量；注释掉即回到原深蓝主题
import './rainbow-azure.scss'

export default {
  ...BlogTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // 保留主题自带的 enhanceApp 逻辑（注册 UserWorksPage、ProductCard 等）
    BlogTheme.enhanceApp?.(ctx)
    // 注册 XMind 思维导图嵌入组件，文章中通过 <XmindViewer url="..." /> 使用
    ctx.app.component('XmindViewer', XmindViewer)
  },
}
