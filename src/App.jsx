import { Route, Routes, useLocation} from "react-router-dom"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import NotFoundPage from "./pages/NotFoundPage"
import Homepage from "./pages/Homepage"
import { useEffect } from "react"
import EventDetailsPage from "./pages/EventDetailsPage"
import { Toaster } from "sonner"
import FavoritesPage from "./pages/FavoritePage"
import ExplorePage from "./pages/ExplorePage"
// after go to next url the screen is scroll to top
function ScrollToTop() {
  // Read the current URL pathname so route changes can trigger a scroll reset.
  const { pathname } = useLocation()
  useEffect(() => {
    // Scroll the document back to the top whenever the page route changes.
    window.scrollTo({ top: 0 })
  }, [pathname])
}
const App = () => {
  return (
    // The application shell provides the shared background and sticky page structure.
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-orange-100 selection:text-[#E65100]">
      {/* Reset the viewport position before rendering a new routed page. */}
      <ScrollToTop />
      {/* Shared navigation remains visible across application routes. */}
      <Navbar />
      <div className="flex-1">
        {/* Route definitions select the page component from the current URL. */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster richColors />

      <Footer />
    </div>
  )
}

export default App
