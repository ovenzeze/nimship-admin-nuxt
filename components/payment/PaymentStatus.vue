 <template>
  <InfoCardGroup
    icon="ph:stack"
    label="Status"
    themeColor="orange"
  >
    <InfoCard
      v-for="(item, itemIndex) in statusItems"
      :key="itemIndex"
      :label="item.label"
      :value="item.value"
      :icon="item.icon"
      :class="item.class"
    />
  </InfoCardGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InfoCardGroup from './InfoCardGroup.vue';
import InfoCard from './InfoCard.vue';
import type { DriverPaymentRecord } from '../../composables/usePaymentRecords';

const props = defineProps<{
  record: DriverPaymentRecord;
}>();

const statusItems = computed(() => [
  { label: "Status", value: props.record.payment_status, icon: "ph:stamp-light" },
  { label: "Time", value: props.record.payment_date || "N/A", icon: "ph:clock" },
  { label: "Method", value: props.record.payment_method || "N/A", icon: "ph:credit-card" },
  { label: "Amount", value: `$${props.record.net_pay.toFixed(2)}`, icon: "ph:currency-circle-dollar" },
  { label: "Notes", value: "N/A", icon: "ph:note-duotone" },
  { label: "Employee", value: props.record.name, icon: "ph:user", class: "md:hidden" },
]);

defineExpose({});
</script>