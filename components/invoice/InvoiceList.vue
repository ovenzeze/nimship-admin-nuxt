<template>
  <div class="relative overflow-x-auto">
    <Table class="w-full whitespace-nowrap">
      <TableHeader>
        <TableRow class="bg-muted/50 dark:bg-muted/20">
          <TableHead class="px-3 py-2 text-center uppercase text-muted-foreground">Invoice Number</TableHead>
          <TableHead class="px-3 py-2 text-center uppercase text-muted-foreground">Invoice Date</TableHead>
          <TableHead class="px-3 py-2 text-center uppercase text-muted-foreground">Due Date</TableHead>
          <TableHead class="px-3 py-2 text-center uppercase text-muted-foreground">Total Amount</TableHead>
          <TableHead class="px-3 py-2 text-center uppercase text-muted-foreground">Status</TableHead>
          <TableHead class="px-3 py-2 text-left uppercase text-muted-foreground">Recipient</TableHead>
          <TableHead class="px-3 py-2 text-left uppercase text-muted-foreground">Sender</TableHead>
          <TableHead class="px-3 py-2 text-center sticky right-0 bg-background dark:bg-background z-10 uppercase text-muted-foreground">Actions</TableHead>
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
    <div class="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background to-transparent dark:from-background dark:to-transparent pointer-events-none"></div>
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