// src/app/news/rail-transit-power/page.tsx
import NewsSectionsSlideIn, { type NewsGroup } from '../../../components/news/NewsSectionsSlideIn'

export const metadata = {
  title: '高铁 | High-speed Rail',
  description: '轨道交通配电系统：稳健、可视与可预测的运维能力。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const groups: NewsGroup[] = [
    {
      heading: lang === 'en' ? 'High-speed Rail' : '高铁',
      items: [
        {
          id: 'rail',
          title: lang === 'en' ? 'Rail Transit Power System' : '轨道交通配电系统',
          desc:
            lang === 'en'
              ? 'Robust distribution for depots and stations with predictive monitoring.'
              : '为车辆段与车站提供稳健配电与预测监测能力。',
          date: '2025/04/20',
          img: '/res/中车集团-0.png',
          href: `/products?lang=${lang}`,
        },
        {
          id: 'rail-ems',
          title: lang === 'en' ? 'Energy Efficiency Optimization' : '能效优化与降损',
          desc:
            lang === 'en'
              ? 'Lower losses across long runs with modular busbars.'
              : '利用模块化母线降低长距离线路损耗，提升整体能效。',
          date: '2025/05/03',
          img: '/res/青岛地铁.jpg',
          href: `/products?lang=${lang}`,
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            {lang === 'en' ? 'High-speed Rail' : '高铁'}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {lang === 'en'
              ? 'Reliable power for rail transit infrastructure with predictive insights.'
              : '为轨道交通基础设施提供可靠供电与可预测运维洞察。'}
          </p>
        </div>
      </section>

      <NewsSectionsSlideIn lang={lang} anchorId="rail" groups={groups} />
    </main>
  )
}

