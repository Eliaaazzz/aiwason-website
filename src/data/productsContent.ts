import { type StaticImageData } from 'next/image'

// Static images (Next knows width/height)
import imgAiTerminal      from '@/assets/products/ai-monitoring-terminal.png'
import imgConnectorModule from '@/assets/products/connector-module.png'
import imgWallPatent      from '@/assets/products/wall-patent-system.png'

import imgDataCenterBackbone    from '../../public/res/数据中心/WechatIMG271.jpeg'
import imgFireResistantBusway   from '../../public/res/产品图片/耐火母线/耐火母线.png'
import imgIp68SectionFront      from '../../public/res/产品图片/耐火母线/1739dd7beb921afccbd38f5fc71a669.png'
import imgSmartBusway           from '../../public/res/产品图片/智能母线/1.png'
import imgSmartTapoffDetail     from '../../public/res/产品图片/智能母线/2.png'
import imgSmartTapoffInline     from '../../public/res/产品图片/智能母线/3.png'
import imgSmartMonitoringCabinet from '../../public/res/产品图片/智能母线/6.jpg'
import imgDenseBuswayStraight   from '../../public/res/产品图片/密集母线/2014616173818752.jpg'
import imgDenseBuswayCorner     from '../../public/res/产品图片/密集母线/2014616173828636.jpg'
import imgDenseBuswayStack      from '../../public/res/产品图片/密集母线/2014616173840147.jpg'
import imgLightingBuswayLinear  from '../../public/res/产品图片/照明母线/2014616173732310.jpg'
import imgLightingBuswayGrid    from '../../public/res/产品图片/照明母线/2014616173744385.jpg'

export type Lang = 'en' | 'zh'
export type I18n = { en: string; zh: string }

// Updated interface to match component expectations
export type Product = {
  id: string
  src: StaticImageData
  title: I18n
  description: I18n  // Changed from 'desc' to 'description'
  altText: I18n      // Changed from 'alt' to 'altText'
  badge?: I18n
}

export type ProductCategory = {
  id: string
  title: I18n
  description: I18n
  highlight?: boolean
  products: Product[]
}

// Helper: pick language
export const t = (i18n: I18n, lang: Lang) => i18n[lang]

