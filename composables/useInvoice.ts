import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
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
      const [cycleStart] = paymentCycle.split(' - ')
      const cycleStartDate = dayjs.utc(cycleStart).format('YYYY-MM-DD')

      const { data, error: queryError } = await supabase
        .from('invoice_view')
        .select('*')
        .eq('custom_id', customId)
        .eq('team_name', teamName)
        .eq('warehouse', warehouse)
        .eq('payment_cycle_start', cycleStartDate)
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
          const startDate = dayjs.utc(item.payment_cycle_start).format('MM/DD/YYYY')
          const endDate = dayjs.utc(item.payment_cycle_start).add(6, 'day').format('MM/DD/YYYY')
          const cycle = `${startDate} - ${endDate}`
          if (!uniqueCycles.has(cycle)) {
            uniqueCycles.add(cycle)
            acc.push(cycle)
          }
          return acc
        }, [])
      }
    } catch (e) {
      console.error('Error fetching payment cycles:', e)
    } finally {
      isLoading.value = false
    }
  
    return []
  }
  

  const generateInvoice = async () => {
  //  查找条件: team_name custom_id warehouse payment_cycle_start
// 根据这个条件找到所有符合要求的invoice_view中的record, 

    // Invoice的值和默认值如下
    // Insert: {
    //   adjustment?: number | null
    //   amount_paid: number
    //   created_at?: string | null
    //   due_balance: number
    //   due_date: 当前时间+7天
    //   id?: number 数据库自增ID
    //   invoice_date: 当前时间
    //   invoice_number: string
    //   recipient_id?: number | null 6
    //   sender_id?: number | null 
    //   status?: DRAFT
    //   tax: 0
    //   total: 需要计算
    // }  
    // Row: {
    //   amount: number
    //   id: number
    //   invoice_number: string
    //   item_name: string
    //   quantity: number
    //   rate: number | null
    // }

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