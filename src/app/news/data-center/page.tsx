import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '数据中心 | Data Center',
  description:
    '前海信息枢纽等标杆数据中心案例：多机柜液冷集群、双母线冗余、AI 监控与极端天气防护。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'Explore how AIWASON hardens multi-cabinet, liquid-cooled campuses such as the Qianhai Information Hub against extreme coastal weather.',
  zh: '了解 AIWASON 如何为前海信息枢纽等多机柜液冷园区打造可抵御沿海极端天气的韧性保障。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Qianhai Information Hub converges administrative, fintech, and public workloads across a Tier IV-ready campus. Fire-resistant dual-busbar trunks with optical sensing keep thousands of cabinets online through maintenance windows and typhoon seasons.',
    'Prefabricated tap-off modules and plug-in distribution trunks shorten delivery time by over 30%. Digital twins model hot and cold aisles for both air-cooled and liquid-cooled corridors so future AI clusters can expand without rewiring.',
    'A unified operations cockpit visualises energy, carbon, and safety KPIs. AI-assisted maintenance predicts connector creep, while joint drills with local fire brigades keep the site compliant with GB 50174-2017 and Tier IV requirements.',
  ],
  zh: [
    '前海信息枢纽园区集约承载政务、金融科技与公共服务业务，设计目标直指 Tier IV 等级。耐火双母线主干配合光纤测温，让上千机柜在检修切换、台风季等极端天气下依旧稳定运行。',
    '预制化分接模块与插拔式干线让部署周期缩短 30% 以上，数字孪生同时推演风冷 / 液冷通道的负载曲线，为未来 AI 集群扩展预留弹性，不必重复布线。',
    '统一运维驾驶舱将能耗、碳排与安全指标实时可视化，AI 辅助维护预测连接件蠕变，并与属地消防联合演练，确保满足 GB 50174-2017 与 Tier IV 规范。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Tier IV-ready dual busbar topology with hot-standby switching',
    'Optical sensing tap-offs across high-density cabinet rows',
    'Digital twin load modelling for phased liquid-cooling expansion',
    'Integrated energy, carbon, and extreme-weather response dashboards',
  ],
  zh: [
    '面向 Tier IV 的双母线拓扑，支持热备切换',
    '光纤测温覆盖高密度机柜列，实现实时监测',
    '数字孪生支撑液冷等阶段性扩容方案',
    '能耗、碳排与极端天气指标一体化驾驶舱',
  ],
}

const heroImage = {
  src: '/res/前海信息枢纽中心.jpg',
  caption: { en: 'Qianhai Information Hub campus', zh: '前海信息枢纽核心园区实景' },
} as const

const awardImage = {
  src: '/res/credit-china-poster.png',
  caption: { en: 'Credit China feature recognising safety excellence', zh: '《信用中国》专题报道项目的安全实力' },
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
                {lang === 'en' ? 'Data Center' : '数据中心'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Data Center Solutions' : '数据中心解决方案'}
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
              priority
            />
            <figcaption className="px-6 py-4 text-sm text-gray-500 text-center">{heroImage.caption[lang]}</figcaption>
          </figure>

          <div className="max-w-4xl mx-auto space-y-8">
            <article className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
              {paragraphs[lang].map((para) => (
                <p key={para}>{para}</p>
              ))}

              <figure className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <Image
                  src={awardImage.src}
                  alt={awardImage.caption[lang]}
                  width={640}
                  height={480}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="px-4 py-3 text-sm text-gray-500 text-center">
                  {awardImage.caption[lang]}
                </figcaption>
              </figure>
            </article>

            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              {highlights[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
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
