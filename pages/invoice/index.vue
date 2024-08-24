<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 hidden md:block">Invoice Management</h1>
    <div class="mb-4 flex justify-between items-center">
      <div class="w-full grid grid-cols-2 md:grid-cols-6 gap-6">
        <Select v-model="statusFilter" class="md:col-span-2">
          <SelectTrigger class="flex items-center min-w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent class="uppercase">
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="SEND">Sent</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="CANCEL">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Input v-model="searchQuery" placeholder="Search invoices..." class="col-span-1 md:col-span-2" />
        <Button @click="showCreateModal = true" class="col-span-1 md:col-end-7"> <Icon name="ph:yarn-duotone" class="w-5 h-5 mr-2" /> New Invoice</Button>
      </div>
    </div>
    <Card class="overflow-hidden">
      <CardContent class="p-0">
        <InvoiceList 
          v-if="!isLoading"
          :invoices="filteredInvoices" 
          @edit="handleUpdateInvoice" 
          @delete="handleDeleteInvoice" 
        />
        <div v-else class="flex justify-center items-center h-64">
          <Icon name="ph:spinner" class="w-8 h-8 animate-spin" />
        </div>
      </CardContent>
    </Card>

    <Dialog v-model:open="showCreateModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription class="text-gray-500 mb-4">Fill in the details or use a template to create a new invoice.</DialogDescription>
        </DialogHeader>
        <CreateInvoice 
          v-if="showCreateModal"
          :customers="customers" 
          @submit="handleCreateInvoice" 
          @cancel="showCreateModal = false"
        />
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import { useInvoice } from '~/composables/useInvoice'
import { useCustomer } from '~/composables/useCustomer'
import type { Database } from '~/types/database'

type Invoice = Database['public']['Tables']['invoices']['Row']
type Customer = Database['public']['Tables']['customers']['Row']

interface InvoiceWithCustomer extends Invoice {
  recipient?: Customer
  sender?: Customer
}

const { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } = useInvoice()
const { fetchCustomers } = useCustomer()
const { toast } = useToast()

const invoices = ref<InvoiceWithCustomer[]>([])
const customers = ref<Customer[]>([])
const showCreateModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const isLoading = ref(true)

const filteredInvoices = computed(() => {
  return invoices.value.filter(invoice => 
    (invoice.invoice_number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
     invoice.total.toString().includes(searchQuery.value)) &&
    (statusFilter.value === '' || invoice.status === statusFilter.value)
  )
})

const handleCreateInvoice = async (newInvoice: Partial<Invoice>) => {
  try {
    const createdInvoice = await createInvoice(newInvoice)
    invoices.value.push(createdInvoice)
    toast({
      title: 'Success',
      description: 'Invoice created successfully'
    })
    showCreateModal.value = false
  } catch (error) {
    console.error('Error creating invoice:', error)
    toast({
      title: 'Error',
      description: 'Failed to create invoice',
      variant: 'destructive'
    })
  }
}

const handleUpdateInvoice = async (invoice: InvoiceWithCustomer) => {
  try {
    const updatedInvoice = await updateInvoice(invoice.id, invoice)
    const index = invoices.value.findIndex(i => i.id === updatedInvoice.id)
    if (index !== -1) {
      invoices.value[index] = updatedInvoice
    }
    toast({
      title: 'Success',
      description: 'Invoice updated successfully'
    })
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to update invoice',
      variant: 'destructive'
    })
  }
}

const handleDeleteInvoice = async (id: number) => {
  try {
    await deleteInvoice(id)
    invoices.value = invoices.value.filter(invoice => invoice.id !== id)
    toast({
      title: 'Success',
      description: 'Invoice deleted successfully'
    })
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to delete invoice',
      variant: 'destructive'
    })
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    const [invoicesData, customersData] = await Promise.all([
      fetchInvoices(),
      fetchCustomers()
    ])
    invoices.value = invoicesData || []
    customers.value = customersData || []
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch data',
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false
  }
})
</script>