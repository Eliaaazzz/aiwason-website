import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Fire-Resistant Intelligent Optoelectronic Busbars`,
    short_name: SITE_NAME,
    description:
      'Powering data centers and real estate with revolutionary fire-resistant intelligent optoelectronic busbar technology.',
    start_url: '/zh',
    scope: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#76B900',
    orientation: 'portrait-primary',
    lang: 'zh-CN',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
