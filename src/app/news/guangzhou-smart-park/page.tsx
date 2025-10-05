import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Guangzhou Smart Park | AIWASON',
  description: 'Campus busways enable flexible lab and office layouts with transparent energy data.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'guangzhou-smart-park',
  title: {
    zh: '广州智慧园区',
    en: 'Guangzhou Smart Park',
  },
  subtitle: {
    zh: '智慧科技园区配电系统',
    en: 'Smart Technology Park Power Distribution System',
  },
  completionDate: '2023年10月',
  category: {
    zh: '科技园区',
    en: 'Technology Park',
  },
  heroImage: '/res/广州新一代技术信息产业园.jpg',
  description: {
    zh: [
      '广州智慧园区作为新一代技术信息产业园，汇聚了众多高科技企业和研发机构。AIWASON设计的园区级母线系统，为实验室、办公区域提供了灵活的电力配置方案，满足不同类型企业的个性化用电需求。',
      '系统最大的特色在于其高度的灵活性和可扩展性。实验室区域的电力配置可根据研发项目的变化快速调整，办公区域可以灵活分割和重组，每个功能单元都能独立计量和管理用电。',
      '智能能耗管理平台为园区管理者和入驻企业提供了透明、可视的能源数据。企业可以实时了解自己的用电情况和成本，园区管理者可以进行整体的能源优化调度。',
      '作为智慧城市建设的示范项目，该园区在绿色低碳、智能管理等方面树立了行业标杆。系统集成了多种清洁能源接口，为园区的可持续发展提供了技术支撑。',
    ],
    en: [
      'As a next-generation technology and information industry park, Guangzhou Smart Park brings together numerous high-tech enterprises and R&D institutions. The campus-level busbar system designed by AIWASON provides flexible power configuration solutions for laboratories and office areas, meeting the personalized power needs of different types of enterprises.',
      'The system\'s greatest feature is its high flexibility and scalability. Power configurations in laboratory areas can be quickly adjusted according to changes in R&D projects, office areas can be flexibly divided and reorganized, and each functional unit can independently meter and manage power consumption.',
      'The intelligent energy management platform provides transparent and visible energy data for park managers and tenant enterprises. Companies can understand their power consumption and costs in real-time, while park managers can perform overall energy optimization scheduling.',
      'As a demonstration project for smart city construction, this park has set industry benchmarks in green low-carbon and intelligent management. The system integrates multiple clean energy interfaces, providing technical support for the park\'s sustainable development.',
    ],
  },
  keyFeatures: {
    zh: [
      '园区级母线灵活配置',
      '实验室快速电力调整',
      '办公区域灵活分割重组',
      '独立计量与管理',
      '透明可视能源数据',
      '实时用电成本监控',
      '整体能源优化调度',
      '多种清洁能源接口',
    ],
    en: [
      'Campus-level busbar flexible configuration',
      'Rapid power adjustment for laboratories',
      'Flexible office area division and reorganization',
      'Independent metering and management',
      'Transparent and visible energy data',
      'Real-time power cost monitoring',
      'Overall energy optimization scheduling',
      'Multiple clean energy interfaces',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '6000A', en: '6000A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '园区类型', en: 'Park Type' },
      value: { zh: '科技产业园', en: 'Technology Industry Park' },
    },
    {
      label: { zh: '功能分区', en: 'Functional Zones' },
      value: { zh: '实验室/办公/配套', en: 'Laboratory/Office/Supporting' },
    },
    {
      label: { zh: '管理模式', en: 'Management Mode' },
      value: { zh: '智能化分级管理', en: 'Intelligent Hierarchical Management' },
    },
    {
      label: { zh: '清洁能源', en: 'Clean Energy' },
      value: { zh: '多接口预留', en: 'Multiple Interface Reserved' },
    },
  ],
  awards: [
    {
      name: { zh: '世界智慧城市大奖', en: 'World Smart Cities Award' },
      year: '2024',
      description: { zh: '智慧园区建设的杰出成就', en: 'Outstanding achievement in smart park construction' },
    },
    {
      name: { zh: '绿色园区认证', en: 'Green Park Certification' },
      year: '2023',
      description: { zh: '在绿色低碳发展方面的示范作用', en: 'Demonstration role in green low-carbon development' },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '智慧园区解决方案', en: 'Smart Park Solutions' },
      href: '/solutions/smart-parks',
    },
    {
      label: { zh: '园区级配电产品', en: 'Campus-level Power Distribution Products' },
      href: '/products/campus-power',
    },
  ],
}

export default async function GuangzhouSmartParkPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}