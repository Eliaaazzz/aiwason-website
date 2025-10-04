import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '万象汇旗舰综合体 | The MixC Flagship Complex',
  description:
    '万象汇旗舰综合体：智能母线支持中国最大购物中心品牌的商业、办公与文化一体化运营。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'The MixC flagship complex unites experiential retail, premium offices, and cultural plazas under China’s largest shopping mall brand.',
  zh: '万象汇旗舰综合体融合沉浸式商业、精品办公与文化广场，是中国规模最大的购物中心品牌核心项目。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'AIWASON’s fire-resistant busbars deliver energy to stacked retail atriums, duplex offices, and rooftop parks while meeting stringent tenant uptime requirements.',
    'Smart tap-offs meter every anchor tenant and pop-up zone, feeding granular data to the mall’s digital twin for demand response and marketing analytics.',
    'Legacy complexes within the MixC family, including the LEED Gold awarded Dongguan Minying International Trade Center, share the same backbone for sustainable expansion.',
  ],
  zh: [
    'AIWASON 耐火母线为多层商业中庭、复式办公与屋顶公园提供稳定能量，满足大型租户对连续运营的严苛要求。',
    '智能分接箱实现主力店与快闪区的精细计量，数据同步至商业数字孪生平台，用于需量响应与营销分析。',
    '包括荣获 LEED 金奖的东莞民盈国贸中心在内的万象汇姊妹项目共用该母线骨干，形成可持续扩展的商业网络。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Fire-resistant busbars linking retail atriums, offices, and cultural venues',
    'Tenant-level analytics supporting China’s largest mall brand',
    'Shared backbone with LEED Gold sister developments',
  ],
  zh: [
    '耐火母线贯通商业中庭、办公与文化场馆',
    '租户级数据支持中国最大购物中心品牌',
    '与 LEED 金奖姊妹项目共享骨干体系',
  ],
}

const heroImage = {
  src: '/res/万象汇.jpeg',
  caption: { en: 'The MixC flagship complex', zh: '万象汇旗舰综合体' },
} as const

const awardImage = {
  src: '/res/东莞民盈国贸美国LEED.jpg',
  caption: { en: 'Sister project earning U.S. LEED Gold certification', zh: '姊妹项目东莞民盈国贸中心荣获美国 LEED 金奖' },
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
                {lang === 'en' ? 'The MixC Flagship Complex' : '万象汇旗舰综合体'}
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
