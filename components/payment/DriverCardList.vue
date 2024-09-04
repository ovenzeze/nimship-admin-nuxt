<script setup lang="ts">

const props = defineProps({
  records: {
    type: Array as PropType<DriverPaymentRecord[]>,
    required: true,
  },
  idx: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["select-driver"]);


const readableRecords = computed(() => props.records.map(getReadablePaymentRecord));
const selectedIdx = ref(props.idx);

console.log(props.records, readableRecords.value);
const handleDriverSelect = (idx: number) => {
  selectedIdx.value = idx;
  emits("select-driver", idx);
};
</script>

<template>
  <div class="relative w-full overflow-scroll border border-border rounded-lg">
    <div class="flex overflow-x-scroll snap-x snap-mandatory touch-pan-x divide-x">
      <template v-for="(record, index) in readableRecords" :key="record.custom_uid">
        <div :value="record.custom_uid"
          class="flex-none snap-start p-0 flex flex-col items-center justify-center min-w-32 md:min-w-40 gap-y-1 md:gap-y-2 cursor-pointer transition-all duration-300 rounded-none py-3 md:py-4 px-1 md:px-6 border border-transparent border-x-blue-100"
          :class="{
            'border-y-accent-foreground/80 shadow-md': index == idx,
            'opacity-50 hover:opacity-80': index != idx,
          }" @click="() => handleDriverSelect(index)">
          <div class="p-0 flex flex-col items-center justify-center gap-y-1 md:gap-y-2 text-xs md:text-sm">
            <p class="uppercase truncate text-xs w-full max-w-full border-collapse overflow-auto">
              {{ record.name }}
            </p>
            <p class="text-foreground uppercase truncate max-w-full text-xs md:text-sm">
              {{ record.driver_id }}
            </p>
            <p class="lining-nums leading-relaxed text-xs md:text-sm ">
              $ {{ record.net_pay.toFixed(2) }}
            </p>
            <p class="uppercase text-xs bg-red-500/20 rounded-full px-3 py-1 opacity-70 scale-90">
              {{
                record.payment_status.status
              }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>