import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { Redis } from '@upstash/redis'
import pako from 'pako'

const redis = new Redis({
  url: 'https://aware-finch-54439.upstash.io',
  token: 'AdSnAAIjcDE4ZjY1ZDVhNTFiMmM0ZmRlOWYxOTZkZjg5YzI0NmY1NHAxMA',
})

interface UpstashComposable {
  data: Ref<any | null>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
  getMessage: (conversationId: string, messageId: string) => Promise<void>;
  getConversationMessages: (conversationId: string) => Promise<void>;
  getUserConversations: (userId: string) => Promise<void>;
  getConversationStats: (conversationId: string) => Promise<void>;
  getGlobalStats: () => Promise<void>;
  getProviderStats: (providerName: string) => Promise<void>;
  getTaskInfo: (taskId: string) => Promise<void>;
  getTaskCost: (taskId: string) => Promise<void>;
  getAgentTaskCost: (taskId: string, agentId: string) => Promise<void>;
  getWorkflow: (workflowId: string) => Promise<void>;
  getAgentWorkSummary: (taskId: string, agentId: string) => Promise<void>;
  startRealTimeRefresh: (key: string, type: string, interval?: number) => void;
  stopRealTimeRefresh: () => void;
}

export function useUpstash(): UpstashComposable {
  const data = ref<any | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref<boolean>(false)

  let refreshInterval: ReturnType<typeof setInterval> | null = null

  const decompressData = (compressedData: string): string => {
    console.log('Decompressing data:', compressedData.substring(0, 20) + '...')
    try {
      const binaryData = atob(compressedData)
      const charData = binaryData.split('').map(x => x.charCodeAt(0))
      const binData = new Uint8Array(charData)
      const decompressedData = pako.inflate(binData, { to: 'string' })
      console.log('Decompression successful. Result:', decompressedData.substring(0, 50) + '...')
      return decompressedData
    } catch (err) {
      console.error('Decompression failed:', err)
      return compressedData // If decompression fails, return original data
    }
  }

  const processData = (rawData: any, type: string): any => {
    console.log('Processing data of type:', type)
    if (type === 'hash') {
      const processedData: Record<string, any> = {}
      for (const [key, value] of Object.entries(rawData)) {
        if (typeof value === 'string' && (key === 'content' || key.startsWith('extracted_content.'))) {
          console.log(`Decompressing field: ${key}`)
          processedData[key] = decompressData(value)
        } else {
          processedData[key] = value
        }
      }
      console.log('Processed hash data:', processedData)
      return processedData
    } else if (type === 'string' && typeof rawData === 'string') {
      console.log('Processing string data')
      return decompressData(rawData)
    }
    console.log('Returning raw data without processing')
    return rawData
  }

  const fetchData = async (key: string, type: string): Promise<void> => {
    console.log(`Fetching data for key: ${key}, type: ${type}`)
    loading.value = true
    error.value = null
    try {
      let rawData
      switch (type) {
        case 'hash':
          console.log('Fetching hash data')
          rawData = await redis.hgetall(key)
          break
        case 'sortedSet':
          console.log('Fetching sorted set data')
          rawData = await redis.zrange(key, 0, -1, { withScores: true })
          break
        case 'set':
          console.log('Fetching set data')
          rawData = await redis.smembers(key)
          break
        case 'string':
          console.log('Fetching string data')
          rawData = await redis.get(key)
          break
        case 'list':
          console.log('Fetching list data')
          rawData = await redis.lrange(key, 0, -1)
          break
        default:
          throw new Error(`Unsupported type: ${type}`)
      }
      console.log('Raw data fetched:', rawData)
      data.value = processData(rawData, type)
      console.log('Processed data:', data.value)
    } catch (err) {
      console.error('Error fetching data:', err)
      error.value = err instanceof Error ? err : new Error('Unknown error occurred')
    } finally {
      loading.value = false
      console.log('Fetch operation completed')
    }
  }

  const getMessage = async (conversationId: string, messageId: string): Promise<void> => {
    console.log(`Getting message for conversation: ${conversationId}, message: ${messageId}`)
    return fetchData(`conversation:${conversationId}:message:${messageId}`, 'hash')
  }

  const getConversationMessages = async (conversationId: string): Promise<void> => {
    console.log(`Getting messages for conversation: ${conversationId}`)
    return fetchData(`conversation:${conversationId}:messages`, 'sortedSet')
  }

  const getUserConversations = async (userId: string): Promise<void> => {
    console.log(`Getting conversations for user: ${userId}`)
    return await fetchData(`user:${userId}:conversations`, 'set')
  }

  const getConversationStats = async (conversationId: string): Promise<void> => {
    console.log(`Getting stats for conversation: ${conversationId}`)
    return await fetchData(`conversation:${conversationId}:stats`, 'hash')
  }

  const getGlobalStats = async (): Promise<void> => {
    console.log('Getting global stats')
    return await fetchData('global:stats', 'hash')
  }

  const getProviderStats = async (providerName: string): Promise<void> => {
    console.log(`Getting stats for provider: ${providerName}`)
    return await fetchData(`provider:${providerName}:stats`, 'hash')
  }

  const getTaskInfo = async (taskId: string): Promise<void> => {
    console.log(`Getting info for task: ${taskId}`)
    return await fetchData(`task:${taskId}`, 'hash')
  }

  const getTaskCost = async (taskId: string): Promise<void> => {
    console.log(`Getting cost for task: ${taskId}`)
    return await fetchData(`task:${taskId}:cost`, 'string')
  }

  const getAgentTaskCost = async (taskId: string, agentId: string): Promise<void> => {
    console.log(`Getting cost for task: ${taskId}, agent: ${agentId}`)
    return await fetchData(`task:${taskId}:agent:${agentId}:cost`, 'string')
  }

  const getWorkflow = async (workflowId: string): Promise<void> => {
    console.log(`Getting workflow: ${workflowId}`)
    return await fetchData(`workflow:${workflowId}`, 'hash')
  }

  const getAgentWorkSummary = async (taskId: string, agentId: string): Promise<void> => {
    console.log(`Getting work summary for task: ${taskId}, agent: ${agentId}`)
    return await fetchData(`task:${taskId}:agent:${agentId}:summary`, 'list')
  }

  const startRealTimeRefresh = (key: string, type: string, interval: number = 5000): void => {
    console.log(`Starting real-time refresh for key: ${key}, type: ${type}, interval: ${interval}ms`)
    stopRealTimeRefresh()
    fetchData(key, type).catch(console.error).catch(console.error)
    refreshInterval = setInterval(() => {
      console.log(`Refreshing data for key: ${key}`)
      fetchData(key, type).catch(console.error).catch(console.error)
    }, interval)
  }

  const stopRealTimeRefresh = (): void => {
    if (refreshInterval) {
      console.log('Stopping real-time refresh')
      clearInterval(refreshInterval)
      refreshInterval = null
    }
  }

  onMounted(() => {
    console.log('useUpstash composable mounted')
  })

  onUnmounted(() => {
    console.log('useUpstash composable unmounting, stopping real-time refresh')
    stopRealTimeRefresh()
  })

  return {
    data,
    error,
    loading,
    getMessage,
    getConversationMessages,
    getUserConversations,
    getConversationStats,
    getGlobalStats,
    getProviderStats,
    getTaskInfo,
    getTaskCost,
    getAgentTaskCost,
    getWorkflow,
    getAgentWorkSummary,
    startRealTimeRefresh,
    stopRealTimeRefresh,
  }
}
