import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import type { PayRecord, PaymentRecord, PaymentStatusInfo, Contact, HaulblazeContact, Warehouse, TeamName } from "~/types"
import { paymentStatusMap, type FetchPayRecord, type OriginPaymentStatus } from "~/types/payment"

dayjs.extend(utc)

/**
 * Map of payment status to their corresponding information
 */

const getPayRcord = (driver: FetchPayRecord): FetchPayRecord => {
  const cycleStart = dayjs.utc(driver.cycle_start).format('MM/DD/YYYY')
  const cycleEnd = dayjs.utc(driver.cycle_start).add(6, 'day').format('MM/DD/YYYY')
  const name = String(driver.contact?.first_name).toUpperCase() + ' ' + String(driver.contact?.last_name).toUpperCase()

  return {
    ...driver,
    name,
    full_name: name,
    formattedGrossPay: driver.formattedGrossPay || '',
    formattedNetPay: driver.formattedNetPay || '',
    formattedDeductionAmount: driver.formattedDeductionAmount || '',
    formattedCycleStart: driver.formattedCycleStart || cycleStart,
    formattedPaymentDate: driver.payment_time ? dayjs(driver.payment_time).format('MM/DD/YYYY HH:mm:ss') : undefined,
    formattedActualAmountPaid: driver.formattedActualAmountPaid || '',
    status: paymentStatusMap[driver.payment_method as OriginPaymentStatus]?.status || 'PENDING',
    cycle_start: cycleStart,
    cycle_end: cycleEnd,
    team_name: driver.team_name as TeamName,
    warehouse: driver.warehouse as Warehouse,
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

export type { PaymentRecord, HaulblazeContact }
export { getPayRcord, getContact }
