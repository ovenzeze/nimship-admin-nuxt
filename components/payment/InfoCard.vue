<template>
  <div
    :class="[
      'bg-background px-3 py-1 md:py-4 flex flex-col justify-center md:justify-start transition-all ring-1 ring-border duration-300',
      'group-hover:z-10 animate-in fade-in duration-300',
      highlight ? 'font-semibold' : '',
      className
    ]"
  >
    <div class="flex flex-row items-center justify-center md:justify-between h-[22px] md:h-[60px] max-h-[60px] text-xs md:text-sm text-center md:text-left">
      <span class="text-xs md:text-sm transition-all duration-200 text-inherit/50 text-primary/50">
        {{ label }}
      </span>
      <Icon
        :name="icon"
        class="hidden md:block w-5 h-5 md:w-7 md:h-7 mr-2 text-primary/25 text-center group-hover:text-inherit transition-all duration-300"
      />
    </div>
    <div class="flex-1 text-xs md:text-xs font-semibold text-primary/75 group-hover:text-primary md:group-hover:text-sm content-center transition-all duration-300 text-center md:text-left">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string;
  icon: string;
  highlight?: boolean;
  className?: string;
}>();

</script>