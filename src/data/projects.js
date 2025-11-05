import isagipImg from '../assets/isagip.png'
import isagipCover from '../assets/isagip_cover.png'
import isagipHighlight1 from '../assets/isagip_highlight_1.png'
import isagipHighlight2 from '../assets/isagip_highlight_2.png'
import isagipHighlightMobile1 from '../assets/isagip_highlight_mobile_1.png'
import isagipHighlightMobile2 from '../assets/isagip_highlight_mobile_2.png'
import isagipHighlightMobile3 from '../assets/isagip_highlight_mobile_3.png'
import vpmedCover from '../assets/vpmed_cover.png'
import vpmedHighlight1 from '../assets/vpmed_highlight_1.png'
import vpmedHighlight2 from '../assets/vpmed_highlight_2.png'
import vpmedHighlight3 from '../assets/vpmed_highlight_3.png'
import hanapbuhayImg from '../assets/hanapbuhay.png'
import hanapbuhayCover from '../assets/Hanapbuhay_cover.png'
import hanapbuhayHighlight0 from '../assets/hanapbuhay_highlight_0.png'
import hanapbuhayHighlight1 from '../assets/hanapbuhay_highlight_1.png'
import hanapbuhayHighlight2 from '../assets/hanapbuhay_highlight_2.png'
import hanapbuhayHighlight3 from '../assets/hanapbuhay_highlight_3.png'
import hanapbuhayHighlight4 from '../assets/hanapbuhay_highlight_4.png'
import hanapbuhayHighlight5 from '../assets/hanapbuhay_highlight_5.png'
import hanapbuhayHighlight6 from '../assets/hanapbuhay_highlight_6.png'
import hanapbuhayHighlight7 from '../assets/hanapbuhay_highlight_7.png'
import hanapbuhayHighlight8 from '../assets/hanapbuhay_highlight_8.png'


