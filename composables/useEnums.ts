import type { Database } from "~/types/database";
import type { EnumItem, EnumType, PayCycle } from "~/types";
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
      console.log("Fetching enums from Supabase...");
      const { data, error } = await supabase.from("zion_enum").select("id, label, value, type").order("type", { ascending: true });

      if (error) throw error;

      enumItems.value = data;
      isLoaded.value = true;
      console.log("Enums fetched successfully:", enumItems.value);
      console.log("Team Name enums:", enumItems.value.filter(item => item.type === "TEAM_NAME"));
    } catch (error) {
      console.error("Error fetching enums:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const getEnumsByType = async (type: EnumType) => {
    console.log(`Getting enums for type: ${type}`);
    if (type === "CYCLE") {
      if (!isPayCyclesLoaded.value && !isPayCyclesLoading.value) await fetchPaymentCycles();
      return payCycles.value;
    } else {
      if (!isLoaded.value && !isLoading.value) {
        console.log("Enums not loaded, fetching...");
        await fetchEnums();
      }
      const filteredItems = enumItems.value.filter((item) => item.type === type);
      console.log(`Filtered items for type ${type}:`, filteredItems);
      return filteredItems;
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
          return { label: `${start} - ${end}`, start, end };
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

  const waitForEnums = async () => {
    if (!isLoaded.value && !isLoading.value) {
      await fetchEnums();
    }
    while (isLoading.value) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return isLoaded.value;
  };

  // 页面加载后1秒自动获取
  onMounted(async () => {
    console.log("useEnums: onMounted called");
    await new Promise((resolve) => setTimeout(resolve, 500));
    await Promise.all([fetchEnums(), fetchPaymentCycles()]);
    console.log("useEnums: Initial data fetch completed");
  });

  return {
    enumItems,
    getEnumsByType,
    getUniqueEnumTypes,
    fetchEnums,
    isLoaded,
    isLoading,
    waitForEnums,
  };
}
