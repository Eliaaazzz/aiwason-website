import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '前海交易广场 | Qianhai Exchange Plaza',
  description:
    '前海交易广场城市更新：耐火智能母线在不停业改造中完成升级，项目荣膺国家优质工程大奖。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'Qianhai Exchange Plaza underwent a multi-phase retrofit while remaining open. AIWASON’s intelligent busbars enabled award-winning safety and efficiency upgrades.',
  zh: '前海交易广场在不停业的前提下完成多阶段更新。AIWASON 智能母线方案帮助项目实现安全高效升级并斩获国家优质工程大奖。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'The mixed-use podium and twin office towers stayed operational during a 14-month retrofit. Fire-resistant busbars were installed floor by floor, replacing aged cabling without shutting down retail tenants or exchange back offices.',
    'Segmented tap-offs integrate with the central fire-control platform, enabling automated zoning, remote isolation, and digital permit-to-work procedures. The project aligned with the latest Shenzhen fire code and received exemplary ratings in municipal safety reviews.',
    'Energy dashboards track power quality after each phase, driving a 9% reduction in peak demand and contributing to the National High-quality Project Award, a benchmark in China’s premium engineering accolades.',
  ],
  zh: [
    '集商业裙楼与双塔办公于一体的交易广场在 14 个月的改造期内保持运营。耐火母线逐层替换原有电缆，零打扰支持零售租户与金融后台持续运作。',
    '分区分接箱与消防控制平台联动，实现自动分区、远程隔离与数字化动火许可流程，全面符合深圳最新消防规范并在市级评估中获评优良。',
    '能耗驾驶舱对各阶段电能质量进行追踪，使峰值负荷下降 9%，并助力项目摘得国家优质工程大奖，是国内工程品质的重要标杆。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Floor-by-floor retrofit keeps retail and trading operations running',
    'Fire-control integration with remote sectional isolation and digital permits',
    'Energy dashboards that prove a 9% peak demand reduction post-upgrade',
  ],
  zh: [
    '逐层改造仍保障商业与交易后台连续运营',
    '与消防平台联动的远程分区隔离与数字化许可流程',
    '改造后峰值负荷下降 9%，数据可视化可溯',
  ],
}

const heroImage = {
  src: '/res/前海交易广场.jpg',
  caption: { en: 'Qianhai Exchange Plaza after retrofit', zh: '改造后的前海交易广场' },
} as const

const awardImage = {
  src: '/res/前海交易广场获奖.jpg',
  caption: { en: 'National High-quality Project (Luban Prize) certificate', zh: '国家优质工程（鲁班奖）证书' },
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
                {lang === 'en' ? 'Urban Complex' : '大型城市综合体'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Qianhai Exchange Plaza' : '前海交易广场'}
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
        </div>
      </section>
    </main>
  )
}
