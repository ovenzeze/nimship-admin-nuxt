<template>
  <div class="flex flex-col h-full">
    <!-- Fixed header -->
    <div class="py-4">
      <DeliveryFilter @update:filter="handleFilterChange" />
    </div>

    <!-- Scrollable table area -->
    <div class="flex-grow overflow-auto border border-border rounded-lg rounded-b-none border-b-0">
      <DeliveryTable :data="filteredRecords" :columns="columns" @update:sorting="handleSortingChange"
        @update:columnFilters="handleColumnFiltersChange" />
    </div>

    <!-- Fixed footer -->
    <div class="border border-border rounded-lg rounded-t-none py-2 px-4">
      <DataTablePagination :table="table" :total-count="totalCount" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useDelivery } from '~/composables/useDelivery'
import { useToast } from '#imports'
import type { DeliveryFilters, DeliveryRecordView } from '~/types'

const { loading, error, deliveryRecords, totalCount, fetchDeliveryRecords } = useDelivery()
const { toast } = useToast()

const columns = [
  { id: 'date', header: 'Date' },
  { id: 'driver_name', header: 'Driver' },
  { id: 'custom_uid', header: 'Driver ID' },
  { id: 'warehouse', header: 'Warehouse' },
  { id: 'team_name', header: 'Team' },
  { id: 'custom_id', header: 'Customer' },
  { id: 'settle_rate', header: 'Rate' },
  { id: 'total_order_cnt', header: 'Orders' },
  { id: 'order_cnt_0_1', header: 'Details' },
  { id: 'total_salary', header: 'Salary' },
  { id: 'cycle_start', header: 'Pay Cycle' },
  { id: 'profit', header: 'Profit' },
  { id: 'payment_method', header: 'Status' },
]

const filters = ref<DeliveryFilters>({
  warehouse_id: null,
  team: null,
  cycle_start: null,
  driver_id: null,
})

const pagination = ref({ pageIndex: 0, pageSize: 20 })
const sorting = ref([])
const columnFilters = ref([])

const filteredRecords = computed(() => deliveryRecords.value)

const handleFilterChange = (newFilters: Partial<DeliveryFilters>) => {
  filters.value = { ...filters.value, ...newFilters }
  pagination.value.pageIndex = 0 // Reset to first page when filters change
  fetchRecords()
}

const handleSortingChange = (newSorting) => {
  sorting.value = newSorting
  fetchRecords()
}

const handleColumnFiltersChange = (newColumnFilters) => {
  columnFilters.value = newColumnFilters
  fetchRecords()
}

const fetchRecords = async () => {
  try {
    await fetchDeliveryRecords(filters.value, sorting.value, columnFilters.value, pagination.value)
  } catch (e) {
    toast({
      title: "Error",
      description: "Failed to fetch delivery records. Please try again.",
      variant: "destructive",
    })
  }
}

// Table object for DataTablePagination
const table = {
  getState: () => ({
    pagination: {
      pageIndex: pagination.value.pageIndex,
      pageSize: pagination.value.pageSize,
    },
  }),
  setPageIndex: (index: number) => {
    pagination.value.pageIndex = index
    fetchRecords()
  },
  setPageSize: (size: number) => {
    pagination.value.pageSize = size
    pagination.value.pageIndex = 0
    fetchRecords()
  },
  getPageCount: () => Math.ceil(totalCount.value / pagination.value.pageSize),
  getCanPreviousPage: () => pagination.value.pageIndex > 0,
  getCanNextPage: () => pagination.value.pageIndex < (Math.ceil(totalCount.value / pagination.value.pageSize) - 1),
  previousPage: () => {
    if (table.getCanPreviousPage()) {
      table.setPageIndex(pagination.value.pageIndex - 1)
    }
  },
  nextPage: () => {
    if (table.getCanNextPage()) {
      table.setPageIndex(pagination.value.pageIndex + 1)
    }
  },
}

watch([filters, pagination, sorting, columnFilters], fetchRecords, { deep: true })

onMounted(fetchRecords)
</script>