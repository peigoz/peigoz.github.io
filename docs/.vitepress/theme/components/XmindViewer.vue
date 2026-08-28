<template>
  <div id="xmind-container">
    <Loading v-if="showLoading" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Loading from './Loading.vue'

const showLoading = ref(true)

const props = defineProps({
  url: String
})

onMounted(async () => {
  const { XMindEmbedViewer } = await import('xmind-embed-viewer')
  const viewer = new XMindEmbedViewer({
    el: '#xmind-container',
    region: 'cn' // 根据需要选择区域 'cn' 或 'global'
  })
  viewer.setStyles({
    width: '100%',
    height: '100%'
  })
  const hideLoading = () => {
    setTimeout(() => {
      showLoading.value = false
      viewer.removeEventListener('map-ready', hideLoading)
    }, 30);
  }
  viewer.addEventListener('map-ready', hideLoading)
  fetch(props.url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.arrayBuffer()
    })
    .then(file => {
      viewer.load(file)
    })
    .catch(err => {
      showLoading.value = false
      viewer.removeEventListener('map-ready', hideLoading)
      console.error('[XmindViewer] 加载 xmind 文件出错：', err)
    })
})
</script>

<style>
#xmind-container {
  position: relative;
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
}
</style>