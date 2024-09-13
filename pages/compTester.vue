<template>
  <div class="component-tester">
    <div class="function-area">
      <USelectMenu v-model="selectedCompName" :options="componentOptions" value-attribute="value"
        label-attribute="label" />
    </div>
    <div class="component-display mt-4">
      <component :is="selectedComp.component" v-bind="selectedComp.props" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { USelectMenu, FixedCard, DriverSelector } from '#components'
const componentOptions = [
  { value: 'FixedCard', label: 'Fixed Card', component: FixedCard, props: { headerHeight: { mobile: 40, desktop: 50 }, footerHeight: { mobile: 40, desktop: 40 }, otherElementsHeight: { mobile: 110, desktop: 40 } } },
  { value: 'DriverSelector', label: 'Driver Selector', component: DriverSelector, props: {} },
]
const selectedCompName = ref(componentOptions[0].value)
const selectedComp = computed(() => componentOptions.find((comp) => comp.value === selectedCompName.value)!)
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