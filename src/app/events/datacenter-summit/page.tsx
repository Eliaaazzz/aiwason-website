// src/app/events/datacenter-summit/page.tsx
import NewsSectionsSlideIn, { type NewsGroup } from '../../../components/news/NewsSectionsSlideIn'

export const metadata = {
  title: '会议中心 | Conference Center',
  description: 'AIWASON 会议与展会活动：国际数据中心大会等。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const groups: NewsGroup[] = [
    {
      heading: lang === 'en' ? 'Conference Center' : '会议中心',
      items: [
        {
          id: 'summit',
          title: lang === 'en' ? 'Global Data Center Summit' : '国际数据中心大会',
          desc:
            lang === 'en'
              ? 'AIWASON presents fire-resistant intelligent optoelectronic busbar solutions.'
              : '发布耐火智能光电母线解决方案，分享数据中心用电安全与效率最佳实践。',
          date: '2025/05/18',
          img: '/res/conference.jpg',
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
            {lang === 'en' ? 'Global Data Center Summit' : '国际数据中心大会'}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {lang === 'en'
              ? 'Showcasing AIWASON’s latest fire-resistant optoelectronic busbar technologies for data centers.'
              : '展示 AIWASON 最新耐火智能光电母线技术，面向数据中心应用场景。'}
          </p>
        </div>
      </section>

      <NewsSectionsSlideIn lang={lang} anchorId="event" groups={groups} />
    </main>
  )
}

