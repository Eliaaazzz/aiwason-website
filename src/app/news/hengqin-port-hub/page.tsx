import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '横琴口岸综合交通枢纽 | Hengqin Port Integrated Hub',
  description:
    '横琴口岸综合交通枢纽：耐火智能母线联动交通、电力与安全系统，荣膺中国建设工程鲁班奖。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'Hengqin Port integrates cross-border checkpoints, metro, and bus terminals. AIWASON provides the power backbone that secured the China Construction Engineering Luban Prize.',
  zh: '横琴口岸综合交通枢纽集边检、地铁与巴士总站于一体。AIWASON 提供的供配电骨干帮助项目摘得中国建设工程鲁班奖。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Overlapping passenger flows demanded redundant power paths and intelligent evacuation lighting. Fire-resistant busbars span the arrival hall, underground metro platforms, and bus terminals with sectionalised switching.',
    'Each critical node uses optical sensing to monitor temperature and harmonic distortion. Alerts feed directly into the joint command center, enabling rapid decisions during peak cross-border periods.',
    'The integrated design reduced emergency lighting response time by 40% and met stringent customs and immigration continuity standards, earning the China Construction Engineering Luban Prize.',
  ],
  zh: [
    '枢纽内多层客流叠加，需要冗余供电路径与智能疏散照明。耐火母线跨越到达大厅、地下站台与巴士总站，并具备分区切换能力。',
    '关键节点采用光纤感知监测温升与谐波，告警直接汇入联合指挥中心，保障口岸高峰期的快速处置。',
    '整体方案让应急照明响应时间缩短 40%，满足海关与边检的连续运行标准，最终荣膺中国建设工程鲁班奖。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Redundant busbar loops covering checkpoint, metro, and bus terminals',
    'Optical sensing with real-time alarms into the joint command center',
    'Awarded the China Construction Engineering Luban Prize',
  ],
  zh: [
    '贯穿口岸、地铁与巴士总站的冗余母线环路',
    '光纤感知数据实时接入联合指挥中心',
    '荣获中国建设工程鲁班奖',
  ],
}

const heroImage = {
  src: '/res/横琴口岸综合交通枢纽.jpg',
  caption: { en: 'Hengqin Port Integrated Hub', zh: '横琴口岸综合交通枢纽' },
} as const

const awardImage = {
  src: '/res/横琴口岸鲁班奖.png',
  caption: { en: 'China Construction Engineering Luban Prize announcement', zh: '中国建设工程鲁班奖获奖公示' },
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
                {lang === 'en' ? 'Transport Hub' : '交通枢纽'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Hengqin Port Integrated Hub' : '横琴口岸综合交通枢纽'}
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
