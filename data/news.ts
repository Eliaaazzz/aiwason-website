
import { NewsItem } from '../src/lib/types/news';

export const NEWS: NewsItem[] = [

  {
    id: 'n1',
    slug: 'intl-conf-center',
    date: '2025-08-15',
    cover: '/images/news/conference.jpg', 
    title:   { zh: '国际会议中心项目', en: 'International Conference Center' },
    summary: { zh: '面向大型会展的智慧配电与消防方案', en: 'Smart power & fire for venues' },
    tags: ['conference'], 
    url: 'https://example.com/conference'
  },
  {
    id: 'n2',
    slug: 'datacenter-ai-busbar',
    date: '2025-08-18',
    cover: '/images/news/award.jpg',
    title: { zh: '数据中心智能母线获奖', en: 'Busbar Award in Data Center' },
    summary: { zh: '凭借预测维护能力获奖', en: 'Recognized for predictive maintenance' },
    tags: ['datacenter'],
    url: 'https://example.com/datacenter'
  },
  {
    id: 'n3',
    slug: 'commercial-coop',
    date: '2025-08-12',
    cover: '/images/news/epc.jpg',
    title: { zh: '商业地产合作', en: 'Commercial Partnership' },
    summary: { zh: '面向智能楼宇的部署', en: 'Deployment for smart buildings' },
    tags: ['commercial']
  },
  {
    id: 'n4',
    slug: 'residential-retrofit',
    date: '2025-08-08',
    cover: '/images/news/resi.jpg',
    title: { zh: '民用建筑改造示范', en: 'Residential Retrofit' },
    summary: { zh: '提升能效与安全', en: 'Improved efficiency and safety' },
    tags: ['residential']
  }
];
export default NEWS;