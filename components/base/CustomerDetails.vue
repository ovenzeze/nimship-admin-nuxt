<template>
  <div class="bg-background px-0 py-2 rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg cursor-pointer">
    <div class="flex items-center justify-between hover:bg-accent/10 p-2 rounded transition-colors border-b text-muted-foreground hover:text-primary">
      <span class="flex items-center text-xs text-muted-foreground">
        <Icon name="ph:user" class="w-4 h-4 mr-2" />
        Customer
      </span>
      <span class="text-xs">{{ customer.name || 'not available' }}</span>
    </div>
    <div class="space-y-2">
      <div v-for="(item, index) in customerDetails" :key="index" class="flex items-center justify-between hover:bg-accent/10 p-2 rounded transition-colors border-b text-muted-foreground hover:text-primary">
        <span class="flex items-center text-xs ">
          <Icon :name="item.icon" class="w-4 h-4 mr-2" />
          {{ item.label }}
        </span>
        <span class="text-xs">{{ item.value || 'not available' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database'

type Customer = Database['public']['Tables']['customers']['Row']

const { customer } = defineProps<{ customer: Customer }>()

const customerDetails = [
  { icon: 'ph:envelope', label: 'Email', value: customer.email },
  { icon: 'ph:phone', label: 'Phone', value: customer.phone },
  { icon: 'ph:map-pin', label: 'Billing Address', value: customer.bill_address },
  { icon: 'ph:envelope', label: 'Mailing Address', value: customer.mail_address },
  { icon: 'ph:globe', label: 'Site', value: customer.site }
]
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>