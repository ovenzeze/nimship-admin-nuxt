<template>
  <div class="flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <h2 class="text-lg font-semibold">Dashboard</h2>
        <Button variant="outline" class="ml-auto h-8 lg:flex" @click="refreshData">
          <Icon name="ph:arrows-clockwise" class="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>
    </div>
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <Icon name="ph:currency-dollar" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">$45,231.89</div>
            <p class="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Registered Drivers
            </CardTitle>
            <Icon name="ph:user-circle" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ driverStats[0].value }}</div>
            <p class="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Active Drivers
            </CardTitle>
            <Icon name="ph:truck" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ driverStats[1].value }}</div>
            <p class="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Inactive Drivers
            </CardTitle>
            <Icon name="ph:user-circle-minus" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ driverStats[2].value }}</div>
            <p class="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card class="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Orders Overview</CardTitle>
          </CardHeader>
          <CardContent class="pl-2">
            <TrendChart
              title="Weekly Orders Trend"
              icon="ph:chart-line"
              :current-week-data="weeklyOrderStats.currentWeek"
              :last-week-data="weeklyOrderStats.lastWeek"
              :colors="['#3b82f6', '#93c5fd']"
              :y-formatter="(value) => value.toString()"
            />
          </CardContent>
        </Card>
        <Card class="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You made 265 orders this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders :orders="recentOrders" />
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card class="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Deductions Overview</CardTitle>
          </CardHeader>
          <CardContent class="pl-2">
            <TrendChart
              title="Weekly Deductions Trend"
              icon="ph:currency-dollar"
              :current-week-data="deductionStats.currentWeek"
              :last-week-data="deductionStats.lastWeek"
              :colors="['#ef4444', '#fca5a5']"
              :y-formatter="(value) => '$' + value.toString()"
            />
          </CardContent>
        </Card>
        <Card class="col-span-3">
          <CardHeader>
            <CardTitle>Team Information</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamInfo :team-info="teamInfo" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Driver Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <DriverPerformanceTable :drivers="drivers" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TeamInfo from '@/components/dashboard/TeamInfo.vue'
import TrendChart from '@/components/dashboard/TrendChart.vue'
import DriverPerformanceTable from '@/components/dashboard/DriverPerformanceTable.vue'
import RecentOrders from '@/components/dashboard/RecentOrders.vue'

// ... (保留现有的 ref 定义)

const recentOrders = ref([
  { id: 1, driver: 'Li Si', amount: 125, status: 'completed' },
  { id: 2, driver: 'Wang Wu', amount: 80, status: 'processing' },
  { id: 3, driver: 'Zhao Liu', amount: 150, status: 'completed' },
  { id: 4, driver: 'Qian Qi', amount: 110, status: 'failed' },
  { id: 5, driver: 'Sun Ba', amount: 95, status: 'completed' },
])

const refreshData = () => {
  // 实现刷新数据的逻辑
  console.log('Refreshing data...')
}
</script>
