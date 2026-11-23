import Skeleton from "#components/common/Skeleton";
import api from "#lib/axios";
import EventCard from "../components/events/EventCard";
import { Bookmark, Calendar, MapPin, RefreshCcw, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ExplorePage() {
  // Events and pagination state are kept together so the screen can append or replace results.
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    hasMore: false,
  });

  async function fetchEvents(page = 1, append = false) {
    // Show the initial skeleton for page one and a footer state for later pages.
    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    try {
       const { data: events, pagination } = await api.get(
        `/api/events?page=${page}`,
      );

      if (append) {
        setEvents(prev => [...prev, ...events])
      } else {
        setEvents(events)
      }

      setPagination(pagination)
    } catch (error) {console.log(error)}

    setIsLoading(false);
    setIsLoadingMore(false);
  }


  useEffect(() => {
    // Fetch the first page once after the Explore route mounts.
    fetchEvents(1, false)
  }, [])

  const { ref: observerRef, inView } = useInView({ threshold: 0.5 })

  useEffect(() => {
    // Only request another page after the sentinel is visible and pagination confirms availability.
    if (inView && pagination.hasMore && !isLoading && !isLoadingMore) {
      let timer = setTimeout(() => {
        // Delay briefly so loading feedback can render before the API request.
        fetchEvents(pagination.page + 1, true)
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">Explore Curated Gatherings</h1>
        <p className="text-sm text-stone-600">Discover summits, masterclasses, acoustic shows, and retreats across India</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Top Search & Primary Filters Row */}
        <div className="bg-white rounded-2xl border border-[#EBE8DF] p-3 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <span className="text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">
              <Search />
            </span>
            <form>
              <input type="text" name="search" placeholder="Search by topic, category, artist, city, or venue..." className="w-full pl-9 pr-9 py-2 text-sm rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:bg-white focus:border-[#E65100] focus:ring-2 focus:ring-[#E65100]/20 text-[#111] placeholder-stone-400 outline-none transition-all" />
            </form>
          </div>

          <div className="relative min-w-37.5">
            <span className="text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
              <MapPin className="size-4" />
            </span>
            <select name="city" className="w-full pl-8 pr-7 py-2 text-xs font-medium rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:border-[#E65100] outline-none text-stone-800 appearance-none cursor-pointer">
              <option value="All">All Locations</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Jaipur">Jaipur</option>
            </select>
            <span className="text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</span>
          </div>

          <div className="relative">
            <button type="button" className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer select-none bg-[#FAF9F5] border-[#DDD9CE] text-stone-700 hover:bg-stone-100">
              <span>
                <Calendar/>
              </span>
              <span>Filter by Date</span>
              <span className="text-stone-400 text-xs">▼</span>
            </button>
          </div>

          <div className="relative min-w-35">
            <select name="sort" className="w-full px-3 py-2 text-xs font-medium rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:border-[#E65100] outline-none text-stone-800 appearance-none cursor-pointer">
              <option value="startDate_asc">Earliest First</option>
              <option value="startDate_desc">Latest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="title_asc">Title: A – Z</option>
            </select>
            <span className="text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</span>
          </div>

          <button type="button" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0 cursor-pointer">
            <span>
              <RefreshCcw />
            </span>
            <span>Reset</span>
          </button>
        </div>

        {/* Categories horizontal pill bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-[#1a1a1a] text-white shadow-sm">
            <span>All Disciplines</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20 text-white">42</span>
          </button>

          <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]">
            <span>Technology & AI</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">14</span>
          </button>

          <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]">
            <span>Live Music & Concerts</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">9</span>
          </button>

          <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]">
            <span>Startups & Venture Capital</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">8</span>
          </button>

          <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]">
            <span>Fitness & Marathons</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">5</span>
          </button>

          <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]">
            <span>Arts & Culture</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">4</span>
          </button>
        </div>

        {/* Format & Pricing Pills */}
        <div className="flex items-center justify-between text-xs text-stone-500 flex-wrap gap-2 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-stone-700">Format:</span>
            <button type="button" className="px-2.5 py-1 rounded-lg border text-xs font-medium capitalize transition-all cursor-pointer bg-stone-800 text-white border-stone-800">
              All Formats
            </button>
            <button type="button" className="px-2.5 py-1 rounded-lg border text-xs font-medium capitalize transition-all cursor-pointer bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50">
              In-Person
            </button>
            <button type="button" className="px-2.5 py-1 rounded-lg border text-xs font-medium capitalize transition-all cursor-pointer bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50">
              Online
            </button>
            <button type="button" className="px-2.5 py-1 rounded-lg border text-xs font-medium capitalize transition-all cursor-pointer bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50">
              Hybrid
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-700">Admission:</span>
            <button type="button" className="px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer bg-stone-800 text-white border-stone-800">
              All
            </button>
            <button type="button" className="px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50">
              Free
            </button>
            <button type="button" className="px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50">
              Paid
            </button>
          </div>
        </div>
      </div>

      {/* Results Header with Active Filter Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 pt-2 border-b border-[#EBE8DF] pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            Showing <strong className="text-stone-800">{events.length}</strong> events
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-[#C2410C] border border-orange-200">
            <span>
              <MapPin />
            </span>
            <span>City: Bengaluru</span>
            <button type="button" className="hover:text-rose-700 ml-0.5 cursor-pointer" aria-label="Remove city filter">
              <X />
            </button>
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
            <span className="text-[#E65100]">
              <Bookmark />
            </span>
            <span>Category: Technology & AI</span>
            <button type="button" className="hover:text-rose-700 ml-0.5 cursor-pointer" aria-label="Remove category filter">
              ✕
            </button>
          </span>
        </div>
      </div>
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ?
            [...Array(8)].map((_, id) => <Skeleton key={id} />)
          : events.map(event => {
              return <EventCard key={event._id || event.id} event={event} />
            })
          }
        </div>
      </div>
      {/* The intersection sentinel triggers the next API page when it enters the viewport. */}
      {/* Bottom indicator */}
      <div ref={observerRef} className="py-6 flex justify-center ">
          {pagination.hasMore && (
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="w-4 h-4 border-2 border-[#E65100] border-t-transparent rounded-full animate-spin" />
              <span>Unfolding more community gatherings...</span>
            </div>
          )}       
      </div>
    </div>
  )
}