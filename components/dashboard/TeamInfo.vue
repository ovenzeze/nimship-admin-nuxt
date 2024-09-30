<template>
  <div class="space-y-4">
    <div class="flex items-center">
      <Icon name="ph:users" class="mr-2 h-4 w-4 text-muted-foreground" />
      <span class="text-sm font-medium">{{ teamInfo.name }}</span>
    </div>
    <div class="flex items-center">
      <Icon name="ph:map-pin" class="mr-2 h-4 w-4 text-muted-foreground" />
      <span class="text-sm">{{ teamInfo.location }}</span>
    </div>
    <div class="flex items-center">
      <Icon name="ph:warehouse" class="mr-2 h-4 w-4 text-muted-foreground" />
      <span class="text-sm">{{ teamInfo.warehouse }}</span>
    </div>
    <div class="flex items-center">
      <Icon name="ph:user" class="mr-2 h-4 w-4 text-muted-foreground" />
      <span class="text-sm">{{ teamInfo.contact }}</span>
    </div>
    <div class="flex items-center">
      <Icon name="ph:phone" class="mr-2 h-4 w-4 text-muted-foreground" />
      <span class="text-sm">{{ teamInfo.phone }}</span>
    </div>
    <div class="flex items-center">
      <Icon name="ph:check-circle" class="mr-2 h-4 w-4 text-muted-foreground" />
      <Badge :variant="teamInfo.status === 'Active' ? 'success' : 'warning'">{{ teamInfo.status }}</Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  teamInfo: {
    name: string
    location: string
    status: string
    warehouse: string
    contact: string
    phone: string
  }
}>()
</script>