export const projects = [
  {
    id: 1,
    slug: 'vpmed-medical-solutions-platform',
    title: 'VPMED – Medical Equipment Maintenance',
    description: 'A medical equipment repair and maintenance platform: quotations → work orders → completion → invoicing, with PDF generation, gallery CMS, and an admin dashboard.',
    technologies: ['React + TypeScript', 'Supabase', 'React PDF', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    coverImage: vpmedCover,
    color: 'rgb(240, 253, 244)',
    accentColor: 'rgb(34, 197, 94)',
    liveUrl: 'https://vpmed.xyz',
    type: 'web',
    showIframe: true,
    year: '2025',
    role: 'Full‑stack',
    scope: 'Maintenance Service',
    caseStudyUrl: '',
    privacyNote: 'Some operational details and client identifiers have been anonymized.',
    techStack: ['React 19 + TypeScript', 'Tailwind 4', 'Framer Motion', 'Supabase Auth + Postgres', 'React PDF'],
    goals: [
      'Standardize quotes → work orders → invoices in one flow',
      'Generate printable PDFs without external tools',
      'Show proof of work through a curated gallery',
      'Keep admin UI responsive on low‑end devices'
    ],
    constraints: [
      'Short delivery window; no bespoke backend servers',
      'Privacy—no exposure of client PII in public gallery',
      'Mobile‑first use in field conditions'
    ],
    challenges: [
      'Deriving totals from parts + labor consistently across edits',
      'Guarding state transitions (approved → in_progress → completed → invoiced)',
      'Avoiding data loss when a long quote is interrupted',
      'Keeping PDF layout consistent across browsers and printers'
    ],
    solutions: [
      'Single source of truth for totals in Supabase CRUD layer; totals recalculated on create/update',
      'Explicit service status machine with gated actions; invoice button only after completion',
      'Local draft autosave/restore with clear‑draft UX affordance',
      'React PDF for deterministic serverless documents + in‑app preview modal'
    ],
    responsibilities: [
      'Designed Supabase schema (completed_services, parts_used, gallery_items, gallery_images) and CRUD endpoints',
      'Implemented Supabase Auth (PKCE) and protected routes with session persistence',
      'Built dashboard UI with filters, stats, and Framer Motion micro‑interactions',
      'Implemented quotation/invoice flow with PDF generation and preview',
      'Deployed to Vercel and configured environment‑based Supabase client'
    ],
    results: [
      { metric: 'Quote prep time', value: '−35%*' },
      { metric: 'Edit errors', value: '−22%*' },
      { metric: 'PDF turnaround', value: '< 3s*' }
    ],
    highlights: [
      { image: vpmedHighlight1, caption: 'Homepage: Hero section with service highlights and statistics' },
      { image: vpmedHighlight2, caption: 'Services page: Professional services overview with search and filters' },
      { image: vpmedHighlight3, caption: 'Admin dashboard: Service management with KPIs, filters, and quotation workflow' }
    ]
  },
  {
    id: 8,
    slug: 'hanapbuhay-ai-job-platform',
    title: 'Hanapbuhay — AI‑Assisted Job Platform',
    description: 'A multi‑role job platform for Applicants, Employers, and Admins. Uses Supabase for auth/data, Google Gemini for AI resume screening and job recommendations, OneSignal for push notifications, and ZEGOCLOUD for video interviews with attendance tracking and calendar scheduling.',
    technologies: ['Flutter', 'Supabase', 'Google Gemini', 'OneSignal', 'ZEGOCLOUD'],
    image: hanapbuhayImg,
    coverImage: hanapbuhayCover,
    color: 'rgb(234, 249, 231)',
    accentColor: 'rgb(76, 167, 113)',
    liveUrl: '#',
    type: 'mobile',
    showIframe: false,
    year: '2025',
    role: 'Lead Developer',
    scope: 'Mobile Platform',
    caseStudyUrl: '',
    privacyNote: 'Email templates, auth tokens, and user data are anonymized for privacy.',
    techStack: [
      'Flutter (Dart) + Provider',
      'Supabase (Auth, Postgres, RLS, RPC)',
      'Google Generative AI (Gemini)',
      'OneSignal SDK + REST (push)',
      'ZEGOCLOUD UIKit + Signaling (video calls)',
      'SharedPreferences, Deep Links (App Links)'
    ],
    goals: [
      'Accelerate candidate screening using AI to assist employers',
      'Deliver reliable auth with deep‑link email verification and Google sign‑in',
      'Provide rich engagement via push notifications for all critical events',
      'Enable scheduling and live video interviews with attendance tracking',
      'Onboard applicants with job preferences for better matches'
    ],
    constraints: [
      'Mobile‑first performance and offline‑resilient flows',
      'Strict privacy via database RLS and minimal client secrets',
      'Avoid vendor lock‑in; prefer Supabase SQL + RPC over custom servers'
    ],
    challenges: [
      'Parsing resumes reliably (PDFs, structured profiles, fallbacks)',
      'Handling email verification flows across mobile deep links and web',
      'Delivering notifications even when app is terminated',
      'Coordinating calendar scheduling, reschedules, and reminders',
      'Ensuring suspended accounts are routed and messaged correctly'
    ],
    solutions: [
      'Resume pipeline: structured profile → extracted text via Syncfusion PDF → cover letter fallback',
      'Supabase deep links: token_hash verifyOTP flow with robust error dialogs and success routing',
      'OneSignal SDK + REST delivery plus DB logging to track status (pending/sent/delivered/clicked)',
      'Calendar services with employer/applicant views, reminders, and reschedule requests',
      'Suspension checks at splash/auth provider; dedicated suspension screen'
    ],
    responsibilities: [
      'Architected services layer (AI, notifications, calendar, video_call, auth)',
      'Implemented Supabase schema and RPCs for notifications and AI screening results',
      'Built onboarding flow (job preferences), role‑based navigation, and deep link handling',
      'Integrated OneSignal (login/subscribe, REST API sender, device registry)',
      'Integrated ZEGOCLOUD for prebuilt video rooms and attendance tracking'
    ],
    results: [
      { metric: 'Time to shortlist', value: '−40%*' },
      { metric: 'Interview no‑shows (with reminders)', value: '−18%*' },
      { metric: 'Onboarding completion', value: '+25%*' }
    ],
    highlights: [
      { image: hanapbuhayHighlight0, caption: 'Onboarding splash with brand and CTA', device: 'phone' },
      { image: hanapbuhayHighlight1, caption: 'Welcome & Sign‑in screen with form validation', device: 'phone' },
      { image: hanapbuhayHighlight2, caption: 'Admin dashboard metrics and recent activity', device: 'phone' },
      { image: hanapbuhayHighlight3, caption: 'Applicant home with AI job recommendations', device: 'phone' },
      { image: hanapbuhayHighlight4, caption: 'Employer home with job postings overview', device: 'phone' },
      { image: hanapbuhayHighlight5, caption: 'Onboarding: job preferences selection flow', device: 'phone' },
      { image: hanapbuhayHighlight6, caption: 'Apply flow with AI‑generated cover letter + resume upload', device: 'phone' },
      { image: hanapbuhayHighlight7, caption: 'Messages list for employer ↔ applicant conversations', device: 'phone' },
      { image: hanapbuhayHighlight8, caption: 'Calendar scheduling with pending/upcoming filters', device: 'phone' }
    ],
    // Case study narrative
    approachText: 'Service‑oriented Flutter app with Supabase as the backend of record. AI screening enriches employer review; notifications drive engagement; deep links unify auth flows across platforms. Emphasis on reliability, privacy (RLS), and clear UX states.'
  },
  {
    id: 7,
    slug: 'isagip-disaster-response',
    title: 'iSagip — Smart Disaster & Emergency Response System',
    description: 'A mobile app that helps people get quick help during emergencies. It lets users send an SOS, alerts nearby volunteers, and shows responders where to go.',
    technologies: ['Mobile UX', 'Real-time Weather UI', 'Hotline Dialer', 'Design System'],
    image: isagipImg,
    coverImage: isagipCover,
    color: 'rgb(237, 247, 237)',
    accentColor: 'rgb(16, 185, 129)',
    liveUrl: 'https://isagip.xyz',
    type: 'mobile',
    year: '2025',
    role: 'Application Developer & UI',
    scope: 'Emergency App',
    caseStudyUrl: '',
    showIframe: false,
    goals: [
      'Fast help when someone needs it',
      'Works even with little or no internet',
      'Accurate location and directions',
      'Keep people’s info safe'
    ],
    constraints: [],
    approachText: 'Simple SOS flow that shares location; alerts the closest volunteers and responders; keeps working offline and syncs full details when back online.',
    challenges: [
      'Spotty internet',
      'Finding nearby helpers without draining the battery',
      'Avoiding alerts to the person who reported the emergency'
    ],
    solutions: [
      'SOS works offline and uploads details later',
      'Finds nearby volunteers efficiently and shows directions',
      'Extra checks to avoid sending alerts to the wrong person'
    ],
    resultNotes: [
      'SOS reaches help faster, even with no internet',
      'More volunteers respond due to timely, nearby alerts',
      'Clear directions and live updates help responders arrive sooner'
    ],
    highlights: [
      { image: isagipHighlight1, caption: 'Secure portal login for operations team (CDRRMO partnership)' },
      { image: isagipHighlight2, caption: 'Admin analytics dashboard with AI risk forecast and incident KPIs' },
      { image: isagipHighlightMobile1, caption: 'Mobile: Home with hotlines, weather chips, and SOS', device: 'phone' },
      { image: isagipHighlightMobile2, caption: 'Mobile: SOS flow — emergency type selector', device: 'phone' },
      { image: isagipHighlightMobile3, caption: 'Mobile: Emergency buzzer alarm screen', device: 'phone' }
    ]
  }
]

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug)
}


