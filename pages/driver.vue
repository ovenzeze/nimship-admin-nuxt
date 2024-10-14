<template>
  <div class="flex flex-col h-full">
    <!-- Main content -->
    <div class="flex-1 flex flex-col h-full pb-10 md:pb-4 overflow-hidden">
      <!-- Filter -->
      <div class="w-full max-w-full">
        <DriverFilter @update:filter="handleFilterChange" @add-new-driver="openDriverDialog()" :filters="filters" />
      </div>

      <!-- Table -->
      <div class="flex-1 overflow-hidden border border-border rounded-lg border-b-0 rounded-b-none">
        <DriverTable :data="filteredDrivers" :columns="columns" :loading="loading" @update:sorting="handleSortingChange"
          @update:columnFilters="handleColumnFiltersChange" @update:driver="handleDriverUpdate"
          @edit-driver="openDriverDialog" @select-driver="selectDriver" />
      </div>

      <!-- Pagination -->
      <div class="px-4 py-2 border border-border flex justify-between items-center rounded-lg rounded-t-none">
        <div class="hidden md:block">
          <span class="text-sm text-primary">
            Showing {{ paginationStart }} to {{ paginationEnd }} of {{ totalCount }} entries
          </span>
        </div>
        <Pagination v-if="!loading" v-slot="{ page }" :total="totalCount" :sibling-count="1" :show-edges="true"
          :default-page="pagination.pageIndex + 1" @update:page="handlePageChange">
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
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

    <!-- Mobile Driver Details Modal -->
    <Dialog v-model:open="showMobileDetailsModal">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Driver Details</DialogTitle>
          <DialogDescription>
            {{ selectedDriver ? `${selectedDriver.first_name} ${selectedDriver.last_name}` : '' }}
          </DialogDescription>
        </DialogHeader>
        <div v-if="selectedDriver" class="grid gap-4 py-4">
          <div v-for="column in columns" :key="column.id" class="grid grid-cols-4 items-center gap-4">
            <Label :for="column.id" class="text-right">{{ column.header }}</Label>
            <div :id="column.id" class="col-span-3">
              {{ formatCellValue(selectedDriver, column.id) }}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button @click="closeMobileDetailsModal">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, h } from 'vue'
import { useToast } from '@/components/ui/toast'
import type { DriverFilters, HaulblazeContact, DriverColumn, Contact, QualificationIcon, Qualification } from '~/types'
import { getContact } from '~/utils/driver'
import { getRandomColor } from '~/utils/colorUtils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useDriver } from '~/composables/useDriver'
import QualificationCell from '~/components/driver/QualificationCell.vue'

const { drivers, fetchDrivers, updateDriver, createDriver, totalCount } = useDriver()
const { toast } = useToast()
const loading = ref(false)

const qualificationIcons: QualificationIcon[] = [
  { name: 'insurance', icon: 'i-mdi-car-insurance', tooltip: 'Insurance' },
  { name: 'license', icon: 'i-mdi-card-account-details-outline', tooltip: 'License' },
  { name: 'vehicle', icon: 'i-mdi-car', tooltip: 'Vehicle' },
]

const columns: DriverColumn[] = [
  { id: 'name', header: 'Name', cell: (props) => h('span', props.row.name) },
  { id: 'driver_id', header: 'Driver ID', cell: (props) => h('span', props.row.driver_id) },
  { id: 'warehouse', header: 'Warehouse', cell: (props) => h('span', props.row.warehouse) },
  { id: 'phone', header: 'Phone', cell: (props) => h('span', props.row.phone) },
  { id: 'enroll_time', header: 'Enroll Time', cell: (props) => h('span', formatDate(props.row.enroll_time)) },
  {
    id: 'qualification',
    header: 'Qualification',
    cell: (props) => h(QualificationCell, { qualification: props.row.qualification, icons: qualificationIcons })
  },
  { id: 'dl_expired_time', header: 'DL Expiry', cell: (props) => h('span', formatDate(props.row.dl_expired_time)) },
  { id: 'status', header: 'Status', cell: (props) => h('span', props.row.status) },
  { id: 'team_name', header: 'Team', cell: (props) => h('span', props.row.team_name) },
  { id: 'driver_type', header: 'Type', cell: (props) => h('span', props.row.driver_type) },
  { id: 'email', header: 'Email', cell: (props) => h('span', { class: 'uppercase' }, props.row.email) },
  // { id: 'employment_status', header: 'Employment Status', cell: (props) => h('span', props.row.employment_status) },
]

const filters = ref<DriverFilters>({
  warehouse: null,
  team_name: '',
  driver_type: null,
  status: null,
  employment_status: null,
})

const pagination = ref({ pageIndex: 0, pageSize: 20 })
const sorting = ref([])
const columnFilters = ref([])

const showDriverDialog = ref(false)
const selectedDriver = ref<Contact | null>(null)
const showMobileDetailsModal = ref(false)

const filteredDrivers = computed<Contact[]>(() => {
  return drivers.value.map((driver: HaulblazeContact) => ({
    ...getContact(driver),
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
    toast({
      title: "Success",
      description: `Driver ${result.first_name} ${result.last_name} updated successfully`,
    })
    fetchRecords() // Refresh the data after update
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
  loading.value = true
  try {
    await fetchDrivers(filters.value, sorting.value, columnFilters.value, pagination.value)
  } catch (e) {
    console.error('Error fetching drivers:', e)
    toast({
      title: "Error",
      description: "Failed to fetch driver records. Please try again.",
      variant: 'destructive',
    })
  } finally {
    loading.value = false
  }
}

const openDriverDialog = (driver?: HaulblazeContact) => {
  selectedDriver.value = driver ? getContact(driver) : null
  showDriverDialog.value = true
}

const closeDriverDialog = () => {
  showDriverDialog.value = false
  selectedDriver.value = null
}

const saveDriver = async (driver: HaulblazeContact) => {
  try {
    if (driver.uid) {
      await updateDriver(driver)
      toast({
        title: "Success",
        description: `Driver ${driver.first_name} ${driver.last_name} updated successfully`,
      })
    } else {
      await createDriver(driver)
      toast({
        title: "Success",
        description: `Driver ${driver.first_name} ${driver.last_name} created successfully`,
      })
    }
    closeDriverDialog()
    fetchRecords() // Refresh the data after save
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

const selectDriver = (driver: Contact) => {
  selectedDriver.value = driver
  if (window.innerWidth < 768) { // Assuming 768px as the breakpoint for mobile devices
    showMobileDetailsModal.value = true
  }
}

const closeMobileDetailsModal = () => {
  showMobileDetailsModal.value = false
  selectedDriver.value = null
}

const formatDate = (date: string | null | undefined) => {
  return date ? new Date(date).toLocaleDateString() : 'N/A'
}

const formatCellValue = (row: Contact, columnId: keyof Contact) => {
  switch (columnId) {
    case 'enroll_time':
    case 'dl_expired_time':
      return formatDate(row[columnId] as string | null | undefined)
    case 'qualification':
      return row.qualification ? Object.keys(row.qualification).filter(key => row.qualification[key as keyof Qualification]).join(', ') : 'N/A'
    default:
      return row[columnId] || 'N/A'
  }
}

watch([filters, sorting, columnFilters], fetchRecords, { deep: true })

onMounted(async () => {
  await fetchRecords()
})
</script>
