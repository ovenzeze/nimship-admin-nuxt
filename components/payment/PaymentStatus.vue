<template>
  <InfoCardGroup icon="ph:stack" label="Status" themeColor="orange">
    <InfoCard v-for="(item, itemIndex) in statusItems" :key="itemIndex" :label="item.label" :value="item.value"
      :icon="item.icon" :class="item.class" />
  </InfoCardGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InfoCardGroup from './InfoCardGroup.vue';
import InfoCard from './InfoCard.vue';
import type { ProcessedDriverPaymentRecord } from '~/types/payment';

const props = defineProps<{
  record: ProcessedDriverPaymentRecord;
}>();

const statusItems = computed(() => [
  { label: "Status", value: props.record.status || 'N/A', icon: "ph:stamp-light" },
  { label: "Time", value: props.record.formattedPaymentDate || "N/A", icon: "ph:clock" },
  { label: "Method", value: getPaymentMethodName(props.record.payment_method) || "N/A", icon: "ph:credit-card" },
  { label: "Amount", value: props.record.formattedActualAmountPaid || "N/A", icon: "ph:currency-circle-dollar" },
  { label: "Employee", value: props.record.name || 'N/A', icon: "ph:user", class: "md:hidden" },
]);

function getPaymentMethodName(methodId: number | undefined): string {
  // This is a placeholder. You should replace this with actual logic to get the payment method name.
  const methodNames: { [key: number]: string } = {
    91: 'Direct Deposit',
    92: 'Check',
    93: 'Cash',
    // Add more method IDs and names as needed
  };
  return methodId !== undefined ? (methodNames[methodId] || 'Unknown') : 'N/A';
}
</script>