// src/app/news/airport-upgrade/page.tsx
import NewsSectionsSlideIn, { type NewsGroup } from '../../../components/news/NewsSectionsSlideIn'

export const metadata = {
  title: '机场 | Airports',
  description: '机场能源系统升级：耐火智能母线提升航站楼运行效率与安全性。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const groups: NewsGroup[] = [
    {
      heading: lang === 'en' ? 'Airports' : '机场',
      items: [
        {
          id: 'airport',
          title: lang === 'en' ? 'Airport Energy Upgrade' : '机场能源系统升级',
          desc:
            lang === 'en'
              ? 'Enhancing terminal operations with intelligent, fire-resistant busbars.'
              : '以耐火智能母线提升航站楼运行效率与安全性。',
          date: '2025/04/28',
          img: '/res/深圳机场.jpg',
          href: `/products?lang=${lang}`,
        },
        {
          id: 'airside',
          title: lang === 'en' ? 'Critical Area Power Assurance' : '关键区域供电保障',
          desc:
            lang === 'en'
              ? 'Reliable distribution for airside operations and critical facilities.'
              : '为空侧运行与关键设施提供可靠配电能力。',
          date: '2025/05/11',
          img: '/res/广州新一代技术信息产业园—A.jpg',
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
            {lang === 'en' ? 'Airports' : '机场'}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {lang === 'en'
              ? 'Safety, resilience, and efficiency for busy terminals and operations.'
              : '为繁忙的航站楼与运行区域带来安全、韧性与效率。'}
          </p>
        </div>
      </section>

      <NewsSectionsSlideIn lang={lang} anchorId="airport" groups={groups} />
    </main>
  )
}

