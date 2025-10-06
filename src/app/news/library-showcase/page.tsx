import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Shenzhen Bao\'an New Library | AIWASON',
  description: 'Low-noise, digital-ready busway system powering a next-generation civic library campus in Shenzhen.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'library-showcase',
  title: {
    zh: '深圳宝安新图书馆',
    en: "Shenzhen Bao'an New Library",
  },
  subtitle: {
    zh: '静音智能配电的公共文化地标',
    en: 'A Public Cultural Landmark with Silent Intelligent Power',
  },
  location: {
    zh: '中国 · 深圳市宝安区',
    en: "Bao'an District, Shenzhen, China",
  },
  completionDate: '2022年9月',
  category: {
    zh: '公共文化设施',
    en: 'Public Cultural Facility',
  },
  heroImage: '/res/深圳宝安新图书馆.jpg',
  description: {
    zh: [
      '深圳宝安新图书馆围绕“复合学习+城市客厅”的理念建设，对静音、可扩展以及全天候运营的供配电系统提出了严苛要求。AIWASON 为该项目提供的耐火智能光电母线，以模块化架构贯通多栋单体建筑，读者区、数字培训区与后勤区域可在不中断服务的情况下灵活扩容。',
      '为保持阅读环境的宁静，我们在主干及分支母线中采用了降噪隔振结构，并通过智能分接箱对照明、空调与多媒体系统进行精准控制，运行噪声低至 25 分贝以下。读者区域的用电回路可以按时段与客流进行自适应调度，兼顾舒适度与能效表现。',
      '馆区的智慧楼宇系统与母线监测平台深度打通，实现回路级能耗可视化、碳排统计以及运维工单闭环。馆藏库房和文献修复实验室配置了冗余电源与环境监测，确保珍贵资料在湿度、温度波动时也能保持安全。',
      '考虑到公共文化设施的大客流特性，系统配置了双回路冗余与 2 小时耐火防护，并与消防、疏散指示联动。即便在突发事件中，后台供电与指挥中心仍可保持在线，保障市民有序撤离。',
    ],
    en: [
      "Designed as both a learning hub and a civic living room, the Shenzhen Bao'an New Library demanded a power system that stays silent, scalable, and reliable around the clock. AIWASON's fire-resistant intelligent busway links multiple buildings through a modular backbone so that reading halls, digital training suites, and back-of-house services can expand without disrupting visitors.",
      'Acoustic dampening and vibration isolation are built into the main and branch busways, keeping operating noise below 25 dB. Smart tap-off units deliver granular control of lighting, HVAC, and media systems so that each zone adapts to time-of-day and occupancy while preserving a tranquil reading experience.',
      'The library\'s building management platform is fully integrated with the busway monitoring layer. Circuit-level energy dashboards, carbon reporting, and maintenance workflows help facility teams balance sustainability targets with comfort. Archive storage and conservation labs run on redundant feeds with tightly monitored environmental parameters to protect rare collections.',
      'Given the high visitor volume, the system incorporates dual-source redundancy, 2-hour fire protection, and coordinated links to emergency lighting and evacuation guidance. Even during incidents, command rooms and critical back-end services remain powered, ensuring safe and orderly response.',
    ],
  },
  keyFeatures: {
    zh: [
      '25 分贝静音母线结构',
      '分区回路级能耗监测',
      '照明与标识联动控制',
      '多栋单体的冗余联络',
      'BIM+运维数字化档案',
      '2 小时耐火与防烟隔离',
      '访客客流与负载联动分析',
      '光伏预留接入节点',
    ],
    en: [
      '25 dB acoustic-damped busway design',
      'Zonal circuit-level energy monitoring',
      'Integrated lighting and signage control',
      'Redundant interconnection across the campus',
      'BIM-linked maintenance and asset records',
      '2-hour fire rating with smoke compartmentalisation',
      'Visitor analytics tied to load management',
      'Solar-ready connection nodes',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '3200A', en: '3200A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/400V', en: '10kV/400V' },
    },
    {
      label: { zh: '耐火等级', en: 'Fire Resistance' },
      value: { zh: '2小时', en: '2 Hours' },
    },
    {
      label: { zh: '运行噪声', en: 'Operating Noise' },
      value: { zh: '≤25分贝', en: '≤25 dB' },
    },
    {
      label: { zh: '能耗管理', en: 'Energy Management' },
      value: { zh: '回路级实时监测', en: 'Real-time circuit monitoring' },
    },
    {
      label: { zh: '系统集成', en: 'System Integration' },
      value: { zh: 'BIM 与 IoT 联动', en: 'BIM + IoT integration' },
    },
  ],
  awards: [
    {
      name: { zh: '深圳绿色公共建筑示范项目', en: 'Shenzhen Green Public Building Showcase' },
      year: '2023',
      description: {
        zh: '凭借高效率与低碳运营管理获得市级示范认证',
        en: 'Recognised for high-efficiency, low-carbon facility operations at the municipal level',
      },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '查看城市综合体解决方案', en: 'Explore Urban Campus Solutions' },
      href: '/solutions',
    },
    {
      label: { zh: '了解智能母线产品', en: 'Learn About Intelligent Busway Products' },
      href: '/products',
    },
  ],
}

export default async function LibraryShowcasePage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
