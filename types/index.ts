import type { Database, Enums } from './database'

// Database types
export type DeliveryRecordView = Database['public']['Views']['delivery_records_view']['Row']
export type PaymentRecord = Database['public']['Tables']['payment_record']['Row']
export type HaulblazeContact = Database['public']['Tables']['haulblaze_contact']['Row']


// Enum types
export type DriverType = Database['public']['Enums']['driver_type_enum']

export type Status = Database['public']['Enums']['status_enum']

export type Warehouse = Database['public']['Enums']['warehouse_enum']

export type TeamName = Database['public']['Enums']['team_name_enum']

export type CustomId = Database['public']['Enums']['custom_id_enum']



export type ReadbleContact = Database['public']['Tables']['haulblaze_contact']['Row'] & {
    employment_status?: string;
    name: string,
    qualification: Qualification
}


// Enum generator from database types
export const HaulblazeContactFields = createEnumFromType<ReadbleContact>();

export const PaymentRecordFields = createEnumFromType<PaymentRecord>();
export enum EnumType {
    'CYCLE' = 'CYCLE',
    'WAREHOUSE_CODE' = 'WAREHOUSE_CODE',
    'TEAM_NAME' = 'TEAM_NAME',
    'DRIVER_TYPE' = 'DRIVER_TYPE',
    'STATUS' = 'STATUS'
}

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

// Interface types
export interface EnumItem {
    id?: number
    label: string
    value: string
    type: string
}

export interface PayCycle {
    cycle: string
    start: string
    end: string
}

export interface FilterOptions {
    warehouse: string
    status: string
    team?: string
    cycle?: string
}

export interface DeliveryFilters {
    cycle_start?: string
    warehouse_id?: string
    team?: string
    status?: string
    driver_id?: string
    uid?: string
}

export interface DriverFilters {
    warehouse: string | null
    team_name: string
    driver_type: string | null
    status: string | null
    employment_status: string | null
}

export type Qualification = {
    insurance: boolean
    tax: boolean
    vehicle: boolean
}

export type QualificationIcon = {
    name: string
    icon: string
    tooltip: string
}

export interface Column {
    key: keyof DeliveryRecordView
    label: string
}

export interface DriverColumn {
    id: keyof ReadbleContact
    header: string
}

export interface ReadablePaymentRecord extends DriverPaymentRecord {
    name: string
    cycle_start: string
    cycle_end: string
    warehouse: string
    driver_id: number
    routing_ending?: string
    account_ending?: string
    routing: string
    account: string
    payment_status: PaymentStatusInfo
    payment_time: string
}

export interface DriverPaymentRecord extends PaymentRecord {
    haulblaze_contact?: HaulblazeContact
    deductions?: any[]
}

// Type aliases
export type IconTypes = string

export type SortingState = {
    id: string
    desc: boolean
}[]

export type ColumnFiltersState = {
    id: string
    value: any
}[]

export type VisibilityState = {
    [key: string]: boolean
}

export type PaginationState = {
    pageIndex: number
    pageSize: number
}

// export type Qualification = {
//     dl: boolean
//     tax: boolean
//     vehicle: boolean
// }

export type PaymentStatusInfo = {
    name: string
    status: string
    color: string
}

export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
} : T

export type PickByValueType<T, ValueType> = Pick<T, {
    [Key in keyof T]: T[Key] extends ValueType ? Key : never
}[keyof T]>

// Add any other types you need for your application
