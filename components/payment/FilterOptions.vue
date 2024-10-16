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
        <ButtonSwitcher :model-value="selectedStatus" :options="statusOptions"
          @update:value="(value: PaymentStatusItem) => updateStatus(value)" />

        <Select v-model="selectedCycle" :disabled="teamsLoading" class="w-full">
          <SelectTrigger class="md:min-w-48">
            <SelectValue :placeholder="teamsLoading ? 'Loading...' : 'Select Cycle'" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="cycle in cyclesOptions" :key="cycle.value" :value="cycle.value">
              {{ cycle.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedTeam" :disabled="teamsLoading" class="w-full">
          <SelectTrigger class="md:min-w-32">
            <SelectValue :placeholder="teamsLoading ? 'Loading...' : 'Select Team'" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="team in teamsOptions" :key="team" :value="team">
              {{ team }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import { useDevice } from '~/composables/useDevice';
import { usePaymentFilters } from '~/composables/usePaymentFilters';
import type { FilterOptions, TeamName, EnumItem } from '~/types';
import type { Warehouse, PaymentStatusItem } from '~/types/payment';

interface Props {
  warehouses: Ref<Warehouse[]>;
  isOpen: boolean;
  selectedCycle: string | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:filter', filter: FilterOptions): void;
  (e: 'update:team', team: TeamName | null): void;
  (e: 'update:is-open', isOpen: boolean): void;
}>();

const { isMobile } = useDevice();

const {
  selectedWarehouse,
  selectedStatus,
  selectedTeam,
  selectedCycle,
  teamsLoading,
  teamsOptions,
  cyclesOptions,
  warehouseOptions,
  statusOptions,
  updateWarehouse,
  updateStatus,
  initializeFilters,
  currentFilters,
} = usePaymentFilters(props.warehouses);

// Initialize filters when component is mounted
onMounted(async () => {
  await initializeFilters();
});

// Watch for changes in filters and emit updates
watch(currentFilters, (newFilters: FilterOptions) => {
  emit('update:filter', newFilters);
});

// Watch for changes in selectedTeam and emit updates
watch(selectedTeam, (newTeam: TeamName | null) => {
  emit('update:team', newTeam);
});

const close = () => {
  emit('update:is-open', false);
};
</script>