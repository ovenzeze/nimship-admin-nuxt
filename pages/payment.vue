<template>
  <div class="h-full w-full overflow-hidden">
    <FixedCard :otherElementsHeight="{ mobile: 60, desktop: 40 }" :footerHeight="{ mobile: 0, desktop: 0 }"
      :headerHeight="{ mobile: 40, desktop: 70 }" :showBlur="showBlur">
      <template #CardInfo>
        <div class="w-full flex-row items-center justify-between flex">
          <h2 class="text-sm md:text-base flex items-center justify-center ml-4 uppercase">
            <Icon name="ph:bank" class="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Payroll
          </h2>
        </div>
      </template>

      <template #PrimaryAction>
        <div class="relative md:mr-4">
          <FilterOptions :warehouses="warehouses" :teams="teams" :selected-cycle="selectedCycle"
            :teamsLoading="teamsLoading" :is-open="isFilterPanelOpen"
            @update:is-open="(isOpen) => isFilterPanelOpen = isOpen" @update:filter="handleFilterChange"
            @update:team="handleTeamChange" />
        </div>
      </template>
      <template #body>
        <div v-if="loading" class="flex-1 h-full flex items-center justify-center">
          <Icon name="ph:spinner" class="w-8 h-8 animate-spin" />
        </div>
        <div v-else class="flex-1 flex flex-col h-full overflow-hidden">
          <div class="w-full overflow-auto flex-shrink-0">
            <DriverCardList :records="filterRecords" :idx="selectedIdx"
              @select-driver="(idx: number) => (selectedIdx = idx)" />
          </div>
          <div class="flex-1 w-full overflow-hidden">
            <div v-if="selectedDriver" class="flex flex-col md:flex-row h-full">
              <div
                class="flex-1 overflow-y-auto overscroll-none scroll-smooth md:grid md:grid-rows-4 box-border mt-4 mr-4 border border-border rounded-lg divide-y">
                <DriverInfo :record="selectedDriver" />
                <PayrollDetails :record="selectedDriver" />
                <BankInfo :record="selectedDriver" />
                <PaymentStatus :record="selectedDriver" />
                <!-- </div> -->
              </div>
              <div class="w-full md:w-[380px] min-w-[280px] flex pt-4">
                <PaymentPanel :record="selectedDriver" :is-open="isPaymentPanelOpen"
                  @update:is-open="(isOpen: boolean) => (isPaymentPanelOpen = isOpen)"
                  @close="handlePaymentPanelClose" />
              </div>
            </div>
            <div v-else class="flex-1 flex flex-col h-full justify-center items-center gap-8">
              <Icon name="ph:empty" class="w-20 h-20 text-foreground/10 " />
              <p class="text-sm md:text-base text-foreground/50">Ops! No Record For Selected Filter</p>
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
import { usePayment } from "../composables/usePayroll";
import DriverInfo from '~/components/payment/DriverInfo.vue';
import PayrollDetails from '~/components/payment/PayrollDetails.vue';
import BankInfo from '~/components/payment/BankInfo.vue';
import PaymentStatus from '~/components/payment/PaymentStatus.vue';
import PaymentPanel from '~/components/payment/PaymentPanel.vue';

const { getEnumsByType } = useEnums();
const { loading, error, paymentRecords, fetchPaymentRecords } = usePayment();
const { isMobile } = useDevice();
const teamsLoading = ref(true);
const teams = ref([]);

const filterOptions = ref({ warehouse: null, status: "all", team: null, cycle: null });

const filterRecords = computed(() => {
  console.log('Filter options:', filterOptions.value); // 移到外部以减少日志输出

  return paymentRecords.value.filter((record) => {
    const r = getReadablePaymentRecord(record);
    const warehouse = String(filterOptions.value.warehouse || "ALL").toUpperCase();
    const status = String(filterOptions.value.status || "ALL").toUpperCase();

    const warehouseMatch = warehouse === "ALL" || String(r.warehouse).toUpperCase() === String(warehouse).toUpperCase();
    const statusMatch = status === "ALL" || String(r.payment_status?.status).toUpperCase() === String(status).toUpperCase();

    return warehouseMatch && statusMatch;
  });
});

const selectedDriver = computed(() => filterRecords.value.length > 0 ? getReadablePaymentRecord(filterRecords.value[selectedIdx.value]) : null);
const selectedCycle = computed(() => filterRecords.value.length > 0 ? getReadablePaymentRecord(filterRecords.value[selectedIdx.value]).cycle_start + " - " + getReadablePaymentRecord(filterRecords.value[selectedIdx.value]).cycle_end : null);
const selectedIdx = ref<number>(0);
const warehouses = ref<string[]>([]);

const isFilterPanelOpen = ref(false);
const isPaymentPanelOpen = ref(false);

const showBlur = computed(() => isFilterPanelOpen.value || isPaymentPanelOpen.value);
const toggleFilterPanel = () => isFilterPanelOpen.value = !isFilterPanelOpen.value;

const handlePaymentPanelClose = () => isPaymentPanelOpen.value = false;

const updateWarehouses = () => {
  warehouses.value = [
    ...new Set(paymentRecords.value.map((record) => record.warehouse)),
  ].filter(Boolean);
  filterOptions.value.warehouse = "ALL"; // 默认选择 'ALL'
};

const handleFilterChange = ({ warehouse, status }: { warehouse: string, status: string }) => {
  console.log("handleFilterChange", warehouse, status);
  filterOptions.value = {
    ...filterOptions.value,
    warehouse: warehouse,
    status: status // 确保状态是小写的
  };
};

const handleTeamChange = async (team: string) => {
  loading.value = true;
  await fetchPaymentRecords(team as any);
  loading.value = false;
  selectedIdx.value = 0;
  updateWarehouses();
};

</script>
