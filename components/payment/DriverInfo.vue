 <template>
  <InfoCardGroup
    icon="ph:user-circle"
    themeColor="blue"
    label="Driver"
  >
    <InfoCard
      v-for="(item, itemIndex) in driverItems"
      :key="itemIndex"
      :label="item.label"
      :value="item.value"
      :icon="item.icon"
      :class="item.class"
      :highlight="item.highlight"
    />
  </InfoCardGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InfoCardGroup from './InfoCardGroup.vue';
import InfoCard from './InfoCard.vue';
import type { ReadablePaymentRecord } from '~/utils/driver';

const props = defineProps<{
  record: ReadablePaymentRecord;
}>();

const driverItems = computed(() => [
  { label: "Name", value: props.record.name, icon: "ph:user" },
  { label: "Warehouse", value: props.record.warehouse, icon: "ph:warehouse" },
  { label: "Address", value: props.record.address, icon: "ph:map-pin" },
  { label: "Pay Cycle", value: `${props.record.cycle_start} - ${props.record.cycle_end}`, icon: "ph:calendar" },
  { label: "Phone", value: props.record.haulblaze_contact?.phone || "N/A", icon: "ph:phone" },
  { label: "Email", value: props.record.haulblaze_contact?.email, icon: "ph:envelope", class: "hidden md:block" },
]);
</script>