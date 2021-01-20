<template>
  <div class="DynamicBackground"
       :style="{...bgImageStyle}">
    <div class="content">
      thank you for standing behind me 
    </div>
    <component v-if="bubbles"
               :is="bubbles"
               :options="options"></component>

  </div>
</template>

<script>
import { getOneBgImg } from '../theme/helpers/other'
export default {
  name: 'DynamicBackground',
  components: {},
  data() {
    return {
      bubbles: null,
      options: {
        color: 'rgba(225,225,225,0.5)', //气泡颜色
        radius: 17, //气泡半径
        densety: 0.4, // 气泡密度 越大越密集(建议不要大于1)
        clearOffset: 0.3, // 气泡消失距离[0-1] 越大越晚消失
      },
    }
  },
  mounted() {
    import('vue-canvas-effect/src/components/bubbles').then((module) => {
      this.bubbles = module.default
    })
  },
  computed: {
    bgImageStyle() {
      return {
        textAlign: 'center',
        overflow: 'hidden',
        background: `
          url(${
            getOneBgImg()
              ? getOneBgImg()
              : 'https://blog.candane.top/background/20210119211251.jpg'
          }?imageView2/1/w/1920/h/1080/interlace/1/q/70) center/cover no-repeat
        `,
      }
    },
  },
}
</script>

<style scoped>
.DynamicBackground {
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-self: start;
  justify-content: center;
  align-items:flex-end;
}
.content{
  font-size: 2rem;
  font-weight: 600;
}
</style>

