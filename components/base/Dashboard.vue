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
    <div v-if="loading" class="flex items-center justify-center h-full">
      <p>Loading dashboard data...</p>
    </div>
    <div v-else-if="error" class="flex items-center justify-center h-full">
      <p>Error loading dashboard data: {{ error }}</p>
    </div>
    <div v-else-if="dashboardData" class="flex-1 space-y-4 p-8 pt-6">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <Icon name="ph:currency-dollar" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ dashboardData.totalRevenue }}</div>
            <p class="text-xs text-muted-foreground">
              {{ dashboardData.revenueChange }} from last month
            </p>
          </CardContent>
        </Card>
        <Card v-for="(stat, index) in dashboardData.driverStats" :key="index">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              {{ stat.title }}
            </CardTitle>
            <Icon :name="stat.icon" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <p class="text-xs text-muted-foreground">
              {{ stat.change }}
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
            <TrendChart title="Weekly Orders Trend" icon="ph:chart-line"
              :current-week-data="dashboardData.weeklyOrderStats.currentWeek"
              :last-week-data="dashboardData.weeklyOrderStats.lastWeek" :colors="['#3b82f6', '#93c5fd']"
              :y-formatter="(value: number) => value.toString()" />
          </CardContent>
        </Card>
        <Card class="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You made {{ dashboardData.recentOrders.length }} orders this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders :orders="dashboardData.recentOrders" />
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card class="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Deductions Overview</CardTitle>
          </CardHeader>
          <CardContent class="pl-2">
            <TrendChart title="Weekly Deductions Trend" icon="ph:currency-dollar"
              :current-week-data="dashboardData.deductionStats.currentWeek"
              :last-week-data="dashboardData.deductionStats.lastWeek" :colors="['#ef4444', '#fca5a5']"
              :y-formatter="(value: number) => '$' + value.toString()" />
          </CardContent>
        </Card>
        <Card class="col-span-3">
          <CardHeader>
            <CardTitle>Team Information</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamInfo :team-info="dashboardData.teamInfo" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Driver Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <DriverPerformanceTable :drivers="dashboardData.drivers" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useUpstash } from '~/composables/useUpstash'

interface DashboardData {
  totalRevenue: string;
  revenueChange: string;
  driverStats: Array<{
    title: string;
    icon: string;
    value: number;
    change: string;
  }>;
  weeklyOrderStats: {
    currentWeek: number[];
    lastWeek: number[];
  };
  recentOrders: Array<{
    id: number;
    driver: string;
    amount: number;
    status: string;
  }>;
  deductionStats: {
    currentWeek: number[];
    lastWeek: number[];
  };
  teamInfo: {
    name: string;
    location: string;
    status: string;
    warehouse: string;
    contact: string;
    phone: string;
  };
  drivers: Array<any>; // You might want to define a more specific type for drivers
}

const { data, error, loading, getGlobalStats, startRealTimeRefresh, stopRealTimeRefresh } = useUpstash()

const dashboardData = ref<DashboardData | null>(null)

const refreshData = () => {
  getGlobalStats()
}

onMounted(() => {
  getGlobalStats()
  startRealTimeRefresh('global:stats', 'hash', 60000) // Refresh every minute
})

onUnmounted(() => {
  stopRealTimeRefresh()
})

// Watch for changes in the data from useUpstash
watch(data, (newData: DashboardData | null) => {
  if (newData) {
    dashboardData.value = newData
  }
})
</script>
