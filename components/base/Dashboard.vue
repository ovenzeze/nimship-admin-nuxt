<template>
  <div class="w-full">
    <!-- 概览卡片 -->
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-10">
      <Card v-for="card in overviewCards" :key="card.title">
        <CardHeader v-if="card.title" class="pb-3">
          <CardTitle>{{ card.title }}</CardTitle>
          <CardDescription v-if="card.description" class="max-w-lg text-balance leading-relaxed">
            {{ card.description }}
          </CardDescription>
        </CardHeader>
        <CardContent v-if="card.value">
          <div class="text-4xl font-bold">{{ card.value }}</div>
          <div v-if="card.change" class="text-xs text-muted-foreground">
            {{ card.change }} {{ card.period }}
          </div>
        </CardContent>
        <CardFooter v-if="card.buttonText || card.progressValue !== undefined">
          <Button v-if="card.buttonText" @click="card.onClick">{{ card.buttonText }}</Button>
          <Progress v-if="card.progressValue !== undefined" :model-value="card.progressValue" :aria-label="`${card.progressValue}% ${card.changeType}`" />
        </CardFooter>
      </Card>
    </div>

    <!-- 订单表格 -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead class="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="order in orders" :key="order.email">
              <TableCell>{{ order.customer }}</TableCell>
              <TableCell>{{ order.type }}</TableCell>
              <TableCell>
                <Badge :variant="order.status === 'Fulfilled' ? 'secondary' : 'outline'">
                  {{ order.status }}
                </Badge>
              </TableCell>
              <TableCell>{{ order.date }}</TableCell>
              <TableCell class="text-right">${{ order.amount.toFixed(2) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">

// 概览卡片数据
const overviewCards = ref([
  {
    title: 'Your Orders',
    description: 'Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.',
    buttonText: 'Create New Order',
    onClick: () => console.log('Create New Order clicked')
  },
  {
    title: 'This Week',
    value: '$1,329',
    change: '+25%',
    changeType: 'increase',
    period: 'from last week',
    progressValue: 25
  },
  {
    title: 'This Month',
    value: '$5,329',
    change: '+10%',
    changeType: 'increase',
    period: 'from last month',
    progressValue: 12
  }
])

// 订单数据
const orders = ref([
  { customer: 'Liam Johnson', email: 'liam@example.com', type: 'Sale', status: 'Fulfilled', date: '2023-06-23', amount: 250.00 },
  { customer: 'Olivia Smith', email: 'olivia@example.com', type: 'Refund', status: 'Declined', date: '2023-06-24', amount: 150.00 },
  { customer: 'Noah Williams', email: 'noah@example.com', type: 'Sale', status: 'Fulfilled', date: '2023-06-25', amount: 350.00 },
  { customer: 'Emma Brown', email: 'emma@example.com', type: 'Sale', status: 'Fulfilled', date: '2023-06-26', amount: 450.00 },
])
</script>