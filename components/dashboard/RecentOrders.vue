<template>
  <div class="space-y-8">
    <div v-for="order in orders" :key="order.id" class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage :src="`https://avatar.vercel.sh/${order.driver}.png`" alt="Avatar" />
        <AvatarFallback>{{ order.driver[0] }}</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">{{ order.driver }}</p>
        <p class="text-sm text-muted-foreground">
          {{ order.driver }}@example.com
        </p>
      </div>
      <div class="ml-auto font-medium">${{ order.amount.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  orders: Array<{
    id: number
    driver: string
    amount: number
    status: string
  }>
}>()
</script>
