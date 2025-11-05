import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const About = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)
  const skillsGridRef = useRef(null)
  const dividerRef = useRef(null)
  const [activeTip, setActiveTip] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, contentRef.current], {
        opacity: 0,
        y: 100
      })

      gsap.set(statsRef.current, {
        opacity: 0,
        y: 50
      })

      gsap.set(skillsGridRef.current, {
        opacity: 0,
        scale: 0.9
      })

      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left"
      })

      // Create scroll-triggered animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          const tl = gsap.timeline()
          
          // Divider expands
          tl.to(dividerRef.current, {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out"
          })
          // Title appears
          .to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          }, "-=0.8")
          // Subtitle follows
          .to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.6")
          // Content appears
          .to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.4")
          // Stats appear
          .to(statsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
          }, "-=0.4")
          // Skills grid appears with stagger
          .to(skillsGridRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, "-=0.2")
        }
      })

      // Animate progress bars
      const progressBars = skillsGridRef.current?.querySelectorAll('[data-width]')
      progressBars?.forEach((bar, index) => {
        ScrollTrigger.create({
          trigger: bar,
          start: "top 85%",
          onEnter: () => {
            gsap.to(bar, {
              width: bar.getAttribute('data-width') + '%',
              duration: 1.5,
              ease: "power2.out",
              delay: index * 0.1
            })
          }
        })
      })

      // Parallax effect for section
      gsap.to(sectionRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

      // Number counting animation for stats
      const counters = statsRef.current?.querySelectorAll('.counter')
      counters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'))
        let current = 0
        const increment = target / 50
        
        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          onEnter: () => {
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                counter.textContent = target + '+'
                clearInterval(timer)
              } else {
                counter.textContent = Math.ceil(current) + '+'
              }
            }, 30)
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Dismiss active tooltip on outside tap or Escape
  useEffect(() => {
    const handleDocClick = () => setActiveTip(null)
    const handleKey = (e) => { if (e.key === 'Escape') setActiveTip(null) }
    document.addEventListener('click', handleDocClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('click', handleDocClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const stats = [
    { number: 2, suffix: '+', label: 'Years Experience' },
    { number: 7, suffix: '+', label: 'Projects Completed' },
    { number: 3, suffix: '+', label: 'Happy Clients' }
  ]

  const categories = [
    {
      title: 'Programming & Scripting Languages',
      items: [
        { name: 'Flutter (Dart)', icon: 'https://cdn.simpleicons.org/flutter/02569B', level: 8 },
        { name: 'Dart', icon: 'https://cdn.simpleicons.org/dart/0175C2', level: 8 },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 5 },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' , level: 4},
        { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF' , level: 5},
        { name: 'SQL', icon: 'https://cdn.simpleicons.org/sqlite/003B57' , level: 4},
        { name: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26' , level: 9},
        { name: 'CSS', icon: 'https://cdn.worldvectorlogo.com/logos/css-3.svg' , level: 9},
        { name: 'Swift', icon: 'https://cdn.simpleicons.org/swift/FA7343', level: 4 },
      ]
    },
    {
      title: 'Frameworks & Libraries',
      items: [
        { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', level: 7 },
        { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' , level: 5},
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' , level: 4},
        { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/000000' , level: 4},
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { name: 'GSAP', icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3NTc3Nzc3OC83Nzc3NzA1Kzc3Kzc3NTc3NzcyMjI3NzU1NTI4Nzc2Nzc1Nf/AABEIABwAHAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAFBgcIAv/EADEQAAECBAQEBAQHAAAAAAAAAAECAwQFERIABhMhFDFBUQcVYaEWInGBMjM0QnKisf/EABoBAAMAAwEAAAAAAAAAAAAAAAMEBQECBgD/xAAnEQABAwMDAwQDAAAAAAAAAAABAAIDBBESBRMhMUFRFCKh0XHB8P/aAAwDAQACEQMRAD8AQsk5Rh5rCGYTIrLJUUtNINLqcyT9f8wjU1JYcWrn9W1Z9O/Zh69yi858Nm3lwy5KtTQW6lDyHDcEJP7x127YHFWnnNaUOryOBE/Pj6TXD+E+XHYHQIig9b+p1fmr3p+H2wD10t7pqKtmc656KM5ilD0hncXK4lQW5DOW3gUChSoP3BBxWjeJGBw7quxwc0OCdvDGbrcaVKVw7q0tqK0OoTVKQeiu29aYQrYuc7rmtbohuCcOHPb6R/OOcHstvQbMPBOqKnErcccSUoWgHdCT1Pr09a4FT0wlBJK9ptC2Vpc4qgszdLch818vmFNO/heHOvyrS3v98K7fvxuP0nY4sTjdZrzLOHZ/PYyavIDaoly4IBrakABIr1oAN8XYoxGwNHZV2NwaGqn+FCIdWXQWaausrWpzu6e1MTK2+7yuX1ZrzV+7pYW/vynePblaUQHm+lTjGuG1KfnV+WnrzwszPnHx8ItIx/OPj4TONsBTizH4j8J8cTjgLNHX3s5X0F/9rsX6a+y3JVYb7YuhMonExkz5flkW5DrUKKt3CvqDscEfGyQWcLr0sMcos8XXc5ns0njqHJrGuRBbFEBVAlPeiRsMYjiZGLNFlmOJkQswWRP49zVwHBedROjbbXa+n86Xe+NPTQ3yxWNmO97JbwdFX//Z', level: 5 },
        { name: 'Lenis', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX/mKL/maP/m6bhh4/6lZ/vj5j/nafKeYGtaG+3bnUAAAA9JynykJq2bXQABQPXgYkIDAtzRksODg7/nqljPUGnZWsnGxxKLjHoi5TagosXExNEKy1ZNzp8TFCKU1mgYGaSWV5rQUUrHR6iEpYNAAAA+klEQVR4AY3Nh5aEIAxA0QQDi9FBlkzv+v8fufFMI9uf3UuBf4V4ezgNweYa8ggQ3mKMLXjDoeGuRwgLnksDWsv8HtTKXCryMhw4l7SUFWvqeV0hNZFL2mw9EbU7fd1XCCgpp4NDdI2TY2KzJ8g+67Igpy3KkXcBvqKc2aNsBms3VFOkxoGGBnN34aJ4+x0GsDPjDedkdQ0GxxdK5MtPGFb8I7qWy0+I2/4rHsdUmBC3OOPKVZh4qzu1AbeAnrkDfGHhRi43m7FDhBfmbQjXhbgtan5dG9KC+j4Ctb3md2Rs4qq1tXUqz+x+2BeuMgYUV1UXQqhzJms/9wGVWBRbqzDsUwAAAABJRU5ErkJggg==', level: 5 },
        { name: 'Puppeteer', icon: 'https://cdn.simpleicons.org/puppeteer/40B5A4' , level: 4},
        { name: 'Playwright', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAw1BMVEVHcEwlkykhkygqRk4iiSwcjSIikiorqjIekSMonTWITFHUU0pidjYqqDAvqzO6T03lV03UU0hneS8RjyEmnysurjIurDMuqjQuqDS6UEvXU0jdVEnPU0cejCUtrTKlYzw7hicofD0rYUcpZEQtrTJyT07IUkrRU0krcEEurjIvrTIvP1SdTUwrbUVFR1Aqd0EurDMsRVFxSk65UUqTYT+mUE0kgzEkezYurjLcVErOUEktU1AtMlYumzp2Sk5CQFMrXUfEPu4pAAAAQXRSTlMAdrE62v/zHP4JEFTgVy5ppfD////qz7yPQf///vj///+iiPFpJ+XVl/NKGben19bbrDna7pbs/Pu0g1hq32GFvMOhKtwAAAENSURBVHgBzJFFYgMxDABDhjAzMywzw/9fVSnecnvPHD0Wl16ZcuV/V60Ryv4N5ISQCqv/oRrNFgE4r7Q7DOgw8Yp0e/3BkDz1aDyZTifjGaaYL54sVyDXHORGIORKyO2O7w9HSkaFPGHa8wXU9bLcElKr3I4c5Bjc/YFSkhfXeXOx2GLJNZScKKp230w6JaSLeQuJJfVZx9CwJGJa6Po29LPmouRYv7eLCR0IvXY1TlxF8+jYRz0VuxKhQWjDKJUoPiha4m/u2KsgvSz6C5yTVMqdaJ9A4OcS66m1hI520A/Vdcg77gghkDJZVj1OihWA+4FkuGJ3euevw2R5LUmms3PpT6QojqtvG9jkCADsEyAznlq7EQAAAABJRU5ErkJggg==', level: 4 },
      ]
    },
    {
      title: 'Databases',
      items: [
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' , level: 4},
        { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' , level: 4},
        { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' , level: 6},
        { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' , level: 7},
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' , level: 6},
      ]
    },
    {
      title: 'Tools & Platforms',
      items: [
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' , level: 8},
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' , level: 8},
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', level: 9},
        { name: 'Android Studio', icon: 'https://cdn.simpleicons.org/androidstudio/3DDC84' , level: 5},
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37', level: 5},
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' , level: 7},
        { name: 'Canva', icon: 'https://cdn.simpleicons.org/canva/00C4CC' },
        { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' , level: 7 },
        { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' , level: 7},
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' , level: 5},
        { name: 'Cursor IDE', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUUEgsNCgAJBgAkIh1QT0o9OzYfHRgODAAYFg9FRD1ZWFNDQTw7OTRVVE8uLCVKSUQsKiMyMCobGRO8u7r09PTo6Ofh4N+BgX7///+hoJ3W1dLc29hoZ2PIx8R1dHCzsq5gX1tycW1tbGiXlpMAAABPX0V9AAAA0ElEQVR4Ab3RRYLEIAAAQYgnaNyDLP//4khcjzt9LRzwiyB8JMt2XO+e/SCMIoQwuDKEOCKEoE/0rBYlXyNozD6wh1g4xum3mCebQZRm+b4C+xsyVmbVVlFTuEPioHqhvGlcfEBCmJPO1Jb4hJ/Crsjapmn6GJ1x7Gtt595gN3Ttx0SMLiiVUiNK94yRHiZshdbsgM5IIzZaqaFDPljj3YLt34gc7DJ4Xrbv1KCwOf2mYcOguqJUAzM+OGcl0aBTHSUWuMvQTnEDHoLGQPD/vQEqLRggRsFNbQAAAABJRU5ErkJggg==' , level: 9},
        { name: 'Xcode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg' , level: 5},
        { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' , level: 5},
        { name: 'CocoaPods', icon: 'https://cdn.simpleicons.org/cocoapods/EE3322' , level: 5}
      ]
    }
  ]

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden w-full"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-50 rounded-full blur-3xl opacity-30"></div>

      <div className="container-max section-padding relative z-10 w-full max-w-full overflow-x-hidden min-w-0">
        {/* Section Title */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <h2 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-gray-900 leading-none break-words"
            >
              About Me
            </h2>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed break-words"
          >
            Crafting digital experiences through code, creativity, and passion
          </p>
        </div>

        {/* Divider */}
        <div 
          ref={dividerRef}
          className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12 sm:mb-16 md:mb-20"
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 mb-12 sm:mb-16 md:mb-20">
          {/* Left Column - Story */}
          <div ref={contentRef} className="space-y-6 sm:space-y-8 w-full min-w-0">
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed break-words text-justify">
              <p className="text-xl sm:text-2xl font-medium text-gray-900 mb-6 sm:mb-8 text-justify">
                I'm a passionate web and application developer dedicated to creating beautiful,
                functional, and impactful digital experiences — and I'm strict about UI/UX design
                to ensure interfaces are intuitive, consistent, and accessible.
              </p>
              
              <p className="text-justify">
                With 2 years of experience in web and application development, I've had 
                the privilege of working on diverse projects ranging from elegant portfolio 
                websites to complex enterprise applications.
              </p>
              
              <p className="text-justify">
                My approach combines technical expertise with creative problem-solving, always 
                striving for solutions that are not just functional, but delightful to use. 
                I believe in writing clean, maintainable code and staying current with the 
                latest technologies and best practices.
              </p>

              <p className="text-justify">
                When I'm not coding, you'll find me exploring the latest tech trends, 
                contributing to open-source projects, or sharing knowledge with the developer 
                community. Continuous learning and growth are at the heart of everything I do.
              </p>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div ref={statsRef} className="space-y-6 sm:space-y-8 w-full min-w-0">
            {stats.map((stat, index) => (
              <div key={index} className="group w-full">
                <div className="flex items-baseline gap-3 sm:gap-4 mb-2 sm:mb-3 min-w-0">
                  <span 
                    className="counter text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gray-900 flex-shrink-0"
                    data-target={stat.number}
                  >
                    0+
                  </span>
                  <div className="h-px flex-1 bg-gray-200 mt-4 group-hover:bg-gray-400 transition-colors min-w-0"></div>
                </div>
                <p className="text-base sm:text-lg text-gray-600 font-medium break-words">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section (as cards with icons) */}
        <div ref={skillsGridRef} className="mt-12 md:mt-20 w-full overflow-x-hidden min-w-0">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8 md:mb-12 text-center md:text-left">
            Tech Stack & Tools
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-full min-w-0">
            {categories.map((cat, idx) => (
              <div key={idx} className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 md:p-6 shadow-sm w-full max-w-full min-w-0 overflow-hidden">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 break-words">{cat.title}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 w-full max-w-full min-w-0">
                  {cat.items.map((it, i) => {
                    const tipId = `${idx}-${i}`
                    return (
                    <div
                      key={i}
                      className="group relative flex items-center gap-1.5 sm:gap-2 rounded-lg border border-black/10 px-2 sm:px-3 py-2 hover:border-gray-300 transition-colors focus-within:border-gray-300 min-w-0 w-full max-w-full overflow-hidden"
                      tabIndex={0}
                      role="button"
                      aria-label={`${it.name} proficiency`}
                      aria-expanded={activeTip === tipId}
                      onClick={(e) => { e.stopPropagation(); setActiveTip(prev => prev === tipId ? null : tipId) }}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTip(prev => prev === tipId ? null : tipId) } }}
                    >
                      {it.icon === 'inline-lenis' ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 17l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <img
                          src={it.icon}
                          alt={it.name}
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm object-contain flex-shrink-0"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <span className="text-xs sm:text-sm text-gray-800 truncate min-w-0 flex-1">{it.name}</span>
                      {/* Tooltip */}
                      <div className={`pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 rounded-md bg-gray-900 px-2 sm:px-3 py-2 text-[10px] sm:text-[11px] text-white shadow-lg transition-opacity duration-150 whitespace-nowrap ${activeTip === tipId ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 md:group-hover:opacity-100'}`}>
                        <div className="mb-1 font-medium">Proficiency: {it.level ? `${it.level}/10` : 'Proficient'}</div>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          {[...Array(10)].map((_, idx) => (
                            <span key={idx} className={`${idx < (it.level || 7) ? 'bg-emerald-400' : 'bg-white/25'} h-1 sm:h-1.5 w-1.5 sm:w-2 rounded`}></span>
                          ))}
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About