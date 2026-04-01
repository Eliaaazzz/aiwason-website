import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiwason.com'

const staticRoutes = [
  '/',
  '/about',
  '/products',
  '/solutions',
  '/news',
  '/contact',
  '/events/datacenter-summit',
]

const modelProjectRoutes = [
  '/Model%20projects/airport-upgrade',
  '/Model%20projects/byd-smart-factory',
  '/Model%20projects/ccb-smart-campus',
  '/Model%20projects/data-center',
  '/Model%20projects/dongguan-minying',
  '/Model%20projects/guangzhou-smart-park',
  '/Model%20projects/hengqin-port-hub',
  '/Model%20projects/hotel-deployment',
  '/Model%20projects/mixc-flagship',
  '/Model%20projects/qianhai-holding-investment',
  '/Model%20projects/qianhai-talents-apartments',
  '/Model%20projects/qianhai-trading-plaza',
  '/Model%20projects/rail-transit-power',
  '/Model%20projects/smart-tower',
  '/Model%20projects/zhongshan-perfect-plaza',
]

// Curated list of article-style pages under /news
const newsRoutes = [
  '/news/airport-upgrade',
  '/news/byd-smart-factory',
  '/news/ccb-smart-campus',
  '/news/cctv-interview',
  '/news/ceec-matchmaking',
  '/news/chip-center',
  '/news/data-center',
  '/news/dongguan-minying',
  '/news/guangzhou-smart-park',
  '/news/hengqin-port-hub',
  '/news/hsr-nanfang-xinhui',
  '/news/mixc-complex',
  '/news/mixc-flagship',
  '/news/nobel-workstation',
  '/news/poly-theater',
  '/news/qianhai-holding-investment',
  '/news/qianhai-talents-apartments',
  '/news/qianhai-trading-plaza',
  '/news/rail-transit-power',
  '/news/shenzhen-ccb-tower',
  '/news/zhongshan-perfect-plaza',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [...staticRoutes, ...newsRoutes, ...modelProjectRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}

