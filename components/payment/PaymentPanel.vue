 <template>
  <div>
    <h2 class="text-xl font-semibold flex items-center mb-4">
      <Icon icon="ph:receipt" class="w-6 h-6 mr-2 text-primary-foreground" />
      Payment Review
    </h2>
    <p class="text-sm text-primary-foreground/50">
      Review and confirm the payment for {{ props.record.driver_name }}
    </p>
    <form @submit.prevent="handlePayment" class="flex-1 flex flex-col gap-y-4">
      <div>
        <Label for="actualAmount">Actual Payment Amount</Label>
        <Input
          id="actualAmount"
          v-model="actualPaymentAmount"
          type="number"
          step="0.01"
          class="w-full mt-2"
        />
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
        <Textarea id="paymentNotes" class="w-full mt-2" />
      </div>
      <Button type="submit" :disabled="isPaid" class="w-full mt-2">
        <Icon icon="ph:check-circle" class="w-4 h-4 mr-2 text-primary-foreground" />
        {{ isPaid ? "Already Paid" : "Confirm Payment" }}
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { usePayment } from '../../composables/usePaymentRecords';
import type { DriverPaymentRecord } from '../../composables/usePaymentRecords';

const props = defineProps<{
  record: DriverPaymentRecord;
}>();

const { processPayment } = usePayment();

const paymentMethods = ["ACH", "Check", "Zelle", "Venmo"];
const selectedPaymentMethod = ref(paymentMethods[0]);
const actualPaymentAmount = ref(props.record.net_pay);
const paymentDate = ref(new Date().toISOString().split("T")[0]);

const isPaid = computed(() => props.record.payment_status === "PAID");

const handlePayment = async () => {
  try {
    await processPayment({
      driverId: props.record.id,
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