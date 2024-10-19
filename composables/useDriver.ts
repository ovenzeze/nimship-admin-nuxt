// useDriver.ts
import { ref, reactive, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import { type HaulblazeContact, type DriverFilters, HaulblazeContactFields, type driverTypes } from '~/types'

export const useDriver = () => {
  const supabase = useSupabaseClient()
  const toast = useToast()

  const drivers = ref<HaulblazeContact[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const totalCount = ref(0)
  const pageIndex = ref(1)
  const pageSize = ref(20)
  const isSearchLoading = ref(false)
  const recentSearches = ref<HaulblazeContact[]>([])

  const state = reactive({
    filters: {} as DriverFilters,
    sorting: [] as driverTypes['TableSort'][],
    columnFilters: [] as { id: string; value: any }[]
  })

  const pagination = computed(() => ({
    index: pageIndex.value,
    size: pageSize.value,
    total: totalCount.value,
    from: (pageIndex.value - 1) * pageSize.value + 1,
    to: Math.min(pageIndex.value * pageSize.value, totalCount.value),
  }))

  const buildQuery = () => {
    let query = supabase
      .from('haulblaze_contact')
      .select('*', { count: 'exact' })

    // Apply filters
    if (state.filters.warehouse) query = query.eq('warehouse', state.filters.warehouse)
    if (state.filters.team_name) query = query.eq('team_name', state.filters.team_name)
    if (state.filters.driver_type) query = query.eq('driver_type', state.filters.driver_type)
    if (state.filters.status) query = query.eq('status', state.filters.status)
    if (state.filters.uid) query = query.eq('uid', state.filters.uid)
    if (state.filters.employment_status) query = query.eq('status', state.filters.employment_status)

    // Apply sorting
    state.sorting.forEach(sort => {
      query = query.order(sort.column, { ascending: sort.direction === 'asc' })
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

  const fetchDrivers = async () => {
    loading.value = true
    error.value = null

    try {
      const query = buildQuery()
      const { data, error: fetchError, count } = await query

      if (fetchError) throw fetchError

      drivers.value = data as HaulblazeContact[]
      totalCount.value = count || 0

      return { drivers: drivers.value, total: totalCount.value }
    } catch (err) {
      drivers.value = []
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
      console.error('Error fetching drivers:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const debouncedFetch = useDebounceFn(fetchDrivers, 300)

  const stripExtraProperties = (driver: HaulblazeContact): HaulblazeContact => {
    return {
      account_number: driver.account_number,
      commisson_rate: driver.commisson_rate,
      date_of_birth: driver.date_of_birth,
      dl_expired_time: driver.dl_expired_time,
      driver_id: driver.driver_id,
      driver_license_no: driver.driver_license_no,
      driver_type: driver.driver_type,
      email: driver.email,
      enroll_time: driver.enroll_time,
      first_name: driver.first_name,
      has_notification: driver.has_notification,
      haulblaze_id: driver.haulblaze_id,
      id: driver.id,
      last_name: driver.last_name,
      last_update: driver.last_update,
      mail_city: driver.mail_city,
      mail_state: driver.mail_state,
      mail_street: driver.mail_street,
      mail_zip: driver.mail_zip,
      phone: driver.phone,
      routing_number: driver.routing_number,
      social_security_no: driver.social_security_no,
      status: driver.status,
      team_name: driver.team_name,
      uid: driver.uid,
      warehouse: driver.warehouse,
      zelle: driver.zelle
    };
  }

  const updateDriver = async (driverUpdate: Partial<HaulblazeContact>) => {
    loading.value = true
    error.value = null

    try {
      if (!driverUpdate.uid) {
        throw new Error('Driver UID is required for update')
      }

      const { data, error: updateError } = await supabase
        .from('haulblaze_contact')
        .update(driverUpdate)
        .eq('uid', driverUpdate.uid)
        .select()

      if (updateError) throw updateError

      toast.add({
        title: 'Success update driver information.',
        icon: "i-heroicons-check-badge",
        id: driverUpdate.uid,
      })

      // Update the local state
      const index = drivers.value.findIndex(d => d.uid === driverUpdate.uid)
      if (index !== -1) {
        drivers.value[index] = { ...drivers.value[index], ...data[0] }
      }

      return drivers.value[index] as HaulblazeContact
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
      console.error('Error updating driver:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createDriver = async (driver: Omit<HaulblazeContact, 'uid'>) => {
    loading.value = true
    error.value = null

    try {
      const strippedDriver = stripExtraProperties(driver as HaulblazeContact);
      const { data, error: createError } = await supabase
        .from('haulblaze_contact')
        .insert(strippedDriver)
        .select()

      if (createError) throw createError

      // Add the new driver to the local state
      drivers.value.push(data[0] as HaulblazeContact)

      return data[0] as HaulblazeContact
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
      console.error('Error creating driver:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchDrivers = async (query: string) => {
    error.value = null
    isSearchLoading.value = true

    try {
      let searchCondition: string

      // 检查查询是否为纯数字
      if (/^\d+$/.test(query)) {
        // 如果是纯数字，搜索 driver_id
        searchCondition = `driver_id.cs.{${query}}`
      } else {
        // 如果不是纯数字，只搜索 first_name 和 last_name
        searchCondition = `first_name.ilike.%${query}%,last_name.ilike.%${query}%`
      }

      console.log('[searchDrivers]Req:', searchCondition)
      const { data, error: searchError } = await supabase
        .from('haulblaze_contact')
        .select('*')
        .or(searchCondition)
        .limit(10)

      if (searchError) throw searchError

      console.log('[searchDrivers]Rsp:', data)

      return data as HaulblazeContact[]
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
      console.error('Error searching drivers:', err)
      throw err
    } finally {
      setTimeout(() => isSearchLoading.value = false, 400)
    }
  }

  const addToRecentSearches = (driver: HaulblazeContact) => {
    const index = recentSearches.value.findIndex(d => d.uid === driver.uid)
    if (index !== -1) recentSearches.value.splice(index, 1)
    recentSearches.value.unshift(driver)
    if (recentSearches.value.length > 5) recentSearches.value.pop()
  }

  const getFrequentlyUsedDrivers = async () => {
    error.value = null
    isSearchLoading.value = true

    try {
      const { data, error: fetchError } = await supabase
        .from('haulblaze_contact')
        .select('*')
        .order(HaulblazeContactFields.last_update, { ascending: false })
        .limit(10)

      if (fetchError) throw fetchError

      return data as HaulblazeContact[]
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
      console.error('Error fetching frequently used drivers:', err)
      throw err
    } finally {
      isSearchLoading.value = false
    }
  }

  const setFilters = (filters: DriverFilters) => {
    state.filters = filters
    debouncedFetch()
  }

  const setSorting = (sorting: driverTypes['TableSort'][]) => {
    state.sorting = sorting
    debouncedFetch()
  }

  const setColumnFilters = (columnFilters: { id: string; value: any }[]) => {
    state.columnFilters = columnFilters
    debouncedFetch()
  }

  const setPagination = ({ page, size }: { page?: number; size?: number }) => {
    if (page !== undefined) pageIndex.value = page
    if (size !== undefined) pageSize.value = size
    debouncedFetch()
  }

  return {
    drivers,
    totalCount,
    loading,
    error,
    pagination,
    recentSearches,
    isSearchLoading,
    fetchDrivers,
    updateDriver,
    createDriver,
    searchDrivers,
    addToRecentSearches,
    getFrequentlyUsedDrivers,
    setFilters,
    setSorting,
    setColumnFilters,
    setPagination
  }
}
