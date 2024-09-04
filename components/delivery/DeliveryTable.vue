<template>
    <div class="flex-1 h-full rounded-lg border border-border overflow-auto relative">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">

                    <TableHead v-for="header in headerGroup.headers" :key="header.id"
                        class="text-center min-w-28 uppercase text-xs"
                        :class="{ 'sticky-action backdrop-blur-lg': header.column.id === 'actions' }">
                        <template v-if="!header.isPlaceholder">
                            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                        </template>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                    :data-state="row.getIsSelected() ? 'selected' : undefined"
                    @click="emit('select-record', row.original)">
                    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="text-center"
                        :class="{ 'sticky-action backdrop-blur-lg': cell.column.id === 'actions' }">
                        <template v-if="cell.column.id === 'payment_status'">
                            <Badge
                                :variant="paymentStatusMap[Number(cell.getValue())]?.status !== 'PENDING' ? 'destructive' : 'secondary'">
                                {{ paymentStatusMap[Number(cell.getValue())]?.status || 'N/A' }}
                            </Badge>
                        </template>
                        <template v-else-if="cell.column.id === 'driver_name'">
                            <span class="text-xs">{{ String(cell.getValue()).toUpperCase() || 'N/A' }}</span>
                        </template>
                        <template v-else-if="cell.column.id === 'total_salary'">
                            ${{ calculateProfit(row.original).profit }} <span class="text-xs text-gray-500">{{
                                (Number(calculateProfit(row.original).rate) * 100).toFixed(2) }}% </span>
                        </template>
                        <template v-else-if="cell.column.id === 'driver_salary'">
                            ${{ calculateProfit(row.original).salary }}
                        </template>
                        <template v-else-if="cell.column.id === 'cycle_start'">
                            <Badge variant="secondary">
                                <div class="flex flex-row justify-center items-center">
                                    <span>{{ formatDate(row.original.cycle_start as string, 'MM/DD') }} </span>
                                    <span class="mx-1">-</span>
                                    <span>{{ formatDate(row.original.cycle_end as string, 'MM/DD') }}</span>
                                </div>
                            </Badge>
                        </template>
                        <template v-else-if="cell.column.id === 'total_order_cnt'">
                            <span>{{ cell.getValue() }} <span class="text-xs text-gray-500">Pcs</span></span>
                        </template>
                        <template v-else-if="cell.column.id === 'order_cnt_0_1'">
                            <p class="w-full flex flex-row justify-center items-center gap-x-2">
                                <span class="text-xs text-gray-500">{{ cell.getValue() }} </span>
                                <span class="text-xs text-gray-500">/</span>
                                <span class="text-xs text-gray-500">{{ row.original.order_cnt_1_10 }} </span>
                                <span class="text-xs text-gray-500">/</span>
                                <span class="text-xs text-gray-500">{{ row.original.order_cnt_10 }} </span>
                            </p>
                            <!-- <div class="flex flex-col text-xs gap-y-1 rounded-lg gap-3">
                                <p class="  text-balance "><span class="">0-1</span>
                                    <span class="ml-2">
                                        {{
                                            cell.getValue() }}
                                        <span class="text-xs text-gray-500">Pcs</span></span>
                                </p>
                                <p class="text-balance">1-10 <span class="ml-2">{{ row.original.order_cnt_1_10 }} <span
                                            class="text-xs text-gray-500">Pcs</span></span>
                                </p>
                                <p>>10 <span class="ml-2">{{ row.original.order_cnt_10 }} <span
                                            class="text-xs text-gray-500">Pcs</span></span></p>
                            </div> -->
                        </template>
                        <template
                            v-else-if="cell.column.id === 'warehouse' || cell.column.id === 'team_name' || cell.column.id === 'custom_id'">
                            <Badge :variant="cell.getValue() === 'Main' ? 'default' : 'secondary'">{{ cell.getValue() }}
                            </Badge>
                        </template>
                        <template v-else-if="cell.column.id === 'actions'">
                            <div class="flex flex-row justify-center items-center rounded-lg min-w-24 gap-x-2">
                                <Button variant="destructive" size="icon" @click="confirmDelete(row.original)"
                                    class="w-8 h-7">
                                    <Icon name="ph:trash" class="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon" @click="openTransferModal(row.original)"
                                    class="w-8 h-7">
                                    <Icon name="ph:arrows-clockwise" class="w-4 h-4" />
                                    <!-- Transfer -->
                                </Button>
                                <!-- <p class="text-red-500 p-2 cursor-pointer flex flex-row items-center justify-center border border-border rounded-lg w-24"
                                    @click="confirmDelete(row.original)">
                                    <Icon name="ph:trash" class="w-3 h-3 mr-2" /> Delete
                                </p>
                                <p class="text-red-500 p-2 cursor-pointer flex flex-row items-center justify-center border border-border rounded-lg w-24"
                                    @click="openTransferModal(row.original)">
                                    <Icon name="ph:chat-centered-dots-light" class="w-3 h-3 mr-2" /> Transfer
                                </p> -->
                            </div>
                        </template>
                        <template v-else-if="['settle_rate'].includes(cell.column.id)">
                            ${{ formatNumber(cell.getValue() as number) }}
                        </template>
                        <template v-else>
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"
                                class="text-center min-w-36" />
                        </template>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>

    <Dialog v-model:open="showTransferModal">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Transfer Record</DialogTitle>
                <DialogDescription>Select a new driver for this record.</DialogDescription>
            </DialogHeader>
            <div class="py-4">
                <!-- 这里添加司机选择器组件 -->
                <DriverSelector @select="handleTransfer" />
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable, getSortedRowModel, getFilteredRowModel } from '@tanstack/vue-table'
import type { DeliveryRecordView } from '~/types'
import type { PaymentStatusItem, paymentStatusMap } from '@/utils/driver'
import { formatDate, formatNumber } from '@/utils/formatter'
import { calculateProfit } from '@/utils'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast'

const props = defineProps<{
    data: DeliveryRecordView[]
    columns: ColumnDef<DeliveryRecordView>[]
}>()

const emit = defineEmits<{
    (e: 'select-record', record: DeliveryRecordView): void
    (e: 'update:sorting', sorting: SortingState): void
    (e: 'update:columnFilters', columnFilters: ColumnFiltersState): void
    (e: 'delete-record', record: DeliveryRecordView): void
    (e: 'transfer-record', data: { record: DeliveryRecordView; newDriverId: number }): void
}>()

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (sorting) => { emit('update:sorting', sorting) },
    onColumnFiltersChange: (columnFilters) => { emit('update:columnFilters', columnFilters) },
    getRowCanExpand: () => true,
})

const { toast } = useToast()
const showTransferModal = ref(false)
const selectedRecord = ref<DeliveryRecordView | null>(null)

const confirmDelete = async (record: DeliveryRecordView) => {
    if (await confirm('Are you sure you want to delete this record?')) {
        emit('delete-record', record)
    }
}

const openTransferModal = (record: DeliveryRecordView) => {
    selectedRecord.value = record
    showTransferModal.value = true
}

const handleTransfer = (newDriverId: number) => {
    if (selectedRecord.value) {
        emit('transfer-record', { record: selectedRecord.value, newDriverId })
        showTransferModal.value = false
        selectedRecord.value = null
    }
}
</script>

<style scoped>
.sticky-action {
    position: sticky;
    right: 0;
    /* 或者与表格背景色相同 */
    z-index: 10;
}

.sticky-action::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    /* 边框颜色 */
}
</style>