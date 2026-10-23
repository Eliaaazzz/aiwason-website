// src/lib/pageHelpers.ts
// Shared helpers for [locale]-aware Next.js pages.
//
// Why: every relocated page under src/app/[locale]/ needs the same
// boilerplate — generateStaticParams for both locales, generateMetadata
// keyed on locale, and a typed resolveLocale that returns a narrowed Locale.
// Hosting this here keeps each page small and consistent so the SEO 100
// metadata pattern stays correct across the site.

import type { Metadata } from 'next'
import { buildMetadata, type BuildMetadataOptions } from './seo'
import { isLocale, LOCALES, type Locale } from './i18n'

export function generateLocaleStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params
  return isLocale(locale) ? locale : 'en'
}

export async function localeMetadata(
  params: Promise<{ locale: string }>,
  opts: Omit<BuildMetadataOptions, 'locale'>,
): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return buildMetadata({ ...opts, locale })
}
