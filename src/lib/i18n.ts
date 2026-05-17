// src/lib/i18n.ts
import type { Locale } from './types/news';

export type { Locale };

export const DEFAULT_LOCALE: Locale = 'zh';
export const SUPPORTED_LOCALES = ['zh', 'en'] as const;
export const LOCALES = SUPPORTED_LOCALES;

/** Type guard */
export function isLocale(x: unknown): x is Locale {
  return x === 'zh' || x === 'en';
}

/** Read locale from Next App Router searchParams (?lang=zh|en) */
export function getLocale(
  searchParams: Record<string, string | string[] | undefined> = {},
): Locale {
  const raw = searchParams.lang;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'zh' : 'en';
}

export function localePath(locale: Locale, path: string = ''): string {
  const trimmed = path.replace(/^\/+/, '');
  return trimmed ? `/${locale}/${trimmed}` : `/${locale}`;
}

export function stripLocale(pathname: string): { locale: Locale | null; rest: string } {
  const match = pathname.match(/^\/(en|zh)(\/.*)?$/);
  if (!match) return { locale: null, rest: pathname };
  return { locale: match[1] as Locale, rest: match[2] ?? '' };
}

export function htmlLang(locale: Locale): 'en' | 'zh-CN' {
  return locale === 'zh' ? 'zh-CN' : 'en';
}

export function withLocaleSwitched(pathname: string, target: Locale): string {
  const { rest } = stripLocale(pathname);
  return localePath(target, rest);
}
