// src/components/news/MediaCarousel.tsx
'use client'

import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import clsx from 'clsx'
import NavButton from '@/components/common/NavButton'

export type MediaCard = {
  id: string
  title?: string
  href?: string
  img: string | StaticImageData
  /** cover: 项目大图；contain: 奖状完整展示 */
  fit?: 'cover' | 'contain'
  /** 可选：控制图片对齐 */
  objectPosition?: string
  /** 兼容旧数据字段（不使用也不报错） */
  intrinsic?: boolean
}

type Props = {
  title?: string
  items: MediaCard[]
  lang?: 'zh' | 'en'
  /** 仅渲染图片卡片 */
  imageOnly?: boolean
  /** 去掉外框 */
  frameless?: boolean
  /** 隐藏头部标题 */
  hideHeader?: boolean
  /** 显示覆盖在视口右上的导航控件（模型项目用这个） */
  controlsOverlay?: boolean
  /** 为兼容旧调用保留，不再加样式 */
  controlsVariant?: 'brand' | 'ghost'
  /** 单卡片宽度类名（min/max-width） */
  cardWidthClass?: string
  /** 图片圆角类名 */
  roundedClass?: string
  /** 固定视口高度（大图视觉） */
  imageHeightClass?: string
  /** 最大视口高度（vh），例如 86 */
  viewportContainMaxVH?: number
  /**
   * ✅ 向外暴露控制权（新闻区在 Header 放按钮时使用）
   * 每次 canPrev/canNext 变化都会回调一次
   */
  expose?: (api: { prev: () => void; next: () => void; canPrev: boolean; canNext: boolean }) => void
}

/** 从 cardWidthClass 里提取 px 宽度，供 <Image sizes> 使用 */
function sizesFromWidthClass(cardWidthClass: string | undefined) {
  const cls = cardWidthClass ?? ''
  const pxMatches = Array.from(cls.matchAll(/\[(\d+)px\]/g)).map((m) => parseInt(m[1]!, 10))
  const desktopPx = pxMatches.length ? Math.max(...pxMatches) : null
  return desktopPx ? `(min-width:1024px) ${desktopPx}px, 88vw` : '(min-width:1024px) 820px, 88vw'
}

