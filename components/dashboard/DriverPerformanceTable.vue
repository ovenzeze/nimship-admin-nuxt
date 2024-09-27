<template>
  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Weekly Orders</TableHead>
          <TableHead>Weekly Income</TableHead>
          <TableHead>Weekly Deductions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="driver in drivers" :key="driver.id">
          <TableCell class="font-medium">{{ driver.name }}</TableCell>
          <TableCell>
            <Badge :variant="driver.status === 'Active' ? 'success' : 'warning'">
              {{ driver.status }}
            </Badge>
          </TableCell>
          <TableCell>{{ driver.weeklyOrders }}</TableCell>
          <TableCell>${{ driver.weeklyIncome.toLocaleString() }}</TableCell>
          <TableCell>${{ driver.weeklyDeduction.toLocaleString() }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  drivers: Array<{
    id: number
    name: string
    status: string
    weeklyOrders: number
    weeklyIncome: number
    weeklyDeduction: number
  }>
}>()
</script>
