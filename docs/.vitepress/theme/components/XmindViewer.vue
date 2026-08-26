<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  url: { type: String, required: true } // .xmind 文件的访问链接
})

const viewerRef = ref(null)

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const { XMindEmbedViewer } = await import('xmind-embed-viewer')
    new XMindEmbedViewer({
      element: viewerRef.value,
      region: 'cn', // 根据需要选择区域 'cn' 或 'global'
      fileUrl: props.url,
    }).load()
  }
})
</script>

<template>
  <div ref="viewerRef" style="width: 100%; height: 600px;" />
</template>