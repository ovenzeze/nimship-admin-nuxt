<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Invoice Management</h1>
    <div class="mb-4 flex justify-between items-center">
      <div class="flex space-x-2">
        <Input v-model="searchQuery" placeholder="Search invoices..." class="w-64" />
        <Select v-model="statusFilter">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="SEND">Sent</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="CANCEL">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button @click="showCreateModal = true">Create New Invoice</Button>
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
      <DialogContent class="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>Fill in the details or use a template to create a new invoice.</DialogDescription>
        </DialogHeader>
        <CreateInvoiceForm 
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
import { ref, computed } from 'vue'
import { useToast } from '~/components/ui/toast'
import { useInvoice } from '~/composables/useInvoice'
import { useCustomer } from '~/composables/useCustomer'
import type { Database } from '~/types/database'
import CreateInvoiceForm from '~/components/invoice/CreateInvoiceForm.vue'

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
const showCreateModal = ref(true)
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