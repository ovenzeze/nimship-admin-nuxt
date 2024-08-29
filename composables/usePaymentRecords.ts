import { ref, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database'

// Define the DriverPaymentRecord type
export type DriverPaymentRecord = {
  id: string
  team_name: Database['public']['Enums']['team_name_enum']
  warehouse: string
  custom_id: Database['public']['Enums']['custom_id_enum']
  cycle_start: string
  cycle_end: string
  gross_pay: number
  net_pay: number
  deduction_amount: number
  allowance: number
  bonus: number
  payment_status: 'PAID' | 'UNPAID'
  payment_method: string
  routing_number?: string
  account_number?: string
  zelle?: string
  haulblaze_contact?: {
    first_name: string
    last_name: string
    email: string
    phone: string
    driver_license_no: string
  }
  deductions?: Array<{
    amount: number
    reason: string
    status: string
  }>
}

export const usePayment = () => {
  const supabase = useSupabaseClient<Database>()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const paymentRecords = ref<DriverPaymentRecord[]>([])

  const fetchPaymentRecords = async (
    teamName: Database['public']['Enums']['team_name_enum'],
    warehouse?: string,
    customId?: Database['public']['Enums']['custom_id_enum'],
    cycleStart?: string
  ) => {
    console.log('usePayment: Fetching payment records', { teamName, warehouse, customId, cycleStart })
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
        .eq('team_name', teamName)
        .order('cycle_start', { ascending: false })

      if (warehouse) {
        query = query.eq('warehouse', warehouse)
      }
      if (customId) {
        query = query.eq('custom_id', customId)
      }
      if (cycleStart) {
        query = query.eq('cycle_start', cycleStart)
      } else {
        query = query.limit(1)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      console.log('usePayment: Query result', data)

      if (data && data.length > 0) {
        if (!cycleStart) {
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
            .eq('team_name', teamName)
            .eq('cycle_start', latestCycleStart)
            .order('cycle_start', { ascending: false })

          if (samePerioError) throw samePerioError
          paymentRecords.value = samePerioData || []
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
    driverId: string
    amount: number
    method: string
    date: string
  }) => {
    // Implement the payment processing logic here
    // This is a placeholder function that you'll need to implement
    console.log('Processing payment:', paymentDetails)
    // You might want to make a Supabase call here to update the payment status
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
