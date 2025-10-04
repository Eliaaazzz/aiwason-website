import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '建行深圳大厦 | CCB Shenzhen Tower',
  description:
    '银行系统智能母线案例：建行深圳大厦双路冗余与安防联动，支撑交易大厅与金库的 24/7 连续运行。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'China Construction Bank’s Shenzhen Tower combines trading floors, data suites, and secure vaults. AIWASON engineered a dual-riser power system with biometric integration.',
  zh: '中国建设银行深圳大厦集交易大厅、数据机房与金库于一体。AIWASON 构建双竖井冗余体系并与安防联动。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Two independent busbar risers serve trading floors and treasury offices. Each tap-off integrates biometric interlocks and tamper alarms, ensuring only authorised staff can reconfigure critical circuits.',
    'The vault cluster relies on branch circuits with 2-hour fire resistance and integrated temperature sensing, feeding climate control, robotics, and security subsystems without downtime.',
    'AI dashboards fuse SCADA, access control, and energy data so treasury managers can monitor load steps, automate switching drills, and document compliance with PBOC security guidelines.',
  ],
  zh: [
    '双路母线竖井分别服务交易大厅与总行机关，分接箱内置生物识别联动与防拆告警，确保关键回路调整始终在授权范围内完成。',
    '金库集群采用两小时耐火分支并集成测温传感，持续为恒温恒湿、机器人与安防子系统供电，实现零停机。',
    'AI 运维平台融合 SCADA、门禁与能耗数据，金库管理者可实时监控负载、自动演练切换并满足人行安防规程的合规审计。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Dual independent busbar risers with biometric tap-off interlocks',
    '2-hour fire-rated branch circuits protecting vault clusters',
    'AI dashboards merging SCADA, security, and energy insights',
  ],
  zh: [
    '双独立母线竖井与生物识别联动分接箱',
    '两小时耐火分支保障金库集群安全',
    'SCADA、安防与能耗一体的 AI 运维驾驶舱',
  ],
}

const heroImage = {
  src: '/res/深圳建行大厦项目.jpg',
  caption: { en: 'CCB Shenzhen Tower facade', zh: '中国建设银行深圳大厦外观' },
} as const

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as Lang) || 'zh'

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Banking Systems' : '银行系统'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'CCB Shenzhen Tower' : '建行深圳大厦'}
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
          </div>
        </div>
      </section>
    </main>
  )
}
