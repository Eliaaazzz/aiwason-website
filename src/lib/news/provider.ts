import { NewsListParams, NewsListResult, NewsItem } from '../types/news';

export interface INewsProvider {
  list(params: NewsListParams): Promise<NewsListResult>;
  getBySlug(slug: string): Promise<NewsItem | null>;
}
