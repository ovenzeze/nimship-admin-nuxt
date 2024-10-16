<template>
    <div class="flex-1 w-full flex flex-col">
        <UTable :rows="drivers" :columns="visibleColumns" v-model:sort="localSort" :loading="loading"
            @select="selectRow" :ui="tableStyle" class="flex-1 w-full m-0 sticky-header">
            <!-- Table cell templates -->
            <template #team_name-data="{ row }">
                <UBadge :label="row.team_name" color="gray" variant="subtle" size="xs"
                    :ui="{ rounded: 'rounded-full' }" />
            </template>
            <template #first_name-data="{ row }">
                <p class="uppercase">{{ row.first_name + " " + row.last_name }}</p>
            </template>
            <template #warehouse-data="{ row }">
                <UBadge :label="row.warehouse" color="indigo" variant="subtle" :ui="{ rounded: 'rounded-full' }" />
            </template>
            <template #driver_id-data="{ row }">
                <UBadge v-for="item in row.driver_id" :key="item" :label="item" color="emerald" variant="subtle"
                    :ui="{ rounded: 'rounded-full' }" class="px-2" />
            </template>
            <template #driver_type-data="{ row }">
                <UBadge :label="row.driver_type" color="amber" variant="subtle" :ui="{ rounded: 'rounded-full' }" />
            </template>
            <template #enroll_time-data="{ row }">
                {{ formatDate(row.enroll_time) }}
            </template>
            <template #zelle-data="{ row }">
                {{ row.zelle || 'N/A' }}
            </template>
            <template #dl_expired_time-data="{ row }">
                {{ row.dl_expired_time ? formatDate(row.dl_expired_time) : 'N/A' }}
            </template>
            <template #has_notification-data="{ row }">
                <UIcon :name="row.has_notification ? 'i-heroicons-bell' : 'i-heroicons-bell-slash'"
                    :class="row.has_notification ? 'text-green-500' : 'text-gray-400'" />
            </template>
            <template #status-data="{ row }">
                <UBadge size="sm" :label="row.status" :color="getStatusColor(row.status)" variant="subtle"
                    class="uppercase rounded-full" />
            </template>
            <template #last_update-data="{ row }">
                {{ formatDate(row.last_update) }}
            </template>
            <template #mail_street-data="{ row }">

                <p v-if="row.mail_street" class="uppercase">{{ row.mail_street }}</p>
                <p v-if="row.mail_city" class="uppercase">{{ row.mail_city }} {{ row.mail_state }} {{ row.mail_zip
                    }}</p>
                <p v-if="!row.mail_street" class="uppercase text-red-300">N/A</p>


            </template>
            <template #actions-data="{ row }">
                <div class="sticky-action mx-auto backdrop-blur-sm rounded-full px-1 py-2">
                    <UButton icon="i-ph-caret-down-thin" size="xs" color="primary" variant="soft"
                        :ui="{ rounded: 'rounded-full' }" square @click="$emit('edit', row)" />
                </div>
            </template>
        </UTable>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { HaulblazeContact } from '~/types'

const props = defineProps<{
    drivers: HaulblazeContact[]
    loading: boolean
    sort: { column: string; direction: 'asc' | 'desc' }
}>()

const emit = defineEmits<{
    (e: 'update:sort', sort: { column: string; direction: 'asc' | 'desc' }): void
    (e: 'edit', driver: HaulblazeContact): void
}>()

// Table columns definition
const columns = [
    { key: 'team_name', label: 'Team', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'first_name', label: 'Name', class: 'w-[100px] min-w-[100px] max-w-[200px]', sortable: false },
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
    { key: 'last_update', label: 'Last Update', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: true },
    { key: 'mail_street', label: 'Address', class: 'w-[150px] min-w-[150px] max-w-[250px]', sortable: false },
    { key: 'status', label: 'Status', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'actions', label: 'Actions', class: 'w-[80px] min-w-[60px] max-w-[120px] sticky right-0 top-0 backdrop-filter bg-background border-l border-border', sortable: false },
]

const localSort = computed({
    get: () => props.sort,
    set: (value) => emit('update:sort', value)
})

const selectedRows = ref<HaulblazeContact[]>([])
const selectedColumns = ref(columns.map(col => col.key))

const visibleColumns = computed(() => columns.filter(col => selectedColumns.value.includes(col.key)))

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

// UI styles
const tableStyle = {
    wrapper: '',
    base: 'min-w-full table-fixed flex-1',
    divide: '',
    thead: 'stick top-0 left-0 z-30',
    tbody: 'border-box',
    tr: {
        base: 'transition-colors z-20 px-3 py-3.5',
        selected: 'bg-gray-50',
    },
    th: {
        base: 'z-20 px-3 py-3.5 text-center text-sm font-semibold backdrop-blur-lg  bg-gray-50 dark:bg-background border-b',
        padding: 'px-3 py-3.5',
        color: '',
        font: 'font-semibold',
        size: 'text-sm',
    },
    td: {
        base: 'h-12 px-4 w-[120px] text-center align-middle [&:has([role=checkbox])]:pr-0 whitespace-nowrap overflow-hidden text-ellipsis',
        padding: 'px-4 py-3',
        color: '',
        font: '',
        size: 'text-sm',
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
</script>

<style>
/* .sticky-header {
    position: relative;
    overflow: hidden;
} */

.sticky-header th {
    position: sticky;
    top: 0;
    z-index: 20;
}

.sticky-header td:has(.sticky-action) {
    position: sticky;
    z-index: 20;
    right: 0;
    padding-right: 0;
    padding-left: 0;
    /* background-color: hsl(var(--background)); */
}


.sticky-action {
    position: sticky;
    right: 0;
    z-index: 1;
}
</style>
