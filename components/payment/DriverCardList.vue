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
  <div class="w-full flex flex-nowrap group items-center justify-start p-0 m-0 divide-surface">
    <template v-for="(record, index) in readableRecords" :key="record.custom_uid">
      <div :value="record.custom_uid" as-child
        class="p-0 flex flex-col items-center justify-center max-w-40 gap-y-1 md:gap-y-2 min-w-32 cursor-pointer transition-all duration-300 rounded-none py-3 md:py-4 px-1 md:px-6 group-last:border-r ring-accent-foreground/50"
        :class="{
          'opacity-100 border-y border-y-accent-foreground/80 border-collapse': index == idx,
          'opacity-50': index != idx,
        }" @click="() => handleDriverSelect(index)">
        <div class="p-0 flex flex-col items-center justify-center gap-y-1 md:gap-y-2 text-xs md:text-sm">
          <p class="uppercase truncate text-xs max-w-full border-collapse">
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
</template>
<style scoped>
.overflow-x-scroll {
  -webkit-overflow-scrolling: touch;
  /* 为 iOS 设备提供平滑滚动 */
}
</style>