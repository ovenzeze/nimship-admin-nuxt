import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { type Database } from '~/types/database'

dayjs.extend(utc)

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
  warehouse: string;
  driver_id: number;
  routing_ending?: string;
  account_ending?: string;
  routing: string;
  account: string;
  payment_status: PaymentStatusInfo;
  payment_time: string;
}

interface ReadableDriver extends HaulblazeContact {
  name: string;

}
/**
 * Enum representing the payment status
 */
enum PaymentStatus {
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
type PaymentStatusInfo = {
  name: string;
  status: string;
  color: string;
}

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
  }
}
export type { ReadablePaymentRecord, ReadableDriver, DriverPaymentRecord, PaymentStatus, PaymentStatusInfo, PaymentRecord, HaulblazeContact, PaymentStatusItem }
export { getReadablePaymentRecord, getReadableDriver, paymentStatusMap }

