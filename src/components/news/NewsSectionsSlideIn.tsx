// components/news/NewsSectionsSlideIn.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import MediaCarousel, { type MediaCard } from './MediaCarousel'

export type VideoSource = { src: string; type: string }

export type NewsItem = {
  id: string | number
  title: string
  desc: string
  date?: string
  img: string | StaticImageData
  href?: string
  tag?: string
  imageFit?: 'cover' | 'contain'
  ctaLabel?: string
  /** 可选：在同一版面展示多张图片 */
  gallery?: Array<string | StaticImageData>
  /** 可选：提供即渲染“视频卡片”，版式与图片一致，点击播放 Lightbox */
  video?: {
    title?: string
    poster?: string | StaticImageData
    sources: VideoSource[] // 至少 1 个，如 {src:'/video/home-hero.mp4', type:'video/mp4'}
  }
}

export type NewsGroup = {
  heading: string
  items: NewsItem[]
  carouselItems?: MediaCard[]
  carouselTitle?: string
}

export default function NewsSectionsSlideIn({
  lang = 'zh',
  anchorId = 'news',
  groups,
  showMetaLabel = true,
}: {
  lang?: 'zh' | 'en'
  anchorId?: string
  groups: NewsGroup[]
  showMetaLabel?: boolean
}) {
  const [openVideo, setOpenVideo] = useState<NewsItem | null>(null)

  return (
    <section id={anchorId} className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 space-y-20 lg:space-y-28">
        {groups.map((group, gi) => (
          <motion.div
            key={`${group.heading}-${gi}`}
            initial={{ opacity: 0, x: 96 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Section heading */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                {group.heading}
              </h2>
            </div>

            {/* Items */}
            <div className="space-y-16">
              {group.items.map((it, idx) => {
                const isVideo = !!it.video && it.video.sources?.length > 0
                const poster = it.video?.poster || it.img
                const gallery = it.gallery?.length ? it.gallery : undefined
                const imageFit = it.imageFit || (it.video ? 'cover' : 'cover')
                const meta =
                  it.tag ??
                  (isVideo
                    ? lang === 'en'
                      ? 'Video'
                      : '视频'
                    : it.date ?? (lang === 'en' ? 'Update' : '动态'))

                return (
                  <motion.article
                    key={it.id}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.03 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                  >
                    {/* Left: text */}
                    <div className="order-1">
                      {showMetaLabel && (
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-sm text-[#76B900] font-semibold tracking-wider uppercase">
                            {meta}
                          </div>
                        </div>
                      )}
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                        {it.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{it.desc}</p>

                      {/* 普通新闻可继续显示“查看详情”链接；视频卡片不跳转，仅弹窗播放 */}
                      {!isVideo && it.href && (
                        <Link
                          href={it.href}
                          className="inline-flex items-center gap-2 text-[#2b7a00] font-semibold hover:underline"
                          aria-label={(lang === 'en' ? 'Read more: ' : '查看详情：') + it.title}
                        >
                          {it.ctaLabel ?? (lang === 'en' ? 'Read more' : '查看详情')}
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>

                    {/* Right: media card（图片或视频海报） */}
                    <div className="order-2">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        {gallery ? (
                          <div className="grid h-full w-full grid-cols-1 gap-3 p-3 sm:grid-cols-2">
                            {gallery.map((src, galleryIdx) => (
                              <div
                                key={`${it.id}-gallery-${galleryIdx}`}
                                className="relative min-h-[160px] w-full overflow-hidden rounded-xl bg-white/70 sm:min-h-0"
                              >
                                <Image
                                  src={src}
                                  alt={`${it.title} ${galleryIdx + 1}`}
                                  fill
                                  sizes="(min-width: 1024px) 260px, 50vw"
                                  className="object-cover"
                                  priority={idx < 2 && galleryIdx === 0}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Image
                            src={poster}
                            alt={it.title}
                            fill
                            sizes="(min-width: 1024px) 560px, 100vw"
                            className={imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'}
                            priority={idx < 2}
                          />
                        )}
                        {/* Brand accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#76B900] to-transparent" />

                        {/* ▶︎ 视频角标 + 播放按钮（仅视频） */}
                        {isVideo && (
                          <>
                            {/* 右上角小角标 */}
                            <div className="absolute top-2 right-2 rounded bg-black/70 text-white text-xs font-semibold px-2 py-1 select-none">
                              ▶︎ {lang === 'en' ? 'Video' : '视频'}
                            </div>
                            {/* 中央播放按钮 */}
                            <button
                              type="button"
                              onClick={() => setOpenVideo(it)}
                              className="group absolute inset-0 grid place-items-center focus:outline-none"
                              aria-label={lang === 'en' ? 'Play video' : '播放视频'}
                            >
                              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 group-hover:bg-white text-black shadow-md transition">
                                {/* triangle */}
                                <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
                                  <path d="M8 5v14l11-7z" fill="currentColor" />
                                </svg>
                              </span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>

            {group.carouselItems?.length ? (
              <MediaCarousel
                title={group.carouselTitle || (lang === 'en' ? 'Project Gallery' : '项目影像')}
                items={group.carouselItems}
                lang={lang}
              />
            ) : null}
          </motion.div>
        ))}
      </div>

      {/* 内置 Lightbox：仅当选择了视频项时出现 */}
      {openVideo && (
        <VideoLightbox
          lang={lang}
          title={openVideo.video?.title || openVideo.title}
          poster={openVideo.video?.poster || openVideo.img}
          sources={openVideo.video!.sources}
          onClose={() => setOpenVideo(null)}
        />
      )}
    </section>
  )
}

/* ─────────────────────────────
   内置轻量 Video Lightbox（无自动播放、可键盘操作、Esc 关闭）
   ───────────────────────────── */
function VideoLightbox({
  lang,
  title,
  poster,
  sources,
  onClose,
}: {
  lang: 'zh' | 'en'
  title: string
  poster: string
  sources: VideoSource[]
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    // 初始聚焦到关闭按钮
    setTimeout(() => closeRef.current?.focus(), 0)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-black rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-white font-semibold">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white"
            aria-label={lang === 'en' ? 'Close' : '关闭'}
          >
            ×
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
            <video
              controls
              playsInline
              preload="none"
              poster={poster}
              className="h-full w-full object-contain bg-black"
            >
              {sources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
              {lang === 'en'
                ? "Sorry, your browser doesn't support HTML5 video."
                : '抱歉，您的浏览器不支持 HTML5 视频。'}
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}
