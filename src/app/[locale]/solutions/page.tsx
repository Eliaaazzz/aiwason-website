import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import SolutionsSection from '@/components/solutions/SolutionsSection'
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
    path: 'solutions',
    title: {
      en: 'AIWASON Solutions — Data Centers, Commercial, Hospitality, Transport',
      zh: '艾默森解决方案 — 数据中心、商业建筑、酒店业、交通基础设施',
    },
    description: {
      en: 'Fire-resistant intelligent optoelectronic busbar solutions for data centers, commercial buildings, hospitality, and transportation infrastructure — 2-hour fire rating, AI monitoring, ultra-high efficiency.',
      zh: '面向数据中心、商业建筑、酒店业、交通基础设施的耐火智能光电母线解决方案——2小时耐火等级，AI智能监控，超高效率。',
    },
  })
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
      <SolutionsSection lang={locale as Locale} />
    </Suspense>
  )
}
