// src/components/home/HomeShell.tsx
'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// hero 静态图
import monitoringSlide from '@/assets/products/ai-monitoring-terminal.png'

// ✅ 完美金鹰广场证书静态导入（防止高度跳变）
import perfectPlazaPrize from '@/assets/images/perfectPlazaPrize.png'

import MediaCarousel, { type MediaCard } from '../news/MediaCarousel'
import NewsSectionsSlideIn, { type NewsGroup } from '../news/NewsSectionsSlideIn'
import HomeNeonFlows from './HomeNeonFlows'

// ---------- 类型 ----------
type ModelSection = {
  id: string
  heading: string
  sub?: string
  intro: string[]
  bullets?: string[]
  cta: { href: string; label: string }
  cards: MediaCard[]
}

// 可选：针对个别图片用 cover 时需要上对齐等
const OBJECT_POSITION_OVERRIDES: Record<string, string> = {
  // 例：'urban-qhih-1': 'top',
}

// 识别"奖项/证书"用的正则
const IS_AWARD = /award|prize|LEED|证书|获奖/i

// ---------------- EN (refined, professional) ----------------
const MODEL_SECTIONS_EN: ModelSection[] = [
  {
    id: 'data-centers',
    heading: 'Data Centers',
    sub: 'Qianhai Information Hub',
    intro: ['Tier-IV oriented dual-bus architecture with fiber-optic condition monitoring for continuous uptime.'],
    bullets: [
      'Independent dual busbars and sectionalization',
      'Digital twin prepared for liquid-cooling expansion',
      'Unified dashboard for energy and emergency response',
    ],
    cta: { href: '/news/data-center', label: 'Explore Data Center Story' },
    cards: [
      { id: 'dc-case', title: '', href: '/news/data-center', img: '/res/前海信息枢纽中心.jpg' },
      { id: 'dc-award', title: '', href: '/news/data-center', img: '/res/数据中心获奖.png' },
    ],
  },

  {
    id: 'chip-center',
    heading: 'Global Chip Centers',
    sub: 'Shenzhen Global Intelligent Chip Center',
    intro: ['High-density power distribution for semiconductor fabrication with ultra-clean supply and real-time monitoring.'],
    bullets: ['Clean power for sensitive chip production', 'Redundant backbone for 24/7 operations', 'Smart monitoring for equipment protection'],
    cta: { href: '/news/chip-center', label: 'Chip Center Case' },
    cards: [{ id: 'chip-center-project', title: '', href: '/news/chip-center', img: '/res/深圳全球智能芯片中心.jpg' }],
  },
 
  {
    id: 'manufacturing',
    heading: 'Large-scale Manufacturing',
    sub: 'BYD Intelligent Manufacturing Campus',
    intro: ['6300 A busway supplies stamping, battery and final assembly with headroom for ramp-up.'],
    bullets: ['IP54 tap-offs for harsh bays', 'Arc-fault detection and isolation', 'Modular sections for quick expansion'],
    cta: { href: '/news/byd-smart-factory', label: 'View Manufacturing Case' },
    cards: [{ id: 'factory-project', title: '', href: '/news/byd-smart-factory', img: '/res/深圳比亚迪—A.jpg' }],
  },
  {
    id: 'conference',
    heading: 'Conference Centers',
    sub: 'Qianhai International Conference Center',
    intro: ['Redundant low-noise backbone supporting VIP summits and live broadcast operations.'],
    bullets: ['Multi-hall looped redundancy', 'Scene presets with smart tap-offs', 'Maintainability without service interruption'],
    cta: { href: '/events/datacenter-summit', label: 'Meet Global Leaders' },
    cards: [
      { id: 'conference-project', title: '', href: '/events/datacenter-summit', img: '/res/conference.jpg' },
      { id: 'conference-award', title: '', href: '/events/datacenter-summit', img: '/res/横琴口岸鲁班奖.png' },
    ],
  },

  // 6 个子项目（每个都是"大图轮播"，一次只显示一张）
  {
    id: 'urban-zhongshan',
    heading: 'Large Urban Complexes',
    sub: 'Zhongshan Perfect Golden Eagle Plaza',
    intro: ['Fire-rated ring bus serves mall, offices and hotel with maintenance possible under load.'],
    cta: { href: '/news/zhongshan-perfect-plaza', label: 'Explore Case' },
    cards: [
      { id: 'urban-zhongshan-1', title: '', href: '/news/zhongshan-perfect-plaza', img: '/res/zhonshan%20perfect%20plaza.jpg' },
      { id: 'urban-zhongshan-2', title: '', href: '/news/zhongshan-perfect-plaza', img: perfectPlazaPrize },
    ],
  },
  {
    id: 'urban-qianhai-exchange',
    heading: 'Large Urban Complexes',
    sub: 'Qianhai Exchange Plaza',
    intro: ['Backbone retrofit delivered in phases while trading floors remained in service.'],
    cta: { href: '/news/qianhai-trading-plaza', label: 'Explore Case' },
    cards: [
      { id: 'urban-qianhai-1', title: '', href: '/news/qianhai-trading-plaza', img: '/res/前海交易广场.jpg' },
      { id: 'urban-qianhai-2', title: '', href: '/news/qianhai-trading-plaza', img: '/res/前海交易广场获奖.jpg' },
    ],
  },
  {
    id: 'urban-qhih',
    heading: 'Large Urban Complexes',
    sub: 'Qianhai Holding Investment Tower',
    intro: ['Intelligent ring supports HQ offices and cultural venues with reserved capacity for future fit-outs.'],
    cta: { href: '/news/qianhai-holding-investment', label: 'Explore Case' },
    cards: [
      { id: 'urban-qhih-1', title: '', href: '/news/qianhai-holding-investment', img: '/res/前海投控大厦.jpg' },
      { id: 'urban-qhih-2', title: '', href: '/news/qianhai-holding-investment', img: '/res/qianhai-investment-prize.png' },
    ],
  },
  {
    id: 'urban-guangzhou',
    heading: 'Large Urban Complexes',
    sub: 'Guangzhou Smart Park',
    intro: ['Campus busways enable flexible lab and office layouts with transparent energy data.'],
    cta: { href: '/news/guangzhou-smart-park', label: 'Explore Case' },
    cards: [
      { id: 'urban-guangzhou-1', title: '', href: '/news/guangzhou-smart-park', img: '/res/广州新一代技术信息产业园.jpg' },
      { id: 'urban-guangzhou-2', title: '', href: '/news/guangzhou-smart-park', img: '/res/世界智慧城市大奖.jpg' },
    ],
  },
  {
    id: 'urban-dongguan',
    heading: 'Large Urban Complexes',
    sub: 'Dongguan Minying International Trade Center',
    intro: ['LEED-aligned upgrade with circuit-level metering and modular capacity additions.'],
    cta: { href: '/news/dongguan-minying', label: 'Explore Case' },
    cards: [
      { id: 'urban-dongguan-1', title: '', href: '/news/dongguan-minying', img: '/res/东莞民盈国贸.jpg' },
      { id: 'urban-dongguan-2', title: '', href: '/news/dongguan-minying', img: '/res/东莞民盈国贸美国LEED.jpg' },
      { id: 'urban-dongguan-3', title: '', href: '/news/dongguan-minying', img: '/res/东莞民盈国贸美国LEED2.jpg' },
      { id: 'urban-dongguan-4', title: '', href: '/news/dongguan-minying', img: '/res/东莞民盈国贸LEED证书.jpg' },
    ],
  },
  {
    id: 'urban-mixc',
    heading: 'Large Urban Complexes',
    sub: 'The MixC Flagship Complex',
    intro: ['Flagship site designed for weekend peaks and efficient weekday operations.'],
    cta: { href: '/news/mixc-complex', label: 'Explore Case' },
    cards: [
      { id: 'urban-mixc-1', title: '', href: '/news/mixc-complex', img: '/res/万象汇.jpeg' },
      { id: 'urban-mixc-2', title: '', href: '/news/mixc-complex', img: '/res/东莞民盈国贸美国LEED2.jpg' },
    ],
  },

  // Others
  {
    id: 'banking',
    heading: 'Banking',
    sub: 'Shenzhen China Construction Bank Tower',
    intro: ['Dual redundancy with biometric interlocks secures trading floors and vault branches.'],
    bullets: ['Biometric-controlled critical tap-offs', '2-hour fire-rated vault branches with thermal sensing'],
    cta: { href: '/news/shenzhen-ccb-tower', label: 'CCB Tower' },
    cards: [{ id: 'bank-ccb', title: '', href: '/news/shenzhen-ccb-tower', img: '/res/浦发银行总部大厦.jpg' }],
  },
  {
    id: 'residential',
    heading: 'Residential',
    sub: 'Qianhai Talent Apartments',
    intro: ['Low-loss, low-noise distribution with BIM-linked O&M for quality living.'],
    bullets: ['Tenant-level metering and prepay', 'QR-linked asset records for faster maintenance'],
    cta: { href: '/news/qianhai-talents-apartments', label: 'Talent Apartments' },
    cards: [
      { id: 'res-project', title: '', href: '/news/qianhai-talents-apartments', img: '/res/gallery-53.jpg' },
      { id: 'res-award-bim', title: '', href: '/news/qianhai-talents-apartments', img: '/res/前海玲珑湾获奖.png' },
      { id: 'res-award-steel', title: '', href: '/news/qianhai-talents-apartments', img: '/res/前海玲珑湾结构金奖.png' },
    ],
  },
  {
    id: 'airports',
    heading: 'Airports',
    sub: 'Shenzhen Bao\'an International Airport',
    intro: ['Fire-rated busways link terminals, data rooms and baggage systems for 24/7 operation.'],
    bullets: ['Terminal and airside redundancy', 'Condition monitoring of critical loads'],
    cta: { href: '/news/airport-upgrade', label: 'Airport Upgrade' },
    cards: [{ id: 'airport-project', title: '', href: '/news/airport-upgrade', img: '/res/gallery-46.jpg' }],
  },
  {
    id: 'transport',
    heading: 'Transport Hubs',
    sub: 'Hengqin Port Hub',
    intro: ['Integrated backbone for port/metro/bus with egress lighting and control-room visibility.'],
    bullets: ['Redundant rings across all modes', 'Fiber sensing back to the command center'],
    cta: { href: '/news/hengqin-port-hub', label: 'Hengqin Port Hub' },
    cards: [
      { id: 'transport-project', title: '', href: '/news/hengqin-port-hub', img: '/res/横琴口岸综合交通枢纽.jpg' },
      { id: 'transport-award', title: '', href: '/news/hengqin-port-hub', img: '/res/横琴口岸鲁班奖.png' },
    ],
  },
  {
    id: 'hsr',
    heading: 'High-speed Rail',
    sub: 'High-speed Rail (Nanfang Xinhui Factory)',
    intro: ['Marine-grade, vibration-damped busways with AI diagnostics for coastal environments.'],
    bullets: ['Weatherproof, vibration-damped encapsulation', 'AI-assisted work orders from fiber data'],
    cta: { href: '/news/hsr-nanfang-xinhui', label: 'Railway Factory' },
    cards: [{ id: 'hsr-project', title: '', href: '/news/hsr-nanfang-xinhui', img: '/res/高铁南站.jpg' }],
  },
  {
    id: 'culture',
    heading: 'Cultural Facilities',
    sub: 'Poly Theater',
    intro: ['Low-noise, fire-rated backbone serving stage power, FOH and broadcast with quick turnarounds.'],
    bullets: ['Isolated feeds for audio, lighting and rigging', 'Zone-level metering for event settlement'],
    cta: { href: '/news/poly-theater', label: 'Poly Theater Showcase' },
    cards: [
      { id: 'poly-theater-exterior', title: '', href: '/news/poly-theater', img: '/res/国家大剧院.jpg' },
      { id: 'poly-theater-hall', title: '', href: '/news/poly-theater', img: '/res/gallery-39.jpg' },
    ],
  },
]

