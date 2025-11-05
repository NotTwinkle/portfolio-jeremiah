import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef(null)
  const wordmarkRef = useRef(null)
  const captionRef = useRef(null)
  const progressTrackRef = useRef(null)
  const progressBarRef = useRef(null)
  const skipBtnRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Setup
      gsap.set([wordmarkRef.current, captionRef.current], { opacity: 0, y: 8 })
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' })

      if (prefersReduced) {
        // Minimal path
        gsap.set([wordmarkRef.current, captionRef.current], { opacity: 1, y: 0 })
        gsap.set(progressBarRef.current, { scaleX: 1 })
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => onComplete()
        })
        return
      }

      // Entry
      const tl = gsap.timeline()
      tl.to(wordmarkRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .to(captionRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .to(progressTrackRef.current, { opacity: 1, duration: 0.3, ease: 'power1.out' }, '-=0.2')

      // Progress: ramp to ~80% quickly while awaiting fonts
      const fontsReady = document?.fonts?.ready ?? Promise.resolve()
      const maxWait = new Promise(resolve => setTimeout(resolve, 1500))
      const minDisplayMs = 2400
      const startTs = performance.now()

      gsap.to(progressBarRef.current, { scaleX: 0.8, duration: 0.9, ease: 'power2.out' })

      Promise.race([fontsReady, maxWait]).finally(() => {
        const elapsed = performance.now() - startTs
        const remaining = Math.max(0, minDisplayMs - elapsed)
        const fillDuration = Math.max(0.5, Math.min(1.0, (remaining / 1000) * 0.7))
        const holdDelay = Math.max(0.2, Math.min(0.6, (remaining / 1000) * 0.3))

        gsap.to(progressBarRef.current, {
          scaleX: 1,
          duration: fillDuration,
          ease: 'power2.out',
          onComplete: () => {
            gsap.delayedCall(holdDelay, () => {
              // Exit
              gsap.to([wordmarkRef.current, captionRef.current], { opacity: 0.0, y: -8, duration: 0.35, ease: 'power1.inOut' })
              gsap.to(loaderRef.current, {
                opacity: 0,
                y: -24,
                duration: 0.55,
                ease: 'power2.inOut',
                onComplete: () => onComplete()
              })
            })
          }
        })
      })

      // Reveal skip button slightly after start
      gsap.to(skipBtnRef.current, { opacity: 1, duration: 0.3, delay: 0.6, ease: 'power1.out' })

    }, loaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-white text-[#0A0A0A] flex items-end"
      style={{ willChange: 'opacity, transform' }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="w-full max-w-3xl mx-auto px-6 pb-12">
        <div className="space-y-6">
          <div ref={wordmarkRef} className="font-medium tracking-tight text-2xl">
            Panganoran
          </div>

          <div ref={progressTrackRef} className="relative h-[2px] w-full opacity-0">
            <div className="absolute inset-0 h-px bg-black/10" />
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 h-[2px] bg-[#0A0A0A]"
              style={{ width: '0%', transformOrigin: 'left center' }}
            />
          </div>

          <div ref={captionRef} className="flex items-center justify-between text-[11px] text-black/55 uppercase tracking-[0.14em]">
            <span>Portfolio</span>
            <span>Loading</span>
          </div>

          <button
            ref={skipBtnRef}
            onClick={() => onComplete()}
            className="mt-2 text-[11px] text-black/40 underline underline-offset-2 opacity-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-sm"
            aria-label="Skip loading"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
