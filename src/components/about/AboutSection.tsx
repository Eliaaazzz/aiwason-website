'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { Globe } from 'lucide-react'

type Lang = 'en' | 'zh'
type ShowcaseItem = { src: string; caption: { en: string; zh: string } }

// ── 可调参数 ───────────────────────────────────────────────────
const CARD_W = 320
const CARD_H = 200
const GAP_PX = 24
const PX_PER_SEC = 40
const SHOWCASE_EAGER = 12   // 项目首屏优先加载数
const PATENT_EAGER   = 7   


const SHOWCASE_ITEMS: ShowcaseItem[] = [
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
]

const PATENT_ITEMS: ShowcaseItem[] = [
  { src: '/res/patent1.jpeg', caption: { en: 'Busbar Patent Exhibit #1', zh: '母线专利成果展示 #1' } },
  { src: '/res/patent2.jpeg', caption: { en: 'Busbar Patent Exhibit #2', zh: '母线专利成果展示 #2' } },
  { src: '/res/patent3.jpeg', caption: { en: 'Busbar Patent Exhibit #3', zh: '母线专利成果展示 #3' } },
  { src: '/res/patent4.jpeg', caption: { en: 'Busbar Patent Exhibit #4', zh: '母线专利成果展示 #4' } },
  { src: '/res/patent5.jpeg', caption: { en: 'Busbar Patent Exhibit #5', zh: '母线专利成果展示 #5' } },
  { src: '/res/patent6.jpeg', caption: { en: 'Busbar Patent Exhibit #6', zh: '母线专利成果展示 #6' } },
  { src: '/res/patent7.jpeg', caption: { en: 'Busbar Patent Exhibit #7', zh: '母线专利成果展示 #7' } },
]

// ── 文案（中文为你提供的三段） ───────────────────────────────────
const COPY: Record<Lang, {
  title: string
  strap: string
  paragraphs: string[]
  stats: { k: string; v: string }[]
  showcase: { heading: string; subheading?: string }
}> = {
  en: {
    title: 'About Us',
    strap: 'Hard-tech power distribution for critical infrastructure worldwide.',
    paragraphs: [
      'Zhongshan AIWASON Electric focuses on intelligent, safe, and efficient power distribution across data centers, transport hubs, commercial complexes, and campuses.',
      'We keep investing in R&D for fire-resistant busways, smart monitoring, and cloud-native O&M platforms.',
      'With “customer focus and reliable engineering” as our mission, we build greener and safer infrastructure for the digital era.',
    ],
    stats: [
      { k: '15+', v: 'Years of deep-tech focus' },
      { k: '3',   v: 'R&D centres nationwide' },
      { k: '200+', v: 'Patent achievements' },
      { k: '1200+', v: 'Customers served' },
    ],
    showcase: { heading: 'Landmark Deployments', subheading: 'Selected large-scale projects that highlight engineering excellence.' },
  },
  zh: {
    title: '关于我们',
    strap: '以硬核科技赋能关键基础设施。',
    paragraphs: [
      '中山艾默森电器有限公司坐落在美丽富饶的粤港澳大湾区核心商圈前海西岸，深中通道首站。“科技点亮光明，实干成就梦想”———艾默森秉承硬科技造福社会、赢得未来的经营理念。“千淘万漉虽辛苦，吹尽狂沙始到金”，经过十五年的发展，已成为一家集耐高温新材料、光电智能母线、微电网系统为一体的高科技企业，产品服务遍及中国及欧洲多个国家地区，用户多达1200多个，在行业具有领先地位。',
      '艾默森长期坚持开放进取，勇于探索，自强不息，艰苦奋斗的精神，持续加强研发投入，布局顶尖优秀研发资源，在国内构建三大研发中心，专利成果二百多项，发明专利行业第一，在（基础科学）新材料、光电技术、智能微电网系统三大板块自主研发，精准突破，软硬互联，不断创新升级新产品。',
      '“聚焦客户痛点，为客户提供最优解决方案，全心全意为客户服务”是我们肩负的责任与使命。不管时代如何变迁，市场竞争如何激烈，艾默森始终专注于硬科技发展，排除一切诱惑及困难，为用户提供最安全、绿色智能的系统解决方案，让安全稳如磐石、让节能无处不在、让智能无所不及。',
    ],
    stats: [
      { k: '15+', v: '年深耕硬科技' },
      { k: '3',   v: '大研发中心' },
      { k: '200+', v: '项专利' },
      { k: '1200+', v: '位合作客户' },
    ],
    showcase: { heading: '地标级项目', subheading: '精选大型项目，展示工程与系统集成能力。' },
  },
}

