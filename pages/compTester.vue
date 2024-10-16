<template>
  <div class="component-tester">
    <div class="function-area">
      <USelectMenu v-model="selectedCompName" :options="componentOptions" value-attribute="value"
        label-attribute="label" />
    </div>
    <div class="component-display mt-4">
      <component :is="selectedComp.component" v-bind="selectedComp.props" @update:modelValue="updateModelValue" />
    </div>
    <div v-if="selectedComp.value.startsWith('FilterItem')" class="mt-4">
      <p>Selected value: {{ selectedComp.modelValue }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { USelectMenu, FixedCard, DriverSelector, ButtonSwitcher, FilterItem } from '#components'
import { computed, ref } from 'vue';
import { EnumType } from '~/types'

const bSwitcher = ref()
const warehouseOptions: any[] = [
  { value: 'san', label: 'San Francisco', icon: 'ph:buildings' },
  { value: 'la', label: 'Los Angeles', icon: 'ph:warehouse' },
  { value: 'ny', label: 'New York', icon: 'ph:factory' },
  { value: 'chi', label: 'Chicago', icon: 'ph:truck' },
  { value: 'hou', label: 'Houston', icon: 'ph:package' },
  { value: 'mia', label: 'Miami', icon: 'ph:storefront' },
  { value: 'sea', label: 'Seattle', icon: 'ph:lighthouse' },
  { value: 'bos', label: 'Boston', icon: 'ph:buildings-bold' },
  { value: 'atl', label: 'Atlanta', icon: 'ph:airplane' },
  { value: 'dal', label: 'Dallas', icon: 'ph:train' }
];

const componentOptions = [
  { value: 'FixedCard', label: 'Fixed Card', component: FixedCard, props: { headerHeight: { mobile: 40, desktop: 50 }, footerHeight: { mobile: 40, desktop: 40 }, otherElementsHeight: { mobile: 110, desktop: 40 } } },
  { value: 'DriverSelector', label: 'Driver Selector', component: DriverSelector, props: {} },
  { value: 'ButtonSwitcher', label: 'Button Switcher', component: ButtonSwitcher, props: { options: warehouseOptions, modelValue: bSwitcher } },
  {
    value: 'FilterItem-Cycle',
    label: 'Filter Item - Cycle',
    component: FilterItem,
    props: {
      config: { key: 'cycle', placeholder: 'Cycle', enumType: EnumType.CYCLE, selectFirstOption: true },
    },
    modelValue: ref(null)
  },
  {
    value: 'FilterItem-Warehouse',
    label: 'Filter Item - Warehouse',
    component: FilterItem,
    props: {
      config: { key: 'warehouse', placeholder: 'Warehouse', enumType: EnumType.WAREHOUSE_CODE },
    },
    modelValue: ref(null)
  },
  {
    value: 'FilterItem-Team',
    label: 'Filter Item - Team',
    component: FilterItem,
    props: {
      config: { key: 'team', placeholder: 'Team', enumType: EnumType.TEAM_NAME },
    },
    modelValue: ref(null)
  },
  {
    value: 'FilterItem-DriverType',
    label: 'Filter Item - Driver Type',
    component: FilterItem,
    props: {
      config: { key: 'driverType', placeholder: 'Driver Type', enumType: EnumType.DRIVER_TYPE },
    },
    modelValue: ref(null)
  },
  {
    value: 'FilterItem-Status',
    label: 'Filter Item - Status',
    component: FilterItem,
    props: {
      config: { key: 'status', placeholder: 'Status', enumType: EnumType.STATUS },
    },
    modelValue: ref(null)
  },
]

const selectedCompName = ref(componentOptions[0].value)
const selectedComp = computed(() => componentOptions.find((comp) => comp.value === selectedCompName.value))

const updateModelValue = (newValue: any) => {
  if (selectedComp.value && 'modelValue' in selectedComp.value) {
    selectedComp.value.modelValue.value = newValue;
  }
}
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
