 <template>
  <div>
    <h2 class="text-xl font-semibold flex items-center mb-4">
      <Icon name="ph:receipt" class="w-6 h-6 mr-2 text-primary" />
      Payment Review
    </h2>
    <p class="text-sm text-primary/50">
     all changes made to this payment will be recorded in the payment history.
    </p>
    <form @submit.prevent="handlePayment" class="flex-1 flex flex-col gap-y-4 mt-4">
      <div class="relative w-full max-w-sm items-center">
        <Label for="actualAmount">Actual Payment Amount</Label>
        <Input
          id="actualAmount"
          type="number"
          step="0.01"
          class="w-full pl-6 mt-2"
          :placeholder="`${record.actual_payment_amount || record.net_pay}`"
        />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Icon name="ph:currency-dollar" class="w-4 h-4 mt-8" />
        </span>
      </div>
      <!-- <div>
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
      </div> -->
        <Label for="paymentMethod" class="text-sm inline-block">Payment Method</Label>
      <div class=" items-center w-full md:w-auto">
        <Button
          v-for="(method, index) in paymentMethods"
          :key="method"
          :variant="selectedPaymentMethod === method ? 'default' : 'outline'"
          class="w-1/4 text-sm"
          :class="{
            'rounded-l-md rounded-r-none': index === 0,
            'rounded-none': index > 0 && index < paymentMethods.length,
            'rounded-r-md rounded-l-none': index === paymentMethods.length,
            'border-r-0': index < paymentMethods.length
          }"
        >
          {{ String(method).toUpperCase() }}
        </Button>
      </div>
      <div>
        <Label for="paymentDate">Payment Time</Label>
        <Input
          id="paymentDate"
          v-model="paymentDate"
          type="date"
          :min="record.cycle_end"
          class="w-full mt-3"
        />
      </div>
      <div>
        <Label for="paymentNotes">Payment Notes</Label>
        <Textarea id="paymentNotes" class="w-full mt-2" placeholder="Note anything about this payment here."/>
      </div>
      <Button type="submit" :disabled="isPaid" class="w-full mt-2">
        <Icon name="ph:check-circle" class="w-4 h-4 mr-2 text-primary-forground" />
        {{ isPaid ? "Already Paid" : "Confirm Payment" }}
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { usePayment } from '../../composables/usePaymentRecords';
import type { ReadablePaymentRecord } from '~/utils/driver';

const props = defineProps<{
  record: ReadablePaymentRecord;
}>();

const { processPayment } = usePayment();

const paymentMethods = ["ACH", "Check", "Zelle", "Venmo"];
const selectedPaymentMethod = ref(paymentMethods[0]);
const actualPaymentAmount = ref(props.record.net_pay);
const paymentDate = ref(new Date().toISOString().split("T")[0]);

const isPaid = computed(() => props.record.actual_payment_amount > 0);

const handlePayment = async () => {
  try {
    await processPayment({
      driverId: props.record.custom_uid,
      amount: actualPaymentAmount.value,
      method: selectedPaymentMethod.value,
      date: paymentDate.value,
    });
    // Handle success (e.g., show notification)
  } catch (error) {
    console.error("Payment processing failed:", error);
    // Handle error (e.g., show error message)
  }
};
</script>