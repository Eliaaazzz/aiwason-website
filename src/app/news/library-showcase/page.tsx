// src/app/news/library-showcase/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '图书馆 | Libraries',
  description: '高校图书馆示范项目：静音高效的配电与用电体验。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const detailCopy: Record<'zh' | 'en', string[]> = {
    en: [
      'Academic libraries depend on ultra-stable power for lighting, HVAC, and dense IT hubs while maintaining a quiet atmosphere. Our enclosed busbar design eliminates electromagnetic noise and keeps expansion straightforward.',
      'Real-time dashboards reveal load profiles for each floor so facility managers can coordinate study schedules, equipment upgrades, and sustainability goals with confidence.',
      'We support phased construction and night-time maintenance windows so that study spaces stay open during peak exam seasons.',
    ],
    zh: [
      '高校图书馆需要在静音环境下保障照明、空调以及密集 IT 终端的稳定供电。封闭式母线结构有效降低电磁噪声，并让后续扩容更加简洁。',
      '实时数据看板呈现各楼层负荷变化，帮助后勤团队在调配自习区域、升级设备与推进节能目标时更有依据。',
      '支持分阶段建设与夜间检修，确保考试旺季学习空间照常开放。',
    ],
  }

  const heroImage = '/res/汕头大学新图书馆—A.jpg'

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Libraries' : '图书馆'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'University Library Showcase' : '高校图书馆示范项目'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Quietness and safety matter—deliver dependable power for learning environments.'
                  : '静音与安全至关重要——为学习环境提供可靠的电力基础设施。'}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {detailCopy[lang].map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <div className="rounded-xl border border-[#76B900]/30 bg-[#f6fbef] px-5 py-4 text-sm text-gray-700">
                {lang === 'en'
                  ? 'Deliverables include silent trunking channels, redundant UPS integration, and digitised asset archives.'
                  : '交付内容涵盖静音母线槽、冗余 UPS 集成及数字化资产台账。'}
              </div>
            </div>

            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={heroImage}
                alt={lang === 'en' ? 'University library' : '高校图书馆'}
                width={960}
                height={640}
                className="w-full h-auto object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-gray-500">
                {lang === 'en'
                  ? 'Silent distribution keeps study halls comfortable around the clock.'
                  : '静音配电让自习空间全天候舒适宜人。'}
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <Link
              href={`/solutions?lang=${lang}#history-analytics`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
            >
              {lang === 'en' ? 'See Historical Analytics' : '查看历史数据分析'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
