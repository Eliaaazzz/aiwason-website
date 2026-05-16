'use client'

import { motion } from 'framer-motion'
import { Cpu, Database, Shield, Activity, CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { blurProps } from '@/lib/imageProps'
import LanguageSwitcher from '../common/LanguageSwitcher'
import type { Locale } from '@/lib/i18n'

type Lang = 'en' | 'zh'

const COPY = {
  en: {
    title: 'Data Center Solutions',
    subtitle: 'Intelligent Busbar Systems for Mission-Critical Infrastructure',
    hero: {
      title: 'INTELLIGENT POWER',
      subtitle: 'FOR THE AI ERA',
      description: 'Advanced data center power distribution with integrated intelligent monitoring, based on Siemens SIVACON 8PS LData technology. Delivering 99.99% uptime for mission-critical applications.',
      cta: 'Explore Solutions'
    },
    overview: {
      title: 'Next-Generation Data Center Power Infrastructure',
      description: 'Revolutionary intelligent busbar systems that integrate power transmission with real-time data monitoring. Built on Siemens SIVACON 8PS LData technology, our solutions deliver unprecedented reliability, efficiency, and intelligence for hyperscale and edge computing facilities.',
      stats: [
        { value: '2,500A', label: 'Max Current Capacity' },
        { value: '99.99%', label: 'Uptime Guarantee' },
        { value: '96.2%', label: 'Power Efficiency' },
        { value: '2-Hour', label: 'Fire Resistance' }
      ]
    },
    features: {
      title: 'Advanced Technology Features',
      subtitle: 'Built for the demands of AI and high-performance computing',
      items: [
        {
          icon: Cpu,
          title: 'AI-Powered Monitoring',
          description: 'Real-time analytics with predictive maintenance capabilities, preventing failures before they occur.',
          details: ['24/7 monitoring', 'Anomaly detection', 'Predictive analytics', 'Automated alerts']
        },
        {
          icon: Database,
          title: 'Integrated Power & Data',
          description: 'Revolutionary busbar technology that transmits both electrical power and monitoring data simultaneously.',
          details: ['Dual-purpose transmission', 'Reduced cabling complexity', 'Lower installation costs', 'Enhanced reliability']
        },
        {
          icon: Shield,
          title: 'Fire-Resistant Design',
          description: '2-hour fire resistance rating with advanced flame-retardant materials for maximum safety.',
          details: ['2-hour fire rating', 'Flame-retardant core', 'Emergency isolation', 'Safety compliance']
        },
        {
          icon: Activity,
          title: 'Hot-Swappable Components',
          description: 'Modular design enables maintenance without downtime, ensuring continuous operations.',
          details: ['Zero-downtime maintenance', 'Modular architecture', 'Rapid deployment', 'Scalable design']
        }
      ]
    },
    solutions: {
      title: 'Comprehensive Data Center Solutions',
      items: [
        {
          title: 'Hyperscale Data Centers',
          description: 'Enterprise-grade power distribution for cloud computing, AI training, and large-scale data processing facilities',
          image: '/images/data-center-intelligent-busbar.svg',
          features: ['Up to 2,500A capacity', 'AI workload optimization', 'Liquid cooling integration', 'N+1 redundancy', 'Hot-swappable modules', 'Sub-microsecond monitoring']
        },
        {
          title: 'Edge Computing Centers',
          description: 'Ultra-compact intelligent power solutions for edge deployments with autonomous operation capabilities',
          image: '/res/factory.jpg',
          features: ['Space-efficient design', 'Remote monitoring & control', 'Rapid deployment (<4 hours)', 'Energy optimization algorithms', 'Micro-grid compatibility', '5G-enabled diagnostics']
        },
        {
          title: 'Colocation & Multi-Tenant',
          description: 'Advanced metering and isolation systems for multi-tenant data center environments with granular control',
          image: '/projects/深圳机场.jpg',
          features: ['Multi-tenant isolation', 'Billing-grade metering', 'Dynamic load balancing', 'Security partitioning', 'Real-time cost allocation', 'SLA monitoring']
        },
        {
          title: 'Critical Infrastructure',
          description: 'Mission-critical power systems for financial institutions, government facilities, and healthcare data centers',
          image: '/res/aiwason_fireproof_busbar_hero.png',
          features: ['99.999% availability', 'Disaster-resistant design', 'Compliance ready', 'Emergency protocols', 'Backup integration', 'Audit trail logging']
        }
      ]
    },
    technology: {
      title: 'Technology Partnership',
      subtitle: 'Built on Industry-Leading Platforms',
      partners: [
        {
          name: 'Siemens SIVACON 8PS LData',
          description: 'Advanced busbar trunking system with integrated powerline communication technology',
          features: ['Powerline communication', 'Data transmission', 'Energy transparency', 'Predictive maintenance']
        },
        {
          name: 'Supermicro DCSE Integration',
          description: 'Optimized for Supermicro data center containment and rack solutions',
          features: ['Rack integration', 'Cooling optimization', 'Cable management', 'Environmental monitoring']
        }
      ]
    },
    cta: {
      title: 'Transform Your Data Center Infrastructure',
      description: 'Ready to implement intelligent power distribution? Our experts will design a customized solution for your specific requirements.',
      button: 'Contact Our Experts'
    }
  },
  zh: {
    title: '数据中心解决方案',
    subtitle: '关键基础设施智能母线系统',
    hero: {
      title: '智能配电',
      subtitle: 'AI时代的电力解决方案',
      description: '基于西门子SIVACON 8PS LData技术的先进数据中心配电系统，集成智能监控功能。为关键任务应用提供99.99%正常运行时间保证。',
      cta: '探索解决方案'
    },
    overview: {
      title: '下一代数据中心电力基础设施',
      description: '革命性智能母线系统，集成电力传输与实时数据监控。基于西门子SIVACON 8PS LData技术构建，为超大规模和边缘计算设施提供前所未有的可靠性、效率和智能化水平。',
      stats: [
        { value: '2,500A', label: '最大电流容量' },
        { value: '99.99%', label: '正常运行时间保证' },
        { value: '96.2%', label: '电力效率' },
        { value: '2小时', label: '耐火等级' }
      ]
    },
    features: {
      title: '先进技术特性',
      subtitle: '专为AI和高性能计算需求而构建',
      items: [
        {
          icon: Cpu,
          title: 'AI智能监控',
          description: '实时分析与预测性维护功能，在故障发生前进行预防。',
          details: ['24/7监控', '异常检测', '预测分析', '自动报警']
        },
        {
          icon: Database,
          title: '电力数据一体化',
          description: '革命性母线技术，同时传输电力和监控数据。',
          details: ['双重传输功能', '降低布线复杂度', '降低安装成本', '增强可靠性']
        },
        {
          icon: Shield,
          title: '耐火设计',
          description: '2小时耐火等级，采用先进阻燃材料，确保最大安全性。',
          details: ['2小时耐火等级', '阻燃核心技术', '紧急隔离', '安全合规']
        },
        {
          icon: Activity,
          title: '热插拔组件',
          description: '模块化设计支持无停机维护，确保连续运行。',
          details: ['零停机维护', '模块化架构', '快速部署', '可扩展设计']
        }
      ]
    },
    solutions: {
      title: '全面的数据中心解决方案',
      items: [
        {
          title: '超大规模数据中心',
          description: '企业级配电系统，专为云计算、AI训练和大规模数据处理设施设计',
          image: '/images/data-center-intelligent-busbar.svg',
          features: ['高达2,500A容量', 'AI工作负载优化', '液冷系统集成', 'N+1冗余设计', '热插拔模块', '亚微秒级监控']
        },
        {
          title: '边缘计算中心',
          description: '超紧凑智能电力解决方案，支持边缘部署的自主运行能力',
          image: '/res/factory.jpg',
          features: ['空间高效设计', '远程监控控制', '快速部署(<4小时)', '能源优化算法', '微电网兼容', '5G诊断功能']
        },
        {
          title: '托管与多租户',
          description: '先进计量和隔离系统，为多租户数据中心环境提供精细化控制',
          image: '/projects/深圳机场.jpg',
          features: ['多租户隔离', '计费级精确计量', '动态负载均衡', '安全分区', '实时成本分配', 'SLA监控']
        },
        {
          title: '关键基础设施',
          description: '关键任务电力系统，专为金融机构、政府设施和医疗数据中心设计',
          image: '/res/aiwason_fireproof_busbar_hero.png',
          features: ['99.999%可用性', '抗灾设计', '合规就绪', '应急协议', '备份集成', '审计跟踪记录']
        }
      ]
    },
    technology: {
      title: '技术合作',
      subtitle: '构建在行业领先平台之上',
      partners: [
        {
          name: '西门子SIVACON 8PS LData',
          description: '集成电力线通信技术的先进母线槽系统',
          features: ['电力线通信', '数据传输', '能源透明化', '预测性维护']
        },
        {
          name: '超微DCSE集成',
          description: '针对超微数据中心封装和机架解决方案优化',
          features: ['机架集成', '制冷优化', '线缆管理', '环境监控']
        }
      ]
    },
    cta: {
      title: '改造您的数据中心基础设施',
      description: '准备实施智能配电系统？我们的专家将为您的具体需求设计定制解决方案。',
      button: '联系我们的专家'
    }
  }
} as const

export default function DataCenterPage({ lang = 'zh' as Lang }: { lang?: Locale }) {
  const t = COPY[lang as Lang]

  return (
    <div className="bg-white text-black">
      {/* Header with language toggle */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t.title}</h1>
          <p className="mt-2 text-gray-700">{t.subtitle}</p>
        </div>

        <LanguageSwitcher locale={lang} />
      </section>

      {/* Hero Section with Busbar Image */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 border-t border-[#76B900]/20">
        <div className="pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">
                {t.hero.title}
              </h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight text-[#76B900] mb-6">
                {t.hero.subtitle}
              </h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {t.hero.description}
              </p>
              <button className="bg-[#76B900] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#5a8a00] transition-colors duration-300 inline-flex items-center gap-2">
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gray-50 rounded-2xl p-8">
                <Image
                  src="/images/data-center-intelligent-busbar.svg"
                  alt={lang === 'en' ? 'Intelligent busbar system diagram' : '智能母线系统示意图'}
                  width={600}
                  height={400}
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-4">
              {t.overview.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t.overview.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.overview.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-black text-[#76B900] mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
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
          <p className="text-xl text-gray-600">{t.features.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.features.items.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-[#76B900]/20 p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#76B900] rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{feature.description}</p>
              
              <div className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#76B900]" />
                    <span className="text-sm text-gray-600">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solutions Section */}
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
              {t.solutions.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {t.solutions.items.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={75}
                    className="object-cover"
                    {...blurProps(solution.image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3">{solution.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{solution.description}</p>
                  
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
        </div>
      </section>

      {/* Technology Partnership Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-4">
            {t.technology.title}
          </h2>
          <p className="text-xl text-gray-600">{t.technology.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.technology.partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#76B900] to-[#5a8a00] rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">{partner.name}</h3>
              <p className="mb-6 opacity-90 leading-relaxed">{partner.description}</p>
              
              <div className="grid grid-cols-2 gap-2">
                {partner.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 opacity-80" />
                    <span className="text-sm opacity-90">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              {t.cta.description}
            </p>
            <button className="bg-[#76B900] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#5a8a00] transition-colors duration-300 inline-flex items-center gap-2">
              {t.cta.button}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}