<template>
    <div class="nimship-filter" :class="{ 'mobile': isMobile }">
        <div class="flex items-start justify-between" :class="{ 'flex-col space-y-4': isMobile }">
            <div class="flex flex-row items-start md:space-x-4 flex-shrink-0 overflow-auto"
                :class="{ 'flex-col space-y-4 w-full': isMobile }">
                <template v-for="filter in filters" :key="filter.key">
                    <DriverSelector v-if="filter.type === 'driver-selector'" @select="updateFilter(filter.key, $event)"
                        :class="isMobile ? 'w-full' : ''" />
                    <template v-else-if="filter.type === 'select'">
                        <UButtonGroup v-if="shouldUseButtonSwitcher(filter)" v-model="filterValues[filter.key]"
                            :options="getButtonSwitcherOptions(filter)"
                            @update:model-value="updateFilter(filter.key, $event)" />
                        <USelectMenu v-if="filter.options && filter.options.length" v-model="filterValues[filter.key]"
                            :options="filter.options" :placeholder="filter.placeholder"
                            :class="isMobile ? 'w-[90vw]' : 'w-[180px]'" valueAttribute="value">

                            <template #option="{ option }">
                                {{ getOptionLabel(filter, option) }} "dddd"
                            </template>
                        </USelectMenu>
                    </template>
                </template>
            </div>
            <UButton variant="ghost" @click="resetFilters" :class="isMobile ? 'w-[90vw]' : 'ml-4'">
                <UIcon name="i-ph-funnel" class="mr-2" />
                Reset
            </UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDevice } from '~/composables/useDevice'
import { useEnums } from '~/composables/useEnums'
import DriverSelector from '~/components/base/DriverSelector.vue'
import { getEmploymentStatusIcon, getWarehouseIcon } from '~/utils/icons'
import type { FilterConfig, FilterOption } from '~/types'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
    filters: FilterConfig[]
    modelValue: Record<string, any>
}>()

const emit = defineEmits(['update:modelValue'])
// const filters = ref<FilterConfig[]>(props.filters)
const { isMobile } = useDevice()
const { getEnumsByType, waitForEnums } = useEnums()

const filterValues = ref<Record<string, any>>({})

const updateFilter = (key: string, value: any) => {
    console.log(`Updating filter: ${key} with value:`, value)
    filterValues.value[key] = value
    emit('update:modelValue', filterValues.value)
}

const resetFilters = () => {
    filterValues.value = Object.keys(filterValues.value).reduce((acc, key) => {
        acc[key] = null
        return acc
    }, {} as Record<string, any>)
    emit('update:modelValue', filterValues.value)
}

const getOptionValue = (filter: FilterConfig, option: FilterOption): string | number => {
    if (filter.key === 'cycle_start') {
        return option.start || ''
    }
    return option.value || ''
}
const getSelectedLabel = (filter: FilterConfig) => {
    const selectedOption = filter.options?.find(option => getOptionValue(filter, option) === filterValues.value[filter.key])
    return selectedOption ? getOptionLabel(filter, selectedOption) : ''
}
const getOptionLabel = (filter: FilterConfig, option: FilterOption): string => {
    if (filter.key === 'cycle_start') {
        return option.label || `${option.start} - ${option.end}` || ''
    }
    return option.label || String(option.value) || ''
}

const shouldUseButtonSwitcher = (filter: FilterConfig) => {
    if (filter.as === 'Button') return true
    if (filter.as === 'Select') return false
    return filter.options
}

const getButtonSwitcherOptions = (filter: FilterConfig) => {
    return filter.options?.map(option => ({
        value: getOptionValue(filter, option),
        label: getOptionLabel(filter, option),
        icon: filter.key === 'warehouse' ? getWarehouseIcon(option.value as string) : (filter.key === 'employment_status' ? getEmploymentStatusIcon(option.value as string) : '')
    })) || []
}

watch(() => props.modelValue, (newValue) => {
    filterValues.value = { ...newValue }
}, { deep: true })

// const loadFilterOptions = async () => {
//     await waitForEnums()

//     filters.value = await Promise.all(props.filters.map(async (filter) => {
//         if (filter.type === 'select' && filter.enumType && !filter.options) {
//             const { data: enumData } = await getEnumsByType(filter.enumType)
//             console.log(`[Enum][${filter.key}]:`, enumData.value)

//             if (filter.key === 'cycle_start') {
//                 return { ...filter, options: enumData.value }
//             } else {
//                 return {
//                     ...filter,
//                     options: enumData.value.map(item => ({
//                         value: item.value,
//                         label: item.label
//                     }))
//                 }
//             }
//         }
//         return filter
//     }))
// }

// onMounted(async () => {
//     console.log('NimshipFilter: onMounted')
//     await loadFilterOptions()
//     console.log('NimshipFilter: Filter options loaded', props.filters)
// })
</script>

<style scoped>
.nimship-filter.mobile {
    width: 100%;
    padding-left: 20px;
}
</style>