// src/components/news/MediaCarousel.tsx
'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import NavButton from '@/components/common/NavButton'

export type MediaCard = {
  id: string
  title: string
  desc?: string
  subline?: string // e.g. "Media | Announcement" or source name
  href: string
  img: StaticImageData
}

export default function MediaCarousel({
  title,
  items,
  lang = 'zh',
}: {
  title: string
  items: MediaCard[]
  lang?: 'zh' | 'en'
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  // track whether we can scroll left/right to toggle disabled state
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // keep this in sync with your gap-6 (24px)
  const GAP = 24

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanPrev(scrollLeft > 2)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState as EventListener)
      ro.disconnect()
    }
  }, [updateScrollState])

  // Prefer scrolling by one card width + gap for a consistent step
  const getStep = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return 400
    const firstCard = el.querySelector<HTMLElement>('[data-card]')
    if (firstCard) return firstCard.clientWidth + GAP
    // fallback to your previous heuristic
    return Math.min(1200, Math.max(320, el.clientWidth * 0.9))
  }, [])

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const node = scrollerRef.current
    if (!node) return
    const amount = getStep()
    node.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }, [getStep])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByDir(1) }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollByDir(-1) }
  }, [scrollByDir])

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">{title}</h2>
          <div className="flex gap-2">
            {/* Use brand green by overriding className if you like: bg-[#aee28b] hover:bg-[#99d173] */}
            <NavButton
              dir="prev"
              onClick={() => scrollByDir(-1)}
              disabled={!canPrev}
              ariaLabel={lang === 'en' ? 'Previous' : '上一页'}
              // className="bg-[#aee28b] hover:bg-[#99d173]" // optional brand override
            />
            <NavButton
              dir="next"
              onClick={() => scrollByDir(1)}
              disabled={!canNext}
              ariaLabel={lang === 'en' ? 'Next' : '下一页'}
              // className="bg-[#aee28b] hover:bg-[#99d173]" // optional brand override
            />
          </div>
        </div>

        <div className="mt-8">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth"
            role="list"
            tabIndex={0}
            onKeyDown={onKeyDown}
            aria-label={lang === 'en' ? 'Media items' : '媒体条目'}
          >
            {items.map((item) => (
              <article
                key={item.id}
                data-card
                role="listitem"
                className="min-w-[85%] sm:min-w-[60%] lg:min-w-[32%] snap-start"
              >
                <Link
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative w-full h-56 bg-white flex items-center justify-center">
                    <Image
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-contain"
                      priority={false}
                    />
                  </div>
                  <div className="px-5 py-4">
                    {item.subline && (
                      <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        {item.subline}
                      </div>
                    )}
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.desc}</p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
