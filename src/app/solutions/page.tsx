// src/app/solutions/page.tsx
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'
import CardImage from '@/components/common/CardImage'

import frBusduct from '@/assets/products/fr-busduct.png'

import heroPng from '@/assets/solutions/aiwason-solution-hero.png'
import analyticsHeatmapPng from '@/assets/solutions/aiwason-analytics-heatmap.png'
import alertDispatchPng from '@/assets/solutions/aiwason-alert-dispatch.png'
import modularBuswayPng from '@/assets/solutions/aiwason-modular-busway.png'
import tapoffPanelPng from '@/assets/solutions/aiwason-tapoff-panel.png'
import operationMgmtPng from '@/assets/solutions/operation-management.png'
import planMgmtPng from '@/assets/solutions/plan-management.png'
import historicalAnalyticsPng from '@/assets/solutions/aiwason-historical-analytics.png'

import conductorPng from '@/assets/solutions/bus-conductor.png'
import insulationSleevePng from '@/assets/solutions/insulation-sleeve.png'
import reportManagementPng from '@/assets/solutions/report-management.png'

import dataCenterHeroImg from '@/../public/res/数据中心/WechatIMG271.jpeg'
import dataCenterHallImg from '@/../public/res/数据中心/WechatIMG272.jpeg'
import productionLineImg from '@/../public/res/数据中心/WechatIMG274.jpeg'
import dataCenterDiagramImg from '@/../public/res/产品图片/智能母线/母线系统整体结构示意图.png'
import dcGalleryOverviewImg from '@/../public/res/数据中心/Screenshot 2025-10-16 at 16.12.02.png'
import dcGalleryAlarmsImg from '@/../public/res/数据中心/Screenshot 2025-10-16 at 16.13.02.png'
import dcGalleryEnergyImg from '@/../public/res/数据中心/Screenshot 2025-10-16 at 16.13.16.png'
import dcGalleryMaintenanceImg from '@/../public/res/数据中心/Screenshot 2025-10-16 at 16.13.24.png'


export const metadata = {
  title: 'Solutions | AIWASON',
  description: 'AIWASON intelligent busbar solutions covering cloud platform operations and data center systems.',
}

type SearchParams = { [key: string]: string | string[] | undefined }
type Lang = 'en' | 'zh'
type Localised<T> = { en: T; zh: T }

const heroCopy: Localised<{ title: string; subtitle: string; cta: string }> = {
  en: {
    title: 'Data Center & Critical Infrastructure Solutions',
    subtitle:
      'Fire-resistant busways, intelligent monitoring, and prefabricated delivery to power AI-era campuses without compromise.',
    cta: 'Plan Your Data Center Power',
  },
  zh: {
    title: '数据中心与关键基础设施整体方案',
    subtitle: '耐火母线、智能监测与预制化交付，全面支撑 AI 时代的数据中心与关键场馆供配电。',
    cta: '获取数据中心方案',
  },
}

// 统一素材映射（支持 string 或 StaticImageData）
const solutionVisuals = {
  hero: dataCenterHeroImg,
  assetDashboard: heroPng,
  analyticsHeatmap: analyticsHeatmapPng,
  alertDispatch: alertDispatchPng,
  modularBusway: modularBuswayPng,
  buswayTrunking: frBusduct, 
  tapoffPanel: tapoffPanelPng,
  conductor: conductorPng,
  insulationSleeve: insulationSleevePng,
  reportManagement: reportManagementPng,
  operationManagement: operationMgmtPng,
  planManagement: planMgmtPng,
  historicalAnalysis: historicalAnalyticsPng,
  dataCenter: dataCenterDiagramImg,
  dataHall: dataCenterHallImg,
  production: productionLineImg,
} as const

const heroVisual = solutionVisuals.hero

