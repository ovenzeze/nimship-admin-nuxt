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
import type { ReadablePaymentRecord } from '~/utils/driver';

const props = defineProps<{
  record: ReadablePaymentRecord;
}>();

const statusItems = computed(() => [
  { label: "Status", value: props.record.payment_status.status, icon: "ph:stamp-light" },
  { label: "Time", value: props.record.payment_time || "N/A", icon: "ph:clock" },
  { label: "Method", value: props.record.payment_status.name || "N/A", icon: "ph:credit-card" },
  { label: "Amount", value: `$${props.record.actual_amount_paid.toFixed(2)}`, icon: "ph:currency-circle-dollar" },
  // { label: "Notes", value: "N/A", icon: "ph:note-duotone" },
  { label: "Employee", value: props.record.name, icon: "ph:user", class: "md:hidden" },
]);

defineExpose({});
</script>