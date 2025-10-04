import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '前海控股投资大厦 | Qianhai Holding Investment Tower',
  description:
    '前海控股投资总部大厦：智能母线环网与会议展陈空间融合，荣获国家级工程大奖。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'The Qianhai Holding Investment Tower connects headquarters offices, exhibition venues, and diplomatic reception suites with a resilient smart power backbone.',
  zh: '前海控股投资大厦以韧性智能供配电骨干串联总部办公、展陈空间与政务接待区域。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Dual risers and ring trunks segment the 260,000 m² mixed-use podium and twin towers so maintenance teams can isolate zones without disrupting finance, conference, or lifestyle amenities.',
    'Smart tap-offs supply flexible galleries and innovation labs, integrating lighting, AV, and HVAC with scenario presets for investor summits and overseas delegations.',
    'The project formed part of the national Luban Prize urban renewal programme, demonstrating how intelligent busbars elevate power quality and safety in coastal high-rise clusters.',
  ],
  zh: [
    '双竖井与环形主干将 26 万平方米的裙楼与双塔分区管理，既能保障金融办公、会议中心与生活配套，又方便检修团队快速隔离维护。',
    '智能分接箱为展陈空间与创新实验室提供多场景供电，照明、视听与空调可按投资峰会、海外代表团等模式一键切换。',
    '项目纳入国家鲁班奖城市更新范例，展现智能母线在滨海高层集群中提升能质与安全的能力。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Dual-riser ring topology with zoned isolation for mixed-use towers',
    'Scenario-based tap-offs powering exhibitions and diplomatic events',
    'Member project of the Luban Prize urban renewal programme',
  ],
  zh: [
    '双竖井环网拓扑，实现多业态塔楼的分区隔离',
    '面向展陈与政务接待的场景化分接供电',
    '入选鲁班奖城市更新计划的示范工程',
  ],
}

const heroImage = {
  src: '/res/前海控股大厦.jpg',
  caption: { en: 'Qianhai Holding Investment Tower', zh: '前海控股投资大厦实景' },
} as const

const awardImage = {
  src: '/res/前海交易广场获奖.jpg',
  caption: { en: 'Luban-recognised urban renewal certificate', zh: '鲁班奖城市更新集群获奖证书' },
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
                {lang === 'en' ? 'Qianhai Holding Investment Tower' : '前海控股投资大厦'}
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
