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
  /** 显示覆盖在视口右上的导航控件 */
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
  cardWidthClass = 'min-w-[88vw] sm:min-w-[70vw] lg:min-w-[820px] lg:max-w-[820px]',
  roundedClass = 'rounded-2xl',
  imageHeightClass = 'h-[560px] md:h-[640px] lg:h-[740px]',
  viewportContainMaxVH,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const max = scrollWidth - clientWidth - 2 // 容差
    setCanPrev(scrollLeft > 1)
    setCanNext(scrollLeft < max)
  }, [])

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = el.clientWidth * 0.98 * dir // 视口宽度
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    updateButtons()
  }, [items.length, updateButtons])

  const onScroll = useCallback(() => updateButtons(), [updateButtons])

  const overlay = controlsOverlay ? (
    <div className="pointer-events-none absolute right-3 top-3 z-10">
      <div className="flex gap-2 pointer-events-auto">
        <NavButton
          dir="prev"
          onClick={() => scrollByDir(-1)}
          disabled={!canPrev}
          ariaLabel={lang === 'en' ? 'Previous' : '上一张'}
        />
        <NavButton
          dir="next"
          onClick={() => scrollByDir(1)}
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

      {/* 视口容器（相对定位，用于放置右上角按钮） */}
      <div
        className={clsx(
          'relative w-full',
          imageHeightClass, // 固定高度视觉
        )}
        style={maxVHStyle}
      >
        {/* 固定在右上角的覆盖按钮（不随内容滚动） */}
        {overlay}

        {/* 横向滚动区域（内容滚动时按钮不动） */}
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
            const img = (
              <div
                key={card.id}
                className={clsx(
                  'relative shrink-0 snap-start bg-white',
                  cardWidthClass,
                  imageHeightClass,
                  roundedClass,
                )}
                style={maxVHStyle}
              >
                <Image
                  src={card.img}
                  alt={card.title ?? ''}
                  fill
                  priority={true}
                  sizes="(min-width:1024px) 820px, 88vw"
                  className={clsx(
                    fit === 'contain' ? 'object-contain' : 'object-cover',
                    roundedClass ? '' : '',
                    'select-none',
                  )}
                  style={objectPos}
                />
                {/* 内边框微弱描边 */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-[inherit]" />
              </div>
            )

            return card.href ? (
              <Link href={card.href} key={card.id} className="focus:outline-none">
                {img}
              </Link>
            ) : (
              img
            )
          })}
        </div>
      </div>
    </section>
  )
}
