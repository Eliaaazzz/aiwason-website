// src/app/about/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const AboutSection = dynamic(() => import('../../components/about/AboutSection'), {
  loading: () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-6">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    </div>
  ),
})

export const metadata: Metadata = {
  title: 'About | AIWASON',
  description:
    'Learn about AIWASON — a leader in fire-resistant intelligent optoelectronic busbar technology for data centers, smart buildings, and critical infrastructure.',
  openGraph: {
    type: 'website',
    title: 'About | AIWASON',
    description:
      'AIWASON pioneers fire-resistant intelligent optoelectronic busbar technology for modern infrastructure.',
    images: [{ url: '/res/aiwason_fireproof_busbar_hero.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | AIWASON',
    description:
      'AIWASON pioneers fire-resistant intelligent optoelectronic busbar technology for modern infrastructure.',
    images: ['/res/aiwason_fireproof_busbar_hero.png'],
  },
  alternates: {
    canonical: '/about',
    languages: { en: '/about?lang=en', zh: '/about?lang=zh' },
  },
}

export default function Page() {
  return <AboutSection />
}
