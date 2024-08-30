<template>
          <!-- Filter panel (visible on mobile when active, always visible on desktop) -->
          <div>
            <div class="flex flex-col md:flex-row items-center justify-end py-2 space-y-2 md:space-y-0 md:space-x-6 w-full">
              <!-- Warehouse Switcher -->
              <div class="flex items-center w-full md:w-auto">
                <Button
                  v-for="(wh, index) in warehouseOptions"
                  :key="wh"
                  @click="selectedWarehouse = wh"
                  :variant="selectedWarehouse === wh || (wh === 'ALL' && selectedWarehouse === null) ? 'default' : 'outline'"
                  size="sm"
                  :class="{
                    'rounded-l-md rounded-r-none': index === 0,
                    'rounded-none': index > 0 && index < warehouseOptions.length - 1,
                    'rounded-r-md rounded-l-none': index === warehouseOptions.length - 1,
                    'border-r-0': index < warehouseOptions.length - 1
                  }"
                >
                  <Icon :name="getWarehouseIcon(wh)" class="w-4 h-4 mr-2" />
                  {{ wh }}
                </Button>
              </div>

              <!-- Status Selector -->
              <div class="flex items-center w-full md:w-auto">
                <Button
                  v-for="(status, index) in statusOptions"
                  :key="status"
                  @click="selectedStatus = status"
                  :variant="selectedStatus === status ? 'default' : 'outline'"
                  size="sm"
                  :class="{
                    'rounded-l-md rounded-r-none': index === 0,
                    'rounded-none': index > 0 && index < statusOptions.length - 1,
                    'rounded-r-md rounded-l-none': index === statusOptions.length - 1,
                    'border-r-0': index < statusOptions.length - 1
                  }"
                >
                  <Icon :name="getStatusIcon(status)" class="w-4 h-4 mr-2" />
                  {{ String(status).toUpperCase() }}
                </Button>
              </div>

              <div class="flex items-center w-full md:w-auto">
                <!-- Team Selector -->
                <Select v-model="selectedTeam" :disabled="teamsLoading" class=" border-none">
                <SelectTrigger>
                  <SelectValue :placeholder="teamsLoading ? 'Loading...' : 'Select Team'" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="team in teams"
                    :key="team.id"
                    :value="String(team.value || team.id)"
                  >
                    {{ team.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>
          </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { PaymentStatus, paymentStatusMap } from '~/utils/driver'

const props = defineProps<{
  warehouses: string[]
  teams: { id: string; label: string; value: string }[]
  teamsLoading: boolean
}>()


const emits = defineEmits(['updateFilter'])

const warehouseOptions = computed(() => ['ALL', ...props.warehouses])
const statusOptions = computed(() => ['ALL', 'PENDING', 'HOLD', 'PAID'])

const selectedWarehouse = ref<string | null>('ALL')
const selectedStatus = ref<string>('ALL')
const selectedTeam = ref<string>('')


const getStatusIcon = (status: string) => {
  switch (status.toUpperCase()) {
    case "ALL":
      return "ph:bank";
    case "PENDING":
      return "ph:clock";
    case "HOLD":
      return "ph:pause-circle";
    case "PAID":
      return "ph:check-circle";
    default:
      return "ph:question";
  }
};

const getWarehouseIcon = (warehouse: string) => {
  switch (warehouse.toUpperCase()) {
    case "ALL":
      return "ph:buildings";
    case "SAN":
      return "ph:tree-palm"; // San Diego
    case "PHX":
      return "ph:sun"; // Phoenix
    case "LAX":
      return "ph:film-slate"; // Los Angeles
    case "LAS":
      return "ph:cigarette-slash"; // Las Vegas
    case "NYC":
      return "ph:cube-transparent"; // New York City
    case "CHI":
      return "ph:wind"; // Chicago
    case "HOU":
      return "ph:rocket-launch"; // Houston
    case "DAL":
      return "ph:cowboy-hat"; // Dallas
    case "MIA":
      return "ph:umbrella"; // Miami
    case "SEA":
      return "ph:coffee"; // Seattle
    default:
      return "ph:map-pin-bold";
  }
}
</script>

<style>

</style>