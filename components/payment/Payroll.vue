<template>

      <!-- Payroll Information -->
      <div v-if="record" class="w-full md:w-3/5 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Driver Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold mb-2">Personal Info</h3>
                <p>Name: {{ record.haulblaze_contact?.first_name }} {{ record.haulblaze_contact?.last_name }}</p>
                <p>Warehouse: {{ record.warehouse }}</p>
                <p>Phone: {{ record.haulblaze_contact?.phone }}</p>
                <p>Email: {{ record.haulblaze_contact?.email }}</p>
              </div>
              <div>
                <h3 class="font-semibold mb-2">Payment Info</h3>
                <p>Account Type: {{ record.payment_method }}</p>
                <p>Routing Number: ****{{ record.routing_number?.slice(-4) }}</p>
                <p>Account Number: ****{{ record.account_number?.slice(-4) }}</p>
                <p>Zelle: {{ record.zelle || 'N/A' }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payroll Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>Gross Pay: ${{ record.gross_pay.toFixed(2) }}</p>
                <p>Deductions: ${{ record.deduction_amount.toFixed(2) }}</p>
                <p>Allowance: ${{ record.allowance.toFixed(2) }}</p>
                <p>Bonus: ${{ record.bonus.toFixed(2) }}</p>
              </div>
              <div>
                <p>Net Pay: ${{ record.net_pay.toFixed(2) }}</p>
                <p>Cycle Start: {{ formatDate(record.cycle_start) }}</p>
                <p>Cycle End: {{ formatDate(record.cycle_end) }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Action</CardTitle>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="handlePayment" class="space-y-4">
              <div>
                <Label for="actualAmount">Actual Payment Amount</Label>
                <Input id="actualAmount" v-model="actualPaymentAmount" type="number" step="0.01" />
              </div>
              <div>
                <Label for="paymentMethod">Payment Method</Label>
                <Select v-model="selectedPaymentMethod">
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
                <Label for="paymentDate">Payment Date</Label>
                <Input id="paymentDate" v-model="paymentDate" type="date" :min="record.cycle_end" />
              </div>
              <Button type="submit" :disabled="isPaid">
                {{ isPaid ? 'Already Paid' : 'Process Payment' }}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
</script>

<style>

</style>