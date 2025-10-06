// src/components/news/MediaReportRail.tsx
'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { StaticImageData } from 'next/image'
import { ExternalLink } from 'lucide-react'
import NavButton from '@/components/common/NavButton'
import CardImage from '@/components/common/CardImage'
import clsx from 'clsx'

export type MediaReportItem = {
  id: string
  title: string
  href: string
  img: string | StaticImageData
  date?: string
  source?: string
}

export default function MediaReportRail({
  title,
  items,
  lang = 'zh',
}: {
  title: string
  items: MediaReportItem[]
  lang?: 'zh' | 'en'
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const max = scrollWidth - clientWidth - 2
    setCanPrev(scrollLeft > 1)
    setCanNext(scrollLeft < max)
  }, [])

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = el.clientWidth * 0.98 * dir
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    updateButtons()
  }, [items.length, updateButtons])

  return (
    <section className="py-10">
      {/* 粗体大标题 + 右上角 NavButton（与标题同一行对齐） */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <ExternalLink className="w-6 h-6 text-[#76B900]" />
          {title}
        </h3>
        <div className="flex gap-2">
          <NavButton dir="prev" onClick={() => scrollByDir(-1)} disabled={!canPrev} ariaLabel={lang === 'en' ? 'Previous' : '上一组'} />
          <NavButton dir="next" onClick={() => scrollByDir(1)} disabled={!canNext} ariaLabel={lang === 'en' ? 'Next' : '下一组'} />
        </div>
      </div>

      {/* 小卡横向滚动：图片用 CardImage, contain 完整展示，白底 + 细描边；卡片之间留足 gap */}
      {items.length > 0 ? (
        <div
          ref={scrollerRef}
          onScroll={updateButtons}
          className={clsx(
            'w-full overflow-x-auto overflow-y-hidden',
            'flex gap-6 scroll-smooth snap-x snap-mandatory',
            '[-ms-overflow-style:none] [scrollbar-width:none]',
            '[&::-webkit-scrollbar]:hidden',
            'px-1 pb-1'
          )}
          aria-label={lang === 'en' ? 'Media report carousel' : '媒体报道横向滚动'}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'group shrink-0 snap-start focus:outline-none',
                // 小尺寸（新闻页专用），不会影响首页大图
                'min-w-[68vw] sm:min-w-[52vw] md:min-w-[380px] lg:min-w-[360px] lg:max-w-[360px]'
              )}
              aria-label={item.title}
            >
              <CardImage
                src={item.img}
                alt={item.title}
                ratio="16/9"
                fit="contain"
                roundedClassName="rounded-xl"
                sizes="(min-width:1024px) 360px, (min-width:768px) 380px, (min-width:640px) 52vw, 68vw"
                priority={false}
                loading="lazy"
                fetchPriority="low"
                bgClassName="bg-white"
                showRing
              />
              <div className="mt-2 text-center">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#76B900] transition-colors">
                  {item.title}
                </h4>
                {(item.date || item.source) && (
                  <div className="mt-1 text-xs text-gray-500 flex items-center justify-center gap-2">
                    {item.date && <span>{new Date(item.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN')}</span>}
                    {item.date && item.source && <span className="opacity-60">·</span>}
                    {item.source && <span className="truncate">{item.source}</span>}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}