const CLOUD_FEATURES: Array<{
  id: string
  title: Localised<string>
  description: Localised<string>
  image: string | StaticImageData
}> = [
  {
    id: 'device-management',
    title: { en: 'Asset Lifecycle Management', zh: '设备管理' },
    description: {
      en: 'Register field assets with QR codes, view event history, telemetry, and maintenance logs, and keep lifecycle records synchronised across teams.',
      zh: '记录设备台账、历史事件、实时数据与维护记录，生成设备二维码，帮助团队快速掌握设备全生命周期信息。',
    },
    image: solutionVisuals.assetDashboard,
  },
  {
    id: 'reporting',
    title: { en: 'Report Management', zh: '报表管理' },
    description: {
      en: 'Create reusable report templates, customise metrics for compliance, and produce on-demand summaries that reflect live operating data.',
      zh: '支持模板定义与自定义指标，灵活输出符合合规与运营需求的报表内容，实时反映母线运行状态。',
    },
    image: solutionVisuals.reportManagement,
  },
  {
    id: 'history-analytics',
    title: { en: 'Historical Analytics', zh: '历史数据分析' },
    description: {
      en: 'Compare multi-node historical data, correlate temperature, current, and alarms, and build long-term insights for optimisation.',
      zh: '支持多节点、多时段的历史数据对比，关联温度、电流、告警等关键变量，沉淀长期优化洞察。',
    },
    image: solutionVisuals.historicalAnalysis,
  },
  {
    id: 'operations',
    title: { en: 'Operations Management', zh: '运维管理' },
    description: {
      en: 'Consolidate work orders, inspection results, and field feedback. Dispatch tasks from the console and track closure with automated statistics.',
      zh: '集中管理工单、巡检与现场反馈，平台自动下发任务并统计完成情况，实现运维闭环管理。',
    },
    image: solutionVisuals.operationManagement,
  },
  {
    id: 'planning',
    title: { en: 'Maintenance Planning', zh: '计划管理' },
    description: {
      en: 'Define inspection and maintenance plans by scenario; the platform schedules and assigns tasks automatically to ensure on-time execution.',
      zh: '根据场景制定巡检、检修计划，由平台自动排程与派发工单，确保运维按时执行。',
    },
    image: solutionVisuals.planManagement,
  },
]

const MONITORING_FEATURES = [
  {
    id: 'realtime',
    title: { en: 'Real-time Monitoring', zh: '实时监测' },
    description: {
      en: 'Layered dashboards present busbar health, thermal hotspots, and load distribution in real time, making it easy to pinpoint anomalies.',
      zh: '通过分层可视化界面展示母线运行状态、温度热点与负载分布，实时定位异常。',
    },
    image: solutionVisuals.analyticsHeatmap,
  },
  {
    id: 'alerts',
    title: { en: 'Intelligent Alerts', zh: '预警通知' },
    description: {
      en: 'Multi-channel alerts (audio-visual, push notifications, email/SMS) ensure that warnings reach the right responders without delay.',
      zh: '支持声光、APP 推送、邮件/短信等多种方式发出告警，保障异常信息即时送达责任人。',
    },
    image: solutionVisuals.alertDispatch,
  },
] as const

const DC_INTRO: Localised<{ title: string; overview: string }> = {
  en: {
    title: 'Data Center Intelligent Busbar System',
    overview:
      'Growing AI and big-data workloads demand higher density power distribution. The AIWASON system integrates high-efficiency conductors, rapid installation, and intelligent monitoring to meet modern data center requirements.',
  },
  zh: {
    title: '数据中心专用智能母线系统',
    overview:
      '随着人工智能与大数据应用的发展，数据中心对配电提出高密度、高效率、安全可靠的新要求。AIWASON 通过高效导体、快速安装结构与智能监测平台，全面满足数据中心用电场景。',
  },
}

