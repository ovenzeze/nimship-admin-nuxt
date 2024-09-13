import type { ReadbleContact } from "~/types"

const getReadbleContact = (contact: HaulblazeContact): ReadbleContact => {
    const { first_name, last_name, status } = contact
    return {
        ...contact,
        name: String(`${first_name} ${last_name}`).toUpperCase(),
        employment_status: String(status).toUpperCase(),
        qualification: { tax: true, vehiche: true, insurance: true }
    }
}

export { getReadbleContact }