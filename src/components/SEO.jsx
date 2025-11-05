import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({ 
  title = 'Jeremiah P Panganoran | Web & App Developer',
  description = 'Passionate web and application developer dedicated to creating beautiful, functional, and impactful digital experiences. Specialized in React, Next.js, Flutter, and modern web technologies.',
  keywords = 'web developer, application developer, React developer, Next.js, Flutter, JavaScript, TypeScript, portfolio, software engineer, frontend developer',
  image = '/og-image.jpg',
  url,
  type = 'website',
  author = 'Jeremiah P Panganoran',
  robots = 'index, follow'
}) => {
  const location = useLocation()
  const siteUrl = 'https://yourportfolio.com' // Update with your actual domain
  const currentUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : `${siteUrl}${location.pathname}`
  const fullImageUrl = image && (image.startsWith('http') || image.startsWith('data:')) ? image : `${siteUrl}${image}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let element = document.querySelector(selector)
      
      if (!element) {
        element = document.createElement('meta')
        if (isProperty) {
          element.setAttribute('property', name)
        } else {
          element.setAttribute('name', name)
        }
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Update or create link tags
    const updateLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`)
      
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
      }
      
      element.setAttribute('href', href)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', author)
    
    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', fullImageUrl, true)
    updateMetaTag('og:url', currentUrl, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Jeremiah P Panganoran Portfolio', true)
    updateMetaTag('og:locale', 'en_US', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', fullImageUrl)
    updateMetaTag('twitter:creator', '@yourtwitter') // Update with your Twitter handle
    updateMetaTag('twitter:site', '@yourtwitter') // Update with your Twitter handle

    // Canonical URL
    updateLinkTag('canonical', currentUrl)

    // Additional meta tags
    updateMetaTag('robots', robots)
    updateMetaTag('theme-color', '#1F2937')
    updateMetaTag('apple-mobile-web-app-capable', 'yes')
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent')
    updateMetaTag('apple-mobile-web-app-title', 'Jeremiah Portfolio')

  }, [title, description, keywords, image, url, type, author, currentUrl, fullImageUrl, location.pathname])

  // Structured Data (JSON-LD)
  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create Person schema
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Jeremiah P Panganoran',
      jobTitle: 'Web & Application Developer',
      description: description,
      url: siteUrl,
      sameAs: [
        'https://github.com/NotTwinkle',
        'https://www.linkedin.com/in/jeremiah-panganoran-39bb9a306/',
        'https://www.facebook.com/jeremiah.panganoran.2024/'
      ],
      email: 'jeremiahpatorpanganoran@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dasmariñas',
        addressRegion: 'Cavite',
        addressCountry: 'Philippines'
      }
    }

    // Create WebSite schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Jeremiah P Panganoran Portfolio',
      url: siteUrl,
      description: description,
      author: {
        '@type': 'Person',
        name: 'Jeremiah P Panganoran'
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify([personSchema, websiteSchema])
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [description, siteUrl])

  return null
}

export default SEO

