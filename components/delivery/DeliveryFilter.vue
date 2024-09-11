<template>
    <div class="flex items-center space-x-4">
        <Select v-model="selectedWarehouse" :options="warehouseOptions"
            @update:modelValue="updateFilter('warehouse_id', $event)">
            <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="wh in warehouseOptions" :key="wh.value" :value="wh.value">
                    {{ wh.label }}
                </SelectItem>
            </SelectContent>
        </Select>

        <Select v-model="selectedPayCycle" :options="payCycleOptions"
            @update:modelValue="updateFilter('cycle_start', $event)">
            <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pay Cycle" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="cycle in payCycleOptions" :key="cycle.value" :value="cycle.value">
                    {{ cycle.label }}
                </SelectItem>
            </SelectContent>
        </Select>

        <Select v-model="selectedTeam" :options="teamOptions" @update:modelValue="updateFilter('team', $event)">
            <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="team in teamOptions" :key="team.value" :value="team.value">
                    {{ team.label }}
                </SelectItem>
            </SelectContent>
        </Select>

        <DriverSelector @select="updateFilter('driver_id', $event)" />


        <Button variant="outline" @click="resetFilters" class="place-self-end">
            <Icon name="ph:funnel" class="mr-2" />
            Reset
        </Button>
    </div>
</template>

<script setup lang="ts">
import { useEnums } from '~/composables/useEnums'

const emit = defineEmits(['update:filter'])
const { getEnumsByType } = useEnums()

const selectedWarehouse = ref(null)
const selectedPayCycle = ref(null)
const selectedTeam = ref(null)
const selectedDriver = ref(null)

const warehouseOptions = ref([])
const payCycleOptions = ref([])
const teamOptions = ref([])

const updateFilter = (key: string, value: any) => {
    emit('update:filter', { [key]: value })
}

const resetFilters = () => {
    selectedWarehouse.value = null
    selectedPayCycle.value = null
    selectedTeam.value = null
    selectedDriver.value = null
    emit('update:filter', {
        warehouse_id: null,
        cycle_start: null,
        team: null,
        driver_id: null
    })
}

onMounted(async () => {
    const [warehouses, payCycles, teams] = await Promise.all([
        getEnumsByType("WAREHOUSE_CODE"),
        getEnumsByType("CYCLE"),
        getEnumsByType("TEAM_NAME")
    ])

    warehouseOptions.value = warehouses.map(wh => ({ value: wh.value, label: wh.label }))
    payCycleOptions.value = payCycles.map(cycle => ({ value: cycle.start, label: cycle.cycle }))
    teamOptions.value = teams.map(team => ({ value: team.label, label: team.label }))
})
</script>