// src/components/home/NewsSection.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ExternalLink } from 'lucide-react'
import type { VideoItem, NewsItem, WeChatPost, WeChatAccount } from '@/lib/types/news'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import NavButton from '@/components/common/NavButton'
import CardImage from '@/components/common/CardImage'
import clsx from 'clsx'

interface NewsSectionProps {
  langDefault: 'zh' | 'en'
  videos: VideoItem[]
  newsItems: NewsItem[]
  wechatPosts: WeChatPost[]
  wechatAccount: WeChatAccount
}

export default function NewsSection({
  langDefault = 'zh',
  videos = [],
  newsItems = [],
  wechatPosts = [],
  wechatAccount,
}: NewsSectionProps) {
  const language = langDefault

  const t = {
    zh: {
      newsTitle: '新闻资讯',
      videoSection: '视频专区',
      mediaSection: '媒体报道',
      wechatSection: '微信公众号',
      standardVideos: '标准视频',
      interviewVideos: '发现美好访谈',
      viewMore: '查看更多',
      watchVideo: '观看视频',
      readArticle: '阅读文章',
      visitSource: '访问原文',
      officialAccount: '官方账号',
      scanToFollow: '扫码关注',
    },
    en: {
      newsTitle: 'News & Updates',
      videoSection: 'Video Center',
      // 这块按你的要求写成“Media Report”并加粗显示
      mediaSection: 'Media Report',
      wechatSection: 'WeChat Official',
      standardVideos: 'Standard Videos',
      interviewVideos: 'Discovering Beauty Interviews',
      viewMore: 'View More',
      watchVideo: 'Watch Video',
      readArticle: 'Read Article',
      visitSource: 'Visit Source',
      officialAccount: 'Official Account',
      scanToFollow: 'Scan to follow',
    },
  }
  const content = t[language]

  // —— 媒体报道小卡数据（用 CardImage） —— //
  const mediaCards = useMemo(
    () =>
      newsItems.slice(0, 12).map((n) => ({
        id: n.id,
        title: n.title[language],
        href: n.link,
        img: typeof n.image === 'string' ? n.image : n.image.src,
        date: n.date,
        source: n.source,
        desc: n.description?.[language],
      })),
    [newsItems, language]
  )

  // 横向滚动控制（按钮与标题同行、对齐）
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
  }, [mediaCards.length, updateButtons])

  return (
    <div className="w-full max-w-md space-y-8">
      {/* 主区块标题（保持不变） */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">{content.newsTitle}</h2>
        <div className="w-16 h-0.5 bg-green-400 mx-auto" />
      </motion.div>

      {/* 视频专区（保持不变） */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-green-400" />
          {content.videoSection}
        </h3>

        <div className="space-y-4">
          {videos.slice(0, 2).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="group relative"
            >
              <div className="flex gap-3">
                <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                  <Image
                    src={video.thumbnail}
                    alt={video.title[language]}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-green-300 transition-colors">
                    {video.title[language]}
                  </h4>
                  {video.description ? (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      {video.description[language]}
                    </p>
                  ) : null}
                  <span className="text-xs text-green-400 mt-1 block">
                    {video.type === 'interview' ? content.interviewVideos : content.standardVideos}
                    {video.duration ? ` • ${video.duration}` : ''}
                  </span>
                </div>
              </div>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={content.watchVideo}
              />
            </motion.div>
          ))}
        </div>

        <Link
          href="/videos"
          className="block text-center text-sm text-green-400 hover:text-green-300 mt-4 transition-colors"
        >
          {content.viewMore} →
        </Link>
      </motion.div>

      {/* 媒体报道：大号粗体标题 + 右上 NavButton（与标题同一行对齐） + 小卡横向滚动（CardImage、完整展示） */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        {/* ✅ 粗体大标题，和右上按钮对齐（不覆盖在图片上） */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <ExternalLink className="w-6 h-6 text-green-400" />
            {language === 'en' ? 'Media Report' : content.mediaSection}
          </h3>
          <div className="flex gap-2">
            <NavButton
              dir="prev"
              onClick={() => scrollByDir(-1)}
              ariaLabel={language === 'en' ? 'Previous' : '上一组'}
              disabled={!canPrev}
            />
            <NavButton
              dir="next"
              onClick={() => scrollByDir(1)}
              ariaLabel={language === 'en' ? 'Next' : '下一组'}
              disabled={!canNext}
            />
          </div>
        </div>

        {/* ✅ 小卡横向滚动：卡片之间加更大间距，图片用 contain 完整展示，白底 + 细描边 */}
        {mediaCards.length > 0 ? (
          <div
            ref={scrollerRef}
            onScroll={updateButtons}
            className={clsx(
              'w-full overflow-x-auto overflow-y-hidden',
              'flex gap-6 scroll-smooth snap-x snap-mandatory',
              '[-ms-overflow-style:none] [scrollbar-width:none]',
              '[&::-webkit-scrollbar]:hidden',
              'px-1 pb-1' // 给容器留一点内边距，避免贴边
            )}
            aria-label={language === 'en' ? 'Media report carousel' : '媒体报道横向滚动'}
          >
            {mediaCards.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'group shrink-0 snap-start focus:outline-none',
                  // 小卡尺寸（新闻用），不要影响首页 model projects 的大图
                  'min-w-[68vw] sm:min-w-[52vw] md:min-w-[380px] lg:min-w-[360px] lg:max-w-[360px]'
                )}
                aria-label={item.title}
              >
                <CardImage
                  src={item.img}
                  alt={item.title}
                  ratio="16/9"
                  fit="contain"               // 完整展示
                  roundedClassName="rounded-xl"
                  sizes="(min-width:1024px) 360px, (min-width:768px) 380px, (min-width:640px) 52vw, 68vw"
                  priority={false}
                  loading="lazy"
                  fetchPriority="low"
                  bgClassName="bg-white"      // 白底衬托
                  showRing
                />
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-green-300 transition-colors">
                    {item.title}
                  </h4>
                  <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                    <span>{new Date(item.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}</span>
                    <span className="opacity-60">·</span>
                    <span className="truncate">{item.source}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {/* 文本列表保留（不改） */}
        <div className="space-y-4 mt-4">
          {newsItems.slice(0, 10).map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.06 }}
              className="group relative"
            >
              <div className="p-3 rounded-lg border border-white/10 hover:border-green-400/30 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-green-300 transition-colors flex-1">
                    {news.title[language]}
                  </h4>
                  <span className="text-xs text-gray-500 shrink-0">
                    {new Date(news.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}
                  </span>
                </div>
                {news.description ? (
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{news.description[language]}</p>
                ) : null}
                <div className="mt-2 text-xs text-gray-500">{news.source}</div>
              </div>
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={content.visitSource}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 微信区（保持不变） */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4">{content.wechatSection}</h3>

        <div className="flex items-center gap-4">
          <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-white/10 bg-white">
            <Image
              src={wechatAccount.qr}
              alt={content.scanToFollow}
              fill
              sizes="112px"
              className="object-contain p-2"
              priority={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium">
              {content.officialAccount} · {wechatAccount.name[language]}
            </div>
            {wechatAccount.intro ? (
              <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                {wechatAccount.intro[language]}
              </p>
            ) : null}
          </div>
        </div>

        {wechatPosts?.length ? (
          <>
            <div className="h-4" />
            <div className="space-y-3">
              {wechatPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="group relative">
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                      <Image
                        src={post.thumbnail}
                        alt={post.title[language]}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-green-300 transition-colors">
                        {post.title[language]}
                      </h4>
                      {post.description ? (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {post.description[language]}
                        </p>
                      ) : null}
                      <span className="text-xs text-gray-500 mt-1 block">{post.date}</span>
                    </div>
                  </div>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                    aria-label={post.title[language]}
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </motion.div>
    </div>
  )
}
