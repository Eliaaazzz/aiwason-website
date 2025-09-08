// src/app/news/smart-tower/page.tsx
import NewsSectionsSlideIn, { type NewsGroup } from '../../../components/news/NewsSectionsSlideIn'

export const metadata = {
  title: '商业大楼 | Commercial Towers',
  description: '智慧商业大厦部署案例：高效、可靠、智能的母线系统。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const groups: NewsGroup[] = [
    {
      heading: lang === 'en' ? 'Commercial Towers' : '商业大楼',
      items: [
        {
          id: 'tower-deploy',
          title: lang === 'en' ? 'Smart Tower Deployment' : '智慧商业大厦部署',
          desc:
            lang === 'en'
              ? 'High-efficiency busbar rollout across 100 floors.'
              : '在 100 层楼宇完成高效母线部署，覆盖多业态场景。',
          date: '2025/05/05',
          img: '/res/skyscraper.jpg',
          href: `/products?lang=${lang}`,
        },
        {
          id: 'bms',
          title: lang === 'en' ? 'Intelligent Building Integration' : '智能楼控系统集成',
          desc:
            lang === 'en'
              ? 'Seamless BMS integration with real-time power insights.'
              : '无缝对接 BMS，提供实时用电洞察与策略联动。',
          date: '2025/05/10',
          img: '/res/前海金融中心.jpg',
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
            {lang === 'en' ? 'Commercial Towers' : '商业大楼'}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {lang === 'en'
              ? 'Smart, reliable, and scalable power distribution for modern high-rises.'
              : '面向现代高层建筑的智能、可靠、可扩展配电方案。'}
          </p>
        </div>
      </section>

      <NewsSectionsSlideIn lang={lang} anchorId="tower" groups={groups} />
    </main>
  )
}

