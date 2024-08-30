<script setup lang="ts">
import { ref, computed } from "vue";
import type { DriverPaymentRecord } from "../../composables/usePaymentRecords";

const props = defineProps<{
  records: DriverPaymentRecord[];
  idx: number | 0;
  loading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  (e: "select-driver", driver: DriverPaymentRecord): void;
}>();

const page = ref(props.idx);

const handleDriverSelect = (idx: number) => {
  emit("select-driver", idx);
};
</script>

<template>
  <div v-if="loading" class="text-center py-4">Loading...</div>
  <div v-else-if="error" class="text-center py-4 text-red-500">{{ error }}</div>
  <Pagination
    v-else
    v-model="page"
    :sibling-count="1"
    class="p-0 m-0 overflow-x-scroll scrollbar-hide overscroll-none border-b border-b-border"
  >
    <PaginationList
      class="flex flex-nowrap group items-center justify-start p-0 m-0 overflow-x-scroll scrollbar-hide overscroll-none divide-surface"
    >
      <template v-for="(record, index) in records" :key="record.id">
        <PaginationListItem
          :value="record.id"
          as-child
          class="p-0 flex flex-col items-center justify-center max-w-40 gap-y-1 md:gap-y-2 min-w-32 cursor-pointer transition-all duration-300 rounded-none py-3 md:py-4 px-1 md:px-6 group-last:border-r ring-accent-foreground/50"
          :class="{
            'opacity-100 border-y border-y-accent-foreground/80':
              index == idx,
            'opacity-50': index != idx,
          }"
          @click="handleDriverSelect(index)"
        >
          <div
            class="p-0 flex flex-col items-center justify-center gap-y-1 md:gap-y-2 text-xs md:text-sm"
          >
            <p class="uppercase truncate text-xs max-w-full">
              {{ record.haulblaze_contact?.first_name }}
              {{ record.haulblaze_contact?.last_name }}
            </p>
            <p
              class="text-foreground uppercase truncate max-w-full text-xs md:text-sm"
            >
              {{ record?.custom_uid }}
            </p>
            <p
              class="lining-nums leading-relaxed text-xs md:text-sm "
            >
              $ {{ record.net_pay.toFixed(2) }}
            </p>
              <p class="uppercase text-xs bg-red-500/20 rounded-full px-3 py-1 opacity-70 scale-90">
                {{
                  record.actual_payment_date
                    ? record.actual_payment_date
                    : "Pending"
                }}
              </p>
          </div>
        </PaginationListItem>
      </template>
    </PaginationList>
  </Pagination>
</template>