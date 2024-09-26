# useMenu Composable

## Overview
The `useMenu` composable is a crucial part of the Nimship Admin application, providing a centralized way to manage menu items. It offers functionality for adding, removing, updating, and filtering menu items, as well as managing their active states.

## Import
```javascript
import { useMenu } from '@/composables/useMenu'
```

## Returned Properties and Methods

### Properties
- `menuItems`: Ref<MenuItem[]> - A reactive array of menu items.

### Methods
- `addMenuItem(item: Partial<MenuItem> & Pick<MenuItem, 'name' | 'icon' | 'href'>): void` - Add a new menu item.
- `removeMenuItem(name: string): void` - Remove a menu item by its name.
- `updateMenuItem(name: string, updates: Partial<MenuItem>): void` - Update an existing menu item.
- `setActiveMenuItem(name: string): void` - Set a menu item as active based on its name.
- `filterMenuItemsByPermission(userPermissions: string[]): MenuItem[]` - Filter menu items based on user permissions.

## MenuItem Interface
```typescript
interface MenuItem {
  name: string;
  icon: string;
  href: string;
  active: boolean;
  requiresAuth: boolean;
  disabled: boolean;
  children?: MenuItem[];
}
```

## Usage Example
```vue
<script setup>
import { useMenu } from '@/composables/useMenu'

const { menuItems, addMenuItem, removeMenuItem, updateMenuItem, setActiveMenuItem, filterMenuItemsByPermission } = useMenu()

// Example: Add a new menu item
addMenuItem({
  name: 'New Item',
  icon: 'ph:plus',
  href: '/new-item',
  requiresAuth: true
})

// Example: Remove a menu item
removeMenuItem('Existing Item')

// Example: Update a menu item
updateMenuItem('Home', { active: true, disabled: false })

// Example: Set active menu item
setActiveMenuItem('Dashboard')

// Example: Filter menu items based on user permissions
const userPermissions = ['admin', 'editor']
const filteredMenu = filterMenuItemsByPermission(userPermissions)
</script>

<template>
  <nav>
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <a :href="item.href" :class="{ active: item.active, disabled: item.disabled }">
          <i :class="item.icon"></i>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>
```

## Local Storage Integration
The composable automatically saves menu items to local storage when changes occur and loads them on initialization (client-side only).

## Notes
- Menu items can have nested children, allowing for multi-level menu structures.
- The `filterMenuItemsByPermission` method allows for role-based menu filtering.
- Consider the performance implications when dealing with large menu structures, especially when filtering or updating items frequently.

## See Also
- [Vue 3 Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html)
- [Nuxt 3 Composables](https://nuxt.com/docs/guide/directory-structure/composables)
