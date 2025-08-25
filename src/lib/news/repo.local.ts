import { INewsProvider } from './provider';
import { NewsItem, NewsListParams, NewsListResult } from '../types/news';


// IMPORTANT: from src/lib/news -> src/lib -> src -> project root -> data/news.ts
// If your file is at /data.ts instead, change to "../../../data".

import { NEWS } from '../../../data/news';   // named import (with curly braces)


function applyFilters(items: NewsItem[], params: NewsListParams): NewsItem[] {
  const { tag } = params;
  let arr = items;

  // Filter by tag (our three categories: datacenter / commercial / residential)
  if (tag) arr = arr.filter(n => (n.tags || []).includes(tag));

  // Sort by date (newest first)
  return arr.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

class LocalNewsRepo implements INewsProvider {
  async list(params: NewsListParams = {}): Promise<NewsListResult> {
    const page = Math.max(1, params.page ?? 1);
    const pageSize = Math.min(24, Math.max(1, params.pageSize ?? 9));

    const filtered = applyFilters(NEWS, params).filter(Boolean);
    const total = filtered.length;
    const start = (page - 1) * pageSize;

    return {
      items: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
    };
  }

  async getBySlug(slug: string): Promise<NewsItem | null> {
    return NEWS.find(n => n.slug === slug) ?? null;
  }
}

// Named export (NOT default)
export const newsProvider: INewsProvider = new LocalNewsRepo();
