import type { TeamName, Warehouse as BaseWarehouse, PayRecord, PaymentRecord } from "."
import type { Database } from './database'

export type Warehouse = BaseWarehouse | 'ALL' | ''

export type FetchPaymentRecordsOptions = {
    warehouse?: Warehouse
    status?: OriginPaymentStatus[]
    team?: TeamName
    cycle_start?: string
    page?: number
}

export type FetchPayRecord = Omit<PaymentRecord, 'haulblaze_contact'> & {
    contact?: {
        first_name: string,
        last_name: string,
        email: string | null,
        phone: string | null,
        driver_license_no: string | null,
        routing_number?: string,
        account_number?: string,
    },
    name: string,
    full_name: string,
    formattedGrossPay: string,
    formattedNetPay: string,
    formattedDeductionAmount: string,
    formattedCycleStart: string,
    formattedPaymentDate?: string,
    formattedActualAmountPaid?: string,
    status: string,
    haulblaze_contact?: Database['public']['Tables']['haulblaze_contact']['Row'] | null
}

enum OriginPaymentStatus {
    PENDING = 0,
    PAID_ACH = 91,
    PAID_CHECK = 92,
    PAID_ZELLE = 93,
    PAID_CASH = 99,
    UNPAID_HOLD = 101,
    PAID_VOID = 102,
    OTHERS = 100,
}

type MainPayStatus = 'ALL' | 'PENDING' | 'HOLD' | 'PAID'

type PaymentStatusItem = { [key in OriginPaymentStatus]: { name: string, status: MainPayStatus, color: string, origin?: OriginPaymentStatus } }
/**
 * Map of payment status to their corresponding information
 */
export const paymentStatusMap: PaymentStatusItem = {
    [OriginPaymentStatus.PENDING]: { name: 'PENDING', status: 'PENDING', color: 'red' },
    [OriginPaymentStatus.PAID_ACH]: { name: 'PAID - ACH', status: 'PAID', color: 'blue' },
    [OriginPaymentStatus.PAID_CHECK]: { name: 'PAID - CHECK', status: 'PAID', color: 'blue' },
    [OriginPaymentStatus.PAID_ZELLE]: { name: 'PAID - ZELLE', status: 'PAID', color: 'blue' },
    [OriginPaymentStatus.PAID_CASH]: { name: 'PAID - CASH', status: 'PAID', color: 'blue' },
    [OriginPaymentStatus.UNPAID_HOLD]: { name: 'UNPAID - HOLD', status: 'HOLD', color: 'orange' },
    [OriginPaymentStatus.PAID_VOID]: { name: 'PAID - VOID', status: 'PAID', color: 'gray' },
    [OriginPaymentStatus.OTHERS]: { name: 'OTHERS', status: 'PAID', color: 'purple' },
};

export type { OriginPaymentStatus, MainPayStatus, PaymentStatusItem }

