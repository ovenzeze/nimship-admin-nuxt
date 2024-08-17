
import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

export function useSupabase() {
  const supabaseClient = ref(null)

  if (!supabaseClient.value) {
    const config = useRuntimeConfig()
    const supabaseUrl = config.public.supabaseUrl
    const supabaseKey = config.public.supabaseKey

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase URL and Key must be provided')
      return { supabase: null }
    }

    supabaseClient.value = createClient(supabaseUrl, supabaseKey)
  }

  return { supabase: supabaseClient.value }
}