// ---------------- ZH（专业、克制）----------------
const MODEL_SECTIONS_ZH: ModelSection[] = [
  {
    id: 'data-centers',
    heading: '数据中心',
    sub: '前海信息枢纽中心',
    intro: ['面向 Tier IV 的双母线架构，结合光纤状态监测，确保关键机房持续运行。'],
    bullets: ['独立双路母线与分段切换', '预留液冷扩容的数字孪生', '能源与应急信息统一看板'],
    cta: { href: '/news/data-center', label: '查看数据中心案例' },
    cards: [
      { id: 'dc-case', title: '', href: '/news/data-center', img: '/res/前海信息枢纽中心.jpg' },
      { id: 'dc-award', title: '', href: '/news/data-center', img: '/res/数据中心获奖.png' },
    ],
  },
  {
    id: 'chip-center',
    heading: '芯片中心',
    sub: '深圳全球智能芯片中心',
    intro: ['为半导体制造提供高密度配电，超洁净供电结合实时监控，保障芯片生产环境。'],
    bullets: ['洁净电力适配敏感芯片生产', '冗余骨干支撑24/7运行', '智能监测保护设备安全'],
    cta: { href: '/news/chip-center', label: '芯片中心案例' },
    cards: [{ id: 'chip-center-project', title: '', href: '/news/chip-center', img: '/res/深圳全球智能芯片中心.jpg' }],
  },
  {
    id: 'manufacturing',
    heading: '大型制造',
    sub: '比亚迪智能制造园区',
    intro: ['6300A 母线覆盖冲压、电池与总装车间，满足产线爬坡与稳定供电需求。'],
    bullets: ['IP54 分接箱适配车间环境', '电弧故障检测与隔离', '模块化段件便于扩容改造'],
    cta: { href: '/news/byd-smart-factory', label: '查看制造案例' },
    cards: [{ id: 'factory-project', title: '', href: '/news/byd-smart-factory', img: '/res/深圳比亚迪—A.jpg' }],
  },


  {
    id: 'conference',
    heading: '会议中心',
    sub: '前海国际会议中心',
    intro: ['冗余、低噪声电力骨干，支撑高规格会议与直播演播的稳定运行。'],
    bullets: ['多会场环网冗余', '情景化智能分接与预案', '检修可不中断供电'],
    cta: { href: '/events/datacenter-summit', label: '走进行业峰会' },
    cards: [
      { id: 'conference-project', title: '', href: '/events/datacenter-summit', img: '/res/conference.jpg' },
      { id: 'conference-award', title: '', href: '/events/datacenter-summit', img: '/res/横琴口岸鲁班奖.png' },
    ],
  },


  // 六个子项目
  {
    id: 'urban-zhongshan',
    heading: '大型城市综合体',
    sub: '中山完美金鹰广场',
    intro: ['耐火环网覆盖商业、办公与酒店，具备带电检修能力。'],
    cta: { href: '/news/zhongshan-perfect-plaza', label: '查看项目' },
    cards: [
      { id: 'urban-zhongshan-1', title: '', href: '/news/zhongshan-perfect-plaza', img: '/res/zhonshan%20perfect%20plaza.jpg' },
      { id: 'urban-zhongshan-2', title: '', href: '/news/zhongshan-perfect-plaza', img: perfectPlazaPrize },
    ],
  },
  {
    id: 'urban-qianhai-exchange',
    heading: '大型城市综合体',
    sub: '前海交易广场',
    intro: ['分期实施主干改造，交易功能全程保持对外运营。'],
    cta: { href: '/news/qianhai-trading-plaza', label: '查看项目' },
    cards: [
      { id: 'urban-qianhai-1', title: '', href: '/news/qianhai-trading-plaza', img: '/res/前海交易广场.jpg' },
      { id: 'urban-qianhai-2', title: '', href: '/news/qianhai-trading-plaza', img: '/res/前海交易广场获奖.jpg' },
    ],
  },
  {
    id: 'urban-qhih',
    heading: '大型城市综合体',
    sub: '前海投控大厦',
    intro: ['智能环网服务总部空间，预留扩展容量，切换无感知。'],
    cta: { href: '/news/qianhai-holding-investment', label: '查看项目' },
    cards: [
      { id: 'urban-qhih-1', title: '', href: '/news/qianhai-holding-investment', img: '/res/前海投控大厦.jpg' },
      { id: 'urban-qhih-2', title: '', href: '/news/qianhai-holding-investment', img: '/res/qianhai-investment-prize.png' },
    ],
  },
  {
    id: 'urban-guangzhou',
    heading: '大型城市综合体',
    sub: '广州智慧园区',
    intro: ['园区级母线支撑实验室与办公灵活布局，能耗数据可视可用。'],
    cta: { href: '/news/guangzhou-smart-park', label: '查看项目' },
    cards: [
      { id: 'urban-guangzhou-1', title: '', href: '/news/guangzhou-smart-park', img: '/res/广州新一代技术信息产业园.jpg' },
      { id: 'urban-guangzhou-2', title: '', href: '/news/guangzhou-smart-park', img: '/res/世界智慧城市大奖.jpg' },
    ],
  },
  {
    id: 'urban-dongguan',
    heading: '大型城市综合体',
    sub: '东莞民盈国贸中心',
    intro: ['按美国LEED 理念进行电力升级：回路级计量，模块化扩容路径清晰。'],
    cta: { href: '/news/dongguan-minying', label: '查看项目' },
    cards: [
      { id: 'urban-dongguan-1', title: '', href: '/news/dongguan-minying', img: '/res/东莞民盈国贸.jpg' },
      { id: 'urban-dongguan-2', title: '', href: '/news/dongguan-minying', img: '/res/东莞民盈国贸美国LEED.jpg' },
      { id: 'urban-dongguan-3', title: '', href: '/news/dongguan-minying', img: '/res/东莞民盈国贸美国LEED2.jpg' },
      { id: 'urban-dongguan-4', title: '', href: '/news/dongguan-minying', img: '/res/东莞民盈国贸LEED证书.jpg' },
    ],
  },
  {
    id: 'urban-mixc',
    heading: '大型城市综合体',
    sub: '万象旗舰综合体',
    intro: ['面向周末客流峰值与工作日效率的双目标设计，保障运营与能效。'],
    cta: { href: '/news/mixc-complex', label: '查看项目' },
    cards: [
      { id: 'urban-mixc-1', title: '', href: '/news/mixc-complex', img: '/res/万象汇.jpeg' },
      { id: 'urban-mixc-2', title: '', href: '/news/mixc-complex', img: '/res/东莞民盈国贸美国LEED2.jpg' },
    ],
  },

  // 其他
  {
    id: 'banking',
    heading: '银行系统',
    sub: '深圳建行大厦',
    intro: ['双路冗余并结合生物识别联动，保障交易大厅与金库支路的安全与连续性。'],
    bullets: ['关键分接点生物识别联动', '金库支路 2 小时耐火并带温度监测'],
    cta: { href: '/news/shenzhen-ccb-tower', label: '深圳建行大厦' },
    cards: [{ id: 'bank-ccb', title: '', href: '/news/shenzhen-ccb-tower', img: '/res/浦发银行总部大厦.jpg' }],
  },
  {
    id: 'residential',
    heading: '住宅社区',
    sub: '前海人才公寓',
    intro: ['低损耗、低噪声供配电，BIM 贯通资产与运维，提升居住质量。'],
    bullets: ['租户级计量与预付费', '二维码资产关联，运维闭环更快'],
    cta: { href: '/news/qianhai-talents-apartments', label: '人才公寓案例' },
    cards: [
      { id: 'res-project', title: '', href: '/news/qianhai-talents-apartments', img: '/res/gallery-53.jpg' },
      { id: 'res-award-bim', title: '', href: '/news/qianhai-talents-apartments', img: '/res/前海玲珑湾获奖.png' },
      { id: 'res-award-steel', title: '', href: '/news/qianhai-talents-apartments', img: '/res/前海玲珑湾结构金奖.png' },
    ],
  },
  {
    id: 'airports',
    heading: '机场',
    sub: '深圳宝安机场',
    intro: ['耐火智能光电母线联通航站区、机房与行李系统，适配 24/7 运行场景。'],
    bullets: ['航站与空侧冗余架构', '关键负载状态监测'],
    cta: { href: '/news/airport-upgrade', label: '机场升级案例' },
    cards: [{ id: 'airport-project', title: '', href: '/news/airport-upgrade', img: '/res/gallery-46.jpg' }],
  },
  {
    id: 'transport',
    heading: '交通枢纽',
    sub: '横琴口岸综合枢纽',
    intro: ['口岸/地铁/巴士共用一体化电力骨干，疏散照明与指挥中心联动可视。'],
    bullets: ['多方式环网冗余', '光纤感知直达中控'],
    cta: { href: '/news/hengqin-port-hub', label: '横琴口岸综合枢纽' },
    cards: [
      { id: 'transport-project', title: '', href: '/news/hengqin-port-hub', img: '/res/横琴口岸综合交通枢纽.jpg' },
      { id: 'transport-award', title: '', href: '/news/hengqin-port-hub', img: '/res/横琴口岸鲁班奖.png' },
    ],
  },
  {
    id: 'hsr',
    heading: '高铁',
    sub: '高铁（南方新会工厂）',
    intro: ['船级封装与减振设计适应近海环境，辅以 AI 诊断提升检修效率。'],
    bullets: ['耐候减振封装', '基于光纤数据的工单辅助'],
    cta: { href: '/news/hsr-nanfang-xinhui', label: '高铁南方工厂案例' },
    cards: [{ id: 'hsr-project', title: '', href: '/news/hsr-nanfang-xinhui', img: '/res/高铁南站.jpg' }],
  },
  {
    id: 'culture',
    heading: '文化设施',
    sub: '保利剧院',
    intro: ['面向演出与排练的低噪声耐火母线，覆盖舞台、前场与录播系统，支持快速切换。'],
    bullets: ['音频/灯光/吊装分路隔离', '分区计量便于演出结算'],
    cta: { href: '/news/poly-theater', label: '保利剧院案例' },
    cards: [
      { id: 'poly-theater-exterior', title: '', href: '/news/poly-theater', img: '/res/国家大剧院.jpg' },
      { id: 'poly-theater-hall', title: '', href: '/news/poly-theater', img: '/res/gallery-39.jpg' },
    ],
  },
]

