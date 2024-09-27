import { Redis } from '@upstash/redis'
import pako from 'pako'

const redis = new Redis({
  url: 'https://aware-finch-54439.upstash.io',
  token: 'AdSnAAIjcDE4ZjY1ZDVhNTFiMmM0ZmRlOWYxOTZkZjg5YzI0NmY1NHAxMA',
})

export function useUpstash() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  let refreshInterval: number | null = null

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
      return compressedData // 如果解压失败，返回原始数据
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

  const fetchData = async (key: string, type: string) => {
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
      error.value = err
    } finally {
      loading.value = false
      console.log('Fetch operation completed')
    }
  }

  const getMessage = async (conversationId: string, messageId: string) => {
    console.log(`Getting message for conversation: ${conversationId}, message: ${messageId}`)
    return fetchData(`conversation:${conversationId}:message:${messageId}`, 'hash')
  }

  const getConversationMessages = async (conversationId: string) => {
    console.log(`Getting messages for conversation: ${conversationId}`)
    return fetchData(`conversation:${conversationId}:messages`, 'sortedSet')
  }

  const getUserConversations = async (userId: string) => {
    console.log(`Getting conversations for user: ${userId}`)
    return fetchData(`user:${userId}:conversations`, 'set')
  }

  const getConversationStats = async (conversationId: string) => {
    console.log(`Getting stats for conversation: ${conversationId}`)
    return fetchData(`conversation:${conversationId}:stats`, 'hash')
  }

  const getGlobalStats = async () => {
    console.log('Getting global stats')
    return fetchData('global:stats', 'hash')
  }

  const getProviderStats = async (providerName: string) => {
    console.log(`Getting stats for provider: ${providerName}`)
    return fetchData(`provider:${providerName}:stats`, 'hash')
  }

  const getTaskInfo = async (taskId: string) => {
    console.log(`Getting info for task: ${taskId}`)
    return fetchData(`task:${taskId}`, 'hash')
  }

  const getTaskCost = async (taskId: string) => {
    console.log(`Getting cost for task: ${taskId}`)
    return fetchData(`task:${taskId}:cost`, 'string')
  }

  const getAgentTaskCost = async (taskId: string, agentId: string) => {
    console.log(`Getting cost for task: ${taskId}, agent: ${agentId}`)
    return fetchData(`task:${taskId}:agent:${agentId}:cost`, 'string')
  }

  const getWorkflow = async (workflowId: string) => {
    console.log(`Getting workflow: ${workflowId}`)
    return fetchData(`workflow:${workflowId}`, 'hash')
  }

  const getAgentWorkSummary = async (taskId: string, agentId: string) => {
    console.log(`Getting work summary for task: ${taskId}, agent: ${agentId}`)
    return fetchData(`task:${taskId}:agent:${agentId}:summary`, 'list')
  }

  const startRealTimeRefresh = (key: string, type: string, interval: number = 5000) => {
    console.log(`Starting real-time refresh for key: ${key}, type: ${type}, interval: ${interval}ms`)
    stopRealTimeRefresh()
    fetchData(key, type)
    refreshInterval = setInterval(() => {
      console.log(`Refreshing data for key: ${key}`)
      fetchData(key, type)
    }, interval)
  }

  const stopRealTimeRefresh = () => {
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
