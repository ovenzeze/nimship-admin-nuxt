<template>
    <Dialog>
        <DialogTrigger asChild>
            <Button size="sm" variant="outline" class="w-30">
                <Icon name="ph:columns" class="w-4 h-4 mr-2" />
                Columns
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select Columns</DialogTitle>
            </DialogHeader>
            <div class="grid grid-cols-2 gap-4">
                <Checkbox v-for="column in allColumns" :key="column.key" v-model:checked="localSelectedColumns"
                    :value="column.key">
                    {{ column.label }}
                </Checkbox>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { DeliveryRecordView } from '~/types'

interface Column {
    key: keyof DeliveryRecordView;
    label: string;
}

const props = defineProps<{
    modelValue: (keyof DeliveryRecordView)[];
    allColumns: Column[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: (keyof DeliveryRecordView)[]): void;
}>();

const localSelectedColumns = ref(props.modelValue);

watch(localSelectedColumns, (newValue) => {
    emit('update:modelValue', newValue);
});
</script>