const DC_FEATURES: Array<{
  id: string
  title: Localised<string>
  bullets: Localised<string[]>
}> = [
  {
    id: 'agility',
    title: { en: 'Deployment Agility', zh: '便捷性、灵活性' },
    bullets: {
      en: [
        'Modular components shorten installation windows and simplify expansion in high-rise or retrofit projects.',
        'Tap-off units support live installation, reducing downtime and offering flexible load balancing.',
        'Independent branch boxes integrate with industrial connectors, enabling fast tenant onboarding.',
      ],
      zh: [
        '模块化组件缩短安装周期，兼顾新建与改造场景的快速部署。',
        '分接箱支持带电安装，实现灵活的负载平衡，减少停电时间。',
        '独立分支箱配备工业接插件，便于快速接入与租户扩容。',
      ],
    },
  },
  {
    id: 'efficiency',
    title: { en: 'Efficiency & Safety', zh: '节能性、安全性' },
    bullets: {
      en: [
        'Optimised conductor design lowers transmission losses while keeping temperatures stable.',
        'Integrated monitoring modules capture temperature, current, and insulation status for early risk detection.',
        'System design meets dual-circuit redundancy requirements to keep critical loads online.',
      ],
      zh: [
        '优化导体结构降低传输损耗，运行温度更加稳定。',
        '内置监测模块实时采集温度、电流、绝缘状态，提前识别风险。',
        '整体系统满足双路冗余供电要求，保障关键负载持续运行。',
      ],
    },
  },
  {
    id: 'lifecycle',
    title: { en: 'Lifecycle Advantages', zh: '全生命周期成本优势' },
    bullets: {
      en: [
        'Busway lifespan reaches 25–30 years, with tap-off modules designed for 10–15 year service windows.',
        'Prefabricated installation accelerates delivery and reduces labour costs by up to 30%.',
        'Rapid replacement design minimises downtime and lowers long-term O&M expenditure.',
      ],
      zh: [
        '母线系统寿命可达 25-30 年，分接箱寿命 10-15 年，显著延长使用周期。',
        '预制化安装减少施工时间，整体降低人工与调试成本约 30%。',
        '快速更换设计缩短停机时间，降低运维与备件成本。',
      ],
    },
  },
]

const DC_DELIVERY_STAGES: Array<{
  id: string
  title: Localised<string>
  bullets: Localised<string[]>
  image: string | StaticImageData
}> = [
  {
    id: 'topology',
    title: { en: 'Topology Simulation & Load Planning', zh: '拓扑仿真与负载规划' },
    bullets: {
      en: [
        '3D topology and redundancy simulation to validate 2N / 3+1 schemes before fabrication.',
        'Liquid-cooling, AI cluster and battery rooms modelled for future growth scenarios.',
        'Cable ladder, riser space and maintenance clearances resolved during digital rehearsal.',
      ],
      zh: [
        '通过 3D 拓扑与冗余仿真，在加工前验证 2N / 3+1 方案的可靠性。',
        '演练液冷、AI 集群、电池间等未来扩展场景，提前预留容量。',
        '在数字排演阶段完成桥架、竖井与检修空间的冲突校核。',
      ],
    },
    image: dataCenterDiagramImg,
  },
  {
    id: 'prefab',
    title: { en: 'Prefabrication & Factory Acceptance Test', zh: '预制化生产与出厂测试' },
    bullets: {
      en: [
        'Segment fabrication with QR-coded genealogy for every extrusion and connector.',
        'Thermal soak, insulation, and partial discharge tests conducted before shipment.',
        'Factory acceptance integrates cloud platform provisioning for day-zero onboarding.',
      ],
      zh: [
        '段件加工全程绑定二维码，实现挤压件、连接件的全生命周期追溯。',
        '出厂完成热循环、绝缘与局放测试，确保到场即具备运行可靠性。',
        '同步开通云平台资产，现场交付即可完成系统上线。',
      ],
    },
    image: '/res/数据中心/WechatIMG267.jpeg',
  },
  {
    id: 'installation',
    title: { en: 'On-site Installation & Commissioning', zh: '现场安装与调试' },
    bullets: {
      en: [
        'Modular supports and laser alignment keep long-span trunks level with minimal labour.',
        'Smart tap-offs are hot-swapped and paired via NFC to register with the monitoring cloud.',
        'Progress tracked in BIM viewer so stakeholders see live status of each zone.',
      ],
      zh: [
        '模块化支架配合激光校准，长跨干线保持水平，大幅减少人工。',
        '智能分接箱支持带电插拔，并通过 NFC 绑定上云，实现即插即用。',
        '施工进度与检验信息同步回写 BIM，可视化掌握各区域状态。',
      ],
    },
    image: '/res/数据中心/WechatIMG274.jpeg',
  },
  {
    id: 'operations-analytics',
    title: { en: 'Operations Analytics & Lifecycle Optimisation', zh: '运维分析与全生命周期优化' },
    bullets: {
      en: [
        'Unified dashboards correlate thermal hotspots with branch loads for proactive balancing.',
        'AI algorithms forecast stress on connectors and recommend maintenance windows.',
        'Automated reports capture ESG metrics and uptime SLA evidence for stakeholders.',
      ],
      zh: [
        '统一看板关联温度热点与支路负载，实现前瞻性均衡调度。',
        'AI 算法预测连接器受力与老化趋势，智能推荐检修窗口。',
        '自动报表沉淀 ESG 指标与 SLA 证明材料，支撑多方协同。',
      ],
    },
    image: '/res/数据中心/Screenshot 2025-10-16 at 16.12.54.png',
  },
]

