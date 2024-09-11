<template>
  <div class="flex flex-col h-full">
    <!-- Mobile Navigation Bar (placeholder) -->
    <div class="h-16 bg-background text-primary-foreground md:hidden">
      <!-- Add your mobile navigation content here -->
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Filter -->
      <div class="w-full">
        <DriverFilter @update:filter="handleFilterChange" @add-new-driver="openDriverDialog()"
          @update:dimensions="handleDimensionsChange" @reset-dimensions="resetDimensions" />
      </div>

      <!-- Table -->
      <div class="flex-1 overflow-hidden border border-border rounded-lg border-b-0 rounded-b-none"
        :style="tableDimensionsStyle">
        <transition name="fade" mode="out-in">
          <DriverTable :key="tableKey" :data="filteredDrivers" :columns="columns" :loading="loading"
            :dimensions="dimensions" @update:sorting="handleSortingChange"
            @update:columnFilters="handleColumnFiltersChange" @update:driver="handleDriverUpdate"
            @edit-driver="openDriverDialog" />
        </transition>
      </div>

      <!-- Pagination -->
      <div class="p-4 border border-border flex justify-between items-center rounded-lg rounded-t-none">
        <div>
          <span class="text-sm text-primary">
            Showing {{ paginationStart }} to {{ paginationEnd }} of {{ totalCount }} entries
          </span>
        </div>
        <!-- Debug information -->
        <Pagination v-slot="{ page }" :total="totalCount" :sibling-count="1" show-edges
          :default-page="pagination.pageIndex + 1" @update:page="handlePageChange">
          <PaginationList v-slot="{ items }" class="flex items-center gap-1 ">
            <PaginationFirst class="w-7 h-7 p-0 rounded-full" />
            <PaginationPrev class="w-7 h-7 p-0 rounded-full" />

            <template v-for="(item, index) in items">
              <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                <Button class="w-7 h-7 p-0 rounded-full" :variant="item.value === page ? 'secondary' : 'outline'">
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext class="w-7 h-7 p-0 rounded-full" />
            <PaginationLast class="w-7 h-7 p-0 rounded-full" />
          </PaginationList>
        </Pagination>
      </div>
    </div>

    <!-- Driver Dialog -->
    <DriverDialog v-if="showDriverDialog" :driver="selectedDriver" @close="closeDriverDialog" @save="saveDriver" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from '@/components/ui/toast'
import type { DriverFilters, HaulblazeContact, DriverColumn, ReadableDriver } from '~/types/shared'
import { getReadableDriver } from '~/utils/driver'
import { getRandomColor } from '~/utils/colorUtils'
import { Button } from '@/components/ui/button'

const { loading, error, drivers, totalCount, fetchDrivers, updateDriver, createDriver } = useDriver()
const { toast } = useToast()
const tableKey = ref(0)

const columns: DriverColumn[] = [
  { id: 'name', header: 'Name' },
  { id: 'team_name', header: 'Team' },
  { id: 'warehouse', header: 'Warehouse' },
  { id: 'phone', header: 'Phone' },
  { id: 'driver_type', header: 'Type' },
  { id: 'enroll_time', header: 'Enroll Time' },
  { id: 'dl_expired_time', header: 'DL Expiry' },
  { id: 'status', header: 'Status' },
  { id: 'email', header: 'Email' },
  { id: 'available', header: 'Available' },
  { id: 'rating', header: 'Rating' },
  { id: 'completed_trips', header: 'Completed Trips' },
]

const filters = ref<DriverFilters>({
  warehouse: null,
  team_name: null,
  driver_type: null,
  status: null,
})

const defaultDimensions = {
  width: '100%',
  maxWidth: '100%',
  height: '500px',
  maxHeight: '80vh',
}

const dimensions = ref({ ...defaultDimensions })

const tableDimensionsStyle = computed(() => ({
  width: dimensions.value.width,
  maxWidth: dimensions.value.maxWidth,
  height: dimensions.value.height,
  maxHeight: dimensions.value.maxHeight,
}))

const pagination = ref({ pageIndex: 0, pageSize: 20 })
const sorting = ref([])
const columnFilters = ref([])

const showDriverDialog = ref(false)
const selectedDriver = ref<HaulblazeContact | null>(null)

const filteredDrivers = computed<ReadableDriver[]>(() => {
  return drivers.value.map(driver => ({
    ...getReadableDriver(driver),
    color: getRandomColor(String(driver.uid)),
  }))
})

