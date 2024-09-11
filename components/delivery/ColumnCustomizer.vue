<template>
    <div class="column-customizer">
        <Popover>
            <PopoverTrigger as-child>
                <Button variant="outline">Customize Columns</Button>
            </PopoverTrigger>
            <PopoverContent class="w-80">
                <div class="space-y-4">
                    <h4 class="font-medium leading-none">Visible Columns</h4>
                    <div class="space-y-2">
                        <div v-for="column in sortedColumns" :key="column.id" class="flex items-center space-x-2">
                            <Checkbox :id="column.id" :checked="isColumnVisible(column.id)"
                                @change="toggleColumnVisibility(column.id)" />
                            <label :for="column.id"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {{ column.header }}
                            </label>
                            <div class="flex-grow"></div>
                            <Button variant="ghost" size="sm" @click="moveColumnUp(column.id)"
                                :disabled="isFirstColumn(column.id)">
                                ↑
                            </Button>
                            <Button variant="ghost" size="sm" @click="moveColumnDown(column.id)"
                                :disabled="isLastColumn(column.id)">
                                ↓
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { DeliveryRecordView } from '~/types/database'

const props = defineProps<{
    columns: ColumnDef<DeliveryRecordView>[]
    visibleColumns: string[]
    columnOrder: string[]
}>()

const emit = defineEmits<{
    (e: 'update:visibleColumns', value: string[]): void
    (e: 'update:columnOrder', value: string[]): void
}>()

const sortedColumns = computed(() => {
    return [...props.columns].sort((a, b) => {
        return props.columnOrder.indexOf(a.id as string) - props.columnOrder.indexOf(b.id as string)
    })
})

const isColumnVisible = (columnId: string) => {
    return props.visibleColumns.includes(columnId)
}

const toggleColumnVisibility = (columnId: string) => {
    const newVisibleColumns = isColumnVisible(columnId)
        ? props.visibleColumns.filter(id => id !== columnId)
        : [...props.visibleColumns, columnId]
    emit('update:visibleColumns', newVisibleColumns)
}

const moveColumnUp = (columnId: string) => {
    const index = props.columnOrder.indexOf(columnId)
    if (index > 0) {
        const newOrder = [...props.columnOrder]
            ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
        emit('update:columnOrder', newOrder)
    }
}

const moveColumnDown = (columnId: string) => {
    const index = props.columnOrder.indexOf(columnId)
    if (index < props.columnOrder.length - 1) {
        const newOrder = [...props.columnOrder]
            ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
        emit('update:columnOrder', newOrder)
    }
}

const isFirstColumn = (columnId: string) => {
    return props.columnOrder.indexOf(columnId) === 0
}

const isLastColumn = (columnId: string) => {
    return props.columnOrder.indexOf(columnId) === props.columnOrder.length - 1
}
</script>

<style scoped>
.column-customizer {
    margin-bottom: 1rem;
}
</style>