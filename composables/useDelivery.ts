import { ref, reactive, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'
import type { DeliveryRecordView, DeliveryFilters, SortingState, ColumnFiltersState, PaginationState } from '~/types'
import { useDebounceFn } from '@vueuse/core'

export function useDelivery() {
    const supabase = useSupabaseClient<Database>()
    const deliveryRecords = ref<DeliveryRecordView[]>([])
    const loading = ref(false)
    const error = ref<Error | null>(null)
    const totalCount = ref(0)
    const pageIndex = ref(1)
    const pageSize = ref(20)


    const pagination = computed(() => ({
        index: pageIndex.value,
        size: pageSize.value,
        total: totalCount.value,
        from: (pageIndex.value - 1) * pageSize.value + 1,
        to: (pageIndex.value * pageSize.value > totalCount.value) ? totalCount.value : pageIndex.value * pageSize.value,
    }))

    const state = reactive({
        filters: { cycle_start: '' } as DeliveryFilters,
        sorting: [] as SortingState,
        columnFilters: [] as ColumnFiltersState
    })

    const buildQuery = () => {
        let query = supabase
            .from('delivery_records_view')
            .select('*', { count: 'exact' })
            .order('cycle_start', { ascending: false })

        console.log('[useDelivery]buildQuery => Filters:', state.filters)
        // Apply filters
        if (state.filters.uid) {
            query = query.eq('uid', state.filters.uid)
            pageIndex.value = 1
            state.filters.warehouse_id = undefined
        }
        if (state.filters.cycle_start) query = query.eq('cycle_start', state.filters.cycle_start)
        if (state.filters.warehouse_id) query = query.eq('warehouse', state.filters.warehouse_id)
        if (state.filters.status) query = query.eq('payment_status', state.filters.status)
        if (state.filters.team) query = query.eq('team_name', state.filters.team)
        if (state.filters.driver_id) query = query.eq('custom_uid', state.filters.driver_id)

        // Apply sorting
        state.sorting.forEach(sort => {
            query = query.order(sort.id, { ascending: !sort.desc })
        })

        // Apply column filters
        state.columnFilters.forEach(filter => {
            query = query.eq(filter.id, filter.value)
        })

        // Apply pagination
        const from = (pageIndex.value - 1) * pageSize.value
        const to = from + pageSize.value - 1
        query = query.range(from, to)

        return query
    }

    const fetchDeliveryRecords = async () => {
        loading.value = true
        error.value = null

        try {
            const query = buildQuery()

            const { data = [], error: fetchError, count } = await query

            if (fetchError) throw fetchError

            deliveryRecords.value = data as DeliveryRecordView[]
            totalCount.value = count || 0
            console.log('[useDelivery]fetchDeliveryRecords => Rsp:', 'totalCount:', totalCount.value, 'deliveryRecords:', deliveryRecords.value && deliveryRecords.value[0])
        } catch (e) {
            error.value = e instanceof Error ? e : new Error('An unknown error occurred')
            console.error('Error fetching delivery records:', e)
        } finally {
            loading.value = false
        }
    }

    const debouncedFetch = useDebounceFn(fetchDeliveryRecords, 300)

    const setFilters = (filters: DeliveryFilters) => {
        state.filters = filters
        debouncedFetch()
    }

    const resetFilter = () => {
        state.filters = {
            ...state.filters,
            uid: '',
            cycle_start: '',
            warehouse_id: '',
            status: '',
            driver_id: ''
        }
        debouncedFetch()
    }

    const setSorting = (sorting: SortingState) => {
        state.sorting = sorting
        debouncedFetch()
    }

    const setColumnFilters = (columnFilters: ColumnFiltersState) => {
        state.columnFilters = columnFilters
        debouncedFetch()
    }

    const setPagination = ({ page, size }: any): void => {
        if (page !== undefined) pageIndex.value = page
        if (size !== undefined) pageSize.value = size
        debouncedFetch()
    }

    const createDeliveryRecord = async (record: Omit<DeliveryRecordView, 'id'>) => {
        loading.value = true
        error.value = null
        try {
            const { data, error: createError } = await supabase
                .from('delivery_records')
                .insert(record)
                .single()

            if (createError) throw createError

            return data
        } catch (e) {
            error.value = e instanceof Error ? e : new Error('An error occurred while creating the record')
            console.error('Error creating delivery record:', e)
        } finally {
            loading.value = false
        }
    }

    const updateDeliveryRecord = async (id: number, updates: Partial<DeliveryRecordView>) => {
        loading.value = true
        error.value = null
        try {
            const { data, error: updateError } = await supabase
                .from('delivery_records')
                .update(updates)
                .eq('id', id)
                .single()

            if (updateError) throw updateError

            return data
        } catch (e) {
            error.value = e instanceof Error ? e : new Error('An error occurred while updating the record')
            console.error('Error updating delivery record:', e)
        } finally {
            loading.value = false
        }
    }

    const deleteDeliveryRecord = async (id: number) => {
        loading.value = true
        error.value = null
        try {
            const { error: deleteError } = await supabase
                .from('delivery_records')
                .delete()
                .eq('id', id)

            if (deleteError) throw deleteError

            return true
        } catch (e) {
            error.value = e instanceof Error ? e : new Error('An error occurred while deleting the record')
            console.error('Error deleting delivery record:', e)
        } finally {
            loading.value = false
        }
    }

    const onError = computed(() => (handler: (error: Error) => void) => {
        if (error.value) handler(error.value)
    })

    return {
        deliveryRecords,
        deliveryFilters: state.filters,
        pagination,
        loading,
        error,
        totalCount,
        setFilters,
        resetFilter,
        setSorting,
        setColumnFilters,
        setPagination,
        createDeliveryRecord,
        updateDeliveryRecord,
        deleteDeliveryRecord,
        onError
    }
}
