<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
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
  font-family: 'Crimson Text', Inter var, Inter, system-ui, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
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

/* CSS */
.button-27 {
  appearance: none;
  background-color: #000000;
  border: 2px solid #1A1A1A;
  border-radius: 8px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-width: 0;
  outline: none;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
}

.button-27:disabled {
  pointer-events: none;
}

.button-27:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-27:active {
  box-shadow: none;
  transform: translateY(0);
}

body::-webkit-scrollbar {
  width: 0.125rem;
  height: 0.125rem;
}

body::-webkit-scrollbar-track {
  border-radius: 9999px;
  background-color: #f3f4f6;

}

body::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background-color: #f3f4f6;

}
.noscrollbar::-webkit-scrollbar {
  width: 0.125rem;
  height: 0.125rem;
}
.hidescrollbar::-webkit-scrollbar {
  width: 0rem;
  height: 0rem;
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