const DC_GALLERY: Array<{
  id: string
  caption: Localised<string>
  image: string | StaticImageData
}> = [
  {
    id: 'gallery-overview',
    caption: { en: 'Dual-bus dashboard for multiple halls', zh: '多机房双母线运行看板' },
    image: dcGalleryOverviewImg,
  },
  {
    id: 'gallery-alarms',
    caption: { en: 'Alarm center with traceable root cause', zh: '告警中心与溯源分析' },
    image: dcGalleryAlarmsImg,
  },
  {
    id: 'gallery-energy',
    caption: { en: 'Energy insight & branch loading', zh: '能耗洞察与支路负载分析' },
    image: dcGalleryEnergyImg,
  },
  {
    id: 'gallery-maint',
    caption: { en: 'Maintenance scheduling & work orders', zh: '运维排程与工单闭环' },
    image: dcGalleryMaintenanceImg,
  },
]

const STRUCTURE_ITEMS = [
  {
    id: 'busway-shell',
    title: { en: 'Busway Trunking', zh: '母线槽' },
    description: {
      en: '6063-T5 aluminium trunking with 2.5 mm panels protects conductors, improves heat dissipation, and survives heavy-duty environments.',
      zh: '采用 6063 (T5) 铝合金 2.5mm 面板打造母线槽本体，保护导体同时增强散热与耐候性能。',
    },
    image: solutionVisuals.buswayTrunking,
  },
  {
    id: 'conductor',
    title: { en: 'Conductor', zh: '母线导体' },
    description: {
      en: 'Oxygen-free copper strip (>99.98% purity) with surface tin plating keeps resistance low and efficiency high.',
      zh: '使用高纯度无氧铜导体（纯度 >99.98%），表面镀锡处理，保持低阻与高效传输。',
    },
    image: solutionVisuals.conductor,
  },
  {
    id: 'insulation',
    title: { en: 'Insulation Sleeve', zh: '绝缘护套' },
    description: {
      en: 'Reinforced PC insulation withstands 130°C+, resists flame spread, and avoids halogen emissions during overheating.',
      zh: '强化 PC 绝缘护套耐温 990°C 以上，阻燃、防潮且不含卤素，异常状态下无有害气体。',
    },
    image: solutionVisuals.insulationSleeve,
  },
] as const

