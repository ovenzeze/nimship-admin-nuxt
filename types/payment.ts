import type { TeamName, Warehouse as BaseWarehouse, PayRecord, PaymentRecord } from "."

export type Warehouse = BaseWarehouse | 'ALL'

export type FetchPaymentRecordsOptions = {
    warehouse?: Warehouse
    status?: PaymentStatusItem[]
    team?: TeamName
    cycle_start?: string
    page?: number
}

export type FetchPayRecord = PaymentRecord & {

    contact?: {
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        driver_license_no: string,
        routing_number?: string,
        account_number?: string,
    },
    deductions?: {
        amount: number,
        reason: string,
        status: string,
    }[],
    full_name: string
    formattedGrossPay: string
    formattedNetPay: string
    formattedDeductionAmount: string
    formattedCycleStart: string
    formattedPaymentDate?: string
    formattedActualAmountPaid?: string
    status: string
}

export type PaymentStatusItem = 'ALL' | 'PENDING' | 'HOLD' | 'PAID'