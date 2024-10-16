<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle class="flex items-center space-x-2">
        <!-- <Icon name="ph:users" class="h-6 w-6 text-primary" /> -->
        <span class="uppercase text-md">{{ teamInfo.name }}</span>
      </CardTitle>
      <CardDescription class="pt-2">
        <Badge :variant="teamInfo.status === 'Active' ? 'success' : 'warning'">
          {{ teamInfo.status }}
        </Badge>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="(item, key) in infoItems" :key="key" class="flex items-center space-x-2">
          <Icon :name="item.icon" class="h-5 w-5 text-muted-foreground" />
          <span class="text-sm">{{ teamInfo[key] }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">

interface TeamInfo {
  name: string
  location: string
  status: string
  warehouse: string
  contact: string
  phone: string
}

const props = defineProps<{
  teamInfo: TeamInfo
}>()

const infoItems = {
  location: { icon: 'ph:map-pin' },
  warehouse: { icon: 'ph:warehouse' },
  contact: { icon: 'ph:user' },
  phone: { icon: 'ph:phone' },
}
</script>
