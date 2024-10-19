<template>
  <div class="flex flex-col h-full bg-background border border-border rounded-lg overflow-hidden overscroll-none">
    <!-- Fixed header -->
    <div class="w-full bg-muted/50 backdrop-blur-sm  h-24 flex flex-row items-center justify-center">
      <DeliveryFilter :filters="deliveryFilters" @update:filter="handleFilterChange" @reset:filter="resetFilter" />
    </div>

    <!-- Scrollable table area -->
    <div class="flex-1 rounded-lg rounded-b-none border-b-0 overflow-hidden">
      <DeliveryTable :data="deliveryRecords" :columns="columns" :loading="loading" />
    </div>

    <!-- Fixed footer with Nuxt UI Pagination -->
    <div
      class="w-full border border-border rounded-lg rounded-t-none py-2 px-4 flex flex-row justify-between items-center">
      <div class="hidden md:flex">
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ pagination.from }}</span>
          to
          <span class="font-medium">{{ pagination.to }}</span>
          of
          <span class="font-medium">{{ totalCount }}</span>
          results
        </p>
      </div>
      <UPagination v-model="pagination.index" :total="totalCount" :pageCount="pagination.size"
        @update:model-value="handlePageChange" :ui="{
          wrapper: 'gap-1 py-0 w-full md:w-auto flex justify-center items-center',
          base: 'text-xs w-[28px] h-[28px] flex flex-row items-center justify-center rounded-full',
          rounded: '',
        }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDelivery } from '~/composables/useDelivery'

const {
  deliveryRecords,
  deliveryFilters,
  pagination,
  loading,
  totalCount,
  setFilters,
  resetFilter,
  setPagination,
  onError
} = useDelivery()

const toast = useToast()

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


const pageCount = computed(() => Math.ceil(totalCount.value / pagination.size))

const handlePageChange = (page: number) => {
  setPagination({ page })
}

const handleFilterChange = ({ key, item }) => {
  const newFilter = Object.assign(deliveryFilters)
  newFilter[key] = item
  setFilters(newFilter)
}
// Error handling
onError.value((error) => {
  toast.add({
    title: "Error",
    description: "Failed to fetch delivery records. Please try again.",
    color: "red"
  })
})

onMounted(() => setPagination({ page: 1, size: 20 }))
</script>
