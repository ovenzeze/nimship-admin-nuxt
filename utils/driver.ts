import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import type { PayRecord, PaymentRecord, PaymentStatusInfo, Contact, HaulblazeContact, Warehouse, TeamName } from "~/types"
import { PaymentStatus } from '~/types/index'
import type { FetchPayRecord } from "~/types/payment"

dayjs.extend(utc)


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


const getPayRcord = (driver: FetchPayRecord): PayRecord => {
  const cycleStart = dayjs.utc(driver.cycle_start).format('MM/DD/YYYY')
  const cycleEnd = dayjs.utc(driver.cycle_start).add(6, 'day').format('MM/DD/YYYY')

  return {
    ...driver,
    name: String(driver.contact?.first_name).toUpperCase() + ' ' + String(driver.contact?.last_name).toUpperCase(),
    cycle_start: cycleStart,
    cycle_end: cycleEnd,
    team_name: driver.team_name as TeamName,
    warehouse: driver.warehouse as Warehouse,
    driver_id: Number(driver.custom_uid),
    account: driver.contact?.account_number || '',
    routing: driver.contact?.routing_number || '',
    routing_ending: driver.contact?.routing_number?.slice(-4) || '',
    account_ending: driver.contact?.account_number?.slice(-4) || '',
    payment_time: dayjs(driver.payment_time).format('MM/DD/YYYY HH:mm:ss'),
    payment_method: driver.payment_method as PaymentStatus,
    payment_status: paymentStatusMap[driver.payment_method as PaymentStatus] || paymentStatusMap[PaymentStatus.OTHERS],
  }
}

const getContact = (driver: HaulblazeContact): Contact => {
  return {
    ...driver,
    name: String(driver.first_name).toUpperCase() + ' ' + String(driver.last_name).toUpperCase(),
    qualification: { license: true, insurance: true, vehicle: false },
    driver_type: driver.driver_type || 'Unknown',
  }
}

export type { PaymentStatus, PaymentStatusInfo, PaymentRecord, HaulblazeContact, PaymentStatusItem }
export { getPayRcord, getContact, paymentStatusMap }
