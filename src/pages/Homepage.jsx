import { Button } from "../components/ui/button";
import { Compass, Sparkles } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="space-y-16 pb-20">
      <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start  justify-between gap-8 pb-10 border-b border-[#EBE8DF]">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/70 text-[#C2410C] border border-orange-200">
              <Sparkles className="w-3.5 h-3.5" /> India's Curated Community
              Conclaves
            </div>
            <h1 className="text-[10vw] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111] leading-[1.08]">
              Extraordinary gatherings for curious minds.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Discover verified developer summits, acoustic indie evenings,
              founder pitch conclaves, and art retreats across Bengaluru,
              Mumbai, and Delhi NCR.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link to="/explore">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-elevated gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore 40+ Gatherings</span>
              </Button>
            </Link>
            <Link to="/create-event">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Host an Event
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}