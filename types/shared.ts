import type { HTMLAttributes } from 'vue'

export interface EnumItem {
  id: number
  label: string
  value: string
  type: string
}

export enum EnumType {
  'CYCLE' = 'CYCLE',
  'WAREHOUSE_CODE' = 'WAREHOUSE_CODE',
  'TEAM_NAME' = 'TEAM_NAME',
  'DRIVER_TYPE' = 'DRIVER_TYPE',
  'STATUS' = 'STATUS'
}

export interface PayCycle {
  cycle: string
  start: string
  end: string
}

export interface FilterOptions {
  warehouse: string
  status: string
}

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>
} : T

export type PickByValueType<T, ValueType> = Pick<T, {
  [Key in keyof T]: T[Key] extends ValueType ? Key : never
}[keyof T]>

export interface HaulblazeContact {
  id: string
  haulblaze_id: string
  first_name: string
  last_name: string
  driver_type: string
  email: string
  phone: string
  team_name: string
  warehouse: string
  status: string
  enroll_time: string
  dl_expired_time: string
  available: boolean
  rating: number
  completed_trips: number
}

export interface ReadableDriver extends HaulblazeContact {
  name: string
}

export interface DriverColumn {
  id: keyof ReadableDriver
  header: string
}

export interface DriverFilters {
  warehouse: string | null
  team_name: string | null
  driver_type: string | null
  status: string | null
}

// Add any other types you need for your application