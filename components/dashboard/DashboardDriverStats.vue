<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center">
        <!-- <Icon name="ph:user-circle" class="w-5 h-5 mr-2" /> -->
        Driver Statistics
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div v-for="stat in driverStats" :key="stat.title" class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon :name="stat.icon" class="w-5 h-5 mr-2 text-primary" />
            <span>{{ stat.title }}</span>
          </div>
          <span class="font-bold text-lg">{{ stat.value }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">

defineProps<{
  driverStats: Array<{
    title: string
    value: number
    icon: string
  }>
}>()



