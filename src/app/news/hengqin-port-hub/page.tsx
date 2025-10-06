// src/app/news/hengqin-port-hub/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Hengqin Port Comprehensive Transportation Hub | AIWASON',
  description: 'Integrated backbone for port/metro/bus with egress lighting and control-room visibility.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'hengqin-port-hub',
  title: {
    zh: '横琴口岸综合交通枢纽',
    en: 'Hengqin Port Comprehensive Transportation Hub',
  },
  subtitle: {
    zh: '多模式一体化智能配电枢纽',
    en: 'Multi-Modal Integrated Intelligent Power Distribution Hub',
  },
  location: {
    zh: '珠海市香洲区横琴新区',
    en: 'Hengqin New Area, Xiangzhou District, Zhuhai',
  },
  completionDate: '2020年8月',
  category: {
    zh: '综合交通枢纽',
    en: 'Comprehensive Transportation Hub',
  },
  heroImage: '/res/横琴口岸综合交通枢纽.jpg',
  description: {
    zh: [
      '横琴口岸综合交通枢纽是连接珠海与澳门的重要通道，集口岸通关、地铁换乘、公交枢纽于一体。项目日通关能力超过22万人次，是粤港澳大湾区互联互通的重要节点。AIWASON为该项目提供了一体化的耐火智能光电母线解决方案。',
      '项目的核心挑战是实现口岸、地铁、公交三种不同交通方式的电力系统整合。我们设计了多方式环网冗余架构，确保任一系统故障时其他系统仍能正常运行。光纤感知技术直达中控室，实现了全枢纽的统一监控管理。',
      '考虑到口岸的特殊安全要求，系统配置了智能疏散照明和应急电源管理。在紧急情况下，系统能够自动切换到应急模式，确保人员安全疏散通道的照明和通风系统正常运行。',
      '项目获得了中国建筑工程鲁班奖，这是对AIWASON技术实力和工程质量的高度认可。该项目成为了大湾区交通枢纽电力系统建设的标杆案例。',
    ],
    en: [
      'The Hengqin Port Comprehensive Transportation Hub is an important channel connecting Zhuhai and Macau, integrating port clearance, metro transfer, and bus hub functions. The project has a daily clearance capacity of over 220,000 passengers and is an important node for interconnection in the Guangdong-Hong Kong-Macao Greater Bay Area. AIWASON provides an integrated fire-resistant intelligent optoelectronic busbar solution for this project.',
      'The core challenge of the project is to integrate the power systems of three different transportation modes: port, metro, and bus. We designed a multi-modal ring network redundancy architecture to ensure that other systems can still operate normally when any one system fails. Fiber-optic sensing technology reaches directly to the control center, achieving unified monitoring and management of the entire hub.',
      'Considering the special security requirements of the port, the system is configured with intelligent evacuation lighting and emergency power management. In emergency situations, the system can automatically switch to emergency mode to ensure normal operation of lighting and ventilation systems in personnel safety evacuation channels.',
      'The project won the China Construction Engineering Luban Award, which is a high recognition of AIWASON\'s technical strength and engineering quality. This project has become a benchmark case for power system construction in Greater Bay Area transportation hubs.',
    ],
  },
  keyFeatures: {
    zh: [
      '多交通方式环网冗余架构',
      '光纤感知直达中控室',
      '智能疏散照明系统',
      '应急电源自动切换',
      '统一监控管理平台',
      '高可靠性24/7运行',
      '模块化设计便于维护',
      '获得鲁班奖认可',
    ],
    en: [
      'Multi-modal ring network redundancy architecture',
      'Fiber-optic sensing directly to control center',
      'Intelligent evacuation lighting system',
      'Automatic emergency power switching',
      'Unified monitoring management platform',
      'High reliability 24/7 operation',
      'Modular design for easy maintenance',
      'Luban Award recognition',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '3200A', en: '3200A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '日通关量', en: 'Daily Clearance' },
      value: { zh: '22万人次', en: '220,000 passengers' },
    },
    {
      label: { zh: '交通模式', en: 'Transport Modes' },
      value: { zh: '口岸/地铁/公交', en: 'Port/Metro/Bus' },
    },
    {
      label: { zh: '监控方式', en: 'Monitoring Method' },
      value: { zh: '光纤感知', en: 'Fiber-optic Sensing' },
    },
    {
      label: { zh: '应急等级', en: 'Emergency Level' },
      value: { zh: '一级响应', en: 'Level 1 Response' },
    },
  ],
  awards: [
    {
      name: { zh: '中国建筑工程鲁班奖', en: 'China Construction Engineering Luban Award' },
      year: '2021',
      description: { zh: '中国建筑行业工程质量最高荣誉', en: 'The highest honor for engineering quality in China\'s construction industry' },
    },
    {
      name: { zh: '国家优质工程奖', en: 'National Quality Engineering Award' },
      year: '2021',
      description: { zh: '交通基础设施建设优秀项目', en: 'Excellence in transportation infrastructure construction' },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '交通枢纽解决方案', en: 'Transportation Hub Solutions' },
      href: '/solutions/transportation-hub',
    },
    {
      label: { zh: '应急照明系统', en: 'Emergency Lighting Systems' },
      href: '/products/emergency-lighting',
    },
  ],
}

export default async function HengqinPortHubPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}