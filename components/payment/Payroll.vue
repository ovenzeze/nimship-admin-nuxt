<template>
  <div v-if="record" class="w-full h-full flex flex-col lg:flex-row">
    <!-- Driver Information and Payroll Details -->
    <div class="flex-1 overflow-auto lg:overflow-hidden">

      <!-- Driver Information -->
      <div class="flex">
        <div class="flex flex-row  justify-center items-center w-28">
          <Icon icon="ph:user-circle" class="w-12 h-12  text-blue-500" />
        </div>
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="Name" :value="`${record.haulblaze_contact?.first_name} ${record.haulblaze_contact?.last_name}`" icon="ph:user" />
          <InfoCard label="Warehouse" :value="record.warehouse" icon="ph:warehouse" />
          <InfoCard label="Phone" :value="record.haulblaze_contact?.phone" icon="ph:phone" />
          <InfoCard label="Email" :value="record.haulblaze_contact?.email" icon="ph:envelope" />
          <InfoCard label="Account Type" :value="record.payment_method" icon="ph:bank" />
          <InfoCard label="Routing Number" :value="`****${record.routing_number?.slice(-4)}`" icon="ph:hash" />
          <InfoCard label="Account Number" :value="`****${record.account_number?.slice(-4)}`" icon="ph:credit-card" />
          <InfoCard label="Zelle" :value="record.zelle || 'N/A'" icon="ph:currency-circle-dollar" />
        </div>
      </div>

      <!-- Payroll Details -->
      <div class="flex">
        <div class="w-28 flex flex-row  justify-center items-center">
          <Icon icon="ph:money" class="w-12 h-12  text-green-500" />
        </div>
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="Gross Pay" :value="`$${record.gross_pay.toFixed(2)}`" icon="ph:currency-dollar" highlight />
          <InfoCard label="Deductions" :value="`$${record.deduction_amount.toFixed(2)}`" icon="ph:minus-circle" />
          <InfoCard label="Allowance" :value="`$${record.allowance.toFixed(2)}`" icon="ph:plus-circle" />
          <InfoCard label="Bonus" :value="`$${record.bonus.toFixed(2)}`" icon="ph:star" />
          <InfoCard label="Net Pay" :value="`$${record.net_pay.toFixed(2)}`" icon="ph:money" highlight />
          <InfoCard v-if="record.payment_status === 'PAID'" label="Payment Date" :value="formatDate(record.payment_date)" icon="ph:calendar-check" />
          <InfoCard v-if="record.payment_status === 'PAID'" label="Payment Method" :value="record.payment_method" icon="ph:bank" />
        </div>
      </div>
    </div>

    <!-- Payment Action -->
    <div class="w-full lg:w-[300px] bg-white p-6 rounded-lg shadow-sm border-l-2 border-l-blue-500">
      <h2 class="text-xl font-semibold mb-4 flex items-center">
        <Icon icon="ph:receipt" class="w-6 h-6 mr-2" />
        Payment Review
      </h2>
      <p class="text-sm text-gray-500 mb-4">Please review the payment details and enter the actual payment amount.</p>
      <form @submit.prevent="handlePayment" class="space-y-6">
        <div>
          <Label for="actualAmount">Actual Payment Amount</Label>
          <Input id="actualAmount" v-model="actualPaymentAmount" type="number" prefix="$" step="0.01" class="w-full mt-2" />
        </div>
        <div>
          <Label for="paymentMethod" class="text-sm inline-block mb-2">Payment Method</Label>
          <Select v-model="selectedPaymentMethod" class="w-full">
            <SelectTrigger id="paymentMethod">
              <SelectValue :placeholder="selectedPaymentMethod" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="method in paymentMethods" :key="method" :value="method">
                {{ method }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
                <div>
          <Label for="paymentDate">Payment Time</Label>
          <Input id="paymentDate" v-model="paymentDate" type="date" :min="record.cycle_end" class="w-full mt-2" />
        </div>
        <div>
          <Label for="paymentDate">Payment Notes</Label>
          <Textarea id="paymentDate"  type="date" :min="record.cycle_end" class="w-full mt-2" />
        </div>
        <Button type="submit" :disabled="isPaid" class="w-full">
          <Icon icon="ph:check-circle" class="w-4 h-4 mr-2" />
          {{ isPaid ? 'Already Paid' : 'Confirm Payment' }}
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue'
import { Icon } from '@iconify/vue'
import { usePayment, type DriverPaymentRecord } from '../../composables/usePaymentRecords'

const props = defineProps<{
  record: DriverPaymentRecord
}>()

const { processPayment } = usePayment()

const paymentMethods = ['ACH', 'Check', 'Zelle', 'Venmo']
const selectedPaymentMethod = ref(paymentMethods[0])
const actualPaymentAmount = ref(props.record.net_pay)
const paymentDate = ref(new Date().toISOString().split('T')[0])

const isPaid = computed(() => props.record.payment_status === 'PAID')

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const handlePayment = async () => {
  try {
    await processPayment({
      driverId: props.record.id,
      amount: actualPaymentAmount.value,
      method: selectedPaymentMethod.value,
      date: paymentDate.value
    })
    // Handle success (e.g., show notification)
  } catch (error) {
    console.error('Payment processing failed:', error)
    // Handle error (e.g., show error message)
  }
}

// InfoCard component
const InfoCard = defineComponent({
  props: {
    label: String,
    value: String,
    icon: String,
    highlight: Boolean,
  },
  setup(props) {
    return () => h('div', {
      class: `bg-white px-3 py-6 border border-gray-100 border-collapse flex flex-col justify-between transition-all duration-300 hover:border-zinc-500 hover:border-slide-in ${props.highlight ? 'border-blue-500' : ''}`
    }, [
      h('div', { class: 'flex flex-row items-center justify-between mb-1' }, [
        h('span', { class: 'text-sm text-gray-600' }, props.label),
        h(Icon, { icon: props.icon, class: 'w-6 h-6 mr-2 text-gray-500 text-center' }),
      ]),
      h('div', { class: 'text-left font-semibold text-text-color' }, props.value)
    ])
  }
})
</script>