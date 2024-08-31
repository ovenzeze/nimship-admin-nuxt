<template>
  <div class="component-tester">
    <div class="function-area">
      <USelectMenu v-model="selectedCompName" :options="componentOptions" />
    </div>
    <div class="component-display mt-4">
      <component :is="selectedComp" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { USelectMenu, FixedCard } from '#components'
const componentOptions = [
  { value: 'FixedCard', label: 'Fixed Card', component: FixedCard },
]
const selectedCompName = ref(componentOptions[0].value)
const selectedComp = componentOptions.find(comp => comp.value === selectedCompName.value)?.component
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