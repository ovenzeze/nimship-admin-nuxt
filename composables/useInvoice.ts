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
    console.log('Fetching invoices...')
    const { data, error: fetchError } = await supabase
      .from('invoices')
      .select(`
        *,
        recipient:customers!invoices_recipient_id_fkey(id, name, email),
        sender:customers!invoices_sender_id_fkey(id, name, email)
      `)
    if (fetchError) {
      console.error('Error fetching invoices:', fetchError)
      throw fetchError
    }
    console.log('Invoices fetched successfully:', data)
    return data as InvoiceWithCustomer[]
  }

  const createInvoice = async (invoice: Partial<Invoice>) => {
    console.log('Creating invoice:', invoice)
    const { data, error: createError } = await supabase
      .from('invoices')
      .insert(invoice)
      .select()
    if (createError) {
      console.error('Error creating invoice:', createError)
      throw createError
    }
    console.log('Invoice created successfully:', data[0])
    return data[0]
  }

  const updateInvoice = async (id: number, invoice: Partial<Invoice>) => {
    console.log(`Updating invoice with ID ${id}:`, invoice)
    const { data, error: updateError } = await supabase
      .from('invoices')
      .update(invoice)
      .eq('id', id)
      .select()
    if (updateError) {
      console.error('Error updating invoice:', updateError)
      throw updateError
    }
    console.log('Invoice updated successfully:', data[0])
    return data[0]
  }

  const deleteInvoice = async (id: number) => {
    console.log(`Deleting invoice with ID ${id}...`)
    const { error: deleteError } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)
    if (deleteError) {
      console.error('Error deleting invoice:', deleteError)
      throw deleteError
    }
    console.log(`Invoice with ID ${id} deleted successfully.`)
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
      // Parse payment cycle into start and end dates
      const [cycleStart] = paymentCycle.split(' - ')
      const cycleStartDate = dayjs.utc(cycleStart).format('YYYY-MM-DD')

      console.log(`Checking available invoice for customId ${customId}, teamName ${teamName}, warehouse ${warehouse}, cycleStartDate ${cycleStartDate}...`)

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
        console.log('Available invoice found:', availableInvoice.value)
      } else {
        console.log('No available invoice found.')
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
      console.log('Fetching payment cycles...')

      const { data, error: queryError } = await supabase
        .from('invoice_view')
        .select('payment_cycle_start')
        .order('cycle_start', { ascending: false })

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

        console.log(`Payment cycles fetched successfully:`, uniqueCycles);

      }

    } catch (e) {
      console.error('Error fetching payment cycles:', e)

    } finally {
      isLoading.value = false

    }

    return []
  }


  const generateInvoice = async () => {
    // Logic for generating the invoice goes here.
    // Add logging as needed.
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
    fetchPaymentCycles,
  }
}