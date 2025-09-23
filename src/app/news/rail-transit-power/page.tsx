// src/app/news/rail-transit-power/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '高铁 | High-speed Rail',
  description: '轨道交通配电系统：稳健、可视与可预测的运维能力。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const detailCopy: Record<'zh' | 'en', string[]> = {
    en: [
      'Rail depots and stations require continuous energy delivery across long alignments with harsh outdoor conditions. The AIWASON busbar platform resists vibration, dust, and temperature shocks while maintaining low impedance.',
      'Integrated diagnostics combine SCADA interfaces with AI models to predict wear on connectors and tap-off boxes, ensuring maintenance teams can intervene before disruptions affect passenger timetables.',
      'Modular sections and plug-in feeders simplify extensions to new lines while maintaining live services on active tracks.',
    ],
    zh: [
      '车辆段与车站需要在长距离、室外复杂环境下保持持续供电。AIWASON 母线平台具备抗振动、防尘与耐温冲击能力，同时保持低阻抗指标。',
      '诊断系统整合 SCADA 数据与 AI 模型，预测连接件与分接箱的磨损状况，让检修团队在影响旅客时刻表之前提前处理。',
      '模块化节段与即插即用馈线可方便延伸至新线路，同时确保既有线路不停运。',
    ],
  }

  const heroImage = '/res/gallery-18.png'

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'High-speed Rail' : '高铁'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Rail Transit Power System' : '轨道交通配电系统'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Reliable power for rail transit infrastructure with predictive insights.'
                  : '为轨道交通基础设施提供可靠供电与可预测运维洞察。'}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {detailCopy[lang].map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <div className="rounded-xl border border-[#76B900]/30 bg-[#f6fbef] px-5 py-4 text-sm text-gray-700">
                {lang === 'en'
                  ? 'Supports depots, stations, OCC, and wayside equipment with unified monitoring.'
                  : '同时覆盖车辆段、车站、调度中心与沿线设备，实现统一监控。'}
              </div>
            </div>

            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={heroImage}
                alt={lang === 'en' ? 'Rail transit project' : '轨道交通项目'}
                width={960}
                height={640}
                className="w-full h-auto object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-gray-500">
                {lang === 'en'
                  ? 'Resilient trunking links depots and stations over long distances.'
                  : '韧性母线连接车辆段与车站的长距离配电网络。'}
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <Link
              href={`/solutions?lang=${lang}#dc-custom`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
            >
              {lang === 'en' ? 'View Custom Layouts' : '查看定制化方案'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
