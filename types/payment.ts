import type { TeamName, Warehouse as BaseWarehouse } from "."

export type Warehouse = BaseWarehouse | 'ALL'

export type FetchPaymentRecordsOptions = {
    warehouse?: Warehouse
    status?: PaymentStatusItem[]
    team?: TeamName
    cycle_start?: string
    page?: number
}

export type DriverPaymentRecord = {
    uid: string
    gross_pay: number
    net_pay: number
    deduction_amount: number
    cycle_start: string
    warehouse: BaseWarehouse
    team_name: TeamName
    payment_method?: number
    payment_date?: string
    actual_amount_paid?: number
    status?: string
    haulblaze_contact?: {
        first_name: string
        last_name: string
        email: string
        phone: string
        driver_license_no: string
    }
    deductions?: {
        amount: number
        reason: string
        status: string
    }[]
}

export type ProcessedDriverPaymentRecord = DriverPaymentRecord & {
    name: string
    formattedGrossPay: string
    formattedNetPay: string
    formattedDeductionAmount: string
    formattedCycleStart: string
    formattedPaymentDate?: string
    formattedActualAmountPaid?: string
    status: string
}

export type PaymentStatusItem = 'ALL' | 'PENDING' | 'HOLD' | 'PAID'