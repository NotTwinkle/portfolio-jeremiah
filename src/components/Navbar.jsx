import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const menuOverlayRef = useRef(null)
  const menuItemsRef = useRef([])
  const closeButtonRef = useRef(null)
  
  const handleCloseMenu = () => {
    if (menuOverlayRef.current && menuItemsRef.current.length > 0) {
      // Animate menu items fade out
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      })
      
      // Animate close button fade out
      gsap.to(closeButtonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
      })
      
      // Animate overlay fade out
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIsMenuOpen(false)
        }
      })
    } else {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY
        
        // Show menu button when scrolling past hero
        if (scrollPosition > heroBottom * 0.2) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate menu open
  useEffect(() => {
    if (isMenuOpen && menuOverlayRef.current) {
      // Animate overlay fade in
      gsap.fromTo(menuOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      )

      // Animate menu items stagger
      gsap.fromTo(menuItemsRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        }
      )

      // Animate close button
      gsap.fromTo(closeButtonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.3 }
      )
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ]

  return (
    <>
      {/* Minimal Menu Button (Like kubrick.life) - Half Size */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className={`fixed top-6 left-6 z-50 w-10 h-10 rounded-full bg-gray-900 text-white transition-all duration-300 hover:bg-gray-800 flex items-center justify-center ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Full-Screen Menu Overlay */}
      {isMenuOpen && (
        <div 
          ref={menuOverlayRef}
          className="fixed inset-0 z-50 bg-black"
          style={{ opacity: 0 }}
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={handleCloseMenu}
            className="fixed top-6 left-6 z-60 w-10 h-10 rounded-full bg-white text-gray-900 transition-all duration-300 hover:bg-gray-100 flex items-center justify-center"
            aria-label="Close menu"
            style={{ opacity: 0 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Content */}
          <div className="flex items-center justify-center h-screen">
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={el => menuItemsRef.current[index] = el}
                  onClick={() => scrollToSection(item.id)}
                  className="text-4xl md:text-6xl font-display font-bold text-white hover:text-gray-400 transition-colors duration-300"
                  style={{ opacity: 0 }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
