<template>
    <div class="space-y-2">
      <h3 class="font-semibold">{{ customer.name }}</h3>
      <p class="text-sm">Email: {{ customer.email || 'N/A' }}</p>
      <p class="text-sm">Phone: {{ customer.phone || 'N/A' }}</p>
      <p class="text-sm">Billing Address: {{ customer.bill_address }}</p>
      <p class="text-sm">Mailing Address: {{ customer.mail_address }}</p>
      <p class="text-sm">Site: {{ customer.site || 'N/A' }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Database } from '~/types/database'
  
  type Customer = Database['public']['Tables']['customers']['Row']
  
  defineProps<{
    customer: Customer
  }>()
  </script>