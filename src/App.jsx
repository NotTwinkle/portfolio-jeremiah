import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageLoader from './components/PageLoader'
import useLenis from './hooks/useLenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CaseStudyPage from './pages/CaseStudyPage'
import NotFound from './pages/NotFound'
import SEO from './components/SEO'
import ScrollToTop from './components/ScrollToTop'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useLenis()

  useEffect(() => {
    // Ensure ScrollTrigger lays out correctly on mount
    ScrollTrigger.refresh()
  }, [])

  const location = useLocation()
  useEffect(() => {
    // refresh on route change after a frame for layout stability
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname])

  const handleLoaderComplete = () => {
    setIsLoaded(true)
    // Ensure layout is stable then refresh scroll-triggered animations
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      {!isLoaded && <PageLoader onComplete={handleLoaderComplete} />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Navbar />
            <Hero isLoaded={isLoaded} />
            <About />
            <Projects />
            <Contact />
          </div>
        } />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        {/* Catch-all route for 404 - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
