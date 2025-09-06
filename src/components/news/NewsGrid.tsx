import Image from 'next/image'
import Link from 'next/link'
import type { Locale, NewsItem } from '../../lib/types/news'

export default function NewsGrid({
  items,
  locale,
}: {
  items: NewsItem[]
  locale: Locale
}) {
  if (!items?.length) return null

  const fallbackCover = '/res/factory.jpg'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((n) => (
        <article key={n.id} className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="relative w-full aspect-[16/10]">
            <Image
              src={n.cover || fallbackCover}
              alt={typeof n.title === 'string' ? n.title : (locale === 'zh' ? (n.title as any).zh : (n.title as any).en) || 'news'}
              fill
              className="object-cover group-hover:scale-[1.02] transition"
            />
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-500">
              {new Date(n.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
            </div>
            <h3 className="mt-1 text-base font-semibold line-clamp-2">
              {typeof n.title === 'string' ? n.title : (locale === 'zh' ? (n.title as any).zh : (n.title as any).en)}
            </h3>
            {n.url && (
              <div className="mt-3">
                {/https?:\/\//.test(n.url) ? (
                  <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                    {locale === 'zh' ? '查看详情' : 'Read more'}
                  </a>
                ) : (
                  <Link href={n.url} className="text-emerald-700 hover:underline">
                    {locale === 'zh' ? '查看详情' : 'Read more'}
                  </Link>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

