import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Qianhai Holding Investment Tower | AIWASON',
  description: 'Intelligent ring supports HQ offices and cultural venues with reserved capacity for future fit-outs.',
  alternates: {
    canonical: '/news/qianhai-holding-investment',
    languages: { en: '/news/qianhai-holding-investment?lang=en', zh: '/news/qianhai-holding-investment?lang=zh' },
  },
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'qianhai-holding-investment',
  title: {
    zh: '前海投控大厦',
    en: 'Qianhai Holding Investment Tower',
  },
  subtitle: {
    zh: '企业总部智能配电系统',
    en: 'Corporate Headquarters Intelligent Power Distribution System',
  },
  completionDate: '2023年3月',
  category: {
    zh: '企业总部',
    en: 'Corporate Headquarters',
  },
  heroImage: '/res/前海投控大厦.jpg',
  description: {
    zh: [
      '前海投控大厦作为现代化企业总部，集办公、会议、文化展示等多功能于一体。AIWASON为其设计的智能环网配电系统，不仅满足当前运营需求，更为未来的空间改造和功能扩展预留了充足的容量和灵活性。',
      '系统采用环网结构设计，确保各个功能区域的电力供应稳定可靠。办公区域可根据使用情况灵活调整电力分配，会议中心具备多场景用电模式，文化展示区域的照明系统可实现精确控制。',
      '智能监控系统对整栋大厦的能耗进行精细化管理，通过AI算法分析用电模式，自动调整供电策略以实现最佳的能效比。系统还具备预测性维护功能，能够提前发现潜在问题并安排维护计划。',
      '考虑到企业总部对形象和效率的双重要求，系统在保证高可靠性的同时，注重节能环保和智能化管理。切换操作无感知，为员工提供了舒适稳定的工作环境。',
    ],
    en: [
      'As a modern corporate headquarters, Qianhai Holding Investment Tower integrates multiple functions including offices, conferences, and cultural exhibitions. The intelligent ring network power distribution system designed by AIWASON not only meets current operational needs but also reserves sufficient capacity and flexibility for future space renovations and functional expansions.',
      'The system adopts a ring network structure design to ensure stable and reliable power supply for various functional areas. Office areas can flexibly adjust power distribution according to usage, the conference center has multi-scenario power modes, and the cultural exhibition area\'s lighting system can achieve precise control.',
      'The intelligent monitoring system provides refined management of the entire building\'s energy consumption. Through AI algorithms analyzing power usage patterns, it automatically adjusts power supply strategies to achieve optimal energy efficiency. The system also has predictive maintenance functions, able to identify potential problems in advance and schedule maintenance plans.',
      'Considering the dual requirements of corporate headquarters for image and efficiency, the system ensures high reliability while focusing on energy conservation and intelligent management. Switching operations are imperceptible, providing employees with a comfortable and stable working environment.',
    ],
  },
  keyFeatures: {
    zh: [
      '智能环网确保供电稳定',
      '预留容量应对未来扩展',
      '多功能区域灵活配电',
      '多场景用电模式切换',
      'AI算法优化能效管理',
      '预测性维护提前预警',
      '无感知切换操作',
      '精细化能耗管理',
    ],
    en: [
      'Intelligent ring network ensures stable power supply',
      'Reserved capacity for future expansions',
      'Flexible power distribution for multi-functional areas',
      'Multi-scenario power mode switching',
      'AI algorithms optimize energy efficiency management',
      'Predictive maintenance with advance warning',
      'Imperceptible switching operations',
      'Refined energy consumption management',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '3500A', en: '3500A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '建筑功能', en: 'Building Function' },
      value: { zh: '企业总部', en: 'Corporate Headquarters' },
    },
    {
      label: { zh: '系统架构', en: 'System Architecture' },
      value: { zh: '智能环网', en: 'Intelligent Ring Network' },
    },
    {
      label: { zh: '预留容量', en: 'Reserved Capacity' },
      value: { zh: '30%扩展空间', en: '30% Expansion Space' },
    },
    {
      label: { zh: '控制方式', en: 'Control Method' },
      value: { zh: 'AI智能控制', en: 'AI Intelligent Control' },
    },
  ],
  awards: [
    {
      name: { zh: '智能建筑系统创新奖', en: 'Intelligent Building System Innovation Award' },
      year: '2023',
      description: { zh: '在企业总部智能化建设方面的优秀表现', en: 'Excellence in corporate headquarters intelligent construction' },
      image: '/res/qianhai-investment-prize.png',
    },
  ],
  relatedLinks: [
    {
      label: { zh: '企业总部解决方案', en: 'Corporate Headquarters Solutions' },
      href: '/solutions/corporate-headquarters',
    },
    {
      label: { zh: '智能配电产品', en: 'Intelligent Power Distribution Products' },
      href: '/products/intelligent-distribution',
    },
  ],
}

export default async function QianhaiHoldingInvestmentPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
