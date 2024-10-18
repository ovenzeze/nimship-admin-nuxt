<template>
  <div class="flex flex-col h-full">
    <!-- Fixed header -->
    <div class="w-full py-4">
      <DeliveryFilter :filters="deliveryFilters" @update:filter="handleFilterChange" @reset:filter="resetFilter" />
    </div>

    <!-- Scrollable table area -->
    <div class="flex-grow overflow-auto border border-border rounded-lg rounded-b-none border-b-0">
      <DeliveryTable :data="deliveryRecords" :columns="columns" :loading="loading" />
    </div>

    <!-- Fixed footer with Nuxt UI Pagination -->
    <div class="border border-border rounded-lg rounded-t-none py-2 px-4 flex justify-between items-center">
      <div>
        Total: {{ totalCount }} items
      </div>
      <UPagination v-model="currentPage" :page-count="pageCount" :total="totalCount" :per-page="perPage"
        @update:model-value="handlePageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useDelivery } from '~/composables/useDelivery'
import { useToast } from '#imports'

const {
  deliveryRecords,
  deliveryFilters,
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

const currentPage = ref(1)
const perPage = ref(20)

const pageCount = computed(() => Math.ceil(totalCount.value / perPage.value))

const handlePageChange = (page: number) => {
  setPagination({ pageIndex: page - 1, pageSize: perPage.value })
}

const handleFilterChange = ({ key, item }) => {

  const newFilter = Object.assign(deliveryFilters)
  newFilter[key] = item.value
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

onMounted(() => {
  // Initial fetch
  setPagination({ pageIndex: currentPage.value - 1, pageSize: perPage.value })
})

// Watch for changes in perPage and update pagination
watch(perPage, (newPerPage) => {
  setPagination({ pageIndex: currentPage.value - 1, pageSize: newPerPage })
})
</script>
