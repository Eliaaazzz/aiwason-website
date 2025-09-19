// src/app/news/data-center/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '数据中心 | Data Center',
  description:
    'AIWASON 数据中心专页：耐火智能光电母线、AI 监控、配电优化等解决方案。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const detailCopy: Record<'zh' | 'en', string[]> = {
    en: [
      'Our data center solution couples fire-resistant copper-aluminum composite conductors with optical sensing layers so that every critical branch, tap-off, and riser stays visible in real time—even during emergency conditions.',
      'Prefabricated tap-off modules, digital twins, and AI analytics shorten deployment cycles while supporting phased capacity growth for hyperscale and edge scenarios alike.',
      'Lifecycle services—from design integration to AI-driven monitoring—keep mission-critical workloads protected while meeting sustainability targets.',
    ],
    zh: [
      '数据中心方案采用耐火铜铝复合导体与光纤感应层，实现各级干线、分接箱在严苛环境下仍保持实时可视化。',
      '预制化分接模块、数字孪生与 AI 分析大幅缩短交付周期，同时兼顾超大规模与边缘场景的灵活扩容需求。',
      '贯穿设计集成、安装交付到 AI 智能运维的全生命周期服务，让关键业务在守住安全底线的同时实现节能目标。',
    ],
  }

  const heroImage = '/res/dataCenter.jpeg'

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Data Center' : '数据中心'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Data Center Solutions' : '数据中心解决方案'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Explore AIWASON’s fire-resistant intelligent optoelectronic busbar system for reliable, efficient, and intelligent data centers.'
                  : '探索 AIWASON 耐火智能光电母线系统，打造更可靠、更高效、更智能的数据中心基础设施。'}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {detailCopy[lang].map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <div className="rounded-xl border border-[#76B900]/30 bg-[#f6fbef] px-5 py-4 text-sm text-gray-700">
                {lang === 'en'
                  ? 'Core capabilities: 2-hour fire resistance certification, optical sensing tap-offs, AI condition-based maintenance, modular capacity expansion.'
                  : '核心能力：两小时耐火认证、光纤感知分接箱、AI 状态监测运维、模块化弹性扩容。'}
              </div>
            </div>

            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={heroImage}
                alt={lang === 'en' ? 'Data center deployment' : '数据中心现场'}
                width={960}
                height={640}
                className="w-full h-auto object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-gray-500">
                {lang === 'en'
                  ? 'Fire-resistant busbars safeguard hyperscale and edge facilities.'
                  : '耐火母线守护超大规模与边缘数据中心。'}
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <Link
              href={`/solutions?lang=${lang}#dc-overview`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
            >
              {lang === 'en' ? 'View Data Center Solution' : '查看数据中心方案'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