// Updated constant name and property names to match component
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'fire-optic',
    title: {
      en: 'Fire-Resistant Intelligent Optoelectronic Busbars',
      zh: '耐火智能光电母线',
    },
    description: {
      en: 'Prefabricated busway architecture purpose-built for Tier III/IV data centers, core finance, and mission-critical campuses.',
      zh: '围绕 Tier III/IV 数据中心、金融核心机房及关键园区打造的预制化耐火光电母线体系。',
    },
    highlight: true,
    products: [
      {
        id: 'dc-backbone',
        src: imgDataCenterBackbone,
        badge: { en: 'Data Center Focus', zh: '数据中心专用' },
        title: { en: 'Data Center Fire-Resistant Busway Backbone', zh: '数据中心耐火母线主干' },
        description: {
          en: '2N / 3+1 redundant busway backbone with intelligent tap-offs and fibre monitoring for AI-ready halls.',
          zh: '满足 2N / 3+1 冗余架构的母线主干，集成智能分接与光纤监测，支撑 AI 算力机房。',
        },
        altText: { en: 'Data center fire-resistant busway installed above server aisles', zh: '数据中心机房内的耐火母线主干' },
      },
      {
        id: 'fire-resistant-busway',
        src: imgFireResistantBusway,
        title: { en: '1200°C Ceramic Fire-Resistant Busway', zh: '1200°C 陶瓷耐火母线槽' },
        description: {
          en: 'Ceramic-insulated enclosure tested for 1200°C / 120 minutes; supports cross-compartment routing without toxic smoke.',
          zh: '陶瓷绝缘结构通过 1200°C / 120 分钟耐火测试，跨防火分区敷设无有毒烟雾。',
        },
        altText: { en: 'Fire-resistant busway close-up', zh: '耐火母线槽外壳与绝缘结构' },
      },
      {
        id: 'ip68-section',
        src: imgIp68SectionFront,
        title: { en: 'IP68 Sealed Section (Outdoor / Wet Zone)', zh: 'IP68 密封防水耐火分段' },
        description: {
          en: 'Fully encapsulated IP68 section achieves a two-hour fire rating for outdoor or humid data annexes.',
          zh: '整体浇封结构实现 IP68 与 2 小时耐火等级，适配户外或潮湿辅房。',
        },
        altText: { en: 'IP68 sealed fire-resistant section exploded view', zh: 'IP68 密封耐火分段结构示意' },
      },
      {
        id: 'wall-patent-system',
        src: imgWallPatent,
        title: { en: 'Ultra-Thin Riser Installation (Patent)', zh: '超薄立管安装（专利）' },
        description: {
          en: 'Patented thin-profile layout reduces shaft footprint and keeps evacuation corridors clear.',
          zh: '专利化超薄母线布局压缩竖井空间，保持疏散通道通畅。',
        },
        altText: { en: 'Ultra-thin busway patent diagram', zh: '超薄母线专利示意图' },
      },
    ],
  },
  {
    id: 'smart-distribution',
    title: {
      en: 'Intelligent Tap-offs & Monitoring Modules',
      zh: '智能分接与监测模块',
    },
    description: {
      en: 'Modular tap-off platforms with embedded sensing, enabling closed-loop operations for campuses and industrial bases.',
      zh: '内置传感的模块化分接平台，赋能园区和制造基地的闭环运维管理。',
    },
    products: [
      {
        id: 'smart-busway',
        src: imgSmartBusway,
        title: { en: 'Smart Tap-off Architecture', zh: '智能分接架构' },
        description: {
          en: 'Tap-off slots support live expansion with coded keying, and pre-wire intelligent modules for rapid commissioning.',
          zh: '分接位支持带电扩容并具备编码防错，预布线智能模块，显著缩短调试周期。',
        },
        altText: { en: 'Smart tap-off architecture schematic', zh: '智能分接架构示意图' },
      },
      {
        id: 'smart-tapoff-detail',
        src: imgSmartTapoffDetail,
        title: { en: 'Intelligent Tap-off Monitoring Unit', zh: '智能分接监测单元' },
        description: {
          en: 'Integrated sensing captures load, temperature, and leakage status, relaying diagnostics to the AMS platform.',
          zh: '集成传感器采集负载、电温、漏电状态，并实时回传 AMS 平台实现诊断。',
        },
        altText: { en: 'Tap-off monitoring module detail', zh: '分接监测模块细节' },
      },
      {
        id: 'smart-tapoff-inline',
        src: imgSmartTapoffInline,
        title: { en: 'Inline Tap-off Array', zh: '一体化并联分接阵列' },
        description: {
          en: 'Parallel tap-off array delivers high-density feeds for AI clusters or production lines with minimal footprint.',
          zh: '并联阵列提供 AI 集群或生产线的高密度供电，显著压缩安装空间。',
        },
        altText: { en: 'Inline tap-off array illustration', zh: '并联分接阵列示意' },
      },
      {
        id: 'smart-monitoring-cabinet',
        src: imgSmartMonitoringCabinet,
        title: { en: 'Operations Monitoring Cabinet', zh: '运维监测机柜' },
        description: {
          en: 'Rack-mounted busway monitoring cabinet aggregates field data and offers edge analytics with redundant comms.',
          zh: '机柜式母线监测终端汇聚现场数据，提供边缘分析与冗余通讯。',
        },
        altText: { en: 'Operations monitoring cabinet photo', zh: '运维监测机柜照片' },
      },
      {
        id: 'connector-module',
        src: imgConnectorModule,
        title: { en: 'Precision Connector Assembly', zh: '精密连接器组件' },
        description: {
          en: 'Sealed connectors with torque guidance and status indication secure joints across long trunk runs.',
          zh: '密封连接器具备扭矩指示与状态显示，保障长距离干线接驳的可靠性。',
        },
        altText: { en: 'Busway connector module close-up', zh: '母线连接器组件特写' },
      },
      {
        id: 'ai-system-terminal',
        src: imgAiTerminal,
        title: { en: 'AI System Operations Terminal', zh: 'AI 系统运维终端' },
        description: {
          en: 'Operations cockpit visualises load, thermal, and alarm trends with predictive maintenance workflows.',
          zh: '运维总控界面汇聚负载、温度、告警趋势，并联动预测性运维流程。',
        },
        altText: { en: 'AI monitoring terminal dashboards', zh: 'AI 运维终端多屏界面' },
      },
    ],
  },
  {
    id: 'high-capacity',
    title: {
      en: 'High-Capacity & Specialized Busways',
      zh: '高容量与专用母线',
    },
    description: {
      en: 'Compact, dense, and lighting busways drawn from large commercial and industrial deployments.',
      zh: '源自大型商业与工业项目的密集型、专用型与照明母线产品矩阵。',
    },
    products: [
      {
        id: 'dense-busway',
        src: imgDenseBuswayStraight,
        title: { en: '6300 A Compact Busway', zh: '6300A 密集型母线' },
        description: {
          en: 'Laminated copper conductor stack enables low-loss transmission for towers, airports, and rail hubs.',
          zh: '叠层铜排结构降低传输损耗，服务高层、机场及轨道枢纽的大功率需求。',
        },
        altText: { en: 'Compact busway segments on production line', zh: '密集母线生产线段件' },
      },
      {
        id: 'dense-busway-corner',
        src: imgDenseBuswayCorner,
        title: { en: 'Corner & Expansion Modules', zh: '转角与扩展模块' },
        description: {
          en: 'Factory-fabricated elbows and expansion sections simplify complex routing with consistent thermal performance.',
          zh: '工厂预制的弯头与伸缩模块确保复杂布线时的热稳定性与施工效率。',
        },
        altText: { en: 'Dense busway corner module', zh: '密集母线转角模块' },
      },
      {
        id: 'dense-busway-stack',
        src: imgDenseBuswayStack,
        title: { en: 'Stacked Feeder Assemblies', zh: '叠层馈线组件' },
        description: {
          en: 'Stacked feeder assemblies deliver high currents within compact shafts for mixed-use complexes.',
          zh: '叠层馈线组件在紧凑竖井内实现大电流输送，适配复合型综合体。',
        },
        altText: { en: 'Stacked feeder assemblies photo', zh: '叠层馈线组件图片' },
      },
      {
        id: 'lighting-busway-linear',
        src: imgLightingBuswayLinear,
        title: { en: 'Lighting Plug-in Busway', zh: '照明插接母线' },
        description: {
          en: 'Lightweight plug-in busway for public area lighting and ancillary loads, enabling rapid layout changes.',
          zh: '轻量化插接式母线覆盖公共照明与辅助负载，实现快速调整布局。',
        },
        altText: { en: 'Lighting busway branches in ceiling installation', zh: '吊顶内的照明母线分支' },
      },
      {
        id: 'lighting-busway-grid',
        src: imgLightingBuswayGrid,
        title: { en: 'Lighting Grid with Flexible Drops', zh: '灵活下挂照明母线' },
        description: {
          en: 'Supports grid-style lighting with adjustable drops, ideal for retail concourses and exhibition halls.',
          zh: '支持栅格化照明与灵活下挂，适用于商业中庭与展陈空间。',
        },
        altText: { en: 'Lighting busway grid installation', zh: '照明母线栅格安装' },
      },
    ],
  },
]
