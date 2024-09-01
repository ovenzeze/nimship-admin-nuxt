<template>
  <div v-if="record" class="flex flex-col items-start transition-all duration-300 ease-in-out rounded-xl" :class="[
    isMobile ? 'fixed inset-0 z-50 right-0 bg-background top-[30svh] h-[70svh] w-full ' : 'h-full relative border-l-2 border-l-red-500',
    isMobile ? isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0' : '',
  ]">
    <div v-if="isPaid && !isUnlocked"
      class="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm"
      :class="[isMobile ? 'fixed' : 'absolute']">
      <p class="text-xl font-semibold text-center">Already Paid</p>
      <p class="text-sm text-center m-4 opacity-75">This payment has already been processed and cannot be edited, unlock
        to
        make
        changes.
      </p>
      <Button size="icon" @click="isUnlocked = true" class=" bg-foreground text-background w-1/2 mt-4">
        <Icon name="ph:lock-open" class="w-5 h-5 mr-2" />
        Unlock Payment
      </Button>
    </div>
    <!-- Header -->
    <div class="w-full flex-shrink-0 flex items-center justify-between p-4 border-b">
      <h2 class="text-xl font-semibold flex items-center">
        <Icon name="ph:receipt" class="w-6 h-6 mr-2 text-primary" />
        Payment Review
      </h2>
      <Button v-if="isMobile" variant="ghost" size="icon" @click="closePanel" class="z-50">
        <Icon name="ph:x" class="w-5 h-5" />
      </Button>
    </div>
    <!-- Scrollable content -->
    <div class="flex-1 w-full overflow-y-auto p-4 scroll-smooth">
      <p class="text-sm text-primary/70 mb-4">
        All changes made to this payment will be recorded in the payment history. For off-cycle payments, please
        adjust the amount if needed.
      </p>
      <form @submit.prevent="handlePayment" class="flex flex-col gap-y-6">
        <div class="relative w-full max-w-sm items-center">
          <Label for="actualAmount">Actual Payment Amount</Label>
          <Input id="actualAmount" v-model="actualPaymentAmount" type="number" step="0.01" class="w-full pl-6 mt-2"
            :placeholder="`${record.actual_amount_paid || record.net_pay}`" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Icon name="ph:currency-dollar" class="w-4 h-4 mt-8" />
          </span>
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
          <Input id="paymentDate" v-model="paymentDate" type="date" :min="record.cycle_end" class="w-full mt-3" />
        </div>
        <div>
          <Label for="paymentNotes">Payment Notes</Label>
          <Textarea id="paymentNotes" v-model="paymentNotes" class="w-full mt-2"
            placeholder="Note anything about this payment here." />
        </div>
      </form>
    </div>
    <!-- Footer -->
    <div class="w-full flex-shrink-0 p-4 border-t">
      <Button type="submit" :disabled="isPaid && !isUnlocked" class="w-full bg-foreground/90 text-background"
        :loading="loading" @click="handlePayment">
        <Icon name="ph:check-circle" class="w-4 h-4 mr-2 text-primary-forground" />
        {{ record.payment_status.status === "PAID" ? (isUnlocked ? "Edit Payment" : "Already Paid") : "Confirm Payment"
        }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePayment } from '../../composables/usePaymentRecords';

const props = defineProps<{
  record: ReadablePaymentRecord;
  isOpen: boolean;
  onClose?: () => void;
}>();

const emit = defineEmits(['update:isOpen']);

const { processPayment } = usePayment();
const { isMobile } = useDevice();

const paymentMethods = ["ACH", "Check", "Zelle", "Venmo"];
const selectedPaymentMethod = ref<string>(paymentMethods[0]);
const actualPaymentAmount = ref<number>(props.record.net_pay);
const paymentDate = ref<string>(new Date().toISOString().split("T")[0]);
const paymentNotes = ref<string>('');
const loading = ref<boolean>(false);

const record = computed(() => props.record);
const isPaid = computed(() => props.record.payment_status.status === "PAID");
const isUnlocked = ref<boolean>(false);
const closePanel = () => {
  emit('update:isOpen', false);
  props.onClose?.();
};

const handlePayment = async () => {
  if (isPaid.value) return;

  loading.value = true;
  try {
    await processPayment({
      driverId: props.record.custom_uid,
      amount: actualPaymentAmount.value,
      method: selectedPaymentMethod.value,
      date: paymentDate.value,
      notes: paymentNotes.value,
    });
    // Handle success (e.g., show notification)
    closePanel();
  } catch (error) {
    console.error("Payment processing failed:", error);
    // Handle error (e.g., show error message)
  } finally {
    loading.value = false;
  }
};
</script>