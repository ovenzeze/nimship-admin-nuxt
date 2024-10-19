import type { Database } from './database'
import { createEnumFromType } from '~/utils/index'
import type { FetchPayRecord } from './payment'
import type { VNode } from 'vue'

// Database types
export type DeliveryRecordView = Database['public']['Views']['delivery_records_view']['Row']
export type PaymentRecord = Database['public']['Tables']['payment_record']['Row']
export type HaulblazeContact = Database['public']['Tables']['haulblaze_contact']['Row'] & {
    employment_status?: string;
    name: string;
    qualification: Qualification;
    account_number: string | null;
    commisson_rate: number;
    date_of_birth: string;
    dl_expired_time: string | null;
    driver_id: number[];
    driver_license_no: string | null;
    driver_type: "HAULER" | "TRUCK" | "FLEET" | "MANAGER" | "OTHERS";
    zelle: string | null;
}

// Enum types
export type DriverType = Database['public']['Enums']['driver_type_enum']
export type Status = Database['public']['Enums']['status_enum']
export type Warehouse = Database['public']['Enums']['warehouse_enum'] | 'ALL' | ''
export type TeamName = Database['public']['Enums']['team_name_enum']
export type CustomId = Database['public']['Enums']['custom_id_enum']

export type Contact = HaulblazeContact

export type PayRecord = FetchPayRecord

// Enum generator from database types
export const HaulblazeContactFields = createEnumFromType<Contact>()
export const PayRecordFields = createEnumFromType<PayRecord>()

export enum EnumType {
    CYCLE = 'CYCLE',
    WAREHOUSE_CODE = 'WAREHOUSE_CODE',
    TEAM_NAME = 'TEAM_NAME',
    DRIVER_TYPE = 'DRIVER_TYPE',
    STATUS = 'STATUS',
    DRIVER_ID = 'DRIVER_ID'
}

// Interface types
export interface EnumItem {
    id?: number
    label: string
    value: string
    type: EnumType | string
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
    uid: string | null
}

export type Qualification = {
    insurance: boolean
    license: boolean
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
    id: keyof Contact
    header: string
    cell: (props: any) => VNode
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
    index: number
    size: number
    total?: number
}

export type PaymentStatusInfo = {
    name: string
    status: 'PENDING' | 'PAID' | 'HOLD' | 'VOID'
    color: string
}

export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
} : T

export type PickByValueType<T, ValueType> = Pick<T, {
    [Key in keyof T]: T[Key] extends ValueType ? Key : never
}[keyof T]>

export interface NavItem {
    name: string;
    icon: string;
    href: string;
    active?: boolean;
    requiresAuth: boolean;
    disabled?: boolean;
    children?: NavItem[];
}

export interface FilterConfig {
    key: string
    type: string
    placeholder: string
    options: { value: string | number; label: string }[]
    enumType: string
    multiple?: boolean
    dynamicOptions?: boolean
    as?: 'Button' | 'Select' | 'auto'
}

export interface FilterOption {
    value: string | number
    label: string
    cycle?: string
    start?: string
    end?: string
}

export interface FilterParam {
    // Add properties if needed
}

export interface driverTypes {
    TableSort: {
        column: string;
        direction: "desc" | "asc";
    },
    DriverFilters: {
        warehouse: string | null;
        cycle_start: string | null;
        team: string | null;
        driver_id: string | null;
        [key: string]: any;
    },
    TableColumn: {
        key: string;
        label: string;
        class?: string;
        sortable?: boolean;
    },
    pagination: {
        page: number;
        size?: number;
        total?: number;
        count?: number;
    }
}
