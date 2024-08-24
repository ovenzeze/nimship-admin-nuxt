<template>
  <ClientOnly>  
  <Tabs default-value="uniuni" class="w-full">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="custom">Custom Invoice</TabsTrigger>
      <TabsTrigger value="uniuni">Uniuni Template</TabsTrigger>
    </TabsList>
    <TabsContent value="custom">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="space-y-8">
          <FormField v-slot="{ field }" name="invoice_number">
            <FormItem :error="errors.invoice_number">
              <FormControl>
                <div class="relative">
                  <Icon name="ph:hash-bold" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input v-bind="field" placeholder="Invoice number" class="pl-10" />
                </div>
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="invoice_date">
            <FormItem :error="errors.invoice_date">
              <FormControl>
                <div class="relative">
                  <Icon
                    name="ph:calendar-bold"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    v-bind="field"
                    type="date"
                    placeholder="Invoice date"
                    class="pl-10"
                  />
                </div>
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="due_date">
            <FormItem :error="errors.due_date">
              <FormControl>
                <div class="relative">
                  <Icon
                    name="ph:clock-countdown-bold"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    v-bind="field"
                    type="date"
                    placeholder="Due date"
                    class="pl-10"
                  />
                </div>
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="total">
            <FormItem :error="errors.total">
              <FormControl>
                <div class="relative">
                  <Icon
                    name="ph:currency-dollar-bold"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    v-bind="field"
                    type="number"
                    step="0.01"
                    placeholder="Total amount"
                    class="pl-10"
                  />
                </div>
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="recipient_id">
            <FormItem :error="errors.recipient_id">
              <FormControl>
                <Select v-model="field.value">
                  <SelectTrigger class="w-full">
                    <Icon name="ph:user-bold" class="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent v-if="computedCustomers.length > 0">
                    <SelectItem
                      v-for="customer in computedCustomers"
                      :key="customer.id"
                      :value="String(customer.id)"
                    >
                      {{ customer.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="sender_id">
            <FormItem :error="errors.sender_id">
              <FormControl>
                <Select v-model="field.value">
                  <SelectTrigger class="w-full">
                    <Icon name="ph:user-circle-bold" class="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select sender" />
                  </SelectTrigger>
                  <SelectContent v-if="computedCustomers.length > 0">
                    <!-- Ensure only non-empty values are shown -->
                    <SelectItem
                      v-for="customer in computedCustomers"
                      :key="customer.id"
                      :value="String(customer.id)"
                    >
                      {{ customer.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          </FormField>

          <!-- Status Field -->
          <FormField v-slot="{ field }" name="status">
            <FormItem :error="errors.status">
              <FormControl>
                <Select v-bind="field">
                  <SelectTrigger class="w-full">
                    <Icon name="ph:tag-bold" class="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="SEND">Sent</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="CANCEL">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          </FormField>

          <!-- Amount Paid Field -->
          <FormField v-slot="{ field }" name="amount_paid">
            <FormItem :error="errors.amount_paid">
              <FormControl>
                <div class="relative">
                  <Icon name="ph:money-bold" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    v-bind="field"
                    type="number"
                    step="0.01"
                    placeholder="Amount paid"
                    class="pl-10"
                  />
                </div>
              </FormControl>
            </FormItem>
          </FormField>

          <!-- Submit and Cancel Buttons -->
          <DialogFooter class="flex justify-end mt-10">
            <Button type="button" variant="outline" @click="$emit('cancel')">Cancel</Button>
            <Button type="submit" :disabled="isSubmitting">
              <Icon
                name="ph:spinner"
                v-if="isSubmitting"
                class="mr-2 h-4 w-4 animate-spin"
              />
              {{ isSubmitting ? 'Creating...' : 'Create Invoice' }}
            </Button>
          </DialogFooter>
        </div>
      </Form>
    </TabsContent>

    <!-- Uniuni Template Content -->
    <TabsContent value="uniuni">
      <UniuniTemplate @use-template="useTemplate" />
    </TabsContent>
  </Tabs>
</ClientOnly>
</template>

<script setup lang='ts'>
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import type { Database } from '~/types/database'
import type { UniuniTemplateData } from '~/types/invoice.js'

type Invoice = Database['public']['Tables']['invoices']['Row']
type Customer = Database['public']['Tables']['customers']['Row']

const props = defineProps<{ customers: Customer[] }>()
const emit = defineEmits<{ (e: 'submit', invoice: Partial<Invoice>): void; (e: 'cancel'): void; }>()

const schema = toTypedSchema(z.object({
  invoice_number: z.string().min(1, 'Invoice number is required'),
  invoice_date: z.string().min(1, 'Invoice date is required'),
  due_date: z.string().min(1, 'Due date is required'),
  total: z.number().min(0, 'Total amount must be positive'),
  recipient_id: z.string().nullable(),
  sender_id: z.string().nullable(),
  status: z.enum(['DRAFT', 'SEND', 'PAID', 'CANCEL']),
  amount_paid: z.number().min(0, 'Amount paid must be positive'),
}))

const computedCustomers = computed(() => {
  return props.customers.filter((customer) => customer.id != null && String(customer.id) !== '');
})

const form = useForm({ validationSchema: schema })
const isSubmitting = ref(false)

const onSubmit = form.handleSubmit((values: Partial<{ adjustment: number | null; amount_paid: number; created_at: string | null; due_balance: number; due_date: string; id: number; invoice_date: string; invoice_number: string; recipient_id: string | null; sender_id: string | null; status: 'DRAFT' | 'SEND' | 'PAID' | 'CANCEL'; tax: number; total: number; }>) => {
  isSubmitting.value = true
  values.recipient_id = String(values.recipient_id);
  emit('submit', values as unknown as Partial<Invoice>)
  isSubmitting.value = false
})

const useTemplate = (templateData: UniuniTemplateData) => {
  emit('submit', templateData as unknown as Partial<Invoice>)
}
</script>
