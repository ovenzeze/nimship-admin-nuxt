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
  { label: "Type", value: 'CHECKING', icon: "ph:bank" },
  { label: "Routing No.", value: props.record.routing || "N/A", icon: "ph:hash" },
  { label: "Account No.", value: props.record.account || "N/A", icon: "ph:credit-card" },
  { label: "Zelle", value: props.record.zelle || "N/A", icon: "ph:currency-circle-dollar" },
  // { label: "Venmo", value: props.record.zelle || "N/A", icon: "ph:credit-card", class: "hidden md:block" },
]);

</script>