import { format } from 'date-fns'
import { del } from 'nuxt/dist/app/compat/capi'
import { DeliveryRecordView } from '../types/index';
import type { ReadbleDeliveryRecord } from '~/types/delivery';

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

export const getReadbleDeliveryRecord = (DeliveryRecordView: DeliveryRecordView): ReadbleDeliveryRecord => {
const { paymentRecord = {}, haulblazeContact = {} } = DeliveryRecordView;
}     