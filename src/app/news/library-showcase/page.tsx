import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '图书馆 | Libraries',
  description: '深圳宝安新图书馆：静音母线、智慧照明与多场景文化空间的能源升级。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'Shenzhen Bao’an New Library reimagines civic learning spaces with immersive reading rooms and cultural venues. AIWASON delivers silent, efficient power infrastructure throughout.',
  zh: '深圳宝安新图书馆以沉浸式阅读与多功能文化空间为核心，AIWASON 提供静音高效的配电基础设施。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Low-temperature rise busways run above acoustic ceilings, cutting electromagnetic noise so readers can focus even during peak hours. Redundant feeds protect archival vaults, maker labs, and auditorium stages.',
    'Lighting, HVAC, and display systems draw on smart tap-offs with metering granularity down to each thematic zone. Facility teams adjust ambience and energy budgets from a central digital twin.',
    'Night-time maintenance windows keep the library open to the public while crews swap or extend tap-offs to new exhibition wings.',
  ],
  zh: [
    '低温升母线隐藏于声学吊顶之上，显著降低电磁噪声，让读者在高峰期也能保持沉浸体验。冗余供电保障典藏库、创客实验室与报告厅舞台的连续运行。',
    '照明、空调及多媒体系统均通过具备精细化计量的智能分接箱取电，运维团队可在数字孪生平台上调节氛围与能耗预算。',
    '通过夜间检修时段完成分接箱更换与展馆扩容，保证白天对公众开放不受影响。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Silent busways paired with redundant feeds for archives and auditoriums',
    'Zone-level metering and ambience control via digital twin dashboards',
    'Night-time retrofit workflow keeps public access uninterrupted',
  ],
  zh: [
    '静音母线与冗余供电共同守护典藏库与报告厅',
    '数字孪生平台实现分区计量与氛围调控',
    '夜间改造流程保障白天对公众持续开放',
  ],
}

const heroImage = {
  src: '/res/深圳宝安新图书馆.jpg',
  caption: { en: 'Shenzhen Bao’an New Library', zh: '深圳宝安新图书馆' },
} as const

const gallery = [
  {
    src: '/res/gallery-39.jpg',
    caption: { en: 'Quiet reading hall served by silent busways', zh: '由静音母线支撑的沉浸式阅读大厅' },
  },
  {
    src: '/res/gallery-41.jpg',
    caption: { en: 'Multi-purpose cultural venue with flexible lighting', zh: '多功能文化空间的智能照明场景' },
  },
] as const

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as Lang) || 'zh'

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Libraries & Culture' : '图书馆与文化设施'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Shenzhen Bao’an New Library' : '深圳宝安新图书馆'}
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

            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((item) => (
                <figure
                  key={item.src}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                >
                  <Image
                    src={item.src}
                    alt={item.caption[lang]}
                    width={640}
                    height={480}
                    className="w-full h-auto object-cover"
                  />
                  <figcaption className="px-4 py-3 text-sm text-gray-500 text-center">
                    {item.caption[lang]}
                  </figcaption>
                </figure>
              ))}
            </div>

            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              {highlights[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href={`/solutions?lang=${lang}#culture`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
              >
                {lang === 'en' ? 'Explore Cultural Venues' : '查看文化场馆方案'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
