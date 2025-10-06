// src/app/news/byd-smart-factory/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'BYD Intelligent Manufacturing Campus | AIWASON',
  description: '6300A busway supplies stamping, battery and final assembly with headroom for ramp-up.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'byd-smart-factory',
  title: {
    zh: '比亚迪智能制造园区',
    en: 'BYD Intelligent Manufacturing Campus',
  },
  subtitle: {
    zh: '新能源汽车制造全流程智能配电',
    en: 'Full-Process Intelligent Power Distribution for New Energy Vehicle Manufacturing',
  },
  location: {
    zh: '深圳市坪山区比亚迪工业园',
    en: 'BYD Industrial Park, Pingshan District, Shenzhen',
  },
  completionDate: '2023年10月',
  category: {
    zh: '智能制造工厂',
    en: 'Intelligent Manufacturing Factory',
  },
  heroImage: '/res/深圳比亚迪—A.jpg',
  description: {
    zh: [
      '比亚迪智能制造园区是全球领先的新能源汽车生产基地，集成了冲压、焊装、涂装、总装四大工艺车间。AIWASON为该项目提供了6300A大容量耐火智能光电母线系统，覆盖整个制造流程的电力需求。',
      '项目面临的主要挑战是车间环境恶劣，包括高温、粉尘、震动等工况。我们的解决方案采用了IP54防护等级的分接箱设计，能够在严苛的工业环境中稳定运行。同时，电弧故障检测系统能够快速识别并隔离故障，保护生产设备和人员安全。',
      '为了支持比亚迪快速扩展的生产需求，系统采用了模块化设计理念。每个制造单元都可以独立扩容，而不影响其他生产线的正常运行。这种设计使得比亚迪能够根据市场需求快速调整产能。',
      '智能监测系统实现了对整个园区电力系统的统一管理。通过实时数据分析，系统能够优化电力分配，降低能耗，提升整体生产效率。预测性维护功能大大减少了设备停机时间，确保生产计划的顺利执行。',
    ],
    en: [
      'The BYD Intelligent Manufacturing Campus is a world-leading new energy vehicle production base that integrates four major process workshops: stamping, welding, painting, and final assembly. AIWASON provides a 6300A high-capacity fire-resistant intelligent optoelectronic busbar system that covers the power requirements of the entire manufacturing process.',
      'The main challenge faced by the project is the harsh workshop environment, including high temperature, dust, vibration and other working conditions. Our solution adopts IP54 protection rating tap-box design that can operate stably in harsh industrial environments. Meanwhile, the arc fault detection system can quickly identify and isolate faults, protecting production equipment and personnel safety.',
      'To support BYD\'s rapidly expanding production demands, the system adopts a modular design concept. Each manufacturing unit can be independently expanded without affecting the normal operation of other production lines. This design enables BYD to quickly adjust production capacity according to market demand.',
      'The intelligent monitoring system realizes unified management of the entire campus power system. Through real-time data analysis, the system can optimize power distribution, reduce energy consumption, and improve overall production efficiency. Predictive maintenance functions greatly reduce equipment downtime and ensure smooth execution of production plans.',
    ],
  },
  keyFeatures: {
    zh: [
      '6300A大容量支持全工艺流程',
      'IP54分接箱适配恶劣车间环境',
      '电弧故障检测与快速隔离',
      '模块化扩容支持产能调整',
      '统一的园区电力管理系统',
      '实时能耗监测与优化',
      '预测性维护减少停机时间',
      '高可靠性保障连续生产',
    ],
    en: [
      '6300A high capacity supports full process flow',
      'IP54 tap-boxes adapted to harsh workshop environments',
      'Arc fault detection and rapid isolation',
      'Modular expansion supports capacity adjustment',
      'Unified campus power management system',
      'Real-time energy monitoring and optimization',
      'Predictive maintenance reduces downtime',
      'High reliability ensures continuous production',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '6300A', en: '6300A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '防护等级', en: 'Protection Rating' },
      value: { zh: 'IP54', en: 'IP54' },
    },
    {
      label: { zh: '短路承受能力', en: 'Short Circuit Capacity' },
      value: { zh: '65kA', en: '65kA' },
    },
    {
      label: { zh: '系统效率', en: 'System Efficiency' },
      value: { zh: '>98%', en: '>98%' },
    },
    {
      label: { zh: '覆盖车间', en: 'Workshop Coverage' },
      value: { zh: '冲压/焊装/涂装/总装', en: 'Stamping/Welding/Painting/Assembly' },
    },
  ],
  awards: [
    {
      name: { zh: '智能制造优秀案例奖', en: 'Intelligent Manufacturing Excellence Award' },
      year: '2024',
      description: { zh: '新能源汽车制造领域智能配电系统标杆项目', en: 'Benchmark project for intelligent power distribution systems in new energy vehicle manufacturing' },
      image: '/res/深圳比亚迪—A.jpg',
    },
  ],
  relatedLinks: [
    {
      label: { zh: '制造业解决方案', en: 'Manufacturing Solutions' },
      href: '/solutions/manufacturing',
    },
    {
      label: { zh: '工业级母线产品', en: 'Industrial Grade Busbar Products' },
      href: '/products/industrial-busbar',
    },
  ],
}

export default async function BYDSmartFactoryPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
