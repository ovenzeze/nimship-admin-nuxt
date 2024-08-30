<template>
  <div v-if="record" class="w-full min-h-full max-h-full flex flex-col md:flex-row antialiased">
    <div class="flex-1 grid grid-rows-3 overflow-x-auto">
      <div class="md:min-w-[1000px]">
        <DriverInfo :record="record" />
        <PayrollDetails :record="record" />
        <BankInfo :record="record" />
        <PaymentStatus :record="record" />
      </div>
    </div>
    
    <Button
      @click="openPaymentPanel"
      class="md:hidden fixed bottom-4 right-4 z-50 rounded-full"
      size="icon"
    >
      <Icon name="ph:receipt" class="w-5 h-5 text-primary-foreground" />
    </Button>
    
    <div class="hidden md:block h-full overflow-y-auto p-4 w-[280px] min-h-[550px] border-l-2 border-red-500/50 rounded-lg">
      <PaymentPanel :record="record" />
    </div>
    
    <MobilePaymentDialog
      :isOpen="isPaymentPanelOpen"
      @update:open="closePaymentPanel"
      :record="record"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import DriverInfo from './DriverInfo.vue';
import PayrollDetails from './PayrollDetails.vue';
import BankInfo from './BankInfo.vue';
import PaymentStatus from './PaymentStatus.vue';
import PaymentPanel from './PaymentPanel.vue';
import MobilePaymentDialog from './MobilePaymentDialog.vue';
import type { DriverPaymentRecord } from '../../composables/usePaymentRecords';

const props = defineProps<{
  record: DriverPaymentRecord;
}>();

const record = computed(() => readableDriver(props.record));
const isPaymentPanelOpen = ref(false);

const openPaymentPanel = () => {
  isPaymentPanelOpen.value = true;
};

const closePaymentPanel = () => {
  isPaymentPanelOpen.value = false;
};

defineExpose({});
</script>