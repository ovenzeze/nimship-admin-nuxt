<!-- DriverPage.vue
<template>
    <div class="max-h-full h-full pb-10 md:pb-0 flex border-box">
        <DriverTable :drivers="drivers" :loading="loading" :total-drivers="totalCount" :current-page="currentPage"
            :page-size="pageSize" :sort="sort" @update:sort="handleSortChange" @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange" @edit="handleEdit" @update:filter="handleFilterChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useDriver } from '~/composables/useDriver'
import type { DriverFilters, HaulblazeContact } from '~/types'

const { drivers, totalCount, loading, fetchDrivers } = useDriver()

const currentPage = ref(1)
const pageSize = ref(20)
const sort = reactive({ column: 'first_name', direction: 'asc' as const })
const pagenation = 
const search = ref('')
const statusFilter = ref<string[]>([])

const filter = ref<DriverFilters>({
    warehouse: null,
    team_name: '',
    driver_type: null,
    status: null,
    uid: null,
    employment_status: null,
})

const fetchDriversData = async () => {
    try {
        await fetchDrivers(
            currentPage.value,
            pageSize.value,
            sort,
            search.value,
            statusFilter.value,
            filter.value
        )
    } catch (error) {
        console.error('Error fetching drivers:', error)
        // Handle error (e.g., show error message to user)
    }
}

const handleFilterChange = () => { }



onMounted(() => {
    fetchDriversData()
})
</script> -->
<template>
    <UCard class="w-full h-full flex flex-col bg-background" :ui="cardStyle">
        <template #header>
            <DriverFilter :filters="filters" @update:filter="handleFilterChange" />
        </template>

        <DriverTable :drivers="drivers" :loading="loading" :sort="localSort" @update:sort="updateSort"
            @edit="handleEdit" />

        <template #footer>
            <DriverPagination :page="pagination.page" :total="pagination.total" :page-size="pagination.size"
                @update:page="handlePageChange" />
        </template>
    </UCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { HaulblazeContact, driverTypes } from '~/types'
import { useDriver } from '~/composables/useDriver'
const { fetchDrivers, drivers = [], totalCount } = useDriver()

const loading = ref(false)

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
    team: null,
    uid: null,
    driver_id: null
})

const pagination = ref({ page: 1, size: 20, total: totalCount.value })

const localSort = ref({ column: 'last_update', direction: 'desc' })
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

// Computed properties



// Methods
const handleFilterChange = (newFilters: driverTypes['DriverFilters']) => {
    console.log('[handleFilterChange]:', newFilters)
    filters.value = { ...filters.value, ...newFilters }
    pagination.value = { page: 1, size: 20, total: 0 }
    getDriverList()
}
const handlePageChange = (newPagination: driverTypes['pagination']) => {
    console.log('[handlePageChange]:', newPagination)
    pagination.value = { ...pagination.value, ...newPagination }
    getDriverList()
}
const updateSort = (sort: driverTypes['TableSort']) => {
    emit('update:sort', sort)
}


const updatePage = (page: number) => {
    pagination.value.page = page
}

const handleEdit = (driver: HaulblazeContact) => {
    emit('edit', driver)
}

const getDriverList = async () => {
    try {
        await fetchDrivers(
            pagination.value,
            localSort.value,
            filters.value
        )
        pagination.value.total = totalCount.value
    } catch (error) {
        console.error('Error fetching drivers:', error)
        // Handle error (e.g., show error message to user)
    }
}
onMounted(() => { getDriverList() })
// Styles
const cardStyle = {
    base: 'w-full flex flex-col sm:max-h-[calc(100svh-60px)] md:max-h-[calc(100svh)] min-h-[400px] border p-0 m-0',
    background: 'bg-background',
    divide: ' divide-gray-200',
    header: {
        base: 'py-2 sm:px-6 md:px-2 hidden md:block',
        background: 'bg-background',
        padding: 'p-0 py-2',
    },
    body: {
        base: 'flex-1 overflow-auto flex',
        background: 'bg-background',
        padding: 'p-0 sm:p-0',
    },
    footer: {
        base: 'px-2 my-0',
        background: '',
        padding: 'sm:p-0 md:py-2',
    },
}
</script>