export { cn } from "cn"
import { format, parseISO } from "date-fns"
export function formatPrice(price, currency = "INR") {
  const val = Number(price)
  if (!val) return "FREE"
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(val)
}
export function formatEventDate(dateInput) {
  if(dateInput==null || dateInput==undefined){
    return 
  }
  const date = parseISO(dateInput)
  return format(date, "E, LLL dd, yyyy")
}

export function formatEventTimeRange(startDate, endDate) {
  if (!startDate || !endDate) {
    return
  }

  const start = parseISO(startDate)

  const startTime = format(start, "h:mm a")

  const end = parseISO(endDate)

  const endTime = format(end, "h:mm a")

  return `${startTime} - ${endTime}`
}
