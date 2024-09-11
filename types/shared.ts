import type { Database } from './database'

// Shared types
export interface EnumItem {
  id: number;
  label: string;
  value: string;
  type: string;
}

export type EnumType = 'CYCLE' | 'WAREHOUSE_CODE' | 'TEAM_NAME'

export interface PayCycle {
  cycle: string;
  start: string;
  end: string;
}

export interface FilterOptions {
  warehouse: string;
  status: string;
}

// Utility types
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type PickByValueType<T, ValueType> = Pick<T, {
  [Key in keyof T]: T[Key] extends ValueType ? Key : never
}[keyof T]>;

// Mapped types from database
export type DeliveryRecord = Database['public']['Tables']['delivery_record']['Row']
export type PaymentRecord = Database['public']['Tables']['payment_record']['Row']

// Enum types
export type TeamName = Database['public']['Enums']['team_name_enum']
export type Warehouse = Database['public']['Enums']['warehouse_enum']
export type CustomId = Database['public']['Enums']['custom_id_enum']