import type { Database } from './database'

export type DeliveryRecordView = Database['public']['Views']['delivery_records_view']['Row']

export interface DeliveryFilters {
    dateRange?: [string, string];
    warehouse_id?: string;
    status?: string;
    driver_id?: string;
}

export interface Column {
    key: keyof DeliveryRecordView;
    label: string;
}

// 新增类型定义
export type SortingState = {
    id: string;
    desc: boolean;
}[]

export type ColumnFiltersState = {
    id: string;
    value: any;
}[]

export type VisibilityState = {
    [key: string]: boolean;
}

export type PaginationState = {
    pageIndex: number
    pageSize: number
}



