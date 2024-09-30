<template>
    <div class="w-full h-full flex flex-col relative">
        <div class="flex-grow overflow-auto">
            <div class="min-w-full inline-block align-middle">
                <div class="overflow-hidden">
                    <Table class="min-w-full h-full overflow-scroll flex">
                        <TableHeader class="absolute top-0 left-0 w-full z-10  bg-secondary">
                            <TableRow>
                                <TableHead v-for="column in visibleColumns" :key="column.id" :class="[
                                    'text-center text-xs font-semibold uppercase tracking-wider px-2 py-3 whitespace-nowrap min-w-32 text-text-primary',
                                    getColumnVisibilityClass(column.id)
                                ]">
                                    {{ column.header }}
                                </TableHead>
                                <TableHead class="text-center px-2 py-3 sticky-action">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody class="overflow-hidden w-full relative mt-10">
                            <TransitionGroup name="list" tag="div">
                                <TableRow v-for="row in data" :key="row.id"
                                    class="transition-all duration-300 ease-in-out hover:bg-muted/50 min-h-20 h-20 w-full"
                                    @click="handleRowClick(row)">
                                    <TableCell v-for="column in visibleColumns" :key="column.id" :class="[
                                        'flex flex-row items-center justify-center text-center relative px-2 min-w-32',
                                        getColumnVisibilityClass(column.id)
                                    ]">
                                        <template v-if="column.id === 'qualification'">
                                            <QualificationCell :qualification="row.qualification"
                                                :icons="qualificationIcons" />
                                        </template>
                                        <template v-else-if="column.id === 'driver_id'">
                                            <p>{{ row.driver_id[0] || 'N/A' }}</p>
                                        </template>
                                        <component v-else :is="getCellComponent(column.id)"
                                            :class="[getCellClass(row, column.id), { 'cursor-pointer': isEditableField(column.id) }]"
                                            @click.stop="isEditableField(column.id) && showPopover(row, column)">
                                            <transition name="cell-update" mode="out-in">
                                                <span :key="formatCellValue(row, column.id)"
                                                    class="max-w-28 truncate line-clamp-1 text-ellipsis hover:placeholder-shown:text-ellipsis">
                                                    {{ formatCellValue(row, column.id) }}
                                                </span>
                                            </transition>
                                        </component>
                                        <transition name="fade">
                                            <div v-if="getCellLoadingState(row.uid, column.id)"
                                                class="absolute inset-0 flex items-center justify-center bg-background/50">
                                                <Loader2 class="h-4 w-4 animate-spin" />
                                            </div>
                                        </transition>
                                    </TableCell>
                                    <TableCell class="text-center px-2 py-2 ">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" class="h-8 w-8 p-0">
                                                    <span class="sr-only">Open menu</span>
                                                    <MoreHorizontal class="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem @click.stop="editDriver(row)">Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem @click.stop="deleteDriver(row)">Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </TransitionGroup>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="loading"
                class="fixed bottom-0 left-0 w-full flex justify-center items-center h-full transition-all duration-300 bg-background/50">
                <Loader2 class="h-6 w-6 animate-spin" />
            </div>
        </transition>
        <div v-if="!loading && data.length === 0" class="flex justify-center items-center h-24">
            No data available
        </div>

        <!-- Single Popover for editing -->
        <Popover v-model:open="isPopoverOpen" :trap-focus="false" :close-on-outside-click="true">
            <PopoverTrigger as="div" :style="popoverTriggerStyle" />
            <transition name="popover" mode="out-in">
                <PopoverContent class="p-0" :style="popoverContentStyle">
                    <div v-if="popoverLoading" class="flex justify-center items-center h-10">
                        <Loader2 class="h-4 w-4 animate-spin" />
                    </div>
                    <div v-else-if="editingColumn && editingColumn.id !== 'available'"
                        class="max-h-[300px] overflow-y-auto">
                        <div v-for="option in popoverOptions" :key="option.value"
                            class="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                            :class="{ 'bg-accent text-accent-foreground': option.value === editingValue }"
                            @click="selectOption(option.value)">
                            {{ option.label }}
                        </div>
                    </div>
                    <div v-else class="p-2">
                        <Switch v-model="editingValue" @update:modelValue="updateEditingField" />
                    </div>
                </PopoverContent>
            </transition>
        </Popover>
    </div>
</template>


<style scoped>
.table-container {
    height: 100%;
    overflow-y: auto;
}

.sticky-header {
    position: sticky;
    top: 0;
    z-index: 10;
}

