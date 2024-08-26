<template>
  <Card>
    <CardHeader v-if="title" class="pb-3">
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription v-if="description" class="max-w-lg text-balance leading-relaxed">
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent v-if="value">
      <div class="text-4xl font-bold">{{ value }}</div>
      <div v-if="change" class="text-xs text-muted-foreground">
        {{ change }} {{ period }}
      </div>
    </CardContent>
    <CardFooter v-if="buttonText || progressValue !== undefined">
      <Button v-if="buttonText" @click="onClick">{{ buttonText }}</Button>
      <Progress v-if="progressValue !== undefined" :model-value="progressValue" :aria-label="`${progressValue}% ${changeType}`" />
    </CardFooter>
  </Card>
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
    value: '$1329',
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
  },
  // 可以添加更多概览卡片
]);

// 订单数据
const orders = ref([
  { customer: 'Liam Johnson', email: 'liam@example.com', type: 'Sale', status: 'Fulfilled', date: '2023-06-23', amount: 250.00 },
  { customer: 'Olivia Smith', email: 'olivia@example.com', type: 'Refund', status: 'Declined', date: '2023-06-24', amount: 150.00 },
  // 可以添加更多订单数据
]);

// 图表数据
const chartData = ref({
  // 这里可以添加图表所需的数据
});

// 订单详细信息
const orderDetails = ref({
  orderId: 'Oe31b70H',
  date: 'November 23, 2023',
  items: [
    { name: 'Glimmer Lamps', quantity: 2, price: 250.00 },
    { name: 'Aqua Filters', quantity: 1, price: 49.00 },
  ],
  subtotal: 299.00,
  shipping: 5.00,
  tax: 25.00,
  total: 329.00,
  shippingInfo: {
    name: 'Liam Johnson',
    address: '1234 Main St.',
    city: 'Anytown',
    state: 'CA',
    zip: '12345'
  },
  customerInfo: {
    name: 'Liam Johnson',
    email: 'liam@acme.com',
    phone: '+1 234 567 890'
  },
  paymentInfo: {
    type: 'Visa',
    last4: '4532'
  }
});
</script>