import { ref, Ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { HaulblazeContact, DriverFilters } from '~/types'

export const useDriver = () => {
  const supabase = useSupabaseClient()
  const drivers: Ref<HaulblazeContact[]> = ref([])
  const totalCount: Ref<number> = ref(0)
  const loading: Ref<boolean> = ref(false)
  const error: Ref<Error | null> = ref(null)

  const fetchDrivers = async (
    filters: DriverFilters,
    sorting: { id: string; desc: boolean }[],
    columnFilters: { id: string; value: any }[],
    pagination: { pageIndex: number; pageSize: number }
  ) => {
    console.log('Fetching drivers with params:', { filters, sorting, columnFilters, pagination })
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('haulblaze_contact')
        .select('*', { count: 'exact' })

      // Apply filters
      if (filters.warehouse) {
        query = query.eq('warehouse', filters.warehouse)
      }
      if (filters.team_name) {
        query = query.eq('team_name', filters.team_name)
      }
      if (filters.driver_type) {
        query = query.eq('driver_type', filters.driver_type)
      }
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
      if (filters.employment_status) {
        query = query.eq('employment_status', filters.employment_status)
      }

      // Apply column filters
      columnFilters.forEach(filter => {
        query = query.ilike(filter.id, `%${filter.value}%`)
      })

      // Apply sorting
      sorting.forEach(sort => {
        query = query.order(sort.id, { ascending: !sort.desc })
      })

      // Apply pagination
      const from = pagination.pageIndex * pagination.pageSize
      const to = from + pagination.pageSize - 1
      query = query.range(from, to)

      console.log('Executing Supabase query')

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        throw fetchError
      }

      console.log('Fetched data:', data)
      console.log('Total count:', count)

      drivers.value = data as HaulblazeContact[]
      totalCount.value = count || 0
    } catch (err) {
      error.value = err as Error
      console.error('Error fetching drivers:', err)
    } finally {
      loading.value = false
    }
  }

  const stripExtraProperties = (driver: HaulblazeContact): Partial<HaulblazeContact> => {
    const {
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
    } = driver;

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

      console.log('Updated driver:', data)

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

      console.log('Created driver:', data)

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

  return {
    drivers,
    totalCount,
    loading,
    error,
    fetchDrivers,
    updateDriver,
    createDriver,
  }
}
