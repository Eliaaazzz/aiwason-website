// src/app/page.tsx  (Server Component)
import type { Metadata } from 'next'
import HomeShell from '../components/home/HomeShell'
import JsonLd from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: 'AIWASON — Fire-Resistant Intelligent Optoelectronic Busbars',
  description:
    'AIWASON delivers fire-resistant intelligent optoelectronic busbar systems for data centers, smart buildings, and critical infrastructure worldwide.',
  openGraph: {
    type: 'website',
    title: 'AIWASON — Fire-Resistant Intelligent Optoelectronic Busbars',
    description:
      'Powering data centers and smart buildings with revolutionary fire-resistant intelligent optoelectronic busbar technology.',
    images: [{ url: '/res/aiwason_fireproof_busbar_hero.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIWASON — Fire-Resistant Intelligent Optoelectronic Busbars',
    description:
      'Powering data centers and smart buildings with revolutionary fire-resistant intelligent optoelectronic busbar technology.',
    images: ['/res/aiwason_fireproof_busbar_hero.png'],
  },
  alternates: {
    canonical: '/',
    languages: { en: '/?lang=en', zh: '/?lang=zh' },
  },
}

type SearchParams = { lang?: string }
type Lang = 'en' | 'zh'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const lang: Lang = sp?.lang === 'zh' ? 'zh' : 'en'
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'AIWASON',
          url: 'https://www.aiwason.com',
          description:
            'Fire-resistant intelligent optoelectronic busbar systems for data centers and smart buildings.',
          publisher: {
            '@type': 'Organization',
            name: 'AIWASON',
            url: 'https://www.aiwason.com',
            logo: 'https://www.aiwason.com/res/logo.png',
          },
        }}
      />
      <HomeShell defaultLanguage={lang} />
    </>
  )
}
