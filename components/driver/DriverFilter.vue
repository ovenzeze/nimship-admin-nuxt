<template>
    <div class="driver-filter">
        <!-- Common structure for both mobile and desktop -->
        <div :class="{
            'bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60': !isMobile,
            'fixed inset-x-0 bottom-0 bg-background rounded-t-xl z-40 max-h-[80vh] h-[50vh] overflow-y-auto transition-all duration-300 ease-in-out': isMobile,
            'translate-y-full': isMobile && !isFilterPanelOpen,
            'translate-y-0': isMobile && isFilterPanelOpen,
        }">
            <div :class="{ 'flex  items-start justify-between mb-4 p-4': isMobile }">
                <h2 v-if="isMobile" class="text-lg font-semibold">Filter Options</h2>
                <Button v-if="isMobile" variant="ghost" size="icon" @click="toggleFilterPanel">
                    <Icon name="ph:x" class="w-5 h-5" />
                </Button>
            </div>
            <div :class="{ 'flex flex-wrap gap-4': !isMobile }">
                <div :class="{ 'flex-grow': !isMobile, 'mb-4': isMobile }">
                    <NimshipFilter :filters="filterConfigs" v-model="filters" @update:modelValue="handleFilterChange" />
                </div>
                <div :class="{ 'flex-shrink-0': !isMobile, 'mt-4 px-auto': isMobile }">
                    <Button @click="addNewDriver" variant="secondary"
                        :class="{ 'w-[90vw] ': isMobile, 'h-9': !isMobile }">
                        <PlusCircle class="mr-2 h-4 w-4" />
                        Add New Driver
                    </Button>
                </div>
            </div>
        </div>

        <!-- Mobile floating button -->
        <Button v-if="isMobile" @click="toggleFilterPanel"
            class="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 flex items-center justify-center" size="icon"
            variant="default">
            <Icon v-if="!isFilterPanelOpen" name="ph:funnel" class="w-6 h-6" />
            <Icon v-else name="ph:x" class="w-6 h-6" />
        </Button>
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
import { useDevice } from '~/composables/useDevice'

const emit = defineEmits<{
    'update:filter': [filters: DriverFilters]
    'add-new-driver': []
}>()

const { getEnumsByType, waitForEnums } = useEnums()
const { isMobile } = useDevice()

const filters = ref<DriverFilters>({
    warehouse: null,
    team_name: '',
    driver_type: null,
    status: null,
    employment_status: null,
})

const isFilterPanelOpen = ref(false)

type FilterConfig = {
    type: 'select' | 'driver-selector'
    key: string
    placeholder: string
    enumType: EnumType
    as?: 'Button' | 'Select' | 'auto'
    options?: { value: string; label: string }[]
}

const filterConfigs = ref<FilterConfig[]>([
    {
        type: 'select',
        key: 'warehouse',
        as: 'Button',
        placeholder: 'Warehouse',
        enumType: EnumType.WAREHOUSE_CODE,
    },
    {
        type: 'select',
        key: 'employment_status',
        as: 'Button',
        placeholder: 'Status',
        options: ['Employed', 'Onboarding', 'Quit'].map((value) => ({ value, label: String(value).toUpperCase() })),
    },
    {
        type: 'select',
        key: 'team_name',
        as: 'Select',
        placeholder: 'Team',
        enumType: EnumType.TEAM_NAME,
    },
])

const handleFilterChange = (newFilters: Partial<DriverFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    emit('update:filter', filters.value)
}

const addNewDriver = () => {
    emit('add-new-driver')
}

const toggleFilterPanel = () => {
    isFilterPanelOpen.value = !isFilterPanelOpen.value
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
            filter.options = enumData.map((item) => ({ value: item.value, label: item.label }))
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
.driver-filter {
    position: relative;
}
</style>
