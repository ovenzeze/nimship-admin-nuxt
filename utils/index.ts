import type { DeliveryRecordView } from "~/types"

export const calculateProfit = (row: DeliveryRecordView) => {
  const driverSalary = (row.total_order_cnt * row.settle_rate).toFixed(2)
  const income = (Number(row.total_salary).toFixed(2))
  const profit = (Number(income) - Number(driverSalary)).toFixed(2)
  const profitRate = (Number(profit) / Number(income)).toFixed(4)
  return { salary: driverSalary, income, profit, rate: profitRate }
}
