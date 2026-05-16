import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AboutSection from '@/components/about/AboutSection'
import { buildMetadata } from '@/lib/seo'
import { isLocale, type Locale } from '@/lib/i18n'

const TITLE = {
  en: 'About AIWASON — Deep Tech for a Safer, Greener World',
  zh: '关于艾默森 — 以硬科技，构建更安全更绿色的世界',
} as const

const DESCRIPTION = {
  en: '15+ years, three R&D centers, 200+ patents (industry leader in invention patents), 1,200+ customers across China and Europe. AIWASON is a high-tech company integrating high-temperature-resistant new materials, optoelectronic intelligent busbars, and microgrid systems.',
  zh: '15+年发展，三大研发中心，200+项专利（发明专利行业第一），1200+客户遍及中国及欧洲。艾默森是集耐高温新材料、光电智能母线、微电网系统为一体的高科技企业。',
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({ locale, path: 'about', title: TITLE, description: DESCRIPTION })
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const lang = locale as Locale
  return (
    <>
      <title>{TITLE[lang]}</title>
      <meta name="description" content={DESCRIPTION[lang]} />
      <AboutSection lang={lang} />
    </>
  )
}
