<template>
    <div class="w-full border-box">
        <USelectMenu v-if="as === 'select'" v-model="currValue" :options="options" @update:model-value="updateValue">
            <template #label>
                <div v-if="currValue && currValue?.label" class="flex items-center">
                    <Icon v-if="currValue?.icon" :name="currValue.icon" class="w-4 h-4 mr-2" />
                    {{ currValue?.label }}
                </div>
                <span v-else class="text-gray-400">Select an option {{ currValue }}</span>
            </template>
            <template #option="{ option }">
                <div class="w-full flex items-center">
                    <Icon v-if="option.icon" :name="option.icon" class="w-4 h-4 mr-2" />
                    {{ option.label }}
                </div>
            </template>
        </USelectMenu>

        <div v-else class="flex items-center">
            <div v-for="(option, index) in options" :key="option.value" @click="updateValue(option.value)"
                class="flex items-center justify-center px-3 py-2 text-xs transition-all duration-300 cursor-pointer h-9"
                :class="[
                    currValue === option.value
                        ? 'bg-foreground text-background hover:bg-foreground/90'
                        : 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-y',
                    {
                        'rounded-l-md border-l': index === 0,
                        'rounded-r-md border-r': index === options.length - 1,
                        'border-r border-input': index < options.length - 1
                    }
                ]">
                <Icon v-if="option.icon" :name="option.icon" class="w-4 h-4 mr-2" />
                {{ option.label }}
            </div>
        </div>

        <ClientOnly>
            <div class="mt-4">
                <UButton @click="toggleAs">Toggle As: {{ as }}</UButton>
            </div>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';

interface Option {
    value: string;
    label: string;
    icon?: string;
}

const props = withDefaults(defineProps<{
    modelValue: any;
    options: Option[];
    as?: 'select' | 'button';
}>(), {
    as: 'button'
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const currValue = ref(props.modelValue);
const as = ref(props.as);

const selectedOption = computed(() => props.options.find(option => option.value === currValue.value));

watch(() => props.modelValue, (newValue) => {
    currValue.value = newValue;
});

const updateValue = (value: string) => {
    currValue.value = value;
    emit('update:modelValue', value);
};

const toggleAs = () => {
    as.value = as.value === 'select' ? 'button' : 'select';
};
</script>