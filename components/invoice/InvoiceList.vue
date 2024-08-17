<template>
  <div class="relative overflow-x-auto">
    <Table class="w-full whitespace-nowrap">
      <TableHeader>
        <TableRow>
          <TableHead class="px-3 py-2 text-center uppercase">Invoice Number</TableHead>
          <TableHead class="px-3 py-2 text-center uppercase">Invoice Date</TableHead>
          <TableHead class="px-3 py-2 text-center uppercase">Due Date</TableHead>
          <TableHead class="px-3 py-2 text-center uppercase">Total Amount</TableHead>
          <TableHead class="px-3 py-2 text-center uppercase">Status</TableHead>
          <TableHead class="px-3 py-2 text-left uppercase">Recipient</TableHead>
          <TableHead class="px-3 py-2 text-left uppercase">Sender</TableHead>
          <TableHead class="px-3 py-2 text-center sticky right-0 bg-white z-10 uppercase">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <InvoiceItem
          v-for="invoice in invoices"
          :key="invoice.id"
          :invoice="invoice"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </TableBody>
    </Table>
    <div class="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database'

type Invoice = Database['public']['Tables']['invoices']['Row']
type Customer = Database['public']['Tables']['customers']['Row']

interface InvoiceWithCustomer extends Invoice {
  recipient?: Customer
  sender?: Customer
}

defineProps<{
  invoices: InvoiceWithCustomer[]
}>()

defineEmits<{
  (e: 'edit', invoice: InvoiceWithCustomer): void
  (e: 'delete', id: number): void
}>()
</script>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
  max-width: 100%;
}

.whitespace-nowrap {
  white-space: nowrap;
}
</style>