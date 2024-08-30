<script setup lang="ts">
import type { ReadablePaymentRecord } from "~/utils/driver";

const props = defineProps<{
  records: DriverPaymentRecord[];
  idx: number | 0;
  loading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  (e: "select-driver", driver: ReadablePaymentRecord): void;
}>();

const readableRecords = computed(() => props.records.map(getReadablePaymentRecord));

const page = ref(props.idx);

const handleDriverSelect = (idx: number) => {
  emit("select-driver", idx);
};
</script>

<template>
  <Pagination
    v-model="page"
    class="p-0 m-0 overflow-x-scroll overscroll-none border-b border-b-border"
  >
    <PaginationList
      class="flex flex-nowrap group items-center justify-start p-0 m-0 overflow-x-scroll scrollbar-hide overscroll-none divide-surface"
    >
      <template v-for="(record, index) in readableRecords" :key="record.custom_uid">
        <PaginationListItem
          :value="record.custom_uid"
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
              {{ record?.driver_id }}
            </p>
            <p
              class="lining-nums leading-relaxed text-xs md:text-sm "
            >
              $ {{ record.net_pay.toFixed(2) }}
            </p>
              <p class="uppercase text-xs bg-red-500/20 rounded-full px-3 py-1 opacity-70 scale-90">
                {{
                  record.paymentStatus.status
                }}
              </p>
          </div>
        </PaginationListItem>
      </template>
    </PaginationList>
  </Pagination>
</template>
<style scoped>
.overflow-x-scroll {
  -webkit-overflow-scrolling: touch; /* 为 iOS 设备提供平滑滚动 */
}
</style>