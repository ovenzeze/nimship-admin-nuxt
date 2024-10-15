// useDriver.ts
import { ref, computed } from 'vue'
import { type HaulblazeContact, type DriverFilters, HaulblazeContactFields, type driverTypes } from '~/types'

export const useDriver = () => {
  const supabase = useSupabaseClient()
  const drivers = ref<HaulblazeContact[]>([])
  const totalCount = ref(0)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const recentSearches = ref<HaulblazeContact[]>([])
  const isLoading = ref(false)

  const fetchDrivers = async (
    pagination?: driverTypes['pagination'],
    sort?: driverTypes['TableSort'],
    filters?: driverTypes['DriverFilters'],
  ) => {
    loading.value = true
    error.value = null

    console.log('[fetchDrivers]', pagination, filters, sort)
    try {
      let query = supabase
        .from('haulblaze_contact')
        .select('*', { count: 'exact' })

      // Apply filters
      if (filters) {
        if (filters?.warehouse) query = query.eq('warehouse', filters.warehouse)
        if (filters.team) query = query.eq('team_name', filters.team)
        if (filters.driver_type) query = query.eq('driver_type', filters.driver_type)
        if (filters.status) query = query.eq('status', filters.status)
        if (filters.uid) query = query.eq('uid', filters.uid)
        if (filters.employment_status) query = query.eq('status', filters.employment_status)
      }

      // // Apply search
      // if (search) {
      //   query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,driver_id.eq.${search}`)
      // }

      // Apply status filter
      // if (statusFilter && statusFilter.length > 0) {
      //   query = query.in('status', statusFilter)
      // }

      // Apply sorting
      if (sort) query = query.order(sort.column, { ascending: sort.direction === 'asc' })

      // Apply pagination
      const { page = 1, size = 20 } = pagination || {}
      const from = (page - 1) * size
      const to = from + size - 1
      query = query.range(from, to)

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        throw fetchError
      }

      drivers.value = data as HaulblazeContact[]
      totalCount.value = count || 0

      return { drivers: data as HaulblazeContact[], total: count || 0 }
    } catch (err) {
      error.value = err as Error
      console.error('Error fetching drivers:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

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

    return {
      uid,
      haulblaze_id,
      first_name,
      last_name,
      driver_type,
      email,
      phone,
      team_name,
      warehouse,
      status,
      enroll_time,
      dl_expired_time,
      available,
      rating,
      completed_trips
    };
  }

  const updateDriver = async (driver: HaulblazeContact) => {
    loading.value = true
    error.value = null

    try {
      const strippedDriver = stripExtraProperties(driver);
      const { data, error: updateError } = await supabase
        .from('haulblaze_contact')
        .update(strippedDriver)
        .eq('uid', driver.uid)
        .select()

      if (updateError) {
        throw updateError
      }

      // Update the local state
      const index = drivers.value.findIndex(d => d.uid === driver.uid)
      if (index !== -1) {
        drivers.value[index] = data[0] as HaulblazeContact
      }

      return data[0] as HaulblazeContact
    } catch (err) {
      error.value = err as Error
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

      if (createError) {
        throw createError
      }

      // Add the new driver to the local state
      drivers.value.push(data[0] as HaulblazeContact)

      return data[0] as HaulblazeContact
    } catch (err) {
      error.value = err as Error
      console.error('Error creating driver:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchDrivers = async (query: string) => {
    error.value = null
    const loadingTimeout = setTimeout(() => {
      isLoading.value = true
    }, 200)

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

      if (searchError) {
        throw searchError
      }

      console.log('[searchDrivers]Rsp:', data)

      return data as HaulblazeContact[]
    } catch (err) {
      error.value = err as Error
      console.error('Error searching drivers:', err)
      throw err
    } finally {
      clearTimeout(loadingTimeout)
      isLoading.value = false
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
    const loadingTimeout = setTimeout(() => { isLoading.value = true }, 200)

    try {
      const { data, error: fetchError } = await supabase
        .from('haulblaze_contact')
        .select('*')
        .order(HaulblazeContactFields.last_update, { ascending: false })
        .limit(10)

      if (fetchError) {
        throw fetchError
      }

      return data as HaulblazeContact[]
    } catch (err) {
      error.value = err as Error
      console.error('Error fetching frequently used drivers:', err)
      throw err
    } finally {
      clearTimeout(loadingTimeout)
      isLoading.value = false
    }
  }

  return {
    drivers,
    totalCount,
    loading,
    error,
    recentSearches,
    isLoading,
    fetchDrivers,
    updateDriver,
    createDriver,
    searchDrivers,
    addToRecentSearches,
    getFrequentlyUsedDrivers
  }
}


