<template>
  <div class="flex space-x-4 mb-4">
    <Select v-model="filters.warehouse" placeholder="Select Warehouse">
      <!-- Add warehouse options -->
    </Select>
    <Select v-model="filters.team_name" placeholder="Select Team">
      <!-- Add team options -->
    </Select>
    <Select v-model="filters.driver_type" placeholder="Select Driver Type">
      <!-- Add driver type options -->
    </Select>
    <Select v-model="filters.status" placeholder="Select Status">
      <!-- Add status options -->
    </Select>
    <Select v-model="filters.employment_status" placeholder="Select Employment Status">
      <!-- Add employment status options -->
    </Select>
    <Button @click="applyFilters">Apply Filters</Button>
    <Button @click="resetFilters" variant="outline">Reset</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DriverFilters } from '~/types'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  filters: DriverFilters
}>()

const emit = defineEmits<{
  (e: 'update:filter', filters: DriverFilters): void
  (e: 'add-new-driver'): void
  (e: 'update:dimensions', dimensions: any): void
  (e: 'reset-dimensions'): void
}>()

const filters = ref<DriverFilters>({ ...props.filters })

watch(props.filters, (newFilters) => {
  filters.value = { ...newFilters }
})

const applyFilters = () => {
  emit('update:filter', filters.value)
}

const resetFilters = () => {
  filters.value = {
    warehouse: null,
    team_name: '',
    driver_type: null,
    status: null,
    employment_status: null,
  }
  emit('update:filter', filters.value)
}
</script>
