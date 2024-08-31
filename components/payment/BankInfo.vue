<template>
  <InfoCardGroup icon="ph:bank" label="Bank" themeColor="green">
    <InfoCard v-for="(item, itemIndex) in bankItems" :key="itemIndex" :label="item.label" :value="item.value"
      :icon="item.icon" :class="item.class" />
  </InfoCardGroup>
</template>

<script setup lang="ts">
import InfoCardGroup from './InfoCardGroup.vue';
import InfoCard from './InfoCard.vue';
import type { ReadablePaymentRecord } from '~/utils/driver';

const props = defineProps<{
  record: ReadablePaymentRecord;
}>();

const bankItems = computed(() => [
  { label: "Account Type", value: 'CHECKING', icon: "ph:bank" },
  { label: "Routing Number", value: props.record.routing_ending ? `****${props.record.routing_ending}` : "N/A", icon: "ph:hash" },
  { label: "Account Number", value: props.record.account_ending ? `****${props.record.account_ending}` : "N/A", icon: "ph:credit-card" },
  { label: "Zelle", value: props.record.zelle || "N/A", icon: "ph:currency-circle-dollar" },
  // { label: "Venmo", value: props.record.zelle || "N/A", icon: "ph:credit-card", class: "hidden md:block" },
]);

</script>