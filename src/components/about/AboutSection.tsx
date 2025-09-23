'use client'

import Image from 'next/image'
import { Globe } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

type Lang = 'en' | 'zh'

const COPY = {
  en: {
    title: 'About Us',
    strap: 'Hard-tech power distribution for critical infrastructure worldwide.',
    paragraphs: [
      'Zhongshan AIWASON Electric Co., Ltd. stands on the west bank of Qianhai in the Guangdong–Hong Kong–Macao Greater Bay Area, at the gateway of the Shenzhen–Zhongshan Corridor. Guided by the belief that technology lights the future and diligence fulfils ambition, AIWASON has grown over fifteen years into a high-tech enterprise spanning high-temperature materials, optoelectronic intelligent busbars, and microgrid systems. Our solutions serve more than 1,200 customers across China and Europe and hold a leading position in the industry.',
      'We embrace openness, exploration, and resilience. AIWASON continues to expand R&D investment, attracting top-tier talent and establishing three research centres in China. With more than 200 patents and industry-leading invention counts, we pursue breakthroughs in foundational materials, optoelectronics, and intelligent microgrids, uniting hardware and software to release continuously evolving products.',
      '“Focus on customer pain points, deliver the best solutions, and serve wholeheartedly” is our enduring mission. Regardless of market shifts, we stay committed to deep technology—removing distractions and tackling challenges head-on—to provide the safest, greenest, and smartest system solutions. We strive to make safety rock solid, energy efficiency omnipresent, and intelligence within everyone’s reach.',
    ],
    stats: [
      { k: '15+', v: 'Years of deep-tech focus' },
      { k: '3', v: 'R&D centres nationwide' },
      { k: '200+', v: 'Patent achievements' },
      { k: '1,200+', v: 'Customers served' },
    ],
    showcase: {
      heading: 'Landmark Deployments',
      subheading: 'Selected large-scale projects that highlight AIWASON’s engineering excellence.',
    },
  },
  zh: {
    title: '关于我们',
    strap: '以硬核科技赋能关键基础设施。',
    paragraphs: [
      '中山艾默森电器有限公司坐落在美丽富饶的粤港澳大湾区核心商圈前海西岸，深中通道首站。“科技点亮光明，实干成就梦想”。艾默森秉承硬科技造福社会、赢得未来的经营理念。经过十五年的发展，已成为一家集耐高温新材料、光电智能母线、微电网系统为一体的高科技企业，产品服务遍及中国及欧洲多个国家地区，用户多达1200多个，在行业具有领先地位。',
      '艾默森长期坚持开放进取、勇于探索、自强不息、艰苦奋斗的精神，持续加强研发投入，布局顶尖优秀研发资源，在国内构建三大研发中心，专利成果二百多项，发明专利行业第一，在（基础科学）新材料、光电技术、智能微电网系统三大板块自主研发，精准突破，软硬互联，不断创新升级新产品。',
      '“聚焦客户痛点，为客户提供最优解决方案，全心全意为客户服务”是我们肩负的责任与使命。不管时代如何变迁，市场竞争如何激烈，艾默森始终专注于硬科技发展，排除一切诱惑及困难，为用户提供最安全、绿色智能的系统解决方案，让安全稳如磐石、让节能无处不在、让智能无所不及。',
    ],
    stats: [
      { k: '15+', v: '年深耕硬科技' },
      { k: '3', v: '大研发中心' },
      { k: '200+', v: '项专利' },
      { k: '1200+', v: '位合作客户' },
    ],
    showcase: {
      heading: '地标级项目',
      subheading: '甄选代表性高品质项目，呈现 AIWASON 的工程实力。',
    },
  },
} as const

