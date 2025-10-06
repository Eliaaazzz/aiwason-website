import type { Metadata, Viewport } from 'next'
import './globals.css'

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
    images: [{ url: '/res/aiwason_fireproof_busbar_hero.png' }],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
