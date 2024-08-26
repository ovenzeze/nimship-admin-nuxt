<template>
  <div class="noscrollbar flex flex-row justify-start items-start relative min-h-[calc(100svh-60px)] md:min-h-[calc(100svh-20px)] overscroll-none overflow-x-auto">
    <iframe 
      :src="iframeSrc"
      class="flex-none no-scrollbar overflow-y-scroll overscroll-none min-h-[calc(100svh-60px)] md:min-h-[calc(100svh-20px)] w-[1024px] md:w-full dark:filter dark:brightness-90"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  module: { type: String, required: true },
  title: { type: String, required: true },
  bOffset: { type: Number, default: 20 },
  tOffset: { type: Number, default: 150 },
  loadingDuration: { type: Number, default: 0 }
})

const iframeSrc = computed(() => {
  console.info('Loading ReTool...', `https://retool.nimship.com/app/${props.module}?mode=simple`)
  return `https://retool.nimship.com/app/${props.module}?mode=simple`
})

const isLoading = ref(false)
</script>

<style scoped>
.noscrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.noscrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>