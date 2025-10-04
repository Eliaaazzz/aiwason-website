// src/app/news/south-railway-station/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'High-Speed Railway South Station | AIWASON',
  description: 'Major transportation hub with high-capacity power distribution and emergency systems.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'south-railway-station',
  title: {
    zh: '高铁南站交通枢纽',
    en: 'High-Speed Railway South Station',
  },
  subtitle: {
    zh: '大型交通枢纽智能配电中心',
    en: 'Large Transportation Hub Intelligent Power Distribution Center',
  },
  location: {
    zh: '广州市番禺区',
    en: 'Panyu District, Guangzhou',
  },
  completionDate: '2021年6月',
  category: {
    zh: '交通枢纽',
    en: 'Transportation Hub',
  },
  heroImage: '/res/高铁南站.jpg',
  description: {
    zh: [
      '广州南站是华南地区最大的高铁枢纽站，日均客流量超过60万人次，连接京广、广深港、贵广、南广等多条高铁线路。作为国家级交通枢纽，该站对电力系统的可靠性、安全性和智能化水平要求极高。AIWASON为其提供了大容量的耐火智能光电母线解决方案。',
      '高铁站的电力系统必须确保列车运行、信号控制、客运服务等关键系统的连续供电。我们设计了多重冗余的供电架构，包括双路市电、柴发备用电源、UPS系统的智能协调。光电母线系统覆盖了从主配电室到各候车区、站台的全域监控。',
      '项目采用了先进的预防性维护技术，通过对关键设备的实时监测和数据分析，能够提前发现潜在问题并进行预防性维护。智能化管理系统与高铁调度系统实现了深度集成，确保电力供应与列车运行的完美协调。',
      '考虑到高铁站的大客流特点，系统配置了完善的应急响应机制。在异常情况下，能够快速切换到应急模式，确保疏散通道照明、广播系统、自动扶梯等关键设施的正常运行，保障乘客安全。',
    ],
    en: [
      'Guangzhou South Station is the largest high-speed rail hub station in South China, with an average daily passenger flow of over 600,000 people, connecting multiple high-speed rail lines such as Beijing-Guangzhou, Guangzhou-Shenzhen-Hong Kong, Guiyang-Guangzhou, and Nanning-Guangzhou. As a national-level transportation hub, this station has extremely high requirements for power system reliability, safety, and intelligence level. AIWASON provides large-capacity fire-resistant intelligent optoelectronic busbar solutions for it.',
      'The power system of high-speed rail stations must ensure continuous power supply for critical systems such as train operation, signal control, and passenger services. We designed a multi-redundant power supply architecture, including intelligent coordination of dual municipal power, diesel generator backup power, and UPS systems. The optoelectronic busbar system covers full-domain monitoring from the main distribution room to various waiting areas and platforms.',
      'The project adopts advanced preventive maintenance technology, which can identify potential problems in advance and perform preventive maintenance through real-time monitoring and data analysis of critical equipment. The intelligent management system is deeply integrated with the high-speed rail dispatching system, ensuring perfect coordination between power supply and train operation.',
      'Considering the large passenger flow characteristics of high-speed rail stations, the system is configured with comprehensive emergency response mechanisms. In abnormal situations, it can quickly switch to emergency mode to ensure normal operation of critical facilities such as evacuation passage lighting, broadcast systems, and escalators, ensuring passenger safety.',
    ],
  },
  keyFeatures: {
    zh: [
      '大容量配电系统',
      '多重冗余供电',
      '全域智能监控',
      '预防性维护',
      '与调度系统集成',
      '应急响应机制',
      '大客流保障',
      '连续供电保证',
    ],
    en: [
      'Large-capacity power distribution system',
      'Multi-redundant power supply',
      'Full-domain intelligent monitoring',
      'Preventive maintenance',
      'Integration with dispatching systems',
      'Emergency response mechanisms',
      'Large passenger flow guarantee',
      'Continuous power supply assurance',
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
      label: { zh: '日客流量', en: 'Daily Passenger Flow' },
      value: { zh: '60万人次', en: '600,000 passengers' },
    },
    {
      label: { zh: '覆盖面积', en: 'Coverage Area' },
      value: { zh: '48万平方米', en: '480,000 sqm' },
    },
    {
      label: { zh: '供电可靠性', en: 'Power Reliability' },
      value: { zh: '99.99%', en: '99.99%' },
    },
    {
      label: { zh: '应急响应', en: 'Emergency Response' },
      value: { zh: '<3秒', en: '<3 seconds' },
    },
  ],
  awards: [
    {
      name: { zh: '中国土木工程詹天佑奖', en: 'China Civil Engineering Zhan Tianyou Award' },
      year: '2022',
      description: { zh: '交通基础设施建设最高荣誉', en: 'The highest honor for transportation infrastructure construction' },
    },
    {
      name: { zh: '国家优质工程金奖', en: 'National Quality Engineering Gold Award' },
      year: '2022',
      description: { zh: '工程建设质量与技术创新双重认可', en: 'Dual recognition for engineering construction quality and technological innovation' },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '高铁站解决方案', en: 'High-Speed Rail Station Solutions' },
      href: '/solutions/railway-stations',
    },
    {
      label: { zh: '大容量配电系统', en: 'High-Capacity Power Distribution' },
      href: '/products/high-capacity-distribution',
    },
  ],
}

export default async function SouthRailwayStationPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}