<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card v-for="stat in stats" :key="stat.label">
      <CardHeader>
        <CardTitle>{{ stat.label }}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ stat.value }}</div>
        <p class="text-xs text-muted-foreground">
          {{ stat.description }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReadableDriver } from '~/types';

const props = defineProps<{
  driver: ReadableDriver;
}>();

const stats = computed(() => [
  {
    label: 'Completed Trips',
    value: props.driver.completed_trips || 0,
    description: 'Total number of completed trips',
  },
  {
    label: 'Rating',
    value: props.driver.rating?.toFixed(1) || 'N/A',
    description: 'Average driver rating',
  },
  {
    label: 'Days Active',
    value: calculateDaysActive(props.driver.enroll_time),
    description: 'Number of days since enrollment',
  },
  {
    label: 'License Expiry',
    value: formatExpiryDate(props.driver.dl_expired_time),
    description: 'Days until driver\'s license expiry',
  },
]);

function calculateDaysActive(enrollTime: string | null): string {
  if (!enrollTime) return 'N/A';
  const enrollDate = new Date(enrollTime);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - enrollDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days`;
}

function formatExpiryDate(expiryTime: string | null): string {
  if (!expiryTime) return 'N/A';
  const expiryDate = new Date(expiryTime);
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `${diffDays} days` : 'Expired';
}
</script>
