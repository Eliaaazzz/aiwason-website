// src/app/events/datacenter-summit/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '会议中心 | Conference Center',
  description: 'AIWASON 会议与展会活动：国际会议中心等。', // FIX: wording matches new theme
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  // FIX: Replace detail copy with International Conference Center content (ZH & EN)
  const detailCopy: Record<'zh' | 'en', string[]> = {
    en: [
      'At the Shenzhen Qianhai International Conference Center—where global leaders and industry pioneers gather—AIWASON delivers a high-efficiency, green, intelligent, and safe power distribution foundation for large exhibitions and international summits.',
      'Through the synergy of fire-resistant optoelectronic busbars, end-to-end intelligent monitoring, and lifecycle services, we continuously elevate venue safety and energy performance.',
    ],
    zh: [
      '深圳前海国际会议中心，汇聚全球领导者与产业先锋。AIWASON 以“高效、绿色、智能、安全”为核心，打造面向大型会展与国际峰会的稳健输配电体系。',
      '通过耐火智能光电母线、全域智能监测与全生命周期服务的联动，我们持续驱动场馆运行的安全升级与能效跃升。',
    ],
  }

  // You can keep your existing image; if you have a venue photo, point to it here.
  // Avoid spaces in filenames if possible; or ensure they’re URL-encoded.
  const heroImage = '/res/conference.jpg'
  // const heroImage = '/res/gallery-21.png' // Optional: if you have this asset available

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Conference' : '会议中心'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {/* FIX: International Conference Center */}
                {lang === 'en' ? 'International Conference Center' : '国际会议中心'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {/* FIX: Inject your concise intro under the title */}
                {lang === 'en'
                  ? 'Shenzhen Qianhai International Conference Center brings together global leaders and industry pioneers. AIWASON provides a high-efficiency, green, intelligent, and safe power distribution system for large exhibitions and international summits.'
                  : '在深圳前海国际会议中心，汇聚全球领导者与行业精英。AIWASON 以高效、绿色、智能、安全的输配电体系，为大型会展与国际峰会提供稳定可靠的能源底座。'}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {detailCopy[lang].map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={heroImage}
                alt={lang === 'en' ? 'Conference venue' : '会议中心场景'}
                width={960}
                height={640}
                className="w-full h-auto object-cover"
                priority
              />
              <figcaption className="px-4 py-3 text-sm text-gray-500">
                {lang === 'en'
                  ? 'AIWASON power distribution for large venues and international summits.'
                  : 'AIWASON 面向大型会展与国际峰会的输配电方案。'}
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <Link
              href={`/solutions?lang=${lang}#cloud-platform`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
            >
              {lang === 'en' ? 'View Cloud Platform Features' : '查看云平台功能'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
