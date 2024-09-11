<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card v-for="stat in stats" :key="stat.label" class="p-4">
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">{{ stat.label }}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ stat.value }}</div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface DriverStatsProps {
  completedTrips: number
  rating: number
  activeDays: number
  licenseExpiry: string
}

const props = defineProps<DriverStatsProps>()

const stats = computed(() => [
  { label: 'Completed Trips', value: props.completedTrips },
  { label: 'Rating', value: props.rating.toFixed(1) },
  { label: 'Active Days', value: props.activeDays },
  { label: 'License Expiry', value: props.licenseExpiry },
])
</script>
