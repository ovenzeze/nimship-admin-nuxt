<template>
  <div 
    :class="[
      'fixed-card w-full transition-colors duration-300 ease-in-out border border-border rounded-lg',
      theme === 'dark' ? 'bg-background text-foreground' : 'bg-background text-foreground'
    ]"
    :style="{ height: cardHeight }"
    ref="cardRef"
  >
    <!-- Header -->
    <div class="flex flex-col md:flex-row animate-in fade-in duration-300 border-b border-border" :style="{ height: headerHeightStyle }">
      <div class="card-info md:min-w-[200px] md:max-w-[300px] p-4">
        <slot name="CardInfo">
          <p class="text-muted-foreground flex items-center">
                        <Icon name="ph:airplay" class="w-5 h-5 mr-2" />

            Card Info Not Provided</p>
        </slot>
      </div>
      <div class="primary-action flex-grow p-4  ">
        <slot name="PrimaryAction">
          <p class="text-muted-foreground text-right flex items-center justify-end">
            <Icon name="ph:acorn" class="w-5 h-5 mr-2" />
            Primary Action Not Provided
          </p>
        </slot>
      </div>
    </div>
    <!-- body  -->
    <div 
      class="body overflow-y-auto transition-all duration-300 ease-in-out"
      :style="{ height: bodyHeight }"
    >
      <slot name="body">
        <p class="text-muted-foreground bg-muted-foreground/0 w-full h-full flex items-center justify-center">Body Content Not Provided</p>
      </slot>
    </div>
    <!-- Footer -->
    <div class="footer border-t border-border min-h-[50px] flex items-center justify-center" :style="{ height: footerHeightStyle }">
      <slot name="footer">
        <p class="text-muted-foreground/70 text-sm flex items-center justify-center">
            <Icon name="ph:wheelchair-motion" class="w-5 h-5 mr-1" />
        Footer Not Provided</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const cardHeight = computed(() => `${windowHeight.value - props.otherElementsHeight}px`)

const headerHeightStyle = computed(() => props.headerHeight ? `${props.headerHeight}px` : 'auto')
const footerHeightStyle = computed(() => props.footerHeight ? `${props.footerHeight}px` : 'auto')

const actualHeaderHeight = computed(() => props.headerHeight || measuredHeaderHeight.value)
const actualFooterHeight = computed(() => props.footerHeight || measuredFooterHeight.value)

const bodyHeight = computed(() => {
  const totalHeight = windowHeight.value - props.otherElementsHeight
  return `${totalHeight - actualHeaderHeight.value - actualFooterHeight.value}px`
})

const updateHeight = () => {
  if (cardRef.value) {
    const headerEl = cardRef.value.querySelector('.flex')
    const footerEl = cardRef.value.querySelector('.footer')
    measuredHeaderHeight.value = headerEl?.clientHeight || 0
    measuredFooterHeight.value = footerEl?.clientHeight || 0
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
