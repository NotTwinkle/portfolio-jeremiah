import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Hero = ({ isLoaded }) => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const particlesRef = useRef(null)
  const contentRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])


  // Handle initial state when not loaded - keep content hidden
  useEffect(() => {
      if (!isLoaded) {
      // Ensure content stays hidden until loaded
      if (titleLine1Ref.current && titleLine2Ref.current) {
        gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
          opacity: 0,
          y: 30
        })
      }
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
      }
      if (scrollIndicatorRef.current) {
        gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 15 })
      }
      return
    }
  }, [isLoaded])

  useEffect(() => {
    if (!isLoaded) return

    // Track if animation has completed (outside context for proper scope)
    let animationCompleted = false

    const ctx = gsap.context(() => {
      // Check for reduced motion preference (declared once)
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobileWidth = window.innerWidth < 768
      
      // Set initial states - clean and simple fade + slide up
      if (titleLine1Ref.current && titleLine2Ref.current) {
        gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
          opacity: 0,
          y: 30,
          immediateRender: false
        })
      }
      
      // Set initial scroll indicator position (centered)
      if (scrollIndicatorRef.current) {
        gsap.set(scrollIndicatorRef.current, {
          opacity: 0,
          y: 15,
          xPercent: -50,
          left: '50%',
          immediateRender: false
        })
      }
      
      // Set initial subtitle state
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, {
          opacity: 0,
          y: 20,
          immediateRender: false
        })
      }
      
      // If reduced motion, show content immediately without animation
      if (prefersReduced) {
        if (titleLine1Ref.current && titleLine2Ref.current && subtitleRef.current && scrollIndicatorRef.current) {
          gsap.set([titleLine1Ref.current, titleLine2Ref.current, subtitleRef.current, scrollIndicatorRef.current], {
            opacity: 1,
            y: 0,
            clearProps: 'all'
          })
          animationCompleted = true
        }
        return
      }
      
      // Floating particles animation (reduced on mobile for performance)
      const particles = particlesRef.current?.querySelectorAll('.particle')
      if (!prefersReduced && particles) {
        particles.forEach((particle, index) => {
          gsap.to(particle, {
            y: 'random(-50, 50)',
            x: 'random(-50, 50)',
            rotation: 'random(0, 360)',
            duration: 'random(3, 5)',
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          })
        })
      }

      // Master timeline for page load - with safety checks
      if (!titleLine1Ref.current || !titleLine2Ref.current || !subtitleRef.current || !scrollIndicatorRef.current) {
        return
      }

      const masterTL = gsap.timeline({
        onComplete: () => {
          animationCompleted = true
          // Ensure final states are set
          if (titleLine1Ref.current && titleLine2Ref.current) {
            gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
              opacity: 1,
              y: 0
            })
          }
        }
      })

      // Clean, simple fade + slide up animation with stagger
      masterTL
        // First line - clean fade and slide
        .to(titleLine1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          immediateRender: false
        })
        // Second line - slight stagger for elegant reveal
        .to(titleLine2Ref.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          immediateRender: false
        }, "-=0.7")
        // Subtitle - gentle fade in
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          immediateRender: false
        }, "-=0.5")
        // Scroll indicator - subtle appearance
        .to(scrollIndicatorRef.current, {
          opacity: 1,
          y: 0,
          xPercent: -50,
          duration: 0.6,
          ease: "power2.out",
          immediateRender: false
        }, "-=0.4")


      // Clean, minimal parallax scroll animations with Lenis
      // Note: Lenis is already initialized globally via useLenis hook
      // ScrollTrigger automatically syncs with Lenis for smooth scroll-based animations
      if (!prefersReduced && !isMobileWidth && heroRef.current && contentRef.current) {
        // Subtle parallax effect - clean and minimal
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress
            // Subtle fade and slide for title
            if (titleLine1Ref.current && titleLine2Ref.current) {
              gsap.to([titleLine1Ref.current, titleLine2Ref.current], {
                y: progress * 30,
                opacity: 1 - progress * 0.6,
                duration: 0.3,
                ease: "none"
              })
            }
            // Subtitle fade
            if (subtitleRef.current) {
              gsap.to(subtitleRef.current, {
                y: progress * 20,
                opacity: 1 - progress * 0.7,
                duration: 0.3,
                ease: "none"
              })
            }
            // Content container - minimal movement
            if (contentRef.current) {
              gsap.to(contentRef.current, {
                y: progress * 25,
                duration: 0.3,
                ease: "none"
              })
            }
          }
        })

        // Scroll indicator fade out - clean and simple
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "center top",
          scrub: true,
          onUpdate: (self) => {
            if (scrollIndicatorRef.current) {
              gsap.to(scrollIndicatorRef.current, {
                opacity: 1 - self.progress * 2,
                duration: 0.3,
                ease: "none"
              })
            }
          }
        })
      }

      // Clean scroll fade out effect (removed complex 3D transforms)
      if (!prefersReduced && !isMobileWidth) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress
            if (titleLine1Ref.current && titleLine2Ref.current) {
              // Simple opacity fade
              gsap.to([titleLine1Ref.current, titleLine2Ref.current], {
                opacity: 1 - progress * 0.5,
                duration: 0.3,
                ease: "none"
              })
            }
          }
        })
      }

    }, heroRef)

    // Handle resize - ensure text remains visible if animation completed

    const handleResize = () => {
      // Use a small delay to check after resize completes
      setTimeout(() => {
        if (animationCompleted && titleLine1Ref.current && titleLine2Ref.current) {
          // Ensure visibility is maintained on resize
          const check1 = window.getComputedStyle(titleLine1Ref.current)
          const opacity1 = parseFloat(check1.opacity)
          
          // If somehow opacity got reset, restore it
          if (opacity1 < 0.9) {
            gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
              opacity: 1,
              y: 0
            })
          }
        }
      }, 100)
    }

    // Check if animation completed after a delay (fallback)
    const checkCompletion = setTimeout(() => {
      if (titleLine1Ref.current && titleLine2Ref.current) {
        const check1 = window.getComputedStyle(titleLine1Ref.current)
        const opacity1 = parseFloat(check1.opacity)
        if (opacity1 > 0.9) {
          animationCompleted = true
        }
      }
    }, 4000)
    
    window.addEventListener('resize', handleResize)
    ScrollTrigger.addEventListener('refresh', handleResize)

    return () => {
      ctx.revert()
      clearTimeout(checkCompletion)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.removeEventListener('refresh', handleResize)
    }
  }, [isLoaded])

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white"
    >
      {/* Floating Particles - Reduced on mobile for performance */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(isMobile ? 4 : 8)].map((_, i) => (
          <div
            key={i}
            className={`particle absolute ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-gray-300 rounded-full opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="container-max section-padding text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Title with Split Lines */}
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-display font-bold text-gray-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2"
          >
            <span 
              ref={titleLine1Ref}
              className="block will-change-transform opacity-0"
            >
              Jeremiah
            </span>
            <span 
              ref={titleLine2Ref}
              className="block text-gradient will-change-transform pb-2 sm:pb-3 opacity-0"
            >
              Panganoran
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-6 opacity-0"
          >
            Crafting <span className="font-medium text-gray-900">digital experiences</span> with precision and <span className="font-medium text-gray-900">creativity</span>
          </p>

        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 opacity-0"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="flex flex-col items-center space-y-2 sm:space-y-2.5">
          <span className="text-xs sm:text-sm md:text-base text-gray-500 font-medium tracking-wider uppercase">Scroll</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-300 rounded-full flex justify-center items-start relative group">
            <div className="w-1 h-1.5 sm:w-1.5 sm:h-2 bg-gray-900 rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero