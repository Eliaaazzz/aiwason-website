// src/lib/types/news.ts
// Centralized types for the news module

export type Locale = 'zh' | 'en'

export type LocalizedText = {
  zh: string
  en: string
}

// Minimal shape used by UI components
export type NewsItem = {
  id: string
  slug: string
  date: string // ISO date string
  cover: string
  title: LocalizedText | string
  summary?: LocalizedText | string
  tags?: string[]
  url?: string
}

export type NewsListParams = {
  page?: number
  pageSize?: number
  tag?: string
  locale?: Locale
}

export type NewsListResult = {
  items: NewsItem[]
  total: number
  page: number
  pageSize: number
}
