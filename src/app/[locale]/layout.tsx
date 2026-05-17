import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { isLocale, LOCALES, type Locale } from '@/lib/i18n'
import { organizationJsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const ld = organizationJsonLd(locale as Locale)
  const skipLabel = locale === 'zh' ? '跳到主要内容' : 'Skip to main content'

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[1000] focus:bg-[#76B900] focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {skipLabel}
      </a>
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  )
}
