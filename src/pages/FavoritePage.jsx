import EventCard from "#components/events/EventCard"
import { formatPrice } from "#lib/utils"
import { Bookmark, Calendar } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router"

export default function FavoritesPage() {
  const events = useSelector(state => state.favorite.items)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE8DF] pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111] tracking-tight">Saved Collections</h1>
          <p className="text-sm text-stone-600">Bookmarked conclaves, summits, and performances to revisit anytime.</p>
        </div>

        <button type="button" className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-xs font-medium px-3 py-1.5 border border-[#CCC8BA] bg-transparent hover:bg-[#F2F1EC] text-stone-500 hover:text-rose-600">
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map(event => {
          {
            console.log(event)
          }
          return (
            <EventCard event={event} />
          )
        })}
      </div>
    </div>
  )
}
