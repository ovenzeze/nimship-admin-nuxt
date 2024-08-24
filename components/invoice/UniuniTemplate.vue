<template>
  <ClientOnly>
    <div class="space-y-4 md:space-y-6">
      <!-- <div class="space-y-2">
        <h3 class="text-lg font-medium">Uniuni Invoice Template</h3>
        <p class="text-sm text-muted-foreground">Fill in the details to generate a Uniuni invoice.</p>
      </div> -->

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-4 mt-6">
    <div class="col-span-2">
      <div class="mb-2">
        <span class="text-base text-gray-500 font-thin">Customer</span>
      </div>
      <div>
        <p class="text-base font-thin uppercase truncate max-w-[80%]">Uniuni Logistics Consulting</p>
      </div>
    </div>

    <div>
      <div class="mb-2">
        <span class="text-base text-gray-500 font-thin">Pay Cycle</span>
      </div>
      <div>
        <p class="text-base">Weekly</p>
      </div>
    </div>

    <div>
      <div class="mb-2">
        <span class="text-base text-gray-500 font-thin">Last Used</span>
      </div>
      <div>
        <p class="text-base">07/29/2024</p>
      </div>
    </div>
  </div>

      <blockquote class="mt-2 mb-4  border-blue-500 text-base font-medium text-gray-700  bg-gray-50 pl-3 pr-4 py-2  rounded-lg">
        This template check any available invoice for the selected criteria and generate a new invoice if there is no available invoice. Work with Uniuni.
  </blockquote>

  <Separator />


      <form @submit="onSubmit" :validationSchema="schema">
        <div class="space-y-6 md:space-y-6">
          <FormField v-slot="{ field }" name="payment_cycle">
            <FormItem>
              <Select v-bind="field">
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="cycle in paymentCycles" :key="cycle" :value="String(cycle)">
                    {{ cycle }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="team">
            <FormItem>
              <Select v-bind="field">
                <SelectTrigger>
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="team in teams" :key="team.id" :value="String(team.value || team.id)">
                    {{ team.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="customer_id">
            <FormItem>
              <Select v-bind="field">
                <SelectTrigger>
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="customer in customers" :key="customer.id" :value="String(customer.value || customer.id)">
                    {{ customer.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="warehouse">
            <FormItem>
              <Select v-bind="field">
                <SelectTrigger>
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="warehouse in warehouses" :key="warehouse.id" :value="String(warehouse.value || warehouse.id)">
                    {{ warehouse.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isSubmitLoading">
            <Icon v-if="isSubmitLoading" name="ph:spinner" class="w-4 h-4 mr-2 animate-spin" />
            <Icon else name="ph:check-circle" class="w-4 h-4 mr-2" />
            {{ isSubmitLoading ? 'Checking...' : 'Generate Invoice' }}
          </Button>
        </div>
      </form>
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
import { useToast } from '~/components/ui/toast'

type Invoice = Database['public']['Tables']['invoices']['Row']
type InvoiceView = Database['public']['Views']['invoice_view']['Row']

const emit = defineEmits<{
  (e: 'use-template', invoice: Partial<InvoiceView>): void
}>()

const { toast } = useToast()
toast({
  title: 'Test Toast',
  description: 'This is a test toast message'
})
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
  warehouse: z.string(),
}))

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    payment_cycle: '',
    team: teams.value[0]?.value || '',
    customer_id: '',
    warehouse: '',
  },
})

const isSubmitLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  console.log('[onSubmit]:', values)
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
    console.log('[availableInvoice]:', availableInvoice.value)
    if (!availableInvoice.value) toast({ title: 'No invoice available', description: 'No invoice available for the selected criteria. A new invoice will be generated.' })
    else confirmInvoice()
  } catch (err) {
    console.error('Error checking available invoice:', err)
    toast({ title: 'Error', description: 'Failed to check available invoice', variant: 'destructive' })
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