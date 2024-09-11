<template>
    <div
        class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center flex-wrap gap-4 overflow-x-auto">
        <div class="flex-grow">
            <NimshipFilter :filters="filterConfigs" v-model="filters" @update:modelValue="handleFilterChange" />
        </div>
        <div class="flex items-center gap-4 flex-shrink-0">
            <Button @click="addNewDriver" variant="secondary">
                <PlusCircle class="mr-2 h-4 w-4" />
                Add New Driver
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useEnums } from '~/composables/useEnums'
import type { DriverFilters } from '~/types'
import { EnumType } from '~/types'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-vue-next'
import NimshipFilter from '~/components/base/NimshipFilter.vue'

const emit = defineEmits<{
    'update:filter': [filters: DriverFilters]
    'add-new-driver': []
}>()

const { getEnumsByType, waitForEnums } = useEnums()

const filters = ref<DriverFilters>({
    warehouse: null,
    team_name: '',
    driver_type: null,
    status: null,
    employment_status: null,
})

type FilterConfig = {
    type: 'select' | 'driver-selector';
    key: string;
    placeholder: string;
    enumType: EnumType;
    as?: 'Button' | 'Select' | 'auto';
    options?: { value: string, label: string }[];
};

const filterConfigs = ref<FilterConfig[]>([
    {
        type: 'select',
        key: 'warehouse',
        as: 'Button',
        placeholder: 'Warehouse',
        enumType: EnumType.WAREHOUSE_CODE
    },
    {
        type: 'select',
        key: 'team_name',
        as: 'Select',
        placeholder: 'Team',
        enumType: EnumType.TEAM_NAME
    },
    {
        type: 'select',
        key: 'driver_type',
        as: 'auto',
        placeholder: 'Driver Type',
        enumType: EnumType.DRIVER_TYPE
    },
    {
        type: 'select',
        key: 'status',
        as: 'auto',
        placeholder: 'Status',
        enumType: EnumType.STATUS
    },
    {
        type: 'select',
        key: 'employment_status',
        as: 'auto',
        placeholder: 'Employment Status',
        enumType: EnumType.EMPLOYMENT_STATUS
    }
])

const handleFilterChange = (newFilters: Partial<DriverFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    emit('update:filter', filters.value)
}

const addNewDriver = () => {
    emit('add-new-driver')
}

watch(filters, (newFilters) => {
    emit('update:filter', newFilters)
}, { deep: true })

// Load enum options
const loadEnumOptions = async () => {
    await waitForEnums()
    for (const filter of filterConfigs.value) {
        if (filter.type === 'select' && filter.enumType) {
            const enumData = await getEnumsByType(filter.enumType)
            console.log(`Enum data for ${filter.key}:`, enumData)
            filter.options = enumData.map(item => ({ value: item.value, label: item.label }))
        }
    }
}

onMounted(async () => {
    console.log('DriverFilter: onMounted')
    await loadEnumOptions()
    console.log('DriverFilter: Enum options loaded', filterConfigs.value)
})
</script>

<style scoped>
.overflow-x-auto {
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
}
</style>
