import { FeaturedCarousel } from "#components/FeaturedCarousel"
import { useEffect, useState } from "react"
import { Button } from "../components/ui/Button"
import { BriefcaseBusiness, ChevronRight, Compass, CpuAi, Flame, GraduationCapIcon, Music4, Palette, TagIcon, Trophy } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"

function eventIcon(iconName) {
  if (iconName === "") return <TagIcon />
  if (iconName === "palette") return <Palette />
  if (iconName === "briefcase") return <BriefcaseBusiness />
  if (iconName === "graduation-cap") return <GraduationCapIcon />
  if (iconName === "music") return <Music4 />
  if (iconName === "trophy") return <Trophy />
  if (iconName === "cpu") return <CpuAi />
  return <TagIcon />
}

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [category, setCategory] = useState([])

  useEffect(() => {
    async function getFeaturedEvents() {
      setIsLoading(true)
      try {
        let {
          data: { data },
        } = await axios.get("https://eventsphere-server-mfdb.onrender.com/api/events/featured")
        setFeaturedEvents(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    async function getEventCategory() {
      setIsLoading(true)
      try {
        let {
          data: { data },
        } = await axios.get("https://eventsphere-server-mfdb.onrender.com/api/categories ")
        setCategory(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getEventCategory()
    getFeaturedEvents()
  }, [])

  return (
    <div className="space-y-16 pb-20">
      <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start  justify-between gap-8 pb-10 border-b border-[#EBE8DF]">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/70 text-[#C2410C] border border-orange-200">
              <Sparkles className="w-3.5 h-3.5" /> India's Curated Community Conclaves
            </div>
            <h1 className="text-[10vw] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111] leading-[1.08]">
              Extraordinary gatherings for curious minds.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Discover verified developer summits, acoustic indie evenings, founder pitch conclaves, and art retreats across Bengaluru, Mumbai, and Delhi NCR.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link to="/explore">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-elevated gap-2">
                <Compass className="w-4 h-4" />
                <span>Explore 40+ Gatherings</span>
              </Button>
            </Link>
            <Link to="/create-event">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Host an Event
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#E65100]" />
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">Curated Spotlight</h2>
          </div>
          <Link to="/explore" className="text-xs font-semibold text-[#E65100] hover:underline flex items-center gap-1">
            Browse all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ?
          <div className="aspect-21/9 rounded-3xl bg-[#EBE8DF]/50 animate-pulse"></div>
        : <FeaturedCarousel events={featuredEvents} />}
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* HEADINGS of the section */}
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">Browse by Discipline</h2>
          <p className="text-xs text-stone-500">Curated tracks dynamically fetched from our active community listings</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {category.map(event => {
            const icon = event?.icon

            return (
              // category
              <Link
                key={event._id}
                to="/explore"
                className="p-4 rounded-2xl bg-white border border-[#EBE8DF] hover:border-[#D5D0C2] hover:shadow-subtle transition-all duration-200 group flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-3 transition-all duration-200 bg-orange-50 text-[#E65100] border-orange-200 group-hover:bg-[#E65100] group-hover:text-white text-lg">
                  {eventIcon(icon)}
                </div>
                {/* Event type and number of event */}
                <div>
                  <p className="text-xs font-bold text-stone-900 leading-snug group-hover:text-[#E65100] transition-colors">{event.name}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{event.eventCount} Events</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
