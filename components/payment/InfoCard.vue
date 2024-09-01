<template>
  <div :class="[
    'px-3 md:py-10 flex flex-col justify-center transition-all duration-300',
    'group-hover:z-10 animate-in fade-in duration-300',
    highlight ? 'font-semibold' : '',
  ]">
    <div
      class="flex flex-row items-center justify-center md:justify-between text-xs md:text-sm text-center md:text-left mt-4">
      <span
        class="text-xs md:text-sm transition-all duration-200 text-foreground/50 group-hover:text-foreground/75 md:group-hover:text-base">
        {{ label }}
      </span>
      <Icon :name="icon"
        class="hidden md:block w-5 h-5 md:w-7 md:h-7 mr-2 text-foreground/50 text-center group-hover:text-foreground group-hover:scale-110 transition-all duration-300" />
    </div>
    <div
      class="relative flex-1 text-sm text-foreground/90 group-hover:text-foreground md:group-hover:text-base content-center transition-all duration-300 text-center md:text-left overflow-hidden min-h-6 md:min-h-8 mt-2">
      <TransitionGroup name="slide" tag="div" class="absolute inset-0">
        <div :key="value" class="h-full flex items-center justify-center md:justify-start text-foreground">
          {{ value }}
        </div>
      </TransitionGroup>
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

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
  width: 100%;
  opacity: 0;
}

.slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>