<template>
  <InfoCardGroup icon="ph:money" label="Payroll" themeColor="purple">
    <InfoCard v-for="(item, itemIndex) in payrollItems" :key="itemIndex" :label="item.label" :value="item.value"
      :icon="item.icon" :class="item.class" :highlight="item.highlight" />
  </InfoCardGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InfoCardGroup from './InfoCardGroup.vue';
import InfoCard from './InfoCard.vue';
import type { DriverPaymentRecord } from '../../composables/usePayroll';

const props = defineProps<{ record: DriverPaymentRecord }>();

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const payrollItems = computed(() => [
  { label: "Gross Pay", value: formatCurrency(props.record.gross_pay), icon: "ph:currency-dollar", highlight: true },
  { label: "Deductions", value: formatCurrency(props.record.deduction_amount), icon: "ph:minus-circle" },
  { label: "Pre Paid", value: formatCurrency(props.record.pre_paid), icon: "ph:minus-circle" },
  { label: "Allowance", value: formatCurrency(props.record.allowance), icon: "ph:plus-circle" },
  // { label: "Net Pay", value: formatCurrency(props.record.net_pay), icon: "ph:money", highlight: true, class: "hidden md:block" },
  ...(props.record.payment_status === "PAID"
    ? [
      { label: "Payment Date", value: formatDate(props.record.payment_date), icon: "ph:calendar-check" },
      { label: "Payment Method", value: props.record.payment_method, icon: "ph:bank" },
    ]
    : []),
]);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>