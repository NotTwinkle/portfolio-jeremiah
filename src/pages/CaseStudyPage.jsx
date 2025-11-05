import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjectBySlug } from '../data/projects'
import SEO from '../components/SEO'

gsap.registerPlugin(ScrollTrigger)

const Section = ({ id, title, children }) => (
  <section id={id} className="space-y-4 pt-14">
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    {children}
  </section>
)

const CaseStudyPage = () => {
  const { slug } = useParams()
  const project = useMemo(() => getProjectBySlug(slug), [slug])
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const modalRef = useRef(null)
  const imageRefs = useRef({})

  // Handle click to open modal
  const handleImageClick = (highlight, index) => {
    setSelectedImage({ ...highlight, index })
  }

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  // Keyboard support for modal
  useEffect(() => {
    if (!selectedImage) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // Animate modal on open/close
  useEffect(() => {
    if (!modalRef.current) return

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    if (selectedImage) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [selectedImage])

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    // Scroll to top immediately when route changes
    // This ensures the page always starts at the top
    const scrollToTop = () => {
      // Use Lenis if available for smooth scroll, otherwise use native methods
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      } else {
        // Fallback to native scroll methods
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
    }
    
    // Scroll immediately and also after a small delay to ensure it works with Lenis
    scrollToTop()
    requestAnimationFrame(() => {
      scrollToTop()
    })
  }, [slug])

  useEffect(() => {
    if (!project) return
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      gsap.from(heroRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
      const sections = contentRef.current?.querySelectorAll('section')
      sections?.forEach((sec) => {
        gsap.from(sec, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: sec, start: 'top 80%' }
        })
      })
    })
    return () => ctx.revert()
  }, [project])

  if (!project) {
    return (
      <main className="min-h-screen container-max section-padding py-24">
        <SEO
          title="Case Study Not Found | Jeremiah P Panganoran"
          description="The requested case study could not be found."
        />
        <p className="text-gray-600">Case study not found.</p>
        <a href="/#projects" className="underline">Back to projects</a>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <SEO
        title={`${project.title} | Jeremiah P Panganoran`}
        description={project.description}
        keywords={project.technologies?.join(', ') || 'web development, React, portfolio'}
        image={project.coverImage || project.image}
        url={`/work/${project.slug}`}
        type="article"
      />
      <div className="container-max section-padding py-16">
        {/* Hero */}
        <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900">{project.title}</h1>
            <div className="text-sm uppercase tracking-[0.14em] text-gray-500">{project.year} • {project.role} • {project.scope}</div>
            <p className="text-lg text-gray-600 max-w-2xl">{project.description}</p>
            {project.privacyNote && (
              <p className="text-sm text-gray-500">{project.privacyNote}</p>
            )}
          </div>
          {/* Sticky TOC */}
          <aside className="hidden lg:block sticky top-20 self-start">
            <nav className="text-sm text-gray-600 space-y-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'goals', label: 'Goals & Constraints' },
                { id: 'stack', label: 'Tech Stack' },
                { id: 'responsibilities', label: 'Responsibilities' },
                { id: 'approach', label: 'Approach' },
                { id: 'challenges', label: 'Challenges → Solutions' },
                { id: 'results', label: 'Results' },
                { id: 'highlights', label: 'Highlights' }
              ].map(i => (
                <a key={i.id} href={`#${i.id}`} className="block hover:text-gray-900">{i.label}</a>
              ))}
            </nav>
          </aside>
        </div>

        {/* Cover image */}
        <div className="mt-10 mx-auto max-w-2xl md:max-w-3xl rounded-2xl overflow-hidden border border-black/10">
          <img src={project.coverImage || project.image} alt={project.title} className="w-full h-auto object-contain" />
        </div>

        {/* Content */}
        <div ref={contentRef} className="mt-14 max-w-3xl">
          <Section id="overview" title="Overview">
            <p className="text-gray-700">{project.description}</p>
          </Section>

          <Section id="goals" title="Goals & Constraints">
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {(project.goals || []).map((g, i) => <li key={i}>{g}</li>)}
              {(project.constraints || []).map((c, i) => <li key={`c-${i}`}>{c}</li>)}
            </ul>
          </Section>

          {project.techStack && project.techStack.length > 0 && (
            <Section id="stack" title="Tech Stack">
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {project.techStack.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </Section>
          )}

          {project.responsibilities && project.responsibilities.length > 0 && (
            <Section id="responsibilities" title="Responsibilities">
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {project.responsibilities.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </Section>
          )}

          <Section id="approach" title="Approach">
            <p className="text-gray-700">{project.approachText || 'Designed a focused MVP with accessible UI, performant data loads, and clear task flows. Iterated with feedback to reach measurable outcomes.'}</p>
          </Section>

          <Section id="challenges" title="Challenges → Solutions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Challenges</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {(project.challenges || []).map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Solutions</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {(project.solutions || []).map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </div>
            </div>
          </Section>

          <Section id="results" title="Results">
            {(project.results && project.results.length > 0) ? (
              <div className="grid grid-cols-2 gap-6">
                {project.results.map((r, i) => (
                  <div key={i} className="p-4 rounded-xl border border-black/10">
                    <div className="text-2xl font-display font-bold text-gray-900">{r.value}</div>
                    <div className="text-gray-600">{r.metric}</div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {(project.resultNotes || []).map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            )}
          </Section>

          <Section id="highlights" title="Highlights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(project.highlights || []).map((h, i) => (
                <div
                  key={i}
                  className="group rounded-xl border border-black/10 bg-white overflow-hidden cursor-pointer transition-all duration-300"
                  onClick={() => handleImageClick(h, i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Preview ${h.caption}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleImageClick(h, i)
                    }
                  }}
                >
                  {h.device === 'phone' ? (
                    <div className="flex items-center justify-center py-6 relative overflow-hidden">
                      <div className="phone-frame bg-black rounded-[3rem] p-2 shadow-2xl transition-transform duration-300 group-hover:scale-105" style={{ width: '280px' }}>
                        <div className="phone-content h-[520px] w-full bg-white rounded-[2.5rem] overflow-hidden relative">
                          <img src={h.image} alt={h.caption} className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>
                      {/* Desktop hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl pointer-events-none flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-900">
                          Click to enlarge
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden">
                      <img 
                        src={h.image} 
                        alt={h.caption} 
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Desktop hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-900">
                          Click to enlarge
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-3 text-sm text-gray-600">{h.caption}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Modal for mobile/preview */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={handleCloseModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-caption"
            >
              <div
                ref={modalRef}
                className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                  aria-label="Close preview"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {selectedImage.device === 'phone' ? (
                  <div className="flex items-center justify-center py-8 px-4">
                    <div className="phone-frame bg-black rounded-[3rem] p-2 shadow-2xl" style={{ width: '320px', maxWidth: '100%' }}>
                      <div className="phone-content h-[600px] w-full bg-white rounded-[2.5rem] overflow-hidden relative">
                        <img src={selectedImage.image} alt={selectedImage.caption} className="w-full h-full object-cover object-center" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={selectedImage.image} 
                    alt={selectedImage.caption} 
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
                <div id="modal-caption" className="p-4 bg-white border-t border-gray-200">
                  <p className="text-sm text-gray-600">{selectedImage.caption}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center gap-4">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white" style={{ backgroundColor: project.accentColor }}>Visit site</a>
            <a href="/#projects" className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 underline-offset-4 hover:underline">Back to projects</a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CaseStudyPage


