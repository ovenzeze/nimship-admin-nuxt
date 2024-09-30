<template>
  <!-- ... (保持模板部分不变) ... -->
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useEnums } from "../composables/useEnums";
import { usePayment } from "../composables/usePayroll";
import { usePaymentFilters } from "../composables/usePaymentFilters";
import { useDevice } from '#imports';
import DriverInfo from '~/components/payment/DriverInfo.vue';
import PayrollDetails from '~/components/payment/PayrollDetails.vue';
import BankInfo from '~/components/payment/BankInfo.vue';
import PaymentStatus from '~/components/payment/PaymentStatus.vue';
import PaymentPanel from '~/components/payment/PaymentPanel.vue';
import type { FilterOptions, TeamName } from "~/types";
import type { FetchPaymentRecordsOptions, FetchPayRecord, PaymentStatusItem, Warehouse } from "~/types/payment";

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

const selectedCycle = computed(() => filterOptions.value.cycle || null);
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
} = usePaymentFilters(warehousesRef);

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
