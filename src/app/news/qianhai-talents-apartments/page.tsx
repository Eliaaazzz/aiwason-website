import Image from 'next/image'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '前海玲珑国际人才公寓 | Qianhai Linglong Talent Apartments',
  description:
    '前海玲珑国际人才公寓：低损耗智能母线与 BIM 运维体系，项目斩获全国 BIM 创新奖与广东钢结构金奖。',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'zh' | 'en'

const introCopy: Record<Lang, string> = {
  en: 'Qianhai Linglong Talent Apartments houses 3,000 residents with modular amenities. AIWASON delivers quiet, low-loss power distribution backed by BIM-driven operations.',
  zh: '前海玲珑国际人才公寓为 3000 余名人才提供居住配套。AIWASON 打造低损耗、静音的母线系统，并以 BIM 驱动运维。',
}

const paragraphs: Record<Lang, string[]> = {
  en: [
    'Lightweight busways run above prefabricated corridors, reducing vertical shaft usage by 18% and leaving more space for ventilation and storage. Each residential module connects through smart tap-offs with tenant-level metering and prepaid billing.',
    'The project’s BIM model tracks component IDs down to each tap-off breaker. Maintenance teams scan QR codes to retrieve thermal history and inspection records, enabling rapid troubleshooting with minimal resident disruption.',
    'The integrated design won national BIM innovation honours and the Guangdong Steel Structure Gold Award, recognising the energy-efficient, human-centric approach to talent housing.',
  ],
  zh: [
    '轻量化母线沿装配式走廊铺设，使竖井空间节省 18%，为通风与储物留出更多余量。每个居住单元通过智能分接箱接入，实现租户级计量与预付费管理。',
    '项目 BIM 模型将构件 ID 精确到每个分接箱断路器，运维人员扫码即可调取温升与巡检记录，快速排障且不打扰住户。',
    '方案斩获全国 BIM 创新一等奖与广东钢结构金奖，体现对人才住房节能与宜居性的综合提升。',
  ],
}

const highlights: Record<Lang, string[]> = {
  en: [
    'Low-loss, quiet busways dedicated to residential loads',
    'Tenant-level metering and prepaid billing via smart tap-offs',
    'BIM-linked maintenance workflow honoured with national awards',
  ],
  zh: [
    '低损耗、低噪声的住宅专用母线系统',
    '智能分接箱实现租户级计量与预付费',
    'BIM 运维流程荣获全国大奖',
  ],
}

const heroImage = {
  src: '/res/gallery-53.jpg',
  caption: { en: 'Linglong Talent Apartments exterior', zh: '前海玲珑国际人才公寓外立面' },
} as const

const awardImages = [
  {
    src: '/res/前海玲珑湾获奖.png',
    caption: { en: 'National BIM Innovation Award certificate', zh: '全国 BIM 创新一等奖证书' },
  },
  {
    src: '/res/前海玲珑湾结构金奖.png',
    caption: { en: 'Guangdong Steel Structure Gold Award announcement', zh: '广东钢结构金奖获奖公示' },
  },
] as const

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as Lang) || 'zh'

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Residential' : '住宅社区'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Qianhai Linglong Talent Apartments' : '前海玲珑国际人才公寓'}
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

              <div className="grid gap-4 sm:grid-cols-2">
                {awardImages.map((item) => (
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
