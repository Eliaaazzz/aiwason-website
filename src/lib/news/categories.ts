import type { LocalizedText } from '../types/news';

export type CategoryKey = 'conference'| 'datacenter' | 'commercial' | 'residential';

export const HOME_NEWS_ORDER: CategoryKey[] = [
  'datacenter',
  'commercial',
  'residential'
];

export const CATEGORY_LABELS: Record<CategoryKey, LocalizedText> = {
  conference: { zh: '会议', en: 'Conference' },
  datacenter: { zh: '数据中心', en: 'Data Center' },
  commercial: { zh: '商业大楼', en: 'Commercial Buildings' },
  residential:{ zh: '民用建筑', en: 'Residential' },
};