.sticky-action {
    position: sticky;
    right: 0;
    z-index: 10;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-move {
    transition: transform 0.5s ease;
}

.cell-update-enter-active,
.cell-update-leave-active {
    transition: all 0.3s ease;
}

.cell-update-enter-from,
.cell-update-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.popover-enter-active,
.popover-leave-active {
    transition: all 0.3s ease;
}

.popover-enter-from,
.popover-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>



<script setup lang="ts">
import { MoreHorizontal, Loader2 } from 'lucide-vue-next'
import type { HaulblazeContact, DriverColumn, ReadableDriver, QualificationIcon } from '~/types/index'
import { useEnums } from '~/composables/useEnums'
import { getBadgeClass } from '~/utils/colorUtils'
import { EnumType } from '~/types/index'
import { getReadableDriver } from '~/utils/driver'
import { useDriver } from '~/composables/useDriver'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useToast } from '@/components/ui/toast'
import QualificationCell from './QualificationCell.vue'

dayjs.extend(relativeTime)

const props = defineProps<{
    data: ReadableDriver[]
    columns: DriverColumn[]
    loading?: boolean
    dimensions?: {
        width: string
        maxWidth: string
        height: string
        maxHeight: string
    }
}>()

const emit = defineEmits<{
    'update:sorting': [sorting: any]
    'update:columnFilters': [columnFilters: any]
    'update:driver': [driver: HaulblazeContact]
    'edit-driver': [driver: HaulblazeContact]
    'select-driver': [driver: ReadableDriver]
}>()

const { getEnumsByType } = useEnums()
const { updateDriver } = useDriver()
const { toast } = useToast()

const visibleColumns = computed(() => props.columns)
const popoverLoading = ref(false)
const isPopoverOpen = ref(false)
const editingRow = ref<HaulblazeContact | null>(null)
const editingColumn = ref<DriverColumn | null>(null)
const editingValue = ref<any>(null)
const popoverOptions = ref<{ value: string, label: string }[]>([])
const popoverTriggerStyle = ref({
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '1px',
    height: '1px',
})
const popoverContentStyle = ref({})
const cellLoadingStates = ref<{ [key: string]: boolean }>({})

const tableDimensionsStyle = computed(() => ({
    width: props.dimensions?.width || '100%',
    maxWidth: props.dimensions?.maxWidth || 'none',
    height: props.dimensions?.height || '100%',
    maxHeight: props.dimensions?.maxHeight || 'none',
}))

const qualificationIcons: QualificationIcon[] = [
    { name: 'dl', icon: 'lucide:lock-keyhole', tooltip: 'Driver License' },
    { name: 'tax', icon: 'lucide:tree-deciduous', tooltip: 'Tax Documents' },
    { name: 'vehicle', icon: 'lucide:car', tooltip: 'Vehicle Information' },
]

const columnPriority = {
    name: 1,
    status: 2,
    warehouse: 3,
    team_name: 4,
    driver_type: 5,
    phone: 6,
    email: 7,
    available: 8,
    rating: 9,
    completed_trips: 10,
    enroll_time: 11,
    dl_expired_time: 12,
    qualification: 13,
    employment_status: 14,
}

const getColumnVisibilityClass = (columnId: string) => {
    const priority = columnPriority[columnId as keyof typeof columnPriority] || 99
    if (priority <= 3) return 'table-cell'
    if (priority <= 5) return 'hidden sm:table-cell'
    if (priority <= 8) return 'hidden md:table-cell'
    return 'hidden lg:table-cell'
}

const getCellComponent = (columnId: keyof ReadableDriver) => {
    switch (columnId) {
        case 'status':
        case 'driver_type':
        case 'warehouse':
            return 'div'
        case 'team_name':
            return 'div'
        default:
            return 'span'
    }
}

const getCellClass = (row: ReadableDriver, columnId: keyof ReadableDriver) => {
    switch (columnId) {
        case 'status':
            return [getBadgeClass(row[columnId] as string, columnId), 'opcity-25']
        case 'name':
            return 'text-xs font-medium'
        case 'driver_type':
            return getBadgeClass(row[columnId] as string, columnId)
        case 'warehouse':
            return getBadgeClass(row[columnId] as string, columnId)
        case 'team_name':
            return getBadgeClass(row[columnId] as string, columnId)
        default:
            return ''
    }
}

