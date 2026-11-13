export { cn } from "cn"
import { format, parseISO } from "date-fns"
export function formatPrice(price, currency = "INR") {
  const val = Number(price)
  if (!val) return "FREE"
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(val)
}
export function formatEventDate(dateInput) {
  const date = parseISO(dateInput)
  return format(date, "E, LLL dd, yyyy")
}
