<template>
    <div class="filter-item cursor-pointer">
        <LazyUSelectMenu v-model="selectedValue" :options="computedOptions" :placeholder="config.placeholder"
            :multiple="config.multiple" :aria-label="`Select ${config.placeholder}`" class="w-full" variant="none"
            value-attribute="value" :uiMenu="selectStyle" @focus="loadFullComponent" @click="loadFullComponent">
            <template #label>
                <span v-if="!isFullComponentLoaded && modelValue" :class="{ 'opacity-90': !isFullComponentLoaded }"
                    class="min-w-[60px] uppercase flex flex-row items-center justify-center cursor-pointer
                    transition-all duration-1000 animate-out fade-out-0">
                    <Icon v-if="tryIcon" :name="tryIcon" class="w-4 h-4 mr-2" />
                    {{ modelValue }}
                </span>
                <span v-else
                    class="min-w-[60px] uppercase flex flex-row items-center cursor-pointer transition-all duration-1000 animate-in fade-in">
                    <Icon v-if="selectedOption?.icon" :name="selectedOption.icon" class="w-4 h-4 mr-2" />
                    {{ selectedOption?.label || config.placeholder }}
                </span>
            </template>
            <template #option-empty="{ query }">
                <q>{{ query }}</q> not found
            </template>
            <template #option="{ option }">
                <div class="group min-w-full cursor-pointer flex-1 flex flex-row items-center content-center gap-x-2 hover:opacity-100 transition-all duration-300"
                    :class="{
                        'opacity-100': option.value === selectedValue,
                    }">
                    <Icon v-if="option.icon" :name="option.icon" class="w-4 h-4" />
                    <span class="truncate">{{ option.label }}</span>
                </div>
            </template>
        </LazyUSelectMenu>
    </div>
</template>

<script setup lang="ts">
import { useEnums } from '~/composables/useEnums'
import { EnumType, type EnumItem } from '~/types'
import { getEnumsIcon } from '~/utils/icons'

export interface FilterConfig {
    key: string
    placeholder: string
    enumType?: EnumType
    multiple?: boolean
    options?: FilterOptionItem[]
    selectFirstOption?: boolean
}

export interface FilterOptionItem {
    value: string | number
    label?: string | number | boolean
    icon?: string
}

const props = defineProps<{
    config: FilterConfig
    modelValue: string | number | boolean | undefined,
    lazy?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | boolean): void
}>()

const { getEnumsByType } = useEnums()

const enumOptions = ref<EnumItem[]>([])
const isFullComponentLoaded = ref(false)

const computedOptions = computed(() => {
    if (!props.config.enumType || !isFullComponentLoaded.value) return []

    return enumOptions.value.map(option => ({
        value: option.value,
        label: option.label,
        icon: getEnumsIcon(props.config.enumType as EnumType, option.value)
    }))
})

const optionsMap = computed(() => {
    return computedOptions.value.reduce((map, option) => {
        map[option.value] = option
        return map
    }, {} as Record<string | number, FilterOptionItem>)
})

const selectedValue = computed({
    get: () => props.modelValue,
    set: (newVal: string | number | boolean | FilterOptionItem | null) => {
        if (newVal !== props.modelValue) {
            emit('update:modelValue', newVal as string | number | boolean)
        }
    }
})

const selectedOption = computed(() => optionsMap.value[selectedValue.value as string | number] || null)

const tryIcon = computed(() => getEnumsIcon(props.config.enumType as EnumType, props.modelValue))
const selectStyle = {
    base: 'shadow-md rounded-full',
    background: 'bg-background/90 dark:bg-background',
    option: { base: 'divide-y bg-background' },
    transition: {
        enterActiveClass: 'transition-all duration-300 animate-in slide-in-from-top fade-in',
    },
}

const loadFullComponent = async () => {
    if (!isFullComponentLoaded.value && props.config.enumType) {
        isFullComponentLoaded.value = true

        const fetchedEnumOptions = await getEnumsByType(props.config.enumType)
        enumOptions.value = fetchedEnumOptions

        if (props.config.selectFirstOption && !selectedValue.value && computedOptions.value.length > 0) {
            selectedValue.value = computedOptions.value[0].value
        }
    }
}

onMounted(() => {
    if (!props.lazy) {
        loadFullComponent();
    }
})

</script>