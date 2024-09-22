import type { TeamName, Warehouse } from "."

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
    warehouse: Warehouse
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

export type PaymentStatusItem = string // You may want to define specific status values if known