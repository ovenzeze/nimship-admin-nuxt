
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUpstash } from './useUpstash'

// Mock the useNuxtApp function
const mockFetch = vi.fn()
vi.mock('#app', () => ({
  useNuxtApp: () => ({
    $fetch: mockFetch
  })
}))

describe('useUpstash', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { data, error, loading } = useUpstash()
    expect(data.value).toBeNull()
    expect(error.value).toBeNull()
    expect(loading.value).toBe(false)
  })

  it('should fetch message correctly', async () => {
    const mockResponse = 'Test message'
    mockFetch.mockResolvedValue(mockResponse)

    const { getMessage, data, error, loading } = useUpstash()
    await getMessage('test-key')

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/upstash', {
        method: 'POST',
        body: { key: 'message:test-key', type: 'string' }
      })
      expect(data.value).toBe(mockResponse)
      expect(error.value).toBeNull()
      expect(loading.value).toBe(false)
    })
  })

  it('should handle fetch error correctly', async () => {
    const mockError = new Error('Fetch error')
    mockFetch.mockRejectedValue(mockError)

    const { getMessage, data, error, loading } = useUpstash()
    await getMessage('test-key')

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalled()
      expect(data.value).toBeNull()
      expect(error.value).toBe('Fetch error')
      expect(loading.value).toBe(false)
    })
  })

  it('should start and stop real-time refresh correctly', async () => {
    vi.useFakeTimers()
    const mockResponse = 'Test message'
    mockFetch.mockResolvedValue(mockResponse)

    const { startRealTimeRefresh, stopRealTimeRefresh, data } = useUpstash()
    startRealTimeRefresh('test-key', 'string', 1000)

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    await vi.advanceTimersByTime(2000)

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(3)
    })

    stopRealTimeRefresh()
    await vi.advanceTimersByTime(2000)

    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(3)
    })

    vi.useRealTimers()
  })
})
