import type { Database } from "~/types/database";
import { EnumType, type EnumItem } from "~/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function useEnums() {
  const supabase = useSupabaseClient<Database>();
  const enumsCache = useAsyncData('enums', fetchEnums);
  const payCyclesCache = useAsyncData('payCycles', fetchPaymentCycles);

  const getEnumsByType = async (type: EnumType) => {
    if (type === EnumType.CYCLE) {
      await payCyclesCache.execute();
      return payCyclesCache.data.value || [];
    } else {
      await enumsCache.execute();
      return (enumsCache.data.value || []).filter((item) => item.type === type);
    }
  };

  const getUniqueEnumTypes = (): EnumType[] => {
    return [...new Set((enumsCache.data.value || []).map(item => item.type as EnumType))];
  };

  async function fetchEnums(): Promise<EnumItem[]> {
    const { data, error } = await supabase
      .from("zion_enum")
      .select("id, label, value, type")
      .order("type", { ascending: true });

    if (error) throw error;
    return data;
  }

  async function fetchPaymentCycles(): Promise<EnumItem[]> {
    const { data, error } = await supabase
      .from("invoice_view")
      .select("payment_cycle_start")
      .order("payment_cycle_start", { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      const cycles = new Set(data.map(item => item.payment_cycle_start));
      return Array.from(cycles).map(cycle => {
        const start = dayjs.utc(cycle).format("MM/DD/YY");
        const end = dayjs.utc(cycle).add(6, "day").format("MM/DD/YY");
        return { label: `${start} - ${end}`, value: start, type: "CYCLE" };
      });
    }
    return [];
  }

  return {
    getEnumsByType,
    getUniqueEnumTypes,
    isLoaded: computed(() => !enumsCache.pending.value && !payCyclesCache.pending.value),
    isLoading: computed(() => enumsCache.pending.value || payCyclesCache.pending.value),
    refresh: () => Promise.all([enumsCache.refresh(), payCyclesCache.refresh()]),
  };
}
