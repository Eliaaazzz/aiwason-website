import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '比亚迪智能制造园区 | BYD Intelligent Manufacturing Campus',
  description:
    '比亚迪大型厂房案例：6300A 连续母线干线支撑冲压、电池与总装车间，实现高密度供电与预测运维。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'BYD’s Shenzhen manufacturing campus packs stamping, battery, and final assembly lines into a high-density footprint. AIWASON supplies the continuous bus duct spines that feed each workshop.',
  zh: '比亚迪深圳制造园区集冲压、电池与总装车间于一体。AIWASON 提供连续母线干线，为高密度产线供电。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Long-span bus ducts deliver up to 6,300 A to stamping presses and welding robots. Tap-off modules with IP54 protection withstand oil mist and particulate matter common in automotive workshops.',
    'Battery workshops leverage segregated busbar channels with arc-fault detection and real-time thermal analytics. Maintenance crews receive predictive alerts before connector degradation affects throughput.',
    'The modular backbone supports phased expansion for new energy vehicle models, enabling BYD to reconfigure production islands without lengthy shutdowns.',
  ],
  zh: [
    '跨越长距离的母线干线为冲压线与焊装机器人提供最高 6300A 电流，分接模块具备 IP54 防护，可应对汽车车间常见的油雾与粉尘环境。',
    '电池车间采用分隔母线槽并集成电弧故障检测与实时热分析，运维团队在连接件衰退影响产能前即可收到预测预警。',
    '模块化母线骨干支持新车型的阶段性扩线，使生产岛调整无需长时间停机。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    '6,300 A continuous bus duct spines serving heavy-duty workshops',
    'Arc-fault detection and thermal analytics tailored for battery lines',
    'Modular tap-offs enabling rapid reconfiguration for new EV models',
  ],
  zh: [
    '6300A 连续母线干线覆盖重载车间',
    '针对电池工艺的电弧故障检测与热分析',
    '模块化分接支持新能源汽车快速换型',
  ],
}

const heroImage = {
  src: '/res/深圳比亚迪—A.jpg',
  caption: { en: 'BYD Shenzhen manufacturing campus', zh: '比亚迪深圳制造园区' },
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
                {lang === 'en' ? 'Manufacturing' : '大型厂房'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'BYD Intelligent Manufacturing Campus' : '比亚迪智能制造园区'}
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
