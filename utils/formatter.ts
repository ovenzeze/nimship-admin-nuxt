import { format } from 'date-fns'
import type { DriverPaymentRecord } from '../types/payment'

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'MM/dd/yy')
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return `${format(start, 'MM/dd')} - ${format(end, 'MM/dd')}`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export const getFormattedPaymentRecord = (record: DriverPaymentRecord): DriverPaymentRecord & { formattedGrossPay: string, formattedNetPay: string, formattedDeductionAmount: string, formattedCycleStart: string, formattedPaymentDate?: string, formattedActualAmountPaid?: string } => {
  return {
    ...record,
    formattedGrossPay: formatCurrency(record.gross_pay),
    formattedNetPay: formatCurrency(record.net_pay),
    formattedDeductionAmount: formatCurrency(record.deduction_amount),
    formattedCycleStart: formatDate(record.cycle_start),
    formattedPaymentDate: record.payment_date ? formatDate(record.payment_date) : undefined,
    formattedActualAmountPaid: record.actual_amount_paid ? formatCurrency(record.actual_amount_paid) : undefined,
  }
}
