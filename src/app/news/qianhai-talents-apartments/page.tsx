import type { Metadata } from 'next'
import ProjectDetailLayout, { type ProjectDetail } from '@/components/common/ProjectDetailLayout'

export const metadata: Metadata = {
  title: 'Qianhai Talent Apartments | AIWASON',
  description: 'Low-loss, low-noise distribution with BIM-linked O&M for quality living.',
}

type PageProps = { searchParams: Promise<{ lang?: string }> }

const projectData: ProjectDetail = {
  id: 'qianhai-talents-apartments',
  title: {
    zh: '前海人才公寓',
    en: 'Qianhai Talent Apartments',
  },
  subtitle: {
    zh: '人才社区智能配电系统',
    en: 'Talent Community Intelligent Power Distribution System',
  },
  completionDate: '2023年8月',
  category: {
    zh: '住宅社区',
    en: 'Residential Community',
  },
  heroImage: '/res/前海珑湾国际人才公寓.jpg',
  description: {
    zh: [
      '前海人才公寓作为高品质人才社区，对居住环境的舒适性和便利性要求极高。AIWASON设计的配电系统采用低损耗、低噪声技术，为住户提供了安静、稳定的电力环境。',
      'BIM技术贯通整个项目的设计、施工和运维全生命周期。通过数字化建模，实现了配电设备的精确定位和可视化管理，大大提升了运维效率和服务质量。',
      '系统创新性地引入了租户级计量与预付费功能，住户可以便捷地查询用电情况和缴费，物业管理更加智能化和人性化。二维码资产关联技术使得设备维护更加快速高效。',
      '考虑到人才公寓的特殊需求，系统特别优化了电力品质和供电可靠性。无论是日常生活用电还是高端电子设备用电，都能获得稳定优质的电力保障，提升了居住体验和生活质量。',
    ],
    en: [
      'As a high-quality talent community, Qianhai Talent Apartments has extremely high requirements for comfort and convenience of living environment. The power distribution system designed by AIWASON uses low-loss, low-noise technology to provide residents with a quiet and stable power environment.',
      'BIM technology runs through the entire project lifecycle of design, construction, and operation & maintenance. Through digital modeling, precise positioning and visual management of power distribution equipment are achieved, greatly improving operational efficiency and service quality.',
      'The system innovatively introduces tenant-level metering and prepayment functions. Residents can conveniently check power consumption and pay bills, making property management more intelligent and user-friendly. QR code asset association technology makes equipment maintenance faster and more efficient.',
      'Considering the special needs of talent apartments, the system particularly optimizes power quality and supply reliability. Whether for daily household power consumption or high-end electronic equipment, stable and high-quality power guarantee is provided, enhancing living experience and quality of life.',
    ],
  },
  keyFeatures: {
    zh: [
      '低损耗低噪声技术',
      '安静稳定电力环境',
      'BIM全生命周期贯通',
      '数字化可视化管理',
      '租户级计量与预付费',
      '便捷查询和缴费',
      '二维码资产关联',
      '优化电力品质可靠性',
    ],
    en: [
      'Low-loss, low-noise technology',
      'Quiet and stable power environment',
      'BIM full lifecycle integration',
      'Digital visualization management',
      'Tenant-level metering and prepayment',
      'Convenient inquiry and payment',
      'QR code asset association',
      'Optimized power quality and reliability',
    ],
  },
  specifications: [
    {
      label: { zh: '额定容量', en: 'Rated Capacity' },
      value: { zh: '2800A', en: '2800A' },
    },
    {
      label: { zh: '系统电压', en: 'System Voltage' },
      value: { zh: '10kV/380V', en: '10kV/380V' },
    },
    {
      label: { zh: '建筑类型', en: 'Building Type' },
      value: { zh: '人才公寓', en: 'Talent Apartments' },
    },
    {
      label: { zh: '计量方式', en: 'Metering Method' },
      value: { zh: '租户级精确计量', en: 'Tenant-level Precise Metering' },
    },
    {
      label: { zh: '管理技术', en: 'Management Technology' },
      value: { zh: 'BIM+二维码', en: 'BIM+QR Code' },
    },
    {
      label: { zh: '缴费方式', en: 'Payment Method' },
      value: { zh: '智能预付费', en: 'Intelligent Prepayment' },
    },
  ],
  awards: [
    {
      name: { zh: 'BIM应用优秀奖', en: 'BIM Application Excellence Award' },
      year: '2023',
      description: { zh: '在住宅项目BIM应用方面的创新成果', en: 'Innovation in BIM application for residential projects' },
      image: '/res/前海玲珑湾获奖.png',
    },
    {
      name: { zh: '钢结构金奖', en: 'Steel Structure Gold Award' },
      year: '2023',
      description: { zh: '钢结构建筑领域的技术卓越', en: 'Technical excellence in steel structure construction' },
      image: '/res/前海玲珑湾结构金奖.png',
    },
  ],
  relatedLinks: [
    {
      label: { zh: '住宅社区解决方案', en: 'Residential Community Solutions' },
      href: '/solutions/residential-communities',
    },
    {
      label: { zh: '智能计量配电产品', en: 'Intelligent Metering Power Distribution Products' },
      href: '/products/intelligent-metering',
    },
  ],
}

export default async function QianhaiTalentsApartmentsPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const lang = (sp?.lang === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return <ProjectDetailLayout project={projectData} lang={lang} />
}
