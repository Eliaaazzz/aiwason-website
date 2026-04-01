// src/components/common/CardImage.tsx
'use client'

import Image, { type StaticImageData, type ImageProps } from 'next/image'
import clsx from 'clsx'
import type { CSSProperties } from 'react'

type Props = {
  /** Public path ("/res/xxx.jpg") or imported StaticImageData */
  src: string | StaticImageData
  /** Accessible alt; use "" only if decorative */
  alt?: string
  /** Aspect ratio for the box, e.g. "16/9". */
  ratio?: `${number}/${number}` | null
  /** Fallback fixed height used when ratio is not provided. */
  height?: number | string
  /** Object fit for the image content */
  fit?: 'cover' | 'contain'
  /** Tailwind rounding class, defaults to rounded-2xl */
  roundedClassName?: string
  /** Extra classes on the wrapper */
  className?: string
  /** Passed to next/image */
  priority?: boolean
  /** Explicit loading hint */
  loading?: ImageProps['loading']
  /** Fetch priority for critical art */
  fetchPriority?: ImageProps['fetchPriority']
  /** Responsive sizes hint */
  sizes?: string
  /** Optional background helper when using contain mode */
  bgClassName?: string
  /** Toggle inner ring accent */
  showRing?: boolean
}

export default function CardImage({
  src,
  alt = '',
  ratio = '4/3',
  height,
  fit = 'cover',
  roundedClassName = 'rounded-2xl',
  className,
  priority = false,
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '(min-width:1024px) 33vw, 100vw',
  bgClassName = 'bg-transparent',
  showRing = true,
}: Props) {
  const style: CSSProperties = ratio
    ? { aspectRatio: ratio }
    : { height: typeof height === 'number' ? `${height}px` : height ?? '280px' }

  return (
    <div
      className={clsx(
        'relative w-full overflow-hidden',
        roundedClassName,
        bgClassName,
        className,
      )}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        fetchPriority={fetchPriority}
        sizes={sizes}
        className={clsx(fit === 'contain' ? 'object-contain' : 'object-cover', 'select-none')}
      />
      {showRing && <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />}
    </div>
  )
}
