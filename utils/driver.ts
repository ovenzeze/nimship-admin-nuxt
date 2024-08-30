import dayjs from "dayjs"
import { type Database } from '~/types/database'

type PaymentRecord = Database['public']['Tables']['payment_record']['Row']
type HaulblazeContact = Database['public']['Tables']['haulblaze_contact']['Row']

/**
 * Represents the original driver payment record
 */
interface DriverPaymentRecord extends PaymentRecord {
  haulblaze_contact?: HaulblazeContact;
  deductions?: any[];
}

/**
 * Represents the readable driver payment information
 */
interface ReadablePaymentRecord extends DriverPaymentRecord {
  name: string;
  cycle_start: string;
  cycle_end: string;
  routing_ending?: string;
  account_ending?: string;
  routing: string;
  account: string;
  paymentStatus: PaymentStatusInfo;
  payment_time: string;
}

/**
 * Enum representing the payment status
 */
export enum PaymentStatus {
  PENDING = 0,
  PAID_ACH = 91,
  PAID_CHECK = 92,
  PAID_ZELLE = 93,
  PAID_CASH = 99,
  UNPAID_HOLD = 101,
  PAID_VOID = 102,
  OTHERS = 100,
}

/**
 * Type representing the payment status information
 */
export type PaymentStatusInfo = {
  name: string;
  status: string;
  color: string;
}

/**
 * Map of payment status to their corresponding information
 */
export const paymentStatusMap: Record<PaymentStatus, PaymentStatusInfo> = {
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
export const getReadablePaymentRecord = (driver: DriverPaymentRecord): ReadablePaymentRecord => {
  const { haulblaze_contact, deductions = [] } = driver
  return {
    ...driver,
    name: String(haulblaze_contact?.first_name).toUpperCase() + ' ' + String(haulblaze_contact?.last_name).toUpperCase(),
    cycle_start: dayjs(driver.cycle_start).format('MM/DD/YYYY'),
    cycle_end: dayjs(driver.cycle_end).format('MM/DD/YYYY'),
    warehouse: driver.warehouse,
    routing: haulblaze_contact?.routing_number,
    account: haulblaze_contact?.account_number,
    routing_ending: haulblaze_contact?.routing_number?.slice(-4),
    account_ending: haulblaze_contact?.account_number?.slice(-4),
    payment_time: dayjs(driver.payment_time).format('MM/DD/YYYY HH:mm:ss'),
    paymentStatus: paymentStatusMap[driver.payment_status as PaymentStatus] || paymentStatusMap[PaymentStatus.OTHERS],
  }
}

const isMobile = () => {
  return window.innerWidth <= 768;
}

export type { ReadablePaymentRecord, DriverPaymentRecord }
