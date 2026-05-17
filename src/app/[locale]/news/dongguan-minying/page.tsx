import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Dongguan Minying International Trade Center | AIWASON',
  description: 'LEED-aligned upgrade with circuit-level metering and modular capacity additions.',
  alternates: {
    canonical: '/news/dongguan-minying',
    languages: { en: '/news/dongguan-minying?lang=en', zh: '/news/dongguan-minying?lang=zh' },
  },
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'dongguan-minying',
  title: {
    zh: '东莞民盈国贸中心',
    en: 'Dongguan Minying International Trade Center',
  },
  subtitle: {
    zh: 'LEED绿色建筑配电系统',
    en: 'LEED Green Building Power Distribution System',
  },
  completionDate: '2022年12月',
  category: {
    zh: '绿色建筑',
    en: 'Green Building',
  },
  heroImage: '/res/东莞民盈国贸.jpg',
  description: {
    zh: [
      '东莞民盈国贸中心按照美国LEED绿色建筑标准进行设计和建设，AIWASON为其提供的电力系统升级方案严格遵循LEED理念，实现了能源使用的精确计量和高效管理。',
      '项目的核心特色是回路级精确计量系统，能够对每个用电回路进行独立监测和分析。这不仅满足了LEED认证的要求，更为建筑运营管理提供了详细的能耗数据支撑。',
      '系统采用模块化设计理念，扩容路径清晰明确。随着业务发展和租户需求变化，可以快速增加配电容量而不影响现有系统的正常运行，充分体现了可持续发展的设计思想。',
      '智能化管理平台集成了能源管理、设备监控、环境控制等多个子系统，为建筑获得LEED金级认证提供了重要的技术支撑。系统还预留了可再生能源接入接口，为未来的绿色能源应用奠定了基础。',
    ],
    en: [
      'Designed and constructed according to US LEED green building standards, the Dongguan Minying International Trade Center received a power system upgrade solution from AIWASON that strictly follows LEED principles, achieving precise metering and efficient management of energy use.',
      'The project\'s core feature is the circuit-level precise metering system, which can independently monitor and analyze each power circuit. This not only meets LEED certification requirements but also provides detailed energy consumption data support for building operation management.',
      'The system adopts a modular design concept with clear and definite expansion paths. With business development and changing tenant needs, power distribution capacity can be quickly increased without affecting normal operation of existing systems, fully embodying sustainable development design philosophy.',
      'The intelligent management platform integrates multiple subsystems including energy management, equipment monitoring, and environmental control, providing important technical support for the building to achieve LEED Gold certification. The system also reserves renewable energy access interfaces, laying the foundation for future green energy applications.',
    ],
  },
  keyFeatures: {
    zh: [
      'LEED标准严格遵循',
      '回路级精确计量',
      '独立监测与分析',
      '详细能耗数据支撑',
      '模块化设计理念',
      '清晰明确扩容路径',
      '可持续发展设计',
      '可再生能源预留接口',
    ],
    en: [
      'Strict adherence to LEED standards',
      'Circuit-level precise metering',
      'Independent monitoring and analysis',
      'Detailed energy consumption data support',
      'Modular design concept',
      'Clear and definite expansion paths',
      'Sustainable development design',
      'Reserved renewable energy interfaces',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '4500A', en: '4500A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '绿色认证', en: 'Green Certification' },
      value: { zh: 'LEED金级', en: 'LEED Gold' },
    },
    {
      label: { zh: '计量精度', en: 'Metering Accuracy' },
      value: { zh: '回路级精确计量', en: 'Circuit-level Precise Metering' },
    },
    {
      label: { zh: '扩容方式', en: 'Expansion Method' },
      value: { zh: '模块化扩容', en: 'Modular Expansion' },
    },
    {
      label: { zh: '能源管理', en: 'Energy Management' },
      value: { zh: '智能化集成平台', en: 'Intelligent Integrated Platform' },
    },
  ],
  awards: [
    {
      name: { zh: '美国LEED金级认证', en: 'US LEED Gold Certification' },
      year: '2023',
      description: { zh: '绿色建筑领域的最高荣誉', en: 'Highest honor in green building field' },
      image: '/res/东莞民盈国贸美国LEED.jpg',
    },
    {
      name: { zh: '绿色建筑创新奖', en: 'Green Building Innovation Award' },
      year: '2023',
      description: { zh: '在绿色建筑技术创新方面的杰出贡献', en: 'Outstanding contribution to green building technology innovation' },
      image: '/res/东莞民盈国贸美国LEED2.jpg',
    },
  ],
  relatedLinks: [
    {
      label: { zh: '绿色建筑解决方案', en: 'Green Building Solutions' },
      href: '/solutions/green-buildings',
    },
    {
      label: { zh: 'LEED认证配电产品', en: 'LEED Certified Power Distribution Products' },
      href: '/products/leed-certified',
    },
  ],
}

export default async function DongguanMinyingPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
