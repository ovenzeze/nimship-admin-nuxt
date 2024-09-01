<template>
  <div>
    <FixedCard :otherElementsHeight="{ mobile: 60, desktop: 40 }" :footerHeight="{ mobile: 0, desktop: 40 }"
      :headerHeight="{ mobile: 10, desktop: 50 }">
      <template #CardInfo>
        <div class="w-full flex-row items-center justify-between hidden md:flex">
          <h2 class="text-xl flex items-center ml-4 py-2 uppercase">
            <Icon name="ph:bank" class="w-6 h-6 mr-2" />
            Payroll
          </h2>
        </div>
      </template>

      <template #PrimaryAction>
        <div class="relative md:mr-4">
          <FilterOptions :warehouses="warehouses" :teams="teams" :teamsLoading="teamsLoading"
            :is-open="isFilterPanelOpen" @update:is-open="(isOpen) => isFilterPanelOpen = isOpen"
            @update:filter="handleFilterChange" @update:team="handleTeamChange" />
        </div>
      </template>
      <template #body>
        <div v-if="loading" class="flex-1 flex items-center justify-center">
          <Icon name="ph:spinner" class="w-8 h-8 animate-spin" />
        </div>
        <div v-else class="flex-1 flex flex-col items-start justify-center">
          <div class="w-full overflow-auto">
            <DriverCardList :records="filteredPaymentRecords" :idx="selectedIdx"
              @select-driver="(idx: number) => (selectedIdx = idx)" />
          </div>
          <div class="flex-1 w-full">
            <div v-if="selectedDriver" class="flex flex-col md:flex-row max-h-full">
              <div class="max-w-full md:flex-1 md:grid md:grid-rows-4 overflow-auto">
                <DriverInfo :record="selectedDriver" />
                <PayrollDetails :record="selectedDriver" />
                <BankInfo :record="selectedDriver" />
                <PaymentStatus :record="selectedDriver" />
              </div>
              <div class="h-full w-full md:w-[300px]">
                <PaymentPanel :record="selectedDriver" :is-open="isPaymentPanelOpen"
                  @update:is-open="(isOpen: boolean) => (isPaymentPanelOpen = isOpen)"
                  @close="handlePaymentPanelClose" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </FixedCard>
    <Button @click="toggleFilterPanel" class="md:hidden fixed bottom-16 right-4 z-40 rounded-full bg-foreground"
      size="icon">
      <Icon name="ph:funnel" class="w-5 h-5 text-background" />
    </Button>
    <Button v-if="isMobile && selectedDriver" @click="isPaymentPanelOpen = true"
      class="fixed bottom-4 right-4 z-40 rounded-full bg-foreground" size="icon">
      <Icon name="ph:open-ai-logo" class="w-5 h-5 text-background" />
    </Button>
  </div>
</template>


<script lang="ts" setup>
import { useEnums } from "../composables/useEnums";
import { usePayment } from "../composables/usePaymentRecords";
import DriverInfo from '~/components/payment/DriverInfo.vue';
import PayrollDetails from '~/components/payment/PayrollDetails.vue';
import BankInfo from '~/components/payment/BankInfo.vue';
import PaymentStatus from '~/components/payment/PaymentStatus.vue';
import PaymentPanel from '~/components/payment/PaymentPanel.vue';

const { getEnumsByType } = useEnums();
const teamsLoading = ref(true);
const teams = ref([]);
const { isMobile } = useDevice(); // 使用自定义的 useDevice

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

const selectedDriver = computed(() =>
  filteredPaymentRecords.value.length > 0
    ? getReadablePaymentRecord(filteredPaymentRecords.value[selectedIdx.value])
    : null
);
const selectedIdx = ref<number>(0);
const { loading, error, paymentRecords, fetchPaymentRecords } = usePayment();

const teamCookie = useCookie("selectedTeam");
const warehouses = ref<string[]>([]);
const filterOptions = ref({ warehouse: null, status: "ALL", team: null });

const isFilterPanelOpen = ref(false);
const isPaymentPanelOpen = ref(false);

const toggleFilterPanel = () => {
  isFilterPanelOpen.value = !isFilterPanelOpen.value;
};

const handlePaymentPanelClose = () => {
  isPaymentPanelOpen.value = false;
  // 可以在这里添加其他需要在面板关闭时执行的逻辑
};

const loadTeams = async () => {
  teamsLoading.value = true;
  teams.value = await getEnumsByType("TEAM_NAME");
  teamsLoading.value = false;

  // 选择保存的团队或第一个团队
  const savedTeam = teamCookie.value;
  console.log("savedTeam", savedTeam);
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
) => {

  filterOptions.value.warehouse = warehouse;
  filterOptions.value.status = status;
};

const handleTeamChange = async (team: string) => {
  loading.value = true;
  await fetchPaymentRecords(team as any);
  loading.value = false;
  selectedIdx.value = 0;
  updateWarehouses();
};

onMounted(async () => {
  await loadTeams();
  await fetchPaymentRecords(filterOptions.value.team);
  updateWarehouses();
});

</script>
