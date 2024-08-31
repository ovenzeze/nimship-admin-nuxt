<template>
  <div
    class="w-full flex group transition-all duration-300 flex-col md:flex-row md:items-center border-b border-collapse border-foreground/10 hover:border-foreground">
    <div class="flex justify-center items-center md:w-24 py-3 md:py-0">
      <div
        class="flex flex-row justify-center items-center md:w-24 group-hover:brightness-100 brightness-90 transition-all duration-300">
        <Icon :name="icon"
          :class="['w-6 h-6 mr-2 md:w-8 md:h-8 group-hover:brightness-100 brightness-50 transition-all duration-300', colorMap[themeColor]]" />
        <span class="md:hidden text-base">{{ label }}</span>
      </div>
    </div>
    <div :class="['flex-1 grid grid-cols-2 lg:grid-cols-4', colorMap[themeColor]]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  label: string;
  icon: string;
  themeColor: 'blue' | 'green' | 'purple' | 'orange';
}>();

const colorMap = {
  blue: 'text-blue-500 dark:text-blue-400',
  green: 'text-green-600 dark:text-green-400',
  purple: 'text-purple-600 dark:text-purple-400',
  orange: 'text-orange-600 dark:text-orange-400',
};
</script>