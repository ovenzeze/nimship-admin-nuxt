 <template>
  <InfoCardGroup
    icon="ph:bank"
    label="Bank"
    themeColor="green"
  >
    <InfoCard
      v-for="(item, itemIndex) in bankItems"
      :key="itemIndex"
      :label="item.label"
      :value="item.value"
      :icon="item.icon"
      :class="item.class"
    />
  </InfoCardGroup>
</template>

<script setup lang="ts">
import InfoCardGroup from './InfoCardGroup.vue';
import InfoCard from './InfoCard.vue';
import type { DriverPaymentRecord } from '../../composables/usePaymentRecords';

const props = defineProps<{
  record: DriverPaymentRecord;
}>();

const record = computed(() => readableDriver(props.record));
const bankItems = computed(() => [
  { label: "Account Type", value: record.value.payment_method, icon: "ph:bank" },
  { label: "Routing Number", value: record.value.routing_ending ? `****${record.value.routing_ending}` : "N/A", icon: "ph:hash" },
  { label: "Account Number", value: record.value.account_ending ? `****${record.value.account_ending}` : "N/A", icon: "ph:credit-card" },
  { label: "Zelle", value: record.value.zelle || "N/A", icon: "ph:currency-circle-dollar" },
  { label: "Venmo", value: record.value.zelle || "N/A", icon: "ph:credit-card", class: "hidden md:block" },
]);

</script>