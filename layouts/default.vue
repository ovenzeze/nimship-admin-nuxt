<template>
  <div class="app-container">
    <AppSidebar :nav-items="menuItems" :user="user" :is-authenticated="isAuthenticated" @logout="handleLogout"
      @login="handleLogin">
      <div class="content-container">
        <slot></slot>
      </div>
    </AppSidebar>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '~/composables/useMenu'

const { menuItems } = useMenu()

const user = ref(null)
const isAuthenticated = ref(false)

const handleLogin = () => {
  console.log('Login initiated')
}

const handleLogout = () => {
  console.log('Logout initiated')
}

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  if (!isMobile.value) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.app-container {
  @apply fixed inset-0 overflow-hidden;
}

.content-container {
  @apply h-full overflow-y-auto overscroll-y-contain;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 768px) {
  .content-container {
    @apply overflow-y-scroll;
  }
}

:global(body) {
  @apply overscroll-y-none;
}
</style>
