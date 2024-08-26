<template>
  <div class="component-tester">
    <div class="function-area p-4 bg-muted">
      <UiSelect v-model="selectedComponent" :options="componentOptions" />
    </div>
    <div class="component-display mt-4">
      <component :is="selectedComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FixedCard } from '#components'
// Define list of testable components
const componentOptions = [
  { value: 'FixedCard', label: 'Fixed Card', component: FixedCard },
  // Add more components...
]

const selectedComponent = ref(componentOptions[0].component)
</script>

<style scoped>
.component-tester {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.function-area {
  flex-shrink: 0;
}

.component-display {
  flex-grow: 1;
  overflow-y: auto;
}
</style>