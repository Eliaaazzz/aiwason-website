// src/app/news/airport-upgrade/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export const metadata: Metadata = {
  title: 'Shenzhen Bao\'an International Airport Upgrade',
  description: 'Fire-rated busways link terminals, data rooms and baggage systems for 24/7 operation.',
  alternates: {
    canonical: '/news/airport-upgrade',
    languages: { en: '/news/airport-upgrade?lang=en', zh: '/news/airport-upgrade?lang=zh' },
  },
}

type PageProps = { params: Promise<{ locale: string }> }

const projectData: ProjectDetail = {
  id: 'airport-upgrade',
  title: {
    zh: '深圳宝安国际机场升级项目',
    en: 'Shenzhen Bao\'an International Airport Upgrade',
  },
  subtitle: {
    zh: '航空枢纽24/7智能配电系统',
    en: '24/7 Intelligent Power Distribution for Aviation Hub',
  },
  location: {
    zh: '深圳市宝安区福永街道',
    en: 'Fuyong Street, Bao\'an District, Shenzhen',
  },
  completionDate: '2024年3月',
  category: {
    zh: '交通枢纽',
    en: 'Transportation Hub',
  },
  heroImage: '/res/gallery-46.jpg',
  description: {
    zh: [
      '深圳宝安国际机场作为大湾区重要的航空枢纽，年客流量超过5000万人次。机场T3航站楼扩建工程对电力系统提出了极高的可靠性要求。AIWASON为该项目提供了全面的耐火智能光电母线升级方案。',
      '项目覆盖航站楼、数据中心、行李处理系统等关键区域，采用冗余配电架构确保24小时不间断运行。系统集成了先进的故障预警技术，能够在故障发生前提前预警，最大限度减少对航班运营的影响。',
      '针对机场复杂的运营环境，系统设计了多级安全保护机制。重要设备采用双路供电，关键负载配置UPS备用电源。智能监测系统实时监控电力质量，确保精密设备的稳定运行。',
      '项目还考虑了未来的扩展需求，预留了充足的电力容量和接口。随着机场智能化程度的不断提高，系统能够支持新技术设备的接入，保障机场的持续发展。',
    ],
    en: [
      'Shenzhen Bao\'an International Airport, as an important aviation hub in the Greater Bay Area, handles over 50 million passengers annually. The T3 terminal expansion project places extremely high reliability requirements on the power system. AIWASON provides a comprehensive fire-resistant intelligent optoelectronic busbar upgrade solution for this project.',
      'The project covers critical areas including terminals, data centers, and baggage handling systems, adopting redundant power distribution architecture to ensure 24-hour uninterrupted operation. The system integrates advanced fault warning technology that can provide early warnings before faults occur, minimizing impact on flight operations.',
      'Targeting the complex operating environment of airports, the system designs multi-level safety protection mechanisms. Important equipment adopts dual power supply, and critical loads are configured with UPS backup power. The intelligent monitoring system provides real-time monitoring of power quality to ensure stable operation of precision equipment.',
      'The project also considers future expansion needs, reserving sufficient power capacity and interfaces. As the airport\'s level of intelligence continues to improve, the system can support the integration of new technology equipment, ensuring the airport\'s sustainable development.',
    ],
  },
  keyFeatures: {
    zh: [
      '航站楼与空侧冗余架构',
      '24/7不间断运行保障',
      '关键负载状态监测',
      '多级安全保护机制',
      '双路供电确保可靠性',
      '实时电力质量监控',
      '故障预警与快速隔离',
      '预留未来扩展接口',
    ],
    en: [
      'Terminal and airside redundancy architecture',
      '24/7 uninterrupted operation guarantee',
      'Critical load condition monitoring',
      'Multi-level safety protection mechanisms',
      'Dual power supply ensures reliability',
      'Real-time power quality monitoring',
      'Fault warning and rapid isolation',
      'Reserved future expansion interfaces',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '8000A', en: '8000A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '35kV/10kV/380V', en: '35kV/10kV/380V' },
    },
    {
      label: { zh: '覆盖区域', en: 'Coverage Area' },
      value: { zh: 'T3航站楼/行李系统/数据中心', en: 'T3 Terminal/Baggage System/Data Center' },
    },
    {
      label: { zh: '年客流量', en: 'Annual Passenger Flow' },
      value: { zh: '5000万+', en: '50M+' },
    },
    {
      label: { zh: '运行模式', en: 'Operation Mode' },
      value: { zh: '24/7连续运行', en: '24/7 Continuous Operation' },
    },
    {
      label: { zh: '冗余等级', en: 'Redundancy Level' },
      value: { zh: 'N+1', en: 'N+1' },
    },
  ],
  awards: [
    {
      name: { zh: '民航基础设施建设优秀奖', en: 'Civil Aviation Infrastructure Excellence Award' },
      year: '2024',
      description: { zh: '在机场电力系统升级改造中的卓越表现', en: 'Outstanding performance in airport power system upgrade and renovation' },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '交通枢纽解决方案', en: 'Transportation Hub Solutions' },
      href: '/solutions/transportation',
    },
    {
      label: { zh: '关键基础设施配电', en: 'Critical Infrastructure Power Distribution' },
      href: '/products/critical-infrastructure',
    },
  ],
}

export default async function AirportUpgradePage({ params }: PageProps) {
  const { locale } = await params
  const lang = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}