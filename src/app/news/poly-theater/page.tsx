import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Poly Theater | AIWASON',
  description: 'Low-noise, fire-rated backbone serving stage power, FOH and broadcast with quick turnarounds.',
  alternates: {
    canonical: '/news/poly-theater',
    languages: { en: '/news/poly-theater?lang=en', zh: '/news/poly-theater?lang=zh' },
  },
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'poly-theater',
  title: {
    zh: '保利剧院',
    en: 'Poly Theater',
  },
  subtitle: {
    zh: '艺术场馆智能配电系统',
    en: 'Arts Venue Intelligent Power Distribution System',
  },
  completionDate: '2023年9月',
  category: {
    zh: '文化艺术',
    en: 'Cultural Arts',
  },
  heroImage: '/res/保利剧院.jpg',
  description: {
    zh: [
      '保利剧院作为国内顶级的艺术演出场所，对电力系统的稳定性、安静性和灵活性要求极高。AIWASON为其设计的智能配电系统采用了低噪声耐火母线技术，全面覆盖了舞台、前台和录播系统，支持快速情景切换和多元化演出需求。',
      '系统的核心优势在于其精细化的分路设计。音频、灯光和吓装系统实现了独立的电力供应和控制，相互之间不会产生干扰，确保了演出效果的纯净性。每个系统都能根据不同演出的需要进行独立调节和控制。',
      '分区计量系统为演出经营管理提供了强大的数据支持。系统能够精确记录每场演出的用电量，包括音响、灯光、舞美等各个部分的能耗数据，为演出成本结算和剧院运营管理提供了详细的参考依据。',
      '考虑到演出场所的特殊性，系统特别强化了安全性和可靠性设计。所有关键电力设备都配备了备用方案，即使在演出过程中出现突发情况，也能够迅速切换到备用系统，确保演出的连续性和观众的安全。',
    ],
    en: [
      'As a top-tier arts performance venue in China, Poly Theater has extremely high requirements for power system stability, quietness, and flexibility. The intelligent power distribution system designed by AIWASON adopts low-noise fire-rated busbar technology, comprehensively covering stage, front-of-house, and broadcast systems, supporting rapid scene switching and diverse performance needs.',
      'The core advantage of the system lies in its refined circuit design. Audio, lighting, and rigging systems achieve independent power supply and control without mutual interference, ensuring the purity of performance effects. Each system can be independently adjusted and controlled according to the needs of different performances.',
      'The zoned metering system provides powerful data support for performance management. The system can accurately record power consumption for each performance, including energy consumption data for audio, lighting, stage design and other parts, providing detailed reference for performance cost settlement and theater operation management.',
      'Considering the special nature of performance venues, the system particularly strengthens safety and reliability design. All critical power equipment is equipped with backup solutions. Even if unexpected situations occur during performances, it can quickly switch to backup systems, ensuring performance continuity and audience safety.',
    ],
  },
  keyFeatures: {
    zh: [
      '低噪声耐火母线设计',
      '音频灯光吓装分路隔离',
      '快速情景切换支持',
      '多元化演出适应性',
      '分区计量精确管理',
      '演出成本结算支持',
      '全面备用保障机制',
      '突发情况快速切换',
    ],
    en: [
      'Low-noise fire-rated busbar design',
      'Audio, lighting, and rigging circuit isolation',
      'Rapid scene switching support',
      'Multi-format performance adaptability',
      'Zoned metering precise management',
      'Performance cost settlement support',
      'Comprehensive backup guarantee mechanism',
      'Rapid switching for emergency situations',
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
      label: { zh: '应用场所', en: 'Application Venue' },
      value: { zh: '艺术演出剧院', en: 'Arts Performance Theater' },
    },
    {
      label: { zh: '噪声控制', en: 'Noise Control' },
      value: { zh: '低噪声设计', en: 'Low-noise Design' },
    },
    {
      label: { zh: '分路数量', en: 'Number of Circuits' },
      value: { zh: '多分路独立控制', en: 'Multi-circuit Independent Control' },
    },
    {
      label: { zh: '计量精度', en: 'Metering Accuracy' },
      value: { zh: '分区精确计量', en: 'Zoned Precise Metering' },
    },
  ],
  awards: [
    {
      name: { zh: '保利大剧院实景', en: 'Poly Theater On-site View' },
      year: '2023',
      description: {
        zh: '剧院外立面与广场夜景，呈现低噪声母线供电后的运营状态。',
        en: 'Exterior night view of the theater and plaza after the low-noise busway upgrade.',
      },
      image: '/res/保利剧院.jpg',
    },
    {
      name: { zh: '低噪声技术成果', en: 'Low-noise Technology Showcase' },
      year: '2023',
      description: {
        zh: '项目内采用低噪声供电设备的展示与测试结果。',
        en: 'Summary of the low-noise power equipment implementation inside the venue.',
      },
    },
  ],
  relatedLinks: [
    {
      label: { zh: '文化场所解决方案', en: 'Cultural Venue Solutions' },
      href: '/solutions/cultural-venues',
    },
    {
      label: { zh: '低噪声配电产品', en: 'Low-noise Power Distribution Products' },
      href: '/products/low-noise-power',
    },
  ],
}

export default async function PolyTheaterPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
