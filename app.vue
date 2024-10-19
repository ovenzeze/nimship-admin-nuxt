<template>
  <div class="color-mode">
    <NuxtLayout>
      <NuxtPage />
      <UNotifications />
      <Toaster />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { computed } from 'vue'

const route = useRoute()
const isDocsRoute = computed(() => route.path.startsWith('/docs'))

useHead({
  meta: [
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Nimship Dashboard' },
    { name: 'msapplication-TileImage', content: 'Nimship Dashboard' },
    { name: 'msapplication-TileColor', content: '#ffffff' }
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' },
  ]
})
</script>

<style>
:root {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent;
  font-family: "Crimson Text", Inter var, Inter, system-ui;
}

*::-webkit-scrollbar {
  display: none;
}

.noscrollbar::-webkit-scrollbar {
  width: 0.125rem;
  height: 0.125rem;
}

.noscrollbar::-webkit-scrollbar-track {
  border-radius: 9999px;
  background-color: #f3f4f6;
}

.noscrollbar::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background-color: #f3f4f6;
}


/* for global page transition */
/* .page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
} */

.noscrollbar::-webkit-scrollbar {
  width: 0.125rem;
  height: 0.125rem;
}

.hidescrollbar::-webkit-scrollbar {
  width: 0.125rem;
  height: 0.125rem;
}

.noscrollbar::-webkit-scrollbar-track {
  border-radius: 9999px;
  background-color: #f3f4f6;
}

.noscrollbar::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background-color: #f3f4f6;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
