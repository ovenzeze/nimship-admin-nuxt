import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'

type Invoice = Database['public']['Tables']['invoices']['Row']
type Customer = Database['public']['Tables']['customers']['Row']
type InvoiceView = Database['public']['Views']['invoice_view']['Row']

interface InvoiceWithCustomer extends Invoice {
  recipient?: Customer
  sender?: Customer
}

export function useInvoice() {
  const supabase = useSupabaseClient<Database>()
  const availableInvoice = ref<InvoiceView | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchInvoices = async (): Promise<InvoiceWithCustomer[]> => {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        recipient:customers!invoices_recipient_id_fkey(id, name, email),
        sender:customers!invoices_sender_id_fkey(id, name, email)
      `)
    if (error) throw error
    return data
  }

  const createInvoice = async (invoice: Partial<Invoice>) => {
    const { data, error } = await supabase
      .from('invoices')
      .insert(invoice)
      .select()
    if (error) throw error
    return data[0]
  }

  const updateInvoice = async (id: number, invoice: Partial<Invoice>) => {
    const { data, error } = await supabase
      .from('invoices')
      .update(invoice)
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0]
  }

  const deleteInvoice = async (id: number) => {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  const checkAvailableInvoice = async (
    paymentCycle: string,
    teamName: string,
    customId: string,
    warehouse: string
  ) => {
    isLoading.value = true
    error.value = null
    availableInvoice.value = null

    try {
      // 解析支付周期为开始和结束日期
      const [cycleStart, cycleEnd] = paymentCycle.split(' - ')

      const { data, error: queryError } = await supabase
        .from('invoice_view')
        .select('*')
        .eq('custom_id', customId)
        .eq('team_name', teamName)
        .eq('warehouse', warehouse)
        .gte('payment_cycle_start', cycleStart)
        .lte('payment_cycle_end', cycleEnd)
        .maybeSingle()

      if (queryError) throw queryError

      if (data) {
        availableInvoice.value = data
      }
    } catch (e) {
      console.error('Error checking available invoice:', e)
      error.value = '查询可用发票时出错'
    } finally {
      isLoading.value = false
    }

    return availableInvoice.value
  }

  const fetchPaymentCycles = async () => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await supabase
        .from('invoice_view')
        .select('payment_cycle_start')
        .order('payment_cycle_start', { ascending: false })

      if (queryError) throw queryError

      if (data) {
        const uniqueCycles = new Set<string>()
        return data.reduce((acc: string[], item) => {
          const startDate = new Date(item.payment_cycle_start!)
          const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000) // 6 days later
          const cycle = formatDateRange(startDate, endDate)
          if (!uniqueCycles.has(cycle)) {
            uniqueCycles.add(cycle)
            acc.push(cycle)
          }
          return acc
        }, [])
      }
    } catch (e) {
      console.error('Error fetching payment cycles:', e)
      error.value = '获取支付周期时出错'
    } finally {
      isLoading.value = false
    }

    return []
  }

  const formatDateRange = (start: Date, end: Date) => {
    const formatDate = (date: Date) => {
      const mm = String(date.getMonth() + 1).padStart(2, '0')
      const dd = String(date.getDate()).padStart(2, '0')
      const yy = String(date.getFullYear()).slice(-2)
      return `${mm}/${dd}/${yy}`
    }
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  return {
    availableInvoice,
    isLoading,
    error,
    fetchInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    checkAvailableInvoice,
    fetchPaymentCycles
  }
}