'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

type Props = {
  lang?: 'zh' | 'en'
  imageSrc: string
  titleLines: string[]
  description: string
  cta?: { href: string; label: string }
  currentSlide?: number
  totalSlides?: number
  /** duration of one slide in ms; used by the bottom progress */
  progressMs?: number
  /** click handler from parent to jump to a slide */
  onSelectSlide?: (index: number) => void
}

export default function HomeNeonFlows({
  lang = 'zh',
  imageSrc,
  titleLines,
  description,
  cta,
  currentSlide = 0,
  totalSlides = 5,
  progressMs = 6000,
  onSelectSlide,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-black min-h-[600px] lg:min-h-[720px]">
      {/* Soft background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
              >
                <div className="space-y-2 mb-6">
                  {titleLines.map((line, idx) => (
                    <motion.h1
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.45 }}
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.06]"
                    >
                      <span className="relative">
                        {line}
                        {idx === 0 && (
                          <motion.span
                            className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-[#76B900] to-transparent"
                            initial={{ width: 0 }}
                            animate={{ width: '56%' }}
                            transition={{ delay: 0.45, duration: 0.7 }}
                          />
                        )}
                      </span>
                    </motion.h1>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                  className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
                >
                  {description}
                </motion.p>

                {cta && (
                  <motion.a
                    href={cta.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.45 }}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-lg
                               bg-[#76B900] text-black font-semibold
                               shadow-[0_8px_24px_rgba(118,185,0,0.25)]
                               hover:shadow-[0_10px_28px_rgba(118,185,0,0.35)]
                               transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>{cta.label}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: enlarged image card */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={reduce ? {} : { y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-2xl
                         border border-white/10 bg-gray-900 lg:scale-[1.08]"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#76B900]/20 to-[#7CFFCB]/20 blur-2xl pointer-events-none" />
              <Image src={imageSrc} alt="Hero showcase" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#76B900] to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.9 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.45 }}
                className="absolute top-4 left-4 px-3 py-1 bg-black/55 backdrop-blur-sm rounded-full
                           border border-[#76B900]/30 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-[#76B900] rounded-full animate-pulse" />
                <span className="text-xs text-white/80 font-medium">
                  {lang === 'en' ? 'LIVE' : '实时'}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom clickable progress — only the active segment animates */}
      <div className="absolute bottom-4 left-0 right-0 z-40" role="tablist" aria-label={lang === 'en' ? 'Slides' : '幻灯导航'}>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => {
            const isActive = i === currentSlide
            const isPast = i < currentSlide
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={(lang === 'en' ? 'Go to slide ' : '跳到第') + (i + 1)}
                onClick={() => onSelectSlide?.(i)}
                className={`relative h-1.5 flex-1 rounded-full overflow-hidden bg-white/12 
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#76B900]
                            transition-[transform,box-shadow] ${isActive ? 'scale-y-110' : 'hover:scale-y-105'}`}
              >
                <div className="absolute inset-0 bg-white/10" />
                {isActive ? (
                  <motion.div
                    key={`active-${i}-${currentSlide}`}
                    className="absolute inset-y-0 left-0 bg-[#76B900]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: progressMs / 1000, ease: 'linear' }}
                  />
                ) : (
                  <div
                    className="absolute inset-y-0 left-0 bg-[#76B900]"
                    style={{ width: isPast ? '100%' : '0%' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
