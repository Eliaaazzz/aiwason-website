// components/home/HomeShell.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import HomeNeonFlows from './HomeNeonFlows'
import NewsSectionsSlideIn, { type NewsGroup } from '../news/NewsSectionsSlideIn'
import LanguageSwitcher from '../common/LanguageSwitcher'
import { localePath, type Locale } from '@/lib/i18n'



const LOGO_SRC = '/res/logo.png?v=20250825'
const IMG_VER = '20250828';

const translations = {
  en: {
    nav: { products: 'PRODUCTS', solutions: 'SOLUTIONS', about: 'ABOUT', contact: 'CONTACT' },
    hero: {
      title1: 'FIRE-RESISTANT',
      title2: 'INTELLIGENT OPTOELECTRONIC',
      title3: 'BUSBARS',
      subtitle: 'Powering the future of data centers and real estate with revolutionary fire-resistant intelligent optoelectronic busbar technology.',
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

export default function HomeShell({ lang = 'zh' as Lang }: { lang?: Locale }) {
  const language: Lang = lang as Lang
  const t = translations[language]

  const slides = useMemo(
    () => [
      { id: 0,
        lines: language === 'en'
          ? ['FIRE-RESISTANT', 'INTELLIGENT OPTOELECTRONIC', 'BUSBARS']
          : ['耐火', '智能光电', '母线系统'],
        subtitle: t.hero.subtitle,
        img: '/res/company.jpg',
      },
      { id: 1, lines: language === 'en' ? ['AI-POWERED', 'REAL-TIME', 'MONITORING'] : ['AI智能监控', '实时分析', '预测维护'],
        subtitle: t.features.smartMonitoring.description, img: '/res/company.jpg' },
      { id: 2, lines: language === 'en' ? ['ULTRA-HIGH', 'EFFICIENCY', 'RELIABILITY'] : ['超高', '效率', '可靠性'],
        subtitle: t.features.highEfficiency.description, img: '/res/company.jpg' },
      { id: 3, lines: language === 'en' ? ['FIRE-RESISTANT', 'CORE', 'TECHNOLOGY'] : ['耐火', '核心', '技术'],
        subtitle: t.features.fireResistant.description,  img: `/res/aiwason_fireproof_busbar_hero.png?v=${IMG_VER}`},
      { id: 4, lines: language === 'en' ? ['SMART', 'BUILDINGS', 'READY'] : ['面向', '智能建筑', '应用'],
        subtitle: language === 'en'
          ? 'Designed for IoT-enabled facilities with intelligent building management.'
          : '为物联网与智能楼控系统而生。', img: '/res/company.jpg' },
    ],
    [language, t.hero.subtitle, t.features.smartMonitoring.description, t.features.highEfficiency.description, t.features.fireResistant.description]
  )

  const SLIDES_MS = 6000
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<number | null>(null)
  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => setIdx(i => (i + 1) % slides.length), SLIDES_MS)
    return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
  }, [slides.length])

  const tSlide = slides[idx]
  const heroBg = idx === 0 ? '/res/background.png' : undefined

  
    // 放在 HomeShell.tsx 里，靠近其它 useMemo 的位置
  const newsGroups: NewsGroup[] = useMemo(
    () => [
      {
        heading: language === 'en' ? 'Conference Center' : '会议中心',
        items: [
          {
            id: 'meet-1',
            title: language === 'en' ? 'Global Data Center Summit' : '国际数据中心大会',
            desc:
              language === 'en'
                ? 'AIWASON presents fire-resistant intelligent optoelectronic busbar solutions.'
                : '发布耐火智能光电母线解决方案。',
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
            img: '/res/company.jpg',
            href: '/news/ai-monitoring-upgrade',
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
        heading: language === 'en' ? 'Residential / Civil' : '民用建筑',
        items: [
          {
            id: 'res-1',
            title: language === 'en' ? 'Residential Showcase' : '民用建筑改造示范',
            desc:
              language === 'en'
                ? 'Safer and greener power distribution for modern communities.'
                : '更安全、更绿色的社区配电示范项目。',
            date: '2025/05/03',
            img: '/projects/深圳-大中华喜来登酒店.jpg',
            href: '/news/luxury-hotel-project',
          },
        ],
      },
      {
        heading: language === 'en' ? 'Airport' : '机场',
        items: [
          {
            id: 'airport-1',
            title: language === 'en' ? 'Shenzhen Airport Smart Deployment' : '深圳机场智能母线部署',
            desc:
              language === 'en'
                ? 'Smart power solutions for major airports.'
                : '大型机场的智能配电解决方案。',
            date: '2025/05/10',
            img: '/projects/深圳机场.jpg',
            href: '/news/airport-infrastructure',
          },
        ],
      },
      {
        heading: language === 'en' ? 'High-Speed Rail' : '高铁',
        items: [
          {
            id: 'railway-1',
            title: language === 'en' ? 'Railway Station Power Upgrade' : '高铁站配电系统升级',
            desc:
              language === 'en'
                ? 'Qingdao metro station intelligent renovation.'
                : '青岛地铁站智能化改造。',
            date: '2025/05/12',
            img: '/projects/青岛地铁.jpg',
            href: '/news/railway-station-upgrade',
          },
        ],
      },
      {
        heading: language === 'en' ? 'Library' : '图书馆',
        items: [
          {
            id: 'library-1',
            title: language === 'en' ? 'STU Library Modernization' : '汕头大学图书馆现代化',
            desc:
              language === 'en'
                ? 'Smart power solutions for modern libraries.'
                : '现代图书馆的智能配电方案。',
            date: '2025/05/14',
            img: '/projects/汕头大学新图书馆—A.jpg',
            href: '/news/library-modernization',
          },
        ],
      },
      {
        heading: language === 'en' ? 'Theater' : '剧院',
        items: [
          {
            id: 'theater-1',
            title: language === 'en' ? 'Poly Theater Smart Lighting' : '保利剧院智能照明系统',
            desc:
              language === 'en'
                ? 'Professional lighting power solutions for theaters.'
                : '剧院专业级照明配电解决方案。',
            date: '2025/05/16',
            img: '/projects/保利剧院.jpg',
            href: '/news/theater-lighting-system',
          },
        ],
      },
    ],
    [language]
  )

  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-16 lg:h-20 flex items-center justify-between">
            <Link href={localePath(language)} className="flex items-center gap-3 group" aria-label="Home">
              <Image
                src={LOGO_SRC}
                alt="AIWASON logo"
                width={64}
                height={48}
                priority
                fetchPriority="high"
                sizes="64px"
                className="object-contain"
              />
              <span className="text-2xl font-black tracking-wide text-gray-900">AIWASON</span>
              <span className="text-xs text-gray-400" aria-hidden="true">®</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, label], index) => {
                const isPageLink = key === 'products' || key === 'about'
                const href = isPageLink ? localePath(language, key) : `#${key}`
                return (
                  <motion.div key={key} whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                    <Link href={href} className="text-gray-700 hover:text-[#76B900] font-medium tracking-wide text-sm relative group transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#76B900] rounded-sm">
                      {label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#76B900] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <LanguageSwitcher locale={language} />
          </div>
        </div>
      </nav>

      {/* hero */}
      <HomeNeonFlows
        key = {idx}
        lang={language}
        imageSrc={tSlide.img}
        titleLines={Array.isArray(tSlide.lines) ? tSlide.lines : [t.hero.title1, t.hero.title2, t.hero.title3]}
        description={tSlide.subtitle}
        cta={{ href: localePath(language, 'products'), label: t.hero.exploreBtn }}
        currentSlide={idx}
        totalSlides={slides.length}
        progressMs={SLIDES_MS}
        onSelectSlide={setIdx}
        bgImage={heroBg}
      />

      {/* news */}
      <NewsSectionsSlideIn lang={language} groups={newsGroups} />
    </div>
  )
}
