<script setup lang="ts">
import { ref, computed } from "vue";
import type { DriverPaymentRecord } from "../../composables/usePaymentRecords";

const props = defineProps<{
  paymentRecords: DriverPaymentRecord[]
  loading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  (e: 'select-driver', driver: DriverPaymentRecord): void
}>()

const page = ref(1);
const itemsPerPage = 10;

const paginatedRecords = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.paymentRecords.slice(start, end);
});

const activeDriver = computed(() => {
  return paginatedRecords.value[0];
});

const activeDriverId = computed(() => {
  return activeDriver.value?.id;
});

const totalPages = computed(() => {
  return Math.ceil(props.paymentRecords.length / itemsPerPage);
});

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};

const handleDriverSelect = (driver: DriverPaymentRecord) => {
  emit('select-driver', driver)
}
</script>

<template>
  <div v-if="loading" class="text-center py-4">Loading...</div>
  <div v-else-if="error" class="text-center py-4 text-red-500">{{ error }}</div>
  <Pagination
    v-else
    v-model="page"
    :total="totalPages"
    :sibling-count="1"
    class="min-w-full"
    @update:model-value="handlePageChange"
  >
    <PaginationList
      class="flex flex-nowrap items-center justify-start px-4 overflow-x-scroll scrollbar-hide overscroll-none divide-x divide-surface"
    >
      <template v-for="record in paginatedRecords" :key="record.id">
        <PaginationListItem
          :value="record.id"
          as-child
          class="p-0 flex flex-col items-center justify-center max-w-40 gap-y-2 min-w-40 cursor-pointer hover:opacity-100 hover:shadow-lg hover:border-y-2 hover:border-y-accent-foreground/50 transition-all duration-300 rounded-none py-4 px-2"
          :class="{
            'opacity-100 border-y-2 border-y-accent-foreground shadow-lg': record.id == activeDriverId,
            'opacity-50 border-b border-b-surface': record.id != activeDriverId,
          }"
          @click="handleDriverSelect(record)"
        >
          <div class="p-0 flex flex-col items-center justify-center gap-y-2">
            <p class="text-sm text-foreground uppercase truncate max-w-full">
              {{ record.haulblaze_contact?.first_name }}
              {{ record.haulblaze_contact?.last_name }}
            </p>
            <p class="text-sm text-foreground lining-nums leading-relaxed">
              {{ record.net_pay.toFixed(2) }}
            </p>
            <Badge :variant="record.payment_method ? 'default' : 'outline'">
              <p class="text-xs">
                {{ record.payment_status }}
              </p>
            </Badge>
          </div>
        </PaginationListItem>
      </template>
    </PaginationList>
  </Pagination>
</template>