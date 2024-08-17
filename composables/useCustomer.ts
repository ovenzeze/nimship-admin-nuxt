import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'

type Customer = Database['public']['Tables']['customers']['Row']

export function useCustomer() {
  const supabase = useSupabaseClient<Database>()

  const fetchCustomers = async (): Promise<Customer[]> => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
    if (error) throw error
    return data
  }

  return {
    fetchCustomers
  }
}