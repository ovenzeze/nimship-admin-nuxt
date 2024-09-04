<template>
    <div class="relative">
        <Button @click="toggleFilterPanel" variant="outline" size="sm" class="md:hidden">
            <Icon name="ph:funnel" class="w-4 h-4 mr-2" />
            Filter
        </Button>
        <div class="bg-background rounded-xl transition-all duration-300 ease-in-out" :class="{
            'fixed inset-y-0 right-0 top-[60svh] h-[40svh] w-full backdrop-blur-sm z-50 border-blue-500/50 rounded-t-xl': isMobile,
            'translate-x-full opacity-0': !isOpen && isMobile,
            'translate-x-0 opacity-100': isMobile && isOpen,
            'relative': !isMobile
        }">
            <div class="flex items-center justify-between p-4 border-b md:hidden">
                <h2 class="text-lg font-semibold">Filter Options</h2>
                <Button variant="ghost" size="icon" @click="toggleFilterPanel">
                    <Icon name="ph:x" class="w-5 h-5" />
                </Button>
            </div>
            <div class="p-4 md:p-0">
                <div
                    class="flex flex-col md:flex-row md:items-center md:justify-between flex-nowrap space-y-4 md:space-y-0 md:space-x-4">
                    <Select v-model="selectedWarehouse" :options="warehouseOptions" class="w-full md:w-auto">
                        <SelectTrigger class="md:min-w-32">
                            <SelectValue placeholder="Warehouse" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="wh in warehouseOptions" :key="wh.value" :value="wh.value">
                                {{ wh.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>


                    <Select v-model="selectedPayCycle" :options="payCycleOptions" class="w-full md:w-auto">
                        <SelectTrigger class="md:min-w-32">
                            <SelectValue placeholder="Pay Cycle" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="cycle in payCycleOptions" :key="cycle.value" :value="cycle.value">
                                {{ cycle.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Select v-model="selectedTeam" :options="teamOptions" class="w-full md:w-auto">
                        <SelectTrigger class="md:min-w-32">
                            <SelectValue placeholder="Team" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="team in teamOptions" :key="team.value" :value="team.value">
                                {{ team.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <DriverSelector v-model="selectedDriver" />


                    <DateRangePicker v-model="dateRange" />
                </div>
            </div>
        </div>
        <div v-if="isOpen && isMobile" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleFilterPanel">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useDevice } from '~/composables/useDevice'
import { useEnums } from '~/composables/useEnums'

const emit = defineEmits(['update:filter'])
const { isMobile } = useDevice()
const { getEnumsByType } = useEnums()

const isOpen = ref(false)
const selectedWarehouse = ref(null)
const selectedStatus = ref('ALL')
const selectedPayCycle = ref(null)
const selectedTeam = ref(null)
const selectedDriver = ref(null)
const dateRange = ref(null)
const searchQuery = ref('')

const warehouseOptions = ref([])
const payCycleOptions = ref([])
const teamOptions = ref([])


watch([selectedWarehouse, selectedStatus, selectedPayCycle, selectedTeam, selectedDriver, dateRange, searchQuery], () => {
    applyFilters()
})

const toggleFilterPanel = () => {
    if (isMobile.value) {
        isOpen.value = !isOpen.value
    }
}

const updateStatus = (value: string) => selectedStatus.value = value

const applyFilters = () => {
    emit('update:filter', {
        warehouse: selectedWarehouse.value,
        status: selectedStatus.value,
        payCycle: selectedPayCycle.value,
        team: selectedTeam.value,
        driver: selectedDriver.value,
        dateRange: dateRange.value,
        searchQuery: searchQuery.value
    })
    if (isMobile.value) {
        isOpen.value = false
    }
}

onMounted(async () => {
    await Promise.all([
        loadWarehouses(),
        loadPayCycles(),
        loadTeams()
    ])
})

const loadWarehouses = async () => {
    const warehouses = await getEnumsByType("WAREHOUSE_CODE")
    warehouseOptions.value = warehouses.map(wh => ({ value: wh.value, label: wh.label }))
}

const loadPayCycles = async () => {
    const payCycles = await getEnumsByType("CYCLE")
    payCycleOptions.value = payCycles.map(cycle => ({ value: cycle.cycle, label: cycle.cycle }))
}

const loadTeams = async () => {
    const teams = await getEnumsByType("TEAM_NAME")
    teamOptions.value = teams.map(team => ({ value: team.value, label: team.label }))
}

const getStatusIcon = (status: string) => {
    // 实现状态图标逻辑
}
</script>