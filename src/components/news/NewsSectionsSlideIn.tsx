'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { blurProps } from '@/lib/imageProps'

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
}: {
  lang?: 'zh' | 'en'
  anchorId?: string
  groups: NewsGroup[]
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
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-sm text-[#76B900] font-semibold tracking-wider uppercase">
                        {it.tag ?? it.date ?? (lang === 'en' ? 'Update' : '动态')}
                      </div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                      {it.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{it.desc}</p>
                    {it.href && (
                      <Link
                        href={it.href}
                        className="inline-flex items-center gap-2 text-[#2b7a00] font-semibold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76B900] rounded-sm"
                      >
                        <span aria-hidden="true">
                          {lang === 'en' ? 'Read more' : '查看详情'}
                        </span>
                        {/* Unique, accessible link name: visible text stays
                            short, but each link's textContent is unique per
                            target so SEO heuristics see descriptive text. */}
                        <span className="sr-only">
                          {(lang === 'en' ? 'Read more about ' : '查看详情：') + it.title}
                        </span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
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
                        quality={75}
                        className="object-cover"
                        priority={gi === 0 && idx === 0}
                        loading={gi === 0 && idx === 0 ? 'eager' : 'lazy'}
                        {...blurProps(it.img)}
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
