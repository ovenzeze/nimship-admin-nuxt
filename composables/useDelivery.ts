import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'
import type { DeliveryRecordView, DeliveryFilters, SortingState, ColumnFiltersState, PaginationState } from '~/types'

export function useDelivery() {
    const supabase = useSupabaseClient<Database>()
    const deliveryRecords = ref<DeliveryRecordView[]>([])
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const totalCount = ref(0)

    const fetchDeliveryRecords = async (
        filters: DeliveryFilters = {},
        sorting: SortingState = [],
        columnFilters: ColumnFiltersState = [],
        pagination: PaginationState = { pageIndex: 0, pageSize: 10 }
    ) => {
        console.log('Fetching delivery records with:', { filters, sorting, columnFilters, pagination })
        loading.value = true
        error.value = null

        try {
            let query = supabase
                .from('delivery_records_view')
                .select('*', { count: 'exact' })
                .order('cycle_start', { ascending: false })

            console.log('Initial query:', query)

            // Apply filters
            if (filters.dateRange) {
                query = query.gte('date', filters.dateRange[0]).lte('date', filters.dateRange[1])
                console.log('Applied date range filter:', filters.dateRange)
            }
            if (filters.warehouse_id) {
                query = query.eq('warehouse', filters.warehouse_id)
                console.log('Applied warehouse filter:', filters.warehouse_id)
            }
            if (filters.status) {
                query = query.eq('payment_status', filters.status)
                console.log('Applied status filter:', filters.status)
            }
            if (filters.driver_id) {
                query = query.eq('driver_uid', filters.driver_id)
                console.log('Applied driver filter:', filters.driver_id)
            }

            // Apply sorting
            sorting.forEach(sort => {
                query = query.order(sort.id, { ascending: !sort.desc })
                console.log('Applied sorting:', sort)
            })

            // Apply column filters
            columnFilters.forEach(filter => {
                query = query.eq(filter.id, filter.value)
                console.log('Applied column filter:', filter)
            })

            // Apply pagination
            const from = pagination.pageIndex * pagination.pageSize
            const to = from + pagination.pageSize - 1
            query = query.range(from, to)
            console.log('Applied pagination:', { from, to })

            console.log('Final query:', query)

            const { data, error: fetchError, count } = await query

            if (fetchError) throw fetchError

            console.log('Fetched data:', data)
            console.log('Total count:', count)

            deliveryRecords.value = data as DeliveryRecordView[]
            totalCount.value = count || 0
        } catch (e) {
            error.value = e instanceof Error ? e : new Error('An unknown error occurred')
            console.error('Error fetching delivery records:', e)
        } finally {
            loading.value = false
            console.log('Fetch operation completed. Loading:', loading.value)
        }
    }

    return {
        deliveryRecords,
        loading,
        error,
        totalCount,
        fetchDeliveryRecords
    }
}