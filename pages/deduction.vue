<template>
  <div class="p-4 space-y-4 flex flex-col h-full">
    <!-- Header -->
    <div class="flex justify-between items-center flex-wrap gap-2">
      <div class="flex space-x-2 flex-wrap">
        <USelectMenu v-model="selectedCompany" :options="companyOptions" placeholder="HORIZON" />
        <USelectMenu v-model="status" :options="statusOptions" placeholder="STATUS" />
        <UPopover mode="click" :popper="{ placement: 'bottom-start' }">
          <UButton color="gray" variant="soft" trailing-icon="i-heroicons-chevron-down-20-solid">
            {{ dateRange }}
          </UButton>
          <template #content>
            <UCalendar v-model="date" is-range />
          </template>
        </UPopover>
      </div>
      <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="SEARCH BY NAME OR DRIVER ID" />
      <div class="flex space-x-2">
        <UButton color="black" @click="addDeduction">Add Deduction</UButton>
        <UButton color="gray" @click="noLinkableRecords">No Linkable Records</UButton>
      </div>
    </div>

    <!-- Table -->
    <UTable :columns="columns" :rows="deductions" :sort="{ column: 'cycle', direction: 'desc' }"
      class="border rounded-lg shadow-sm flex-1">
      <template #cycle-data="{ row }">
        <div class="flex items-center">
          <UIcon name="i-heroicons-chevron-right" class="mr-2" />
          {{ row.cycle }}
          <UBadge color="gray" size="sm" class="ml-2">{{ row.count }}</UBadge>
        </div>
      </template>
      <template #warehouse-data="{ row }">
        <UBadge v-if="row.warehouse" color="purple" size="sm">{{ row.warehouse }}</UBadge>
      </template>
      <template #link-payemnt-data="{ row }">
        <UBadge v-if="row.linkPayemnt" color="red" size="sm">{{ row.linkPayemnt }}</UBadge>
      </template>
      <template #reason-data="{ row }">
        <UBadge v-if="row.reason" color="green" size="sm">{{ row.reason }}</UBadge>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
const selectedCompany = ref('HORIZON')
const status = ref('')
const dateRange = ref('09/30/24 - 10/06/24')
const search = ref('')
const date = ref()

const companyOptions = [
  { label: 'HORIZON', value: 'HORIZON' },
  // Add more company options as needed
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const columns = [
  { key: 'cycle', label: 'Cycle', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'trackingNo', label: 'Tracking No.' },
  { key: 'driverId', label: 'Driver ID' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'linkPayemnt', label: 'Link Payemnt' },
  { key: 'amount', label: 'Amount' },
  { key: 'reason', label: 'Reason' },
  { key: 'uid', label: 'UID' },
]

const deductions = ref([
  {
    cycle: '10/30/2024',
    count: 2,
    name: '1',
    trackingNo: '2',
    driverId: '2',
    warehouse: '1',
    linkPayemnt: '1',
    amount: '$120.00',
    reason: '1',
    uid: '1',
  },
  {
    cycle: '10/30/2024',
    name: 'NULL NULL',
    trackingNo: 'UUS49F0578461102200',
    driverId: '30336',
    amount: '$60.00',
    reason: 'COMPL POD',
  },
  {
    cycle: '10/30/2024',
    name: 'NULL NULL',
    trackingNo: 'UUS48U0578420872740',
    driverId: '30355',
    amount: '$60.00',
    reason: 'COMPL POD',
  },
  {
    cycle: '09/30/2024',
    count: 6,
    name: '3',
    trackingNo: '4',
    driverId: '4',
    warehouse: '2',
    linkPayemnt: '3',
    amount: '$360.00',
    reason: '1',
    uid: '3',
  },
  // Add more deduction data here
])

const addDeduction = () => {
  // Implement add deduction logic
  console.log('Add deduction clicked')
}

const noLinkableRecords = () => {
  // Implement no linkable records logic
  console.log('No linkable records clicked')
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
