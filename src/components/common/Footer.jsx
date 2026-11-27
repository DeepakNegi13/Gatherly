import { ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { GatherlyLogo } from "../../assets/icons/GatherlyLogo"
function Footer() {
  const city = [
    ["Bengaluru", "(Silicon Plateau)"],
    ["Mumbai", "(Arts & Live Indie)"],
    ["Delhi NCR", "(Founders & Conclaves)"],
    ["Pune", "(Heritage & Engineering)"],
    ["Hyderabad", "(Fintech & Sports)"],
  ]
  const coat = "Gatherly. Crafted with intention for communities."
  // Footer provides persistent discovery links and platform trust information.
  return (
    <footer className="bg-[#181816] text-[#E5E3DC] pt-16 pb-12 border-t border-[#2B2A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer columns separate brand trust, city hubs, and platform destinations. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2C2B27]">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <GatherlyLogo />
            </Link>
            <p className="text-sm text-[#A8A59C] max-w-sm leading-relaxed">A curated platform for India's tech summits, acoustic showcases, founder salons, and cultural retreats. Crafted for authentic real-world connections.</p>
            <div className="flex items-center gap-2 text-xs text-[#8C8980]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin-verified events for quality & community safety</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Hubs</p>
            <ul className="space-y-2 text-sm text-[#A8A59C]">
              {city.map((key, id) => {
                return (
                  <Link to={`/explore?city=${key[0]}`} key={id} className="hover:text-white transition-colors">
                    {key[0]} {key[1]}
                  </Link>
                )
              })}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Platform</p>
            <ul className="space-y-2 text-sm text-[#A8A59C]">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Browse All Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="hover:text-white transition-colors">
                  Host an Event
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors">
                  Personal Schedule Planner
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition-colors">
                  Saved Collections
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  User Profile Dossier
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Organizer Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A776F] gap-4">
          <p>
            © {new Date().getFullYear()} {coat}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
