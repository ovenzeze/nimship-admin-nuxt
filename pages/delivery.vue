<template>
  <div class="h-full w-full overflow-hidden">
    <FixedCard :otherElementsHeight="{ mobile: 60, desktop: 20 }" :footerHeight="{ mobile: 60, desktop: 100 }"
      :headerHeight="{ mobile: 40, desktop: 70 }" :showBlur="showBlur" class="h-full">
      <template #CardInfo>
        <DeliveryHeader />
      </template>
      <template #PrimaryAction>
        <DeliveryFilter @update:filter="handleFilterChange" />
      </template>
      <template #body>
        <DeliveryTable :data="filteredRecords" :columns="columns" @select-record="selectRecord"
          @update:sorting="handleSortingChange" @update:columnFilters="handleColumnFiltersChange" />
      </template>
      <template #footer>
        <div class="flex items-center justify-center px-2 py-1.5 border w-full box-border border-border rounded-lg">
          <DeliveryColumnSelector v-model="visibleColumns" :allColumns="allColumns" />
          <DataTablePagination :table="table" :total-count="totalCount" :page-size="pagination.pageSize"
            @update:pagination="handlePaginationChange" />
        </div>
        <!-- <div class="flex items-center justify-between px-2">
          <DeliveryColumnSelector v-model="visibleColumns" :allColumns="allColumns" />
          <DataTablePagination :table="table" :total-count="totalCount" :page-size="10"
            @update:pagination="handlePaginationChange" />
        </div> -->
      </template>
    </FixedCard>

    <DeliveryDetailDrawer v-if="selectedRecord" :record="selectedRecord" @close="closeDetailDrawer"
      class="h-[50vh] w-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useDelivery } from '~/composables/useDelivery'
import type { DeliveryFilters, DeliveryRecordView, Column, SortingState, ColumnFiltersState, PaginationState } from '~/types'
import type { ColumnDef } from '@tanstack/vue-table'
import { useVueTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/vue-table'

const { loading, error, deliveryRecords, totalCount, fetchDeliveryRecords } = useDelivery()

const columns = computed<ColumnDef<DeliveryRecordView>[]>(() => [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'driver_name',
    header: 'Driver',
  },
  {
    accessorKey: 'custom_uid',
    header: 'Driver ID',
  },
  {
    accessorKey: 'warehouse',
    header: 'Warehouse',
  },
  {
    accessorKey: 'team_name',
    header: 'Team',
  },
  {
    accessorKey: 'custom_id',
    header: 'Customer',
  },
  {
    accessorKey: 'settle_rate',
    header: 'Rate',
  },
  {
    accessorKey: 'total_order_cnt',
    header: 'Orders',
  },
  {
    accessorKey: 'order_cnt_0_1',
    header: 'Details',
  },
  {
    accessorKey: 'driver_salary',
    header: 'Salary',
  },
  {
    accessorKey: 'cycle_start',
    header: 'Pay Cycle',
  },
  {
    accessorKey: 'total_salary',
    header: 'Profit',
  },
  {
    accessorKey: 'payment_status',
    header: 'Status',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
])

const allColumns: Column[] = [
  { key: 'date', label: 'Date' },
  { key: 'driver_name', label: 'Driver' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'team_name', label: 'Team' },
  { key: 'custom_id', label: 'Customer' },
  { key: 'settle_rate', label: 'Rate' },
  { key: 'total_order_cnt', label: 'Total' },
  { key: 'total_salary', label: 'Income' },
  { key: 'driver_salary', label: 'Salary' },
  { key: 'order_cnt_0_1', label: 'Order(0-1)' },
  { key: 'order_cnt_1_10', label: 'Order(1-10)' },
  { key: 'order_cnt_10', label: 'Order(>10)' },
  { key: 'payment_status', label: 'Payment Status' },
  { key: 'cycle_start', label: 'Cycle Start' },
  { key: 'cycle_end', label: 'Cycle End' },
]

const filters = ref<DeliveryFilters>({
  dateRange: null,
  warehouse_id: null,
  status: null,
  driver_id: null,
})

const sorting = ref<SortingState>([])

const columnFilters = ref<ColumnFiltersState>([])
const visibleColumns = ref<(keyof DeliveryRecordView)[]>([])

const filteredRecords = computed(() => deliveryRecords.value)

const selectedRecord = ref<DeliveryRecordView | null>(null)

const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 20,
})

// Define handler functions before using them in useVueTable
const handlePaginationChange = (newPagination: PaginationState) => {
  pagination.value = newPagination
  fetchDeliveryRecords(filters.value, sorting.value, columnFilters.value, pagination.value)
}

const handleFilterChange = (newFilters: Partial<DeliveryFilters>) => {
  filters.value = { ...filters.value, ...newFilters }
  pagination.value.pageIndex = 0 // Reset to first page when filters change
  fetchDeliveryRecords(filters.value, sorting.value, columnFilters.value, pagination.value)
}

const handleSortingChange = (newSorting: SortingState) => {
  sorting.value = newSorting
  fetchDeliveryRecords(filters.value, sorting.value, columnFilters.value, pagination.value)
}

const handleColumnFiltersChange = (newColumnFilters: ColumnFiltersState) => {
  columnFilters.value = newColumnFilters
  pagination.value.pageIndex = 0 // Reset to first page when column filters change
  fetchDeliveryRecords(filters.value, sorting.value, columnFilters.value, pagination.value)
}

// Now we can use these functions in useVueTable
const table = useVueTable({
  get data() { return filteredRecords.value },
  get columns() { return columns.value },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: handleSortingChange,
  onColumnFiltersChange: handleColumnFiltersChange,
  onPaginationChange: handlePaginationChange,
  manualPagination: true,
  pageCount: computed(() => Math.ceil(totalCount.value / pagination.value.pageSize)),
})

const selectRecord = (record: DeliveryRecordView) => {
  selectedRecord.value = record
}

const closeDetailDrawer = () => {
  selectedRecord.value = null
}

const showBlur = computed(() => !!selectedRecord.value)

watch([filters, sorting, columnFilters, pagination], () => {
  fetchDeliveryRecords(filters.value, sorting.value, columnFilters.value, pagination.value)
}, { deep: true })

onMounted(() => {
  fetchDeliveryRecords(filters.value, sorting.value, columnFilters.value, pagination.value)
})
</script>