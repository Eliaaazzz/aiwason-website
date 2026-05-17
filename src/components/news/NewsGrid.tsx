import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import type { Localised, NewsItem } from '../../lib/types/news'

type Locale = 'zh' | 'en'

const resolveText = (value: Localised<string> | string, loc: Locale) =>
  typeof value === 'string' ? value : value[loc] ?? value.en

const toImageSrc = (img: string | StaticImageData | undefined) =>
  typeof img === 'string' ? img : img?.src ?? '/res/factory.jpg'

export default function NewsGrid({
  items,
  locale,
}: {
  items: NewsItem[]
  locale: Locale
}) {
  if (!items?.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((n) => (
        <article key={n.id} className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="relative w-full aspect-[16/10]">
            <Image
              src={toImageSrc(n.image)}
              alt={resolveText(n.title, locale) || 'news'}
              fill
              className="object-cover group-hover:scale-[1.02] transition"
            />
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-500">
              {new Date(n.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
            </div>
            <h3 className="mt-1 text-base font-semibold line-clamp-2">
              {resolveText(n.title, locale)}
            </h3>
            {n.link && (
              <div className="mt-3">
                {/https?:\/\//.test(n.link) ? (
                  <a href={n.link} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline" aria-label={`${locale === 'zh' ? '查看详情' : 'Read more'}: ${resolveText(n.title, locale)}`}>
                    {locale === 'zh' ? '查看详情' : 'Read more'}
                  </a>
                ) : (
                  <Link href={n.link} className="text-emerald-700 hover:underline" aria-label={`${locale === 'zh' ? '查看详情' : 'Read more'}: ${resolveText(n.title, locale)}`}>
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
