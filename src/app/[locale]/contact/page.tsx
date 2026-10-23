// src/app/contact/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe } from 'lucide-react'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with AIWASON for project consultations and technical support.',
  openGraph: {
    type: 'website',
    title: 'Contact',
    description: 'Contact AIWASON for project consultations, technical support, and partnerships.',
    images: [{ url: '/res/aiwason_fireproof_busbar_hero.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact',
    description: 'Contact AIWASON for project consultations, technical support, and partnerships.',
    images: ['/res/aiwason_fireproof_busbar_hero.png'],
  },
  alternates: {
    canonical: '/contact',
    languages: { en: '/contact?lang=en', zh: '/contact?lang=zh' },
  },
}

const CONTACTS = [
  { labelEn: 'General Enquiries', labelZh: '业务咨询', value: 'Elialiu760317@outlook.com', href: 'mailto:Elialiu760317@outlook.com' },
  { labelEn: 'Australia',        labelZh: '澳大利亚',   value: '+61 475 926 539',         href: 'tel:+61475926539' },
  { labelEn: 'China',            labelZh: '中国',       value: '+86 139 2334 7968',       href: 'tel:+8613923347968' },
]

type SearchParams = Record<string, string | string[] | undefined>
type Lang = 'en' | 'zh'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const lang: Lang = locale === 'zh' ? 'zh' : 'en'
  const isEN = lang === 'en'

  // Locale-prefixed toggle so the middleware doesn't bounce the request
  // back to the current locale via the NEXT_LOCALE cookie.
  const toggleHref = `/${isEN ? 'zh' : 'en'}/contact`

  return (
    <main id="main-content" className="bg-white text-gray-900 min-h-dvh">
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <div className="space-y-5 lg:max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
              {isEN ? 'Contact' : '联系我们'}
            </p>
            <h1 className="text-3xl lg:text-5xl font-black leading-tight">
              {isEN ? 'We are ready to support your next project.' : '随时为您的下一阶段项目提供支持。'}
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {isEN
                ? 'Connect with AIWASON for engineering consultations, technical partnerships, or urgent support. Our specialists respond quickly across time zones.'
                : '无论是工程咨询、技术合作还是现场支持，AIWASON 团队都将为您提供及时、专业的服务。'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#76B900]/25 bg-[#f6fbef] px-6 py-8 shadow-sm w-full max-w-md">
            <div className="flex justify-end">
              <Link
                href={toggleHref}
                className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-[#2e6e00] border border-[#76B900]/30 hover:border-[#76B900]/60 rounded-lg px-3 py-1.5 text-sm font-semibold transition"
              >
                <Globe className="w-4 h-4" />
                {isEN ? '中文' : 'EN'}
              </Link>
            </div>

            <div className="space-y-6">
              {CONTACTS.map((entry) => (
                <div key={entry.value} className="space-y-2">
                  <p className="text-sm font-semibold text-[#2e6e00]">
                    {isEN ? entry.labelEn : entry.labelZh}
                  </p>
                  <Link href={entry.href} className="text-xl font-medium text-gray-900 hover:text-[#2e6e00] transition">
                    {entry.value}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#76B900]/20 bg-white shadow-sm p-6 lg:p-8 space-y-4">
            <h2 className="text-2xl font-extrabold text-gray-900">
              {isEN ? 'Project Support' : '项目支持'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isEN
                ? 'Share your project requirements, BIM files, or load planning information. Our engineers assemble a tailored solution covering site surveys, trunk layouts, and intelligent monitoring strategies.'
                : '欢迎将您的配电需求、BIM 资料或负载规划发送给我们。工程团队将快速为您提供现场勘察、母线布局以及智能监测方案建议。'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#76B900]/20 bg-white shadow-sm p-6 lg:p-8 space-y-4">
            <h2 className="text-2xl font-extrabold text-gray-900">
              {isEN ? 'Response Times' : '响应时效'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isEN
                ? 'We operate across Greater China and the Asia-Pacific. Expect an initial response within one business day and rapid escalation for mission-critical incidents.'
                : '团队覆盖全球，一般咨询 1 个工作日内响应；关键故障与停电风险可获得即时升级处理。'}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
