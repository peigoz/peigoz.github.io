/* eslint-disable no-proto */
import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'
import { addLinkToHead, addScriptToHead } from '@theme/helpers/utils'
import { registerCodeThemeCss, interceptRouterError } from '@theme/helpers/other'
import VueCompositionAPI from '@vue/composition-api'

export default async ({ Vue, siteData, isServer, router }) => {
  const bubbles = await (await import('vue-canvas-effect/src/components/bubbles')).default
  Vue.use(VueCompositionAPI)
  Vue.component(bubbles.name, bubbles)
  Vue.mixin(postMixin)
  Vue.mixin(localMixin)
  if (!isServer) {
    addLinkToHead('//at.alicdn.com/t/font_1030519_2ciwdtb4x65.css')
    addLinkToHead('//at.alicdn.com/t/font_2330514_4fvtpq5qd67.css')
    addScriptToHead('//kit.fontawesome.com/51b01de608.js')
    registerCodeThemeCss(siteData.themeConfig.codeTheme)
  }

  interceptRouterError(router)
}
