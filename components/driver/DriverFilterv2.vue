<!-- DriverFilters.vue -->
<template>
    <div class="w-64 flex-shrink-0 p-4 border-r border-gray-200 overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4">Filters</h3>

        <!-- Search Input -->
        <div class="mb-4">
            <UInput v-model="searchQuery" placeholder="Search drivers..." icon="i-heroicons-magnifying-glass-20-solid"
                @update:model-value="emitSearch" />
        </div>

        <!-- Status Filter -->
        <div class="mb-4">
            <h4 class="font-medium mb-2">Status</h4>
            <UCheckbox v-for="status in statusOptions" :key="status" v-model="selectedStatuses" :label="status"
                :value="status" @update:model-value="emitStatusFilter" />
        </div>

        <!-- Warehouse Filter -->
        <div class="mb-4">
            <h4 class="font-medium mb-2">Warehouse</h4>
            <USelect v-model="selectedWarehouse" :options="warehouseOptions" placeholder="Select warehouse" />
        </div>

        <!-- Driver Type Filter -->
        <div class="mb-4">
            <h4 class="font-medium mb-2">Driver Type</h4>
            <USelect v-model="selectedDriverType" :options="driverTypeOptions" placeholder="Select driver type" />
        </div>

        <!-- Date Range Filter -->
        <div class="mb-4">
            <h4 class="font-medium mb-2">Enroll Date Range</h4>
            <UDatePicker v-model="dateRange" range />
        </div>

        <!-- Clear Filters Button -->
        <UButton class="w-full" color="gray" variant="outline" @click="clearFilters">
            Clear Filters
        </UButton>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    statusFilter: string[]
}>()

const emit = defineEmits<{
    (e: 'update:search', value: string): void
    (e: 'update:statusFilter', value: string[]): void
}>()

const searchQuery = ref('')
const selectedStatuses = ref(props.statusFilter)
const selectedWarehouse = ref('')
const selectedDriverType = ref('')
const dateRange = ref()

const statusOptions = ['Active', 'Inactive', 'Pending']
const warehouseOptions = [
    { label: 'Warehouse A', value: 'A' },
    { label: 'Warehouse B', value: 'B' },
    { label: 'Warehouse C', value: 'C' },
]
const driverTypeOptions = [
    { label: 'Full-time', value: 'full-time' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Contract', value: 'contract' },
]

const emitSearch = () => {
    emit('update:search', searchQuery.value)
}

const emitStatusFilter = () => {
    emit('update:statusFilter', selectedStatuses.value)
}

const clearFilters = () => {
    searchQuery.value = ''
    selectedStatuses.value = []
    selectedWarehouse.value = ''
    selectedDriverType.value = ''
    dateRange.value = null
    emitSearch()
    emitStatusFilter()
}

watch(() => props.statusFilter, (newValue) => {
    selectedStatuses.value = newValue
})
</script>