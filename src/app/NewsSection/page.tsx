// src/app/news/page.tsx
import type { Metadata } from 'next'
import { getNewsData } from '@/lib/news/news-data'          // 若无 @/ 别名 → 改为 ../../lib/news/news-data
import NewsSection from '@/components/home/NewsSection'      // 若无 @/ 别名 → 改为 ../../components/home/NewsSection

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'News & Media | AIWASON',
  description: 'Latest videos, media coverage, and WeChat posts.',
}

type PageProps = { searchParams?: { lang?: string } }

export default async function NewsPage({ searchParams }: PageProps) {
  const { videos, news, wechat, wechatAccount } = await getNewsData()
  const langDefault = (searchParams?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return (
    <main className="min-h-screen bg-[#f6fbef]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <NewsSection
          langDefault={langDefault}
          videos={videos}
          newsItems={news}
          wechatPosts={wechat}
          wechatAccount={wechatAccount}
          enableModal
        />
      </div>
    </main>
  )
}