const paginationStart = computed(() => pagination.value.pageIndex * pagination.value.pageSize + 1)
const paginationEnd = computed(() => Math.min((pagination.value.pageIndex + 1) * pagination.value.pageSize, totalCount.value))

const handleFilterChange = (newFilters: Partial<DriverFilters>) => {
  filters.value = { ...filters.value, ...newFilters }
  pagination.value.pageIndex = 0 // Reset to first page when filters change
  fetchRecords()
}

const handleDimensionsChange = (newDimensions: typeof dimensions.value) => {
  // Basic validation
  const validatedDimensions = {
    width: validateDimension(newDimensions.width, defaultDimensions.width),
    maxWidth: validateDimension(newDimensions.maxWidth, defaultDimensions.maxWidth),
    height: validateDimension(newDimensions.height, defaultDimensions.height),
    maxHeight: validateDimension(newDimensions.maxHeight, defaultDimensions.maxHeight),
  }
  dimensions.value = validatedDimensions
}

const validateDimension = (value: string, defaultValue: string): string => {
  // Check if the value is a valid CSS dimension
  if (/^(\d+(\.\d+)?(px|%|em|rem|vh|vw))|auto|none$/.test(value)) {
    return value
  }
  return defaultValue
}

const resetDimensions = () => {
  dimensions.value = { ...defaultDimensions }
}

const handleSortingChange = (newSorting: any) => {
  sorting.value = newSorting
  fetchRecords()
}

const handleColumnFiltersChange = (newColumnFilters: any) => {
  columnFilters.value = newColumnFilters
  fetchRecords()
}

const handleDriverUpdate = async (updatedDriver: HaulblazeContact) => {
  try {
    const result = await updateDriver(updatedDriver)
    // Update the local state
    const index = drivers.value.findIndex(d => d.uid === updatedDriver.uid)
    if (index !== -1) {
      drivers.value[index] = result
    }
    toast({
      title: "Success",
      description: `Driver ${result.first_name} ${result.last_name} updated successfully`,
    })
  } catch (e) {
    console.error('Error updating driver:', e)
    toast({
      title: "Error",
      description: "Failed to update driver. Please try again.",
      variant: 'destructive',
    })
  }
}

const fetchRecords = async () => {
  try {
    await fetchDrivers(filters.value, sorting.value, columnFilters.value, pagination.value)
    tableKey.value++ // Force re-render of table
    console.log('Pagination details:')
    console.log('Total count:', totalCount.value)
    console.log('Page size:', pagination.value.pageSize)
    console.log('Current page index:', pagination.value.pageIndex)
    console.log('Total pages:', Math.ceil(totalCount.value / pagination.value.pageSize))
    console.log('Pagination start:', paginationStart.value)
    console.log('Pagination end:', paginationEnd.value)
  } catch (e) {
    console.error('Error fetching drivers:', e)
    toast({
      title: "Error",
      description: "Failed to fetch driver records. Please try again.",
      variant: 'destructive',
    })
  }
}

const openDriverDialog = (driver?: HaulblazeContact) => {
  selectedDriver.value = driver || null
  showDriverDialog.value = true
}

const closeDriverDialog = () => {
  showDriverDialog.value = false
  selectedDriver.value = null
}

const saveDriver = async (driver: HaulblazeContact) => {
  try {
    if (driver.uid) {
      const updatedDriver = await updateDriver(driver)
      // Update the local state
      const index = drivers.value.findIndex(d => d.uid === driver.uid)
      if (index !== -1) {
        drivers.value[index] = updatedDriver
      }
      toast({
        title: "Success",
        description: `Driver ${updatedDriver.first_name} ${updatedDriver.last_name} updated successfully`,
      })
    } else {
      const newDriver = await createDriver(driver)
      drivers.value.push(newDriver)
      toast({
        title: "Success",
        description: `Driver ${newDriver.first_name} ${newDriver.last_name} created successfully`,
      })
    }
    closeDriverDialog()
  } catch (e) {
    console.error('Error saving driver:', e)
    toast({
      title: "Error",
      description: "Failed to save driver. Please try again.",
      variant: 'destructive',
    })
  }
}

const handlePageChange = (newPage: number) => {
  pagination.value.pageIndex = newPage - 1
  fetchRecords()
}

watch([filters, sorting, columnFilters], fetchRecords, { deep: true })

onMounted(async () => {
  await fetchRecords()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
