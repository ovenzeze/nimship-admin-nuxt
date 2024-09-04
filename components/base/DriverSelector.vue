<template>
  <Select @update:modelValue="handleSelect">
    <SelectTrigger>
      <SelectValue placeholder="Select a driver" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="driver in drivers" :key="driver.id" :value="driver.id">
        {{ driver.name }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 这里应该从 API 或 store 获取司机列表
const drivers = ref([
  { id: 1, name: 'Driver 1' },
  { id: 2, name: 'Driver 2' },
  // ... 更多司机
])

const emit = defineEmits<{
  (e: 'select', driverId: number): void
}>()

const handleSelect = (driverId: number) => {
  emit('select', driverId)
}
</script>