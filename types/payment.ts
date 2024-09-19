import type { TeamName, Warehouse } from "."

export type FetchPaymentRecordsOptions = {
    warehouse?: Warehouse
    status?: PaymentStatusItem[]
    team?: TeamName
    cycle_start?: string
}