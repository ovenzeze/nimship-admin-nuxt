<template>
  <div class="h-full w-full overflow-hidden bg-background">
    <FixedCard :otherElementsHeight="{ mobile: 60, desktop: 40 }" :footerHeight="{ mobile: 0, desktop: 0 }"
      :headerHeight="{ mobile: 40, desktop: 70 }" :showBlur="showBlur">
      <template #CardInfo>
        <div class="w-full flex-row items-center justify-between flex">
          <h2 class="text-sm md:text-base flex items-center justify-center ml-4 uppercase">
            <Icon name="ph:bank" class="w-4 h-4 md:w-5 md:h-5 mr-2" />
            {{ selectedCycle }}
            Payroll
          </h2>
        </div>
      </template>

      <template #PrimaryAction>
        <div class="relative md:mr-4">
          <FilterOptions :warehouses="warehousesRef" :selected-cycle="selectedCycle" :is-open="isFilterPanelOpen"
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
import { ref, computed, onMounted, watch } from 'vue';
import { useEnums } from "../composables/useEnums";
import { usePayment } from "../composables/usePayroll";
import { usePaymentFilters } from "../composables/usePaymentFilters";
import DriverInfo from '~/components/payment/DriverInfo.vue';
import PayrollDetails from '~/components/payment/PayrollDetails.vue';
import BankInfo from '~/components/payment/BankInfo.vue';
import PaymentStatus from '~/components/payment/PaymentStatus.vue';
import PaymentPanel from '~/components/payment/PaymentPanel.vue';
import type { FilterOptions, TeamName } from "~/types";
import type { FetchPaymentRecordsOptions, FetchPayRecord, PaymentStatusItem, Warehouse } from "~/types/payment";
import { useDevice } from '~/composables/useDevice';

const { getEnumsByType } = useEnums();
const { loading, error, paymentRecords, fetchPaymentRecords } = usePayment();
const { isMobile } = useDevice();

const filterOptions = ref<FilterOptions>({
  warehouse: 'ALL',
  status: 'ALL',
  cycle: undefined
});

const filterRecords = computed(() => paymentRecords.value);

const selectedDriver = computed(() => {
  if (filterRecords.value.length > 0 && selectedIdx.value < filterRecords.value.length) {
    return filterRecords.value[selectedIdx.value];
  }
  return null;
});

const selectedCycle = computed(() => filterOptions.value.cycle);
const selectedIdx = ref<number>(0);
const warehousesRef = ref<Warehouse[]>(['ALL']);

const isFilterPanelOpen = ref(false);
const isPaymentPanelOpen = ref(false);

const showBlur = computed(() => isFilterPanelOpen.value || isPaymentPanelOpen.value);
const toggleFilterPanel = () => isFilterPanelOpen.value = !isFilterPanelOpen.value;

const handlePaymentPanelClose = () => isPaymentPanelOpen.value = false;

const updateWarehouses = () => {
  const uniqueWarehouses = ['ALL', ...new Set(paymentRecords.value.map((record) => record.warehouse))];
  warehousesRef.value = uniqueWarehouses.filter(Boolean) as Warehouse[];
  console.log('Updated warehouses:', warehousesRef.value);
};

const {
  selectedWarehouse,
  selectedStatus,
  selectedTeam,
  warehouseOptions,
  statusOptions,
  updateWarehouse,
  updateStatus,
  initializeFilters,
  currentFilters,
} = usePaymentFilters(warehousesRef.value);

const handleFilterChange = async (newFilters: FilterOptions) => {
  console.log('Filter changed:', newFilters);
  filterOptions.value = { ...newFilters };
  try {
    await fetchPaymentRecords({
      warehouse: newFilters.warehouse !== 'ALL' ? newFilters.warehouse as Exclude<Warehouse, 'ALL'> : undefined,
      status: newFilters.status !== 'ALL' ? [newFilters.status] as PaymentStatusItem[] : undefined,
      cycle_start: newFilters.cycle
    });
  } catch (err) {
    console.error('Error fetching payment records:', err);
  }
};

const handleTeamChange = async (team: TeamName | null) => {
  console.log('Team changed:', team);
  if (team) {
    try {
      await fetchPaymentRecords({ team });
      selectedIdx.value = 0;
      updateWarehouses();
    } catch (err) {
      console.error('Error fetching payment records:', err);
    }
  }
};

onMounted(async () => {
  console.log('Component mounted, fetching initial data');
  try {
    await fetchPaymentRecords();
    updateWarehouses();
    await initializeFilters();
  } catch (err) {
    console.error('Error fetching initial payment records:', err);
  }
});

watch(filterRecords, (newFilteredRecords) => {
  console.log('filterRecords updated:', newFilteredRecords.length);
  if (newFilteredRecords.length === 0) {
    selectedIdx.value = 0;
  } else if (selectedIdx.value >= newFilteredRecords.length) {
    selectedIdx.value = newFilteredRecords.length - 1;
  }
});

watch(warehousesRef, (newWarehouses) => {
  console.log('warehouses updated:', newWarehouses);
});
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
