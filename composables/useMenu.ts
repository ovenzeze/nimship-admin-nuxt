// composables/useMenu.ts


interface MenuItem {
  name: string;
  icon: string;
  href: string;
  active?: boolean;
  requiresAuth?: boolean;
  disabled?: boolean;
}

export function useMenu() {

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'ph:house', href: '/', active: true, requiresAuth: false, disabled: false },
    { name: 'Driver', icon: 'ph:car-simple', href: '/driver', active: false, requiresAuth: false, disabled: false },
    { name: 'Payment', icon: 'ph:credit-card', href: '/payment', active: false, requiresAuth: false, disabled: false },
    { name: 'Invoice', icon: 'ph:invoice-light', href: '/invoice', active: false, requiresAuth: false, disabled: false },
    { name: 'Customer', icon: 'ph:user-circle-light', href: '/customer', active: false, requiresAuth: false, disabled: false },
    { name: 'Deduction', icon: 'ph:credit-card', href: '/deduction', active: false, requiresAuth: false, disabled: false },
    { name: 'Import', icon: 'ph:cloud-arrow-up-light', href: '/upload', active: false, requiresAuth: false, disabled: false },
    { name: 'Settings', icon: 'ph:gear-six-light', href: '/config', active: false, requiresAuth: false, disabled: false },
  ]

  const addMenuItem = (item: Partial<MenuItem> & Pick<MenuItem, 'name' | 'icon' | 'href'>) => {
    const newItem: MenuItem = {
      name: item.name,
      icon: item.icon,
      href: item.href,
      active: item.active ?? false,
      requiresAuth: item.requiresAuth ?? false,
      disabled: item.disabled ?? false
    }
    menuItems.push(newItem)
  }

  const removeMenuItem = (name: string) => {
    const index = menuItems.findIndex(item => item.name === name)
    if (index !== -1) {
      menuItems.splice(index, 1)
    }
  }

  const updateMenuItem = (name: string, updates: Partial<MenuItem>) => {
    const item = menuItems.find(item => item.name === name)
    if (item) {
      Object.assign(item, updates)
    }
  }

  const setActiveMenuItem = (name: string) => {
    menuItems.forEach(item => {
      item.active = item.name === name
    })
  }

  return {
    menuItems,
    addMenuItem,
    removeMenuItem,
    updateMenuItem,
    setActiveMenuItem
  }
}