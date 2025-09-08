// src/app/news/hotel-deployment/page.tsx
import NewsSectionsSlideIn, { type NewsGroup } from '../../../components/news/NewsSectionsSlideIn'

export const metadata = {
  title: '五星级酒店 | Five-star Hotels',
  description: '高端酒店母线部署：可靠、低噪与高效的配电方案。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const groups: NewsGroup[] = [
    {
      heading: lang === 'en' ? 'Five-star Hotels' : '五星级酒店',
      items: [
        {
          id: 'hotel',
          title: lang === 'en' ? 'Luxury Hotel Deployment' : '高端酒店母线部署',
          desc:
            lang === 'en'
              ? 'Reliable, quiet, and efficient power for premium hospitality.'
              : '为高端酒店提供可靠、低噪与高效的配电方案。',
          date: '2025/05/08',
          img: '/res/深圳四季酒店.jpg',
          href: `/products?lang=${lang}`,
        },
        {
          id: 'hotel-ems',
          title: lang === 'en' ? 'Energy Management and Safety' : '能源管理与安全保障',
          desc:
            lang === 'en'
              ? 'Streamlined monitoring reduces downtime and improves guest experience.'
              : '精细化监控降低停机风险，助力提升宾客体验。',
          date: '2025/05/16',
          img: '/res/深圳瑞吉酒店.jpg',
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
            {lang === 'en' ? 'Five-star Hotels' : '五星级酒店'}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {lang === 'en'
              ? 'High-quality experiences require reliable, silent, and efficient electrical infrastructure.'
              : '高品质体验离不开可靠、静音与高效的用电基础设施。'}
          </p>
        </div>
      </section>

      <NewsSectionsSlideIn lang={lang} anchorId="hotel" groups={groups} />
    </main>
  )
}

