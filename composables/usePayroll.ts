import { ref, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'
import type { FetchPaymentRecordsOptions, DriverPaymentRecord, ProcessedDriverPaymentRecord } from '~/types/payment'
import { formatCurrency, formatDate } from '~/utils/formatter'

export const usePayment = () => {
  const supabase = useSupabaseClient<Database>()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const paymentRecords = ref<ProcessedDriverPaymentRecord[]>([])
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const pageSize = ref(20)

  const fetchPaymentRecords = async (options: FetchPaymentRecordsOptions = {}) => {
    const { warehouse, status, team, cycle_start, page = 1 } = options
    console.log('usePayment: Fetching payment records', options)
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('payment_record')
        .select(`
          *,
          haulblaze_contact (
            first_name,
            last_name,
            email,
            phone,
            driver_license_no
          ),
          deductions (
            amount,
            reason,
            status
          )
        `, { count: 'exact' })
        .order('cycle_start', { ascending: false })

      if (team) {
        query = query.eq('team_name', team)
      }
      if (warehouse) {
        query = query.eq('warehouse', warehouse)
      }
      if (status && Array.isArray(status) && status.length > 0) {
        query = query.in('payment_method', status)
      }
      if (cycle_start) {
        query = query.eq('cycle_start', cycle_start)
      }

      // Apply pagination
      const from = (page - 1) * pageSize.value
      const to = from + pageSize.value - 1
      query = query.range(from, to)

      const { data, error: fetchError, count } = await query

      if (fetchError) throw fetchError

      console.log('usePayment: Query result', data)

      if (data) {
        paymentRecords.value = data.map((record: any): ProcessedDriverPaymentRecord => ({
          ...record,
          uid: record.uid || '',
          gross_pay: record.gross_pay || 0,
          net_pay: record.net_pay || 0,
          deduction_amount: record.deduction_amount || 0,
          cycle_start: record.cycle_start || '',
          warehouse: record.warehouse || '',
          team_name: record.team_name || '',
          name: `${record.haulblaze_contact?.first_name || ''} ${record.haulblaze_contact?.last_name || ''}`.trim() || 'N/A',
          formattedGrossPay: formatCurrency(record.gross_pay || 0),
          formattedNetPay: formatCurrency(record.net_pay || 0),
          formattedDeductionAmount: formatCurrency(record.deduction_amount || 0),
          formattedCycleStart: formatDate(record.cycle_start || ''),
          formattedPaymentDate: record.payment_date ? formatDate(record.payment_date) : undefined,
          formattedActualAmountPaid: record.actual_amount_paid ? formatCurrency(record.actual_amount_paid) : undefined,
          status: record.payment_method ? 'PAID' : 'PENDING'
        }))
        totalRecords.value = count || 0
        currentPage.value = page
      } else {
        paymentRecords.value = []
        totalRecords.value = 0
      }

      console.log('usePayment: Fetched payment records', paymentRecords.value.length)
    } catch (err) {
      console.error('usePayment: Error fetching payment records', err)
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

  const totalGrossPay = computed(() => {
    return paymentRecords.value.reduce((sum: number, record: ProcessedDriverPaymentRecord) => sum + (record.gross_pay || 0), 0)
  })

  const totalNetPay = computed(() => {
    return paymentRecords.value.reduce((sum: number, record: ProcessedDriverPaymentRecord) => sum + (record.net_pay || 0), 0)
  })

  const totalDeductions = computed(() => {
    return paymentRecords.value.reduce((sum: number, record: ProcessedDriverPaymentRecord) => sum + (record.deduction_amount || 0), 0)
  })

  const processPayment = async (paymentDetails: {
    uid: string
    amount: number
    method: number
    date: string
  }) => {
    console.log('Processing payment:', paymentDetails)
    const { uid, amount, method, date } = paymentDetails
    const { data, error } = await supabase
      .from('payment_record')
      .update({ payment_method: method, payment_date: date, actual_amount_paid: amount })
      .eq('uid', uid)
      .select()
    if (error) throw error
    console.log('Payment processed:', data)

    // Refresh the current page after processing payment
    await fetchPaymentRecords({ page: currentPage.value })
  }

  return {
    loading,
    error,
    paymentRecords,
    fetchPaymentRecords,
    totalGrossPay,
    totalNetPay,
    totalDeductions,
    processPayment,
    totalRecords,
    currentPage,
    pageSize,
    totalPages
  }
}
