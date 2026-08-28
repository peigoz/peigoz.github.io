import BlogTheme from '@sugarat/theme'
import XmindViewer from './components/XmindViewer.vue'

// 自定义样式重载
import './style.scss'

// 自定义主题色
// import './user-theme.css'

export default {
  ...BlogTheme,
  enhanceApp(ctx) {
    // 保留主题自带的 enhanceApp 逻辑（注册 UserWorksPage、ProductCard 等）
    BlogTheme.enhanceApp?.(ctx)
    // 注册 XMind 思维导图嵌入组件，文章中通过 <XmindViewer url="..." /> 使用
    ctx.app.component('XmindViewer', XmindViewer)
  },
}