export default function MediaCarousel({
  title = '',
  items,
  lang = 'zh',
  imageOnly = true,
  frameless = true,
  hideHeader = true,
  controlsOverlay = true,
  // controlsVariant,
  // ✅ 默认小尺寸（新闻区），模型项目会在调用处显式传大尺寸覆盖
  cardWidthClass = 'min-w-[68vw] sm:min-w-[52vw] md:min-w-[380px] lg:min-w-[360px] lg:max-w-[360px]',
  roundedClass = 'rounded-2xl',
  imageHeightClass = 'h-[160px] sm:h-[180px] lg:h-[200px]',
  viewportContainMaxVH,
  expose,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const sizesHint = useMemo(() => sizesFromWidthClass(cardWidthClass), [cardWidthClass])

  const scrollToCard = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      if (index < 0 || index >= cardRefs.current.length) return
      const container = scrollerRef.current
      const targetCard = cardRefs.current[index]
      if (!container || !targetCard) return

      const cardCenter = targetCard.offsetLeft + targetCard.clientWidth / 2
      const desired = cardCenter - container.clientWidth / 2
      const max = Math.max(0, container.scrollWidth - container.clientWidth)
      const nextLeft = Math.max(0, Math.min(desired, max))
      container.scrollTo({ left: nextLeft, behavior })
      setActiveIndex(index)
    },
    [],
  )

  const handleScroll = useCallback(() => {
    const container = scrollerRef.current
    if (!container || !cardRefs.current.length) return

    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closestIndex = 0
    let minDistance = Number.POSITIVE_INFINITY

    cardRefs.current.forEach((card, idx) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const distance = Math.abs(cardCenter - containerCenter)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = idx
      }
    })

    setActiveIndex(closestIndex)
  }, [])

  useEffect(() => {
    handleScroll()
  }, [items.length, handleScroll])

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length)
    if (!items.length) {
      setActiveIndex(0)
      return
    }
    scrollToCard(0, 'auto')
  }, [items.length, scrollToCard])

  const canPrev = activeIndex > 0
  const canNext = activeIndex < items.length - 1

  const prev = useCallback(() => {
    if (!canPrev) return
    scrollToCard(activeIndex - 1)
  }, [activeIndex, canPrev, scrollToCard])

  const next = useCallback(() => {
    if (!canNext) return
    scrollToCard(activeIndex + 1)
  }, [activeIndex, canNext, scrollToCard])

  // 每次状态变化时，把控制权暴露给外部（新闻区的 Header 按钮使用）
  useEffect(() => {
    expose?.({ prev, next, canPrev, canNext })
  }, [expose, prev, next, canPrev, canNext])

  const overlay = controlsOverlay ? (
    <div className="pointer-events-none absolute right-3 top-3 z-10">
      <div className="flex gap-2 pointer-events-auto">
        <NavButton
          dir="prev"
          onClick={prev}
          disabled={!canPrev}
          ariaLabel={lang === 'en' ? 'Previous' : '上一张'}
        />
        <NavButton
          dir="next"
          onClick={next}
          disabled={!canNext}
          ariaLabel={lang === 'en' ? 'Next' : '下一张'}
        />
      </div>
    </div>
  ) : null

  const maxVHStyle = viewportContainMaxVH
    ? ({ maxHeight: `${viewportContainMaxVH}vh` } as React.CSSProperties)
    : undefined

  return (
    <section className={clsx(frameless ? '' : 'py-4')}>
      {!hideHeader && title ? (
        <header className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </header>
      ) : null}

      {/* 相对定位：供右上角 overlay 按钮使用（模型项目） */}
      <div className={clsx('relative w-full', imageHeightClass)} style={maxVHStyle}>
        {overlay}

        {/* 横向滚动区域 */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className={clsx(
            'h-full w-full overflow-x-auto overflow-y-hidden',
            'flex gap-4 scroll-smooth snap-x snap-mandatory',
            '[-ms-overflow-style:none] [scrollbar-width:none]',
            '[&::-webkit-scrollbar]:hidden',
          )}
          aria-label={lang === 'en' ? 'Image carousel' : '图片轮播'}
        >
          {items.map((card, index) => {
            const fit = card.fit ?? 'cover'
            const isContain = fit === 'contain'
            const objectPos = card.objectPosition ? { objectPosition: card.objectPosition } : undefined
            const imageAlt = card.title ?? (imageOnly ? (lang === 'en' ? 'Project visual' : '项目视觉') : card.id)
            const imageStyle: CSSProperties = {
              ...(objectPos ?? {}),
            }
            const cardClass = clsx(
              'relative shrink-0 snap-center bg-white flex items-center justify-center overflow-hidden',
              isContain ? 'shadow-sm' : null,
              cardWidthClass,
              imageHeightClass,
              roundedClass,
            )

            const content = (
              <>
                <div className={clsx('absolute inset-0', isContain ? 'px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12' : '')}>
                  <div className="relative h-full w-full">
                    <Image
                      src={card.img}
                      alt={imageAlt}
                      fill
                      priority={index === 0}
                      quality={isContain ? 95 : undefined}
                      sizes={sizesHint}
                      className={clsx(
                        isContain ? 'object-contain select-none' : 'object-cover select-none',
                      )}
                      style={imageStyle}
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-[inherit]" />
              </>
            )

            if (card.href) {
              return (
                <Link href={card.href} key={card.id} className="focus:outline-none block shrink-0">
                  <div
                    ref={(node) => {
                      cardRefs.current[index] = node
                    }}
                    className={cardClass}
                    style={maxVHStyle}
                  >
                    {content}
                  </div>
                </Link>
              )
            }

            return (
              <div
                key={card.id}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                className={clsx('shrink-0', cardClass)}
                style={maxVHStyle}
              >
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