// ── 工具：语言、错误边界 ──────────────────────────────────────
const normalizeLang = (raw: string | null): Lang =>
  raw && raw.toLowerCase().startsWith('zh') ? 'zh' : 'en'

class PageError extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(p: any) { super(p); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(e: any, info: any) { console.error('AboutSection crashed:', e, info) }
  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-dvh bg-white text-black p-8">
          <h2 className="text-xl font-bold text-red-600">Something went wrong.</h2>
          <p className="text-sm text-gray-700 mt-2">Open DevTools → Console to see the error.</p>
        </main>
      )
    }
    return this.props.children as any
  }
}

// ── 可自救图片：骨架 + 失败占位 + fetchpriority ────────────────
function SmartImg({
  src, alt, width, height, eager, fit,
}: { src: string; alt: string; width: number; height: number; eager: boolean; fit: 'cover' | 'contain' }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div
      style={{
        width: '100%', height: '100%',
        position: 'relative',
        background: fit === 'contain' ? '#fff' : '#eaeaea',
        overflow: 'hidden',
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        contain: 'paint style size',
      }}
    >
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse" style={{ background: '#eee' }} />
      )}

      {!failed ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'low'}
          onLoad={() => setLoaded(true)}
          onError={() => { setFailed(true); setLoaded(false) }}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit,
            display: 'block',
            transform: 'translate3d(0,0,0)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center text-xs text-gray-500"
          style={{ background: '#f3f4f6' }}
        >
          {alt || 'Image unavailable'}
        </div>
      )}
    </div>
  )
}

// ── 卡片（固定宽高） ────────────────────────────────────────────
function ImgCard({
  item, lang, eager = false, fit = 'cover',
}: { item: ShowcaseItem; lang: Lang; eager?: boolean; fit?: 'cover' | 'contain' }) {
  return (
    <figure
      className="flex-shrink-0 flex flex-col items-center"
      style={{ width: CARD_W, marginRight: GAP_PX, contain: 'layout paint style' }}
      aria-label={item.caption[lang]}
    >
      <div
        className="rounded-xl shadow-[0_8px_18px_rgba(15,45,0,.12)]"
        style={{ width: CARD_W, height: CARD_H, overflow: 'hidden' }}
      >
        <SmartImg
          src={item.src}
          alt={item.caption[lang]}
          width={CARD_W}
          height={CARD_H}
          eager={eager}
          fit={fit}
        />
      </div>
      <figcaption
        className="text-xs text-gray-800 text-center px-2 truncate"
        style={{ width: CARD_W - 20 }}
      >
        {item.caption[lang]}
      </figcaption>
    </figure>
  )
}

