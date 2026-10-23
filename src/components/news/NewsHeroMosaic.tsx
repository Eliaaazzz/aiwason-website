// Server Component: no 'use client'
import Image from 'next/image';
import Link from 'next/link';
import { newsProvider } from '../../lib/news';
import type { Locale, NewsItem, LocalizedText } from '../../lib/types/news';
import type { ReactNode } from 'react';
import { blurProps } from '../../lib/imageProps';

function CardWrap({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  if (!href) return <div className="group">{children}</div>;
  const external = /^https?:\/\//.test(href);
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group">
      {children}
    </a>
  ) : (
    <Link href={href} className="group">
      {children}
    </Link>
  );
}

/** Loose localized value that might be a string or a partial object */
type LocalizedLoose =
  | LocalizedText
  | string
  | null
  | undefined
  | Record<string, unknown>;

const getString = (obj: Record<string, unknown>, key: string) => {
  const v = obj[key];
  return typeof v === 'string' ? v : undefined;
};

/** Get zh/en text safely without using `any` */
function safeText(value: LocalizedLoose, locale: Locale): string {
  if (!value) return '';
  if (typeof value === 'string') return value;

  if (typeof value === 'object') {
    const o = value as Record<string, unknown>;
    const zh =
      getString(o, 'zh') ??
      getString(o, 'zh-CN') ??
      getString(o, 'cn') ??
      getString(o, 'titleZh') ??
      getString(o, 'nameZh');

    const en =
      getString(o, 'en') ??
      getString(o, 'en-US') ??
      getString(o, 'titleEn') ??
      getString(o, 'nameEn');

    return locale === 'zh' ? (zh ?? en ?? '') : (en ?? zh ?? '');
  }
  return '';
}

export default async function NewsHeroMosaic({
  locale,
  featuredTag = 'featured',
}: {
  locale: Locale;
  featuredTag?: string;
}) {
  // Try featured; fallback to latest
  let result = await newsProvider.list({
    page: 1,
    pageSize: 5,
    tag: featuredTag,
    locale,
  });
  if (!result.items?.length) {
    result = await newsProvider.list({ page: 1, pageSize: 5, locale });
  }
  const items: NewsItem[] = (result.items ?? []).filter(Boolean);
  if (!items.length) return null;

  const [hero, ...rest] = items;
  const tiles = rest.slice(0, 4);

  const fallbackCover = '/res/factory.jpg';

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 lg:pt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4">
        {/* Left big card (2x2) */}
        <CardWrap href={hero.url}>
          <div className="relative col-span-2 row-span-2 md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <div className="relative w-full h-[280px] sm:h-full md:h-full">
              <Image
                src={hero.cover || fallbackCover}
                alt={safeText(hero.title, locale) || 'news'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
                className="object-cover opacity-80 group-hover:opacity-90 transition"
                priority
                fetchPriority="high"
                {...blurProps(hero.cover || fallbackCover)}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="text-[11px] uppercase tracking-wide opacity-80">
                {new Date(hero.date).toLocaleDateString(
                  locale === 'zh' ? 'zh-CN' : 'en-US'
                )}
              </div>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold">
                {safeText(hero.title, locale)}
              </h2>
              {hero.summary && (
                <p className="mt-2 text-sm md:text-base opacity-90 line-clamp-3">
                  {safeText(hero.summary, locale)}
                </p>
              )}
              {hero.url && (
                <span className="inline-block mt-4 text-sm rounded-lg bg-emerald-500/90 text-black px-3 py-2">
                  {locale === 'zh' ? '阅读' : 'Read'}
                </span>
              )}
            </div>
          </div>
        </CardWrap>

        {/* Right grid (2x2) */}
        {tiles.map((n) => (
          <CardWrap key={n.id} href={n.url}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src={n.cover || fallbackCover}
                  alt={safeText(n.title, locale) || 'news'}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={70}
                  className="object-cover group-hover:scale-[1.02] transition"
                  {...blurProps(n.cover || fallbackCover)}
                />
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-wide opacity-60">
                  {new Date(n.date).toLocaleDateString(
                    locale === 'zh' ? 'zh-CN' : 'en-US'
                  )}
                </div>
                <h3 className="text-base font-semibold mt-1 line-clamp-2">
                  {safeText(n.title, locale)}
                </h3>
              </div>
            </div>
          </CardWrap>
        ))}
      </div>
    </section>
  );
}
