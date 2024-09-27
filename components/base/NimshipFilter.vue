<template>
    <div class="nimship-filter" :class="{ 'mobile': isMobile }">
        <div class="flex items-start justify-between md:justify-center" :class="{ 'flex-col space-y-4': isMobile }">
            <div class="flex flex-row items-start md:space-x-4 flex-shrink-0 overflow-auto"
                :class="{ 'flex-col space-y-4 w-full': isMobile }">
                <template v-for="filter in filters" :key="filter.key">
                    <template v-if="filter.type === 'select'">
                        <ButtonSwitcher v-if="shouldUseButtonSwitcher(filter)" :modelValue="filterValues[filter.key]"
                            :options="getButtonSwitcherOptions(filter)"
                            @update:value="updateFilter(filter.key, $event)" />
                        <Select v-else v-model="filterValues[filter.key]" :options="filter.options || []"
                            @update:modelValue="updateFilter(filter.key, $event)">
                            <SelectTrigger :class="isMobile ? 'w-[90vw]' : 'w-[180px] h-9'">
                                <SelectValue :placeholder="filter.placeholder" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="option in filter.options" :key="getOptionValue(filter, option)"
                                    :value="getOptionValue(filter, option)">
                                    {{ getOptionLabel(filter, option) }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </template>
                    <DriverSelector v-else-if="filter.type === 'driver-selector'"
                        @select="updateFilter(filter.key, $event)" :class="isMobile ? 'w-full' : ''" />
                </template>
            </div>
            <Button variant="outline" @click="resetFilters" :class="isMobile ? 'w-[90vw]' : 'ml-4 h-9'">
                <Icon name="ph:funnel" class="mr-2" />Reset
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDevice } from '~/composables/useDevice'
import { useEnums } from '~/composables/useEnums'
import DriverSelector from '~/components/base/DriverSelector.vue'
import ButtonSwitcher from '~/components/base/ButtonSwitcher.vue'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getEmploymentStatusIcon } from '~/utils/icons'

interface FilterOption {
    value?: string | number
    label?: string
    cycle?: string
    start?: string
    end?: string
}

interface FilterConfig {
    type: 'select' | 'driver-selector'
    key: string
    placeholder: string
    options?: FilterOption[]
    enumType?: string
    as?: 'Button' | 'Select' | 'auto'
}

const props = defineProps<{
    filters: FilterConfig[]
    modelValue: Record<string, any>
}>()

const emit = defineEmits(['update:modelValue'])

const { isMobile } = useDevice()
const { getEnumsByType, waitForEnums } = useEnums()

const filterValues = ref({ ...props.modelValue })

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

const getOptionLabel = (filter: FilterConfig, option: FilterOption): string => {
    if (filter.key === 'cycle_start') {
        return option.label || `${option.start} - ${option.end}` || ''
    }
    return option.label || String(option.value) || ''
}

const shouldUseButtonSwitcher = (filter: FilterConfig) => {
    if (filter.as === 'Button') return true
    if (filter.as === 'Select') return false
    return filter.options && filter.options.length <= 3
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

const loadFilterOptions = async () => {
    await waitForEnums()
    for (const filter of props.filters) {
        if (filter.type === 'select' && filter.enumType && !filter.options) {
            const enumData = await getEnumsByType(filter.enumType)
            console.log(`Enum data for ${filter.key}:`, enumData)
            if (filter.key === 'cycle_start') {
                filter.options = enumData
            } else {
                filter.options = enumData.map(item => ({ value: item.value, label: item.label }))
            }
            console.log(`Processed options for ${filter.key}:`, filter.options)
        }
    }
}

onMounted(async () => {
    console.log('NimshipFilter: onMounted')
    await loadFilterOptions()
    console.log('NimshipFilter: Filter options loaded', props.filters)
})
</script>

<style scoped>
.nimship-filter.mobile {
    width: 100%;
    padding-left: 20px;

}
</style>