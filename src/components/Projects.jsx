import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { projects as dataProjects } from '../data/projects'

const Projects = () => {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const titleRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const scrollTriggerRef = useRef(null)

  const projects = dataProjects

  // Check if desktop breakpoint (lg: 1024px)
  const checkDesktop = () => {
    setIsDesktop(window.innerWidth >= 1024)
  }

  useEffect(() => {
    checkDesktop()
    const handleResize = () => {
      checkDesktop()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // shared cleanup bucket for listeners created inside ctx
    const cleanupListeners = []
    const ctx = gsap.context(() => {
      // Title animation
      gsap.set(titleRef.current, { opacity: 0, y: 50 })
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          })
        }
      })

      // Only enable horizontal scroll on desktop (lg breakpoint: 1024px)
      if (isDesktop && containerRef.current && wrapperRef.current) {
        const projectNodes = containerRef.current.children
        if (!projectNodes || projectNodes.length === 0) {
          return
        }

        const getScrollLength = () => {
          const container = containerRef.current
          if (!container) return 0
          return Math.max(0, container.scrollWidth - window.innerWidth)
        }

        // Horizontal scrolling animation with pinning (DESKTOP ONLY)
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let lastSnapIndex = 0
        const horizontalScroll = gsap.to(containerRef.current, {
          x: () => -getScrollLength(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: () => `+=${getScrollLength()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            pinType: 'transform',
            invalidateOnRefresh: true,
            onEnter: () => {
              const first = projectNodes[0]
              if (first) {
                if (prefersReduced) {
                  gsap.set(sectionRef.current, { backgroundColor: first.dataset.color })
                } else {
                  gsap.to(sectionRef.current, { backgroundColor: first.dataset.color, duration: 0.4, ease: 'power2.out' })
                }
                lastSnapIndex = 0
              }
            },
            onLeave: () => {
              if (prefersReduced) {
                gsap.set(sectionRef.current, { backgroundColor: 'rgb(249, 250, 251)' })
              } else {
                gsap.to(sectionRef.current, { backgroundColor: 'rgb(249, 250, 251)', duration: 0.4, ease: 'power2.out' })
              }
            },
            onEnterBack: () => {
              const first = projectNodes[0]
              if (first) {
                if (prefersReduced) {
                  gsap.set(sectionRef.current, { backgroundColor: first.dataset.color })
                } else {
                  gsap.to(sectionRef.current, { backgroundColor: first.dataset.color, duration: 0.4, ease: 'power2.out' })
                }
                lastSnapIndex = 0
              }
            },
            onUpdate: (self) => {
              const progress = self.progress
              const exactProjectIndex = progress * (projectNodes.length - 1)
              let snapIndex = Math.round(exactProjectIndex)
              snapIndex = Math.max(0, Math.min(projectNodes.length - 1, snapIndex))
              if (snapIndex !== lastSnapIndex) {
                const node = projectNodes[snapIndex]
                if (node) {
                  if (prefersReduced) {
                    gsap.set(sectionRef.current, { backgroundColor: node.dataset.color })
                  } else {
                    gsap.to(sectionRef.current, { backgroundColor: node.dataset.color, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
                  }
                  lastSnapIndex = snapIndex
                }
              }
            }
          }
        })

        scrollTriggerRef.current = horizontalScroll.scrollTrigger
      } else {
        // Mobile: Individual project entrance animations (vertical stack)
        const projectCards = sectionRef.current?.querySelectorAll('[data-project-card]')
        projectCards?.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: () => {
              gsap.fromTo(card, 
                { opacity: 0, y: 60 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out"
                }
              )
            }
          })
        })
      }

      // Recalculate on resize/refresh
      ScrollTrigger.addEventListener('refreshInit', () => {
        // gsap will re-evaluate the function-based x and end values on refresh
      })

    }, sectionRef)

    return () => {
      ctx.revert()
      cleanupListeners.forEach((fn) => fn())
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [isDesktop])

  return (
    <>
      <section 
        id="projects"
        ref={sectionRef}
        className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-x-hidden w-full"
        style={{ backgroundColor: 'rgb(249, 250, 251)' }}
      >
        <div className="container-max section-padding w-full max-w-full overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 3.75rem)' }}
            >
              Featured Projects
            </h2>
            <div className="w-24 sm:w-32 md:w-40 lg:w-48 h-0.5 sm:h-1 bg-gray-900 mx-auto mb-4 sm:mb-5 md:mb-6 lg:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed"
               style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.5rem)' }}
            >
              Selected projects across maintenance services, admin dashboards, and interactive web experiences.
            </p>
          </div>
        </div>

        {/* Desktop: Horizontal Scrolling Container | Mobile: Vertical Stack */}
        {isDesktop ? (
          <div 
            ref={wrapperRef}
            className="overflow-hidden w-full"
            style={{ height: '100vh', minHeight: '600px' }}
          >
            <div 
              ref={containerRef}
              className="flex h-screen min-h-[600px]"
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  data-color={project.color}
                  data-project-card
                  className="flex-shrink-0 w-screen h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-w-0"
                >
                  <div className="max-w-7xl 2xl:max-w-[1536px] w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 min-w-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center min-w-0">
                      {/* Project Image with Device Frame */}
                      <div className="min-w-0 w-full">
                        {project.type === "web" ? (
                          // Browser Window Mockup
                          <div className="relative h-96 lg:h-[500px]">
                          <div className="browser-frame h-full rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
                            {/* Browser Top Bar */}
                            <div className="browser-bar bg-gray-800 h-8 md:h-10 flex items-center gap-1.5 md:gap-2 px-2 md:px-3">
                              <div className="flex gap-1 md:gap-1.5">
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                              </div>
                              <div className="flex-1 mx-2 md:mx-4 bg-gray-700 rounded-md px-2 md:px-4 py-0.5 md:py-1">
                                <div className="text-[10px] md:text-xs text-gray-400 truncate">
                                  {project.liveUrl && project.liveUrl !== '#'
                                    ? (() => { try { return new URL(project.liveUrl).hostname } catch { return project.liveUrl } })()
                                    : project.title.toLowerCase().replace(/[^a-z0-9]+/g, '.') + '.com'}
                                </div>
                              </div>
                            </div>
                            {/* Browser Content */}
                            <div className="browser-content h-[calc(100%-2rem)] md:h-[calc(100%-2.5rem)]">
                              {project.showIframe && project.liveUrl !== "#" ? (
                                <iframe
                                  src={project.liveUrl}
                                  title={project.title}
                                  className="w-full h-full border-none"
                                  allow="fullscreen"
                                  loading="lazy"
                                />
                              ) : (
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // iPhone Mockup - Fixed size, scales proportionally to fit container
                        <div className="relative h-96 lg:h-[500px] flex items-center justify-center w-full min-w-0 overflow-hidden">
                          <div 
                            className="phone-frame bg-black rounded-[2rem] md:rounded-[3rem] p-1.5 md:p-2 shadow-xl md:shadow-2xl mx-auto" 
                            style={{ 
                              width: '250px',
                              height: '500px',
                              maxWidth: '100%',
                              maxHeight: '100%',
                              aspectRatio: '250 / 500'
                            }}
                          >
                            <div className="phone-content h-full w-full bg-white rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden relative">
                              {/* Notch */}
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                              {/* Screen Content */}
                              {project.showIframe && project.liveUrl !== '#' ? (
                                <iframe
                                  src={project.liveUrl}
                                  title={project.title}
                                  className="w-full h-full border-none"
                                  loading="lazy"
                                />
                              ) : (
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover object-center"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      </div>

                      {/* Project Content */}
                      <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 min-w-0 w-full">
                        <h3 
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-gray-900 break-words text-center md:text-left leading-tight"
                          style={{ fontSize: 'clamp(1.25rem, 3vw + 0.5rem, 3rem)' }}
                        >
                          {project.title}
                        </h3>

                        {/* Meta row */}
                        <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-500 uppercase tracking-wide sm:tracking-[0.12em] break-words text-center md:text-left"
                             style={{ fontSize: 'clamp(0.625rem, 1.5vw + 0.25rem, 1rem)' }}
                        >
                          {project.year} • {project.role} • {project.scope}
                        </div>
                        
                        <p 
                          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed break-words text-justify md:text-left"
                          style={{ 
                            fontSize: 'clamp(0.875rem, 2vw + 0.25rem, 1.25rem)',
                            display: '-webkit-box', 
                            WebkitLineClamp: 3, 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden' 
                          }}
                        >
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5 justify-center md:justify-start">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-medium rounded-full border transition-colors whitespace-nowrap"
                              style={{ 
                                borderColor: project.accentColor,
                                color: project.accentColor,
                                backgroundColor: 'transparent',
                                fontSize: 'clamp(0.5625rem, 1.2vw + 0.15rem, 0.75rem)'
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-medium rounded-full border border-black/10 text-gray-600 whitespace-nowrap"
                                  style={{ fontSize: 'clamp(0.5625rem, 1.2vw + 0.15rem, 0.75rem)' }}
                            >
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-black/10" />

                        {/* Project Links */}
                        <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center sm:items-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
                          <a
                            href={project.liveUrl}
                            className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-white font-semibold rounded-full transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap w-full sm:w-auto min-w-[120px] sm:min-w-0"
                            style={{ 
                              backgroundColor: project.accentColor,
                              fontSize: 'clamp(0.75rem, 1.5vw + 0.25rem, 1rem)'
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title}`}
                          >
                            Visit site
                            <span className="transition-transform duration-200 translate-x-0 group-hover:translate-x-[2px]">→</span>
                          </a>
                          <Link
                            to={`/work/${project.slug}`}
                            className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-medium rounded-full border-2 border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-colors break-words w-full sm:w-auto text-center min-w-[120px] sm:min-w-0"
                            style={{ fontSize: 'clamp(0.75rem, 1.5vw + 0.25rem, 1rem)' }}
                            aria-label={`Read case study for ${project.title}`}
                          >
                            Read case study
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div 
            ref={wrapperRef}
            className="w-full overflow-x-hidden"
          >
            <div 
              ref={containerRef}
              className="w-full max-w-full space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 pb-8 sm:pb-12 md:pb-16 lg:pb-24"
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  data-color={project.color}
                  data-project-card
                  className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-w-0"
                >
                  <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto w-full overflow-x-hidden min-w-0">
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full min-w-0">
                      {/* Project Image with Device Frame */}
                      <div className="order-1 min-w-0 w-full">
                        {project.type === "web" ? (
                          // Browser Window Mockup
                          <div className="relative h-64 md:h-80 lg:h-96 w-full max-w-full">
                            <div className="browser-frame h-full w-full rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
                              {/* Browser Top Bar */}
                              <div className="browser-bar bg-gray-800 h-8 md:h-10 flex items-center gap-1.5 md:gap-2 px-2 md:px-3">
                                <div className="flex gap-1 md:gap-1.5">
                                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex-1 mx-2 md:mx-4 bg-gray-700 rounded-md px-2 md:px-4 py-0.5 md:py-1 min-w-0">
                                  <div className="text-[10px] md:text-xs text-gray-400 truncate">
                                    {project.liveUrl && project.liveUrl !== '#'
                                      ? (() => { try { return new URL(project.liveUrl).hostname } catch { return project.liveUrl } })()
                                      : project.title.toLowerCase().replace(/[^a-z0-9]+/g, '.') + '.com'}
                                  </div>
                                </div>
                              </div>
                              {/* Browser Content */}
                              <div className="browser-content h-[calc(100%-2rem)] md:h-[calc(100%-2.5rem)] w-full overflow-hidden">
                                {project.showIframe && project.liveUrl !== "#" ? (
                                  <iframe
                                    src={project.liveUrl}
                                    title={project.title}
                                    className="w-full h-full border-none max-w-full"
                                    allow="fullscreen"
                                    loading="lazy"
                                  />
                                ) : (
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover max-w-full"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          // iPhone Mockup - Fixed size, scales proportionally to fit container
                          <div className="relative h-[400px] md:h-[450px] flex items-center justify-center w-full max-w-full min-w-0 overflow-hidden">
                            <div 
                              className="phone-frame bg-black rounded-[2rem] md:rounded-[3rem] p-1.5 md:p-2 shadow-xl md:shadow-2xl mx-auto" 
                              style={{ 
                                width: '200px',
                                height: '450px',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                aspectRatio: '200 / 450'
                              }}
                            >
                              <div className="phone-content h-full w-full bg-white rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden relative">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-10"></div>
                                {/* Screen Content */}
                                {project.showIframe && project.liveUrl !== '#' ? (
                                  <iframe
                                    src={project.liveUrl}
                                    title={project.title}
                                    className="w-full h-full border-none max-w-full"
                                    loading="lazy"
                                  />
                                ) : (
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-center max-w-full"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Project Content */}
                      <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 order-2 w-full min-w-0">
                        <h3 
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-gray-900 break-words text-center md:text-left leading-tight"
                          style={{ fontSize: 'clamp(1.25rem, 4vw + 0.5rem, 3rem)' }}
                        >
                          {project.title}
                        </h3>

                        {/* Meta row */}
                        <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-500 uppercase tracking-wide sm:tracking-[0.12em] break-words text-center md:text-left"
                             style={{ fontSize: 'clamp(0.625rem, 1.5vw + 0.25rem, 1rem)' }}
                        >
                          {project.year} • {project.role} • {project.scope}
                        </div>
                        
                        <p 
                          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed break-words text-justify md:text-left"
                          style={{ fontSize: 'clamp(0.875rem, 2vw + 0.25rem, 1.25rem)' }}
                        >
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5 justify-center md:justify-start">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-medium rounded-full border transition-colors whitespace-nowrap"
                              style={{ 
                                borderColor: project.accentColor,
                                color: project.accentColor,
                                backgroundColor: 'transparent',
                                fontSize: 'clamp(0.5625rem, 1.2vw + 0.15rem, 0.75rem)'
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-medium rounded-full border border-black/10 text-gray-600 whitespace-nowrap"
                                  style={{ fontSize: 'clamp(0.5625rem, 1.2vw + 0.15rem, 0.75rem)' }}
                            >
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-black/10" />

                        {/* Project Links */}
                        <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center sm:items-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
                          <a
                            href={project.liveUrl}
                            className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-white font-semibold rounded-full transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap w-full sm:w-auto min-w-[120px] sm:min-w-0"
                            style={{ 
                              backgroundColor: project.accentColor,
                              fontSize: 'clamp(0.75rem, 1.5vw + 0.25rem, 1rem)'
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title}`}
                          >
                            Visit site
                            <span className="transition-transform duration-200 translate-x-0 group-hover:translate-x-[2px]">→</span>
                          </a>
                          <Link
                            to={`/work/${project.slug}`}
                            className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-medium rounded-full border-2 border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-colors break-words w-full sm:w-auto text-center min-w-[120px] sm:min-w-0"
                            style={{ fontSize: 'clamp(0.75rem, 1.5vw + 0.25rem, 1rem)' }}
                            aria-label={`Read case study for ${project.title}`}
                          >
                            Read case study
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Projects