// 语言映射
const MODEL_SECTIONS: Record<'en' | 'zh', ModelSection[]> = {
  en: MODEL_SECTIONS_EN,
  zh: MODEL_SECTIONS_ZH,
}

// ------- 文案与常量 -------
const LOGO_SRC = '/res/logo.png'
const BACKGROUND_IMG = '/res/background.png'

const translations = {
  en: {
    nav: { products: 'PRODUCTS', news: 'NEWS', solutions: 'SOLUTIONS', about: 'ABOUT', contact: 'CONTACT' },
    hero: {
      title1: 'FIRE-RESISTANT',
      title2: 'INTELLIGENT OPTOELECTRONIC',
      title3: 'BUSBARS',
      subtitle:
        'Powering the future of data centers and real estate with revolutionary fire-resistant intelligent optoelectronic busbar technology.',
      exploreBtn: 'EXPLORE PRODUCTS',
    },
    features: {
      smartMonitoring: { title: 'AI-POWERED MONITORING', description: 'Real-time analytics with predictive maintenance' },
      highEfficiency: { title: 'ULTRA-HIGH EFFICIENCY', description: 'Reduces operational costs and environmental impact' },
      fireResistant: { title: 'FIRE-RESISTANT CORE', description: '2-hour fire resistance rating' },
    },
  },
  zh: {
    nav: { products: '产品中心', news: '新闻动态', solutions: '解决方案', about: '关于我们', contact: '联系我们' },
    hero: {
      title1: '耐火', title2: '智能光电', title3: '母线系统',
      subtitle: '革命性耐火智能光电母线技术，为数据中心和房地产行业提供未来动力。',
      exploreBtn: '产品展示',
    },
    features: {
      smartMonitoring: { title: 'AI智能监控', description: '实时分析与预测性维护' },
      highEfficiency: { title: '超高效率', description: '降低运营成本与环境影响' },
      fireResistant: { title: '耐火核心技术', description: '2 小时耐火等级' },
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

  // hero slides
  const slides = useMemo(
    () => [
      {
        id: 0,
        lines: language === 'en' ? ['FIRE-RESISTANT', 'INTELLIGENT', 'PHOTOELECTRIC BUSBARS'] : ['耐火', '智能光电', '母线系统'],
        subtitle: t.hero.subtitle,
        img: '/res/company.jpg',
        bg: BACKGROUND_IMG,
      },
      {
        id: 1,
        lines: language === 'en' ? ['AI-POWERED', 'REAL-TIME', 'MONITORING'] : ['AI智能监控', '实时分析', '预测维护'],
        subtitle: t.features.smartMonitoring.description,
        img: monitoringSlide,
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
        img: '/res/aiwason_fireproof_busbar_hero.png',
        bg: BACKGROUND_IMG,
      },
      {
        id: 4,
        lines: language === 'en' ? ['SMART', 'BUILDINGS', 'READY'] : ['面向', '智能建筑', '应用'],
        subtitle: language === 'en' ? 'Designed for IoT-enabled facilities with intelligent building management.' : '为物联网与智能楼控系统而生。',
        img: '/res/company.jpg',
        bg: BACKGROUND_IMG,
      },
    ],
    [language, t.hero.subtitle, t.features.smartMonitoring.description, t.features.highEfficiency.description, t.features.fireResistant.description],
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
      news: `/news?lang=${language}`,
      solutions: `/solutions?lang=${language}`,
      about: `/about?lang=${language}`,
      contact: `/contact?lang=${language}`,
    }),
    [language]
  )

  const modelSections: ModelSection[] = useMemo(() => MODEL_SECTIONS[language] ?? MODEL_SECTIONS.en, [language])
  const newsGroups: NewsGroup[] = useMemo(() => [], [language])

  // 把奖图标记为 contain，项目图 cover；容器高度统一为"大图"
  const prepareCards = useCallback((cards: MediaCard[]): MediaCard[] => {
    return cards.map((c) => {
      const srcText = typeof c.img === 'string' ? c.img : (c.img as any)?.src ?? ''
      const isAward = IS_AWARD.test(`${c.id} ${srcText}`)
      const objectPosition = OBJECT_POSITION_OVERRIDES[c.id]
      return {
        ...c,
        title: '',
        fit: isAward ? 'contain' : 'cover',
        ...(objectPosition ? { objectPosition } : {}),
      } as MediaCard
    })
  }, [])

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
                const map = {
                  news: navHref.news,
                  products: navHref.products,
                  solutions: navHref.solutions,
                  about: navHref.about,
                  contact: navHref.contact,
                } as const
                const href = (map as any)[key] ?? '#'
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
              <span className="text-sm font-semibold text-gray-700">{language === 'en' ? '中文' : 'EN'}</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* hero */}
      <section className="bg-neutral-950 text-white">
        <HomeNeonFlows
          key={idx}
          lang={language}
          imageSrc={tSlide.img}
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

      {/* 顶部浅绿色分隔条 */}
      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* sections */}
      <div className="space-y-16 lg:space-y-20 py-16">
        {modelSections.map((section) => {
          const briefIntro = section.intro.length ? [section.intro[0]] : []
          const cards = prepareCards(section.cards)

          return (
            <div key={section.id}>
              <section className="bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                  <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start">
                    {/* 左侧文字 */}
                    <div className="space-y-6">
                      <header className="space-y-3">
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900">
                          {section.heading}
                        </h2>
                        {section.sub ? (
                          <p className="text-base lg:text-lg font-semibold text-gray-700">
                            {section.sub}
                          </p>
                        ) : null}

                        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                          {briefIntro.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>

                        {section.bullets?.length ? (
                          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                            {section.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}

                        <div className="pt-2">
                          <Link
                            href={`${section.cta.href}?lang=${language}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-white shadow hover:brightness-110 transition"
                          >
                            {section.cta.label}
                          </Link>
                        </div>
                      </header>
                    </div>

                    {/* 右侧：统一大尺寸容器；项目=cover，奖状=contain（完整展示） */}
                    <div className="relative">
                      <MediaCarousel
                        title=""
                        items={cards}
                        lang={language}
                        imageOnly
                        frameless
                        hideHeader
                        controlsOverlay
                        controlsVariant="brand"
                        // 恢复为"大图"视觉（容器高度统一）
                        imageHeightClass="h-[560px] md:h-[640px] lg:h-[740px]"
                        cardWidthClass="min-w-[88vw] sm:min-w-[70vw] lg:min-w-[820px] lg:max-w-[820px]"
                        roundedClass=""
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 每个 section 底部分隔条 */}
              <div className="h-1 w-full bg-[#cde9aa] mt-10" aria-hidden="true" />
            </div>
          )
        })}
      </div>

      {/* 新闻占位 */}
      <NewsSectionsSlideIn lang={language} groups={newsGroups} showMetaLabel={false} />
    </div>
  )
}