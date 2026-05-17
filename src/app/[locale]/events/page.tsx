import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export const metadata: Metadata = {
  title: 'Qianhai International Conference Center | AIWASON',
  description: 'Fire-resistant intelligent power distribution empowering large-scale conferences in Shenzhen Qianhai.',
  alternates: {
    canonical: '/events/datacenter-summit',
    languages: { en: '/events/datacenter-summit?lang=en', zh: '/events/datacenter-summit?lang=zh' },
  },
}

type PageProps = { params: Promise<{ locale: string }> }

const projectData: ProjectDetail = {
  id: 'qianhai-conference-center',
  title: {
    zh: '深圳前海国际会议中心',
    en: 'Shenzhen Qianhai International Conference Center',
  },
  subtitle: {
    zh: '国际会展枢纽的耐火智能输配电体系',
    en: 'Fire-Resistant Intelligent Power Backbone for a Global Convention Hub',
  },
  location: {
    zh: '中国 · 深圳 · 前海合作区',
    en: 'Qianhai Cooperation Zone, Shenzhen, China',
  },
  completionDate: '2024年08月',
  category: {
    zh: '会议会展',
    en: 'Convention & Exhibition',
  },
  heroImage: '/res/conference.jpg',
  description: {
    zh: [
      '深圳前海国际会议中心定位为粤港澳大湾区的国际会展枢纽，承担全球领导者与产业先锋的高规格峰会活动。AIWASON 提供的耐火智能光电母线方案，建立起场馆高效、安全、绿色的能源骨干。',
      '双路环网结构覆盖主会议厅、分论坛、媒体中心与后勤区域，关键节点实现 2 小时耐火与实时温升监测。系统支持峰会期间的高负载切换，并确保重要通信与广播系统的独立供电。',
      '我们将智慧感知接入场馆综合运维平台，提供回路级能耗分析、负载预警与应急联动策略。通过云端巡检与专家远程支持，保障国际会议期间的零中断运行体验。',
      '项目同步规划未来扩展能力，可快速新增展览模块与临时演播区，保持供配电系统的冗余与可升级性，为大型会议提供可持续的能源支撑。',
    ],
    en: [
      'Positioned as the convention hub for the Guangdong–Hong Kong–Macao Greater Bay Area, the Shenzhen Qianhai International Conference Center hosts global leaders and industry pioneers. AIWASON delivers a fire-resistant intelligent optoelectronic busbar backbone that keeps the venue efficient, safe, and green.',
      'Dual-ring redundancy spans the main plenary hall, break-out forums, media center, and support zones. Critical tap-offs achieve two-hour fire endurance with real-time thermal monitoring, enabling seamless load transfers during peak summit operations while safeguarding communications and broadcast systems.',
      'Intelligent sensing is integrated into the venue’s unified O&M platform, providing circuit-level energy analytics, load forecasting, and emergency response playbooks. Cloud-based inspections and expert remote assistance secure zero-interruption performance throughout international events.',
      'The project roadmap anticipates future expansion, allowing rapid addition of exhibition modules and temporary broadcasting suites while maintaining redundancy and upgradability across the power network—delivering a sustainable energy foundation for world-class conferences.',
    ],
  },
  keyFeatures: {
    zh: [
      '双路环网冗余结构覆盖全馆关键负载',
      '2 小时耐火等级并带实时温升监测',
      '光纤感知驱动的智能运维平台',
      '峰会模式与日常模式自由切换的用电策略',
      '云端巡检 + 专家远程会诊保障零中断',
      '预留展陈与媒体扩展接口，快速部署临时场景',
    ],
    en: [
      'Dual-ring redundancy architecture across all mission-critical loads',
      'Two-hour fire endurance with continuous thermal monitoring',
      'Fiber-sensing powered intelligent O&M platform',
      'Load strategies optimised for summit and day-to-day operation modes',
      'Cloud inspection with expert remote support to secure zero downtime',
      'Reserved interfaces for exhibition and media expansion enabling rapid temporary setups',
    ],
  },
  specifications: [
    {
      label: { zh: '主干容量', en: 'Main Backbone Capacity' },
      value: { zh: '2 × 4000A 环网', en: 'Dual 4000A ring feeders' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV / 400V', en: '10kV / 400V' },
    },
    {
      label: { zh: '防火等级', en: 'Fire Protection' },
      value: { zh: '母线 2 小时耐火，Tap-off 温升实时监控', en: 'Busway 2-hour rating with real-time tap-off thermal monitoring' },
    },
    {
      label: { zh: '智能运维', en: 'Smart Operations' },
      value: { zh: '光纤感知 + BIM 运维平台', en: 'Fiber sensing with BIM-driven O&M platform' },
    },
  ],
  awards: [
    {
      name: { zh: '粤港澳会展绿色场馆奖', en: 'GBA Green Convention Venue Award' },
      year: '2024',
      description: {
        zh: '以高效、安全的能源系统助力绿色会展运营',
        en: 'Recognised for a safe, efficient energy system enabling green convention operations',
      },
    },
    {
      name: { zh: '国际会议服务保障优秀项目', en: 'Outstanding Summit Infrastructure Project' },
      year: '2024',
      description: {
        zh: '保障全球峰会期间零中断供电',
        en: 'Ensuring uninterrupted power throughout global summit sessions',
      },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '大型会展解决方案', en: 'Convention Center Solution' },
      href: '/solutions',
    },
    {
      label: { zh: '横琴口岸综合枢纽案例', en: 'Hengqin Port Integrated Hub Case' },
      href: '/news/hengqin-port-hub',
    },
  ],
}

export default async function QianhaiConferenceCenterPage({ params }: PageProps) {
  const { locale } = await params
  const lang = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
