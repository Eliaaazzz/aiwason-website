'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Zap, Shield, Brain, Settings, Globe, Play, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const translations = {
  en: {
    nav: { products: 'PRODUCTS', solutions: 'SOLUTIONS', about: 'ABOUT', contact: 'CONTACT' },
    hero: {
      title1: 'FIRE-RESISTANT', title2: 'INTELLIGENT OPTOELECTRONIC', title3: 'BUSBARS',
      subtitle: 'Powering the future of data centers and real estate with revolutionary fire-resistant intelligent optoelectronic busbar technology.',
      exploreBtn: 'EXPLORE PRODUCTS', demoBtn: 'WATCH DEMO'
    },
    stats: { projects: 'PROJECTS DEPLOYED', reliability: 'UPTIME GUARANTEED', monitoring: 'AI MONITORING', partners: 'GLOBAL PARTNERS' },
    features: {
      title: 'NEXT-GENERATION POWER INFRASTRUCTURE',
      subtitle: 'Built for mission-critical applications in data centers and real estate developments',
      fireResistant: { title: 'FIRE-RESISTANT CORE', description: '2-hour fire resistance rating ensures uninterrupted power delivery during critical situations' },
      smartMonitoring: { title: 'AI-POWERED MONITORING', description: 'Real-time analytics with predictive maintenance powered by advanced AI algorithms' },
      highEfficiency: { title: 'ULTRA-HIGH EFFICIENCY', description: 'Industry-leading power efficiency reduces operational costs and environmental impact' }
    },
    industries: {
      title: 'POWERING CRITICAL INFRASTRUCTURE',
      subtitle: 'Trusted by industry leaders across data centers and real estate sectors',
      realEstate: { title: 'REAL ESTATE', description: 'Commercial complexes, residential towers, and mixed-use developments' },
      dataCenter: { title: 'DATA CENTERS', description: 'Hyperscale facilities, colocation centers, and edge computing infrastructure' },
      smartBuildings: { title: 'SMART BUILDINGS', description: 'IoT-enabled facilities with intelligent building management systems' }
    },
    footer: { rights: 'All rights reserved.', tagline: 'Fire-resistant intelligent optoelectronic busbar manufacturer' }
  },
  zh: {
    nav: { products: '产品中心', solutions: '解决方案', about: '关于我们', contact: '联系我们' },
    hero: {
      title1: '耐火', title2: '智能光电', title3: '母线系统',
      subtitle: '革命性耐火智能光电母线技术，为数据中心和房地产行业提供未来动力。',
      exploreBtn: '产品展示', demoBtn: '观看演示'
    },
    stats: { projects: '项目部署', reliability: '运行时间保证', monitoring: 'AI监控', partners: '全球合作伙伴' },
    features: {
      title: '下一代电力基础设施',
      subtitle: '专为数据中心和房地产开发中的关键应用而构建',
      fireResistant: { title: '耐火核心技术', description: '2小时耐火等级，确保关键情况下的不间断电力传输' },
      smartMonitoring: { title: 'AI智能监控', description: '基于先进AI算法的实时分析和预测性维护' },
      highEfficiency: { title: '超高效率', description: '行业领先的电力效率，降低运营成本和环境影响' }
    },
    industries: {
      title: '驱动关键基础设施',
      subtitle: '数据中心和房地产行业领导者的信赖之选',
      realEstate: { title: '房地产', description: '商业综合体、住宅塔楼和混合用途开发项目' },
      dataCenter: { title: '数据中心', description: '超大规模设施、托管中心和边缘计算基础设施' },
      smartBuildings: { title: '智能建筑', description: '具有智能楼宇管理系统的物联网设施' }
    },
    footer: { rights: '版权所有', tagline: '耐火智能光电母线专业制造商' }
  }
}

