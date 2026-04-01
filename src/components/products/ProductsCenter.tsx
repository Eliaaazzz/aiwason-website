// src/components/products/ProductsCenter.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { MouseEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'

// Correctly import the new data, types, and helper function
import { PRODUCT_CATEGORIES, t, type Lang } from '@/data/productsContent'

type ProductsCenterProps = {
  defaultLang?: Lang
}

export default function ProductsCenter({ defaultLang = 'en' }: ProductsCenterProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [curLang, setCurLang] = useState<Lang>(defaultLang)
  const syncLanguageFromUrl = useCallback(() => {
    if (typeof window === 'undefined') return
    const param = new URLSearchParams(window.location.search).get('lang')
    if (param === 'zh' || param === 'en') {
      setCurLang(param)
    } else {
      setCurLang(defaultLang)
    }
  }, [defaultLang])

  useEffect(() => {
    syncLanguageFromUrl()
    if (typeof window === 'undefined') return
    window.addEventListener('popstate', syncLanguageFromUrl)
    return () => window.removeEventListener('popstate', syncLanguageFromUrl)
  }, [syncLanguageFromUrl])
  const isEN = curLang === 'en'

  const toggleLang = () => {
    const next: Lang = isEN ? 'zh' : 'en'
    setCurLang(next)
    const params = new URLSearchParams(window.location.search)
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const categories = useMemo(() => PRODUCT_CATEGORIES, [])
  const sectionOrder = useMemo(() => {
    const order: string[] = []
    categories.forEach((category) => {
      category.products.forEach((product) => {
        order.push(`${category.id}-${product.id}`)
      })
    })
    return order
  }, [categories])
  const sectionIndex = useMemo(() => {
    return sectionOrder.reduce<Record<string, number>>((acc, id, idx) => {
      acc[id] = idx
      return acc
    }, {})
  }, [sectionOrder])

  const [activeId, setActiveId] = useState<string>(sectionOrder[0] ?? '')
  useEffect(() => {
    if (!sectionOrder.length) return
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-prod-id]')
    )
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (!visible.length) return
        const id = visible[0].target.getAttribute('data-prod-id')
        if (id) setActiveId(id)
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0.1, 0.25, 0.5] }
    )
    sections.forEach((el) => io.observe(el))
    return () => {
      sections.forEach((el) => io.unobserve(el))
      io.disconnect()
    }
  }, [sectionOrder])

  useEffect(() => {
    if (sectionOrder.length) {
      setActiveId(sectionOrder[0])
    }
  }, [sectionOrder])

  const onJump = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const offset = 96 // keep section clear of sticky header / nav
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveId(id)
  }

  return (
    <main id="main-content" className="bg-white text-black">
      {/* Header + language toggle */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            {isEN ? 'Products Center' : '产品中心'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEN
              ? 'Fire-resistant busbar portfolio for data centers, urban complexes, and mission-critical facilities.'
              : '面向数据中心、城市综合体与关键设施的耐火智能母线产品矩阵。'}
          </p>
        </div>

        <button
          onClick={toggleLang}
          className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-[#76B900]/30 hover:border-[#76B900]/60 rounded-lg px-4 py-2 transition-all duration-300"
          aria-label="Toggle language"
          title={isEN ? '切换到中文' : 'Switch to English'}
        >
          <Globe className="w-4 h-4 text-[#4a7400]" />
          <span className="text-sm font-semibold">{isEN ? '中文' : 'EN'}</span>
        </button>
      </section>

      {/* Content + sticky quick nav */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left column: product rows */}
          <div className="lg:col-span-9">
            <div className="space-y-24 lg:space-y-28">
              {categories.map((category) => {
                const categoryHeaderClasses = [
                  'rounded-3xl border p-6 lg:p-8 shadow-sm',
                  category.highlight ? 'bg-[#0e2209] text-white border-[#76B900]/50 shadow-xl' : 'bg-[#f6fbef] text-gray-900 border-[#76B900]/20',
                ].join(' ')
                const categoryDescriptionClasses = category.highlight ? 'text-white/80' : 'text-gray-600'

                return (
                  <div key={category.id} className="space-y-10">
                    <header className={categoryHeaderClasses}>
                      <div className="text-sm font-semibold tracking-[0.3em] uppercase text-[#9BE15D]">
                        {category.highlight
                          ? t({ en: 'Core Line', zh: '核心产品线' }, curLang)
                          : t({ en: 'Extended Line', zh: '扩展产品线' }, curLang)}
                      </div>
                      <h2 className={`mt-3 text-2xl md:text-3xl font-bold ${category.highlight ? 'text-white' : 'text-gray-900'}`}>
                        {t(category.title, curLang)}
                      </h2>
                      <p className={`mt-3 text-base md:text-lg leading-relaxed ${categoryDescriptionClasses}`}>
                        {t(category.description, curLang)}
                      </p>
                    </header>

                    <div className="space-y-16 lg:space-y-20">
                      {category.products.map((product, idx) => {
                        const sectionId = `${category.id}-${product.id}`
                        const orderIndex = sectionIndex[sectionId] ?? 0
                        const fromRight = orderIndex % 2 === 0
                        const shouldAnimate = orderIndex !== 0
                        const isHero = category.highlight && idx === 0
                        const panelClasses = [
                          'grid grid-cols-1 lg:grid-cols-2 items-center gap-10',
                          isHero
                            ? 'rounded-3xl border border-[#76B900]/40 bg-[#0d1f07] text-white p-8 lg:p-12 shadow-xl'
                            : 'rounded-3xl border border-[#76B900]/15 bg-white p-6 lg:p-8 shadow-sm',
                        ].join(' ')
                        const textColumnClasses = [
                          fromRight ? '' : 'lg:order-2',
                          'flex flex-col gap-4',
                        ]
                          .filter(Boolean)
                          .join(' ')
                        const titleClasses = [
                          'text-3xl lg:text-4xl font-bold',
                          isHero ? 'text-white' : 'text-gray-900',
                        ].join(' ')
                        const paragraphClasses = [
                          isHero ? 'text-white/80' : 'text-gray-700',
                          'text-lg leading-relaxed',
                        ].join(' ')
                        const badgeClasses = isHero
                          ? 'inline-flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c9ff7a]'
                          : 'inline-flex items-center gap-2 self-start rounded-full border border-[#76B900]/30 bg-[#f0f9e8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2d4a0e]'
                        const imageColumnClasses = [
                          fromRight ? '' : 'lg:order-1',
                          'w-full',
                        ]
                          .filter(Boolean)
                          .join(' ')
                        const frameClasses = [
                          isHero
                            ? 'rounded-2xl border border-white/20 bg-black/10 overflow-hidden shadow-lg'
                            : 'rounded-2xl border border-[#76B900]/20 bg-white p-2 shadow-sm',
                          'transition-transform duration-300 hover:scale-[1.02]',
                        ].join(' ')
                        const imageClasses = [
                          'w-full',
                          isHero ? 'h-full object-cover rounded-2xl' : 'h-auto object-contain rounded-xl',
                        ].join(' ')

                        return (
                          <motion.section
                            key={sectionId}
                            id={sectionId}
                            data-prod-id={sectionId}
                            className="scroll-mt-28"
                            initial={shouldAnimate ? { opacity: 0, x: fromRight ? 140 : -140 } : undefined}
                            whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.75, ease: 'easeOut' }}
                          >
                            <div className={panelClasses}>
                              <div className={textColumnClasses}>
                                {product.badge ? <span className={badgeClasses}>{t(product.badge, curLang)}</span> : null}
                                <h3 className={titleClasses}>{t(product.title, curLang)}</h3>
                                <p className={paragraphClasses}>{t(product.description, curLang)}</p>
                              </div>
                              <div className={imageColumnClasses}>
                                <div className={frameClasses}>
                                  <Image
                                    src={product.src}
                                    alt={t(product.altText, curLang)}
                                    priority={orderIndex <= 1}
                                    sizes="(min-width: 1280px) 600px, (min-width: 768px) 60vw, 100vw"
                                    className={imageClasses}
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.section>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right column: sticky quick nav */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28">
              <nav
                aria-label={t({ en: 'Product quick navigation', zh: '产品快速导航' }, curLang)}
                className="rounded-2xl bg-white/80 backdrop-blur border border-[#76B900]/30 shadow-sm"
              >
                <div className="px-5 py-4 border-b border-[#76B900]/20">
                  <div className="text-sm font-semibold text-gray-800">
                    {t({ en: 'Quick Nav', zh: '快速导航' }, curLang)}
                  </div>
                </div>

                <ul className="p-3 space-y-4">
                  {categories.map((category) => (
                    <li key={category.id} className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                        {t(category.title, curLang)}
                      </div>
                      <ul className="space-y-1">
                        {category.products.map((product) => {
                          const sectionId = `${category.id}-${product.id}`
                          const active = activeId === sectionId
                          return (
                            <li key={sectionId}>
                              <a
                                href={`#${sectionId}`}
                                onClick={onJump(sectionId)}
                                className={[
                                  'flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm font-medium',
                                  active
                                    ? 'bg-[#76B900]/10 text-gray-900 border border-[#76B900]/40'
                                    : 'text-gray-700 hover:bg-gray-50',
                                ].join(' ')}
                              >
                                <span
                                  className={[
                                    'inline-block h-2.5 w-2.5 rounded-full',
                                    active ? 'bg-[#76B900]' : 'bg-gray-300',
                                  ].join(' ')}
                                />
                                <span>{t(product.title, curLang)}</span>
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
