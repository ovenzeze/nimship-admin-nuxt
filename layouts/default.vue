<template>
  <AppSidebar 
    :nav-items="navItems" 
    :user="user" 
    :is-authenticated="isAuthenticated"
    @logout="handleLogout"
    @login="handleLogin"
  >
    <slot></slot>
  </AppSidebar>
</template>

<script setup>

const navItems = ref([
  { name: 'Dashboard', icon: 'ph:house', href: '/', active: true, requiresAuth: false },
  { name: 'Invoice', icon: 'ph:invoice-light', href: '/invoice', active: false, requiresAuth: false },
  { name: 'Driver', icon: 'ph:car-simple', href: '/driver', active: false, requiresAuth: false },
  { name: 'Settings', icon: 'ph:gear-six-light', href: '/settings', active: false, requiresAuth: false },
  
  // ... 其他导航项
]);

const user = ref(null);
const isAuthenticated = ref(false);

const handleLogin = () => {
  // 实现登录逻辑
};

const handleLogout = () => {
  // 实现登出逻辑
};

// 其他必要的逻辑...
</script>