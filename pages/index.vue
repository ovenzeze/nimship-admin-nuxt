<template>
  <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
    <div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <!-- Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card v-for="card in dashboardData.summaryCards" :key="card.title">
          <CardHeader class="pb-2">
            <CardDescription>{{ card.title }}</CardDescription>
            <CardTitle class="text-4xl">{{ card.value }}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-xs text-muted-foreground">{{ card.change }}</div>
          </CardContent>
          <CardFooter>
            <Progress :model-value="card.progressValue" :aria-label="`${card.progressValue}% increase`" />
          </CardFooter>
        </Card>
      </div>

      <!-- Orders Overview -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle>{{ dashboardData.ordersOverview.title }}</CardTitle>
          <CardDescription>{{ dashboardData.ordersOverview.description }}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>{{ dashboardData.ordersOverview.buttonText }}</Button>
        </CardFooter>
      </Card>

      <!-- Orders Table -->
      <Tabs :default-value="dashboardData.ordersTabs.defaultTab">
        <div class="flex items-center">
          <TabsList>
            <TabsTrigger v-for="tab in dashboardData.ordersTabs.tabs" :key="tab" :value="tab">
              {{ tab }}
            </TabsTrigger>
          </TabsList>
          <div class="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="sm" class="h-7 gap-1 rounded-md px-3">
                  <Icon name="ph:list-filter" class="h-3.5 w-3.5" />
                  <span class="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem v-for="filter in dashboardData.ordersTabs.filters" :key="filter">
                  <div class="items-top flex space-x-2">
                    <Checkbox :id="filter" />
                    <label :for="filter" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {{ filter }}
                    </label>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" class="h-7 gap-1 rounded-md px-3">
              <Icon name="ph:file" class="h-3.5 w-3.5" />
              <span class="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <TabsContent v-for="tab in dashboardData.ordersTabs.tabs" :key="tab" :value="tab">
          <Card>
            <CardHeader class="px-7">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead v-for="header in dashboardData.ordersTable.headers" :key="header" :class="{ 'hidden sm:table-cell': header !== 'Customer', 'hidden md:table-cell': header === 'Date' }">
                      {{ header }}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="(order, index) in dashboardData.ordersTable.orders" :key="index">
                    <TableCell>
                      <div class="font-medium">{{ order.customer }}</div>
                      <div class="hidden text-sm text-muted-foreground md:inline">{{ order.email }}</div>
                    </TableCell>
                    <TableCell class="hidden sm:table-cell">{{ order.type }}</TableCell>
                    <TableCell class="hidden sm:table-cell">
                      <Badge class="text-xs" :variant="order.status === 'Fulfilled' ? 'secondary' : 'outline'">
                        {{ order.status }}
                      </Badge>
                    </TableCell>
                    <TableCell class="hidden md:table-cell">{{ order.date }}</TableCell>
                    <TableCell class="text-right">{{ order.amount }}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

    <!-- Order Details -->
    <div>
      <Card class="overflow-hidden">
        <CardHeader class="flex flex-row items-start bg-muted/50">
          <div class="grid gap-0.5">
            <CardTitle class="group flex items-center gap-2 text-lg">
              Order ID: {{ dashboardData.orderDetails.id }}
              <Button size="icon" variant="outline" class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
                <Icon name="ph:copy" class="h-3 w-3" />
                <span class="sr-only">Copy Order ID</span>
              </Button>
            </CardTitle>
            <CardDescription>Date: {{ dashboardData.orderDetails.date }}</CardDescription>
          </div>
          <div class="ml-auto flex items-center gap-1">
            <Button size="sm" variant="outline" class="h-8 gap-1">
              <Icon name="ph:truck" class="h-3.5 w-3.5" />
              <span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Track Order</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button size="icon" variant="outline" class="h-8 w-8">
                  <Icon name="ph:dots-three-vertical" class="h-3.5 w-3.5" />
                  <span class="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem v-for="action in dashboardData.orderDetails.actions" :key="action">{{ action }}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent class="p-6 text-sm">
          <!-- Order Details content -->
          <div class="grid gap-3">
            <div class="font-semibold">Order Details</div>
            <ul class="grid gap-3">
              <li v-for="item in dashboardData.orderDetails.items" :key="item.name" class="flex items-center justify-between">
                <span class="text-muted-foreground">{{ item.name }} x {{ item.quantity }}</span>
                <span>{{ item.price }}</span>
              </li>
            </ul>
            <Separator class="my-2" />
            <ul class="grid gap-3">
              <li v-for="summary in dashboardData.orderDetails.summary" :key="summary.label" class="flex items-center justify-between" :class="{ 'font-semibold': summary.label === 'Total' }">
                <span class="text-muted-foreground">{{ summary.label }}</span>
                <span>{{ summary.value }}</span>
              </li>
            </ul>
          </div>
          <!-- Additional sections like Shipping, Billing, Customer, and Payment Information -->
        </CardContent>
        <CardFooter class="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div class="text-xs text-muted-foreground">
            Updated <time :dateTime="dashboardData.orderDetails.updatedAt">{{ dashboardData.orderDetails.updatedAt }}</time>
          </div>
          <Pagination class="ml-auto mr-0 w-auto">
            <PaginationList class="gap-1">
              <PaginationPrev variant="outline" class="h-6 w-6" />
              <PaginationNext variant="outline" class="h-6 w-6" />
            </PaginationList>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>

