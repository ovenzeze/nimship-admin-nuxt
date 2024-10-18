<template>
    <div class="filter-item z-30">
        <USelectMenu v-model="internalValue" :options="options" :placeholder="config.placeholder"
            :multiple="config.multiple" :aria-label="`Select ${config.placeholder}`" class="w-full" variant="none"
            :uiMenu="selectStyle">
            <template #label>
                <span class="min-w-[60px] uppercase flex flex-row items-center">
                    <Icon v-if="internalValue && internalValue.icon" :name="internalValue.icon" class="w-4 h-4 mr-2" />
                    {{ (internalValue && internalValue.label) || config.placeholder }}
                </span>
            </template>
            <template #option-empty="{ query }">
                <q>{{ query }}</q> not found
            </template>
            <template #option="{ option }">
                <div class="group min-w-full flex-1 flex flex-row items-center content-center gap-x-2 hover:opacity-100 transition-all duration-300"
                    :class='{ "opacity-100": option.value == (internalValue && internalValue.value), "opacity-50": option.value !== (internalValue && internalValue.value) }'>
                    <Icon v-if="option && option.icon" :name="option.icon" class="w-4 h-4" />
                    <span class="truncate">{{ option.label }}</span>
                </div>
            </template>
        </USelectMenu>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useEnums } from '~/composables/useEnums'
import { EnumType } from '~/types'
import { getEnumsIcon } from '~/utils/icons';

export interface FilterConfig {
    key: string
    placeholder: string
    enumType?: EnumType
    multiple?: boolean
    options?: filterOptionItem[]
    selectFirstOption?: boolean
}

export interface filterOptionItem {
    value: string | number,
    label: string | number | boolean,
    icon?: string
}

const props = defineProps<{
    config: FilterConfig
    modelValue: { [key: string]: string | number | boolean } | filterOptionItem
}>()

const emit = defineEmits<{
    (e: 'update:value', value: filterOptionItem): void
}>()

const { getEnumsByType } = useEnums()
const options = ref(props.config.options || [])
const internalValue = ref(props.modelValue)

// Watch for changes from props
watch(() => props.modelValue, (newValue) => {
    if (newValue !== internalValue.value) {
        internalValue.value = newValue
    }
})

// Watch for internal changes
watch(internalValue, (newValue) => {
    console.log('internalValue.value', newValue)
    console.log('props.modelValue', props.modelValue)
    if (JSON.stringify(newValue) !== JSON.stringify(props.modelValue)) {
        emit('update:value', newValue)
    }
}, { immediate: true })

const selectStyle = {
    transition: {
        enterActiveClass: 'transition-all duration-300 animate-in slide-in-from-top fade-in',
        leaveActiveClass: 'transition-all duration-300 animate-out slide-out-to-top',
    },
}

onMounted(async () => {
    if (props.config.enumType) {
        const enumOptions = await getEnumsByType(props.config.enumType)
        options.value = enumOptions.map(option => ({
            value: option.value,
            label: option.label,
            icon: props.config.enumType && getEnumsIcon(props.config.enumType, option.value)
        }))
    }

    // Auto-select the first option if configured and no value is already selected
    if (props.config.selectFirstOption && !internalValue.value && options.value.length > 0) {
        internalValue.value = options.value[0]
        emit('update:value', internalValue.value)
    }
})
</script>
