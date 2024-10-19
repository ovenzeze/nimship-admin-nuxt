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
})
</script>

<style>
.app-container {
  @apply min-h-screen;
}

.content-container {
  @apply h-full overflow-y-auto;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 768px) {
  .content-container {
    @apply overflow-y-auto;
  }
}
</style>
