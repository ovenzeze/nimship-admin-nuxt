<template>
    <TableRow :data-state="row.getIsSelected() ? 'selected' : undefined"
        :style="{ transform: `translateY(${index * rowHeight}px)` }" class="absolute w-full">
        <TableCell>
            <Checkbox :checked="isSelected" @change="$emit('toggle-select', row.original.id)" aria-label="Select row" />
        </TableCell>
        <TableCell v-for="columnId in visibleColumns" :key="columnId" class="text-center"
            :class="{ 'sticky-action backdrop-blur-lg': columnId === 'actions' }">
            <template v-if="columnId === 'payment_status'">
                <Badge
                    :variant="paymentStatusMap[Number(row.getValue(columnId))]?.status !== 'PENDING' ? 'destructive' : 'secondary'">
                    {{ paymentStatusMap[Number(row.getValue(columnId))]?.status || 'N/A' }}
                </Badge>
            </template>
            <template v-else-if="columnId === 'driver_name'">
                <span class="text-xs">{{ String(row.getValue(columnId)).toUpperCase() || 'N/A' }}</span>
            </template>
            <template v-else-if="columnId === 'total_salary'">
                ${{ calculateProfit(row.original).profit }} <span class="text-xs text-gray-500">{{
                    (Number(calculateProfit(row.original).rate) * 100).toFixed(2) }}% </span>
            </template>
            <template v-else-if="columnId === 'driver_salary'">
                ${{ calculateProfit(row.original).salary }}
            </template>
            <template v-else-if="columnId === 'cycle_start'">
                <Badge variant="secondary">
                    <div class="flex flex-row justify-center items-center">
                        <span>{{ formatDate(row.original.cycle_start as string, 'MM/DD') }} </span>
                        <span class="mx-1">-</span>
                        <span>{{ formatDate(row.original.cycle_end as string, 'MM/DD') }}</span>
                    </div>
                </Badge>
            </template>
            <template v-else-if="columnId === 'total_order_cnt'">
                <span>{{ row.getValue(columnId) }} <span class="text-xs text-gray-500">Pcs</span></span>
            </template>
            <template v-else-if="columnId === 'order_cnt_0_1'">
                <p class="w-full flex flex-row justify-center items-center gap-x-2">
                    <span class="text-xs text-gray-500">{{ row.getValue(columnId) }} </span>
                    <span class="text-xs text-gray-500">/</span>
                    <span class="text-xs text-gray-500">{{ row.original.order_cnt_1_10 }} </span>
                    <span class="text-xs text-gray-500">/</span>
                    <span class="text-xs text-gray-500">{{ row.original.order_cnt_10 }} </span>
                </p>
            </template>
            <template v-else-if="columnId === 'warehouse' || columnId === 'team_name' || columnId === 'custom_id'">
                <Badge :variant="row.getValue(columnId) === 'Main' ? 'default' : 'secondary'">{{ row.getValue(columnId)
                    }}</Badge>
            </template>
            <template v-else-if="columnId === 'actions'">
                <div class="flex flex-row justify-center items-center rounded-lg gap-x-2">
                    <AlertDialog>
                        <AlertDialogTrigger as-child>
                            <Button variant="destructive" size="icon" class="w-8 h-7" aria-label="Delete record">
                                <Icon name="ph:trash" class="w-4 h-4" aria-hidden="true" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the delivery record.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction @click="$emit('delete', row.original)">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button variant="outline" size="icon" @click="$emit('transfer', row.original)" class="w-8 h-7"
                        aria-label="Transfer record">
                        <Icon name="ph:arrows-clockwise" class="w-4 h-4" aria-hidden="true" />
                    </Button>
                </div>
            </template>
            <template v-else-if="['settle_rate'].includes(columnId)">
                ${{ formatNumber(row.getValue(columnId) as number) }}
            </template>
            <template v-else>
                {{ row.getValue(columnId) }}
            </template>
        </TableCell>
    </TableRow>
</template>

<script setup lang="ts">
import { FlexRender } from '@tanstack/vue-table'
import type { Row } from '@tanstack/vue-table'
import type { DeliveryRecordView } from '~/types/database'
import type { PaymentStatusItem, paymentStatusMap } from '@/utils/driver'
import { formatDate, formatNumber } from '@/utils/formatter'
import { calculateProfit } from '@/utils'

defineProps<{
    row: Row<DeliveryRecordView>
    index: number
    rowHeight: number
    visibleColumns: string[]
    isSelected: boolean
}>()

defineEmits<{
    (e: 'delete', record: DeliveryRecordView): void
    (e: 'transfer', record: DeliveryRecordView): void
    (e: 'toggle-select', id: number): void
}>()
</script>

<style scoped>
.sticky-action {
    position: sticky;
    right: 0;
    z-index: 10;
}

.sticky-action::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
}
</style>