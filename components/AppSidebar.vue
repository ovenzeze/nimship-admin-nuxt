<template>
  <aside class="fixed inset-y-0 left-0 z-10 flex w-14 flex-col border-r bg-background">
    <nav class="flex flex-col items-center gap-4 px-2 py-5">
      <a
        href="#"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground"
      >
        <Icon name="ph:package-duotone" class="h-4 w-4" />
        <span class="sr-only">Acme Inc</span>
      </a>
      <div 
        v-for="item in navItems" 
        :key="item.name" 
        class="relative w-full"
        @mouseenter="hoveredItem = item.name"
        @mouseleave="hoveredItem = null"
      >
        <a
          :href="item.href"
          :class="[
            'flex h-9 items-center rounded-lg transition-all duration-300 ease-in-out',
            item.active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            hoveredItem === item.name ? 'w-48 justify-start pl-2 pr-4' : 'w-10 justify-center',
          ]"
        >
          <Icon :name="item.icon" class="h-5 w-5 shrink-0" />
          <span 
            :class="[
              'ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
              hoveredItem === item.name ? 'max-w-48 opacity-100' : 'max-w-0 opacity-0'
            ]"
          >
            {{ item.name }}
          </span>
        </a>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">

interface NavItem {
  name: string;
  icon: string;
  href: string;
  active?: boolean;
}

defineProps<{
  navItems: NavItem[];
}>()

const hoveredItem = ref<string | null>(null)
</script>