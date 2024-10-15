<!-- DriverTable.vue -->
<template>
    <UCard class="w-full flex flex-col" :ui="cardStyle">
        <template #header>
            <DriverFilterOld @update:filter="handleFilterChange" />
        </template>

        <div class="flex-1 overflow-auto relative">
            <div class="min-w-full align-middle">
                <UTable :rows="drivers" :columns="visibleColumns" v-model:sort="localSort" :loading="loading"
                    @select="selectRow" :ui="tableStyle" class="flex-1 w-full m-0 sticky-header">
                    <!-- Table cell templates -->
                    <template #team_name-data="{ row }">
                        <UBadge :label="row.team_name" color="gray" variant="subtle" size="xs"
                            :ui="{ rounded: 'rounded-full' }" />
                    </template>
                    <template #first_name-data="{ row }">
                        <p>{{ row.first_name + " " + row.last_name }}</p>
                    </template>
                    <template #warehouse-data="{ row }">
                        <UBadge :label="row.warehouse" color="indigo" variant="subtle"
                            :ui="{ rounded: 'rounded-full' }" />
                    </template>
                    <template #driver_id-data="{ row }">
                        <UBadge v-for="item in row.driver_id" :key="item" :label="item" color="emerald" variant="subtle"
                            :ui="{ rounded: 'rounded-full' }" class="px-2" />
                    </template>
                    <template #driver_type-data="{ row }">
                        <UBadge :label="row.driver_type" color="amber" variant="subtle"
                            :ui="{ rounded: 'rounded-full' }" />
                    </template>
                    <template #enroll_time-data="{ row }">
                        {{ formatDate(row.enroll_time) }}
                    </template>
                    <template #dl_expired_time-data="{ row }">
                        {{ formatDate(row.dl_expired_time) }}
                    </template>
                    <template #has_notification-data="{ row }">
                        <UIcon :name="row.has_notification ? 'i-heroicons-bell' : 'i-heroicons-bell-slash'"
                            :class="row.has_notification ? 'text-green-500' : 'text-gray-400'" />
                    </template>
                    <template #status-data="{ row }">
                        <UBadge size="sm" :label="row.status" :color="getStatusColor(row.status)" variant="subtle"
                            class="uppercase" />
                    </template>
                    <template #actions-data="{ row }">
                        <div class="sticky-action mx-auto">
                            <UButton icon="i-ph-caret-down-thin" size="xs" color="primary" variant="soft"
                                :ui="{ rounded: 'rounded-full' }" square @click="$emit('edit', row)" />
                        </div>
                    </template>
                </UTable>
            </div>
        </div>

        <template #footer>
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p class="text-sm text-gray-700 hidden md:block">
                    Showing <span class="font-medium">{{ pageFrom }}</span> to <span class="font-medium">{{ pageTo
                        }}</span> of
                    <span class="font-medium">{{ totalDrivers }}</span> results
                </p>
                <UPagination v-model="currentPage" :page-count="totalPages" :total="totalDrivers" :ui="{
                    wrapper: 'flex items-center gap-1.5',
                    rounded: '!rounded-full w-[26px] h-[26px] justify-center',
                    default: {
                        activeButton: {
                            variant: 'outline'
                        }
                    }
                }" />
            </div>
        </template>
    </UCard>

    <UModal v-model="isColumnSelectorOpen">
        <UCard>
            <template #header>
                <h3 class="text-base font-semibold leading-6 text-gray-900">Select Columns</h3>
            </template>
            <div class="space-y-2">
                <UCheckbox v-for="column in columns" :key="column.key" v-model="selectedColumns" :label="column.label"
                    :value="column.key" />
            </div>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { HaulblazeContact } from '~/types'
import NimshipFilter from '../base/NimshipFilter.vue';
import { useEnums } from '~/composables/useEnums'
import DriverFilterOld from './DriverFilterOld.vue';

// const emit = defineEmits(['update:filter'])
const { getEnumsByType, waitForEnums } = useEnums()

