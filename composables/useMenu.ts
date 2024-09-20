// composables/useMenu.ts
import { ref, watch } from 'vue'

interface MenuItem {
  name: string;
  icon: string;
  href: string;
  active?: boolean;
  requiresAuth?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
}

export function useMenu() {
  const menuItems = ref<MenuItem[]>([
    { name: 'Dashboard', icon: 'ph:house', href: '/', active: true, requiresAuth: false, disabled: false },
    { name: 'Driver', icon: 'ph:car-simple', href: '/driver', active: false, requiresAuth: false, disabled: false },
    { name: 'Payment', icon: 'ph:credit-card', href: '/payment', active: false, requiresAuth: false, disabled: false },
    { name: 'Delivery', icon: 'ph:package', href: '/delivery', active: false, requiresAuth: false, disabled: false },
    { name: 'Invoice', icon: 'ph:invoice-light', href: '/invoice', active: false, requiresAuth: false, disabled: false },
    { name: 'Customer', icon: 'ph:user-circle-light', href: '/customer', active: false, requiresAuth: false, disabled: false },
    { name: 'Deduction', icon: 'ph:credit-card', href: '/deduction', active: false, requiresAuth: false, disabled: false },
    { name: 'Import', icon: 'ph:cloud-arrow-up-light', href: '/upload', active: false, requiresAuth: false, disabled: false },
    { name: 'CompTester', icon: 'ph:test-tube-light', href: '/comptester', active: false, requiresAuth: false, disabled: false },
    { name: 'Settings', icon: 'ph:gear-six-light', href: '/config', active: false, requiresAuth: false, disabled: false },
    {
      name: 'Documentation',
      icon: 'ph:book-open',
      href: '/documentation',
      active: false,
      requiresAuth: false,
      disabled: false,
      children: [
        { name: 'Project Structure', icon: 'ph:tree-structure', href: '/documentation/project-structure', active: false, requiresAuth: false, disabled: false },
        { name: 'API Documentation', icon: 'ph:api', href: '/documentation/api-documentation', active: false, requiresAuth: false, disabled: false },
        { name: 'UI Components', icon: 'ph:layout', href: '/documentation/ui-components', active: false, requiresAuth: false, disabled: false },
        { name: 'Mobile Responsiveness', icon: 'ph:device-mobile', href: '/documentation/mobile-responsiveness', active: false, requiresAuth: false, disabled: false },
        { name: 'Testing Instructions', icon: 'ph:test-tube', href: '/documentation/test-instruction', active: false, requiresAuth: false, disabled: false },
        { name: 'Package Compatibility', icon: 'ph:package', href: '/documentation/package-compatibility', active: false, requiresAuth: false, disabled: false },
        { name: 'Onboarding', icon: 'ph:user-plus', href: '/documentation/onboarding', active: false, requiresAuth: false, disabled: false },
        { name: 'Puppeteer Setup', icon: 'ph:browser', href: '/documentation/puppeteer-setup', active: false, requiresAuth: false, disabled: false },
        { name: 'Git CLI Instructions', icon: 'ph:git-branch', href: '/documentation/gitcli-instruction', active: false, requiresAuth: false, disabled: false },
      ]
    },
  ])

  if (process.client) {
    // Load menu items from local storage on initialization
    const storedMenuItems = localStorage.getItem('menuItems')
    if (storedMenuItems) {
      menuItems.value = JSON.parse(storedMenuItems)
    }

    // Watch for changes and save to local storage
    watch(menuItems, (newMenuItems) => {
      localStorage.setItem('menuItems', JSON.stringify(newMenuItems))
    }, { deep: true })
  }

  const addMenuItem = (item: Partial<MenuItem> & Pick<MenuItem, 'name' | 'icon' | 'href'>) => {
    const newItem: MenuItem = {
      name: item.name,
      icon: item.icon,
      href: item.href,
      active: item.active ?? false,
      requiresAuth: item.requiresAuth ?? false,
      disabled: item.disabled ?? false,
      children: item.children ?? []
    }
    menuItems.value.push(newItem)
  }

  const removeMenuItem = (name: string) => {
    const index = menuItems.value.findIndex(item => item.name === name)
    if (index !== -1) {
      menuItems.value.splice(index, 1)
    } else {
      console.warn(`Menu item '${name}' not found.`)
    }
  }

  const updateMenuItem = (name: string, updates: Partial<MenuItem>) => {
    const item = menuItems.value.find(item => item.name === name)
    if (item) {
      Object.assign(item, updates)
    } else {
      console.warn(`Menu item '${name}' not found.`)
    }
  }

  const setActiveMenuItem = (name: string) => {
    menuItems.value.forEach(item => {
      item.active = item.name === name
      if (item.children) {
        item.children.forEach(child => {
          child.active = child.name === name
        })
      }
    })
  }

  const filterMenuItemsByPermission = (userPermissions: string[]) => {
    return menuItems.value.filter(item => {
      if (item.requiresAuth) {
        return userPermissions.some(permission => item.name.toLowerCase().includes(permission.toLowerCase()))
      }
      return true
    })
  }

  return {
    menuItems,
    addMenuItem,
    removeMenuItem,
    updateMenuItem,
    setActiveMenuItem,
    filterMenuItemsByPermission
  }
}
