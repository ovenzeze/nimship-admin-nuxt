import dayjs from "dayjs"

const readableDriver = (driver: DriverPaymentRecord) => {

  const { haulblaze_contact, deductions = [] } = driver
  return {
    ...driver,
    name: String(haulblaze_contact?.first_name).toUpperCase() +'' + String(haulblaze_contact?.last_name).toUpperCase(),
    cycleStart: dayjs(driver?.cycle_start).format('MM/DD/YYYY'),
    cycleEnd: dayjs(driver?.cycle_end).format('MM/DD/YYYY'),
    warehouse: driver?.warehouse,
    routing: driver?.routing_number,
    account: driver?.account_number,
    routing_ending: driver?.routing_number?.slice(-4),
    account_ending: driver?.account_number?.slice(-4),
  }
}

export { readableDriver }
 