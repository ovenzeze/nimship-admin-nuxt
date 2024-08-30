import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'

type EnumItem = {
  id: number
  label: string
  value: string
  type: string
}

export function useEnums() {
  const supabase = useSupabaseClient<Database>()
  
  const enumItems = ref<EnumItem[]>([])
  const isLoaded = ref(false)
  const isLoading = ref(false)

  const fetchEnums = async () => {
    if (isLoaded.value || isLoading.value) return
    
    isLoading.value = true
    try {
      const { data, error } = await supabase
        .from('zion_enum')
        .select('id, label, value, type')
        .order('type', { ascending: true })

      if (error) throw error

      enumItems.value = data
      isLoaded.value = true
    } catch (error) {
      console.error('Error fetching enums:', error)
    } finally {
      isLoading.value = false
    }
  }

  const getEnumsByType = async (type: string) => {
    if (!isLoaded.value && !isLoading.value) {
      await fetchEnums()
    }
    return enumItems.value.filter(item => item.type === type)
  }

  const getUniqueEnumTypes = () => {
    return [...new Set(enumItems.value.map(item => item.type))]
  }

  // 页面加载后1秒自动获取
  onMounted(() => {
    setTimeout(fetchEnums, 1000)
  })

  return {
    enumItems,
    getEnumsByType,
    getUniqueEnumTypes,
    fetchEnums,
    isLoaded,
    isLoading
  }
}