// src/components/products/ProductsCenter.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import LanguageSwitcher from '../common/LanguageSwitcher'
import type { Locale } from '@/lib/i18n'

// Correctly import the new data, types, and helper function
import {
  PRODUCTS_DATA,
  t,
  type Lang,
  type Product,
} from '@/data/productsContent'

export default function ProductsCenter({ lang = 'zh' as Lang }: { lang?: Locale }) {
  const curLang = lang as Lang
  const isEN = curLang === 'en'

  // Use the new constant name: PRODUCTS_DATA
  const products: readonly Product[] = useMemo(() => PRODUCTS_DATA, [])

  // Scroll-spy to highlight the right-side quick nav
  const [activeId, setActiveId] = useState<string>(products[0]?.id ?? '')
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-prod-id]')
    )
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-prod-id')
          if (entry.isIntersecting && id) setActiveId(id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 }
    )
    sections.forEach((el) => io.observe(el))
    return () => {
      sections.forEach((el) => io.unobserve(el))
      io.disconnect()
    }
  }, [products]) // Dependency on products array

  const onJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-white text-black">
      {/* Header + language toggle */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            {isEN ? 'Products Center' : '产品中心'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEN
              ? 'Brief introductions to our core product lines.'
              : '核心产品线的简要介绍。'}
          </p>
        </div>

        <LanguageSwitcher locale={curLang} />
      </section>

      {/* Content + sticky quick nav */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left column: product rows */}
          <div className="lg:col-span-9">
            <div className="space-y-24 lg:space-y-28">
              {products.map((p, i) => {
                const fromRight = i % 2 === 0
                return (
                  <motion.section
                    key={p.id}
                    id={p.id}
                    data-prod-id={p.id}
                    className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10"
                    initial={{ opacity: 0, x: fromRight ? 140 : -140 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                  >
                    {/* Text block */}
                    <div className={fromRight ? '' : 'lg:order-2'}>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        {/* Use the helper function `t` for cleaner code */}
                        {t(p.title, curLang)}
                      </h2>
                      <p className="text-gray-700 text-lg">
                        {/* Use the new property name: description */}
                        {t(p.description, curLang)}
                      </p>
                    </div>

                    {/* Image block */}
                    <div className={fromRight ? '' : 'lg:order-1'}>
                      <div className="rounded-2xl border border-[#76B900]/30 bg-white p-2 shadow-sm">
                        <Image
                          src={p.src}
                          alt={t(p.altText, curLang)}
                          priority={i === 0}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          placeholder="blur"
                          quality={75}
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  </motion.section>
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

                <ul className="p-2">
                  {products.map((p) => {
                    const active = activeId === p.id
                    return (
                      <li key={p.id}>
                        <a
                          href={`#${p.id}`}
                          onClick={onJump(p.id)}
                          className={[
                            'flex items-center gap-3 px-3 py-2 rounded-lg transition',
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
                          <span className="text-sm font-medium">{t(p.title, curLang)}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}