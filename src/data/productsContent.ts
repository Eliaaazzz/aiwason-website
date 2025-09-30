import { type StaticImageData } from 'next/image'

// Static images (Next knows width/height)
import imgAiTerminal      from '@/assets/products/ai-monitoring-terminal.png'
import imgSpecialMaterial from '@/assets/products/special-material.png'
import imgIp68Section     from '@/assets/products/ip68-section.png'
import imgConnectorModule from '@/assets/products/connector-module.png'
import imgWallPatent      from '@/assets/products/wall-patent-system.png'
import imgBuildingLayout  from '@/assets/products/building-layout-system.png'
import imgFrBusbarEquip   from '@/assets/products/fr-busduct.png'

export type Lang = 'en' | 'zh'
export type I18n = { en: string; zh: string }

// Updated interface to match component expectations
export type Product = {
  id: string
  src: StaticImageData
  title: I18n
  description: I18n  // Changed from 'desc' to 'description'
  altText: I18n      // Changed from 'alt' to 'altText'
}

// Helper: pick language
export const t = (i18n: I18n, lang: Lang) => i18n[lang]

// Updated constant name and property names to match component
export const PRODUCTS_DATA: Product[] = [
  {
    id: 'ai-system-terminal',
    src: imgAiTerminal,
    title: { en: 'AI System Intelligent Monitoring', zh: 'AI系统智能监控' },
    description: {  // Changed from 'desc'
      en: 'Human–machine interactive terminal for full-lifecycle monitoring, alarms, trends and maintenance insights.',
      zh: '人机交互终端,覆盖全生命周期的监控、告警、趋势与运维洞察。',
    },
    altText: { en: 'AI monitoring terminal with dashboards', zh: 'AI智能监控终端界面' },  // Changed from 'alt'
  },
  {
    id: 'special-material',
    src: imgSpecialMaterial,
    title: { en: 'High-Temperature Resistant Special Material', zh: '耐高温特种材料' },
    description: {
      en: 'Core flexible material with high thermal endurance to protect conductors under extreme conditions.',
      zh: '核心柔性耐高温材料,在极端环境下有效保护导体与绝缘层。',
    },
    altText: { en: 'High-temperature resistant special material', zh: '耐高温特种材料示意图' },
  },
  {
    id: 'ip68-section',
    src: imgIp68Section,
    title: { en: 'IP68 Waterproof & Fire-Resistant Section', zh: 'IP68防水耐火分段' },
    description: {
      en: 'Sealed modular section with ingress protection for wet zones and outdoor routing.',
      zh: '密封模块化分段,满足潮湿与室外敷设环境的高等级防护。',
    },
    altText: { en: 'IP68 waterproof fire-resistant section', zh: 'IP68防水耐火分段结构' },
  },
  {
    id: 'connector-module',
    src: imgConnectorModule,
    title: { en: 'Sliding Connector & Intelligent Module', zh: '滑动连接器与智能模块' },
    description: {
      en: '360° encapsulated protection, sliding plug-in connector, and built-in monitoring module.',
      zh: '360°防护包覆,滑动式插接连接器,内置智能监控模块。',
    },
    altText: { en: 'Sliding connector and intelligent monitoring module', zh: '滑动连接器与智能监控模块' },
  },
  {
    id: 'wall-patent-system',
    src: imgWallPatent,
    title: { en: 'Ultra-Thin Installation (Patent)', zh: '超薄安装(专利)' },
    description: {
      en: 'Space-saving patented layout with convenient installation and integrated control nodes.',
      zh: '节省空间的专利化布置,安装便捷,控制节点一体化。',
    },
    altText: { en: 'Ultra-thin patented installation system', zh: '超薄安装专利系统' },
  },
  {
    id: 'building-layout-system',
    src: imgBuildingLayout,
    title: { en: 'Building-Wide Fire-Resistant Optoelectronic Busbar', zh: '楼宇全域耐火光电母线系统' },
    description: {
      en: 'End-to-end system layout across floors and fire compartments with centralized monitoring.',
      zh: '跨楼层与防火分区的系统化铺设,集中监控与运维。',
    },
    altText: { en: 'Building-wide busbar layout system', zh: '楼宇全域母线系统布局' },
  },
  {
    id: 'fr-busbar-equipment',
    src: imgFrBusbarEquip,
    title: { en: 'Fireproof Busbar Equipment', zh: '耐火母线槽设备' },
    description: {
      en: 'Close-up of the fireproof busbar body and conductor stack. Engineered enclosure enables high thermal endurance and safe routing across fire compartments.',
      zh: '母线槽本体与导体叠片近景。工程化外壳设计确保耐高温与跨防火分区的安全敷设。',
    },
    altText: { en: 'Fireproof busbar equipment close-up', zh: '耐火母线槽设备近景' },
  },
]