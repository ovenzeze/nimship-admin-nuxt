import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import { useEnums } from '~/composables/useEnums';
import { type FilterOptions, type EnumItem, type TeamName, EnumType } from '~/types';
import { type Warehouse, type PaymentStatusItem } from '~/types/payment';
import { useCookie } from '#app';

export function usePaymentFilters(initialWarehouses: Ref<Warehouse[]>) {
    const { getEnumsByType } = useEnums();

    // State
    const selectedWarehouse = ref<Warehouse>('ALL');
    const selectedStatus = ref<PaymentStatusItem>('ALL');
    const selectedTeam = ref<TeamName | null>(null);
    const selectedCycle = ref<string | null>(null);
    const teamsLoading = ref<boolean>(false);
    const teamsOptions = ref<TeamName[]>([]);
    const cyclesOptions = ref<EnumItem[]>([]);

    // Computed properties
    const warehouseOptions = computed(() => [
        { value: 'ALL' as const, label: 'ALL', icon: getWarehouseIcon('ALL') },
        ...initialWarehouses.value.filter(wh => wh !== 'ALL').map((wh) => ({ value: wh, label: wh, icon: getWarehouseIcon(wh) }))
    ]);

    const statusOptions = computed(() => (['ALL', 'PENDING', 'HOLD', 'PAID'] as const).map(status => ({
        value: status,
        label: status,
        icon: getStatusIcon(status)
    })));

    // Methods
    const updateWarehouse = (value: Warehouse) => selectedWarehouse.value = value;
    const updateStatus = (value: PaymentStatusItem) => selectedStatus.value = value;

    const loadTeams = async () => {
        teamsLoading.value = true;
        const teams = await getEnumsByType(EnumType.TEAM_NAME);
        teamsOptions.value = teams.map((team: EnumItem) => team.label as TeamName);
        teamsLoading.value = false;

        const teamCookie = useCookie<TeamName | null>("selectedTeam");
        const savedTeam = teamCookie.value;
        if (savedTeam && teamsOptions.value.includes(savedTeam)) {
            selectedTeam.value = savedTeam;
        } else if (teamsOptions.value.length > 0) {
            selectedTeam.value = teamsOptions.value[0];
        }
    };

    const loadCycle = async () => {
        const cycles = await getEnumsByType(EnumType.CYCLE);
        cyclesOptions.value = cycles;
    };

    const getStatusIcon = (status: string): string => {
        switch (status.toUpperCase()) {
            case "ALL": return "ph:bank";
            case "PENDING": return "ph:clock";
            case "HOLD": return "ph:pause-circle";
            case "PAID": return "ph:check-circle";
            default: return "ph:question";
        }
    };

    const getWarehouseIcon = (warehouse: string): string => {
        switch (warehouse.toUpperCase()) {
            case "ALL": return "ph:buildings";
            case "SAN": return "ph:tree-palm";
            case "PHX": return "ph:sun";
            case "LAX": return "ph:film-slate";
            case "LAS": return "ph:cigarette-slash";
            case "SEA": return "ph:coffee";
            default: return "ph:map-pin-bold";
        }
    };

    // Watchers
    watch(selectedTeam, (newVal) => {
        const teamCookie = useCookie<TeamName | null>("selectedTeam");
        teamCookie.value = newVal;
    });

    watch(initialWarehouses, (newWarehouses) => {
        console.log('Warehouses updated in usePaymentFilters:', newWarehouses);
        if (!newWarehouses.includes(selectedWarehouse.value) && selectedWarehouse.value !== 'ALL') {
            selectedWarehouse.value = 'ALL';
        }
    });

    // Initialize data
    const initializeFilters = async () => {
        await Promise.all([loadTeams(), loadCycle()]);
    };

    // Computed property for current filter state
    const currentFilters = computed<FilterOptions>(() => ({
        warehouse: selectedWarehouse.value,
        status: selectedStatus.value,
        cycle: selectedCycle.value || undefined,
    }));

    return {
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
    };
}