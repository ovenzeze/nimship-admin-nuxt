<!-- DriverPage.vue -->
<template>
    <div class="max-h-full h-full pb-10 md:pb-0 flex border-box">
        <DriverTable :drivers="drivers" :loading="loading" :total-drivers="totalCount" :current-page="currentPage"
            :page-size="pageSize" :sort="sort" @update:sort="handleSortChange" @update:page="handlePageChange"
            @update:page-size="handlePageSizeChange" @edit="handleEdit" @update:filter="handleFilterChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useDriver } from '~/composables/useDriver'
import type { DriverFilters, HaulblazeContact } from '~/types'

const { drivers, totalCount, loading, fetchDrivers } = useDriver()

const currentPage = ref(1)
const pageSize = ref(20)
const sort = reactive({ column: 'first_name', direction: 'asc' as const })
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
const handleSortChange = (newSort: { column: string; direction: 'asc' | 'desc' }) => {
    Object.assign(sort, newSort)
    fetchDriversData()
}

const handlePageChange = (page: number) => {
    currentPage.value = page
    fetchDriversData()
}

const handlePageSizeChange = (size: number) => {
    pageSize.value = size
    currentPage.value = 1 // Reset to first page when changing page size
    fetchDriversData()
}

const handleSearchChange = (newSearch: string) => {
    search.value = newSearch
    currentPage.value = 1 // Reset to first page when searching
    fetchDriversData()
}

const handleStatusFilterChange = (newStatusFilter: string[]) => {
    statusFilter.value = newStatusFilter
    currentPage.value = 1 // Reset to first page when filtering
    fetchDriversData()
}

const handleEdit = (driver: HaulblazeContact) => {
    // Implement edit functionality
    console.log('Edit driver:', driver)
}

onMounted(() => {
    fetchDriversData()
})
</script>