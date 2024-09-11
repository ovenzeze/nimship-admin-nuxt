import { ref } from 'vue'
import type { Database } from '~/types/database'

type Driver = Database['public']['Tables']['haulblaze_contact']['Row']

export function useDriver() {
  const supabase = useSupabaseClient<Database>()
  const drivers = ref<Driver[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const recentSearches = ref<Driver[]>([])

  const loadRecentSearches = () => {
    const storedSearches = localStorage.getItem('recentDriverSearches')
    recentSearches.value = storedSearches ? JSON.parse(storedSearches) : []
  }

  const addToRecentSearches = (driver: Driver) => {
    const updatedSearches = [driver, ...recentSearches.value.filter(d => d.uid !== driver.uid)].slice(0, 5)
    recentSearches.value = updatedSearches
    localStorage.setItem('recentDriverSearches', JSON.stringify(updatedSearches))
  }

  const searchDrivers = async (query: string) => {
    isLoading.value = true
    error.value = null
    try {
      let searchQuery;
      if (/^\d+$/.test(query)) {
        searchQuery = supabase
          .from('haulblaze_contact')
          .select()
          .filter('driver_id', 'cs', `{${query}}`)
      } else {
        searchQuery = supabase
          .from('haulblaze_contact')
          .select()
          .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
      }

      const { data, error: supabaseError } = await searchQuery.limit(5)

      if (supabaseError) throw supabaseError

      drivers.value = data || []
    } catch (err) {
      console.error('Error searching drivers:', err)
      error.value = 'Failed to search drivers. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  const getFrequentlyUsedDrivers = async () => {
    if (drivers.value.length > 0) return // 如果已经有数据，就不再重复加载

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
      console.error('Error fetching frequently used drivers:', err)
      error.value = 'Failed to fetch frequently used drivers. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  loadRecentSearches()

  return {
    drivers,
    isLoading,
    error,
    recentSearches,
    searchDrivers,
    getFrequentlyUsedDrivers,
    addToRecentSearches,
  }
}