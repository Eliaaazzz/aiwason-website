import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export const metadata: Metadata = {
  title: 'High-speed Rail Nanfang Xinhui Factory | AIWASON',
  description: 'Marine-grade, vibration-damped busways with AI diagnostics for coastal environments.',
  alternates: {
    canonical: '/news/hsr-nanfang-xinhui',
    languages: { en: '/news/hsr-nanfang-xinhui?lang=en', zh: '/news/hsr-nanfang-xinhui?lang=zh' },
  },
}

type PageProps = { params: Promise<{ locale: string }> }

const projectData: ProjectDetail = {
  id: 'hsr-nanfang-xinhui',
  title: {
    zh: '高铁（南方新会工厂）',
    en: 'High-speed Rail (Nanfang Xinhui Factory)',
  },
  subtitle: {
    zh: '海洋环境智能配电系统',
    en: 'Marine Environment Intelligent Power Distribution System',
  },
  completionDate: '2023年7月',
  category: {
    zh: '高速铁路制造',
    en: 'High-speed Rail Manufacturing',
  },
  heroImage: '/res/高铁（南方新会工厂）.jpg',
  description: {
    zh: [
      '南方新会工厂作为高速动车组制造的重要基地，位于近海地区，面临着潮湿、盐雾和高震动等恒列环境挑战。AIWASON为其设计的智能配电系统采用了船级封装与减震设计，结合AI诊断技术，为高精度制造提供了可靠的电力保障。',
      '系统的最大亮点在于其出色的环境适应性。耐候减震封装技术能够有效抵御近海环境的潮湿、盐雾腐蚀以及生产过程中的强烈震动，确保电力系统的长期稳定运行。每个关键部件都通过了严格的海洋环境测试。',
      'AI诊断系统是该项目的另一个技术突破。通过集成在母线系统中的光纤传感器，系统能够实时收集各种运行数据，包括电气参数、温度、震动等信息。AI算法对这些数据进行深度分析，能够提前预测设备故障并生成智能化的维护工单。',
      '针对高精度制造的特殊需求，系统在电力品质和稳定性方面做了特殊优化。无论是精密机床还是自动化生产线，都能获得稳定、清洁的电力供应，确保高速动车组的制造精度和质量。',
    ],
    en: [
      'As an important base for high-speed train manufacturing, Nanfang Xinhui Factory is located in a coastal area, facing harsh environmental challenges such as humidity, salt spray, and high vibration. The intelligent power distribution system designed by AIWASON adopts marine-grade encapsulation and vibration-damped design, combined with AI diagnostic technology, providing reliable power guarantee for high-precision manufacturing.',
      'The system\'s greatest highlight lies in its excellent environmental adaptability. Weatherproof vibration-damped encapsulation technology can effectively resist coastal environment\'s humidity, salt spray corrosion, and strong vibrations during production processes, ensuring long-term stable operation of the power system. Every critical component has passed rigorous marine environment testing.',
      'The AI diagnostic system is another technological breakthrough of this project. Through optical fiber sensors integrated in the busbar system, the system can collect various operational data in real-time, including electrical parameters, temperature, vibration and other information. AI algorithms perform deep analysis of this data, able to predict equipment failures in advance and generate intelligent maintenance work orders.',
      'Targeting the special needs of high-precision manufacturing, the system has made special optimizations in power quality and stability. Whether for precision machine tools or automated production lines, stable and clean power supply can be obtained, ensuring manufacturing precision and quality of high-speed trains.',
    ],
  },
  keyFeatures: {
    zh: [
      '船级封装抗腐蚀设计',
      '减震结构适应高震动',
      '耐候防潮湿盐雾',
      'AI智能诊断系统',
      '光纤传感器集成',
      '预测性维护预警',
      '智能化工单生成',
      '高精度电力品质',
    ],
    en: [
      'Marine-grade encapsulation anti-corrosion design',
      'Vibration-damped structure adapts to high vibration',
      'Weatherproof against humidity and salt spray',
      'AI intelligent diagnostic system',
      'Optical fiber sensor integration',
      'Predictive maintenance warnings',
      'Intelligent work order generation',
      'High-precision power quality',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '5500A', en: '5500A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '应用环境', en: 'Application Environment' },
      value: { zh: '近海工厂', en: 'Coastal Factory' },
    },
    {
      label: { zh: '防护等级', en: 'Protection Level' },
      value: { zh: '船级防护', en: 'Marine Grade Protection' },
    },
    {
      label: { zh: '诊断技术', en: 'Diagnostic Technology' },
      value: { zh: 'AI智能诊断', en: 'AI Intelligent Diagnosis' },
    },
    {
      label: { zh: '监测方式', en: 'Monitoring Method' },
      value: { zh: '光纤传感器', en: 'Optical Fiber Sensors' },
    },
  ],
  awards: [
    {
      name: { zh: '南方新会工厂生产基地', en: 'Nanfang Xinhui Manufacturing Campus' },
      year: '2023',
      description: {
        zh: '高速列车制造基地总装车间实景，展示耐火母线在生产线中的部署。',
        en: 'On-site view of the high-speed train assembly hall with the fire-resistant busway in service.',
      },
      image: '/res/高铁（南方新会工厂）.jpg',
    },
    {
      name: { zh: '检修与联调通道', en: 'Testing and Commissioning Corridor' },
      year: '2023',
      description: {
        zh: '成品列车与检修通道现场照片，体现多线路供电的可靠性。',
        en: 'Photo of the finished train staging corridor highlighting redundant power distribution.',
      },
      image: '/res/gallery-46.jpg',
    },
  ],
  relatedLinks: [
    {
      label: { zh: '智能制造解决方案', en: 'Intelligent Manufacturing Solutions' },
      href: '/solutions/intelligent-manufacturing',
    },
    {
      label: { zh: '海洋环境配电产品', en: 'Marine Environment Power Distribution Products' },
      href: '/products/marine-power',
    },
  ],
}

export default async function HSRNanfangXinhuiPage({ params }: PageProps) {
  const { locale } = await params
  const lang = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
