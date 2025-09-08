// src/app/news/library-showcase/page.tsx
import NewsSectionsSlideIn, { type NewsGroup } from '../../../components/news/NewsSectionsSlideIn'

export const metadata = {
  title: '图书馆 | Libraries',
  description: '高校图书馆示范项目：静音高效的配电与用电体验。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const groups: NewsGroup[] = [
    {
      heading: lang === 'en' ? 'Libraries' : '图书馆',
      items: [
        {
          id: 'library',
          title: lang === 'en' ? 'University Library Showcase' : '高校图书馆示范项目',
          desc:
            lang === 'en'
              ? 'Silent, efficient power distribution for learning environments.'
              : '面向学习空间的静音高效配电方案。',
          date: '2025/04/12',
          img: '/res/汕头大学新图书馆—A.jpg',
          href: `/products?lang=${lang}`,
        },
        {
          id: 'library-ems',
          title: lang === 'en' ? 'Comfort and Safety' : '舒适与安全与并重',
          desc:
            lang === 'en'
              ? 'Low-noise, safe, and efficient infrastructure for study spaces.'
              : '低噪、安全与高效并重的学习空间基础设施。',
          date: '2025/05/02',
          img: '/res/广州亚运城.jpg',
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
            {lang === 'en' ? 'Libraries' : '图书馆'}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {lang === 'en'
              ? 'Quietness and safety matter—deliver dependable power for learning environments.'
              : '静音与安全至关重要——为学习环境提供可靠的电力基础设施。'}
          </p>
        </div>
      </section>

      <NewsSectionsSlideIn lang={lang} anchorId="library" groups={groups} />
    </main>
  )
}

