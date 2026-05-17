import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/i18n'
import { SITE_URL } from '@/lib/seo'

// Static (non-dynamic) routes that live under /[locale]/.
// Listed once here; the sitemap emits both /en/<route> and /zh/<route>
// with full hreflang alternates so search engines discover every
// localized variant of each page.
const STATIC_ROUTES = [
  '',
  'about',
  'products',
  'solutions',
  'solutions/data-center',
  'news',
  'contact',
  'events',
] as const

// Curated news article slugs (mirrors src/app/[locale]/news/<slug>/page.tsx)
const NEWS_SLUGS = [
  'airport-upgrade',
  'byd-smart-factory',
  'ccb-smart-campus',
  'cctv-interview',
  'ceec-matchmaking',
  'chip-center',
  'data-center',
  'dongguan-minying',
  'guangzhou-smart-park',
  'hengqin-port-hub',
  'hsr-nanfang-xinhui',
  'mixc-complex',
  'mixc-flagship',
  'nobel-workstation',
  'poly-theater',
  'qianhai-holding-investment',
  'qianhai-talents-apartments',
  'qianhai-trading-plaza',
  'rail-transit-power',
  'shenzhen-ccb-tower',
  'zhongshan-perfect-plaza',
] as const

// Model project slugs (mirrors src/app/[locale]/Model projects/<slug>/page.tsx).
// Space + capital "M" gets URL-encoded as `Model%20projects` for the sitemap.
const MODEL_PROJECT_SLUGS = [
  'airport-upgrade',
  'byd-smart-factory',
  'ccb-smart-campus',
  'data-center',
  'dongguan-minying',
  'guangzhou-smart-park',
  'hengqin-port-hub',
  'hotel-deployment',
  'mixc-flagship',
  'qianhai-holding-investment',
  'qianhai-talents-apartments',
  'qianhai-trading-plaza',
  'rail-transit-power',
  'smart-tower',
  'zhongshan-perfect-plaza',
] as const

function entry(route: string, priority: number) {
  const suffix = route ? `/${route}` : ''
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${suffix}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
    alternates: {
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [
            l === 'zh' ? 'zh-CN' : l,
            `${SITE_URL}/${l}${suffix}`,
          ]),
        ),
        'x-default': `${SITE_URL}/zh${suffix}`,
      },
    },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.flatMap((route) => entry(route, route === '' ? 1 : 0.8)),
    ...NEWS_SLUGS.flatMap((slug) => entry(`news/${slug}`, 0.6)),
    ...MODEL_PROJECT_SLUGS.flatMap((slug) =>
      entry(`Model%20projects/${slug}`, 0.5),
    ),
  ]
}
