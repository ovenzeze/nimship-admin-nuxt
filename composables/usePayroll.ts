import { ref, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'
import type { FetchPaymentRecordsOptions } from '~/types/payment'



// Define the DriverPaymentRecord type

export const usePayment = () => {
  const supabase = useSupabaseClient<Database>()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const paymentRecords = ref<DriverPaymentRecord[]>([])

  const fetchPaymentRecords = async (options: FetchPaymentRecordsOptions = {}) => {
    const { warehouse, status, team, cycle_start } = options
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
        `)
        .eq('team_name', team)
        .order('cycle_start', { ascending: false })

      if (warehouse) {
        query = query.eq('warehouse', warehouse)
      }
      if (cycle_start) {
        query = query.eq('cycle_start', cycle_start)
      } else {
        query = query.limit(1)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      console.log('usePayment: Query result', data)

      if (data && data.length > 0) {
        if (!cycle_start) {
          const latestCycleStart = data[0].cycle_start
          console.log('usePayment: Fetching records for latest cycle_start', latestCycleStart)
          const { data: samePerioData, error: samePerioError } = await supabase
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
            `)
            .eq('team_name', team)
            .eq('cycle_start', latestCycleStart)
            .order('cycle_start', { ascending: false })

          if (samePerioError) throw samePerioError
          paymentRecords.value = samePerioData as DriverPaymentRecord[]
        } else {
          paymentRecords.value = data as DriverPaymentRecord[]
        }
      } else {
        paymentRecords.value = []
      }

      console.log('usePayment: Fetched payment records', paymentRecords.value.length)
    } catch (err) {
      console.error('usePayment: Error fetching payment records', err)
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const totalGrossPay = computed(() => {
    return paymentRecords.value.reduce((sum, record) => sum + record.gross_pay, 0)
  })

  const totalNetPay = computed(() => {
    return paymentRecords.value.reduce((sum, record) => sum + record.net_pay, 0)
  })

  const totalDeductions = computed(() => {
    return paymentRecords.value.reduce((sum, record) => sum + record.deduction_amount, 0)
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
  }

  return {
    loading,
    error,
    paymentRecords,
    fetchPaymentRecords,
    totalGrossPay,
    totalNetPay,
    totalDeductions,
    processPayment
  }
}
