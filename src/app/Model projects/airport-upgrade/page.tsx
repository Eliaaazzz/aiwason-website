// src/app/news/airport-upgrade/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '机场 | Airports',
  description: '机场能源系统升级：耐火智能母线提升航站楼运行效率与安全性。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type PageProps = { searchParams?: Promise<SearchParams> }

export default async function Page({ searchParams }: PageProps) {
  const resolved = searchParams ? await searchParams : undefined
  const lang = (resolved?.lang as 'zh' | 'en') || 'zh'

  const detailCopy: Record<'zh' | 'en', string[]> = {
    en: [
      'Airport power systems must withstand continuous load swings caused by baggage systems, HVAC, and airside operations. Our busbars deliver redundant feeds and hot-swappable tap-offs that minimise downtime during maintenance.',
      'Centralised monitoring unifies concourse, runway support, and data room circuits, enabling safety teams to detect anomalies instantly and comply with stringent aviation standards.',
      'Modular upgrades keep terminals running during construction phases while meeting ICAO and CAAC compliance audits.',
    ],
    zh: [
      '机场供电需应对行李系统、空调及空侧运行带来的持续负荷波动。母线提供冗余馈线与可热插拔分接箱，在检修时最大限度缩短停机时间。',
      '集中监控平台整合航站楼、跑道保障及数据机房回路，帮助安全团队即时发现异常并满足严格的航空规范。',
      '模块化升级可在航站楼施工期间保持运营，并满足 ICAO 与民航局合规审查。',
    ],
  }

  const heroImage = '/res/gallery-46.jpg'

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Airports' : '机场'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Airport Energy Upgrade' : '机场能源系统升级'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Safety, resilience, and efficiency for busy terminals and operations.'
                  : '为繁忙的航站楼与运行区域带来安全、韧性与效率。'}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {detailCopy[lang].map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
                {(lang === 'en'
                  ? ['Hot-swappable tap-offs for critical areas', 'Centralised alarms for terminals and airside', 'Redundant supply routes with fault isolation']
                  : ['关键区域可热插拔分接箱', '航站楼与空侧集中告警', '冗余供电路径与故障隔离']
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={heroImage}
                alt={lang === 'en' ? 'Airport terminal' : '机场航站楼'}
                width={960}
                height={640}
                className="w-full h-auto object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-gray-500">
                {lang === 'en'
                  ? 'Intelligent busbars stabilise terminal operations 24/7.'
                  : '智能母线保障航站楼 24/7 稳定运行。'}
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <Link
              href={`/solutions?lang=${lang}#realtime`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
            >
              {lang === 'en' ? 'View Real-time Monitoring' : '查看实时监测方案'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
