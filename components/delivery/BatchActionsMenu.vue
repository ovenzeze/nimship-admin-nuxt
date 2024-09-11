<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="outline" :disabled="selectedRecords.size === 0">
                Batch Actions ({{ selectedRecords.size }})
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-56">
            <div class="space-y-2">
                <Button variant="ghost" class="w-full justify-start" @click="emitBatchAction('delete')">
                    <Icon name="ph:trash" class="mr-2 h-4 w-4" />
                    Delete Selected
                </Button>
                <Button variant="ghost" class="w-full justify-start" @click="emitBatchAction('transfer')">
                    <Icon name="ph:arrows-clockwise" class="mr-2 h-4 w-4" />
                    Transfer Selected
                </Button>
                <!-- Add more batch actions as needed -->
            </div>
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
const props = defineProps<{
    selectedRecords: Set<number>
}>()

const emit = defineEmits<{
    (e: 'batch-action', action: string): void
}>()

const emitBatchAction = (action: string) => {
    emit('batch-action', action)
}
</script>