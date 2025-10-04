import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '高铁 | High-speed Rail',
  description: '高铁动车段与站场供配电：耐候母线、AI 监测与不停运扩容策略。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'AIWASON powers coastal high-speed rail depots and stations with weather-resistant busbars and predictive analytics.',
  zh: 'AIWASON 为沿海高铁车辆段与站场提供耐候母线与预测分析能力。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Continuous bus duct spines link inspection bays, wheel-lathe halls, and OCC buildings over long alignments exposed to salt spray and typhoon gusts. The enclosure’s marine-grade coating and vibration dampers keep impedance low even under harsh operating conditions.',
    'Smart tap-offs embed optical temperature sensing and harmonic analytics, streaming data into the rail operator’s SCADA cloud. Maintenance teams receive AI-generated work orders before connector fatigue can impact departure punctuality.',
    'Modular sections and plug-in feeders allow supply to extend to new platforms or stabling lines overnight, supporting timetable upgrades without prolonged shutdowns.',
  ],
  zh: [
    '连续母线干线连接检修库、轮对车间与调度楼，覆盖沿海高铁线路常见的盐雾与台风环境。船级涂层与减振结构保证长距离敷设仍能保持低阻抗。',
    '智能分接箱内置光纤测温与谐波分析，数据回传至铁路运营商的 SCADA 云平台，AI 会在连接件疲劳影响正点率前生成工单提醒。',
    '模块化节段与即插即用馈线让新站台或存车线的接入可在夜间施工完成，支持运行图调整而无需长时间停运。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Marine-grade, vibration-damped busbars for exposed alignments',
    'Optical sensing and AI work orders integrated with rail SCADA',
    'Overnight plug-in expansion for new platforms and stabling yards',
  ],
  zh: [
    '船级耐候与减振设计，适配风雨暴晒的线路环境',
    '光纤测温结合 AI 工单，与铁路 SCADA 无缝联动',
    '夜间即插扩容，快速接入新站台与存车线',
  ],
}

const heroImage = {
  src: '/res/高铁（南方新会工厂）.jpg',
  caption: { en: 'Weather-resistant busbars at a coastal high-speed depot', zh: '沿海高铁动车段的耐候母线' },
} as const

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as Lang) || 'zh'

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'High-speed Rail' : '高铁'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'High-speed Rail Depot Power Backbone' : '高铁动车段供配电骨干'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">{introCopy[lang]}</p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <figure className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <Image
              src={heroImage.src}
              alt={heroImage.caption[lang]}
              width={1200}
              height={720}
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-6 py-4 text-sm text-gray-500 text-center">{heroImage.caption[lang]}</figcaption>
          </figure>

          <div className="max-w-4xl mx-auto space-y-8">
            <article className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
              {paragraphs[lang].map((para) => (
                <p key={para}>{para}</p>
              ))}
            </article>

            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              {highlights[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href={`/solutions?lang=${lang}#transit`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
              >
                {lang === 'en' ? 'Explore Transit Solutions' : '查看轨交通方案'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
