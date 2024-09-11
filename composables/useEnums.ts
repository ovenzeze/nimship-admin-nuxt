import type { Database } from "~/types/database";
import type { EnumItem, EnumType, PayCycle } from "~/types/shared";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export function useEnums() {
  const supabase = useSupabaseClient<Database>();

  const enumItems = ref<EnumItem[]>([]);
  const isLoaded = ref(false);
  const isLoading = ref(false);
  const isPayCyclesLoaded = ref(false);
  const isPayCyclesLoading = ref(false);
  const payCycles = ref<PayCycle[]>([]);

  const fetchEnums = async () => {
    if (isLoaded.value || isLoading.value) return;

    isLoading.value = true;

    try {
      const { data, error } = await supabase.from("zion_enum").select("id, label, value, type").order("type", { ascending: true });

      if (error) throw error;

      enumItems.value = data;
      isLoaded.value = true;
      console.log("Enums fetched successfully:", enumItems.value);
    } catch (error) { console.error("Error fetching enums:", error); }
    finally { isLoading.value = false; }
  };

  const getEnumsByType = async (type: EnumType) => {
    if (type === "CYCLE") {
      if (!isPayCyclesLoaded.value && !isPayCyclesLoading.value) await fetchPaymentCycles();
      return payCycles.value;
    } else {
      if (!isLoaded.value && !isLoading.value) await fetchEnums();
      return enumItems.value.filter((item) => item.type === type);
    }
  };

  const fetchPaymentCycles = async () => {
    isPayCyclesLoading.value = true;

    try {
      console.log("Fetching payment cycles...");

      const { data, error: queryError } = await supabase.from("invoice_view").select("payment_cycle_start").order("payment_cycle_start", { ascending: false });

      if (queryError) throw queryError;

      if (data && data.length > 0) {
        const cycles = new Set(data.map(item => item.payment_cycle_start));

        payCycles.value = Array.from(cycles).map(cycle => {
          const start = dayjs.utc(cycle).format("MM/DD/YY");
          const end = dayjs.utc(cycle).add(6, "day").format("MM/DD/YY");
          return { cycle: `${start} - ${end}`, start, end };
        });

        console.log(`Payment cycles fetched successfully:`, payCycles.value);
        isPayCyclesLoaded.value = true;
      }
    } catch (e) {
      console.error("Error fetching payment cycles:", e);
    } finally {
      isPayCyclesLoading.value = false;
    }

    return [];
  };

  const getUniqueEnumTypes = (): EnumType[] => [...new Set(enumItems.value.map((item) => item.type as EnumType))];

  // 页面加载后1秒自动获取
  onMounted(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await Promise.all([fetchEnums(), fetchPaymentCycles()]);
  });

  return {
    enumItems,
    getEnumsByType,
    getUniqueEnumTypes,
    fetchEnums,
    isLoaded,
    isLoading,
  };
}
