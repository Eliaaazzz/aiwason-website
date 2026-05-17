import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'
import coverCEEC from '@/assets/News/中欧企业对接会.png'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export const metadata: Metadata = {
  title: 'China–CEEC SMEs Matchmaking',
  description: 'AIWASON showcases intelligent busbar innovation at the China–CEEC SMEs Matchmaking and Cooperation Achievements Exhibition in Budapest.',
  alternates: {
    canonical: '/news/ceec-matchmaking',
    languages: { en: '/news/ceec-matchmaking?lang=en', zh: '/news/ceec-matchmaking?lang=zh' },
  },
}

type PageProps = { params: Promise<{ locale: string }> }

const projectData: ProjectDetail = {
  id: 'ceec-matchmaking',
  title: {
    zh: '中国—中东欧企业合作对接会',
    en: 'China–CEEC SMEs Matchmaking & Cooperation Exhibition',
  },
  subtitle: {
    zh: '智能母线行业唯一受邀代表',
    en: 'Sole Representative from the Intelligent Busbar Sector',
  },
  location: {
    zh: '匈牙利 · 布达佩斯',
    en: 'Budapest, Hungary',
  },
  completionDate: '2017年11月',
  category: {
    zh: '国际合作',
    en: 'International Collaboration',
  },
  heroImage: coverCEEC.src,
  heroFit: 'contain',
  description: {
    zh: [
      'AIWASON 作为智能母线行业唯一受邀的中国企业，参加在布达佩斯举行的中国—中东欧中小企业合作对接暨成果展，集中展示耐火智能光电母线在重大基础设施与智慧园区中的应用成果。',
      '我们向来自匈牙利、波兰、捷克等多国的政府机构与企业代表介绍了光纤感知、AI 智能运维等前沿能力，重点分享在数据中心、交通枢纽、商业综合体的落地案例。',
      '在商务配对及专题交流环节，AIWASON 团队与多家欧洲能源服务商、建筑运营商达成实质性合作意向，围绕绿色建筑改造、智慧园区升级等方向建立联合项目管线。',
      '此次参展也促成我们与中东欧高校及科研机构的技术交流机制，为耐火智能母线的标准化推广与材料创新建立了长期合作基础。',
    ],
    en: [
      'As the only invited Chinese enterprise from the intelligent busbar domain, AIWASON participated in the China–CEEC SMEs Matchmaking and Cooperation Achievements Exhibition in Budapest, presenting our fire-resistant intelligent optoelectronic busbar deployments for critical infrastructure and smart campuses.',
      'We introduced fiber-sensing and AI-powered O&M capabilities to government delegations and corporate leaders from Hungary, Poland, the Czech Republic, and beyond, highlighting flagship implementations across data centers, transportation hubs, and mixed-use complexes.',
      'During business matchmaking and thematic exchanges, the AIWASON team secured substantive collaboration intents with European energy service providers and facility operators, building a joint pipeline focused on green building retrofits and smart park upgrades.',
      'The exhibition also paved the way for technical exchange with Central and Eastern European universities and research institutes, laying a long-term foundation for material innovation and standardisation of fire-resistant intelligent busbar technology.',
    ],
  },
  keyFeatures: {
    zh: [
      '展示耐火智能光电母线在多行业的落地成果',
      '与中东欧能源服务商建立联合解决方案',
      '引入光纤感知与 AI 运维等创新能力',
      '达成绿色建筑与智慧园区改造合作意向',
      '搭建与高校科研机构的技术交流平台',
    ],
    en: [
      'Showcased cross-industry deployments of fire-resistant intelligent busbars',
      'Formed joint solution roadmaps with CEEC energy service providers',
      'Introduced fiber sensing and AI-driven operations innovations',
      'Secured collaboration intents on green building and smart park upgrades',
      'Established a technical exchange platform with universities and institutes',
    ],
  },
  specifications: [
    {
      label: { zh: '参展主题', en: 'Exhibition Focus' },
      value: { zh: '智能输配电与绿色园区升级', en: 'Intelligent power distribution & green campus upgrades' },
    },
    {
      label: { zh: '合作成果', en: 'Cooperation Outcomes' },
      value: { zh: '签署 6 项合作意向书', en: 'Six memoranda of cooperation signed' },
    },
    {
      label: { zh: '覆盖行业', en: 'Industries Covered' },
      value: { zh: '数据中心 / 交通枢纽 / 商业综合体', en: 'Data centres / Transportation hubs / Mixed-use complexes' },
    },
  ],
  awards: [
    {
      name: { zh: '合作成果展示优秀项目', en: 'Excellence in Cooperation Showcase' },
      year: '2017',
      description: {
        zh: '在智能输配电技术领域的突出贡献',
        en: 'Recognised for outstanding contribution to intelligent power distribution technology',
      },
      image: coverCEEC.src,
    },
  ],
  relatedLinks: [
    {
      label: { zh: '诺贝尔创新工作站', en: 'Nobel Innovation Workstation' },
      href: '/news/nobel-workstation',
    },
    {
      label: { zh: '国际合作项目合集', en: 'International Collaboration Cases' },
      href: '/news?q=international',
    },
  ],
}

export default async function CeecMatchmakingPage({ params }: PageProps) {
  const { locale } = await params
  const lang = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
