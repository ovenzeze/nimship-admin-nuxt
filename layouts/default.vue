<template>
  <div class="app-container">
    <AppSidebar 
      :nav-items="menuItems" 
      :user="user" 
      :is-authenticated="isAuthenticated"
      @logout="handleLogout"
      @login="handleLogin"
    >
      <slot></slot>
    </AppSidebar>
  </div>
</template>

<script setup lang="ts">
/**
 * Default layout component
 * 
 * This component serves as the main layout for the application.
 * It includes the AppSidebar for navigation and user authentication,
 * and implements elastic scroll prevention.
 * 
 * @emits none
 * @slot default - The main content of the page
 */

import { useMenu } from '~/composables/useMenu'

const { menuItems } = useMenu()

const user = ref(null)
const isAuthenticated = ref(false)

const handleLogin = () => {
  // Implement login logic
  console.log('Login initiated')
}

const handleLogout = () => {
  // Implement logout logic
  console.log('Logout initiated')
}

// Prevent elastic scrolling
const preventDefault = (e: TouchEvent) => {
  e.preventDefault()
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', preventDefault, { passive: false })
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('touchmove', preventDefault)
})

</script>

<style scoped>
.app-container {
  @apply fixed inset-0 overflow-y-hidden overscroll-y-none;
  -webkit-overflow-scrolling: touch;
}

:global(body) {
  @apply overflow-hidden overscroll-y-none;
}
</style>
