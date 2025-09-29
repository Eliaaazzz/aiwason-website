// components/home/HomeShell.tsx
'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// 静态 import：保持不变（Next 会生成 hashed 静态资源，直接把模块对象传给 <Image /> 即可）
import monitoringSlide from '@/assets/images/ai-monitoring-terminal.png'

import NewsSectionsSlideIn, { type NewsGroup } from '../news/NewsSectionsSlideIn'
import HomeNeonFlows from './HomeNeonFlows'

// ✅ 纯 public 路径（不带 ?v）
const LOGO_SRC = '/res/logo.png'
const BACKGROUND_IMG = '/res/background.png'

const translations = {
  en: {
    nav: { products: 'PRODUCTS', solutions: 'SOLUTIONS', about: 'ABOUT', contact: 'CONTACT' },
    hero: {
      title1: 'FIRE-RESISTANT',
      title2: 'INTELLIGENT OPTOELECTRONIC',
      title3: 'BUSBARS',
      subtitle:
        'Powering the future of data centers and real estate with revolutionary fire-resistant intelligent optoelectronic busbar technology.',
      exploreBtn: 'EXPLORE PRODUCTS',
    },
    features: {
      smartMonitoring: { title: 'AI-POWERED MONITORING', description: 'Real-time analytics with predictive maintenance powered by advanced AI algorithms' },
      highEfficiency: { title: 'ULTRA-HIGH EFFICIENCY', description: 'Industry-leading power efficiency reduces operational costs and environmental impact' },
      fireResistant: { title: 'FIRE-RESISTANT CORE', description: '2-hour fire resistance rating ensures uninterrupted power delivery during critical situations' },
    },
  },
  zh: {
    nav: { products: '产品中心', solutions: '解决方案', about: '关于我们', contact: '联系我们' },
    hero: {
      title1: '耐火', title2: '智能光电', title3: '母线系统',
      subtitle: '革命性耐火智能光电母线技术，为数据中心和房地产行业提供未来动力。',
      exploreBtn: '产品展示',
    },
    features: {
      smartMonitoring: { title: 'AI智能监控', description: '基于先进AI算法的实时分析和预测性维护' },
      highEfficiency: { title: '超高效率', description: '行业领先的电力效率，降低运营成本和环境影响' },
      fireResistant: { title: '耐火核心技术', description: '2小时耐火等级，确保关键情况下的不间断电力传输' },
    },
  },
} as const

type Lang = keyof typeof translations

