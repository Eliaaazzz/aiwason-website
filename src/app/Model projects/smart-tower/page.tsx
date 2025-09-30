// src/app/news/smart-tower/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '商业大楼 | Commercial Towers',
  description: '智慧商业大厦部署案例：高效、可靠、智能的母线系统。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const detailCopy: Record<'zh' | 'en', string[]> = {
    en: [
      'Mixed-use towers demand compact, high-capacity distribution that can scale with tenant turnover. Our modular busbars free up valuable riser space while keeping voltage drop and heat well below traditional cabling.',
      'Integrated gateways share energy, carbon, and alarm data directly with the building management platform so operators can orchestrate demand response and predictive maintenance from a single dashboard.',
      'Plug-and-play tap-off boxes with smart metering empower property teams to optimise each tenant’s load while reporting sustainability metrics to stakeholders.',
    ],
    zh: [
      '多业态高层建筑需要兼顾空间利用与高容量供电。模块化母线释放竖井空间，同时有效控制压降与发热，相比传统电缆更易维护。',
      '集成的通信网关可将能耗、碳排与告警信息实时同步至楼宇管理平台，帮助运维团队在同一界面完成需求响应与预测性维护。',
      '即插即用的智能分接箱具备精细化计量能力，便于物业团队统筹租户用电并输出可持续发展报表。',
    ],
  }

  const heroImage = '/res/skyscraper.jpg'

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Commercial Towers' : '商业大楼'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Smart Tower Deployment' : '智慧商业大厦部署'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Smart, reliable, and scalable power distribution for modern high-rises.'
                  : '面向现代高层建筑的智能、可靠、可扩展配电方案。'}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <figure className="order-2 lg:order-1 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={heroImage}
                alt={lang === 'en' ? 'High-rise skyline' : '商业大厦'}
                width={960}
                height={640}
                className="w-full h-auto object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-gray-500">
                {lang === 'en'
                  ? 'Modular busbars free up riser space across 100-floor complexes.'
                  : '模块化母线为百层综合体释放竖井空间。'}
              </figcaption>
            </figure>

            <div className="order-1 lg:order-2 space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {detailCopy[lang].map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
                {(lang === 'en'
                  ? ['AI-powered BMS integration', 'Tenant-level energy analytics', 'Rapid retrofit without business interruption']
                  : ['AI 智能楼控联动', '租户级能耗分析', '不停业快速改造']
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href={`/solutions?lang=${lang}#operations`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
            >
              {lang === 'en' ? 'Explore Operations Platform' : '查看运维管理方案'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
