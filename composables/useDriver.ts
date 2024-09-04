import { ref } from 'vue'
import type { Database } from '~/types/database'

type Driver = Database['public']['Tables']['haulblaze_contact']['Row']

export function useDriver() {
  const supabase = useSupabaseClient<Database>()
  const drivers = ref<Driver[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const searchDrivers = async (query: string) => {
    isLoading.value = true
    error.value = null
    try {
      const { data, error: supabaseError } = await supabase
        .from('haulblaze_contact')
        .select()
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,haulblaze_id.ilike.%${query}%`)
        .limit(10)

      if (supabaseError) throw supabaseError

      drivers.value = data || []
    } catch (err) {
      console.error('Error searching drivers:', err)
      error.value = 'Failed to search drivers. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  const getRecentDrivers = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { data, error: supabaseError } = await supabase
        .from('haulblaze_contact')
        .select()
        .order('last_update', { ascending: false })
        .limit(5)

      if (supabaseError) throw supabaseError

      drivers.value = data || []
    } catch (err) {
      console.error('Error fetching recent drivers:', err)
      error.value = 'Failed to fetch recent drivers. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    drivers,
    isLoading,
    error,
    searchDrivers,
    getRecentDrivers,
  }
}