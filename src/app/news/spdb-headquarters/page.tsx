// src/app/news/spdb-headquarters/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Shanghai Pudong Development Bank Headquarters | AIWASON',
  description: 'Financial sector intelligent power distribution with high-security and reliability standards.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'spdb-headquarters',
  title: {
    zh: '浦发银行总部大厦',
    en: 'Shanghai Pudong Development Bank Headquarters',
  },
  subtitle: {
    zh: '金融级智能配电安全标杆',
    en: 'Financial-Grade Intelligent Power Distribution Security Benchmark',
  },
  location: {
    zh: '上海市浦东新区',
    en: 'Pudong New Area, Shanghai',
  },
  completionDate: '2019年12月',
  category: {
    zh: '金融建筑',
    en: 'Financial Building',
  },
  heroImage: '/res/浦发银行总部大厦.jpg',
  description: {
    zh: [
      '浦发银行总部大厦是上海金融中心的重要地标，建筑高度200米，总建筑面积12万平方米。作为大型银行的总部，该建筑对电力系统的安全性、稳定性和智能化管理提出了极高要求。AIWASON为其提供了金融级的耐火智能光电母线解决方案。',
      '金融机构的电力系统必须具备超高的可靠性和安全性。我们设计了多级备份的冗余架构，包括双路市电、柴发系统、UPS系统的智能协调。光电母线系统实现了从配电室到各楼层的全程智能监控，确保金融数据中心7×24小时不间断运行。',
      '项目采用了先进的故障预警技术，通过温度、电流、电压等多参数实时监测，能够在故障发生前进行预警。智能化管理平台与银行的运营管理系统进行了深度集成，实现了电力系统的自动化运维。',
      '考虑到金融机构的特殊安全需求，系统配置了多重安全防护措施，包括防火、防雷、防潮等全方位保护。该项目成为了金融建筑智能配电系统的行业标杆，获得了业界的广泛认可。',
    ],
    en: [
      'The Shanghai Pudong Development Bank Headquarters is an important landmark in Shanghai\'s financial center, with a building height of 200 meters and a total floor area of 120,000 square meters. As the headquarters of a large bank, this building has extremely high requirements for power system security, stability, and intelligent management. AIWASON provides financial-grade fire-resistant intelligent optoelectronic busbar solutions for it.',
      'The power system of financial institutions must have ultra-high reliability and security. We designed a multi-level backup redundancy architecture, including intelligent coordination of dual municipal power, diesel generator systems, and UPS systems. The optoelectronic busbar system achieves full intelligent monitoring from distribution rooms to each floor, ensuring 7×24 uninterrupted operation of the financial data center.',
      'The project adopts advanced fault warning technology, which can provide early warnings before faults occur through real-time monitoring of multiple parameters such as temperature, current, and voltage. The intelligent management platform is deeply integrated with the bank\'s operational management system, achieving automated operation and maintenance of the power system.',
      'Considering the special security needs of financial institutions, the system is configured with multiple security protection measures, including comprehensive protection against fire, lightning, and moisture. This project has become an industry benchmark for intelligent power distribution systems in financial buildings and has received widespread recognition in the industry.',
    ],
  },
  keyFeatures: {
    zh: [
      '金融级安全防护',
      '多级备份冗余架构',
      '7×24小时不间断运行',
      '故障预警技术',
      '智能化管理平台',
      '与银行系统深度集成',
      '全方位安全保护',
      '行业标杆认可',
    ],
    en: [
      'Financial-grade security protection',
      'Multi-level backup redundancy architecture',
      '7×24 uninterrupted operation',
      'Fault warning technology',
      'Intelligent management platform',
      'Deep integration with banking systems',
      'Comprehensive security protection',
      'Industry benchmark recognition',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '5000A', en: '5000A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '建筑高度', en: 'Building Height' },
      value: { zh: '200米', en: '200m' },
    },
    {
      label: { zh: '建筑面积', en: 'Floor Area' },
      value: { zh: '12万平方米', en: '120,000 sqm' },
    },
    {
      label: { zh: '可靠性', en: 'Reliability' },
      value: { zh: '99.99%', en: '99.99%' },
    },
    {
      label: { zh: '安全等级', en: 'Security Level' },
      value: { zh: '金融级', en: 'Financial Grade' },
    },
  ],
  awards: [
    {
      name: { zh: '中国金融建筑奖', en: 'China Financial Architecture Award' },
      year: '2020',
      description: { zh: '金融建筑设计与技术应用优秀项目', en: 'Excellence in financial building design and technology application' },
    },
    {
      name: { zh: '上海市优秀工程奖', en: 'Shanghai Excellent Engineering Award' },
      year: '2020',
      description: { zh: '工程建设质量与技术创新双重认可', en: 'Dual recognition for engineering construction quality and technological innovation' },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '金融建筑解决方案', en: 'Financial Building Solutions' },
      href: '/solutions/financial-buildings',
    },
    {
      label: { zh: '数据中心供电', en: 'Data Center Power Supply' },
      href: '/products/data-center-power',
    },
  ],
}

export default async function SPDBHeadquartersPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}