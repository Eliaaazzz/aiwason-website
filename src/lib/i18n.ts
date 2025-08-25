// src/lib/i18n.ts
import type { Locale } from './types/news';

export const DEFAULT_LOCALE: Locale = 'zh';
export const SUPPORTED_LOCALES = ['zh', 'en'] as const;

/** Type guard */
export function isLocale(x: unknown): x is Locale {
  return x === 'zh' || x === 'en';
}

/** Read locale from Next App Router searchParams (?lang=zh|en) */
export function getLocale(
  searchParams: Record<string, string | string[] | undefined> = {}
): Locale {
  const raw = searchParams.lang;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return isLocale(v) ? v : DEFAULT_LOCALE;
}
