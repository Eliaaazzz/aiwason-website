import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'AIWASON | 深圳智能芯片中心 · Fire-Resistant Intelligent Optoelectronic Busbars',
    template: '%s | AIWASON',
  },
  description:
    'AIWASON — 深圳智能芯片中心 · 耐火智能光电母线系统 | Fire-resistant intelligent optoelectronic busbars for data centers and smart buildings.',
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
    title: 'AIWASON | 深圳智能芯片中心 · Fire-Resistant Intelligent Optoelectronic Busbars',
    description:
      'Revolutionary fire-resistant intelligent optoelectronic busbar technology powering data centers and real estate.',
    images: [{ url: '/res/aiwason_fireproof_busbar_hero.png' }],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/?lang=en',
      zh: '/?lang=zh',
    },
  },
  themeColor: '#000000',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
