export type Locale = 'zh' | 'en';

export interface LocalizedText {
    zh: string;
    en: string;
}

export interface NewsItem {
    id: string;
    slug: string;
    date: string;
    cover?: string;
    title: LocalizedText;
    summary: LocalizedText;
    tags?: string[];
    url?: string;
}

export interface NewsListParams {
    page?: number;
    pageSize?: number;
    tag?: string;
    locale?: Locale;
}

export interface NewsListResult {
    items: NewsItem[];
    total: number;
    page: number;
    pageSize: number;
}