const filters = ref({
    warehouse_id: null,
    cycle_start: null,
    team: null,
    driver_id: null
})

const filterConfigs = ref([
    {
        type: 'driver-selector' as const,
        key: 'driver_id',
        placeholder: 'Driver'
    },
    {
        type: 'select' as const,
        key: 'warehouse_id',
        placeholder: 'Warehouse',
        enumType: 'WAREHOUSE_CODE',
        as: 'Select'
    },
    // {
    //     type: 'select' as const,
    //     key: 'cycle_start',
    //     placeholder: 'Pay Cycle',
    //     enumType: 'CYCLE'
    // },
    {
        type: 'select' as const,
        key: 'team',
        placeholder: 'Team',
        enumType: 'TEAM_NAME',
        as: 'Select'

    },
])

const handleFilterChange = (newFilters: typeof filters.value) => {
    filters.value = newFilters
    emit('update:filter', newFilters)
}
// Props definition
const props = defineProps<{
    drivers: HaulblazeContact[]
    loading: boolean
    totalDrivers: number
    currentPage: number
    pageSize: number
    sort: { column: string; direction: 'asc' | 'desc' }
}>()

// Emits definition
const emit = defineEmits<{
    (e: 'update:sort', sort: { column: string; direction: 'asc' | 'desc' }): void
    (e: 'update:page', page: number): void
    (e: 'update:pageSize', pageSize: number): void
    (e: 'update:filter', filter: any): void
    (e: 'edit', driver: HaulblazeContact): void
}>()

// Table columns definition
const columns = [
    { key: 'team_name', label: 'Team', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'first_name', label: 'First Name', class: 'w-[100px] min-w-[100px] max-w-[200px]', sortable: false },
    { key: 'warehouse', label: 'Warehouse', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'driver_id', label: 'Driver ID', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'enroll_time', label: 'Enroll Time', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'driver_license_no', label: 'DL No.', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'dl_expired_time', label: 'DL Expired Time', class: 'w-[100px] min-w-[160px] max-w-[150px]', sortable: false },
    { key: 'social_security_no', label: 'SSN', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'date_of_birth', label: 'DOB', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'phone', label: 'Phone', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'email', label: 'Email', class: 'w-[150px] min-w-[150px] max-w-[250px]', sortable: false },
    { key: 'account_number', label: 'Account No.', class: 'w-[120px] min-w-[180px] max-w-[200px]', sortable: false },
    { key: 'routing_number', label: 'Routing No.', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'zelle', label: 'Zelle', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'commisson_rate', label: 'Rate', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'driver_type', label: 'Driver Type', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'has_notification', label: 'Notifications', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'last_update', label: 'Last Update', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'mail_street', label: 'Mail', class: 'w-[150px] min-w-[150px] max-w-[250px]', sortable: false },
    { key: 'status', label: 'Status', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'actions', label: 'Actions', class: 'w-[80px] min-w-[60px] max-w-[120px] sticky right-0 top-0 backdrop-filter bg-background border-l border-border', sortable: false },
]

// Computed properties and reactive references
const localSort = computed({
    get: () => props.sort,
    set: (value) => emit('update:sort', value)
})

const selectedRows = ref<HaulblazeContact[]>([])
const isColumnSelectorOpen = ref(false)
const selectedColumns = ref(columns.map(col => col.key))

const visibleColumns = computed(() => columns.filter(col => selectedColumns.value.includes(col.key)))

const currentPage = computed({
    get: () => props.currentPage,
    set: (value) => emit('update:page', value)
})

const pageFrom = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const pageTo = computed(() => Math.min(props.currentPage * props.pageSize, props.totalDrivers))
const totalPages = computed(() => Math.ceil(props.totalDrivers / props.pageSize))

