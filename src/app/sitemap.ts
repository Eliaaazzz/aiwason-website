import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/i18n'
import { SITE_URL } from '@/lib/seo'

const ROUTES = ['', 'about', 'products', 'solutions', 'solutions/data-center'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.flatMap((route) =>
    LOCALES.map((locale) => {
      const suffix = route ? `/${route}` : ''
      const url = `${SITE_URL}/${locale}${suffix}`
      const languages = Object.fromEntries(
        LOCALES.map((l) => [l === 'zh' ? 'zh-CN' : l, `${SITE_URL}/${l}${suffix}`]),
      )
      return {
        url,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            'x-default': `${SITE_URL}/zh${suffix}`,
          },
        },
      }
    }),
  )
}
