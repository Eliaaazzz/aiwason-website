import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Qianhai Exchange Plaza | AIWASON',
  description: 'Backbone retrofit delivered in phases while trading floors remained in service.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'qianhai-trading-plaza',
  title: {
    zh: '前海交易广场',
    en: 'Qianhai Exchange Plaza',
  },
  subtitle: {
    zh: '金融交易中心智能配电系统',
    en: 'Financial Trading Center Intelligent Power Distribution System',
  },
  completionDate: '2023年6月',
  category: {
    zh: '金融建筑',
    en: 'Financial Building',
  },
  heroImage: '/res/前海交易广场.jpg',
  description: {
    zh: [
      '前海交易广场作为重要的金融交易中心，对电力系统的可靠性和连续性要求极高。AIWASON采用分期实施的策略，在保证交易功能全程不中断的前提下，完成了整个建筑的电力系统升级改造。',
      '项目最大的挑战在于如何在不影响日常交易业务的情况下，对关键电力设施进行更新换代。团队制定了详细的分阶段实施方案，利用夜间和节假日的时间窗口，逐步完成设备切换和系统升级。',
      '新系统采用双路冗余设计，确保任何单点故障都不会影响交易业务的正常进行。智能监控系统能够实时监测所有关键参数，一旦发现异常立即启动备用回路，实现无缝切换。',
      '项目还特别考虑了金融行业对数据安全的严格要求，配电系统的监控数据采用加密传输，确保敏感信息不会泄露。系统预留了扩展接口，为未来业务增长提供了充足的电力保障。',
    ],
    en: [
      'As an important financial trading center, Qianhai Exchange Plaza has extremely high requirements for power system reliability and continuity. AIWASON adopted a phased implementation strategy to complete the entire building\'s power system upgrade while ensuring uninterrupted trading functions.',
      'The project\'s biggest challenge was how to update critical power facilities without affecting daily trading operations. The team developed a detailed phased implementation plan, utilizing time windows during nights and holidays to gradually complete equipment switching and system upgrades.',
      'The new system adopts dual redundancy design to ensure that any single point of failure will not affect normal trading operations. The intelligent monitoring system can monitor all critical parameters in real-time and immediately activate backup circuits upon detecting anomalies, achieving seamless switching.',
      'The project also specially considered the financial industry\'s strict requirements for data security. The power distribution system\'s monitoring data uses encrypted transmission to ensure sensitive information will not be leaked. The system reserves expansion interfaces, providing sufficient power guarantee for future business growth.',
    ],
  },
  keyFeatures: {
    zh: [
      '分期实施不中断业务运营',
      '双路冗余确保交易连续性',
      '实时监控与无缝切换',
      '加密数据传输保障安全',
      '夜间时间窗口施工策略',
      '预留扩展接口应对增长',
      '关键参数智能监测',
      '备用回路自动启动',
    ],
    en: [
      'Phased implementation without interrupting operations',
      'Dual redundancy ensures trading continuity',
      'Real-time monitoring and seamless switching',
      'Encrypted data transmission ensures security',
      'Night-time window construction strategy',
      'Reserved expansion interfaces for growth',
      'Intelligent monitoring of critical parameters',
      'Automatic backup circuit activation',
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
      label: { zh: '建筑功能', en: 'Building Function' },
      value: { zh: '金融交易中心', en: 'Financial Trading Center' },
    },
    {
      label: { zh: '系统架构', en: 'System Architecture' },
      value: { zh: '双路冗余', en: 'Dual Redundancy' },
    },
    {
      label: { zh: '实施方式', en: 'Implementation Method' },
      value: { zh: '分期改造', en: 'Phased Retrofit' },
    },
    {
      label: { zh: '数据安全', en: 'Data Security' },
      value: { zh: '加密传输', en: 'Encrypted Transmission' },
    },
  ],
  awards: [
    {
      name: { zh: '金融建筑电力系统优秀奖', en: 'Financial Building Power System Excellence Award' },
      year: '2023',
      description: { zh: '在保障金融交易连续性方面的杰出贡献', en: 'Outstanding contribution to ensuring financial trading continuity' },
      image: '/res/前海交易广场获奖.jpg',
    },
  ],
  relatedLinks: [
    {
      label: { zh: '金融建筑解决方案', en: 'Financial Building Solutions' },
      href: '/solutions/financial-buildings',
    },
    {
      label: { zh: '冗余电力系统产品', en: 'Redundant Power System Products' },
      href: '/products/redundant-power',
    },
  ],
}

export default async function QianhaiTradingPlazaPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