const SHOWCASE_IMAGES = [
  { src: '/res/gallery-42.jpg', caption: { en: 'Shenzhen Global Smart Chip Center', zh: '深圳全球智能芯片中心' } },
  { src: '/res/gallery-44.jpg', caption: { en: 'Shenzhen Four Seasons Hotel', zh: '深圳四季酒店' } },
  { src: '/res/gallery-46.jpg', caption: { en: "Shenzhen Bao'an International Airport", zh: '深圳宝安国际机场' } },
  { src: '/res/gallery-57.jpg', caption: { en: 'Chongqing Raffles City', zh: '重庆来福士广场' } },
  { src: '/res/gallery-32.jpg', caption: { en: 'Guangzhou Next-gen InfoTech Park', zh: '广州新一代技术信息产业园' } },
  { src: '/res/gallery-33.jpg', caption: { en: 'Nighttime Campus Aerial', zh: '园区夜景鸟瞰图' } },
  { src: '/res/gallery-09.jpg', caption: { en: 'Shanghai IFC Complex', zh: '上海国金中心' } },
  { src: '/res/gallery-10.jpeg', caption: { en: 'Shanghai Hongqiao CBD D19', zh: '上海虹桥商务区 D19 项目' } },
  { src: '/res/gallery-56.png', caption: { en: 'Chongqing International Expo Center', zh: '重庆国际博览中心' } },
  { src: '/res/gallery-21.png', caption: { en: 'Qianhai International Conference Center', zh: '前海国际会议中心' } },
  { src: '/res/gallery-52.jpg', caption: { en: 'Fuzhou Strait Exhibition Center', zh: '福州海峡国际会展中心' } },
  { src: '/res/gallery-34.jpg', caption: { en: 'Cixi Cultural & Business Cluster', zh: '慈溪市文化商务区公建群' } },
  { src: '/res/gallery-43.jpg', caption: { en: 'Shenzhen Excellence Century Hotel', zh: '深圳卓越世纪酒店' } },
  { src: '/res/gallery-48.jpg', caption: { en: 'The St. Regis Shenzhen', zh: '深圳瑞吉酒店' } },
  { src: '/res/gallery-58.jpg', caption: { en: 'Gemdale Mega Center', zh: '金地大百汇' } },
  { src: '/res/gallery-60.jpg', caption: { en: 'Qingdao Metro Network', zh: '青岛地铁' } },
  { src: '/res/gallery-53.jpg', caption: { en: 'Midea Group Smart Campus', zh: '美的集团智慧园区' } },
  { src: '/res/gallery-25.jpg', caption: { en: 'Huawei Southern Factory', zh: '华为南方工厂' } },
] as const

