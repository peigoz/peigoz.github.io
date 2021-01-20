/* eslint-disable no-proto */
import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'
import { addLinkToHead, addScriptToHead } from '@theme/helpers/utils'
import { registerCodeThemeCss, interceptRouterError } from '@theme/helpers/other'
import VueCompositionAPI from '@vue/composition-api'

export default async ({ Vue, siteData, isServer, router }) => {
  Vue.use(VueCompositionAPI)
  Vue.mixin(postMixin)
  Vue.mixin(localMixin)
  if (!isServer) {
    // const bubbles = await (await import('vue-canvas-effect/src/components/bubbles')).default
    // Vue.component(bubbles.name, bubbles)
    //我的阿里图标
    addLinkToHead('//at.alicdn.com/t/font_2330514_5481d1wip64.css')

    //reco
    addLinkToHead('//at.alicdn.com/t/font_1030519_2ciwdtb4x65.css')
    addScriptToHead('//kit.fontawesome.com/51b01de608.js')
    registerCodeThemeCss(siteData.themeConfig.codeTheme)
  }

  interceptRouterError(router)
}