const formatCellValue = (row: HaulblazeContact, columnId: keyof ReadableDriver) => {
    const readableDriver = getReadableDriver(row)
    switch (columnId) {
        case 'name':
            return readableDriver.name
        case 'enroll_time':
            return readableDriver.enroll_time ? dayjs(readableDriver.enroll_time).fromNow() : 'N/A'
        case 'dl_expired_time':
            return readableDriver.dl_expired_time ? dayjs(readableDriver.dl_expired_time).format('YYYY-MM-DD') : 'N/A'
        case 'rating':
            return readableDriver.rating ? readableDriver.rating.toFixed(1) : 'N/A'
        case 'available':
            return readableDriver.available ? 'Yes' : 'No'
        case 'completed_trips':
            return readableDriver.completed_trips || 'N/A'
        default:
            return readableDriver[columnId] || 'N/A'
    }
}

const isEditableField = (columnId: keyof ReadableDriver) => {
    return ['status', 'driver_type', 'warehouse', 'team_name', 'available'].includes(columnId)
}

const getOptionsForField = async (field: keyof ReadableDriver) => {
    popoverLoading.value = true
    try {
        let enumType: EnumType
        switch (field) {
            case 'driver_type':
                enumType = EnumType.DRIVER_TYPE
                break
            case 'status':
                enumType = EnumType.STATUS
                break
            case 'team_name':
                enumType = EnumType.TEAM_NAME
                break
            case 'warehouse':
                enumType = EnumType.WAREHOUSE_CODE
                break
            default:
                return []
        }
        const options = await getEnumsByType(enumType)
        return options.map(item => ({ value: item.value, label: item.label }))
    } finally {
        popoverLoading.value = false
    }
}

const showPopover = async (row: HaulblazeContact, column: DriverColumn) => {
    editingRow.value = row
    editingColumn.value = column
    editingValue.value = row[column.id as keyof HaulblazeContact]

    if (column.id !== 'available') {
        popoverOptions.value = await getOptionsForField(column.id as keyof ReadableDriver)
    }

    const cellElement = event.target as HTMLElement
    const rect = cellElement.getBoundingClientRect()
    const contentWidth = Math.max(rect.width * 1.5, 180)
    popoverTriggerStyle.value = {
        position: 'fixed',
        left: `${(rect.left / 2) + contentWidth / 2}px`,
        top: `${rect.bottom}px`,
        width: '1px',
        height: '1px',
    }
    popoverContentStyle.value = {
        minWidth: '180px',
        width: `${rect.width * 1.5}px`,
    }

    isPopoverOpen.value = true
}

const selectOption = async (value: any) => {
    if (editingRow.value && editingColumn.value) {
        const driverUid = editingRow.value.uid
        const columnId = editingColumn.value.id
        setCellLoadingState(driverUid, columnId, true)

        try {
            await updateEditingField(value)
            editingValue.value = value
        } finally {
            setCellLoadingState(driverUid, columnId, false)
        }
    }
}

const updateEditingField = async (value: any) => {
    if (editingRow.value && editingColumn.value) {
        const columnId = editingColumn.value.id
        const updatedDriver = {
            uid: editingRow.value.uid,
            [columnId]: value
        }

        try {
            const result = await updateDriver(updatedDriver as HaulblazeContact)
            isPopoverOpen.value = false

            // Update the local data to reflect the change
            const index = props.data.findIndex(d => d.uid === updatedDriver.uid)
            if (index !== -1) {
                props.data[index] = { ...props.data[index], ...result }
            }

            emit('update:driver', result)

            toast({
                title: 'Success',
                description: `Successfully updated ${columnId} for driver ${result.first_name} ${result.last_name}`,
            })
        } catch (error) {
            console.error('Error updating driver:', error)
            toast({
                title: 'Error',
                description: `Failed to update ${columnId} for driver ${editingRow.value.first_name} ${editingRow.value.last_name}`,
                variant: 'destructive',
            })
        }
    }
}

const setCellLoadingState = (driverUid: string, columnId: string, isLoading: boolean) => {
    const key = `${driverUid}-${columnId}`
    cellLoadingStates.value[key] = isLoading
}

const getCellLoadingState = (driverUid: string, columnId: string) => {
    const key = `${driverUid}-${columnId}`
    return cellLoadingStates.value[key] || false
}

const editDriver = (driver: HaulblazeContact) => {
    emit('edit-driver', driver)
}

const deleteDriver = (driver: HaulblazeContact) => {
    console.log('Delete driver:', driver)
    // Implement delete functionality
}

const handleRowClick = (row: ReadableDriver) => {
    if (window.innerWidth < 768) { // Assuming 768px as the breakpoint for mobile devices
        emit('select-driver', row)
    }
}

onMounted(() => {
    console.log('DriverTable mounted')
})

watch(() => props.data, (newData) => {
    console.log('DriverTable data updated:', newData)
}, { deep: true, immediate: true })

watch(() => props.loading, (newLoading) => {
    console.log('DriverTable loading state:', newLoading)
})
</script>
