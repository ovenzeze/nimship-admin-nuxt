<template>
  <TableRow class="hover:bg-muted/50 dark:hover:bg-muted/20">
    <TableCell class="px-3 py-2 text-center">{{ invoice.invoice_number }}</TableCell>
    <TableCell class="px-3 py-2 text-center">
      <Badge variant="secondary">{{ formatDate(invoice.invoice_date) }}</Badge>
    </TableCell>
    <TableCell class="px-3 py-2 text-center">
      <Badge variant="secondary">{{ formatDate(invoice.due_date) }}</Badge>
    </TableCell>
    <TableCell class="px-3 py-2 text-center">
      <Badge variant="outline">{{ formatCurrency(invoice.total) }}</Badge>
    </TableCell>
    <TableCell class="px-3 py-2 text-center">
      <Badge :variant="getStatusVariant(invoice.status)">{{ invoice.status }}</Badge>
    </TableCell>
    <TableCell class="px-3 py-2">
      <HoverCard>
        <HoverCardTrigger>
          <div class="text-xs text-muted-foreground text-center line-clamp-2 uppercase">
            {{ invoice.recipient?.name || 'N/A' }}
          </div>
        </HoverCardTrigger>
        <HoverCardContent v-if="invoice.recipient">
          <CustomerDetails :customer="invoice.recipient" />
        </HoverCardContent>
      </HoverCard>
    </TableCell>
    <TableCell class="px-3 py-2">
      <HoverCard>
        <HoverCardTrigger>
          <div class="text-xs text-muted-foreground text-center line-clamp-2 uppercase">
            {{ invoice.sender?.name || 'N/A' }}
          </div>
        </HoverCardTrigger>
        <HoverCardContent v-if="invoice.sender">
          <CustomerDetails :customer="invoice.sender" />
        </HoverCardContent>
      </HoverCard>
    </TableCell>
    <TableCell class="px-3 py-2 text-center sticky right-0 bg-background dark:bg-background z-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button @click="$emit('edit', invoice)" variant="ghost" class="mr-1 p-1">
              <Icon name="ph:pencil" class="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Invoice</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button @click="$emit('delete', invoice.id)" variant="ghost" class="p-1 text-destructive">
              <Icon name="ph:trash" class="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Invoice</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  </TableRow>
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
  invoice: InvoiceWithCustomer
}>()

defineEmits<{
  (e: 'edit', invoice: InvoiceWithCustomer): void
  (e: 'delete', id: number): void
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'DRAFT': return 'default'
    case 'SEND': return 'secondary'
    case 'PAID': return 'success'
    case 'CANCEL': return 'destructive'
    default: return 'outline'
  }
}
</script>