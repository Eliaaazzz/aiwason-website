'use client'

import { motion } from 'framer-motion'
import { Globe, Building2, Server, Zap, Shield, Brain, Gauge } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Image from 'next/image'
import { blurProps } from '@/lib/imageProps'

type Lang = 'en' | 'zh'

const COPY = {
  en: {
    title: 'Solutions',
    strap: 'Comprehensive power distribution solutions for modern infrastructure.',
    hero: {
      title: 'INTELLIGENT POWER',
      subtitle: 'DISTRIBUTION SOLUTIONS',
      description: 'From data centers to luxury hotels, our fire-resistant intelligent optoelectronic busbar systems deliver unmatched safety, efficiency, and smart monitoring capabilities.',
    },
    solutions: [
      {
        id: 'datacenter',
        title: 'Data Center Solutions',
        description: 'Mission-critical power infrastructure with AI-powered monitoring and predictive maintenance for 99.99% uptime.',
        features: ['AI-Powered Monitoring', 'Predictive Maintenance', 'Real-time Analytics', 'Hot-swappable Components'],
        image: '/res/factory.jpg',
        icon: Server,
      },
      {
        id: 'commercial',
        title: 'Commercial Buildings',
        description: 'Smart power distribution for high-rise buildings and commercial towers with energy efficiency optimization.',
        features: ['Energy Management', 'Smart Load Distribution', 'Remote Monitoring', 'Automated Controls'],
        image: '/projects/厦门世茂海峡大厦.jpg',
        icon: Building2,
      },
      {
        id: 'hospitality',
        title: 'Hospitality & Hotels',
        description: 'Premium power solutions for luxury hotels ensuring guest comfort and operational efficiency.',
        features: ['Guest Experience Priority', 'Energy Efficiency', 'Silent Operation', 'Luxury Integration'],
        image: '/projects/深圳-大中华喜来登酒店.jpg',
        icon: Building2,
      },
      {
        id: 'infrastructure',
        title: 'Transportation Infrastructure',
        description: 'Robust power systems for airports, railway stations, and metro systems with highest safety standards.',
        features: ['Fire-Resistant Core', 'High Reliability', 'Rapid Installation', 'Minimal Maintenance'],
        image: '/projects/深圳机场.jpg',
        icon: Zap,
      },
    ],
    features: {
      title: 'Why Choose AIWASON Solutions',
      items: [
        {
          icon: Shield,
          title: 'Fire-Resistant Technology',
          description: '2-hour fire resistance rating with advanced flame-retardant materials for maximum safety.',
        },
        {
          icon: Brain,
          title: 'AI-Powered Intelligence',
          description: 'Smart monitoring systems with predictive analytics and automated fault detection.',
        },
        {
          icon: Gauge,
          title: 'Ultra-High Efficiency',
          description: 'Industry-leading power efficiency reduces operational costs and environmental impact.',
        },
      ],
    },
  },
  zh: {
    title: '解决方案',
    strap: '为现代基础设施提供全面的配电解决方案。',
    hero: {
      title: '智能配电',
      subtitle: '解决方案',
      description: '从数据中心到豪华酒店，我们的耐火智能光电母线系统提供无与伦比的安全性、效率和智能监控能力。',
    },
    solutions: [
      {
        id: 'datacenter',
        title: '数据中心解决方案',
        description: '关键任务电力基础设施，配备AI智能监控和预测性维护，确保99.99%正常运行时间。',
        features: ['AI智能监控', '预测性维护', '实时分析', '热插拔组件'],
        image: '/res/factory.jpg',
        icon: Server,
      },
      {
        id: 'commercial',
        title: '商业建筑',
        description: '高层建筑和商业大厦的智能配电系统，优化能源效率。',
        features: ['能源管理', '智能负载分配', '远程监控', '自动控制'],
        image: '/projects/厦门世茂海峡大厦.jpg',
        icon: Building2,
      },
      {
        id: 'hospitality',
        title: '酒店业',
        description: '豪华酒店的高端电力解决方案，确保客人舒适和运营效率。',
        features: ['客户体验优先', '节能高效', '静音运行', '豪华集成'],
        image: '/projects/深圳-大中华喜来登酒店.jpg',
        icon: Building2,
      },
      {
        id: 'infrastructure',
        title: '交通基础设施',
        description: '机场、火车站和地铁系统的强大电力系统，具有最高安全标准。',
        features: ['耐火核心技术', '高可靠性', '快速安装', '免维护设计'],
        image: '/projects/深圳机场.jpg',
        icon: Zap,
      },
    ],
    features: {
      title: '为什么选择艾默森解决方案',
      items: [
        {
          icon: Shield,
          title: '耐火技术',
          description: '2小时耐火等级，采用先进阻燃材料，确保最大安全性。',
        },
        {
          icon: Brain,
          title: 'AI智能技术',
          description: '智能监控系统，具备预测分析和自动故障检测功能。',
        },
        {
          icon: Gauge,
          title: '超高效率',
          description: '行业领先的电力效率，降低运营成本和环境影响。',
        },
      ],
    },
  },
} as const

export default function SolutionsSection() {
  const router = useRouter()
  const sp = useSearchParams()
  const pathname = usePathname()

  const lang: Lang = (sp.get('lang') as Lang) || 'en'
  const t = COPY[lang]

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'zh' : 'en'
    const params = new URLSearchParams(sp.toString())
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="bg-white text-black">
      {/* Header with language toggle */}
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 border-t border-[#76B900]/20">
        <div className="pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-4">
              {t.hero.title}
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-[#76B900] mb-8">
              {t.hero.subtitle}
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl border border-[#76B900]/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  {...blurProps(solution.image)}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 bg-[#76B900] rounded-xl flex items-center justify-center">
                    <solution.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black mb-4">{solution.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{solution.description}</p>
                
                <div className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#76B900] rounded-full" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-4">
              {t.features.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#76B900] rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#76B900] to-[#5a8a00] rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            {lang === 'en' ? 'Ready to Transform Your Infrastructure?' : '准备改造您的基础设施？'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {lang === 'en' 
              ? 'Contact our experts to discuss your specific requirements and get a customized solution.'
              : '联系我们的专家，讨论您的具体需求并获得定制解决方案。'
            }
          </p>
          <button className="bg-white text-[#76B900] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors duration-300">
            {lang === 'en' ? 'Contact Our Experts' : '联系我们的专家'}
          </button>
        </motion.div>
      </section>
    </div>
  )
}