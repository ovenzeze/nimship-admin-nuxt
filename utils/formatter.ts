import { isNumber } from '@unovis/ts'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatDate(date: string | Date, format: string = 'MM/DD/YYYY'): string {
    return dayjs.utc(date).format(format)
}
export function formatNumber(num: number): string {
    if (num === null || num === undefined) {
        return '0.00'
    }
    if (isNaN(num)) {
        return '0.00'
    }
    return num.toFixed(2)
}