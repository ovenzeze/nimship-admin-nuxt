<template>
    <div class="driver-filter">
        <UForm :state="filters" @submit="applyFilters">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                <UFormGroup label="Warehouse">
                    <USelect v-model="filters.warehouse" :options="warehouseOptions" />
                </UFormGroup>
                <UFormGroup label="Team">
                    <UInput v-model="filters.team_name" />
                </UFormGroup>
                <UFormGroup label="Driver Type">
                    <USelect v-model="filters.driver_type" :options="driverTypeOptions" />
                </UFormGroup>
                <UFormGroup label="Status">
                    <USelect v-model="filters.status" :options="statusOptions" />
                </UFormGroup>
                <UFormGroup label="Employment Status">
                    <USelect v-model="filters.employment_status" :options="employmentStatusOptions" />
                </UFormGroup>
            </div>
            <UButton type="submit" color="primary" class="mt-4">Apply Filters</UButton>
        </UForm>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import type { DriverFilters } from '~/types'

const emit = defineEmits<{
    (e: 'update:filter', filters: DriverFilters): void
}>()

const filters = ref<DriverFilters>({
    warehouse: null,
    team_name: '',
    driver_type: null,
    status: null,
    uid: null,
    employment_status: null,
})

// These options should be fetched from an API or store
const warehouseOptions = ref([])
const driverTypeOptions = ref([])
const statusOptions = ref([])
const employmentStatusOptions = ref([])

const applyFilters = () => {
    emit('update:filter', filters.value)
}
</script>