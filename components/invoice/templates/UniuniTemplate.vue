<template>
  <ClientOnly>  
  <div class="space-y-6">
    <div class="space-y-2">
      <h3 class="text-lg font-medium">Uniuni Invoice Template</h3>
      <p class="text-sm text-muted-foreground">Fill in the details to generate a Uniuni invoice.</p>
    </div>

    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="space-y-4">
        <FormField v-slot="{ field }" name="payment_cycle">
          <FormItem>
            <FormLabel>Payment Cycle</FormLabel>
            <Select v-bind="field">
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="cycle in paymentCycles" :key="cycle" :value="cycle">
                  {{ cycle }}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage>{{ errors.payment_cycle }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="team">
          <FormItem>
            <FormLabel>Team</FormLabel>
            <Select v-bind="field">
              <SelectTrigger>
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="team in teams" :key="team.id" :value="team.value || team.id">
                  {{ team.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage>{{ errors.team }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="customer_id">
          <FormItem>
            <FormLabel>Customer</FormLabel>
            <Select v-bind="field">
              <SelectTrigger>
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="customer in customers" :key="customer.id" :value="customer.value || customer.id">
                  {{ customer.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage>{{ errors.customer_id }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField v-slot="{ field }" name="warehouse">
          <FormItem>
            <FormLabel>Warehouse</FormLabel>
            <Select v-bind="field">
              <SelectTrigger>
                <SelectValue placeholder="Select Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.value || warehouse.id">
                  {{ warehouse.label }}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage>{{ errors.warehouse }}</FormMessage>
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full" :disabled="isSubmitLoading">
          <Icon v-if="isSubmitLoading" name="ph:spinner" class="w-4 h-4 mr-2 animate-spin" />
          {{ isSubmitLoading ? 'Checking...' : 'Generate Invoice' }}
        </Button>
      </div>
    </Form>

    <Alert v-if="error" variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>

    <Alert v-if="noInvoiceAvailable" variant="warning">
      <AlertTitle>No Invoice Available</AlertTitle>
      <AlertDescription>There is no available invoice for the selected criteria.</AlertDescription>
    </Alert>

    <Card v-if="availableInvoice" class="mt-6">
      <CardHeader>
        <CardTitle>Available Invoice</CardTitle>
        <CardDescription>Review the generated invoice details</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="font-medium">Invoice Number:</span>
            <span>{{ availableInvoice.invoice_number }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">Total Amount:</span>
            <span>{{ availableInvoice.total }}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button @click="confirmInvoice" class="w-full">Confirm and Create Invoice</Button>
      </CardFooter>
    </Card>
  </div>
</ClientOnly>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { Database } from '~/types/database'
import { useEnums } from '~/composables/useEnums'
import { useInvoice } from '~/composables/useInvoice'

type Invoice = Database['public']['Tables']['invoices']['Row']
type InvoiceView = Database['public']['Views']['invoice_view']['Row']

const emit = defineEmits<{
  (e: 'use-template', invoice: Partial<InvoiceView>): void
}>()

const { enumItems, getEnumsByType, fetchEnums, isLoaded, isLoading: isEnumLoading } = useEnums()
const { availableInvoice, isLoading: isInvoiceLoading, error, checkAvailableInvoice, fetchPaymentCycles } = useInvoice()

const paymentCycles = ref<string[]>([])
const teams = computed(() => getEnumsByType('TEAM_NAME'))
const customers = computed(() => getEnumsByType('CUSTOM_ID'))
const warehouses = computed(() => getEnumsByType('WAREHOUSE_CODE'))

const noInvoiceAvailable = ref(false)

onMounted(async () => {
  try {
    await Promise.all([
      !isLoaded.value && !isEnumLoading.value ? fetchEnums() : Promise.resolve(),
      fetchPaymentCycles().then(cycles => paymentCycles.value = cycles)
    ])
  } catch (err) {
    console.error('Error fetching initial data:', err)
    error.value = 'Failed to load initial data. Please refresh the page.'
  }
})

const schema = toTypedSchema(z.object({
  payment_cycle: z.string().min(1, 'Payment cycle is required'),
  team: z.string().min(1, 'Team is required'),
  customer_id: z.string().min(1, 'Customer is required'),
  warehouse: z.string().min(1, 'Warehouse is required'),
}))

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const isSubmitLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isSubmitLoading.value = true
  noInvoiceAvailable.value = false
  error.value = null
  try {
    await checkAvailableInvoice(
      values.payment_cycle,
      values.team,
      values.customer_id,
      values.warehouse
    )
    noInvoiceAvailable.value = !availableInvoice.value
  } catch (err) {
    console.error('Error checking available invoice:', err)
    error.value = 'An error occurred while checking for available invoices. Please try again.'
  } finally {
    isSubmitLoading.value = false
  }
})

const confirmInvoice = () => {
  if (availableInvoice.value) {
    emit('use-template', availableInvoice.value)
  }
}
</script>