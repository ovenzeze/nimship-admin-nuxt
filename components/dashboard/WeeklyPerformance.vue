<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center">
        <!-- <Icon name="ph:chart-line" class="w-5 h-5 mr-2" /> -->
        Weekly Performance
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs default-value="inbound" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="inbound">In Bound Week</TabsTrigger>
          <TabsTrigger value="last">Last Week</TabsTrigger>
        </TabsList>
        <TabsContent value="inbound">
          <div class="space-y-2">
            <p><strong>Total Orders:</strong> {{ weeklyStats.inbound.totalOrders }}</p>
            <p><strong>Total Revenue:</strong> ${{ weeklyStats.inbound.totalRevenue.toLocaleString() }}</p>
            <p><strong>Average Order Value:</strong> ${{ weeklyStats.inbound.averageOrderValue.toLocaleString() }}</p>
          </div>
        </TabsContent>
        <TabsContent value="last">
          <div class="space-y-2">
            <p><strong>Total Orders:</strong> {{ weeklyStats.last.totalOrders }}</p>
            <p><strong>Total Revenue:</strong> ${{ weeklyStats.last.totalRevenue.toLocaleString() }}</p>
            <p><strong>Average Order Value:</strong> ${{ weeklyStats.last.averageOrderValue.toLocaleString() }}</p>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">

defineProps<{
  weeklyStats: {
    inbound: {
      totalOrders: number
      totalRevenue: number
      averageOrderValue: number
    }
    last: {
      totalOrders: number
      totalRevenue: number
      averageOrderValue: number
    }
  }
}>()
</script>
