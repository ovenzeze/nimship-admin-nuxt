import type { TeamName, Warehouse as BaseWarehouse, PayRecord, PaymentRecord } from "."
import type { Database } from './database'

export type Warehouse = BaseWarehouse | 'ALL' | ''

export type FetchPaymentRecordsOptions = {
    warehouse?: Warehouse
    status?: PaymentStatusItem[]
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

export type PaymentStatusItem = 'ALL' | 'PENDING' | 'HOLD' | 'PAID'