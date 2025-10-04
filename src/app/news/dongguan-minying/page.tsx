import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '东莞民盈国贸中心 | Dongguan Minying International Trade Center',
  description:
    '东莞民盈国贸中心：MixC 姊妹综合体的智能母线升级，项目荣获美国 LEED 金奖。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'Dongguan Minying International Trade Center upgrades the MixC sister complex with intelligent busbars that deliver LEED Gold performance.',
  zh: '东莞民盈国贸中心通过智能母线升级 MixC 姊妹综合体，并实现 LEED 金奖的高性能表现。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Fire-resistant busbars loop the retail podium, office towers, and serviced apartments, supporting phased renovations without disrupting operations.',
    'Smart tap-offs meter every anchor tenant and integrate with the complex’s energy dashboard to support carbon reporting and demand response.',
    'The upgrade underpins the U.S. LEED Gold certification, demonstrating scalable sustainability across the MixC portfolio.',
  ],
  zh: [
    '耐火母线串联商业裙楼、办公塔楼与服务式公寓，使综合体在分阶段改造中保持运营。',
    '智能分接箱实现主力租户的精细计量，并与能耗平台联动支持碳排报告与需量响应。',
    '该升级助力项目获得美国 LEED 金奖，为 MixC 体系的可持续扩展提供范式。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Fire-resistant busbars bridging podiums, towers, and apartments',
    'Tenant-level metering integrated with sustainability dashboards',
    'Certified U.S. LEED Gold smart-retail complex',
  ],
  zh: [
    '耐火母线贯通裙楼、塔楼与公寓',
    '租户级计量接入可持续平台',
    '美国 LEED 金奖智慧商业综合体',
  ],
}

const heroImage = {
  src: '/res/东莞民盈国贸.jpg',
  caption: { en: 'Dongguan Minying International Trade Center', zh: '东莞民盈国贸中心' },
} as const

const awardImage = {
  src: '/res/东莞民盈国贸美国LEED.jpg',
  caption: { en: 'LEED Gold certificate', zh: 'LEED 金奖证书' },
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
                  ? 'Dongguan Minying International Trade Center'
                  : '东莞民盈国贸中心'}
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
