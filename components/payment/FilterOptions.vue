<template>
  <!-- Filter panel (visible on mobile when active, always visible on desktop) -->
  <div>
    <div class="flex flex-col md:flex-row items-center justify-end py-2 space-y-10 md:space-y-0 md:space-x-6 w-full">
      <!-- Warehouse Switcher -->
      <div class="w-full md:w-auto">
        <ButtonSwitcher v-model="selectedWarehouse" :options="warehouseOptions" />
      </div>

      <!-- Status Selector -->
      <div class="w-full md:w-auto">
        <ButtonSwitcher v-model="selectedStatus" :options="statusOptions" />
      </div>

      <div class="flex items-center w-full md:w-auto">
        <!-- Team Selector -->
        <Select v-model="selectedTeam" :disabled="props.teamsLoading" class="border-none w-full md:w-36">
          <SelectTrigger class="w-full md:w-36">
            <SelectValue :placeholder="teamsLoading ? 'Loading...' : 'Select Team'" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="team in teamsOptions" :key="team" :value="team" class="w-fyll md:w-36">
              {{ team }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import ButtonSwitcher from '../ButtonSwitcher.vue';
import { useEnums } from '~/composables/useEnums';

const { getEnumsByType } = useEnums();
const teamCookie = useCookie("selectedTeam");

const props = defineProps<{ warehouses: string[] }>();

const emit = defineEmits(['updateFilter', 'updateTeam']);

const selectedWarehouse = ref<string>('ALL');
const selectedStatus = ref<string>('ALL');
const selectedTeam = ref<string | null>(null);
const teamsLoading = ref<boolean>(false);
const teamsOptions = ref<string[]>([]);

watch([selectedWarehouse, selectedStatus], () => {
  emit('updateFilter', {
    warehouse: selectedWarehouse.value,
    status: selectedStatus.value,
  });
});

watch(selectedTeam, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('updateTeam', newVal);
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


onMounted(async () => await loadTeams());

const loadTeams = async () => {
  teamsLoading.value = true;
  const teams = await getEnumsByType("TEAM_NAME");
  teamsOptions.value = teams.map(team => String(team.label));
  console.log("teamsOptions", teamsOptions.value);
  teamsLoading.value = false;

  // 选择保存的团队或第一个团队
  const savedTeam = teamCookie.value;
  console.log("savedTeam", savedTeam);
  if (
    savedTeam &&
    teamsOptions.value.some((team) => String(team) === savedTeam)
  ) {
    selectedTeam.value = savedTeam;
  } else if (teamsOptions.value.length > 0) {
    selectedTeam.value = String(teamsOptions.value[0]);
  }
  console.log("selectedTeam", selectedTeam.value);
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
</script>