<template>
  <div>
    <FixedCard :otherElementsHeight="30" :footerHeight="50">
      <template #CardInfo>
        <h2 class="text-xl flex items-center">
          <Icon name="ph:bank" class="w-5 h-5 mr-2" />
          Payroll
        </h2>
      </template>
      <template #PrimaryAction>
        <div class="flex flex-row items-center justify-end ">
          <div class="w-40">
            <Select v-model="selectedTeam" @update:modelValue="handleTeamChange">
              <SelectTrigger>
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="team in teams"
                  :key="team.id"
                  :value="String(team.value || team.id)"
                >
                  {{ team.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </template>
      <template #body>
        <DriverCardList 
          :paymentRecords="paymentRecords" 
          :loading="loading" 
          :error="error"
          @select-driver="handleDriverSelection"
        />
        <Payroll v-if="selectedDriver" :record="selectedDriver" />
      </template>
      <template #footer>
        <p>Footer</p>
      </template>
    </FixedCard>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useEnums } from '../composables/useEnums'
import { usePayment, type DriverPaymentRecord } from '../composables/usePaymentRecords'
import DriverCardList from '../components/payment/DriverCardList.vue'
import Payroll from '../components/payment/Payroll.vue' 

const { getEnumsByType } = useEnums()
const teams = computed(() => getEnumsByType("TEAM_NAME"))

const selectedTeam = ref<string | null>(null)
const selectedDriver = ref<DriverPaymentRecord | null>(null)

const { loading, error, paymentRecords, fetchPaymentRecords } = usePayment()

const handleTeamChange = async (team: string) => {
  selectedDriver.value = null
  await fetchPaymentRecords(team as any)
}

const handleDriverSelection = (driver: DriverPaymentRecord) => {
  selectedDriver.value = driver
}

watch(selectedTeam, (newTeam) => {
  if (newTeam) {
    handleTeamChange(newTeam)
  }
})
</script>
