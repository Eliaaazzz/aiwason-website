import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'
import coverNobel from '@/assets/News/诺贝尔创新工作站.png'

export const metadata: Metadata = {
  title: 'Nobel Innovation Workstation | AIWASON',
  description: 'AIWASON collaborates with Nobel Laureate Prof. Hartmut Michel to accelerate fire-resistant intelligent busbar research and applications.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'nobel-innovation-workstation',
  title: {
    zh: '诺贝尔创新工作站',
    en: 'Nobel Innovation Workstation',
  },
  subtitle: {
    zh: '携手诺奖教授米歇尔加速科研转化',
    en: 'Joint Research with Nobel Laureate Prof. Hartmut Michel',
  },
  location: {
    zh: '中国 · 深圳',
    en: 'Shenzhen, China',
  },
  completionDate: '2024年11月',
  category: {
    zh: '科研合作',
    en: 'Research Collaboration',
  },
  heroImage: coverNobel.src,
  heroFit: 'contain',
  description: {
    zh: [
      'AIWASON 与诺贝尔化学奖得主米歇尔教授携手成立“诺奖·专家创新工作站”，围绕耐火智能光电母线的材料升级、散热设计与能效优化等前沿课题开展联合研究。',
      '双方团队以 AIWASON 在数据中心与城市综合体的落地经验为基础，将实验室成果快速转化为可落地的产品模块，提升高密度配电场景的长期可靠性。',
      '工作站构建了“联合课题 + 共建实验室 + 应用示范”的三层合作体系，涵盖材料性能测试、光电耦合仿真、智能监测算法等多个研究方向。',
      '通过专家工作站，AIWASON 与高校及科研机构建立开放式生态，共同推动耐火智能母线的国际标准化，助力全球绿色能源基础设施升级。',
    ],
    en: [
      'AIWASON partnered with Nobel Chemistry Laureate Prof. Hartmut Michel to launch the “Nobel Expert Innovation Workstation,” focusing on materials enhancement, thermal design, and efficiency optimisation for fire-resistant intelligent optoelectronic busbars.',
      'Building on AIWASON’s deployments in data centres and urban complexes, the joint team rapidly translates laboratory breakthroughs into deployable product modules, reinforcing long-term reliability for high-density power distribution scenarios.',
      'The workstation operates an integrated collaboration model of joint research topics, co-built laboratories, and application pilots, spanning material characterisation, photoelectric coupling simulations, and intelligent monitoring algorithms.',
      'Through the expert workstation, AIWASON connects universities and institutes within an open ecosystem to advance international standardisation of fire-resistant intelligent busbars and accelerate sustainable energy infrastructure worldwide.',
    ],
  },
  keyFeatures: {
    zh: [
      '联合开展材料升级与热管理研究',
      '搭建 AI 仿真与智能监测的协同验证平台',
      '快速孵化面向高密度配电场景的产品模块',
      '共建实验室支撑国际认证与标准化工作',
      '打造高校、企业、科研机构协同生态',
    ],
    en: [
      'Joint research on material enhancement and thermal management',
      'Collaborative validation platform for AI simulation and intelligent monitoring',
      'Rapid incubation of product modules for high-density power distribution',
      'Co-built laboratories supporting international certification and standardisation',
      'Open ecosystem linking universities, enterprises, and research institutes',
    ],
  },
  specifications: [
    {
      label: { zh: '重点课题', en: 'Key Research Themes' },
      value: { zh: '耐火材料 / 光电耦合 / 散热设计 / 智能运维', en: 'Fire-resistant materials / Photoelectric coupling / Thermal design / Smart O&M' },
    },
    {
      label: { zh: '联合团队', en: 'Joint Team' },
      value: { zh: 'AIWASON 专家 + 诺奖科研团队 + 海内外高校', en: 'AIWASON experts with Nobel research team and global universities' },
    },
    {
      label: { zh: '成果转化', en: 'Technology Transfer' },
      value: { zh: '年度发布联合技术白皮书与试点项目', en: 'Annual joint white papers and pilot deployments',
      },
    },
  ],
  awards: [
    {
      name: { zh: '深圳市重点科研平台', en: 'Shenzhen Key Research Platform' },
      year: '2024',
      description: {
        zh: '在智能输配电创新方向的引领作用',
        en: 'Recognised for leadership in intelligent power distribution innovation',
      },
      image: coverNobel.src,
    },
  ],
  relatedLinks: [
    {
      label: { zh: '中国—中东欧企业合作对接会', en: 'China–CEEC Matchmaking' },
      href: '/news/ceec-matchmaking',
    },
    {
      label: { zh: '技术创新动态', en: 'Technology Innovation Updates' },
      href: '/news?q=innovation',
    },
  ],
}

export default async function NobelWorkstationPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
