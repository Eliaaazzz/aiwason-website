import type { NewsItem } from '../src/lib/types/news'

type NewsRecord = NewsItem & { tags?: string[]; slug?: string }

// Placeholder dataset; replace with real news entries as needed.
export const NEWS: NewsRecord[] = []
