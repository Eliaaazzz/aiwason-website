import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '中山完美金鹰广场 | Zhongshan Perfect Plaza',
  description:
    '中山完美金鹰广场大型城市综合体案例：耐火智能母线贯通商业、办公与酒店，助力赢得美国 LEED 金奖。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'Zhongshan Perfect Plaza blends retail, office, and hospitality towers. AIWASON delivers a resilient power backbone that underpins the project’s U.S. LEED Gold certification.',
  zh: '中山完美金鹰广场集商业、办公与酒店塔楼于一体。AIWASON 打造的韧性供配电骨干支撑项目揽获美国 LEED 金奖。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'The 320,000 m² complex required uninterrupted upgrades while tenants stayed open. Fire-resistant busbars loop podiums, towers, and basement plant rooms, forming an intelligent ring network with sectional isolation.',
    'Smart tap-off boxes feed luxury retail, office sky lobbies, and a five-star hotel. Metered data flows into the building management platform so operators coordinate demand response, billing, and carbon reporting from a single dashboard.',
    'Integrated PV arrays and chilled-water plants share the same backbone, cutting annual energy intensity by 11%—a key metric in the U.S. LEED Gold review. Sister projects such as Dongguan Minying International Trade Center also achieved LEED Gold using the same architecture.',
  ],
  zh: [
    '32 万平方米的综合体需要在租户不停业的情况下升级。耐火母线串联裙楼、塔楼与地下机房，构成具备分段隔离能力的智能环网。',
    '智能分接箱分别服务高端商业、写字楼空中大堂与五星级酒店，计量数据实时回传楼控平台，运维团队可在同一界面统筹需量响应、账单与碳排管理。',
    '光伏、冷站等能源子系统与母线骨干协同，使年度能耗强度下降 11%，成为美国 LEED 金奖评审的关键指标。包括东莞民盈国贸中心在内的姊妹项目同样凭借该架构斩获 LEED 金奖。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Fire-resistant busbar ring with sectional isolation for mixed-use towers',
    'Tenant-level metering and carbon reporting within the BMS platform',
    'Proven pathway to U.S. LEED Gold across multiple large complexes',
  ],
  zh: [
    '服务多业态塔楼的耐火母线环网，具备区域隔离能力',
    '租户级计量与碳排报表均在楼控平台内完成',
    '验证可复制的美国 LEED 金奖路径，适用于多座综合体',
  ],
}

const heroImage = {
  src: '/res/zhonshan%20perfect%20plaza.jpg',
  caption: { en: 'Zhongshan Perfect Plaza tower cluster', zh: '中山完美金鹰广场塔楼群' },
} as const

const gallery = [
  {
    src: '/res/zhonshan%20perfect%20plaza%20American%20LEED%20GOLD.png',
    caption: { en: 'U.S. LEED Gold certificate for Zhongshan Perfect Plaza', zh: '中山完美金鹰广场获得美国 LEED 金奖证书' },
  },
  {
    src: '/res/东莞民盈国贸美国LEED.jpg',
    caption: { en: 'Dongguan Minying International Trade Center – LEED Gold recognition', zh: '东莞民盈国贸中心获美国 LEED 金奖' },
  },
  {
    src: '/res/东莞民盈国贸美国LEED2.jpg',
    caption: { en: 'Extended LEED Gold documentation for sister complex', zh: '姊妹综合体 LEED 金奖佐证材料' },
  },
] as const

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as Lang) || 'zh'

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Urban Complex' : '大型城市综合体'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Zhongshan Perfect Plaza' : '中山完美金鹰广场'}
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
            <figcaption className="px-6 py-4 text-sm text-gray-500">{heroImage.caption[lang]}</figcaption>
          </figure>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
              {paragraphs[lang].map((para) => (
                <p key={para}>{para}</p>
              ))}

              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                {highlights[lang].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

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
                  <figcaption className="px-4 py-3 text-sm text-gray-500">{item.caption[lang]}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
