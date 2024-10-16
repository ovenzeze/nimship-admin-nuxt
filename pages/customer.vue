<template>
  <div class="h-full p-4 space-y-4 flex flex-col">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="flex space-x-2">
        <USelectMenu v-model="status" :options="statusOptions" placeholder="STATUS" />
        <USelectMenu v-model="team" :options="teamOptions" placeholder="TEAM" />
        <USelectMenu v-model="paymentCycle" :options="paymentCycleOptions" placeholder="PAYMENT CYCLE" />
      </div>
      <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="SEARCH BY NAME" />
      <UButton icon="i-heroicons-plus" @click="openAddCustomerModal">Add Customer</UButton>
    </div>

    <!-- Table -->
    <UTable :columns="columns" :rows="customers" :sort="{ column: 'name', direction: 'asc' }"
      class="border rounded-lg shadow-sm flex-1">
      <template #name-data="{ row }">
        {{ row.name }}
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="getActionItems(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-vertical" />
        </UDropdown>
      </template>
    </UTable>

    <!-- Pagination -->
    <div class="flex justify-between items-center">
      <p class="text-sm text-gray-500">{{ customers.length }} results</p>
      <UPagination v-model="page" :total="100" :per-page="10" />
    </div>

    <!-- Add/Edit Customer Modal -->
    <UModal v-model="isModalOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              {{ editingCustomer ? 'Edit Customer' : 'Add Customer' }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="closeModal" />
          </div>
        </template>
        <div class="space-y-4">
          <UFormGroup label="Name">
            <UInput v-model="customerForm.name" />
          </UFormGroup>
          <UFormGroup label="Bill Address">
            <UInput v-model="customerForm.billAddress" />
          </UFormGroup>
          <UFormGroup label="Mail Address">
            <UInput v-model="customerForm.mailAddress" />
          </UFormGroup>
          <UFormGroup label="Website">
            <UInput v-model="customerForm.website" />
          </UFormGroup>
          <UFormGroup label="Email">
            <UInput v-model="customerForm.email" />
          </UFormGroup>
          <UFormGroup label="Phone">
            <UInput v-model="customerForm.phone" />
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton color="gray" variant="soft" @click="closeModal">Cancel</UButton>
            <UButton color="primary" @click="saveCustomer">Save</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const status = ref('')
const team = ref('')
const paymentCycle = ref('')
const search = ref('')
const page = ref(1)
const isModalOpen = ref(false)
const editingCustomer = ref(null)

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const teamOptions = [
  { label: 'Team A', value: 'teamA' },
  { label: 'Team B', value: 'teamB' },
]

const paymentCycleOptions = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Bi-weekly', value: 'biweekly' },
  { label: 'Monthly', value: 'monthly' },
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'billAddress', label: 'Bill Address' },
  { key: 'mailAddress', label: 'Mail Address' },
  { key: 'website', label: 'Website' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'actions', label: 'Actions' },
]

const customers = ref([
  {
    id: 1,
    name: 'HORIZON EXPRESS SOLUTIONS L.L.C',
    billAddress: '2023 S 8TH ST ALHAMBRA 91803',
    mailAddress: '2023 S 8TH ST APT B ALHAMBRA 91803',
    website: 'horizon-ex.com',
    email: 'wapiti@horizon-ex.com',
    phone: '626-476-2304',
  },
  // ... Add more customer data here
])

const customerForm = ref({
  name: '',
  billAddress: '',
  mailAddress: '',
  website: '',
  email: '',
  phone: '',
})

const getActionItems = (customer) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square',
      click: () => editCustomer(customer),
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => deleteCustomer(customer),
    },
  ],
]

const openAddCustomerModal = () => {
  editingCustomer.value = null
  customerForm.value = {
    name: '',
    billAddress: '',
    mailAddress: '',
    website: '',
    email: '',
    phone: '',
  }
  isModalOpen.value = true
}

const editCustomer = (customer) => {
  editingCustomer.value = customer
  customerForm.value = { ...customer }
  isModalOpen.value = true
}

const deleteCustomer = (customer) => {
  // Implement delete logic here
  customers.value = customers.value.filter(c => c.id !== customer.id)
}

const saveCustomer = () => {
  if (editingCustomer.value) {
    // Update existing customer
    const index = customers.value.findIndex(c => c.id === editingCustomer.value.id)
    if (index !== -1) {
      customers.value[index] = { ...editingCustomer.value, ...customerForm.value }
    }
  } else {
    // Add new customer
    customers.value.push({
      id: customers.value.length + 1,
      ...customerForm.value,
    })
  }
  closeModal()
}

const closeModal = () => {
  isModalOpen.value = false
  editingCustomer.value = null
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
