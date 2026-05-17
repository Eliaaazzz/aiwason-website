import type { Metadata } from 'next';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './i18n';

export const SITE_URL = 'https://aiwasontech.com';
export const SITE_NAME = 'AIWASON';
export const BRAND_TAGLINE_EN = 'Fire-Resistant Intelligent Optoelectronic Busbars';
export const BRAND_TAGLINE_ZH = '耐火智能光电母线系统';

type I18nString = { en: string; zh: string };

export interface BuildMetadataOptions {
  locale: Locale;
  /** Path without leading slash and without the locale segment, e.g. "about" or "" for home. */
  path: string;
  title: I18nString;
  description: I18nString;
  keywords?: I18nString;
  image?: string;
}

function buildAlternates(path: string) {
  const cleaned = path.replace(/^\/+/, '');
  const suffix = cleaned ? `/${cleaned}` : '';
  return Object.fromEntries(
    LOCALES.map((l) => [l === 'zh' ? 'zh-CN' : l, `/${l}${suffix}`]),
  );
}

export function buildMetadata(opts: BuildMetadataOptions): Metadata {
  const { locale, path, title, description, keywords, image } = opts;
  const localizedTitle = title[locale];
  const localizedDescription = description[locale];
  const ogLocale = locale === 'zh' ? 'zh_CN' : 'en_US';
  const ogLocaleAlternate = locale === 'zh' ? 'en_US' : 'zh_CN';
  const cleanedPath = path.replace(/^\/+/, '');
  const canonicalPath = cleanedPath ? `/${locale}/${cleanedPath}` : `/${locale}`;
  const ogImage = image ?? '/opengraph-image';

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: localizedTitle },
    description: localizedDescription,
    keywords: keywords ? keywords[locale].split(',').map((s) => s.trim()) : undefined,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: { telephone: false, email: false, address: false },
    alternates: {
      canonical: canonicalPath,
      languages: {
        ...buildAlternates(cleanedPath),
        'x-default': `/${DEFAULT_LOCALE}${cleanedPath ? `/${cleanedPath}` : ''}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: `${SITE_URL}${canonicalPath}`,
      title: localizedTitle,
      description: localizedDescription,
      locale: ogLocale,
      alternateLocale: ogLocaleAlternate,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: localizedTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedTitle,
      description: localizedDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: '/icon',
      apple: '/apple-icon',
    },
    manifest: '/manifest.webmanifest',
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/res/logo.png`,
    description: locale === 'zh' ? BRAND_TAGLINE_ZH : BRAND_TAGLINE_EN,
    sameAs: [],
  } as const;
}