const KEY_MODULES = [
  {
    id: 'connector',
    title: { en: 'Precision Connector', zh: '连接器' },
    description: {
      en: 'Aluminium alloy connectors ensure reliable electrical continuity and easy assembly for straight or angled configurations.',
      zh: '铝合金连接器保证接触可靠，安装便捷，可适配直线与转角布线。',
    },
    image: solutionVisuals.modularBusway,
  },
  {
    id: 'tap-off',
    title: { en: 'Tap-off Box', zh: '分接箱' },
    description: {
      en: 'Tap-off modules integrate industrial plugs and smart metering, supporting single- or dual-circuit redundancy.',
      zh: '分接箱集成工业插头与智能计量，支持单回路、双回路等多种冗余方案。',
    },
    image: solutionVisuals.tapoffPanel,
  },
] as const

const CUSTOM_PLANS: Array<{
  id: string
  title: Localised<string>
  bullets: Localised<string[]>
}> = [
  {
    id: 'dual-feed',
    title: { en: 'Dual-feed for Every Pair of Racks', zh: '每两列机柜两路电源' },
    bullets: {
      en: [
        'PS output loop redundancy improves availability by ~50%.',
        'Additional trunk space enables future growth without downtime.',
        'Ideal for medium-sized rooms with around 10 racks per row.',
      ],
      zh: [
        'PS 输出回路冗余提升供电可用性约 50%。',
        '为后续扩容预留干线空间，升级无需停机。',
        '适用于单排约 10 台设备的中型机房布局。',
      ],
    },
  },
  {
    id: 'per-rack',
    title: { en: 'Dedicated Dual Circuits per Rack', zh: '每一列机柜两路电源' },
    bullets: {
      en: [
        'Dedicated supply per rack simplifies UPS routing and maintenance.',
        'Compact footprint keeps aisle space clear for O&M activities.',
        'Suitable for high-density corridors exceeding 16 racks.',
      ],
      zh: [
        '每列机柜独立供电，UPS 配置更清晰，运维检修更便捷。',
        '占地紧凑，不占用过道空间，便于巡检。',
        '适用于单排超过 16 台的高密度机房布局。',
      ],
    },
  },
  {
    id: 'one-to-three',
    title: { en: 'One-to-Three Redundant Supply', zh: '插接箱一对三供电' },
    bullets: {
      en: [
        'Tap-off count matches two-thirds of rack quantity for balanced load.',
        'Supports 220 V single phase or three-phase distribution with quick isolation.',
        'Provides strong redundancy for turbine, rail, or airport scenarios.',
      ],
      zh: [
        '插接箱数量约为机柜数量的 2/3，负载分配合理。',
        '兼容 220V 单相或三相供电，检修隔离迅速。',
        '适用于交通枢纽、轨道交通等高可靠供电场景。',
      ],
    },
  },
]

const interpret = <T,>(value: Localised<T>, lang: Lang) => value[lang]

