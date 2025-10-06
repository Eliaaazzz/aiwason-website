// src/app/news/mixc-complex/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'MixC Urban Complex Project | AIWASON',
  description: 'Large-scale commercial complex with integrated retail, office, and entertainment power distribution.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'mixc-complex',
  title: {
    zh: '万象汇城市综合体',
    en: 'MixC Urban Complex',
  },
  subtitle: {
    zh: '大型商业综合体智能配电典范',
    en: 'Large-Scale Commercial Complex Intelligent Power Distribution Exemplar',
  },
  location: {
    zh: '深圳市南山区',
    en: 'Nanshan District, Shenzhen',
  },
  completionDate: '2018年10月',
  category: {
    zh: '商业综合体',
    en: 'Commercial Complex',
  },
  heroImage: '/res/万象汇.jpeg',
  description: {
    zh: [
      '万象汇城市综合体是深圳南山区的地标性商业项目，总建筑面积超过30万平方米，集购物中心、写字楼、酒店、娱乐设施于一体。作为华润置地的旗舰项目，该综合体对电力系统的智能化、节能化和可靠性提出了极高要求。AIWASON为其提供了全面的耐火智能光电母线解决方案。',
      '商业综合体的电力需求复杂多样，涵盖零售、办公、娱乐、餐饮等多种业态。我们设计了分区域、分业态的智能配电架构，实现了不同区域的独立控制和统一管理。系统支持24小时不间断运营，确保商业活动的连续性。',
      '项目采用了先进的能效管理技术，通过智能负荷控制和峰谷电价优化，实现了显著的节能效果。光电母线系统的智能监控功能，使管理人员能够实时掌握各区域的用电情况，优化运营成本。',
      '考虑到商业综合体的人流密集特点，系统配置了完善的应急疏散照明和消防联动系统。在紧急情况下，能够快速响应并引导人员安全疏散，确保顾客和员工的生命安全。',
    ],
    en: [
      'The MixC Urban Complex is a landmark commercial project in Nanshan District, Shenzhen, with a total floor area of over 300,000 square meters, integrating shopping centers, office buildings, hotels, and entertainment facilities. As a flagship project of China Resources Land, this complex has extremely high requirements for power system intelligence, energy efficiency, and reliability. AIWASON provides comprehensive fire-resistant intelligent optoelectronic busbar solutions for it.',
      'The power demand of commercial complexes is complex and diverse, covering various business formats such as retail, office, entertainment, and catering. We designed an intelligent power distribution architecture based on zones and business formats, achieving independent control and unified management of different areas. The system supports 24-hour uninterrupted operation, ensuring the continuity of commercial activities.',
      'The project adopts advanced energy efficiency management technology, achieving significant energy-saving effects through intelligent load control and peak-valley electricity price optimization. The intelligent monitoring function of the optoelectronic busbar system enables management personnel to grasp the electricity consumption situation of each area in real time and optimize operating costs.',
      'Considering the dense crowd characteristics of commercial complexes, the system is configured with comprehensive emergency evacuation lighting and fire linkage systems. In emergency situations, it can respond quickly and guide personnel to evacuate safely, ensuring the life safety of customers and employees.',
    ],
  },
  keyFeatures: {
    zh: [
      '分区域分业态配电',
      '24小时不间断运营',
      '智能能效管理',
      '峰谷电价优化',
      '实时用电监控',
      '应急疏散照明',
      '消防联动系统',
      '运营成本优化',
    ],
    en: [
      'Zoned and business-format power distribution',
      '24-hour uninterrupted operation',
      'Intelligent energy efficiency management',
      'Peak-valley electricity price optimization',
      'Real-time electricity consumption monitoring',
      'Emergency evacuation lighting',
      'Fire linkage system',
      'Operating cost optimization',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '4000A', en: '4000A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '建筑面积', en: 'Floor Area' },
      value: { zh: '30万平方米', en: '300,000 sqm' },
    },
    {
      label: { zh: '业态数量', en: 'Business Formats' },
      value: { zh: '6大业态', en: '6 Major Formats' },
    },
    {
      label: { zh: '节能效果', en: 'Energy Saving' },
      value: { zh: '25%', en: '25%' },
    },
    {
      label: { zh: '运营时间', en: 'Operating Hours' },
      value: { zh: '24小时', en: '24 Hours' },
    },
  ],
  awards: [
    {
      name: { zh: '中国商业建筑奖', en: 'China Commercial Architecture Award' },
      year: '2019',
      description: { zh: '商业建筑设计与技术应用创新奖', en: 'Innovation award for commercial building design and technology application' },
      image: '/res/万象汇.jpeg',
    },
    {
      name: { zh: '深圳市绿色建筑奖', en: 'Shenzhen Green Building Award' },
      year: '2019',
      description: { zh: '节能环保技术应用优秀项目', en: 'Excellence in energy-saving and environmental protection technology application' },
      image: '/res/东莞民盈国贸美国LEED2.jpg',
    },
  ],
  relatedLinks: [
    {
      label: { zh: '商业综合体解决方案', en: 'Commercial Complex Solutions' },
      href: '/solutions/commercial-complex',
    },
    {
      label: { zh: '能效管理系统', en: 'Energy Management Systems' },
      href: '/products/energy-management',
    },
  ],
}

export default async function MixCComplexPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
