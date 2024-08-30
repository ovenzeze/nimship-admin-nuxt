<template>
  <div v-if="record" class="w-full min-h-full max-h-full flex flex-col md:flex-row antialiased">
    <div class="flex-1 flex overflow-auto">
      <div class="flex-1 md:min-w-[1000px] md:grid md:grid-rows-4">
        <DriverInfo :record="record" />
        <PayrollDetails :record="record" />
        <BankInfo :record="record" />
        <PaymentStatus :record="record" />
      </div>
    </div>
    
    <Button
      @click="() => isPaymentPanelOpen = !isPaymentPanelOpen"
      class="md:hidden fixed bottom-4 right-4 z-50 rounded-full"
      size="icon"
    >
      <Icon name="ph:receipt" class="w-5 h-5 text-primary-foreground" />
    </Button>
    
    <div class="hidden md:block h-full overflow-y-auto p-4 w-[320px] min-h-[550px] border-l-2 border-red-500/50 rounded-lg">
      <PaymentPanel :record="record" v-if="width > 768" />
    </div>
    
    <Dialog v-model:open="isPaymentPanelOpen" v-if="width < 768">
    <DialogContent class="sm:max-w-[425px]">
      <PaymentPanel :record="record" />
    </DialogContent>
  </Dialog>
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
import { getReadablePaymentRecord, type ReadablePaymentRecord } from '~/utils/driver';
import { useWindowSize } from '@vueuse/core';

const props = defineProps<{
  record: ReadablePaymentRecord;
}>();
const { width } = useWindowSize();
const record = computed(()=> props.record);

const isPaymentPanelOpen = ref(false);


</script>