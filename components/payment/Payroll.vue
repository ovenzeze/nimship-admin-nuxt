<template>
  <PayrollContainer :record="record" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type DriverPaymentRecord } from '../../composables/usePaymentRecords';
import PayrollContainer from './PayrollContainer.vue';

const props = defineProps<{
  record: DriverPaymentRecord;
}>();

const record = computed(() => readableDriver(props.record));
</script>