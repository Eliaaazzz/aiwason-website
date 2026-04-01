import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import JsonLd from '@/components/common/JsonLd'

export const metadata: Metadata = {
  title: {
    default: 'AIWASON',
    template: '%s | AIWASON',
  },
  metadataBase: new URL('https://www.aiwason.com'),
  description:
    'AIWASON — 耐火智能光电母线系统 | Fire-resistant intelligent optoelectronic busbars for data centers and smart buildings.',
  applicationName: 'AIWASON',
  keywords: [
    'AIWASON',
    '深圳智能芯片中心',
    'fireproof busbar',
    'optoelectronic',
    'data center',
    'smart building',
    '耐火母线',
    '智能光电',
  ],
  authors: [{ name: 'AIWASON' }],
  creator: 'AIWASON',
  publisher: 'AIWASON',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: 'AIWASON',
    description:
      'Fire-resistant intelligent optoelectronic busbar technology powering data centers and smart buildings.',
    images: [{ url: '/res/aiwason_fireproof_busbar_hero.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIWASON',
    description:
      'Fire-resistant intelligent optoelectronic busbar technology powering data centers and smart buildings.',
    images: ['/res/aiwason_fireproof_busbar_hero.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/?lang=en',
      zh: '/?lang=zh',
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: '#000000',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers()
  const locale = headerList.get('x-locale') || 'en'

  return (
    <html lang={locale}>
      <body className="antialiased font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#76B900]"
        >
          Skip to content
        </a>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'AIWASON',
            url: 'https://www.aiwason.com',
            logo: 'https://www.aiwason.com/res/logo.png',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'Elialiu760317@outlook.com',
              contactType: 'customer service',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
