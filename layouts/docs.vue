<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-background">
    <button @click="toggleSidebar" class="md:hidden fixed top-5 left-2 z-20 p-1 bg-primary text-white rounded-md">
      <MenuIcon v-if="!sidebarExpanded" class="w-4 h-4 bg-foreground/10 p-0.5" />
      <XIcon v-else class="w-4 h-4" />
    </button>

    <Transition name="slide">
      <DocsSiderbar v-if="sidebarExpanded" class="fixed z-10 h-screen" />
    </Transition>

    <main class="flex-1 p-4 md:p-8 overflow-y-auto mx-auto md:ps-64">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { MenuIcon, XIcon } from 'lucide-vue-next'
import { useSidebarState } from '~/composables/UseDoc';

const sidebarExpanded = useSidebarState()
const isLargeScreen = ref(false)

const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 768 // md breakpoint
}

const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
