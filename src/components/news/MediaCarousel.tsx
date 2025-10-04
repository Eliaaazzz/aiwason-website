// src/components/news/MediaCarousel.tsx
'use client'

import Link from 'next/link'
import Image, { type StaticImageData } from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

  const prev = useCallback(() => scrollByDir(-1), [scrollByDir])
  const next = useCallback(() => scrollByDir(1), [scrollByDir])

  useEffect(() => {
    updateButtons()
  }, [items.length, updateButtons])

  const onScroll = useCallback(() => updateButtons(), [updateButtons])

  // 每次状态变化时，把控制权暴露给外部（新闻区的 Header 按钮使用）
  useEffect(() => {
    expose?.({ prev, next, canPrev, canNext })
  }, [expose, prev, next, canPrev, canNext])

  const sizesHint = useMemo(() => sizesFromWidthClass(cardWidthClass), [cardWidthClass])

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
          onScroll={onScroll}
          className={clsx(
            'h-full w-full overflow-x-auto overflow-y-hidden',
            'flex gap-4 scroll-smooth snap-x snap-mandatory',
            '[-ms-overflow-style:none] [scrollbar-width:none]',
            '[&::-webkit-scrollbar]:hidden',
          )}
          aria-label={lang === 'en' ? 'Image carousel' : '图片轮播'}
        >
          {items.map((card) => {
            const fit = card.fit ?? 'cover'
            const objectPos = card.objectPosition ? { objectPosition: card.objectPosition } : undefined
            const cardNode = (
              <div
                key={card.id}
                className={clsx('relative shrink-0 snap-start bg-white', cardWidthClass, imageHeightClass, roundedClass)}
                style={maxVHStyle}
              >
                <Image
                  src={card.img}
                  alt={card.title ?? ''}
                  fill
                  priority={true}
                  sizes={sizesHint}
                  className={clsx(fit === 'contain' ? 'object-contain' : 'object-cover', 'select-none')}
                  style={objectPos}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-[inherit]" />
              </div>
            )
            return card.href ? (
              <Link href={card.href} key={card.id} className="focus:outline-none">
                {cardNode}
              </Link>
            ) : (
              cardNode
            )
          })}
        </div>
      </div>
    </section>
  )
}
