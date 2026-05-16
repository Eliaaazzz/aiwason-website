import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductsCenter from '@/components/products/ProductsCenter'
import { buildMetadata } from '@/lib/seo'
import { isLocale, type Locale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: 'products',
    title: {
      en: 'AIWASON Products — AI Monitoring, IP68, Connector, Wall Patent Systems',
      zh: '艾默森产品中心 — AI智能监控、IP68、连接器、墙体专利系统',
    },
    description: {
      en: 'AI monitoring terminals, high-temperature special materials, IP68 sections, connector modules, wall patent systems, fire-resistant busducts — the full AIWASON product line for intelligent power distribution.',
      zh: 'AI智能监控终端、耐高温特种材料、IP68防护、连接器模块、墙体专利系统、耐火母线槽——艾默森智能配电完整产品线。',
    },
  })
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
      <ProductsCenter lang={locale as Locale} />
    </Suspense>
  )
}
