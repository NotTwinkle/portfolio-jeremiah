import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const toggleVisibility = () => {
      // Get scroll position (works with both native and Lenis)
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      
      // Show button when user scrolls down 300px
      if (scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Initial check
    toggleVisibility()

    // Listen to scroll events (works with Lenis too since it updates scroll position)
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    
    // Also listen to Lenis scroll events if available (for better sync)
    const checkLenis = () => {
      if (window.lenis) {
        window.lenis.on('scroll', toggleVisibility)
      } else {
        // Retry after a short delay if Lenis isn't ready yet
        setTimeout(checkLenis, 100)
      }
    }
    checkLenis()

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      if (window.lenis && window.lenis.off) {
        window.lenis.off('scroll', toggleVisibility)
      }
    }
  }, [])

  // Animate button appearance
  useEffect(() => {
    if (!buttonRef.current) return

    if (isVisible) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        ease: 'power2.in'
      })
    }
  }, [isVisible])

  const scrollToTop = () => {
    // Use Lenis if available for smooth scroll, otherwise use native
    if (window.lenis) {
      window.lenis.scrollTo(0, { 
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  if (!isVisible) return null

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      aria-label="Scroll to top"
      style={{ opacity: 0 }}
    >
      <svg 
        className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-y-0.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  )
}

export default ScrollToTop

