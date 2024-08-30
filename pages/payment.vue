<template>
  <div>
    <FixedCard :otherElementsHeight="30" :footerHeight="0" :headerHeight="60">
      <template #CardInfo>
        <div
          class="w-full flex-row items-center justify-between hidden md:flex"
        >
          <h2 class="text-xl flex items-center ml-4 py-2 uppercase">
            <Icon name="ph:bank" class="w-6 h-6 mr-2" />
            Payroll
          </h2>
        </div>
      </template>
      <template #PrimaryAction>
        <div class="relative md:mr-4">
          <Button
            @click="toggleFilterPanel"
            class="md:hidden fixed bottom-16 right-4 z-50 rounded-full"
            size="icon"
          >
            <Icon name="ph:funnel" class="w-5 h-5" />
          </Button>
              <FilterOptions
                v-if="width > 768"
                :warehouses="warehouses"
                :teams="teams"
                :teamsLoading="teamsLoading"
                @updateFilter="handleFilterChange"
              />
          <Dialog v-model:open="isFilterPanelOpen" v-if="width < 768">
            <DialogContent class="sm:max-w-[425px]">
              <FilterOptions
                v-if="width < 768"
                :warehouses="warehouses"
                :teams="teams"
                :teamsLoading="teamsLoading"
                @updateFilter="handleFilterChange"
              />
            </DialogContent>
          </Dialog>
        </div>
      </template>
      <template #body>
        <div
          v-if="teamsLoading || loading"
          class="flex-1 flex items-center justify-center h-full"
        >
          <Icon name="ph:spinner" class="w-8 h-8 animate-spin" />
        </div>
        <div v-else class="flex flex-col w-full flex-1 p-0 m-0 gap-0">
          <Payroll
            v-if="selectedDriver"
            :record="selectedDriver"
            class="flex-1"
          />
                      <DriverCardList
              :records="filteredPaymentRecords"
              :idx="selectedIdx"
              :loading="loading"
              :error="error"
              @select-driver="(idx) => (selectedIdx = idx)"
            class="flex flex-nowrap"
          />
        </div>
      </template>
      <template #footer>
        <p>Footer</p>
      </template>
    </FixedCard>
  </div>
</template>

<script lang="ts" setup>
import { useEnums } from "../composables/useEnums";
import {
  usePayment,
} from "../composables/usePaymentRecords";
import DriverCardList from "../components/payment/DriverCardList.vue";
import Payroll from "../components/payment/Payroll.vue";
import FilterOptions from "../components/payment/FilterOptions.vue";
import { useWindowSize } from "@vueuse/core";

const { getEnumsByType } = useEnums();
const teamsLoading = ref(true);
const teams = ref([]);
const { width } = useWindowSize()


const filteredPaymentRecords = computed(() => {
  return paymentRecords.value;
  // const { warehouse, status } = filterOptions.value;
  // return paymentRecords.value.filter((record) => {
  //   const warehouseMatch = !warehouse || record.warehouse === warehouse;
  //   const statusMatch =
  //     status === "ALL" || record.payment_status === status.toUpperCase();
  //   return warehouseMatch && statusMatch;
  // });
});

const selectedDriver = computed(
  () => filteredPaymentRecords.value.length > 0 ? filteredPaymentRecords.value[selectedIdx.value] : null
);
const selectedIdx = ref<number>(0);
const { loading, error, paymentRecords, fetchPaymentRecords } = usePayment();

const teamCookie = useCookie("selectedTeam");
const warehouses = ref<string[]>([]);
const filterOptions = ref({ warehouse: null, status: "ALL", team: null });

const isFilterPanelOpen = ref(false);


const toggleFilterPanel = () => {
  isFilterPanelOpen.value = !isFilterPanelOpen.value;
};

const loadTeams = async () => {
  teamsLoading.value = true;
  teams.value = await getEnumsByType("TEAM_NAME");
  teamsLoading.value = false;

  // 选择保存的团队或第一个团队
  const savedTeam = teamCookie.value;
  console.log('savedTeam', savedTeam)
  if (
    savedTeam &&
    teams.value.some((team) => String(team.value || team.id) === savedTeam)
  ) {
    filterOptions.value.team = savedTeam;
  } else if (teams.value.length > 0) {
    filterOptions.value.team = String(teams.value[0].value);
  }
};

const updateWarehouses = () => {
  warehouses.value = [
    ...new Set(paymentRecords.value.map((record) => record.warehouse)),
  ].filter(Boolean);
  filterOptions.value.warehouse = "ALL"; // 默认选择 'ALL'
};

const handleFilterChange = async (
  warehouse: string,
  status: string,
  team: string
) => {
  if (team !== filterOptions.value.team) {
    selectedIdx.value = 0;
    filterOptions.value.team = team;
    await fetchPaymentRecords(team as any);
    teamCookie.value = team;
    updateWarehouses();
  } else {
    filterOptions.value.warehouse = warehouse;
    filterOptions.value.status = status;
  }
};

onMounted(async () => {
  await loadTeams();
  await fetchPaymentRecords(filterOptions.value.team);
});

watch(paymentRecords, (newVal, oldVal) => {
  if (newVal.length !== oldVal.length) updateWarehouses();
});

</script>

<style scoped>
</style>