export default function AboutSection() {
  const router = useRouter()
  const sp = useSearchParams()
  const pathname = usePathname()

  const lang: Lang = (sp.get('lang') as Lang) || 'en'
  const t = COPY[lang]

  // 1) duplicate list for seamless -50% translate
  const marqueeImages = useMemo(() => [...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES], [])

  // 2) measure visible cards
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    if (!trackRef.current) return
    const container = trackRef.current.parentElement
    if (!container) return

    const compute = () => {
      const w = container.clientWidth
      const gap = 24
      const card = w >= 1024 ? 320 : w >= 640 ? 288 : 256
      const perRow = Math.max(1, Math.ceil((w + gap) / (card + gap)))
      setVisibleCount(perRow)
    }

    compute()

    let ro: ResizeObserver | null = null
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(compute)
      ro.observe(container)
    } else {
      window.addEventListener('resize', compute)
    }
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  // 3) eager window = first loop + buffer
  const HALF = marqueeImages.length / 2
  const BUFFER = Math.min(visibleCount * 2, HALF)
  const EAGER_COUNT = Math.min(HALF + BUFFER, marqueeImages.length)

  // --- FIX PART A: persist loaded-by-src across lang switches ---
  const loadedSrcs = useRef<Set<string>>(new Set())
  const [loadedCount, setLoadedCount] = useState(0)

  // When the eager window changes, recompute how many are already loaded
  useEffect(() => {
    const end = Math.min(EAGER_COUNT, marqueeImages.length)
    let cnt = 0
    for (let i = 0; i < end; i++) {
      if (loadedSrcs.current.has(marqueeImages[i].src)) cnt++
    }
    setLoadedCount(cnt)
  }, [EAGER_COUNT, marqueeImages])

  const markLoadedOnce = (src: string) => {
    if (loadedSrcs.current.has(src)) return
    loadedSrcs.current.add(src)
    const end = Math.min(EAGER_COUNT, marqueeImages.length)
    for (let i = 0; i < end; i++) {
      if (marqueeImages[i].src === src) {
        setLoadedCount(n => n + 1)
        break
      }
    }
  }

  // 5) prefetch early images (reactive) + count when onload fires
  const prefetched = useRef<Set<string>>(new Set())
  useEffect(() => {
    const end = Math.min(EAGER_COUNT, marqueeImages.length)
    for (let i = 0; i < end; i++) {
      const url = marqueeImages[i].src
      if (prefetched.current.has(url) || loadedSrcs.current.has(url)) continue
      const img = new window.Image()
      img.decoding = 'async'
      img.src = url
      img.onload = () => markLoadedOnce(url)
      prefetched.current.add(url)
    }
  }, [EAGER_COUNT, marqueeImages])

  // If we have enough eager images, run animation
  const marqueeReady = loadedCount >= Math.min(EAGER_COUNT, marqueeImages.length)

  // --- FIX PART B: dynamic duration based on content width (faster if long) ---
  const [durationSec, setDurationSec] = useState<number>(12) // sensible default
  useEffect(() => {
    if (!trackRef.current) return
    const track = trackRef.current

    const computeDuration = () => {
      // We translate -50%, and total scrollable width is track.scrollWidth.
      // Speed in px/s (tune 160–240). Bigger => faster.
      const pxPerSec = 190
      const halfWidth = track.scrollWidth / 2
      const seconds = Math.max(4, halfWidth / pxPerSec)
      setDurationSec(seconds)
    }

    computeDuration()

    let ro: ResizeObserver | null = null
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(computeDuration)
      ro.observe(track)
    } else {
      window.addEventListener('resize', computeDuration)
    }
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', computeDuration)
    }
  }, [trackRef, marqueeImages.length, visibleCount])

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'zh' : 'en'
    const params = new URLSearchParams(sp.toString())
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <main className="min-h-dvh bg-white text-black relative z-10">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t.title}</h1>
          <p className="mt-2 text-gray-700">{t.strap}</p>
        </div>
        <button
          onClick={toggleLang}
          className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#76B900]/50 rounded-lg px-4 py-2 transition-all duration-300"
          aria-label="Toggle language"
          title={lang === 'en' ? '切换到中文' : 'Switch to English'}
        >
          <Globe className="w-4 h-4 text-[#76B900]" />
          <span className="text-sm font-semibold text-gray-700">
            {lang === 'en' ? '中文' : 'EN'}
          </span>
        </button>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Body */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 border-t border-[#76B900]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          <div className="lg:col-span-8 space-y-6">
            {t.paragraphs.map((para, i) => (
              <p key={i} className="text-[17px] leading-8 text-gray-900">
                {para}
              </p>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-[#76B900]/25 bg-white shadow-sm p-6">
              <div className="grid grid-cols-2 gap-4">
                {t.stats.map((s) => (
                  <div key={s.k + s.v} className="rounded-xl border border-[#76B900]/20 bg-white p-4 text-center">
                    <div className="text-3xl font-extrabold text-gray-900">{s.k}</div>
                    <div className="text-sm font-medium text-gray-600 mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-[#f6fbef] border-t border-[#76B900]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 space-y-10">
          <div className="lg:max-w-3xl space-y-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              {t.showcase.heading}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">{t.showcase.subheading}</p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#76B900]/25 bg-white/80">
            <div
              ref={trackRef}
              className="project-marquee-track flex gap-6 py-6"
              style={
                {
                  '--marquee-play': marqueeReady ? 'running' : 'paused',
                  '--marquee-duration': `${durationSec}s`,
                } as CSSProperties
              }
            >
              {marqueeImages.map((item, idx) => {
                const isEager = idx < EAGER_COUNT
                return (
                  <figure
                    key={`${item.src}-${idx}`}
                    className="relative w-64 h-44 sm:w-72 sm:h-48 lg:w-80 lg:h-52 flex-shrink-0 overflow-hidden rounded-xl shadow-md"
                    data-fig-idx={idx}
                  >
                    <Image
                      src={item.src}
                      alt={item.caption[lang]}
                      fill
                      sizes="(max-width: 1024px) 70vw, 320px"
                      className="object-cover object-top"
                      priority={isEager}
                      loading={isEager ? 'eager' : 'lazy'}
                      fetchPriority={isEager ? 'high' : 'auto'}
                      decoding="async"
                      quality={70}
                      draggable={false}
                      onLoadingComplete={() => { if (isEager) markLoadedOnce(item.src) }}
                      onError={() => {
                        const wrapper = document.querySelector(
                          `figure[data-fig-idx="${idx}"]`
                        ) as HTMLElement | null
                        if (wrapper) {
                          wrapper.style.background = '#eee'
                          wrapper.setAttribute('data-image-error', item.src)
                        }
                      }}
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-black/55 py-1.5 text-center text-xs sm:text-sm text-white">
                      {item.caption[lang]}
                    </figcaption>
                  </figure>
                )
              })}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f6fbef] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f6fbef] to-transparent" />
          </div>
        </div>
      </section>

      <style jsx global>{`
        .project-marquee-track {
          animation-name: showcase-marquee;
          animation-duration: var(--marquee-duration, 12s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: var(--marquee-play, paused);
          will-change: transform;
          backface-visibility: hidden;
          contain: paint;
        }
        .project-marquee-track:hover { animation-play-state: paused; }
        @keyframes showcase-marquee {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50.001%,0,0); } /* tiny epsilon to avoid seam */
        }
        @media (prefers-reduced-motion: reduce) {
          .project-marquee-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  )
}
