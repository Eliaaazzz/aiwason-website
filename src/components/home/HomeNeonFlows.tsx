// components/home/HomeNeonFlows.tsx
'use client'

import { motion } from 'framer-motion'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

type Props = {
  lang?: 'zh' | 'en'
  imageSrc: string | StaticImageData
  titleLines: string[]
  description: string
  cta?: { href: string; label: string }
  currentSlide: number
  totalSlides: number
  progressMs: number
  onSelectSlide?: (i: number) => void
  /** ✅ unified prop name */
  bgImage?: string
}

export default function HomeNeonFlows({
  lang = 'zh',
  imageSrc,
  titleLines,
  description,
  cta,
  currentSlide,
  totalSlides,
  progressMs,
  onSelectSlide,
  bgImage,
}: Props) {
  return (
    <section className="relative text-white overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="hero background"
            fill
            priority={currentSlide === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}

     
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-3">
              {titleLines.map((ln, i) => (
                <div key={i} className="text-4xl md:text-6xl xl:text-7xl font-extrabold leading-[1.08]">
                  {ln}
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-white/85 text-base md:text-lg">{description}</p>

            {cta && (
              <div className="mt-8">
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-3 bg-[#76B900] text-black font-bold px-6 py-3 rounded-lg hover:brightness-110 transition"
                >
                  {cta.label}
                </Link>
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="relative ml-auto w-full max-w-[760px] h-[260px] sm:h-[360px] lg:h-[480px]">
              <Image
                src={imageSrc}
                alt={lang === 'en' ? 'Company Visual' : '公司展示'}
                fill
                priority={currentSlide === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4">
          {Array.from({ length: totalSlides }).map((_, i) => {
            const active = i === currentSlide
            return (
              <button
                key={i}
                onClick={() => onSelectSlide?.(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-4 w-4"
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all ${active ? 'bg-[#76B900]' : 'bg-white/25'}`}
                />
              </button>
            )
          })}
          <div className="ml-4 h-[3px] w-40 bg-white/20 overflow-hidden rounded">
            <motion.div
              className="h-full bg-[#76B900]"
              key={currentSlide}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: progressMs / 1000, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}