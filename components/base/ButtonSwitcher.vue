<template>
    <div class="flex items-center">
        <div v-for="(option, index) in options" :key="option.value" @click="updateValue(option.value)"
            class="flex items-center justify-center px-2 py-1.5 text-sm transition-all duration-300 cursor-pointer"
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
</template>

<script lang="ts" setup>
interface Option {
    value: string;
    label: string;
    icon?: string;
}

const props = defineProps<{
    modelValue: string;
    options: Option[];
}>();

const emit = defineEmits<{
    (e: 'update:value', value: string): void;
}>();
const currValue = ref(props.modelValue);


const updateValue = (value: string) => {
    currValue.value = value;
    emit('update:value', value);
};
</script>