/** 圆环进度指示器 */
function ProgressRing({ value, active }: { value: number; active: boolean }) {
  const size = 28
  const r = 12
  const c = 2 * Math.PI * r
  const dash = c
  const offset = c * (1 - value) // 0~1

  return (
    <div
      className={`relative p-1 rounded-full ${
        active ? 'shadow-[0_0_0_4px_rgba(118,185,0,0.08)]' : ''
      }`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={active ? '#76B900' : 'rgba(118,185,0,0.7)'}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          style={{ strokeDasharray: dash }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.12, ease: 'linear' }}
        />
      </svg>
    </div>
  )
}

export default function HomePage() {
  const [language, setLanguage] = useState<'en' | 'zh'>('zh')
  const t = translations[language]
  const toggleLanguage = () => setLanguage(language === 'en' ? 'zh' : 'en')

  /** ---------------- HERO SLIDES（5张，圆环进度 + 自动轮播） ---------------- */
  const SLIDES_MS = 6000

  const slides = [
    {
      id: 0,
      lines: language === 'en' ? ['FIRE-RESISTANT', 'INTELLIGENT OPTOELECTRONIC', 'BUSBARS'] : ['耐火', '智能光电', '母线系统'],
      subtitle: t.hero.subtitle,
      img: '/res/factory.jpg'
    },
    {
      id: 1,
      lines: language === 'en' ? ['AI-POWERED', 'REAL-TIME', 'MONITORING'] : ['AI智能监控', '实时分析', '预测维护'],
      subtitle: language === 'en' ? t.features.smartMonitoring.description : t.features.smartMonitoring.description,
      img: '/res/factory.jpg'
    },
    {
      id: 2,
      lines: language === 'en' ? ['ULTRA-HIGH', 'EFFICIENCY', 'RELIABILITY'] : ['超高', '效率', '可靠性'],
      subtitle: language === 'en' ? t.features.highEfficiency.description : t.features.highEfficiency.description,
      img: '/res/factory.jpg'
    },
    {
      id: 3,
      lines: language === 'en' ? ['FIRE-RESISTANT', 'CORE', 'TECHNOLOGY'] : ['耐火', '核心', '技术'],
      subtitle: language === 'en' ? t.features.fireResistant.description : t.features.fireResistant.description,
      img: '/res/factory.jpg'
    },
    {
      id: 4,
      lines: language === 'en' ? ['SMART', 'BUILDINGS', 'READY'] : ['面向', '智能建筑', '应用'],
      subtitle: language === 'en'
        ? 'Designed for IoT-enabled facilities with intelligent building management.'
        : '为物联网与智能楼控系统而生。',
      img: '/res/factory.jpg'
    }
  ]

  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0) // 0~1
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setProgress(0)
    if (timerRef.current) clearInterval(timerRef.current)
    const start = Date.now()
    timerRef.current = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / SLIDES_MS)
      setProgress(p)
      if (p >= 1) setIdx((i) => (i + 1) % slides.length)
    }, 100)
    return () => timerRef.current && clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, language])

  const goPrev = () => setIdx((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIdx((i) => (i + 1) % slides.length)

  const tSlide = slides[idx]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-16 lg:h-20 flex items-center justify-between">
            {/* Logo + Brand */}
            <a href="/" className="flex items-center gap-3 group">
              <Image src="/res/logo.jpg" alt="AIWASON Logo" width={64} height={48} priority className="object-contain" />
              <span className="text-2xl font-black tracking-wide text-gray-900">AIWASON</span>
              <span className="text-xs text-gray-400">®</span>
            </a>

            {/* Nav links */}
            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, value], index) => (
                <motion.a
                  key={key}
                  href={`#${key}`}
                  className="text-gray-700 hover:text-[#76B900] font-medium tracking-wide text-sm relative group transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  {value}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#76B900] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#76B900]/50 rounded-lg px-4 py-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-[#76B900]" />
              <span className="text-sm font-semibold text-gray-700">{language === 'en' ? '中文' : 'EN'}</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* HERO —— 左文更靠左 / 右图更靠右 + 圆环进度 + 上/下按钮 */}
      <section className="relative bg-black pt-14 lg:pt-20 pb-16">
        {/* 背景渐变与网格 */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#76B9000F] to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 items-center gap-6 lg:gap-10">
            {/* 左侧文本：更靠左（负 margin） */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${tSlide.id}-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="col-span-12 lg:col-span-6 xl:col-span-5 lg:-ml-6 xl:-ml-12"
              >
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-white">
                  {tSlide.lines.map((ln, i) => (
                    <span key={i} className="block">{ln}</span>
                  ))}
                </h1>

                <p className="mt-6 text-white/90 text-base lg:text-lg max-w-2xl">{tSlide.subtitle}</p>

                <div className="mt-10 flex flex-col sm:flex-row gap-6">
                  <motion.button
                    className="group bg-[#76B900] text-black font-bold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-3 hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-[#76B900]/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{t.hero.exploreBtn}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>

                  <motion.button
                    className="group border-2 border-gray-600 hover:border-[#76B900] text-white hover:text-[#76B900] font-bold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-3 hover:bg-[#76B900]/10 transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>{t.hero.demoBtn}</span>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 右侧图片：更靠右（ml-auto & 更大） */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${tSlide.id}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.2, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="col-span-12 lg:col-span-6 xl:col-span-7"
              >
                <div className="relative ml-auto w-full max-w-[760px] h-[280px] sm:h-[360px] lg:h-[480px] xl:h-[540px]">
                  <Image src={tSlide.img} alt={language === 'en' ? 'AIWASON Factory' : 'AIWASON 工厂'} fill priority className="object-cover rounded-2xl" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 圆环进度 + 上/下按钮 */}
          <div className="mt-8 lg:mt-10 flex items-center justify-between">
            {/* 圆环集合（可点击） */}
            <div className="flex items-center gap-5">
              {slides.map((s, i) => {
                const filled = i < idx ? 1 : i === idx ? progress : 0
                return (
                  <button
                    key={s.id}
                    onClick={() => setIdx(i)}
                    className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#76B900]"
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <ProgressRing value={filled} active={i === idx} />
                  </button>
                )
              })}
            </div>

            {/* 上一页 / 下一页 */}
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                className="h-10 w-10 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors grid place-items-center"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="h-10 w-10 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors grid place-items-center"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator（可保留） */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 hover:text-[#76B900] transition-colors duration-300 hidden sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* ======= 下面保留你的其它区块（不动）：Stats / Features / Industries / Footer ======= */}

      {/* STATS */}
      <section className="relative bg-gray-900 py-20 border-y border-gray-800">
        <motion.div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {[
            { number: '1000+', label: t.stats.projects, icon: Shield },
            { number: '99.99%', label: t.stats.reliability, icon: Zap },
            { number: '24/7', label: t.stats.monitoring, icon: Brain },
            { number: '50+', label: t.stats.partners, icon: Settings }
          ].map((stat, index) => (
            <motion.div key={stat.label} className="text-center group cursor-pointer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} viewport={{ once: true }} whileHover={{ scale: 1.05, y: -5 }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#76B900]/20 via-[#76B900]/10 to-emerald-500/20 rounded-2xl flex items-center justify-center transition-all duration-300 border border-[#76B900]/30 group-hover:border-[#76B900]/60 shadow-sm group-hover:shadow-lg group-hover:shadow-[#76B900]/20">
                <stat.icon className="w-10 h-10 text-[#76B900] group-hover:text-emerald-300 transition-colors duration-300" />
              </div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-2 group-hover:text-[#76B900] transition-colors duration-300">{stat.number}</div>
              <div className="text-gray-400 text-sm lg:text-base font-semibold tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="relative bg-black py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <motion.div className="relative max-w-7xl mx-auto px-6 lg:px-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
          <div className="text-center mb-20">
            <motion.h2 className="text-5xl lg:text-6xl font-black mb-8 tracking-tight" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="bg-gradient-to-r from-white via-[#76B900] to-emerald-500 bg-clip-text text-transparent">{t.features.title}</span>
            </motion.h2>
            <motion.p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
              {t.features.subtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.features.fireResistant.title, description: t.features.fireResistant.description, icon: Shield, gradient: 'from-red-500/80 to-orange-500/80', border: 'border-red-500/30', bg: 'bg-gray-900/50 hover:bg-gray-800/50' },
              { title: t.features.smartMonitoring.title, description: t.features.smartMonitoring.description, icon: Brain, gradient: 'from-blue-500/80 to-cyan-500/80', border: 'border-blue-500/30', bg: 'bg-gray-900/50 hover:bg-gray-800/50' },
              { title: t.features.highEfficiency.title, description: t.features.highEfficiency.description, icon: Zap, gradient: 'from-[#76B900]/80 to-emerald-500/80', border: 'border-[#76B900]/40', bg: 'bg-gray-900/50 hover:bg-gray-800/50' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`relative ${feature.bg} backdrop-blur-sm border ${feature.border} rounded-2xl p-8 transition-all duration-500 group cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#76B900]/10`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -10 }}
              >
                <div className={`w-20 h-20 mb-8 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 group-hover:text-[#76B900] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* INDUSTRIES */}
      <section className="relative bg-gray-900 py-24">
        <motion.div className="max-w-7xl mx-auto px-6 lg:px-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
          <div className="text-center mb-20">
            <motion.h2 className="text-5xl lg:text-6xl font-black mb-8 tracking-tight" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="bg-gradient-to-r from-white via-[#76B900] to-emerald-500 bg-clip-text text-transparent">{t.industries.title}</span>
            </motion.h2>
            <motion.p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
              {t.industries.subtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: t.industries.realEstate.title, description: t.industries.realEstate.description, icon: '🏢', border: 'border-blue-500/30' },
              { title: t.industries.dataCenter.title, description: t.industries.dataCenter.description, icon: '🏛️', border: 'border-[#76B900]/40' },
              { title: t.industries.smartBuildings.title, description: t.industries.smartBuildings.description, icon: '🏗️', border: 'border-purple-500/30' }
            ].map((industry, index) => (
              <motion.div
                key={industry.title}
                className={`relative overflow-hidden bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border ${industry.border} rounded-2xl p-8 transition-all duration-500 group cursor-pointer shadow-sm hover:shadow-lg hover:shadow-[#76B900]/10`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -10 }}
              >
                <div className="relative z-10">
                  <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                    {industry.icon}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 group-hover:text-[#76B900] transition-colors duration-300">
                    {industry.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">{industry.description}</p>
                  <motion.button
                    className="inline-flex items-center gap-3 bg-[#76B900] text-black font-bold px-6 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:brightness-110"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{language === 'en' ? 'LEARN MORE' : '了解更多'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>
            <motion.button
              className="group bg-[#76B900] text-black font-bold px-12 py-6 rounded-xl flex items-center justify-center gap-4 mx-auto hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-[#76B900]/30 text-xl"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{language === 'en' ? 'REQUEST CONSULTATION' : '申请咨询服务'}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            <p className="text-gray-400 text-lg mt-6">
              {language === 'en' ? 'Get personalized solutions for your mission-critical infrastructure' : '为您的关键基础设施获取个性化解决方案'}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-black border-t border-gray-800 px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <Image src="/res/logo.jpg" alt="AIWASON Logo" width={40} height={30} className="object-contain" />
            <span className="text-2xl font-black tracking-wider text-white">AIWASON</span>
            <span className="text-xs text-gray-400">®</span>
          </div>
          <div className="text-gray-400 text-center md:text-right">
            <p className="text-sm">© 2025 AIWASON. {t.footer.rights}</p>
            <p className="text-xs mt-1">{t.footer.tagline}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
