// src/app/news/chip-center/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Shenzhen Global Intelligent Chip Center | AIWASON',
  description: 'High-density power distribution for semiconductor fabrication with ultra-clean supply and real-time monitoring.',
  alternates: {
    canonical: '/news/chip-center',
    languages: { en: '/news/chip-center?lang=en', zh: '/news/chip-center?lang=zh' },
  },
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'chip-center',
  title: {
    zh: '深圳全球智能芯片中心',
    en: 'Shenzhen Global Intelligent Chip Center',
  },
  subtitle: {
    zh: '半导体制造超洁净智能配电系统',
    en: 'Ultra-Clean Intelligent Power Distribution for Semiconductor Manufacturing',
  },
  location: {
    zh: '深圳市南山区',
    en: 'Nanshan District, Shenzhen',
  },
  completionDate: '2024年6月',
  category: {
    zh: '半导体制造设施',
    en: 'Semiconductor Manufacturing Facility',
  },
  heroImage: '/res/深圳全球智能芯片中心.jpg',
  description: {
    zh: [
      '深圳全球智能芯片中心是国内领先的半导体研发与制造基地，对电力系统的洁净度和可靠性有着极高的要求。AIWASON为该项目提供了专为半导体制造环境设计的高密度配电解决方案。',
      '项目采用了全密封设计的耐火智能光电母线系统，确保在洁净室环境中不产生任何颗粒污染。系统集成了先进的电磁兼容技术，有效抑制电磁干扰，保护敏感的芯片制造设备。',
      '为满足半导体生产的24/7连续运行需求，系统配置了冗余备份架构。多重监测系统实时监控电力质量，包括谐波分析、电压闪烁检测等，确保为精密制造设备提供稳定的电力环境。',
      '智能监测系统能够预测设备维护需求，通过预防性维护策略，最大限度减少生产中断。系统还预留了未来扩容接口，支持产线的快速扩展和升级。',
    ],
    en: [
      'The Shenzhen Global Intelligent Chip Center is a leading semiconductor R&D and manufacturing base in China, with extremely high requirements for power system cleanliness and reliability. AIWASON provides a high-density power distribution solution specifically designed for semiconductor manufacturing environments.',
      'The project adopts a fully sealed fire-resistant intelligent optoelectronic busbar system to ensure no particle contamination is generated in cleanroom environments. The system integrates advanced electromagnetic compatibility technology to effectively suppress electromagnetic interference and protect sensitive chip manufacturing equipment.',
      'To meet the 24/7 continuous operation requirements of semiconductor production, the system is configured with redundant backup architecture. Multiple monitoring systems provide real-time monitoring of power quality, including harmonic analysis and voltage flicker detection, ensuring a stable power environment for precision manufacturing equipment.',
      'The intelligent monitoring system can predict equipment maintenance needs and minimize production interruptions through preventive maintenance strategies. The system also reserves future expansion interfaces to support rapid expansion and upgrading of production lines.',
    ],
  },
  keyFeatures: {
    zh: [
      '超洁净密封设计适配洁净室环境',
      '高密度配电支持精密制造设备',
      '冗余备份架构确保24/7连续运行',
      '电磁兼容设计保护敏感设备',
      '实时电力质量监测与分析',
      '预测性维护减少生产中断',
      '模块化扩容支持产线升级',
      '专业级电源滤波与稳压',
    ],
    en: [
      'Ultra-clean sealed design for cleanroom environments',
      'High-density power distribution for precision manufacturing equipment',
      'Redundant backup architecture ensures 24/7 continuous operation',
      'Electromagnetic compatibility design protects sensitive equipment',
      'Real-time power quality monitoring and analysis',
      'Predictive maintenance reduces production interruptions',
      'Modular expansion supports production line upgrades',
      'Professional-grade power filtering and voltage regulation',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '5000A', en: '5000A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '380/220V', en: '380/220V' },
    },
    {
      label: { zh: '洁净等级', en: 'Cleanliness Class' },
      value: { zh: 'ISO Class 5', en: 'ISO Class 5' },
    },
    {
      label: { zh: '防护等级', en: 'Protection Rating' },
      value: { zh: 'IP65', en: 'IP65' },
    },
    {
      label: { zh: '电磁兼容', en: 'EMC Compliance' },
      value: { zh: 'Class A', en: 'Class A' },
    },
    {
      label: { zh: '谐波失真', en: 'Harmonic Distortion' },
      value: { zh: '<3%', en: '<3%' },
    },
  ],
  awards: [
    {
      name: { zh: '深圳全球智能芯片中心实景', en: 'Shenzhen Global Intelligent Chip Center Exterior' },
      year: '2024',
      description: {
        zh: '园区主体建筑与智能母线配电改造后的整体风貌。',
        en: 'Exterior view of the campus highlighting the upgraded intelligent busway backbone.',
      },
      image: '/res/深圳全球智能芯片中心.jpg',
    },
  ],
  relatedLinks: [
    {
      label: { zh: '半导体制造解决方案', en: 'Semiconductor Manufacturing Solutions' },
      href: '/solutions/semiconductor',
    },
    {
      label: { zh: '洁净室配电产品', en: 'Cleanroom Power Distribution Products' },
      href: '/products/cleanroom-power',
    },
  ],
}

export default async function ChipCenterPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
