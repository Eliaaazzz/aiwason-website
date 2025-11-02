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

  return [...staticRoutes, ...newsRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}

