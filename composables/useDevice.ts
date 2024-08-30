import { ref, onMounted, onUnmounted } from 'vue'
import { useRequestHeaders, useNuxtApp } from '#app'

export function useDevice() {
  const isMobile = ref(false)

  const checkIsMobile = () => {
    const { $device } = useNuxtApp()
    if ($device.isClient) {
      // Client-side detection using innerWidth
      isMobile.value = window.innerWidth < 768 // You can adjust this breakpoint
    } else {
      // Server-side detection (fallback to user-agent)
      const headers = useRequestHeaders(['user-agent'])
      const userAgent = headers['user-agent'] || ''
      isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    }
  }

  const handleResize = () => {
    checkIsMobile()
  }

  onMounted(() => {
    checkIsMobile()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isMobile
  }
}
