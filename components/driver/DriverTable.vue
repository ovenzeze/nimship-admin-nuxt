<template>
    <div class="w-full flex flex-col md:px-2 md:py-4 ">
        <UCard class="w-full flex flex-col" :ui="cardStyle">
            <template #header>
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div class="flex flex-wrap gap-2">
                        <DriverSelector modelValue="" @update:model-value="handleDriverChange" />
                        <!-- <UButton color="primary" icon="i-heroicons-plus-20-solid" @click="$emit('add')">
                            Add Driver
                        </UButton> -->
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <UButton color="accent" variant="soft" icon="i-heroicons-funnel"
                            @click="isFilterOpen = !isFilterOpen">
                            Filters
                        </UButton>
                        <UButton color="accent" variant="soft" icon="i-heroicons-bell-slash"
                            @click="isFilterOpen = !isFilterOpen">
                            Reset
                        </UButton>
                        <!-- <UButton color="primary" icon="i-heroicons-plus-20-solid" @click="$emit('add')">
                            Add Driver
                        </UButton> -->
                    </div>
                </div>
            </template>

            <div class="flex-1 overflow-x-auto">
                <div class="inline-block min-w-full align-middle">
                    <UTable :rows="drivers" :columns="visibleColumns" v-model:sort="sort" :loading="loading"
                        @select="selectRow" :ui="tableStyle" class="flex-1 w-full m-0">
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
                            <UBadge v-for="item in row.driver_id" :label="item" color="emerald" variant="subtle"
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
                            <UButton icon="i-heroicons-pencil" size="xs" color="blue" variant="outline"
                                :ui="{ rounded: 'rounded-full' }" square @click="$emit('edit', row)" />
                        </template>
                    </UTable>
                </div>
            </div>

            <template #footer>
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p class="text-sm text-gray-700 hidden md:block">
                        Showing <span class="font-medium">{{ pageFrom }}</span> to <span class="font-medium">{{ pageTo
                            }}</span> of <span class="font-medium">{{ totalDrivers }}</span> results
                    </p>
                    <UPagination v-model="currentPage" :page-count="totalPages" :total="totalDrivers" :ui="{
                        wrapper: 'flex items-center gap-1',
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
                    <UCheckbox v-for="column in columns" :key="column.key" v-model="selectedColumns"
                        :label="column.label" :value="column.key" />
                </div>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { HaulblazeContact } from '~/types'
import DriverSelector from '../base/DriverSelector.vue';

const props = defineProps<{
    drivers: HaulblazeContact[]
    loading: boolean
    totalDrivers: number
    currentPage: number
    pageSize: number
}>()

const emit = defineEmits<{
    (e: 'update:sort', sort: { column: string; direction: 'asc' | 'desc' }): void
    (e: 'update:page', page: number): void
    (e: 'update:pageSize', pageSize: number): void
    (e: 'edit', driver: HaulblazeContact): void
    (e: 'add'): void
}>()


const columns = [
    { key: 'team_name', label: 'Team', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'first_name', label: 'First Name', class: 'w-[100px] min-w-[100px] max-w-[200px]', sortable: false },
    // { key: 'last_name', label: 'Last Name', class: 'w-[100px] min-w-[100px] max-w-[200px]', sortable: false },
    { key: 'warehouse', label: 'Warehouse', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },

    { key: 'driver_id', label: 'Driver ID', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'enroll_time', label: 'Enroll Time', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'driver_license_no', label: 'DL No.', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    { key: 'dl_expired_time', label: 'DL Expired Time', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
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
    // { key: 'haulblaze_id', label: 'Haulblaze ID', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    // { key: 'id', label: 'ID', class: 'w-[80px] min-w-[80px] max-w-[120px]', sortable: false },
    { key: 'last_update', label: 'Last Update', class: 'w-[120px] min-w-[120px] max-w-[200px]', sortable: false },
    // { key: 'mail_city', label: 'Mail City', class: 'w-[100px] min-w-[100px] max-w-[200px]', sortable: false },
    // { key: 'mail_state', label: 'Mail State', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'mail_street', label: 'Mail', class: 'w-[150px] min-w-[150px] max-w-[250px]', sortable: false },
    // { key: 'mail_zip', label: 'Mail ZIP', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    { key: 'status', label: 'Status', class: 'w-[100px] min-w-[100px] max-w-[150px]', sortable: false },
    // { key: 'uid', label: 'UID', class: 'w-[200px] min-w-[200px] max-w-[300px]', sortable: false },
    { key: 'actions', label: 'Actions', class: 'w-[80px] min-w-[80px] max-w-[120px] sticky right-0', sortable: false },
]

const sort = ref({ column: 'first_name', direction: 'asc' })
const search = ref('')
const isFilterOpen = ref(false)
const selectedRows = ref<HaulblazeContact[]>([])
const isColumnSelectorOpen = ref(false)
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

const currentPage = computed({
    get: () => props.currentPage,
    set: (value) => emit('update:page', value)
})

const pageSize = computed({
    get: () => props.pageSize,
    set: (value) => emit('update:pageSize', value)
})

const pageFrom = computed(() => (currentPage.value - 1) * pageSize.value + 1)
const pageTo = computed(() => Math.min(currentPage.value * pageSize.value, props.totalDrivers))
const totalPages = computed(() => Math.ceil(props.totalDrivers / pageSize.value))

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
}

const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date()
}
const tableStyle = {
    wrapper: 'flex-1 flex-shrink-0',
    base: '',
    divide: 'divide-border',
    thead: '',
    tbody: ' rounded-lg',
    caption: 'text-sm text-muted-foreground',
    tr: {
        base: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted py-3 border-border/50',
        selected: 'bg-muted',
        active: 'hover:bg-muted/50 cursor-pointer',
    },
    th: {
        base: ' bg-accent dark:bg-background px-4 w-[120px] text-center align-middle font-medium text-muted-foreground border-b backdrop-blur-[4px] [&:has([role=checkbox])]:pr-0 whitespace-nowrap overflow-hidden text-ellipsis',
        padding: 'px-4',
        color: 'text-primary',
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
    base: 'w-full flex flex-col overflow-hidden border ',
    background: 'bg-background',
    divide: 'divide-y divide-border',
    ring: 'ring-0',
    rounded: 'rounded-md',
    shadow: 'shadow-sm',
    body: {
        base: 'flex-1 flex flex-row h-full w-full overflow-hidden',
        background: '',
        padding: '',
    },
    header: {
        base: 'w-full flex-shrink-0',
        background: '',
        padding: 'px-6 py-3',
    },
    footer: {
        base: 'flex-shrink-0 mb-10',
        background: '',
        padding: 'px-6 py-2',
    },
}
</script>