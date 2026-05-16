import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import HomeShell from '@/components/home/HomeShell'
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
    path: '',
    title: {
      en: 'AIWASON — Fire-Resistant Intelligent Optoelectronic Busbars',
      zh: '艾默森 — 耐火智能光电母线系统专家',
    },
    description: {
      en: 'Powering data centers and real estate with revolutionary fire-resistant intelligent optoelectronic busbar technology. 2-hour fire rating, AI-powered monitoring, ultra-high efficiency.',
      zh: '革命性耐火智能光电母线技术，为数据中心和房地产行业提供未来动力。2小时耐火等级，AI智能监控，超高效率。',
    },
    keywords: {
      en: 'busbar, fire-resistant busbar, intelligent busbar, optoelectronic, data center power, AIWASON, SIVACON 8PS LData',
      zh: '母线, 耐火母线, 智能母线, 光电母线, 数据中心配电, 艾默森, AIWASON',
    },
  })
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" aria-busy="true" />}>
      <HomeShell lang={locale as Locale} />
    </Suspense>
  )
}
