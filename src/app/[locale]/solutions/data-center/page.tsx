import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { isLocale, type Locale } from '@/lib/i18n'

const DataCenterPage = dynamic(() => import('@/components/solutions/DataCenterPage'))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({
    locale,
    path: 'solutions/data-center',
    title: {
      en: 'Data Center Solutions — Intelligent Busbar Systems | AIWASON',
      zh: '数据中心解决方案 — 智能母线系统 | 艾默森',
    },
    description: {
      en: 'Intelligent busbar systems for data centers with integrated power and data transmission, based on Siemens SIVACON 8PS LData technology. 99.99% uptime, 2,500A capacity, 2-hour fire rating.',
      zh: '基于西门子SIVACON 8PS LData技术的数据中心智能母线系统，集成电力传输与数据监控。99.99%正常运行时间，2,500A容量，2小时耐火等级。',
    },
  })
}

export default async function DataCenter({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
      <DataCenterPage lang={locale as Locale} />
    </Suspense>
  )
}
