// src/app/news/data-center/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Qianhai Information Hub Data Center | AIWASON',
  description: 'Tier-IV oriented dual-bus architecture with fiber-optic condition monitoring for continuous uptime.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'data-center',
  title: {
    zh: '前海信息枢纽中心',
    en: 'Qianhai Information Hub Data Center',
  },
  subtitle: {
    zh: '面向 Tier IV 的双母线架构数据中心',
    en: 'Tier-IV Oriented Dual-Bus Architecture Data Center',
  },
  location: {
    zh: '深圳市前海深港现代服务业合作区',
    en: 'Qianhai Shenzhen-Hong Kong Modern Service Industry Cooperation Zone, Shenzhen',
  },
  completionDate: '2023年12月',
  category: {
    zh: '数据中心基础设施',
    en: 'Data Center Infrastructure',
  },
  heroImage: '/res/前海信息枢纽中心.jpg',
  description: {
    zh: [
      '前海信息枢纽中心作为深圳前海的核心数据基础设施，采用了AIWASON最先进的耐火智能光电母线系统。项目面向Tier IV等级设计，实现了双母线架构的高可靠性配电方案。',
      '该项目集成了光纤状态监测技术，能够实时监控母线系统的运行状态，包括温度、湿度、电弧检测等关键参数。通过AI智能分析，系统可以提前预警潜在故障，确保数据中心的持续稳定运行。',
      '项目采用模块化设计理念，支持数据中心的快速扩容和灵活配置。独立的双路母线系统确保在任一路径故障时，系统仍能保持正常供电，满足金融级数据中心的高可用性要求。',
      '在节能环保方面，系统整体效率超过98.5%，显著降低了数据中心的运营成本。同时，系统预留了液冷扩容接口，为未来高密度服务器部署提供了技术保障。',
    ],
    en: [
      'The Qianhai Information Hub Data Center serves as the core data infrastructure for Shenzhen Qianhai, featuring AIWASON\'s most advanced fire-resistant intelligent optoelectronic busbar system. The project is designed to meet Tier IV standards with a highly reliable dual-bus architecture power distribution solution.',
      'The project integrates fiber-optic condition monitoring technology that provides real-time monitoring of busbar system operation status, including critical parameters such as temperature, humidity, and arc detection. Through AI intelligent analysis, the system can provide early warnings of potential failures, ensuring continuous and stable operation of the data center.',
      'The project adopts a modular design concept that supports rapid expansion and flexible configuration of the data center. The independent dual-bus system ensures that the system can maintain normal power supply when either path fails, meeting the high availability requirements of financial-grade data centers.',
      'In terms of energy conservation and environmental protection, the overall system efficiency exceeds 98.5%, significantly reducing the operating costs of the data center. Additionally, the system reserves liquid cooling expansion interfaces, providing technical assurance for future high-density server deployments.',
    ],
  },
  keyFeatures: {
    zh: [
      '双母线架构确保Tier IV级别的高可用性',
      '光纤状态监测实现预测性维护',
      '模块化设计支持快速扩容',
      '智能分段切换减少故障影响范围',
      '超过98.5%的系统效率',
      '预留液冷扩容接口',
      '统一的能源管理看板',
      '2小时耐火等级保护',
    ],
    en: [
      'Dual-bus architecture ensures Tier IV level high availability',
      'Fiber-optic condition monitoring enables predictive maintenance',
      'Modular design supports rapid expansion',
      'Smart sectional switching reduces fault impact scope',
      'System efficiency exceeding 98.5%',
      'Reserved liquid cooling expansion interfaces',
      'Unified energy management dashboard',
      '2-hour fire resistance rating protection',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '6300A', en: '6300A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '380/220V', en: '380/220V' },
    },
    {
      label: { zh: '耐火等级', en: 'Fire Resistance' },
      value: { zh: '2小时', en: '2 Hours' },
    },
    {
      label: { zh: '防护等级', en: 'Protection Rating' },
      value: { zh: 'IP54', en: 'IP54' },
    },
    {
      label: { zh: '系统效率', en: 'System Efficiency' },
      value: { zh: '>98.5%', en: '>98.5%' },
    },
    {
      label: { zh: '监测方式', en: 'Monitoring Method' },
      value: { zh: '光纤实时监测', en: 'Fiber-optic Real-time Monitoring' },
    },
  ],
  awards: [
    {
      name: { zh: '数据中心优秀工程奖', en: 'Data Center Excellence Award' },
      year: '2024',
      description: { zh: '获得行业认可的数据中心基础设施建设优秀项目', en: 'Industry-recognized excellence in data center infrastructure construction' },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '了解更多数据中心解决方案', en: 'Learn More About Data Center Solutions' },
      href: '/solutions/data-center',
    },
    {
      label: { zh: '智能母线产品', en: 'Intelligent Busbar Products' },
      href: '/products/intelligent-busbar',
    },
  ],
}

export default async function DataCenterPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}