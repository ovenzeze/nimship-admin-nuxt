<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center">
        <Icon :name="icon" class="w-5 h-5 mr-2" />
        {{ title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex justify-end mb-4">
        <Select v-model="chartType">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="area">Area Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="h-[300px]">
        <AreaChart v-if="chartType === 'area'" :data="chartData" :index="indexKey" :categories="categories"
          :colors="colors" :value-formatter="yFormatter" :y-axis-width="40" />
        <LineChart v-else :data="chartData" :index="indexKey" :categories="categories" :colors="colors"
          :value-formatter="yFormatter" :y-axis-width="40" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  icon: string
  currentWeekData: Array<{ date: string; value: number }>
  lastWeekData: Array<{ date: string; value: number }>
  colors: string[]
  yFormatter: (value: number) => string
}>()

const chartType = ref('line')
const indexKey = 'date'
const categories = ['Current Week', 'Last Week']

const chartData = computed(() => {
  const currentWeek = new Date()
  const lastWeek = new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)

  return props.currentWeekData.map((item, index) => {
    const itemDate = new Date(item.date)
    if (itemDate <= currentWeek && itemDate > lastWeek) {
      return {
        date: formatDate(item.date),
        'Current Week': item.value,
        'Last Week': props.lastWeekData[index]?.value || null,
      }
    }
    return null
  }).filter(Boolean)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>
