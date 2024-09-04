<template>
  <ClientOnly>
    <div :class="[
      'fixed-card w-full transition-colors duration-300 ease-in-out border-border rounded-lg',
      theme === 'dark' ? 'bg-background text-foreground' : 'bg-background text-foreground'
    ]" :style="{ height: heightStyl.cardHeight }" ref="cardRef">
      <!-- Header -->
      <div
        class="w-full flex flex-col md:flex-row items-center justify-between animate-in fade-in duration-300 border-border header"
        :style="{ height: `${actualHeaderHeight}px` }" v-if="actualHeaderHeight != 0">
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
      <div class="w-full overflow-hidden body transition-all duration-300 ease-in-out overscroll-none"
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
      <div class="footer border-border min-h-[40px] flex items-center justify-center"
        :style="{ height: `${actualFooterHeight}px` }" v-if="actualFooterHeight != 0">
        <slot name="footer">
          <DevOnly>
            <p class="text-sm text-muted-foreground">Development Only Time: {{ new Date().toLocaleTimeString() }}</p>
          </DevOnly>
        </slot>
      </div>
      <div v-if="showBlur"
        class="fixed bottom-0 left-0 w-full h-full backdrop-blur-[2px] transition-all duration-300 ease-in-out" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useWindowSize, useResizeObserver } from '@vueuse/core'
import { useDevice } from '@/composables/useDevice'

const { isMobile } = useDevice()

const props = defineProps({
  otherElementsHeight: {
    type: Object,
    default: () => ({ mobile: 80, desktop: 80 })
  },
  headerHeight: {
    type: Object,
    default: () => ({ mobile: 40, desktop: 50 })
  },
  footerHeight: {
    type: Object,
    default: () => ({ mobile: 40, desktop: 50 })
  },
  showBlur: {
    type: Boolean,
    default: false
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
  headerHeight: `${props.headerHeight.mobile}px`,
  footerHeight: `${props.footerHeight.mobile}px`,
  cardHeight: 'auto',
  bodyHeight: `calc(100svh - ${props.headerHeight.mobile}px - ${props.footerHeight.mobile}px)`
})

const actualHeaderHeight = computed(() =>
  isMobile.value ? props.headerHeight.mobile : props.headerHeight.desktop
)
const actualFooterHeight = computed(() =>
  isMobile.value ? props.footerHeight.mobile : props.footerHeight.desktop
)
const actualOtherElementsHeight = computed(() =>
  isMobile.value ? props.otherElementsHeight.mobile : props.otherElementsHeight.desktop
)

const bodyHeight = computed(() => {
  const totalHeight = Number(cardHeight.value) - actualHeaderHeight.value - actualFooterHeight.value
  console.log('totalHeight', totalHeight)
  return `${totalHeight}px`
})

const updateHeight = () => {
  if (cardRef.value) {
    const headerEl = cardRef.value.querySelector('.header')
    const footerEl = cardRef.value.querySelector('.footer')
    measuredHeaderHeight.value = headerEl?.clientHeight || 0
    measuredFooterHeight.value = footerEl?.clientHeight || 0
    cardHeight.value = windowHeight.value - actualOtherElementsHeight.value
    heightStyl.value.cardHeight = `${cardHeight.value}px`
    heightStyl.value.bodyHeight = `${Number(cardHeight.value) - actualHeaderHeight.value - actualFooterHeight.value}px`
    console.log('heightStyl', heightStyl.value)
    emit('resize', heightStyl.value)
  }
}

onMounted(() => updateHeight())

watch(windowHeight, updateHeight)

// 使用 useResizeObserver 来监听卡片大小变化
const { stop } = useResizeObserver(cardRef, updateHeight)

// 在组件卸载时停止观察
onUnmounted(() => stop())
</script>