// Next 15+：searchParams 是 Promise，需 await
export default async function SolutionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const langParam = sp?.lang
  const lang: Lang = langParam === 'en' || langParam === 'zh' ? (langParam as Lang) : 'en'

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      {/* HERO */}
      <section
        id="overview"
        className="relative min-h-[70vh] border-b border-[#cde9aa] overflow-hidden bg-black"
      >
        <Image
          src={heroVisual}
          alt={lang === 'en' ? 'AIWASON intelligent busbar system' : 'AIWASON 智能母线系统'}
          fill
          className="absolute inset-0 h-full w-full object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/70 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/65 sm:to-black/20" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32 flex flex-col min-h-[70vh] text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold tracking-[0.35em] text-[#9BE15D] uppercase">
                {lang === 'en' ? 'Solutions' : '解决方案'}
              </p>
              <h1 className="mt-4 text-3xl lg:text-5xl font-black leading-tight">
                {interpret(heroCopy, lang).title}
              </h1>
              <p className="mt-5 max-w-3xl text-white/85 text-base md:text-lg leading-relaxed">
                {interpret(heroCopy, lang).subtitle}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} tone="dark" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/products?lang=${lang}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#9BE15D] px-5 py-3 text-sm font-semibold text-[#0f2100] shadow hover:bg-[#88d84a] transition"
            >
              {lang === 'en' ? 'Explore Product Portfolio' : '查看产品矩阵'}
            </Link>
            <Link
              href={`mailto:Elialiu760317@outlook.com`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#76B900]/40 px-5 py-3 text-sm font-semibold text-white hover:bg-[#f6fbef]/10 transition"
            >
              {interpret(heroCopy, lang).cta}
            </Link>
          </div>
        </div>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Cloud Platform */}
      <section id="cloud-platform" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.3em] text-[#76B900]/80 uppercase">
            {lang === 'en' ? 'Cloud Platform' : '云平台'}
          </p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold">
            {lang === 'en' ? 'Integrated Operations Platform' : '智能母线云平台'}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg">
            {lang === 'en'
              ? 'Manage every intelligent busbar asset from installation to maintenance. The AMS platform centralises data so operations, maintenance, and decision makers share a single source of truth.'
              : '覆盖智能母线从安装到运维的全生命周期管理。AIS 平台集中资产、运维与决策数据，打造统一的业务视图。'}
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {CLOUD_FEATURES.map((feature, idx) => (
            <article
              key={feature.id}
              className="flex flex-col gap-6 rounded-2xl border border-[#76B900]/20 bg-white shadow-sm overflow-hidden lg:flex-row"
              id={feature.id}
            >
              <div className="w-full lg:w-[45%]">
                <CardImage
                  src={feature.image}
                  alt={interpret(feature.title, lang)}
                  ratio={null}
                  height="320px"
                  fit="cover"
                  bgClassName="bg-transparent"
                  roundedClassName="rounded-none"
                  showRing={false}
                  priority={idx < 2}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  fetchPriority={idx < 2 ? 'high' : 'auto'}
                  className="h-full"
                  sizes="(min-width:1024px) 45vw, 100vw"
                />
              </div>
              <div className="flex-1 p-6 lg:p-10 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">{interpret(feature.title, lang)}</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {interpret(feature.description, lang)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Monitoring */}
      <section id="monitoring" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#76B900]/80 uppercase">
              {lang === 'en' ? 'Monitoring' : '监测预警'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold">
              {lang === 'en' ? 'Real-time Insight & Alerts' : '实时洞察与告警'}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {lang === 'en'
                ? 'Visualise busbar status across buildings, floors, or entire campuses. When anomalies appear, the alerting engine notifies teams instantly through the preferred channel.'
                : '在楼宇、楼层乃至园区范围内统一掌握母线状态；一旦出现异常，告警引擎可通过多种渠道即时通知相关责任人。'}
            </p>
          </div>

          <div className="space-y-10">
            {MONITORING_FEATURES.map((feature, idx) => (
              <div
                key={feature.id}
                id={feature.id}
                className={`flex flex-col gap-6 rounded-2xl border border-[#76B900]/20 bg-white shadow-sm overflow-hidden lg:flex-row ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-[45%]">
                  <CardImage
                    src={feature.image}
                    alt={interpret(feature.title, lang)}
                    ratio={null}
                    height="320px"
                    fit="cover"
                    bgClassName="bg-transparent"
                    roundedClassName="rounded-none"
                    showRing={false}
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    className="h-full"
                    sizes="(min-width:1024px) 45vw, 100vw"
                  />
                </div>
                <div className="flex-1 p-6 lg:p-10 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{interpret(feature.title, lang)}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {interpret(feature.description, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Data Center Overview */}
      <section id="dc-overview" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="space-y-12">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <p className="text-sm font-semibold tracking-[0.3em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Data Center' : '数据中心'}
              </p>
              <h2 className="text-3xl lg:text-4xl font-extrabold">{interpret(DC_INTRO, lang).title}</h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {interpret(DC_INTRO, lang).overview}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={`/products?lang=${lang}#dc-backbone`}
                  className="inline-flex items-center rounded-lg border border-[#76B900]/40 px-4 py-2 text-sm font-semibold text-[#1b2d07] shadow-sm hover:bg-[#f2f9e6] transition"
                >
                  {lang === 'en' ? 'View Data Center Product Line' : '查看数据中心产品线'}
                </Link>
                <Link
                  href={`mailto:Elialiu760317@outlook.com?subject=${encodeURIComponent(lang === 'en' ? 'Data Center Power Solution Consultation' : '咨询数据中心供配电方案')}`}
                  className="inline-flex items-center rounded-lg bg-[#76B900] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#68a500] transition"
                >
                  {lang === 'en' ? 'Book a Technical Workshop' : '预约技术交流'}
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-[#76B900]/30 bg-black/40 shadow-lg">
                <Image
                  src={solutionVisuals.dataCenter}
                  alt={lang === 'en' ? 'Data center busway topology diagram' : '数据中心母线拓扑图'}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 45vw, 100vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
                  {lang === 'en' ? 'Topology' : '拓扑示意'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#76B900]/25 bg-black/30 shadow-sm">
                  <Image
                    src={solutionVisuals.dataHall}
                    alt={lang === 'en' ? 'Data hall live deployment' : '数据机房实景'}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 22vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/90">
                    {lang === 'en' ? 'Data Hall' : '机房现场'}
                  </span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#76B900]/25 bg-black/30 shadow-sm">
                  <Image
                    src={solutionVisuals.production}
                    alt={lang === 'en' ? 'Production line delivery' : '生产线交付'}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 22vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/90">
                    {lang === 'en' ? 'Production' : '生产交付'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DC_FEATURES.map((feature) => (
              <article
                key={feature.id}
                id={feature.id}
                className="flex h-full flex-col rounded-2xl border border-[#76B900]/20 bg-white/90 p-6 lg:p-8 shadow-sm backdrop-blur"
              >
                <h3 className="text-2xl font-semibold text-gray-900">{interpret(feature.title, lang)}</h3>
                <ul className="mt-4 space-y-3 text-base text-gray-600 leading-relaxed">
                  {interpret(feature.bullets, lang).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#76B900]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Data Center Delivery */}
      <section id="dc-delivery" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#76B900]/80 uppercase">
              {lang === 'en' ? 'Delivery' : '交付流程'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold">
              {lang === 'en' ? 'End-to-End Delivery Playbook' : '端到端交付流程'}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {lang === 'en'
                ? 'From topology simulation to long-term operations, each stage is digitised and linked with prefabrication, ensuring predictable quality for critical data centers.'
                : '从拓扑仿真到运维优化，流程各阶段均实现数字化联动与预制化交付，确保关键数据中心的质量与可预测性。'}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {DC_DELIVERY_STAGES.map((stage, idx) => (
              <article
                key={stage.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-[#76B900]/20 bg-white/95 shadow-sm"
              >
                <CardImage
                  src={stage.image}
                  alt={interpret(stage.title, lang)}
                  ratio={null}
                  height="240px"
                  fit="cover"
                  bgClassName="bg-black"
                  roundedClassName="rounded-none"
                  showRing={false}
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  className="h-full"
                  sizes="(min-width:1024px) 45vw, 100vw"
                />
                <div className="flex-1 p-6 lg:p-8 space-y-4">
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                    {interpret(stage.title, lang)}
                  </h3>
                  <ul className="space-y-3 text-sm md:text-base text-gray-600 leading-relaxed">
                    {interpret(stage.bullets, lang).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#76B900]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Data Center Gallery */}
      <section id="dc-gallery" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#76B900]/80 uppercase">
              {lang === 'en' ? 'Operations Gallery' : '运维场景'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold">
              {lang === 'en' ? 'Realtime Insight Snapshots' : '实时洞察界面速览'}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {lang === 'en'
                ? 'Screens from the AMS platform highlight how operators oversee power distribution, alarms, energy metrics, and work orders in one console.'
                : 'AMS 平台界面展示运维团队如何在同一控制台内掌握配电、告警、能耗与工单态势。'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {DC_GALLERY.map((item, idx) => (
              <figure
                key={item.id}
                className="group relative overflow-hidden rounded-3xl border border-[#76B900]/20 bg-black shadow-sm"
              >
                <Image
                  src={item.image}
                  alt={interpret(item.caption, lang)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-sm font-medium text-white leading-snug drop-shadow">
                  {interpret(item.caption, lang)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Structure */}
      <section id="dc-structure" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.3em] text-[#76B900]/80 uppercase">
            {lang === 'en' ? 'Architecture' : '主体结构'}
          </p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold">
            {lang === 'en' ? 'Core Components' : '核心部件'}
          </h2>
        </div>

        <div className="mt-12 space-y-12">
          {STRUCTURE_ITEMS.map((item, idx) => (
            <div key={item.id} className="flex flex-col gap-6 rounded-2xl border border-[#76B900]/20 bg-white shadow-sm overflow-hidden lg:flex-row">
              <div className="w-full lg:w-[40%]">
                <CardImage
                  src={item.image}
                  alt={interpret(item.title, lang)}
                  ratio={null}
                  height="300px"
                  fit="cover"
                  bgClassName="bg-transparent"
                  roundedClassName="rounded-none"
                  showRing={false}
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  className="h-full"
                  sizes="(min-width:1024px) 40vw, 100vw"
                />
              </div>
              <div className="flex-1 p-6 lg:p-10 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">{interpret(item.title, lang)}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{interpret(item.description, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Modules */}
      <section id="dc-modules" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="space-y-12">
          {KEY_MODULES.map((module, idx) => (
            <div key={module.id} className="flex flex-col gap-6 rounded-2xl border border-[#76B900]/20 bg-white shadow-sm overflow-hidden lg:flex-row">
              <div className="w-full lg:w-[45%]">
                <CardImage
                  src={module.image}
                  alt={interpret(module.title, lang)}
                  ratio={null}
                  height="320px"
                  fit="cover"
                  bgClassName="bg-transparent"
                  roundedClassName="rounded-none"
                  showRing={false}
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  className="h-full"
                  sizes="(min-width:1024px) 45vw, 100vw"
                />
              </div>
              <div className="flex-1 p-6 lg:p-10 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">{interpret(module.title, lang)}</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {interpret(module.description, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Custom plans */}
      <section id="dc-custom" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.3em] text-[#76B900]/80 uppercase">
            {lang === 'en' ? 'Custom Engineering' : '工程定制化方案'}
          </p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold">
            {lang === 'en' ? 'Tailored Power Distribution Layouts' : '多场景定制配电布局'}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg">
            {lang === 'en'
              ? 'Choose the configuration that matches your density requirements. Modular layouts adapt to hyperscale facilities, hospitality, transportation hubs, and campus infrastructures.'
              : '根据负载密度灵活选择方案，满足超大规模数据中心、酒店、交通枢纽及园区等多场景的供配电需求。'}
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {CUSTOM_PLANS.map((plan) => (
            <div key={plan.id} id={plan.id} className="rounded-2xl border border-[#76B900]/20 bg-white shadow-sm p-6 lg:p-10">
              <h3 className="text-2xl font-semibold text-gray-900">{interpret(plan.title, lang)}</h3>
              <ul className="mt-4 space-y-3 text-base text-gray-600 leading-relaxed">
                {interpret(plan.bullets, lang).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#76B900]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
