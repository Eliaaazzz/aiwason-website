'use client'

import { motion } from 'framer-motion'
import Image, { type StaticImageData } from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Globe } from 'lucide-react'

// Static imports (Next knows width/height automatically)
import dc500Image from '@/assets/images/dc-500.png'
import cb300Image from '@/assets/images/cb-300.png'
import ib400Image from '@/assets/images/ib-400.png'
import fr200Image from '@/assets/images/fr-200.png'


type Lang = 'en' | 'zh'

interface ProductItem {
  id: string
  title: string
  desc: string
  img: StaticImageData
}

interface Props {
  lang?: Lang
}

/** Image helper with graceful fallback (keeps intrinsic sizing from static import). */
function SafeImage({
  src,
  alt,
  priority,
  className,
  sizes = '(min-width:1024px) 580px, 94vw',
}: {
  src: StaticImageData
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
}) {
  const [errored, setErrored] = useState(false)
  return (
    <Image
      src={errored ? fallbackImg : src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      quality={90}
      className={className ?? 'object-contain max-w-full h-auto'}
      onError={() => setErrored(true)}
    />
  )
}

export default function ProductsCenter({ lang = 'en' }: Props) {
  const router = useRouter()
  const sp = useSearchParams()
  const pathname = usePathname()

  const urlLang = (sp.get('lang') as Lang) || lang || 'en'
  const [curLang, setCurLang] = useState<Lang>(urlLang)
  const isEN = curLang === 'en'

  const toggleLang = () => {
    const next: Lang = curLang === 'en' ? 'zh' : 'en'
    setCurLang(next)
    const params = new URLSearchParams(sp.toString())
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const products: ProductItem[] = useMemo(
    () => [
      {
        id: 'dc-5000',
        title: isEN ? 'DC-5000 Data Center Busbar' : 'DC-5000 数据中心母线',
        desc: isEN
          ? 'High-capacity busbar designed for hyperscale and colocation data centers.'
          : '专为超大规模与托管数据中心设计的高容量母线。',
        img: dc500Image,
      },
      {
        id: 'cb-3000',
        title: isEN ? 'CB-3000 Commercial Intelligent Busbar' : 'CB-3000 商用智能母线',
        desc: isEN
          ? 'Smart and efficient busbar solution for commercial towers and office complexes.'
          : '面向商业大楼与办公综合体的智能高效母线方案。',
        img: cb300Image,
      },
      {
        id: 'ib-4000',
        title: isEN ? 'IB-4000 Industrial Intelligent Busbar' : 'IB-4000 工业智能母线',
        desc: isEN
          ? 'Reliable industrial-grade busbar for mission-critical manufacturing facilities.'
          : '服务关键制造设施的可靠工业级母线。',
        img: ib400Image,
      },
      {
        id: 'fr-2000',
        title: isEN ? 'FR-2000 Fire-Resistant Busbar' : 'FR-2000 耐火型母线系统',
        desc: isEN
          ? 'Two-hour fire-resistant busbar system ensuring safety and uninterrupted power delivery.'
          : '两小时耐火等级，保障安全与持续供电。',
        img: fr200Image,
      },
    ],
    [isEN]
  )

  // Scrollspy highlight
  const [activeId, setActiveId] = useState<string>(products[0]?.id || 'dc-5000')
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
  }, [curLang])

  const onJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        <button
          onClick={toggleLang}
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-[#76B900]/30 rounded-lg px-4 py-2 transition-all duration-300"
          aria-label="Toggle language"
          title={isEN ? '切换到中文' : 'Switch to English'}
        >
          <Globe className="w-4 h-4 text-[#76B900]" />
          <span className="text-sm font-semibold text-gray-800">
            {isEN ? '中文' : 'EN'}
          </span>
        </button>
      </section>

      {/* Content + sticky TOC (news-like white cards with green borders) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Product rows */}
          <div className="lg:col-span-9">
            <div className="space-y-24 lg:space-y-28">
              {products.map((p, i) => {
                const fromRight = i % 2 === 0 // odd rows: slide from right; even rows: from left
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
                    {/* Text */}
                    <div className={fromRight ? '' : 'lg:order-2'}>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                        {p.title}
                      </h2>
                      <p className="text-gray-700 text-lg">{p.desc}</p>
                    </div>

                    {/* Image in a white card with green border (matches News cards) */}
                    <div className={fromRight ? '' : 'lg:order-1'}>
                      <div className="rounded-2xl border border-[#76B900]/25 bg-white p-2 shadow-sm transition-shadow hover:shadow-[0_10px_24px_rgba(118,185,0,0.12)]">
                        <SafeImage
                          src={p.img}
                          alt={p.title}
                          priority={i === 0}
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  </motion.section>
                )
              })}
            </div>
          </div>

          {/* Sticky quick nav (white panel with green border) */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28">
              <nav
                aria-label={isEN ? 'Product quick navigation' : '产品快速导航'}
                className="rounded-2xl bg-white border border-[#76B900]/30 shadow-sm"
              >
                <div className="px-5 py-4 border-b border-[#76B900]/20">
                  <div className="text-sm font-semibold text-gray-800">
                    {isEN ? 'Quick Nav' : '快速导航'}
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
                              : 'text-gray-700 hover:bg-gray-50 border border-transparent',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'inline-block h-2.5 w-2.5 rounded-full',
                              active ? 'bg-[#76B900]' : 'bg-gray-300',
                            ].join(' ')}
                          />
                          <span className="text-sm font-medium">{p.title}</span>
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
