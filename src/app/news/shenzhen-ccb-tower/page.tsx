import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Shenzhen CCB Tower | AIWASON',
  description: 'Dual redundancy with biometric interlocks secures trading floors and vault branches.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'shenzhen-ccb-tower',
  title: {
    zh: '深圳建行大厦',
    en: 'Shenzhen China Construction Bank Tower',
  },
  subtitle: {
    zh: '金融级智能配电系统',
    en: 'Financial-grade Intelligent Power Distribution System',
  },
  completionDate: '2023年5月',
  category: {
    zh: '金融建筑',
    en: 'Financial Building',
  },
  heroImage: '/res/浦发银行总部大厦.jpg',
  description: {
    zh: [
      '深圳建行大厦作为中国建设银行在深圳的重要金融中心，对电力系统的安全性和可靠性要求极高。AIWASON为其设计的双路冗余配电系统，结合生物识别联动技术，为交易大厅和金库支路提供了最高级别的安全保障。',
      '系统的核心特色在于其智能化的安全管理机制。关键分接点配备了生物识别联动系统，只有授权人员才能进行操作，确保了电力系统的操作安全。金库支路采用2小时耐火设计，并集成了温度监测系统。',
      '双路冗余架构确保了银行业务的连续性。主用供电回路和备用回路实现了完全隔离，一旦主路出现问题，备用回路可以在毫秒级别实现无缝切换，保证交易系统不中断。',
      '智能监控系统对整个大厦的电力运行状态进行24/7实时监控，包括电压、电流、功率因数等关键参数。系统还具备预测性维护功能，能够提前发现潜在问题并及时预警，确保银行业务的稳定运行。',
    ],
    en: [
      'As an important financial center of China Construction Bank in Shenzhen, Shenzhen CCB Tower has extremely high requirements for power system security and reliability. The dual redundancy power distribution system designed by AIWASON, combined with biometric interlock technology, provides the highest level of security for trading floors and vault branches.',
      'The core feature of the system lies in its intelligent security management mechanism. Critical tap-off points are equipped with biometric interlock systems, allowing only authorized personnel to operate, ensuring operational security of the power system. Vault branches adopt 2-hour fire-resistant design and integrate temperature monitoring systems.',
      'The dual redundancy architecture ensures business continuity for banking operations. Main and backup power supply circuits achieve complete isolation. Once the main circuit encounters problems, the backup circuit can achieve seamless switching at millisecond level, ensuring uninterrupted trading systems.',
      'The intelligent monitoring system provides 24/7 real-time monitoring of the entire building\'s power operation status, including key parameters such as voltage, current, and power factor. The system also has predictive maintenance capabilities, able to identify potential problems in advance and provide timely warnings, ensuring stable operation of banking business.',
    ],
  },
  keyFeatures: {
    zh: [
      '双路冗余确保业务连续性',
      '生物识别联动安全控制',
      '关键分接点授权管理',
      '金库支路2小时耐火',
      '温度监测集成系统',
      '毫秒级无缝切换',
      '24/7实时状态监控',
      '预测性维护预警',
    ],
    en: [
      'Dual redundancy ensures business continuity',
      'Biometric interlock security control',
      'Authorized management of critical tap-offs',
      '2-hour fire resistance for vault branches',
      'Integrated temperature monitoring system',
      'Millisecond-level seamless switching',
      '24/7 real-time status monitoring',
      'Predictive maintenance warnings',
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
      label: { zh: '建筑类型', en: 'Building Type' },
      value: { zh: '金融大厦', en: 'Financial Tower' },
    },
    {
      label: { zh: '安全级别', en: 'Security Level' },
      value: { zh: '金融级', en: 'Financial Grade' },
    },
    {
      label: { zh: '冗余架构', en: 'Redundancy Architecture' },
      value: { zh: '双路冗余', en: 'Dual Redundancy' },
    },
    {
      label: { zh: '耐火等级', en: 'Fire Resistance' },
      value: { zh: '2小时', en: '2 Hours' },
    },
  ],
  awards: [
    {
      name: { zh: '金融建筑智能化优秀奖', en: 'Financial Building Intelligence Excellence Award' },
      year: '2023',
      description: { zh: '在金融建筑智能化建设方面的杰出贡献', en: 'Outstanding contribution to financial building intelligence construction' },
    },
    {
      name: { zh: '电力系统安全认证', en: 'Power System Security Certification' },
      year: '2023',
      description: { zh: '通过金融行业最高安全标准认证', en: 'Passed the highest security standard certification in financial industry' },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '金融建筑解决方案', en: 'Financial Building Solutions' },
      href: '/solutions/financial-buildings',
    },
    {
      label: { zh: '安全配电产品', en: 'Secure Power Distribution Products' },
      href: '/products/secure-power',
    },
  ],
}

export default async function ShenzhenCCBTowerPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}