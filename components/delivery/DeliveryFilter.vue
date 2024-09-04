<template>
    <div class="relative md:mr-4">
        <Button @click="toggleFilterPanel" variant="outline" size="sm">
            <Icon name="ph:funnel" class="w-4 h-4 mr-2" />
            Filter
        </Button>
        <!-- <Dialog v-model:open="isFilterPanelOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filter Delivery Records</DialogTitle>
                </DialogHeader>
                <div class="grid gap-4">
                    <DateRangePicker v-model="filters.dateRange" />
                    <Select v-model="filters.warehouse" :options="warehouseOptions" placeholder="Select Warehouse" />
                    <Select v-model="filters.status" :options="statusOptions" placeholder="Select Status" />
                    <Select v-model="filters.driver" :options="driverOptions" placeholder="Select Driver" />
                </div>
                <DialogFooter>
                    <Button @click="applyFilters">Apply Filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog> -->
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isFilterPanelOpen = ref(false)
const filters = ref({
    dateRange: null,
    warehouse: null,
    status: null,
    driver: null,
})

const warehouseOptions = [/* ... */]
const statusOptions = [/* ... */]
const driverOptions = [/* ... */]

const toggleFilterPanel = () => {
    isFilterPanelOpen.value = !isFilterPanelOpen.value
}

const applyFilters = () => {
    emit('update:filter', filters.value)
    isFilterPanelOpen.value = false
}

defineEmits(['update:filter'])
</script>