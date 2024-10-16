<template>
    <div class="filter-item">
        <USelectMenu v-model="selected" :options="options" :placeholder="config.placeholder" :multiple="config.multiple"
            option-attribute="label" :aria-label="`Select ${config.placeholder}`" class="w-full">
            <template #label>
                <span class="min-w-[60px] uppercase text-xs flex flex-row items-center">
                    <Icon v-if="selected && selected.icon" :name="selected.icon" class="w-4 h-4 mr-2" />
                    {{ (selected && selected.label) || config.placeholder }}
                </span>
            </template>
            <template #option-empty="{ query }">
                <q>{{ query }}</q> not found
            </template>
            <template #option="{ option }">
                <Icon v-if="option && option.icon" :name="option.icon" class="w-4 h-4" />
                <span class="truncate">{{ option.label }}</span>
            </template>
        </USelectMenu>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useEnums } from '~/composables/useEnums'
import { EnumType } from '~/types'
import { getEnumsIcon } from '~/utils/icons';

interface FilterConfig {
    key: string
    placeholder: string
    enumType?: EnumType
    multiple?: boolean
    options?: { value: string; label: string }[]
    selectFirstOption?: boolean // New configuration option
}

const props = defineProps<{
    config: FilterConfig
    modelValue: any
}>()

const emit = defineEmits<{
    (e: 'update:value', value: any): void
}>()

const { getEnumsByType } = useEnums()
const selected = ref(props.modelValue)
const options = ref(props.config.options || [])

watch(() => selected.value, (newValue) => {
    emit('update:value', newValue)
})

watch(() => props.modelValue, (newValue) => {
    selected.value = newValue
})

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
    if (props.config.selectFirstOption && !selected.value && options.value.length > 0) {
        selected.value = options.value[0]
        emit('update:value', selected.value)
    }
})
</script>