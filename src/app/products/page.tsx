import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import JsonLd from '@/components/common/JsonLd'

const ProductsCenter = dynamic(() => import('@/components/products/ProductsCenter'), {
  loading: () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  ),
})

export const metadata: Metadata = {
  title: 'Products | AIWASON',
  description:
    'Explore AIWASON fire-resistant intelligent optoelectronic busbar products: smart busbars, tap-off units, monitoring terminals, and cloud platforms for data centers.',
  openGraph: {
    type: 'website',
    title: 'Products | AIWASON',
    description:
      'Fire-resistant intelligent busbar products for data centers and critical infrastructure.',
    images: [{ url: '/res/aiwason_fireproof_busbar_hero.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | AIWASON',
    description:
      'Fire-resistant intelligent busbar products for data centers and critical infrastructure.',
    images: ['/res/aiwason_fireproof_busbar_hero.png'],
  },
  alternates: {
    canonical: '/products',
    languages: { en: '/products?lang=en', zh: '/products?lang=zh' },
  },
}

type SearchParams = Record<string, string | string[] | undefined>
type Lang = 'en' | 'zh'

export default async function ProductsPage({
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
          '@type': 'Product',
          name: 'AIWASON Fire-Resistant Intelligent Optoelectronic Busbars',
          description:
            'Smart busbar systems with AI monitoring, fire resistance, and cloud-based management for modern infrastructure.',
          brand: { '@type': 'Brand', name: 'AIWASON' },
          manufacturer: {
            '@type': 'Organization',
            name: 'AIWASON',
            url: 'https://www.aiwason.com',
          },
        }}
      />
      <ProductsCenter defaultLang={lang} />
    </>
  )
}
