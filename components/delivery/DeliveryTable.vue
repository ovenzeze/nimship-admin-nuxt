<template>
    <div class="w-full h-full flex flex-col">
        <div class="flex-grow overflow-auto">
            <Table>
                <TableHeader class="sticky top-0 bg-white z-10">
                    <TableRow>
                        <TableHead v-for="column in visibleColumns" :key="column.id">
                            <p class="text-xs font-medium uppercase text-center sticky-header min-w-20"> {{
                                column.header }}
                            </p>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="row in data" :key="row.id">
                        <TableCell v-for="column in visibleColumns" :key="column.id">
                            <span v-html="formatCellValue(row, column)"
                                class="flex flex-col justify-center items-center text-center"></span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DeliveryRecordView } from '~/types';
import { formatCurrency, formatDate, formatDateRange, formatNumber } from '~/utils/formatter'

const props = defineProps({
    data: { type: Array as () => DeliveryRecordView[] },
    columns: { type: Array as () => { id: string; header: string }[] }
})

const visibleColumnIds = ref(props.columns.map(column => column.id))

const visibleColumns = computed(() =>
    props.columns.filter(column => visibleColumnIds.value.includes(column.id))
)

const isColumnVisible = (columnId: string) => {
    return visibleColumnIds.value.includes(columnId)
}

const toggleColumn = (columnId: string) => {
    if (isColumnVisible(columnId)) {
        visibleColumnIds.value = visibleColumnIds.value.filter(id => id !== columnId)
    } else {
        visibleColumnIds.value.push(columnId)
    }
}

const formatCellValue = (row: DeliveryRecordView, column: { id: string; header: string }) => {
    const value = row[column.id as keyof DeliveryRecordView]
    const profit = (row['total_income'] - row['driver_salary']).toFixed(2)
    const profitRate = (Number(profit) / row['total_income'] * 100).toFixed(4)

    switch (column.id) {
        case 'date':
            return formatDate(value as string)
        case 'cycle_start':
            return formatDateRange(value as string, row.cycle_end as string)
        case 'warehouse':
            return `
        <span class="flex items-center bg-gray-500/10 px-4 py-0.5 rounded-full font-semibold"> ${value} </span>`
        case 'settle_rate':
            return `
            <span class="flex items-center bg-gray-500/10 px-4 py-0.5 font-semibold rounded-full"> $ ${value} </span>`
        case 'driver_salary': return formatCurrency(value as number)
        case 'total_income': return formatCurrency(value as number)
        case 'profit': return `
        <p class="items-center min-w-28 text-center">${formatCurrency(Number(profit))} ${profitRate}%</p>`
        case 'total_order_cnt': return `${formatNumber(value as number)} Pcs`
        case 'order_cnt_0_1':
        case 'order_cnt_1_10':
        case 'order_cnt_10':
            return `
            <div class="flex items-center">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                <span class="mx-2">${formatNumber(row['order_cnt_0_1'] as number)}</span>
                <span class="ml-2 mr-2">|</span>
                <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span class="mx-2">${formatNumber(row['order_cnt_0_5'] as number)}</span>
                <span class="ml-2 mr-2">|</span>
                <span class="w-2 h-2 rounded-full bg-red-500"></span>
                <span class="mx-2">${formatNumber(row['order_cnt_10'] as number)}</span>
                 `
        case 'payment_method':
            return `<span class="px-3 py-1.5 text-xs font-semibold rounded-full ${value === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }">${paymentStatusMap[Number(value) as PaymentStatus].status}</span>`
        default:
            return value || 'N/A'
    }
}
</script>

<style scoped>
.sticky-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
}
</style>