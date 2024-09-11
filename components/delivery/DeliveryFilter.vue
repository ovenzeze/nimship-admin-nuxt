<template>
    <NimshipFilter v-model="filters" :filters="filterConfigs" @update:modelValue="handleFilterUpdate" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEnums } from '~/composables/useEnums'
import NimshipFilter from '~/components/base/NimshipFilter.vue'

const emit = defineEmits(['update:filter'])
const { getEnumsByType, waitForEnums } = useEnums()

const filters = ref({
    warehouse_id: null,
    cycle_start: null,
    team: null,
    driver_id: null
})

const filterConfigs = ref([
    {
        type: 'select' as const,
        key: 'warehouse_id',
        placeholder: 'Warehouse',
        enumType: 'WAREHOUSE_CODE'
    },
    {
        type: 'select' as const,
        key: 'cycle_start',
        placeholder: 'Pay Cycle',
        enumType: 'CYCLE'
    },
    {
        type: 'select' as const,
        key: 'team',
        placeholder: 'Team',
        enumType: 'TEAM_NAME'
    },
    {
        type: 'driver-selector' as const,
        key: 'driver_id',
        placeholder: 'Driver'
    }
])

const handleFilterUpdate = (newFilters: typeof filters.value) => {
    filters.value = newFilters
    emit('update:filter', newFilters)
}

onMounted(async () => {
    await waitForEnums()
    // The NimshipFilter component will handle loading enum data
})
</script><template>
    <NimshipFilter v-model="filters" :filters="filterConfigs" @update:modelValue="handleFilterUpdate" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEnums } from '~/composables/useEnums'
import NimshipFilter from '~/components/base/NimshipFilter.vue'

const emit = defineEmits(['update:filter'])
const { getEnumsByType, waitForEnums } = useEnums()

const filters = ref({
    warehouse_id: null,
    cycle_start: null,
    team: null,
    driver_id: null
})

const filterConfigs = ref([
    {
        type: 'select' as const,
        key: 'warehouse_id',
        placeholder: 'Warehouse',
        enumType: 'WAREHOUSE_CODE'
    },
    {
        type: 'select' as const,
        key: 'cycle_start',
        placeholder: 'Pay Cycle',
        enumType: 'CYCLE'
    },
    {
        type: 'select' as const,
        key: 'team',
        placeholder: 'Team',
        enumType: 'TEAM_NAME'
    },
    {
        type: 'driver-selector' as const,
        key: 'driver_id',
        placeholder: 'Driver'
    }
])

const handleFilterUpdate = (newFilters: typeof filters.value) => {
    filters.value = newFilters
    emit('update:filter', newFilters)
}

onMounted(async () => {
    await waitForEnums()
    // The NimshipFilter component will handle loading enum data
})
</script>
