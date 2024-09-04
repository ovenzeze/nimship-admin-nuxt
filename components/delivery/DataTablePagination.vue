<script setup lang="ts">

import type { Table } from '@tanstack/vue-table'
import type { DeliveryRecordView } from '~/types'

const props = defineProps<{
    table: Table<DeliveryRecordView>
    totalCount: number
    pageSize: number
}>()

const emit = defineEmits<{
    (e: 'update:pagination', pagination: { pageIndex: number; pageSize: number }): void
}>()

const currentPage = computed(() => props.table.getState().pagination.pageIndex + 1)
const totalPages = computed(() => Math.ceil(props.totalCount / props.pageSize))

const handlePageChange = (page: number) => {
    emit('update:pagination', { pageIndex: page - 1, pageSize: props.pageSize })
}
</script>

<template>
    <Pagination :total="totalPages" :sibling-count="1" show-edges :default-page="currentPage"
        @update:page="handlePageChange">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst class="w-6 h-6 p-0 rounded-full bg-secondary" />
            <PaginationPrev class="w-6 h-6 p-0 rounded-full  bg-secondary" />

            <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button class="w-6 h-6 p-1.5 rounded-full"
                        :variant="item.value === currentPage ? 'destructive' : 'secondary'">
                        {{ item.value }}
                    </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext class="w-6 h-6 p-0 rounded-full  bg-secondary" />
            <PaginationLast class="w-6 h-6 p-0 rounded-full bg-secondary" />
        </PaginationList>
    </Pagination>
</template>