export default function HomeShell() {
  const router = useRouter()
  const sp = useSearchParams()
  const pathname = usePathname()
  const language: Lang = (sp.get('lang') as Lang) || 'zh'
  const t = translations[language]

  const toggleLanguage = () => {
    const next: Lang = language === 'en' ? 'zh' : 'en'
    const params = new URLSearchParams(sp.toString())
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const slides = useMemo(
    () => [
      {
        id: 0,
        lines:
          language === 'en'
            ? ['FIRE-RESISTANT', 'INTELLIGENT', 'PHOTOELECTRIC BUSBARS']
            : ['耐火', '智能光电', '母线系统'],
        subtitle: t.hero.subtitle,
        img: '/res/company.jpg',        // public 路径
        bg: BACKGROUND_IMG,             // public 路径
      },
      {
        id: 1,
        lines: language === 'en' ? ['AI-POWERED', 'REAL-TIME', 'MONITORING'] : ['AI智能监控', '实时分析', '预测维护'],
        subtitle: t.features.smartMonitoring.description,
        img: monitoringSlide,           // ✅ 直接用静态 import 的模块对象（不要拼 ?v）
        bg: BACKGROUND_IMG,
      },
      {
        id: 2,
        lines: language === 'en' ? ['ULTRA-HIGH', 'EFFICIENCY', 'RELIABILITY'] : ['超高', '效率', '可靠性'],
        subtitle: t.features.highEfficiency.description,
        img: '/res/company.jpg',
        bg: BACKGROUND_IMG,
      },
      {
        id: 3,
        lines: language === 'en' ? ['FIRE-RESISTANT', 'CORE', 'TECHNOLOGY'] : ['耐火', '核心', '技术'],
        subtitle: t.features.fireResistant.description,
        img: '/res/aiwason_fireproof_busbar_hero.png',  // ✅ 去掉 ?v
        bg: BACKGROUND_IMG,
      },
      {
        id: 4,
        lines: language === 'en' ? ['SMART', 'BUILDINGS', 'READY'] : ['面向', '智能建筑', '应用'],
        subtitle:
          language === 'en'
            ? 'Designed for IoT-enabled facilities with intelligent building management.'
            : '为物联网与智能楼控系统而生。',
        img: '/res/company.jpg',
        bg: BACKGROUND_IMG,
      },
    ],
    [
      language,
      t.hero.subtitle,
      t.features.smartMonitoring.description,
      t.features.highEfficiency.description,
      t.features.fireResistant.description,
    ]
  )

  const SLIDES_MS = 6000

  const [idx, setIdx] = useState(0)
  const timeoutRef = useRef<number | null>(null)

  const scheduleNext = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      setIdx((i) => (i + 1) % slides.length)
    }, SLIDES_MS)
  }, [slides.length])

  useEffect(() => {
    scheduleNext()
    return () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current) }
  }, [idx, scheduleNext])

  const tSlide = slides[idx]

  const navHref = useMemo(
    () => ({
      products: `/products?lang=${language}`,
      solutions: `/solutions?lang=${language}`,
      about: `/about?lang=${language}`,
      contact: `/contact?lang=${language}`,
    }),
    [language]
  )

  const newsGroups: NewsGroup[] = useMemo(
    () => [
      {
        heading: language === 'en' ? 'Video' : '视频',
        items: [
          {
            id: 'video-hero-1',
            title: language === 'en' ? 'AIWASON Overview' : 'AIWASON 概览视频',
            desc:
              language === 'en'
                ? 'A quick look at AIWASON fire-resistant, intelligent optoelectronic busbar.'
                : '快速了解 AIWASON 耐火智能光电母线。',
            date: '2025/09/26',
            img: '/res/home-hero-poster.jpg',
            video: {
              poster: '/res/home-hero-poster.jpg',
              sources: [{ src: '/video/home-hero.mp4', type: 'video/mp4' }],
            },
          },
        ],
      },
      {
        heading: language === 'en' ? 'Conference Center' : '会议中心',
        items: [
          {
            id: 'meet-1',
            title: language === 'en' ? 'International Conference Center' : '国际会议中心',
            desc:
              language === 'en'
                ? 'At Shenzhen Qianhai International Conference Center, AIWASON delivers high-efficiency, green, intelligent, and safe power distribution for large exhibitions and summits.'
                : '深圳前海国际会议中心，AIWASON 以高效、绿色、智能、安全的输配电体系，支撑大型会展与国际峰会。',
            date: '2025/05/18',
            img: '/res/conference.jpg',
            href: '/events/datacenter-summit',
          },
        ],
      },
      {
        heading: language === 'en' ? 'Data Centers' : '数据中心',
        items: [
          {
            id: 'dc-1',
            title: language === 'en' ? 'AI Monitoring Upgrade' : 'AI 智能监控系统升级',
            desc:
              language === 'en'
                ? 'Real-time analytics and predictive maintenance for mission-critical workloads.'
                : '实时分析与预测性维护，保障关键业务连续性。',
            date: '2025/05/12',
            img: '/res/dataCenter.jpeg',
            href: '/news/data-center',
          },
        ],
      },
      {
        heading: language === 'en' ? 'Commercial Towers' : '商业大楼',
        items: [
          {
            id: 'biz-1',
            title: language === 'en' ? 'Smart Tower Deployment' : '智慧商业大厦部署',
            desc:
              language === 'en'
                ? 'High-efficiency busbar rollout across 100 floors.'
                : '在 100 层楼宇完成高效母线部署。',
            date: '2025/05/05',
            img: '/res/skyscraper.jpg',
            href: '/news/smart-tower',
          },
        ],
      },
      {
        heading: language === 'en' ? 'Five-star Hotels' : '五星级酒店',
        items: [
          {
            id: 'hotel-1',
            title: language === 'en' ? 'Luxury Hotel Deployment' : '高端酒店母线部署',
            desc:
              language === 'en'
                ? 'Reliable, quiet, and efficient power for premium hospitality.'
                : '为高端酒店提供可靠、低噪与高效的配电方案。',
            date: '2025/05/08',
            img: '/res/gallery-44.jpg',
            href: '/news/hotel-deployment',
          },
        ],
      },
      {
        heading: language === 'en' ? 'Airports' : '机场',
        items: [
          {
            id: 'airport-1',
            title: language === 'en' ? 'Airport Energy Upgrade' : '机场能源系统升级',
            desc:
              language === 'en'
                ? 'Enhance the operational efficiency and safety of the terminal building with fire-resistant intelligent photoelectric busbars.'
                : '以耐火智能光电母线提升航站楼运行效率与安全性。',
            date: '2025/04/28',
            img: '/res/gallery-46.jpg',
            href: '/news/airport-upgrade',
          },
        ],
      },
      {
        heading: language === 'en' ? 'High-speed Rail' : '高铁',
        items: [
          {
            id: 'hsr-1',
            title: language === 'en' ? 'Rail Transit Power System' : '轨道交通配电系统',
            desc:
              language === 'en'
                ? 'Robust distribution for depots and stations with predictive monitoring.'
                : '为车辆段与车站提供稳健配电与预测监测能力。',
            date: '2025/04/20',
            img: '/res/gallery-18.png',
            href: '/news/rail-transit-power',
          },
        ],
      },
      {
        heading: language === 'en' ? 'Libraries' : '图书馆',
        items: [
          {
            id: 'library-1',
            title: language === 'en' ? 'University Library Showcase' : '高校图书馆示范项目',
            desc:
              language === 'en'
                ? 'Silent, efficient power distribution for learning environments.'
                : '面向学习空间的静音高效配电方案。',
            date: '2025/04/12',
            img: '/res/gallery-39.jpg',
            href: '/news/library-showcase',
          },
        ],
      },
    ],
    [language]
  )

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-16 lg:h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
              <Image src={LOGO_SRC} alt="AIWASON logo" width={64} height={48} priority className="object-contain" />
              <span className="text-2xl font-black tracking-wide text-gray-900">AIWASON</span>
              <span className="text-xs text-gray-400">®</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, label], index) => {
                const href = ((): string => {
                  const map = {
                    products: `/products?lang=${language}`,
                    solutions: `/solutions?lang=${language}`,
                    about: `/about?lang=${language}`,
                    contact: `/contact?lang=${language}`,
                  } as const
                  return (map as any)[key] ?? '#'
                })()
                return (
                  <motion.div key={key} whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                    <Link href={href} className="text-gray-700 hover:text-[#76B900] font-medium tracking-wide text-sm relative group transition-all duration-300">
                      {label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#76B900] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#76B900]/50 rounded-lg px-4 py-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-[#76B900]" />
              <span className="text-sm font-semibold text-gray-700">
                {language === 'en' ? '中文' : 'EN'}
              </span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* hero */}
      <section className="bg-neutral-950 text-white">
        <HomeNeonFlows
          key={idx}
          lang={language}
          imageSrc={tSlide.img} // ✅ 现在是 public 字符串 或 静态 import 模块对象
          titleLines={Array.isArray(tSlide.lines) ? tSlide.lines : [t.hero.title1, t.hero.title2, t.hero.title3]}
          description={tSlide.subtitle}
          cta={{ href: `/products?lang=${language}`, label: t.hero.exploreBtn }}
          currentSlide={idx}
          totalSlides={slides.length}
          progressMs={SLIDES_MS}
          onSelectSlide={setIdx}
          bgImage={tSlide.bg ?? BACKGROUND_IMG}
        />
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* news */}
      <NewsSectionsSlideIn lang={language} groups={newsGroups} showMetaLabel={false} />
    </div>
  )
}
