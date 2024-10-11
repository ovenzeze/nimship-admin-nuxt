<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import { getPayRcord as getPayRecord } from '~/utils/driver'
import type { FetchPayRecord } from '~/types/payment'

const props = defineProps({
  records: {
    type: Array as PropType<FetchPayRecord[]>,
    required: true,
  },
  idx: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(["select-driver"])

// We're keeping this for now, but it might be unnecessary if the records are already processed
const readableRecords = computed(() => props.records.map(getPayRecord))
const selectedIdx = ref(props.idx)

const handleDriverSelect = (idx: number) => {
  selectedIdx.value = idx
  emits("select-driver", idx)
}

// Helper function to safely access nested properties
const safeGet = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}
</script>

<template>
  <div class="relative w-full overflow-scroll border border-border rounded-lg">
    <div class="flex overflow-x-scroll snap-x snap-mandatory touch-pan-x divide-x">
      <template v-for="(record, index) in readableRecords" :key="record.custom_uid">
        <div :value="record.custom_uid"
          class="flex-none snap-start p-0 flex flex-col items-center justify-center min-w-32 md:min-w-40 gap-y-1 md:gap-y-2 cursor-pointer transition-all duration-300 rounded-none py-3 md:py-4 px-1 md:px-6 border border-transparent "
          :class="{
            'border-y-accent-foreground/80 shadow-md': index == idx,
            'opacity-50 hover:opacity-80': index != idx,
          }" @click="() => handleDriverSelect(index)">
          <div class="p-0 flex flex-col items-center justify-center gap-y-1 md:gap-y-2 text-xs md:text-sm">
            <p class="uppercase truncate text-xs w-full max-w-full border-collapse overflow-auto">
              {{ record.name || 'N/A' }}
            </p>
            <p class="text-foreground uppercase truncate max-w-full text-xs md:text-sm">
              {{ record.custom_uid || 'N/A' }}
            </p>
            <p class="lining-nums leading-relaxed text-xs md:text-sm ">
              $ {{ safeGet(record, 'net_pay.toFixed') ? record.net_pay.toFixed(2) : 'N/A' }}
            </p>
            <p class="uppercase text-xs bg-red-500/20 rounded-full px-3 py-1 opacity-70 scale-90">
              {{ record.status || 'N/A' }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>