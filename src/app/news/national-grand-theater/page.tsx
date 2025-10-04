// src/app/news/national-grand-theater/page.tsx
import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'National Grand Theater | AIWASON',
  description: 'Prestigious cultural facility with specialized performance venue power distribution systems.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'national-grand-theater',
  title: {
    zh: '国家大剧院',
    en: 'National Grand Theater',
  },
  subtitle: {
    zh: '国家级文化艺术殿堂配电典范',
    en: 'National Cultural Arts Palace Power Distribution Exemplar',
  },
  location: {
    zh: '北京市西城区',
    en: 'Xicheng District, Beijing',
  },
  completionDate: '2017年3月',
  category: {
    zh: '文化建筑',
    en: 'Cultural Building',
  },
  heroImage: '/res/国家大剧院.jpg',
  description: {
    zh: [
      '中国国家大剧院是国家表演艺术的最高殿堂，建筑面积21.75万平方米，包含歌剧院、音乐厅、戏剧场三个主要表演场所及多个附属设施。作为国家级文化地标，该项目对电力系统的稳定性、精密性和艺术性提出了极高要求。AIWASON为其提供了专业的舞台照明配电解决方案。',
      '表演艺术场所的电力系统具有极其特殊的要求，必须确保舞台照明、音响设备、舞台机械等专业设备的精确供电。我们设计了专用的舞台配电系统，支持复杂的调光控制和瞬间大功率切换，满足各类演出的专业需求。',
      '项目采用了超低噪音的配电技术，确保电力设备运行时不会对演出效果产生任何干扰。光电母线系统的智能监控功能，使技术人员能够实时掌握各演出场所的用电状态，确保演出的顺利进行。',
      '考虑到文化建筑的特殊性，系统配置了多重安全保护措施和应急备份系统。在任何情况下都能确保观众和演员的安全，同时保护珍贵的艺术设备和文物不受损害，体现了对文化艺术的最高敬意。',
    ],
    en: [
      'The National Grand Theater of China is the highest palace of national performing arts, with a floor area of 217,500 square meters, including three main performance venues: opera house, concert hall, and drama theater, as well as multiple auxiliary facilities. As a national cultural landmark, this project has extremely high requirements for power system stability, precision, and artistry. AIWASON provides professional stage lighting power distribution solutions for it.',
      'The power system of performing arts venues has extremely special requirements and must ensure precise power supply for professional equipment such as stage lighting, audio equipment, and stage machinery. We designed a dedicated stage power distribution system that supports complex dimming control and instantaneous high-power switching to meet the professional needs of various performances.',
      'The project adopts ultra-low noise power distribution technology to ensure that power equipment operation does not interfere with performance effects. The intelligent monitoring function of the optoelectronic busbar system enables technicians to grasp the electricity consumption status of each performance venue in real time, ensuring smooth performances.',
      'Considering the special nature of cultural buildings, the system is configured with multiple safety protection measures and emergency backup systems. It can ensure the safety of audiences and performers under any circumstances, while protecting precious artistic equipment and cultural relics from damage, reflecting the highest respect for culture and art.',
    ],
  },
  keyFeatures: {
    zh: [
      '专业舞台配电系统',
      '复杂调光控制',
      '瞬间大功率切换',
      '超低噪音技术',
      '实时状态监控',
      '多重安全保护',
      '应急备份系统',
      '文物设备保护',
    ],
    en: [
      'Professional stage power distribution system',
      'Complex dimming control',
      'Instantaneous high-power switching',
      'Ultra-low noise technology',
      'Real-time status monitoring',
      'Multiple safety protection',
      'Emergency backup system',
      'Cultural artifact equipment protection',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '6000A', en: '6000A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V/220V', en: '10kV/380V/220V' },
    },
    {
      label: { zh: '建筑面积', en: 'Floor Area' },
      value: { zh: '21.75万平方米', en: '217,500 sqm' },
    },
    {
      label: { zh: '演出场所', en: 'Performance Venues' },
      value: { zh: '3个主要场所', en: '3 Main Venues' },
    },
    {
      label: { zh: '噪音控制', en: 'Noise Control' },
      value: { zh: '<25dB', en: '<25dB' },
    },
    {
      label: { zh: '调光精度', en: 'Dimming Precision' },
      value: { zh: '0.1%', en: '0.1%' },
    },
  ],
  awards: [
    {
      name: { zh: '中国建筑工程鲁班奖', en: 'China Construction Engineering Luban Award' },
      year: '2018',
      description: { zh: '文化建筑技术应用创新最高荣誉', en: 'Highest honor for technological innovation in cultural building applications' },
    },
    {
      name: { zh: '国际照明设计奖', en: 'International Lighting Design Award' },
      year: '2018',
      description: { zh: '舞台照明技术应用国际认可', en: 'International recognition for stage lighting technology application' },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '文化建筑解决方案', en: 'Cultural Building Solutions' },
      href: '/solutions/cultural-buildings',
    },
    {
      label: { zh: '舞台照明系统', en: 'Stage Lighting Systems' },
      href: '/products/stage-lighting',
    },
  ],
}

export default async function NationalGrandTheaterPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}