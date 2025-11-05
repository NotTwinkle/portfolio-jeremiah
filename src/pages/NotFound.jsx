import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import SEO from '../components/SEO'

const NotFound = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const messageRef = useRef(null)
  const buttonsRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (prefersReduced) {
        gsap.set([titleRef.current, messageRef.current, buttonsRef.current], { opacity: 1, y: 0 })
        return
      }

      gsap.set([titleRef.current, messageRef.current, buttonsRef.current], { opacity: 0, y: 30 })
      
      const tl = gsap.timeline()
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
      .to(messageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-white flex items-center justify-center px-4">
      <SEO
        title="404 - Page Not Found | Jeremiah P Panganoran"
        description="The page you're looking for doesn't exist or has been moved."
        robots="noindex, follow"
      />
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-9xl md:text-[12rem] font-display font-bold text-gray-900 leading-none">
            404
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mt-4"></div>
        </div>

        {/* Message */}
        <div ref={messageRef} className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline transition-colors duration-200"
          >
            View Projects
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link to="/#contact" className="text-gray-900 hover:underline font-medium">
              Contact me
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default NotFound

