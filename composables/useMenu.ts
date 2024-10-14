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
    { name: 'Driver', icon: 'ph:car-simple', href: '/driverMangement', active: false, requiresAuth: false, disabled: false },
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
      href: '/docs',
      active: false,
      requiresAuth: false,
      disabled: false,
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

  // Add File Management menu item
  addMenuItem({
    name: 'File Management',
    icon: 'ph:folder',
    href: '/file-management',
    requiresAuth: true,
    children: [
      { name: 'All Files', icon: 'ph:files', href: '/file-management/all', requiresAuth: true },
      { name: 'Recent Files', icon: 'ph:clock', href: '/file-management/recent', requiresAuth: true },
      { name: 'Shared Files', icon: 'ph:share-network', href: '/file-management/shared', requiresAuth: true },
      { name: 'Upload File', icon: 'ph:upload-simple', href: '/file-management/upload', requiresAuth: true },
    ]
  })
}
