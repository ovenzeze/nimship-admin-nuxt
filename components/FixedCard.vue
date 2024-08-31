<template>
  <ClientOnly>
    <div :class="[
      'fixed-card w-full transition-colors duration-300 ease-in-out border border-border rounded-lg',
      theme === 'dark' ? 'bg-background text-foreground' : 'bg-background text-foreground'
    ]" :style="{ height: heightStyl.cardHeight }" ref="cardRef">
      <!-- Header -->
      <div
        class="w-full flex flex-col md:flex-row items-center justify-between animate-in fade-in duration-300 border-b border-border header"
        :style="{ height: heightStyl.headerHeight }">
        <slot name="CardInfo" class="max-w-[300px]">
          <DevOnly>
            <p class="text-sm text-muted-foreground text-center px-4">Card Info</p>
          </DevOnly>
        </slot>
        <slot name="PrimaryAction" class="flex-1 flex flex-row items-center justify-end">
          <DevOnly>
            <p class="text-sm text-muted-foreground px-4">Primary Action</p>
          </DevOnly>
        </slot>
      </div>
      <!-- body  -->
      <div class="flex body overflow-hidden transition-all duration-300 ease-in-out overscroll-none"
        :style="{ height: heightStyl.bodyHeight }">
        <slot name="body">
          <DevOnly>
            <p class="text-sm text-muted-foreground text-center h-full flex-1 content-center">
              Body - Dev Only Tips
            </p>
          </DevOnly>
        </slot>
      </div>
      <!-- Footer -->
      <div class="footer border-t border-border min-h-[50px] flex items-center justify-center"
        :style="{ height: heightStyl.footerHeight }" v-if="footerHeight != 0">
        <slot name="footer">
          <DevOnly>
            <p class="text-sm text-muted-foreground">Development Only Time: {{ new Date().toLocaleTimeString() }}</p>
          </DevOnly>
        </slot>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useWindowSize, useResizeObserver } from '@vueuse/core'

const props = defineProps({
  otherElementsHeight: {
    type: Number,
    default: 80
  },
  headerHeight: {
    type: Number,
    default: 50
  },
  footerHeight: {
    type: Number,
    default: 50
  },
  theme: {
    type: String,
    default: 'light'
  }
})

const emit = defineEmits(['resize'])

const cardRef = ref<HTMLElement | null>(null)
const { height: windowHeight } = useWindowSize()
const measuredHeaderHeight = ref(0)
const measuredFooterHeight = ref(0)
const cardHeight = ref('100%')

const heightStyl = ref({
  headerHeight: `${props.headerHeight}px`,
  footerHeight: `${props.footerHeight}px`,
  cardHeight: 'auto',
  bodyHeight: `calc(100vh - ${props.headerHeight}px - ${props.footerHeight}px)`
})

const actualHeaderHeight = computed(() => props.headerHeight || measuredHeaderHeight.value)
const actualFooterHeight = computed(() => props.footerHeight || measuredFooterHeight.value)

const bodyHeight = computed(() => {
  const totalHeight = cardHeight.value - props.headerHeight - props.footerHeight
  console.log('totalHeight', totalHeight)
  return `${totalHeight}px`
})

const updateHeight = () => {
  if (cardRef.value) {
    const headerEl = cardRef.value.querySelector('.header')
    const footerEl = cardRef.value.querySelector('.footer')
    measuredHeaderHeight.value = headerEl?.clientHeight || 0
    measuredFooterHeight.value = footerEl?.clientHeight || 0
    cardHeight.value = windowHeight.value - props.otherElementsHeight
    heightStyl.value.cardHeight = `${cardHeight.value}px`
    heightStyl.value.bodyHeight = `${cardHeight.value - props.headerHeight - props.footerHeight}px`
    console.log('heightStyl', heightStyl.value)
    emit('resize', heightStyl.value)
  }
}

onMounted(() => updateHeight())

watch(windowHeight, updateHeight)

// 使用 useResizeObserver 来监听卡片大小变化
const { stop } = useResizeObserver(cardRef, updateHeight)

// 在组件卸载时停止观察
onUnmounted(() => {
  stop()
})
</script>
