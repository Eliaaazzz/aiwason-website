import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '广州新一代信息技术产业园 | Guangzhou New-Generation Information Technology Park',
  description:
    '广州新一代信息技术产业园：园区级智能母线驱动创新生态，荣获 2025 世界智慧城市大奖。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'Guangzhou’s new-generation information technology park links innovation labs, offices, and cultural plazas with a campus-wide intelligent busbar backbone.',
  zh: '广州新一代信息技术产业园以园区级智能母线串联创新实验室、总部办公与文化广场。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Fire-resistant busbars traverse three innovation loops, delivering resilient energy for AI labs, R&D pilot lines, and public demonstration halls.',
    'The park’s digital twin blends energy, carbon, and visitor analytics so operators can orchestrate smart-city services, EV charging, and immersive exhibitions from a single console.',
    'The project was recognised with the 2025 World Smart City Award for showcasing how intelligent power distribution accelerates low-carbon urban innovation.',
  ],
  zh: [
    '耐火智能母线贯穿园区三大创新环线，为 AI 实验室、研发中试线与公众展示中心提供韧性电力。',
    '园区数字孪生整合能耗、碳排与客流数据，在同一平台上联动智慧城市服务、充电设施与沉浸式展陈。',
    '项目凭借智能配电助推的低碳城市创新实践，荣获 2025 世界智慧城市大奖。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Campus-wide intelligent busbar loops for innovation zones',
    'Digital twin linking energy, carbon, and visitor analytics',
    '2025 World Smart City Award winner',
  ],
  zh: [
    '园区级智能母线覆盖创新功能区',
    '数字孪生联动能耗、碳排与客流分析',
    '荣获 2025 世界智慧城市大奖',
  ],
}

const heroImage = {
  src: '/res/广州新一代技术信息产业园.jpg',
  caption: { en: 'Guangzhou New-Generation Information Technology Park', zh: '广州新一代信息技术产业园实景' },
} as const

const awardImage = {
  src: '/res/世界智慧城市大奖.jpg',
  caption: { en: '2025 World Smart City Award certificate', zh: '2025 世界智慧城市大奖证书' },
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
                {lang === 'en'
                  ? 'Guangzhou New-Generation Information Technology Park'
                  : '广州新一代信息技术产业园'}
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
