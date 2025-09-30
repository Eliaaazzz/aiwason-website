// src/components/home/NewsSection.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ExternalLink } from 'lucide-react'
import type {
  VideoItem,
  NewsItem,
  WeChatPost,
  WeChatAccount,
} from '@/lib/types/news'

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
      mediaSection: 'Media Coverage',
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

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
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

      {/* Video Section */}
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
              {/* 如果是外链视频，打开新标签；本地视频可改为路由或弹窗 */}
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

      {/* Media / News Section — 只展示前 10 条外链 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-green-400" />
          {content.mediaSection}
        </h3>

        <div className="space-y-4">
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
                    {new Date(news.date).toLocaleDateString(
                      language === 'en' ? 'en-US' : 'zh-CN',
                    )}
                  </span>
                </div>
                {news.description ? (
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                    {news.description[language]}
                  </p>
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

      {/* WeChat Section — 名称 + 二维码 + 可选图文 */}
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
            {/* 用户要求移除 Learn More 链接，保留纯静态信息展示 */}
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
