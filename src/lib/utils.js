export { cn } from "cn"
import { toggleFavorite } from "../store/slices/favoriteSlice"
import { format, formatDistanceToNow, parseISO } from "date-fns"
import { toast } from "sonner"

// Format prices in Indian currency while treating zero or missing prices as free.
export function formatPrice(price, currency = "INR") {
  const val = Number(price)
  if (!val) return "FREE"
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(val)
}
export function formatEventDate(dateInput) {
  if (dateInput == null || dateInput == undefined) {
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

export function handleFavorite(e, event, dispatch, isFavorite) {
  e.preventDefault()
  dispatch(toggleFavorite(event))
  if (isFavorite) {
    toast.info(`Removed "${event?.title}" from saved events`)
  } else {
    toast.success(`Saved "${event?.title}" to your collection!`)
  }
}

export function getDaysRemaining(startDate) {
  if (!startDate) {
    return
  }

  const eventDate = parseISO(startDate)
  const currentDate = new Date()

  if (currentDate > eventDate) {
    return "Ended"
  }

  return formatDistanceToNow(eventDate, { addSuffix: true })
}
