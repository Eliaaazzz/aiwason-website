import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import JsonLd from '@/components/common/JsonLd'
import { defaultOgImage, siteUrl } from '@/lib/site'

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
  title: 'Products | AMERSON',
  description:
    'Explore AMERSON fire-resistant intelligent optoelectronic busbar products: smart busbars, tap-off units, monitoring terminals, and cloud platforms for data centers.',
  openGraph: {
    type: 'website',
    title: 'Products | AMERSON',
    url: `${siteUrl}/products`,
    description:
      'Fire-resistant intelligent busbar products for data centers and critical infrastructure.',
    images: [{ url: defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | AMERSON',
    description:
      'Fire-resistant intelligent busbar products for data centers and critical infrastructure.',
    images: [defaultOgImage],
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
          name: 'AMERSON Fire-Resistant Intelligent Optoelectronic Busbars',
          description:
            'Smart busbar systems with AI monitoring, fire resistance, and cloud-based management for modern infrastructure.',
          brand: { '@type': 'Brand', name: 'AMERSON' },
          manufacturer: {
            '@type': 'Organization',
            name: 'AMERSON',
            url: siteUrl,
          },
        }}
      />
      <ProductsCenter defaultLang={lang} />
    </>
  )
}