// Helper functions
function selectRow(row: HaulblazeContact) {
    const index = selectedRows.value.findIndex(item => item.uid === row.uid)
    if (index === -1) {
        selectedRows.value.push(row)
    } else {
        selectedRows.value.splice(index, 1)
    }
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'emerald'
        case 'inactive':
            return 'orange'
        default:
            return 'gray'
    }
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}

const handleDriverChange = (value: string) => {
    // Implement the logic for handling driver change
    console.log('Driver changed:', value)
}

// UI styles
const tableStyle = {
    wrapper: 'relative',
    base: 'min-w-full table-fixed',
    divide: 'divide-y divide-gray-300',
    thead: '',
    tbody: 'divide-y divide-gray-200 border-box',
    tr: {
        base: 'transition-colors hover:bg-gray-50 z-20 px-3 py-3.5',
        selected: 'bg-gray-50',
    },
    th: {
        base: 'z-20 px-3 py-3.5 text-center text-sm font-semibold',
        padding: 'px-3 py-3.5',
        color: 'text-gray-900',
        font: 'font-semibold',
        size: 'text-sm',
    },
    td: {
        base: 'h-12 px-4 w-[120px] text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 whitespace-nowrap overflow-hidden text-ellipsis bg-muted-background/80',
        padding: 'px-4 py-3',
        color: 'text-muted-foreground',
        font: '',
        size: 'text-xs',
    },
    checkbox: {
        padding: 'ps-4',
    },
    loadingState: {
        wrapper: 'flex flex-col items-center justify-center h-24 p-4',
        label: 'text-sm text-center text-muted-foreground',
        icon: 'w-6 h-6 mx-auto text-muted-foreground animate-spin',
    },
    emptyState: {
        wrapper: 'flex flex-col items-center justify-center h-24 p-4',
        label: 'text-sm text-center text-muted-foreground',
        icon: 'w-6 h-6 mx-auto text-muted-foreground mb-2',
    },
    expand: {
        icon: 'transition-transform duration-200',
    },
    progress: {
        wrapper: 'absolute inset-x-0 bottom-0 h-1',
    },
    default: {
        sortAscIcon: 'i-ph-arrow-up-thin text-xs w-4 h-4',
        sortDescIcon: 'i-ph-arrow-down-thin text-xs',
        sortButton: {
            icon: 'i-heroicons-arrows-up-down-12-solid',
            trailing: true,
            square: true,
            color: 'red',
            variant: 'ghost',
            class: '-m-1 h-4 w-4 p-0',
        },
        expandButton: {
            icon: 'i-ph-caret-down-thin text-xs',
            color: 'gray',
            variant: 'ghost',
            size: 'xs',
            class: '-my-1 h-6 w-6 p-0',
        },
        checkbox: {
            color: 'primary',
        },
        progress: {
            color: 'primary',
            animation: 'indeterminate',
        },
        loadingState: {
            icon: 'i-ph-circle-notch',
            label: 'Loading...',
        },
        emptyState: {
            icon: 'i-ph-stack',
            label: 'No items.',
        },
    },
}

const cardStyle = {
    base: 'w-full flex flex-col max-h-[calc(100svh)] min-h-[400px] border p-0 m-0',
    background: 'bg-background',
    divide: 'divide-y divide-gray-200',
    header: {
        base: 'py-2 sm:px-6 md:px-2 hidden md:block',
        background: '',
        padding: 'p-0 py-2',
    },
    body: {
        base: 'flex-1 overflow-auto',
        background: '',
        padding: 'p-0 sm:p-0',
    },
    footer: {
        base: 'px-4 py-4 sm:px-6',
        background: '',
        padding: 'p-4',
    },
}
</script>

<style>
.sticky-header th {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
}

.sticky-header td:has(.sticky-action) {
    position: sticky;
    z-index: 20;
    right: 0;
    padding-right: 0;
    padding-left: 0;
    background: --bg-background;
    border-left: .5px solid gray;
}

.sticky-action {
    position: sticky;
    right: 0;
    background-color: white;
    z-index: 1;
}
</style>