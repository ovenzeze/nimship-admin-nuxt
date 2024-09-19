import type { DeliveryRecordView } from ".";

export interface DeliveryFilters {
  dateRange: { from: Date | null; to: Date | null } | null
  warehouse_id: string | null
  status: string | null
  driver_id: string | null
  searchQuery: string
}

export interface SortingState {
  id: string
  desc: boolean
}[]

export interface ColumnFiltersState {
  id: string
  value: unknown
}[]

export interface PaginationState {
  pageIndex: number
  pageSize: number
}

export interface DeliveryTableProps {
  data: DeliveryRecordView[]
  columns: DeliveryRecordView[]
  class?: string
}

export interface DeliveryTableRowProps {
  row: DeliveryRecordView
  index: number
  rowHeight: number
}

export interface DeliveryTableEmits {
  (e: 'select-record', record: DeliveryRecordView): void
  (e: 'update:sorting', sorting: SortingState): void
  (e: 'update:columnFilters', columnFilters: ColumnFiltersState): void
  (e: 'delete-record', record: DeliveryRecordView): void
  (e: 'transfer-record', data: { record: DeliveryRecordView; newDriverId: number }): void
}

export interface DeliveryTableRowEmits {
  (e: 'delete', record: DeliveryRecordView): void
  (e: 'transfer', record: DeliveryRecordView): void
}


export interface ReadbleDeliveryRecord extends DeliveryRecordView {
  payment: PaymentRecord
  contact: HaulblazeContact
  status: PaymentStatus

}