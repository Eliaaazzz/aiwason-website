import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import { DEFAULT_LOCALE, htmlLang, isLocale, type Locale } from '@/lib/i18n'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Fire-Resistant Intelligent Optoelectronic Busbars`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Powering data centers and real estate with revolutionary fire-resistant intelligent optoelectronic busbar technology.',
  applicationName: SITE_NAME,
  formatDetection: { telephone: false, email: false, address: false },
  icons: { icon: '/icon', apple: '/apple-icon' },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#76B900',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers()
  const rawPath = headersList.get('x-pathname') ?? headersList.get('x-locale') ?? ''
  const fromHeader = headersList.get('x-locale')
  let locale: Locale = DEFAULT_LOCALE
  if (isLocale(fromHeader)) {
    locale = fromHeader
  } else {
    const match = rawPath.match(/^\/(en|zh)(\/|$)/)
    if (match && isLocale(match[1])) locale = match[1]
  }

  return (
    <html lang={htmlLang(locale)}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
