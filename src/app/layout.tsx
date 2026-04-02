import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import JsonLd from '@/components/common/JsonLd'
import {
  defaultOgImage,
  siteDescription,
  siteLogo,
  siteName,
  siteSummary,
  siteUrl,
} from '@/lib/site'

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  metadataBase: new URL(siteUrl),
  description: siteDescription,
  applicationName: siteName,
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
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: siteName,
    description: siteSummary,
    url: siteUrl,
    images: [{ url: defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteSummary,
    images: [defaultOgImage],
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
            name: siteName,
            url: siteUrl,
            logo: siteLogo,
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
