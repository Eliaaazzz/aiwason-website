// src/app/news/hotel-deployment/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '五星级酒店 | Five-star Hotels',
  description: '高端酒店母线部署：可靠、低噪与高效的配电方案。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const detailCopy: Record<'zh' | 'en', string[]> = {
    en: [
      'Premium hospitality spaces prioritise acoustic comfort and uninterrupted power. AIWASON busbars keep critical loads silent and stable across guest rooms, kitchens, and ballroom clusters while meeting fire safety codes.',
      'With built-in temperature and leakage sensing, facility teams receive early warnings before faults impact service quality, allowing maintenance to be scheduled around occupancy peaks.',
      'Dedicated service teams coordinate retrofit windows with hotel operations so that renovation workloads never interrupt guest journeys.',
    ],
    zh: [
      '高端酒店强调静音与不间断供电。AIWASON 母线在客房、后厨及宴会区域实现平稳供电，同时满足严格的耐火与安全规范。',
      '内置温度与漏电监测帮助运维团队提前预警，在不影响入住体验的情况下灵活安排检修计划。',
      '专业服务团队与酒店运营紧密配合，确保改造施工不影响宾客旅程。',
    ],
  }

  const heroImage = '/res/深圳四季酒店.jpg'

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Five-star Hotels' : '五星级酒店'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Luxury Hotel Deployment' : '高端酒店母线部署'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'High-quality experiences require reliable, silent, and efficient electrical infrastructure.'
                  : '高品质体验离不开可靠、静音与高效的用电基础设施。'}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {detailCopy[lang].map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <div className="rounded-xl border border-[#76B900]/30 bg-[#f6fbef] px-5 py-4 text-sm text-gray-700">
                {lang === 'en'
                  ? 'Highlights: acoustic insulation down to 25 dB, dual-power redundancy, live-load maintenance bypass modules.'
                  : '方案亮点：25 分贝静音指标、双路冗余供电、带电维护旁路模块。'}
              </div>
            </div>

            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={heroImage}
                alt={lang === 'en' ? 'Luxury hotel deployment' : '高端酒店部署'}
                width={960}
                height={640}
                className="w-full h-auto object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-gray-500">
                {lang === 'en'
                  ? 'Silent busbars support guestrooms, kitchens, and event clusters.'
                  : '静音母线保障客房、后厨与宴会区域。'}
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <Link
              href={`/solutions?lang=${lang}#operations`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
            >
              {lang === 'en' ? 'Review Operations Platform' : '查看运维管理方案'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
