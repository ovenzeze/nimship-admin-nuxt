<template>
  <aside class="w-64 bg-gray-100 dark:bg-gray-800 overflow-y-auto h-full">
    <nav class="p-4">
      <ContentNavigation v-slot="{ navigation }">
        <ul class="space-y-2">
          <li v-for="link of navigation" :key="link._path">
            <DocsSidebarItem :link="link" :current-path="currentPath" />
          </li>
        </ul>
      </ContentNavigation>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = computed(() => route.path)
</script>
