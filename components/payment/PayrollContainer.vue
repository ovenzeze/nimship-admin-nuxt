<template>
  <div class="w-full min-h-full max-h-full flex flex-col md:flex-row antialiased">
    <div class="flex-1 flex overflow-auto">
      <div class="flex-1 md:min-w-[1000px] md:grid md:grid-rows-4">
        <DriverInfo :record="record" />
        <PayrollDetails :record="record" />
        <BankInfo :record="record" />
        <PaymentStatus :record="record" />
      </div>
    </div>


    <div class="md:w-[400px] md:border-l md:border-l-border">
      <PaymentPanel :record="record" />
    </div>

  </div>
</template>

<script setup lang="ts">
import DriverInfo from './DriverInfo.vue';
import PayrollDetails from './PayrollDetails.vue';
import BankInfo from './BankInfo.vue';
import PaymentStatus from './PaymentStatus.vue';
import PaymentPanel from './PaymentPanel.vue';
import { type ReadablePaymentRecord } from '~/utils/driver';

const props = defineProps<{
  record: ReadablePaymentRecord;
}>();
const record = computed(() => props.record);



</script>