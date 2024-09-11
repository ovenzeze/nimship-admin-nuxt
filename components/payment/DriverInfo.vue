<template>
  <InfoCardGroup icon="ph:user-circle" themeColor="blue" label="Driver">
    <InfoCard v-for="(item, itemIndex) in driverItems" :key="itemIndex" :label="item.label" :value="item.value"
      :icon="item.icon" :class="item.class" :highlight="item.highlight" :editable="item.editable"
      @update="updateDriverInfo" />
  </InfoCardGroup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import InfoCardGroup from './InfoCardGroup.vue';
import InfoCard from './InfoCard.vue';
import type { ReadablePaymentRecord } from '~/utils/driver';
import { useToast } from '@/components/ui/toast';

const props = defineProps<{
  record: ReadablePaymentRecord;
}>();

const emit = defineEmits(['update:record']);
const { toast } = useToast();

const driverRecord = ref(props.record);

const driverItems = computed(() => [
  { label: "Name", value: driverRecord.value.name, icon: "ph:user", editable: true },
  { label: "Warehouse", value: driverRecord.value.warehouse, icon: "ph:warehouse", editable: true },
  { label: "Pay Cycle", value: `${driverRecord.value.cycle_start} - ${driverRecord.value.cycle_end}`, icon: "ph:calendar" },
  { label: "Phone", value: driverRecord.value.haulblaze_contact?.phone || "N/A", icon: "ph:phone", editable: true },
  { label: "Email", value: driverRecord.value.haulblaze_contact?.email || "N/A", icon: "ph:envelope", editable: true },
  { label: "Driver Type", value: driverRecord.value.driver_type || "N/A", icon: "ph:steering-wheel", editable: true },
  { label: "Status", value: driverRecord.value.status || "N/A", icon: "ph:traffic-sign", editable: true },
  { label: "Rating", value: driverRecord.value.rating?.toFixed(1) || "N/A", icon: "ph:star", editable: false },
]);

const updateDriverInfo = async (label: string, newValue: string) => {
  try {
    // Here you would typically make an API call to update the driver information
    // For now, we'll just update the local state
    if (label === "Name") {
      driverRecord.value.name = newValue;
    } else if (label === "Warehouse") {
      driverRecord.value.warehouse = newValue;
    } else if (label === "Phone") {
      if (driverRecord.value.haulblaze_contact) {
        driverRecord.value.haulblaze_contact.phone = newValue;
      }
    } else if (label === "Email") {
      if (driverRecord.value.haulblaze_contact) {
        driverRecord.value.haulblaze_contact.email = newValue;
      }
    } else if (label === "Driver Type") {
      driverRecord.value.driver_type = newValue;
    } else if (label === "Status") {
      driverRecord.value.status = newValue;
    }

    emit('update:record', driverRecord.value);

    toast({
      title: "Success",
      description: `${label} updated successfully`,
    });
  } catch (error) {
    console.error('Error updating driver info:', error);
    toast({
      title: "Error",
      description: `Failed to update ${label}. Please try again.`,
      variant: 'destructive',
    });
  }
};
</script>
