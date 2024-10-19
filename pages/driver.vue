<template>
    <UCard :ui="cardStyle">
        <template #header>
            <DriverFilter :filters="filters" :loading="isSearchLoading" @update:filter="handleFilterChange"
                class="animate-in animate-fade-in" />
        </template>

        <DriverTable :drivers="drivers" :loading="loading" :sort="localSort" @update:sort="updateSort"
            @edit="handleEdit" @update:field="handleFieldsChange" />

        <template #footer>
            <!-- <DriverPagination :page="pagination.index" :total="pagination.total" :page-size="pagination.size"
                @update:page="handlePageChange" class="animate-in slide-in-from-bottom" /> -->
            <!-- Fixed footer with Nuxt UI Pagination -->
            <div class=" rounded-lg rounded-t-none py-2 px-4 flex justify-between items-center">
                <div class="hidden md:block">
                    <p class="text-sm text-gray-700">
                        Showing
                        <span class="font-medium">{{ pagination.from }}</span>
                        to
                        <span class="font-medium">{{ pagination.to }}</span>
                        of
                        <span class="font-medium">{{ totalCount }}</span>
                        results
                    </p>
                </div>
                <UPagination v-model="pagination.index" :total="totalCount" :pageCount="pagination.size"
                    @update:model-value="handlePageChange" :ui="{
                        wrapper: 'gap-1 py-0',
                        base: 'text-xs w-[28px] h-[28px] flex flex-row items-center justify-center rounded-full',
                        rounded: '',
                    }" />
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { HaulblazeContact, driverTypes } from '~/types'
import { useDriver } from '~/composables/useDriver'

const {
    drivers,
    totalCount,
    loading,
    isSearchLoading,
    pagination,
    fetchDrivers,
    updateDriver,
    setFilters,
    setSorting,
    setPagination
} = useDriver()

// Emits
const emit = defineEmits<{
    (e: 'update:sort', sort: driverTypes['TableSort']): void
    (e: 'update:page', page: number): void
    (e: 'update:pageSize', pageSize: number): void
    (e: 'update:filter', filter: driverTypes['DriverFilters']): void
    (e: 'edit', driver: HaulblazeContact): void
}>()

// Local state
const filters = ref<driverTypes['DriverFilters']>({
    warehouse: null,
    cycle_start: null,
    team_name: null,
    uid: null,
    driver_id: null,
    driver_type: null,
    status: null,
    employment_status: null
})

const localSort = ref<driverTypes['TableSort']>({ column: 'last_update', direction: 'desc' })

// Table columns definition
const columns: driverTypes['TableColumn'][] = [
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

// Methods
const handleFilterChange = (newFilters: { key: string; item: any }) => {
    console.log('[handleFilterChange]:', newFilters)
    filters.value = { ...filters.value, [newFilters.key]: newFilters.item }
    setFilters(filters.value)
}

const handlePageChange = (newPagination: { page: number; size?: number; total?: number; count?: number }) => {
    console.log('[handlePageChange]:', newPagination)
    setPagination(newPagination)
}

const handleFieldsChange = (fields: Partial<HaulblazeContact>) => {
    console.log('[handleFieldsChange]:', fields)
    updateDriver(fields)
}

const updateSort = (sort: driverTypes['TableSort']) => {
    localSort.value = sort
    setSorting([sort])
}

const handleEdit = (driver: HaulblazeContact) => {
    emit('edit', driver)
}

onMounted(() => {
    fetchDrivers()
})

// Styles
const cardStyle = {
    base: 'w-full flex flex-col h-full max-h-full rounded-lg overflow-hidden border border-border rounded-lg',
    background: 'bg-background',
    divide: ' divide divide-border-border',
    header: {
        base: 'sm:px-6 md:px-0 z-30',
        background: 'bg-muted/50 backdrop-blur-sm',
        padding: 'p-0 py-0',
    },
    body: {
        base: 'flex-1 overflow-hidden flex overscroll-none border-none',
        background: '',
        padding: 'p-0 sm:p-0',
    },
    footer: {
        base: 'px-2 my-0 bg-muted/50 dark:bg-gary-900/90 backdrop-blur-sm',
        background: '',
        padding: 'sm:p-0 py-2 md:py-2',
    },
}
</script>
