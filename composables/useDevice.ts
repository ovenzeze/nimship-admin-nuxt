import { useWindowSize } from '@vueuse/core'

export function useDevice() {
  const { width } = useWindowSize()

  const isMobile = computed(() => width.value < 768)


  return {
    isMobile
  }
}
