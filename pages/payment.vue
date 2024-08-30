<template>
  <div>
    <FixedCard :otherElementsHeight="100" :footerHeight="50" >
      <template #CardInfo>
        <div class="w-full flex-row items-center justify-between hidden md:flex">
          <h2 class="text-xl flex items-center ml-4 py-2 uppercase">
            <Icon name="ph:bank" class="w-6 h-6 mr-2" />
          Payroll
        </h2>
        </div>
      </template>
      <template #PrimaryAction>
        <div class="relative">
          <!-- Mobile floating button -->
          <Button
            @click="toggleFilterPanel"
            class="md:hidden fixed bottom-16 right-4 z-50 rounded-full"
            size="icon"
          >
            <Icon name="ph:funnel" class="w-5 h-5" />
          </Button>

          <!-- Filter panel (visible on mobile when active, always visible on desktop) -->
          <div
            :class="[
              'transition-all duration-300 ease-in-out',
              'md:static md:opacity-100 md:pointer-events-auto',
              isFilterPanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            ]"
            class="fixed inset-x-0 bottom-30 bg-background border-t border-border p-4 md:p-0 md:border-none z-50 shadow-lg"
          >
            <div class="flex flex-col md:flex-row items-center justify-end py-2 space-y-2 md:space-y-0 md:space-x-6 w-full">
              <!-- Warehouse Switcher -->
              <div class="flex items-center w-full md:w-auto">
                <Button
                  v-for="(wh, index) in ['ALL', ...warehouses]"
                  :key="wh"
                  @click="selectedWarehouse = wh === 'ALL' ? null : wh"
                  :variant="selectedWarehouse === wh || (wh === 'ALL' && selectedWarehouse === null) ? 'default' : 'outline'"
                  size="sm"
                  :class="{
                    'rounded-l-md rounded-r-none': index === 0,
                    'rounded-none': index > 0 && index < warehouses.length,
                    'rounded-r-md rounded-l-none': index === warehouses.length,
                    'border-r-0': index < warehouses.length
                  }"
                >
                  <Icon :name="getWarehouseIcon(wh)" class="w-4 h-4 mr-2" />
                  {{ wh }}
                </Button>
              </div>

              <!-- Status Selector -->
              <div class="flex items-center w-full md:w-auto">
                <Button
                  v-for="(status, index) in ['ALL', ...statuses]"
                  :key="status"
                  @click="selectedStatus = status"
                  :variant="selectedStatus === status ? 'default' : 'outline'"
                  size="sm"
                  :class="{
                    'rounded-l-md rounded-r-none': index === 0,
                    'rounded-none': index > 0 && index < statuses.length,
                    'rounded-r-md rounded-l-none': index === statuses.length,
                    'border-r-0': index < statuses.length
                  }"
                >
                  <Icon :name="getStatusIcon(status)" class="w-4 h-4 mr-2" />
                  {{ String(status).toUpperCase() }}
                </Button>
              </div>

              <!-- Team Selector -->
              <Select v-model="selectedTeam" @update:modelValue="handleTeamChange" :disabled="teamsLoading" class="w-full md:w-40 border-none">
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
      <template #body>
        <div v-if="teamsLoading || loading" class="flex items-center justify-center h-full">
          <Icon name="ph:spinner" class="w-8 h-8 animate-spin" />
        </div>
        <div v-else class="flex flex-col w-full flex-1 p-0 m-0 gap-0">
          <div class="overflow-x-auto">
            <DriverCardList 
              :records="filteredPaymentRecords" 
              :idx="selectedDriverIdx"
              :loading="loading" 
              :error="error"
              @select-driver="(idx) => selectedDriverIdx = idx"
              class="flex flex-nowrap"
            />
          </div>
          <Payroll v-if="selectedDriver" :record="selectedDriver" class="flex-1" />
        </div>
      </template>
      <template #footer>
        <p>Footer</p>
      </template>
    </FixedCard>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useEnums } from '../composables/useEnums'
import { usePayment, type DriverPaymentRecord } from '../composables/usePaymentRecords'
import DriverCardList from '../components/payment/DriverCardList.vue'
import Payroll from '../components/payment/Payroll.vue'

const { getEnumsByType } = useEnums()
const teamsLoading = ref(true)
const teams = ref([])
const selectedTeam = ref<string | null>(null)
const selectedDriver = computed(() => filteredPaymentRecords.value[selectedDriverIdx.value])
const selectedDriverIdx = ref<number>(0)
const { loading, error, paymentRecords, fetchPaymentRecords } = usePayment()

const teamCookie = useCookie('selectedTeam')

// New refs for warehouse and status
const warehouses = ref<string[]>([])
const selectedWarehouse = ref<string | null>(null)
const statuses = ['Pending', 'Hold', 'Paid']
const selectedStatus = ref('ALL')

const isFilterPanelOpen = ref(false)

const toggleFilterPanel = () => {
  isFilterPanelOpen.value = !isFilterPanelOpen.value
}

const loadTeams = async () => {
  teamsLoading.value = true
  teams.value = await getEnumsByType("TEAM_NAME")
  teamsLoading.value = false

  // 选择保存的团队或第一个团队
  const savedTeam = teamCookie.value
  if (savedTeam && teams.value.some(team => String(team.value || team.id) === savedTeam)) {
    selectedTeam.value = savedTeam
  } else if (teams.value.length > 0) {
    selectedTeam.value = String(teams.value[0].value || teams.value[0].id)
  }
}

const handleTeamChange = async (team: string) => {
  selectedDriverIdx.value = 0
  await fetchPaymentRecords(team as any)
  teamCookie.value = team
  updateWarehouses()
}

const updateWarehouses = () => {
  warehouses.value = [...new Set(paymentRecords.value.map(record => record.warehouse))].filter(Boolean)
  selectedWarehouse.value = null // 默认选择 'ALL'
}

const filteredPaymentRecords = computed(() => {
  return paymentRecords.value.filter(record => {
    const warehouseMatch = !selectedWarehouse.value || record.warehouse === selectedWarehouse.value
    const statusMatch = selectedStatus.value === 'ALL' || record.payment_status === selectedStatus.value.toUpperCase()
    return warehouseMatch && statusMatch
  })
})

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'all': return 'ph:bank'
    case 'pending': return 'ph:clock'
    case 'hold': return 'ph:pause-circle'
    case 'paid': return 'ph:check-circle'
    default: return 'ph:question'
  }
}

const getWarehouseIcon = (warehouse: string) => {
  switch (warehouse.toUpperCase()) {
    case 'ALL': return 'ph:buildings'
    case 'SAN': return 'ph:tree-palm' // San Diego
    case 'PHX': return 'ph:sun' // Phoenix
    case 'LAX': return 'ph:film-slate' // Los Angeles
    case 'LAS': return 'ph:cigarette-slash' // Las Vegas
    case 'NYC': return 'ph:cube-transparent' // New York City
    case 'CHI': return 'ph:wind' // Chicago
    case 'HOU': return 'ph:rocket-launch' // Houston
    case 'DAL': return 'ph:cowboy-hat' // Dallas
    case 'MIA': return 'ph:umbrella' // Miami
    case 'SEA': return 'ph:coffee' // Seattle
    default: return 'ph:map-pin-bold'
  }
}

onMounted(() => {
  loadTeams()
})

watch(selectedTeam, (newTeam) => {
  if (newTeam) {
    handleTeamChange(newTeam)
  }
})

watch(paymentRecords, updateWarehouses)

</script>

<style scoped>
.overflow-x-auto {
  -webkit-overflow-scrolling: touch; /* 为 iOS 设备提供平滑滚动 */
}
</style>
