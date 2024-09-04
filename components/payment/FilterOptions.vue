<template>
  <div class="bg-background rounded-xl transition-all duration-300 ease-in-out" :class="{
    'translate-x-full opacity-0': !isOpen && isMobile,
    'fixed inset-y-0 right-0 top-[60svh] h-[40svh] w-full backdrop-blur-sm z-50  border-blue-500/50 rounded-t-xl': isMobile,
    'translate-x-0 opacity-100': isMobile && isOpen
  }">
    <div class="flex items-center justify-between p-4 border-b" v-if="isMobile">
      <h2 class="text-lg font-semibold">Filter Options</h2>
      <Button variant="ghost" size="icon" @click="close">
        <Icon name="ph:x" class="w-5 h-5" />
      </Button>
    </div>
    <div class="p-4 md:p-0">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between flex-nowrap space-y-4 md:space-y-0 md:space-x-4">

        <ButtonSwitcher :model-value="selectedWarehouse" :options="warehouseOptions" @update:value="updateWarehouse" />
        <ButtonSwitcher :model-value="selectedStatus" :options="statusOptions" @update:value="updateStatus" />

        <Select v-model="selectedCycle" :disabled="teamsLoading" class="w-full">
          <SelectTrigger class="md:min-w-48">
            <SelectValue :placeholder="teamsLoading ? 'Loading...' : 'Select Cycle'">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="cycle in cyclesOptions" :value="cycle.cycle">
              {{ cycle.cycle }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedTeam" :disabled="teamsLoading" class="w-full">
          <SelectTrigger class="md:min-w-32">
            <SelectValue :placeholder="teamsLoading ? 'Loading...' : 'Select Team'">
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="team in teamsOptions" :value="team">
              {{ team }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEnums } from '~/composables/useEnums';
import { useDevice } from '~/composables/useDevice';

const props = defineProps<{
  warehouses: string[];
  isOpen: boolean;
  selectedCycle: string | null;
}>();

const emit = defineEmits(['update:filter', 'update:team', 'update:is-open']);

const { isMobile } = useDevice();
const { getEnumsByType } = useEnums();
const teamCookie = useCookie("selectedTeam");

const selectedWarehouse = ref<string>('ALL');
const selectedStatus = ref<string>('ALL');
const selectedTeam = ref<string | null>(null);
const selectedCycle = computed(() => props.selectedCycle);

const teamsLoading = ref<boolean>(false);
const teamsOptions = ref<string[]>([]);
const cyclesOptions = ref<{ cycle: string; start: string; end: string }[]>([]);

watch([selectedWarehouse, selectedStatus], () => {
  emit('update:filter', {
    warehouse: selectedWarehouse.value,
    status: selectedStatus.value,
  });
});

watch(selectedTeam, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('update:team', newVal);
    teamCookie.value = newVal;
  }
});

const warehouseOptions = computed(() => [
  { value: 'ALL', label: 'ALL', icon: getWarehouseIcon('ALL') },
  ...props.warehouses.map(wh => ({ value: wh, label: wh, icon: getWarehouseIcon(wh) }))
]);

const statusOptions = computed(() => [
  'ALL', 'PENDING', 'HOLD', 'PAID'
].map(status => ({ value: status, label: status.toUpperCase(), icon: getStatusIcon(status) })));

onMounted(async () => { await Promise.all([loadTeams(), loadCycle()]); });

const updateWarehouse = (value: string) => selectedWarehouse.value = value;

const updateStatus = (value: string) => selectedStatus.value = value;

const loadTeams = async () => {
  teamsLoading.value = true;
  const teams = await getEnumsByType("TEAM_NAME");
  teamsOptions.value = teams.map(team => String(team.label));
  teamsLoading.value = false;

  const savedTeam = teamCookie.value;
  if (savedTeam && teamsOptions.value.includes(savedTeam)) {
    selectedTeam.value = savedTeam;
  } else if (teamsOptions.value.length > 0) {
    selectedTeam.value = String(teamsOptions.value[0]);
  }
};

const loadCycle = async () => {
  const cycles = await getEnumsByType("CYCLE");
  console.log('cycles', cycles);
  cyclesOptions.value = cycles;
};

const getStatusIcon = (status: string) => {
  switch (status.toUpperCase()) {
    case "ALL": return "ph:bank";
    case "PENDING": return "ph:clock";
    case "HOLD": return "ph:pause-circle";
    case "PAID": return "ph:check-circle";
    default: return "ph:question";
  }
};

const getWarehouseIcon = (warehouse: string) => {
  switch (warehouse.toUpperCase()) {
    case "ALL": return "ph:buildings";
    case "SAN": return "ph:tree-palm";
    case "PHX": return "ph:sun";
    case "LAX": return "ph:film-slate";
    case "LAS": return "ph:cigarette-slash";
    case "NYC": return "ph:cube-transparent";
    case "CHI": return "ph:wind";
    case "HOU": return "ph:rocket-launch";
    case "DAL": return "ph:cowboy-hat";
    case "MIA": return "ph:umbrella";
    case "SEA": return "ph:coffee";
    default: return "ph:map-pin-bold";
  }
};

const close = () => {
  emit('update:is-open', false);
};

</script>