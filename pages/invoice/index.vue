<template>
  <ClientOnly>
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
          <Button @click="showCreateModal = true" class="col-span-1 md:col-end-7">
            <Icon name="ph:plus-circle" class="w-5 h-5 mr-2" />
            New Invoice
          </Button>
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
        <DialogContent class="sm:max-w-[600px] px-4 pt-8 max-h-[96dvh]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription class="text-gray-500 mb-2">Fill in the details or use a template to create a new invoice.</DialogDescription>
          </DialogHeader>
          <div class="overflow-y-auto">
            <Tabs v-model="activeTab" class="w-full">
              <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="custom">Custom Invoice</TabsTrigger>
                <TabsTrigger value="uniuni">Uniuni Invoice</TabsTrigger>
              </TabsList>
              <TabsContent value="custom">
                <CustomInvoiceForm 
                  :customers="customers"
                  @submit="handleCreateInvoice"
                  @cancel="showCreateModal = false"
                />
              </TabsContent>
              <TabsContent value="uniuni">
                <UniuniTemplateForm
                  :customers="customers"
                  @submit="handleCheckInvoice"
                  @cancel="showCreateModal = false"
                />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </ClientOnly> 
</template>

<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import { useInvoice } from '~/composables/useInvoice'
import { useCustomer } from '~/composables/useCustomer'
import type { Database } from '~/types/database'
import type { UniuniTemplateData } from '~/types/invoice'

type Invoice = Database['public']['Tables']['invoices']['Row']
type Customer = Database['public']['Tables']['customers']['Row']

interface InvoiceWithCustomer extends Invoice {
  recipient?: Customer
  sender?: Customer
}

const { fetchInvoices, createInvoice, updateInvoice, deleteInvoice, checkAvailableInvoice } = useInvoice()
const { fetchCustomers } = useCustomer()
const { toast } = useToast()

const invoices = ref<InvoiceWithCustomer[]>([])
const customers = ref<Customer[]>([])
const showCreateModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const isLoading = ref(true)
const isSubmitLoading = ref(false)
const activeTab = ref('uniuni')

const filteredInvoices = computed(() => {
  return invoices.value.filter(invoice => 
    (invoice.invoice_number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
     invoice.total.toString().includes(searchQuery.value)) &&
    (statusFilter.value === '' || statusFilter.value === 'ALL' || invoice.status === statusFilter.value)
  )
})

const handleSubmit = () => {
  if (activeTab.value === 'custom') {
    // Trigger submit in CustomInvoiceForm
    // This should be handled by the form's own submit button
  } else {
    // Trigger submit in UniuniTemplateForm
    // This should be handled by the form's own submit button
  }
}

const handleCreateInvoice = async (newInvoice: Partial<Invoice>) => {
  try {
    isSubmitLoading.value = true
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
  } finally {
    isSubmitLoading.value = false
  }
}

const handleCheckInvoice = async (templateData: UniuniTemplateData) => {
  try {
    isSubmitLoading.value = true
    const result = await checkAvailableInvoice(templateData)
    if (result) {
      toast({
        title: 'Success',
        description: 'Invoice available'
      })
    } else {
      toast({
        title: 'Info',
        description: 'No available invoice found'
      })
    }
  } catch (error) {
    console.error('Error checking invoice:', error)
    toast({
      title: 'Error',
      description: 'Failed to check invoice',
      variant: 'destructive'
    })
  } finally {
    isSubmitLoading.value = false
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