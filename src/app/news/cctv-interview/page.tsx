import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'
import coverCCTV from '@/assets/News/央视采访1.png'

export const metadata: Metadata = {
  title: 'CCTV “Credit China” Interview | AIWASON',
  description: 'CCTV highlights AIWASON’s fire-resistant intelligent optoelectronic busbar technology and smart manufacturing deployment.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'cctv-credit-china-interview',
  title: {
    zh: '央视《信用中国》专访 AIWASON',
    en: 'CCTV “Credit China” Interview with AIWASON',
  },
  subtitle: {
    zh: '耐火智能光电母线的创新与落地',
    en: 'Innovation and Deployment of Fire-Resistant Intelligent Optoelectronic Busbars',
  },
  location: {
    zh: '中国 · 北京 / 深圳',
    en: 'Beijing & Shenzhen, China',
  },
  completionDate: '2024年12月',
  category: {
    zh: '媒体报道',
    en: 'Media Coverage',
  },
  heroImage: coverCCTV.src,
  heroFit: 'contain',
  description: {
    zh: [
      '央视《信用中国》栏目聚焦 AIWASON 在耐火智能光电母线领域的技术突破与产业化成果，专题展示公司在数据中心、轨道交通、城市综合体的标杆项目。',
      '节目深入采访 AIWASON 核心研发团队与合作伙伴，解析光纤感知、AI 运维、模块化连接等独有技术如何提升大型基础设施的安全性与能效表现。',
      '报道同步探访 AIWASON 智能制造基地，呈现从高导电母排加工、耐火封装到智能监测装置装配的自动化生产流程，强调全过程质量追溯与可靠性验证体系。',
      '通过央视权威媒体平台，AIWASON 分享了推动绿色能源基础设施升级的实践经验，并宣布面向国际市场的战略合作计划。',
    ],
    en: [
      'CCTV’s “Credit China” programme spotlighted AIWASON’s breakthroughs in fire-resistant intelligent optoelectronic busbars, featuring flagship deployments across data centres, rail transit, and urban mixed-use complexes.',
      'The feature interviewed AIWASON’s core R&D team and ecosystem partners, explaining how proprietary technologies—fiber sensing, AI-driven operations, and modular tap-off design—enhance safety and energy performance for large-scale infrastructure.',
      'The episode also visited AIWASON’s smart manufacturing base, showcasing automated production lines from high-conductivity busbar processing and fire-resistant encapsulation to intelligent monitoring assembly, highlighting end-to-end quality traceability.',
      'Through CCTV’s national platform, AIWASON shared its roadmap for advancing sustainable energy infrastructure and announced upcoming strategic collaborations for international markets.',
    ],
  },
  keyFeatures: {
    zh: [
      '央视《信用中国》权威专访',
      '展示耐火智能光电母线核心技术',
      '解析 AI 运维与光纤感知的协同应用',
      '公开智能制造基地的自动化流程',
      '发布国际市场合作计划',
    ],
    en: [
      'Featured interview on CCTV “Credit China”',
      'Highlighted core technology of fire-resistant intelligent busbars',
      'Explained synergy of AI operations and fiber sensing',
      'Revealed automated processes at the smart manufacturing base',
      'Announced international market collaboration initiatives',
    ],
  },
  specifications: [
    {
      label: { zh: '节目形式', en: 'Programme Format' },
      value: { zh: '央视财经频道专题报道', en: 'CCTV Finance Channel feature' },
    },
    {
      label: { zh: '重点场景', en: 'Highlighted Scenarios' },
      value: { zh: '数据中心 / 轨道交通 / 城市综合体', en: 'Data centres / Rail transit / Urban complexes' },
    },
    {
      label: { zh: '播出时间', en: 'Broadcast Date' },
      value: { zh: '2024年12月', en: 'December 2024' },
    },
  ],
  awards: [
    {
      name: { zh: '央视《信用中国》实力品牌', en: 'CCTV “Credit China” Trusted Brand' },
      year: '2024',
      description: {
        zh: '表彰在智能输配电领域的创新与信用表现',
        en: 'Recognised for innovation and credibility in intelligent power distribution',
      },
      image: coverCCTV.src,
    },
  ],
  relatedLinks: [
    {
      label: { zh: '在线观看节目', en: 'Watch the Feature' },
      href: '/video/credit-China.mp4',
    },
    {
      label: { zh: '媒体报道合集', en: 'Media Coverage Hub' },
      href: '/news',
    },
  ],
}

export default async function CctvInterviewPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
