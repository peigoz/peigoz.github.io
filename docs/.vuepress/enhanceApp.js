
export default async ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN
  // if(!isServer){
  //   const bubbles = await (await import('vue-canvas-effect/src/components/bubbles')).default
  //   Vue.component(bubbles.name, bubbles)
  // }
}