<script setup lang="ts">

interface DashboardData {
  summaryCards: Array<{
    title: string;
    value: string;
    change: string;
    progressValue: number;
  }>;
  ordersOverview: {
    title: string;
    description: string;
    buttonText: string;
  };
  ordersTabs: {
    defaultTab: string;
    tabs: string[];
    filters: string[];
  };
  ordersTable: {
    headers: string[];
    orders: Array<{
      customer: string;
      email: string;
      type: string;
      status: string;
      date: string;
      amount: string;
    }>;
  };
  orderDetails: {
    id: string;
    date: string;
    actions: string[];
    items: Array<{
      name: string;
      quantity: number;
      price: string;
    }>;
    summary: Array<{
      label: string;
      value: string;
    }>;
    updatedAt: string;
  };
}

const dashboardData = ref({
  summaryCards: [
    {
      title: "This Week",
      value: "$1329",
      change: "+25% from last week",
      progressValue: 25
    },
    {
      title: "This Month",
      value: "$5,329",
      change: "+10% from last month",
      progressValue: 10
    },
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      progressValue: 20
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180.1% from last month",
      progressValue: 80
    }
  ],
  ordersOverview: {
    title: "Your Orders",
    description: "Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.",
    buttonText: "Create New Order"
  },
  ordersTabs: {
    defaultTab: "week",
    tabs: ["Week", "Month", "Year"],
    filters: ["Fulfilled", "Declined", "Refunded"]
  },
  ordersTable: {
    headers: ["Customer", "Type", "Status", "Date", "Amount"],
    orders: [
      {
        customer: "Liam Johnson",
        email: "liam@example.com",
        type: "Sale",
        status: "Fulfilled",
        date: "2023-06-23",
        amount: "$250.00"
      },
      {
        customer: "Olivia Smith",
        email: "olivia@example.com",
        type: "Refund",
        status: "Declined",
        date: "2023-06-24",
        amount: "$150.00"
      },
      {
        customer: "Noah Williams",
        email: "noah@example.com",
        type: "Subscription",
        status: "Fulfilled",
        date: "2023-06-25",
        amount: "$350.00"
      },
      {
        customer: "Emma Brown",
        email: "emma@example.com",
        type: "Sale",
        status: "Fulfilled",
        date: "2023-06-26",
        amount: "$450.00"
      },
      {
        customer: "Liam Johnson",
        email: "liam@example.com",
        type: "Sale",
        status: "Fulfilled",
        date: "2023-06-23",
        amount: "$250.00"
      }
    ]
  },
  orderDetails: {
    id: "Oe31b70H",
    date: "November 23, 2023",
    actions: ["Edit", "Export", "Trash"],
    items: [
      { name: "Glimmer Lamps", quantity: 2, price: "$250.00" },
      { name: "Aqua Filters", quantity: 1, price: "$49.00" }
    ],
    summary: [
      { label: "Subtotal", value: "$299.00" },
      { label: "Shipping", value: "$5.00" },
      { label: "Tax", value: "$25.00" },
      { label: "Total", value: "$329.00" }
    ],
    shippingInfo: {
      name: "Liam Johnson",
      address: "1234 Main St.",
      city: "Anytown, CA 12345"
    },
    billingInfo: "Same as shipping address",
    customerInfo: {
      name: "Liam Johnson",
      email: "liam@acme.com",
      phone: "+1 234 567 890"
    },
    paymentInfo: {
      method: "Visa",
      cardNumber: "**** **** **** 4532"
    },
    updatedAt: "2023-11-23T12:00:00Z"
  }
});

</script>