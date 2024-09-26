<template>
  <div>
    <Collapsible v-if="isDirectory">
      <CollapsibleTrigger
        class="flex items-center justify-between w-full p-2 text-sm font-medium text-left rounded-md hover:bg-accent hover:text-accent-foreground">
        {{ formatTitle(link.title) }}
        <ChevronDown class="w-4 h-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="pl-4 space-y-1 text-sm">
          <DocsSidebarItem v-for="childLink in link.children" :key="childLink._path" :link="childLink"
            :current-path="currentPath" />
        </div>
      </CollapsibleContent>
    </Collapsible>
    <NuxtLink v-else :to="link._path" class="flex items-center w-full p-2 text-sm rounded-md hover:underline"
      :class="{ 'bg-accent text-accent-foreground font-medium': isActive(link._path) }">
      {{ formatTitle(link.title) }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  link: {
    _path: string;
    title: string;
    children?: Array<{ _path: string; title: string; children?: Array<any> }>;
  };
  currentPath: string;
}>()

const isActive = (path: string) => props.currentPath === path

const formatTitle = (title: string): string => {
  title = title.replace(/\.[^/.]+$/, "")
  title = title.replace(/_/g, ' ')
  return title.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const isDirectory = computed(() => {
  return props.link.children && props.link.children.length > 0
})
</script>
