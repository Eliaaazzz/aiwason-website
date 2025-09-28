// src/lib/news/news-data.ts

// ===== Local types for the data layer (与组件的结构完全一致) =====
export type Localised<T> = { en: T; zh: T }

export type VideoItem = {
  id: string
  type: 'standard' | 'interview'
  title: Localised<string>
  description?: Localised<string>
  thumbnail: string
  videoUrl: string
  date?: string
  duration?: string
}

export type NewsItem = {
  id: string
  title: Localised<string>
  description?: Localised<string>
  source: string
  link: string        // 外链
  date: string
}

export type WeChatPost = {
  id: string
  title: Localised<string>
  description?: Localised<string>
  thumbnail: string
  link: string
  date: string
}

export type WeChatAccount = {
  name: Localised<string>
  qr: string          // 建议放 public/res/wechat-qr.png
  homepage?: string
  intro?: Localised<string>
}

export type NewsPayload = {
  videos: VideoItem[]
  news: NewsItem[]            // 10 条外链
  wechat: WeChatPost[]
  wechatAccount: WeChatAccount
}

export async function getNewsData(): Promise<NewsPayload> {
  const videos: VideoItem[] = [
    {
      id: 'v1',
      type: 'standard',
      title: { en: 'AIWASON Smart Busbar Technology', zh: 'AIWASON 智能母线科技' },
      description: { en: 'Explore innovations.', zh: '探索我们的创新。' },
      thumbnail: '/res/video-thumbnail-1.jpg',
      videoUrl: '/video/tech-showcase.mp4',
      date: '2025-09-20',
      duration: '02:34',
    },
    {
      id: 'v2',
      type: 'interview',
      title: { en: 'Discovering Beauty: Engineering Excellence', zh: '发现之美：工程技术的卓越追求' },
      description: { en: 'Sustainable power discussion.', zh: '关于可持续能源的讨论。' },
      thumbnail: '/res/interview-1.jpg',
      videoUrl: '/video/interview-1.mp4',
      date: '2025-09-15',
      duration: '06:50',
    },
  ]

  // 10 条外链新闻（全部 https:// 开头）
  const news: NewsItem[] = [
    {
      id: 'n1',
      title: { en: 'Innovation Award 2025', zh: '荣获 2025 创新奖' },
      source: 'Industry Today',
      link: 'https://example.com/news/innovation-award-2025',
      date: '2025-09-10',
      description: { en: 'Breakthrough recognised.', zh: '技术突破获得认可。' },
    },
    {
      id: 'n2',
      title: { en: 'Data Center Resilience', zh: '数据中心韧性提升' },
      source: 'Tech Daily',
      link: 'https://example.com/news/data-center-resilience',
      date: '2025-09-09',
      description: { en: 'Fire-resistant busbars boost uptime.', zh: '耐火母线提升可用性。' },
    },
    {
      id: 'n3',
      title: { en: 'Smart Buildings', zh: '智慧楼宇' },
      source: 'SmartBuild',
      link: 'https://example.com/news/smart-buildings',
      date: '2025-09-08',
      description: { en: 'Integrated monitoring case study.', zh: '监测一体化案例。' },
    },
    {
      id: 'n4',
      title: { en: 'Airport Deployment', zh: '机场部署' },
      source: 'Aviation Weekly',
      link: 'https://example.com/news/airport-deployment',
      date: '2025-09-07',
      description: { en: 'Mission-critical power track.', zh: '关键电力通道。' },
    },
    {
      id: 'n5',
      title: { en: 'Real Estate ESG', zh: '地产 ESG' },
      source: 'ESG Watch',
      link: 'https://example.com/news/real-estate-esg',
      date: '2025-09-06',
      description: { en: 'Safety and sustainability.', zh: '安全与可持续。' },
    },
    {
      id: 'n6',
      title: { en: 'Manufacturing Upgrade', zh: '制造升级' },
      source: 'Factory 4.0',
      link: 'https://example.com/news/manufacturing-upgrade',
      date: '2025-09-05',
      description: { en: 'Digital QA pipeline.', zh: '数字化质检。' },
    },
    {
      id: 'n7',
      title: { en: 'Standards & Compliance', zh: '标准合规' },
      source: 'Compliance Pro',
      link: 'https://example.com/news/standards-compliance',
      date: '2025-09-04',
      description: { en: 'New certification obtained.', zh: '新增认证。' },
    },
    {
      id: 'n8',
      title: { en: 'Investor Brief', zh: '投资者快讯' },
      source: 'Finance Note',
      link: 'https://example.com/news/investor-brief',
      date: '2025-09-03',
      description: { en: 'Market adoption update.', zh: '市场采用度更新。' },
    },
    {
      id: 'n9',
      title: { en: 'R&D Milestone', zh: '研发里程碑' },
      source: 'Lab Journal',
      link: 'https://example.com/news/rd-milestone',
      date: '2025-09-02',
      description: { en: 'Thermal model validated.', zh: '热模型验证。' },
    },
    {
      id: 'n10',
      title: { en: 'Partnership', zh: '生态合作' },
      source: 'Partner Wire',
      link: 'https://example.com/news/partnership',
      date: '2025-09-01',
      description: { en: 'Joint solution announced.', zh: '联合解决方案发布。' },
    },
  ]

  const wechatAccount: WeChatAccount = {
    name: { en: 'AIWASON Official', zh: 'AIWASON 官方公众号' },
    qr: '/res/wechat-qr.png',
    homepage: 'https://mp.weixin.qq.com/...',
    intro: {
      en: 'Follow for project cases and technical notes.',
      zh: '关注获取项目案例与技术干货。',
    },
  }

  const wechat: WeChatPost[] = [
    {
      id: 'w1',
      title: { en: 'Next Generation Busbar', zh: '新一代母线技术' },
      thumbnail: '/res/wechat-post-1.jpg',
      link: 'https://mp.weixin.qq.com/...',
      date: '2025-09-25',
      description: { en: 'Future of distribution.', zh: '配电的未来。' },
    },
  ]

  const payload: NewsPayload = { videos, news, wechat, wechatAccount }
  return payload
}
