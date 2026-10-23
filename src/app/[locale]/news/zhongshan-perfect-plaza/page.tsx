import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'
import perfectPlazaPrize from '@/assets/images/perfectPlazaPrize.png'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export const metadata: Metadata = {
  title: 'Zhongshan Perfect Golden Eagle Plaza',
  description: 'Fire-rated ring bus serves mall, offices and hotel with maintenance possible under load.',
  alternates: {
    canonical: '/news/zhongshan-perfect-plaza',
    languages: { en: '/news/zhongshan-perfect-plaza?lang=en', zh: '/news/zhongshan-perfect-plaza?lang=zh' },
  },
}

type PageProps = { params: Promise<{ locale: string }> }

const projectData: ProjectDetail = {
  id: 'zhongshan-perfect-plaza',
  title: {
    zh: '中山完美金鹰广场',
    en: 'Zhongshan Perfect Golden Eagle Plaza',
  },
  subtitle: {
    zh: '大型城市综合体智能配电系统',
    en: 'Large Urban Complex Intelligent Power Distribution System',
  },
  completionDate: '2022年9月',
  category: {
    zh: '城市综合体',
    en: 'Urban Complex',
  },
  heroImage: '/res/zhonshan perfect plaza.jpg',
  description: {
    zh: [
      '中山完美金鹰广场是集购物中心、甲级写字楼、五星级酒店于一体的大型城市综合体项目。项目总建筑面积超过30万平方米，AIWASON为其提供了全面的耐火智能光电母线解决方案。',
      '项目采用环网结构设计，确保商业、办公、酒店三大功能区域的电力供应安全可靠。系统具备带电检修能力，在不中断供电的情况下完成设备维护，保证了商业运营的连续性。',
      '针对综合体多业态的特点，系统实现了分区管理和分时控制。购物中心的照明系统可根据营业时间自动调节，办公区域的空调系统可按楼层独立控制，酒店区域的客房电力可实现精确计量。',
      '智能监测系统对整个建筑的能耗进行实时监控和分析，通过AI算法优化电力分配，显著降低了运营成本。系统预留了充电桩和储能设备接口，为未来的绿色能源应用提供了技术基础。',
    ],
    en: [
      'Zhongshan Perfect Golden Eagle Plaza is a large urban complex project integrating shopping center, Grade A office buildings, and five-star hotel. With a total construction area of over 300,000 square meters, AIWASON provides comprehensive fire-resistant intelligent optoelectronic busbar solutions.',
      'The project adopts a ring network structure design to ensure safe and reliable power supply for the three major functional areas: commercial, office, and hotel. The system has live maintenance capability, completing equipment maintenance without interrupting power supply, ensuring continuity of commercial operations.',
      'Targeting the multi-format characteristics of the complex, the system realizes zoned management and time-based control. The shopping center\'s lighting system can automatically adjust according to business hours, the office area\'s air conditioning system can be independently controlled by floor, and the hotel area\'s guest room power can achieve precise metering.',
      'The intelligent monitoring system provides real-time monitoring and analysis of the entire building\'s energy consumption. Through AI algorithms to optimize power distribution, operating costs are significantly reduced. The system reserves interfaces for charging piles and energy storage equipment, providing a technical foundation for future green energy applications.',
    ],
  },
  keyFeatures: {
    zh: [
      '环网结构确保供电可靠性',
      '带电检修不中断商业运营',
      '多业态分区智能管理',
      '分时控制优化能源使用',
      '实时能耗监控与分析',
      'AI算法优化电力分配',
      '预留绿色能源接口',
      '精确的分区计量系统',
    ],
    en: [
      'Ring network structure ensures power supply reliability',
      'Live maintenance without interrupting commercial operations',
      'Multi-format zoned intelligent management',
      'Time-based control optimizes energy usage',
      'Real-time energy monitoring and analysis',
      'AI algorithms optimize power distribution',
      'Reserved green energy interfaces',
      'Precise zoned metering system',
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
      label: { zh: '建筑面积', en: 'Building Area' },
      value: { zh: '30万㎡', en: '300,000㎡' },
    },
    {
      label: { zh: '功能分区', en: 'Functional Zones' },
      value: { zh: '商业/办公/酒店', en: 'Commercial/Office/Hotel' },
    },
    {
      label: { zh: '系统架构', en: 'System Architecture' },
      value: { zh: '环网结构', en: 'Ring Network' },
    },
    {
      label: { zh: '维护方式', en: 'Maintenance Method' },
      value: { zh: '带电检修', en: 'Live Maintenance' },
    },
  ],
  awards: [
    {
      name: { zh: '项目外立面实景', en: 'Project Exterior View' },
      year: '2023',
      description: {
        zh: '展示完美金鹰广场商业、办公与酒店一体化的外部景观。',
        en: 'Exterior photo highlighting the integrated commercial, office, and hotel functions.',
      },
      image: '/res/中山完美金鹰广场.jpg',
    },
    {
      name: { zh: '绿色建筑三星认证', en: 'Green Building Three-Star Certification' },
      year: '2022',
      description: { zh: '在节能环保方面的突出表现', en: 'Outstanding performance in energy conservation and environmental protection' },
      image: perfectPlazaPrize,
    },
  ],
  relatedLinks: [
    {
      label: { zh: '城市综合体解决方案', en: 'Urban Complex Solutions' },
      href: '/solutions/urban-complex',
    },
    {
      label: { zh: '商业建筑配电产品', en: 'Commercial Building Power Products' },
      href: '/products/commercial-power',
    },
  ],
}

export default async function ZhongshanPerfectPlazaPage({ params }: PageProps) {
  const { locale } = await params
  const lang = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
