<template>
  <PayrollContainer :record="record" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type DriverPaymentRecord } from '../../composables/usePaymentRecords';
import PayrollContainer from './PayrollContainer.vue';
import { getReadablePaymentRecord } from '~/utils/driver';
const props = defineProps<{
  record: DriverPaymentRecord;
}>();

const record = computed(() => getReadablePaymentRecord(props.record));
</script>