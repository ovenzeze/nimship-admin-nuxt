<template>
  <div class="flex-col md:flex">
    <div class="flex-1 space-y-4 pt-2 pb-10">
      <div class="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">

        <TeamInfo :team-info="dashboardData.teamInfo" class="col-span-2" />

        <Card class="bg-red-900/20 flex flex-col justify-between">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <Icon name="ph:currency-dollar" class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent class="">
            <div class="flex flex-col">
              <div class="text-2xl font-bold">{{ dashboardData.totalRevenue }}</div>
              <p class="text-xs text-muted-foreground">
                {{ dashboardData.revenueChange }} from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card v-for="(stat, index) in dashboardData.driverStats" :key="index" class="flex flex-col justify-between">
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
      <div class="grid gap-4 md:grid-cols-2">
        <TrendChart title="Weekly Orders Trend" icon="ph:chart-line"
          :current-week-data="formatWeeklyData(dashboardData.weeklyOrderStats.currentWeek)"
          :last-week-data="formatWeeklyData(dashboardData.weeklyOrderStats.lastWeek)" :colors="['#3b82f6', '#93c5fd']"
          :y-formatter="(value: number) => value.toString()" />
        <TrendChart title="Weekly Deductions Trend" icon="ph:currency-dollar"
          :current-week-data="formatWeeklyData(dashboardData.deductionStats.currentWeek)"
          :last-week-data="formatWeeklyData(dashboardData.deductionStats.lastWeek)" :colors="['#ef4444', '#fca5a5']"
          :y-formatter="(value: number) => '$' + value.toString()" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'


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


const defaultDashboard: DashboardData = {
  totalRevenue: '$128,560',
  revenueChange: '+12.5%',
  driverStats: [
    {
      title: 'Total Drivers',
      icon: 'users',
      value: 24,
      change: '+2',
    },
    {
      title: 'Active Orders',
      icon: 'package',
      value: 187,
      change: '+23%',
    },
    {
      title: 'Completed Orders',
      icon: 'check-circle',
      value: 1652,
      change: '+15%',
    },
  ],
  weeklyOrderStats: {
    currentWeek: [120, 135, 142, 138, 150, 165, 155],
    lastWeek: [110, 125, 130, 128, 140, 155, 145],
  },
  recentOrders: [
    { id: 1001, driver: 'John Smith', amount: 89, status: 'Delivered' },
    { id: 1002, driver: 'Emily Chen', amount: 120, status: 'In Transit' },
    { id: 1003, driver: 'Michael Wong', amount: 75, status: 'Picked Up' },
    { id: 1004, driver: 'Lisa Garcia', amount: 95, status: 'Delivered' },
    { id: 1005, driver: 'Robert Taylor', amount: 110, status: 'In Transit' },
  ],
  deductionStats: {
    currentWeek: [200, 150, 300, 180, 220, 170, 250],
    lastWeek: [180, 120, 250, 160, 200, 190, 230],
  },
  teamInfo: {
    name: 'NYC Express Team',
    location: 'New York City, NY',
    status: 'Operational',
    warehouse: 'Manhattan Central Hub',
    contact: 'Jessica Thompson',
    phone: '(212) 555-1234',
  },
  drivers: [
    { id: 'DRV-001', name: 'John Smith', status: 'Online', orders: 45, revenue: 15000 },
    { id: 'DRV-002', name: 'Emily Chen', status: 'Online', orders: 38, revenue: 12500 },
    { id: 'DRV-003', name: 'Michael Wong', status: 'Offline', orders: 42, revenue: 14000 },
    { id: 'DRV-004', name: 'Lisa Garcia', status: 'Online', orders: 40, revenue: 13500 },
    { id: 'DRV-005', name: 'Robert Taylor', status: 'On Leave', orders: 35, revenue: 11000 },
  ],
};


const formatWeeklyData = (weekData: number[]) => {
  const currentDate = new Date()
  return weekData.map((value, index) => {
    const date = new Date(currentDate)
    date.setDate(date.getDate() - (6 - index))
    return {
      date: date.toISOString().split('T')[0],
      value: value
    }
  })
}
const dashboardData = ref<DashboardData | null>(defaultDashboard)


</script>
