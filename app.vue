<template>
  <div class="color-mode">
    <NuxtLayout>
      <NuxtPage />
      <Toaster />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
</script>

<style>
:root {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent;
  font-family: "Crimson Text", Inter var, Inter, system-ui, Noto Sans,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
    Noto Color Emoji;
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

body {
  padding-bottom: env(safe-area-inset-bottom);
}

/* for global page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

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
