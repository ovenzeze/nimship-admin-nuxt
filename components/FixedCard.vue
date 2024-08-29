<template>
  <ClientOnly>
    <div 
      :class="[
        'fixed-card w-full transition-colors duration-300 ease-in-out border border-border rounded-lg',
        theme === 'dark' ? 'bg-background text-foreground' : 'bg-background text-foreground'
      ]"
      :style="{ height: cardHeight }"
      ref="cardRef"
    >
      <!-- Header -->
      <div class="w-full flex flex-col md:flex-row items-center justify-between animate-in fade-in duration-300 border-b border-border" :style="{ height: headerHeightStyle }">
        <slot name="CardInfo" class="max-w-[300px]"></slot>
        <slot name="PrimaryAction" class="flex-1 flex flex-row items-center justify-end"></slot>
      </div>
      <!-- body  -->
      <div 
        class="body overflow-y-auto transition-all duration-300 ease-in-out"
        :style="{ height: bodyHeight }"
      >
        <slot name="body"></slot>
      </div>
      <!-- Footer -->
      <div class="footer border-t border-border min-h-[50px] flex items-center justify-center" :style="{ height: footerHeightStyle }">
        <slot name="footer"></slot>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useWindowSize, useResizeObserver } from '@vueuse/core'

const props = defineProps({
  otherElementsHeight: {
    type: Number,
    default: 80
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value: string) => ['light', 'dark'].includes(value)
  },
  headerHeight: {
    type: Number,
    default: undefined
  },
  footerHeight: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['resize'])

const cardRef = ref<HTMLElement | null>(null)
const { height: windowHeight } = useWindowSize()
const measuredHeaderHeight = ref(0)
const measuredFooterHeight = ref(0)
const cardHeight = ref('0px')

const headerHeightStyle = computed(() => props.headerHeight ? `${props.headerHeight}px` : 'auto')
const footerHeightStyle = computed(() => props.footerHeight ? `${props.footerHeight}px` : 'auto')

const actualHeaderHeight = computed(() => props.headerHeight || measuredHeaderHeight.value)
const actualFooterHeight = computed(() => props.footerHeight || measuredFooterHeight.value)

const bodyHeight = computed(() => {
  const totalHeight = parseInt(cardHeight.value) - actualHeaderHeight.value - actualFooterHeight.value
  return `${totalHeight}px`
})

const updateHeight = () => {
  if (cardRef.value) {
    const headerEl = cardRef.value.querySelector('.flex')
    const footerEl = cardRef.value.querySelector('.footer')
    measuredHeaderHeight.value = headerEl?.clientHeight || 0
    measuredFooterHeight.value = footerEl?.clientHeight || 0
    cardHeight.value = `${windowHeight.value - props.otherElementsHeight}px`
    emit('resize', { 
      cardHeight: cardRef.value.clientHeight, 
      bodyHeight: parseFloat(bodyHeight.value)
    })
  }
}

onMounted(() => {
  updateHeight()
})

watch(windowHeight, updateHeight)

// 使用 useResizeObserver 来监听卡片大小变化
const { stop } = useResizeObserver(cardRef, updateHeight)

// 在组件卸载时停止观察
onUnmounted(() => {
  stop()
})
</script>
