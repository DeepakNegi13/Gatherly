import { Route, Routes, useLocation, useParams, useSearchParams } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import NotFoundPage from "./pages/NotFoundPage"
import Homepage from "./pages/Homepage"
import { useEffect } from "react"
import EventDetailsPage from "./pages/EventDetailsPage"
// after go to next url the screen is scroll to top
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
}
const App = () => {
 
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-orange-100 selection:text-[#E65100]">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
