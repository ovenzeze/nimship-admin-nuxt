<template>
  <Card :ui="{ body: { base: 'w-full', padding: 'p-0 sm:p-2 py-6' } }">
    <CardHeader>
      <CardTitle class="flex flex-row items-center justify-between">
        <div class="text-lg flex flex-row items-center">
          <Icon :name="icon" class="w-5 h-5 mr-2" />
          {{ title }}
        </div>
        <div class="justify-end hidden md:block">
          <Select v-model="chartType">
            <SelectTrigger class="w-[120px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="w-full h-full">
        <AreaChart v-if="chartType === 'area'" :data="chartData" :index="indexKey" :categories="categories"
          :value-formatter="yFormatter" :y-axis-width="40" class="max-h-[280px] md:max-h-full py-4 px-0" />
        <LineChart v-else :data="chartData" :index="indexKey" :categories="categories" :colors="colors"
          :value-formatter="yFormatter" :y-axis-width="40" class="max-h-[280px] md:max-h-full" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">


const props = defineProps<{
  title: string
  icon: string
  currentWeekData: Array<{ date: string; value: number }>
  lastWeekData: Array<{ date: string; value: number }>
  colors: string[]
  yFormatter: (value: number) => string
  chartType: string
}>()

const chartType = ref(props.chartType || 'area')
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
