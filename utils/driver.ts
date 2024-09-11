import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import type { ReadablePaymentRecord, PaymentStatusInfo, DriverPaymentRecord, ReadableDriver } from "~/types"
import { PaymentStatus } from '~/types/index'
import { type Database } from '~/types/database'

dayjs.extend(utc)

type PaymentRecord = Database['public']['Tables']['payment_record']['Row']
type HaulblazeContact = Database['public']['Tables']['haulblaze_contact']['Row']

type PaymentStatusItem = { [key in PaymentStatus]: PaymentStatusInfo }
/**
 * Map of payment status to their corresponding information
 */
const paymentStatusMap: PaymentStatusItem = {
  [PaymentStatus.PENDING]: { name: 'PENDING', status: 'PENDING', color: 'red' },
  [PaymentStatus.PAID_ACH]: { name: 'PAID - ACH', status: 'PAID', color: 'blue' },
  [PaymentStatus.PAID_CHECK]: { name: 'PAID - CHECK', status: 'PAID', color: 'blue' },
  [PaymentStatus.PAID_ZELLE]: { name: 'PAID - ZELLE', status: 'PAID', color: 'blue' },
  [PaymentStatus.PAID_CASH]: { name: 'PAID - CASH', status: 'PAID', color: 'blue' },
  [PaymentStatus.UNPAID_HOLD]: { name: 'UNPAID - HOLD', status: 'HOLD', color: 'orange' },
  [PaymentStatus.PAID_VOID]: { name: 'PAID - VOID', status: 'VOID', color: 'gray' },
  [PaymentStatus.OTHERS]: { name: 'OTHERS', status: 'PAID', color: 'purple' },
};

/**
 * Converts a DriverPaymentRecord to a ReadablePaymentRecord
 * @param driver - The original driver payment record
 * @returns A ReadablePaymentRecord object with formatted information
 */
const getReadablePaymentRecord = (driver: DriverPaymentRecord): ReadablePaymentRecord => {
  const { haulblaze_contact, deductions = [] } = driver || {}
  const cycleStart = dayjs.utc(driver.cycle_start).format('MM/DD/YYYY')
  const cycleEnd = dayjs.utc(driver.cycle_start).add(6, 'day').format('MM/DD/YYYY')

  return {
    ...driver,
    name: String(haulblaze_contact?.first_name).toUpperCase() + ' ' + String(haulblaze_contact?.last_name).toUpperCase(),
    cycle_start: cycleStart,
    cycle_end: cycleEnd,
    warehouse: driver.warehouse,
    driver_id: Number(driver.custom_uid),
    routing: haulblaze_contact?.routing_number,
    account: haulblaze_contact?.account_number,
    routing_ending: haulblaze_contact?.routing_number?.slice(-4),
    account_ending: haulblaze_contact?.account_number?.slice(-4),
    payment_time: dayjs(driver.payment_time).format('MM/DD/YYYY HH:mm:ss'),
    payment_status: paymentStatusMap[driver.payment_method as PaymentStatus] || paymentStatusMap[PaymentStatus.OTHERS],
  }
}

const getReadableDriver = (driver: HaulblazeContact): ReadableDriver => {
  return {
    ...driver,
    name: String(driver.first_name).toUpperCase() + ' ' + String(driver.last_name).toUpperCase(),
    qualification: { dl: true, tax: true, vehicle: false },
  }
}
export type { DriverPaymentRecord, PaymentStatus, PaymentStatusInfo, PaymentRecord, HaulblazeContact, PaymentStatusItem }
export { getReadablePaymentRecord, getReadableDriver, paymentStatusMap }
