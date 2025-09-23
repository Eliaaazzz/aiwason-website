'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type NewsItem = {
  id: string | number
  title: string
  desc: string
  date?: string
  img: string
  href?: string
  tag?: string
}

export type NewsGroup = {
  heading: string
  items: NewsItem[]
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
  return (
    <section id={anchorId} className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 space-y-20 lg:space-y-28">
        {groups.map((group, gi) => (
          <motion.div
            key={`${group.heading}-${gi}`}
            // Entire section slides in from right when entering viewport
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

            {/* Items: left text / right image */}
            <div className="space-y-16">
              {group.items.map((it, idx) => (
                <motion.article
                  key={it.id}
                  // Subtle stagger per item for depth
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.03 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  {/* Left: text block */}
                  <div className="order-1">
                    {showMetaLabel && (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-sm text-[#76B900] font-semibold tracking-wider uppercase">
                          {it.tag ?? it.date ?? (lang === 'en' ? 'Update' : '动态')}
                        </div>
                      </div>
                    )}
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                      {it.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{it.desc}</p>
                    {it.href && (
                      <Link
                        href={it.href}
                        className="inline-flex items-center gap-2 text-[#2b7a00] font-semibold hover:underline"
                        aria-label={(lang === 'en' ? 'Read more: ' : '查看详情：') + it.title}
                      >
                        {lang === 'en' ? 'Read more' : '查看详情'}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>

                  {/* Right: image card */}
                  <div className="order-2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                      <Image
                        src={it.img}
                        alt={it.title}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover object-top"
                        priority={idx < 2}
                      />
                      {/* Brand accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#76B900] to-transparent" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
