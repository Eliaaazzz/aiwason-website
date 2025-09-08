// src/app/news/data-center/page.tsx
import NewsSectionsSlideIn, { type NewsGroup } from '../../../components/news/NewsSectionsSlideIn'

export const metadata = {
  title: '数据中心 | Data Center',
  description:
    'AIWASON 数据中心专页：耐火智能光电母线、AI 监控、配电优化等解决方案。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const groups: NewsGroup[] = [
    {
      heading: lang === 'en' ? 'Data Centers' : '数据中心',
      items: [
        {
          id: 'dc-overview',
          title: lang === 'en' ? 'Fire-Resistant Optoelectronic Busbars' : '耐火智能光电母线 赋能数据中心',
          desc:
            lang === 'en'
              ? 'Enhance reliability and safety with 2-hour fire resistance and intelligent distribution.'
              : '以两小时耐火等级与智能化配电，全面提升数据中心的可靠性与安全性。',
          date: '2025/05/12',
          img: '/res/dataCenter.jpeg',
          href: `/products?lang=${lang}`,
        },
        {
          id: 'dc-ai',
          title: lang === 'en' ? 'AI-Powered Monitoring Upgrade' : 'AI 智能监控系统升级',
          desc:
            lang === 'en'
              ? 'Real-time analytics with predictive maintenance designed for mission-critical loads.'
              : '面向关键负载的实时分析与预测性维护，提前识别风险，保障稳定运行。',
          date: '2025/05/18',
          img: '/res/aiwason_fireproof_busbar_hero.png',
          href: `/products?lang=${lang}`,
        },
        {
          id: 'dc-efficiency',
          title: lang === 'en' ? 'High-Density Power Optimization' : '高密度配电效率优化',
          desc:
            lang === 'en'
              ? 'Modular design reduces losses and improves O&M efficiency at scale.'
              : '模块化设计降低损耗并提升大规模运维效率，适配高功率密度。',
          date: '2025/05/22',
          img: '/res/company.jpg',
          href: `/products?lang=${lang}`,
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Banner / hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            {lang === 'en' ? 'Data Center Solutions' : '数据中心解决方案'}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {lang === 'en'
              ? 'Explore AIWASON’s fire-resistant intelligent optoelectronic busbar system for reliable, efficient, and intelligent data centers.'
              : '探索 AIWASON 耐火智能光电母线系统，打造更可靠、更高效、更智能的数据中心基础设施。'}
          </p>
        </div>
      </section>

      {/* Content list reusing the homepage news style */}
      <NewsSectionsSlideIn lang={lang} anchorId="dc-news" groups={groups} />
    </main>
  )
}

