<template>
    <div class="driver-filter h-full w-full flex flex-row items-center justify-between" role="region"
        aria-label="Filter options">
        <!-- Common structure for both mobile and desktop -->
        <div :class="{
            'py-2 w-full flex flex-row': !isMobile,
            'fixed inset-x-0 bottom-0 bg-background/20 backdrop-blur-sm rounded-t-xl z-40 max-h-[100svh] h-[100svh] pt-[50svh] overflow-y-auto transition-all duration-300 ease-in-out': isMobile,
            'translate-y-0': isMobile && !isFilterPanelOpen,
            'translate-y-full': isMobile && isFilterPanelOpen,
        }">
            <div class="h-full w-full  px-4 py-2 flex flex-col md:flex-row justify-stretch md:justify-between"
                :class="{ 'rounded-t-2xl border-t-2 border-emerald-600': isMobile }">
                <div :class="{ 'flex items-start justify-between mb-4 p-4': isMobile }">
                    <h2 v-if="isMobile" class="text-lg font-semibold">Filter Options</h2>
                    <UButton v-if="isMobile" variant="ghost" icon="i-heroicons-x-mark" @click="toggleFilterPanel" />
                </div>

                <DriverSelector />

                <div :class="{ 'w-full flex flex-wrap gap-2 flex-row justify-end z-30': !isMobile, 'py-4': isMobile }">
                    <USelectMenu v-for="filter in filterConfigs" :key="filter.key" v-model="filterParams[filter.key]"
                        :options="filter.options" :placeholder="filter.placeholder" :multiple="filter.multiple"
                        option-attribute="label" value-attribute="value" :aria-label="`Select ${filter.placeholder}`"
                        :ui="{ container: 'z-20 group', ring: 'sm:ring-0 md:ring-0' }" class="ring-0" variant="none"
                        size="md">
                        <template #label>
                            <span class="inline-block min-w-[60px] uppercase ring-0 text-xs py-0.5"> {{
                                filterParams[filter.key] ?
                                    filterParams[filter.key] :
                                    filter.placeholder }}
                            </span>
                        </template>
                        <template #option-empty="{ query }">
                            <q>{{ query }}</q> not found
                        </template>
                    </USelectMenu>

                    <UButton variant="ghost" @click="clearAllFilters" icon="i-ph-funnel">
                        Reset
                    </UButton>
                </div>
            </div>
        </div>
        <!-- Mobile floating button -->
        <Button v-if="isMobile" @click="toggleFilterPanel"
            class="md:hidden fixed bottom-16 -right-2 z-40 bg-foreground box-content rounded-tl-full rounded-bl-full pr-1 pl-2 py-0 scale-90"
            size="icon">
            <Icon name="ph:funnel" class="w-5 h-5 text-background" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useEnums } from '~/composables/useEnums'
import { EnumType, type driverTypes, type FilterConfig } from '~/types'
import { useDevice } from '~/composables/useDevice'


const props = defineProps<{
    filters: driverTypes['DriverFilters']
}>()

const emit = defineEmits<{
    (e: 'update:filter', filters: driverTypes['DriverFilters']): void
}>()

const { getEnumsByType, waitForEnums } = useEnums()
const { isMobile } = useDevice()
const filterParams = ref({})
const isFilterPanelOpen = ref(false)

const filterConfigs = ref<FilterConfig[]>([
    {
        type: 'select',
        key: 'employment_status',
        as: 'Button',
        placeholder: 'Status',
        enumType: '',
        options: ['Employed', 'Onboarding', 'Terminated'].map((value) => ({ value, label: String(value).toUpperCase() })),
    },
    {
        type: 'select',
        key: 'warehouse',
        as: 'Select',
        placeholder: 'Warehouse',
        enumType: EnumType.WAREHOUSE_CODE,
        dynamicOptions: true,
        options: []
    },
    {
        type: 'select',
        key: 'team',
        as: 'Select',
        placeholder: 'Team',
        dynamicOptions: true,

        enumType: EnumType.TEAM_NAME,
        options: []

    },
    // {
    //     type: 'select',
    //     key: 'driver_id',
    //     dynamicOptions: true,

    //     as: 'Select',
    //     enumType: '',
    //     placeholder: 'Driver ID',
    //     options: []

    // },
    // {
    //     type: 'select',
    //     key: 'cycle_start',
    //     dynamicOptions: true,
    //     as: 'Select',
    //     enumType: '',
    //     placeholder: 'Cycle Start',
    //     options: []
    // },
    // Add other filter configs here
])

const toggleFilterPanel = () => {
    isFilterPanelOpen.value = !isFilterPanelOpen.value
}

const handleFilterChange = () => {
    emit('update:filter', filterParams.value)
}

const clearAllFilters = () => {
    for (const key in filterParams.value) {
        if (Array.isArray(filterParams.value[key])) {
            filterParams.value[key] = []
        } else {
            filterParams.value[key] = null
        }
    }
    handleFilterChange()
}

// Watch for changes in props.filters and update localFilters
watch(() => filterParams.value, (newFilters) => {
    console.log('[localFilters]:', newFilters)
    emit('update:filter', filterParams.value)
}, { deep: true })

// Initialize filters with enum values if needed
onMounted(async () => {
    await waitForEnums()
    for (const config of filterConfigs.value) {
        if (config.dynamicOptions) {
            const options = await getEnumsByType(config.enumType as EnumType)
            config.options = options.map(option => ({
                value: option.value,
                label: option.label
            }))
        }
    }
    console.log('[filterConfigs]:', filterConfigs.value)
})
</script>