// ── 无限滚动轨道（A + A，纯 CSS 动画） ─────────────────────────
function InfiniteScroller({
  items, lang, fit, eagerCount, speedPxPerSec = PX_PER_SEC,
}: {
  items: ShowcaseItem[]
  lang: Lang
  fit: 'cover' | 'contain'
  eagerCount: number
  speedPxPerSec?: number
}) {
  const distance = useMemo(() => (CARD_W + GAP_PX) * items.length, [items.length])
  const duration = useMemo(() => distance / speedPxPerSec, [distance, speedPxPerSec])
  const animName = useMemo(() => `scrollLeft_${distance}`, [distance])
  const doubled = useMemo(() => [...items, ...items], [items])

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#76B900]/25 bg-white shadow-sm"
      style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
    >
      <div
        className="flex items-stretch"
        style={{
          width: distance * 2,
          animation: `${animName} ${duration}s linear infinite`,
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {doubled.map((item, i) => (
          <ImgCard
            key={`${item.src}-${i}`}
            item={item}
            lang={lang}
            eager={i < eagerCount}
            fit={fit}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes ${animName} {
          // force GPU acceleration
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-${distance}px,0,0); }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*="${animName}"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

// ── 页面核心 ────────────────────────────────────────────────────
function Core() {
  const [mounted, setMounted] = useState(false)
  const [lang, setLang] = useState<Lang>('zh') // 默认中文

  useEffect(() => {
    setMounted(true)
    const qs = new URLSearchParams(window.location.search)
    setLang(normalizeLang(qs.get('lang')))
  }, [])

  const tx = COPY[lang]
  const showcase = useMemo(() => SHOWCASE_ITEMS, [])
  const patents  = useMemo(() => PATENT_ITEMS, [])

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'zh' : 'en'
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState({}, '', url.toString())
    setLang(next)
  }

  if (!mounted) {
    return (
      <main className="min-h-dvh bg-white text-black p-8">
        <div className="h-6 w-40 animate-pulse bg-gray-200 rounded" />
        <div className="mt-2 h-4 w-80 animate-pulse bg-gray-200 rounded" />
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">{tx.title}</h1>
          <p className="mt-2 text-gray-700">{tx.strap}</p>
        </div>
        <button
          onClick={toggleLang}
          className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#76B900]/50 rounded-lg px-4 py-2 transition-all duration-300"
          aria-label="Toggle language"
          title={lang === 'en' ? '切换到中文' : 'Switch to English'}
        >
          <Globe className="w-4 h-4 text-[#76B900]" />
          <span className="text-sm font-semibold text-gray-700">{lang === 'en' ? '中文' : 'EN'}</span>
        </button>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Body */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 border-t border-[#76B900]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          <div className="lg:col-span-8 space-y-6">
            {tx.paragraphs.map((para, i) => (
              <p key={`${i}-${para.slice(0,16)}`} className="text-[17px] leading-8 text-gray-900">{para}</p>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-[#76B900]/25 bg-white shadow-sm p-6">
              <div className="grid grid-cols-2 gap-4">
                {tx.stats.map((stat, i) => (
                  <div key={`${i}-${stat.k}`} className="rounded-xl border border-[#76B900]/20 bg-white p-4 text-center">
                    <div className="text-3xl font-extrabold text-gray-900">{stat.k}</div>
                    <div className="text-sm font-medium text-gray-600 mt-1">{stat.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 地标级项目（cover） */}
      <section className="bg-[#f6fbef] border-t border-[#76B900]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 space-y-10">
          <div className="lg:max-w-3xl space-y-2">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{tx.showcase.heading}</h2>
            {tx.showcase.subheading && <p className="text-gray-600">{tx.showcase.subheading}</p>}
          </div>
          <InfiniteScroller items={showcase} lang={lang} fit="cover" eagerCount={SHOWCASE_EAGER} />
        </div>
      </section>

      {/* 专利成果（contain） */}
      <section className="bg-[#f6fbef] border-t border-[#76B900]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 space-y-10">
          <div className="lg:max-w-3xl space-y-2">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{lang === 'en' ? 'Patent Achievements' : '专利成果'}</h2>
            <p className="text-gray-600">{lang === 'en' ? 'Selected intellectual property that underpins our core technologies.' : '支撑核心技术的代表性知识产权。'}</p>
          </div>
          <InfiniteScroller items={PATENT_ITEMS} lang={lang} fit="contain" eagerCount={PATENT_EAGER} />
        </div>
      </section>
    </main>
  )
}

export default function AboutSection() {
  return (
    <PageError>
      <Suspense fallback={
        <main className="min-h-dvh bg-white text-black p-8">
          <div className="h-6 w-40 animate-pulse bg-gray-200 rounded" />
          <div className="mt-2 h-4 w-80 animate-pulse bg-gray-200 rounded" />
        </main>
      }>
        <Core />
      </Suspense>
    </PageError>
  )
}
