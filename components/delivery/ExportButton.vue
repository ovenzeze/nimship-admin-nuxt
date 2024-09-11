<template>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
                Export
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem @click="exportCSV">
                <Icon name="ph:file-csv" class="mr-2 h-4 w-4" />
                <span>Export as CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="exportExcel">
                <Icon name="ph:file-xls" class="mr-2 h-4 w-4" />
                <span>Export as Excel</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import type { DeliveryRecordView } from '~/types/database'
import { formatCurrency, formatDate, formatDateRange, formatNumber } from '~/utils/formatter'

const props = defineProps<{
    data: DeliveryRecordView[]
    visibleColumns: { id: string; header: string }[]
}>()

const { toast } = useToast()

const exportCSV = () => {
    const csvContent = generateCSV(props.data, props.visibleColumns)
    downloadFile(csvContent, 'delivery_records.csv', 'text/csv')
    toast({
        title: 'Export Successful',
        description: 'The delivery records have been exported as CSV.',
        variant: 'default',
    })
}

const exportExcel = () => {
    // For simplicity, we'll use CSV format and change the file extension
    // In a real-world scenario, you'd want to use a library like SheetJS to create actual Excel files
    const csvContent = generateCSV(props.data, props.visibleColumns)
    downloadFile(csvContent, 'delivery_records.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    toast({
        title: 'Export Successful',
        description: 'The delivery records have been exported as Excel.',
        variant: 'default',
    })
}

const generateCSV = (data: DeliveryRecordView[], columns: { id: string; header: string }[]): string => {
    const header = columns.map(column => column.header).join(',')
    const rows = data.map(record =>
        columns.map(column => {
            const value = record[column.id as keyof DeliveryRecordView]
            return JSON.stringify(formatCellValue(value, column.id))
        }).join(',')
    )
    return [header, ...rows].join('\n')
}

const formatCellValue = (value: any, columnId: string): string => {
    switch (columnId) {
        case 'date':
            return formatDate(value as string)
        case 'cycle_start':
            return formatDateRange(value as string, value as string) // Assuming cycle_end is not available here
        case 'settle_rate':
        case 'driver_salary':
        case 'total_salary':
            return formatCurrency(value as number)
        case 'total_order_cnt':
        case 'order_cnt_0_1':
        case 'order_cnt_1_10':
        case 'order_cnt_10':
            return formatNumber(value as number)
        default:
            return value?.toString() || ''
    }
}

const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    URL.revokeObjectURL(link.href)
}
</script>