// src/lib/news/news-data.ts

// ===== Local types for the data layer (与组件的结构完全一致) =====
import sinaImg from '@/assets/News/新浪.png'
import chinaDailyImg from '@/assets/News/中国日报.png'
import chinaComImg from '@/assets/News/中华网.png'
import ifengImg from '@/assets/News/凤凰.png'
import chinaManufacturingImg from '@/assets/News/中国制造.png'
import dayangImg from '@/assets/News/大洋.png'
import cinnImg from '@/assets/News/中国工业.png'
import chinaPowerImg from '@/assets/News/中国电力.png'
import entrepreneurImg from '@/assets/News/企业.png'
import bnbImg from '@/assets/News/media7.png'
import creditChinaPoster from '@/assets/News/credit-china-poster.png'
import wechatQr from '@/assets/News/Wechat-QRcode.png'
import homeHeroPoster from '../../../public/res/home-hero-poster.jpg'
import type {
  NewsPayload,
  NewsItem,
  VideoItem,
  WeChatAccount,
  WeChatPost,
} from '@/lib/types/news'

export async function getNewsData(): Promise<NewsPayload> {
  const videos: VideoItem[] = [
    {
      id: 'v1',
      type: 'standard',
      title: { en: 'AIWASON Smart Busbar Technology', zh: 'AIWASON 智能母线科技' },
      description: { en: 'Explore innovations.', zh: '探索我们的创新。' },
      thumbnail: homeHeroPoster,
      videoUrl: '/video/home-hero.mp4',
      date: '2025-09-20',
      duration: '02:34',
    },
    {
      id: 'v2',
      type: 'interview',
      title: { en: 'Credit China – Liu Jingguang', zh: '信用中国 · 刘金光' },
      description: { en: 'Credit China feature.', zh: '信用中国专题片。' },
      thumbnail: creditChinaPoster,
      videoUrl: '/video/credit-China.mp4',
      date: '2024-12-01',
      duration: '06:50',
    },
  ]

  // 10 条外链新闻（使用你提供的媒体链接，描述与标题可后续替换）
  const news: NewsItem[] = [
    {
      id: 'n-sina',
      title: { en: 'AIWASON Featured by Sina Technology', zh: '新浪科技报道艾默森' },
      source: 'sinaImg',
      link: 'https://finance.sina.com.cn/jjxw/2025-05-12/doc-inewhnwe8190331.shtml',
      date: '2025-05-12',
      description: { en: 'Breakthrough fire-resistant intelligent busbar tech.', zh: '耐火智能母线科技突破。' },
      image: sinaImg,
    },
    {
      id: 'n-chinadaily',
      title: { en: 'China Daily Covers AIWASON', zh: '中国日报报道艾默森' },
      source: 'chinaDailyImg',
      link: 'https://caijing.chinadaily.com.cn/a/202505/13/WS6822ea40a310205377032daa.html',
      date: '2025-05-13',
      description: { en: 'Technology leadership in intelligent busbars.', zh: '智能母线科技引领未来。' },
      image: chinaDailyImg,
    },
    {
      id: 'n-china',
      title: { en: 'China.com In-depth Report', zh: '中华网深度报道艾默森' },
      source: '中华网',
      link: 'https://mtz.china.com/touzi/2025/0512/165386.html',
      date: '2025-05-12',
      description: { en: 'Mainstream media coverage.', zh: '主流媒体报道。' },
      image: chinaComImg,
    },
    {
      id: 'n-ifeng',
      title: { en: 'Phoenix Shenzhen Highlights AIWASON', zh: '凤凰网报道艾默森' },
      source: '凤凰网深圳',
      link: 'https://sz.ifeng.com/c/8jI5JgSvn9w.html',
      date: '2025-05-12',
      description: { en: 'Innovation reshaping the power grid.', zh: '创新重塑电力格局。' },
      image: ifengImg,
    },
    {
      id: 'n-manufacturing',
      title: { en: 'China Manufacturing Network Feature', zh: '中国制造网报道艾默森' },
      source: '中国制造网',
      link: 'https://china.nmqs1.com/7112.html',
      date: '2025-05-12',
      description: { en: 'Manufacturing industry spotlight.', zh: '制造业领域聚焦。' },
      image: chinaManufacturingImg,
    },
    {
      id: 'n-dayang',
      title: { en: 'Dayang News Coverage', zh: '大洋新闻网报道艾默森' },
      source: '大洋新闻网',
      link: 'https://www.zjw.cn/info-216758.html',
      date: '2025-05-12',
      description: { en: 'Regional media feature.', zh: '区域媒体专题报道。' },
      image: dayangImg,
    },
    {
      id: 'n-cinn',
      title: { en: 'CINN Industry Daily Report', zh: '中国工业新闻网报道艾默森' },
      source: '中国工业新闻网',
      link: 'https://www.cinn.cn/p/404448.html',
      date: '2025-05-12',
      description: { en: 'Industry innovation perspective.', zh: '行业创新视角。' },
      image: cinnImg,
    },
    {
      id: 'n-power',
      title: { en: 'China Power Industry Net Feature', zh: '中国电力产业网报道艾默森' },
      source: '中国电力产业网',
      link: 'http://www.dianchanye.com/news/720.html',
      date: '2025-05-12',
      description: { en: 'Power sector analysis.', zh: '电力行业深度解析。' },
      image: chinaPowerImg,
    },
    {
      id: 'n-entrepreneur',
      title: { en: 'Entrepreneur Daily Coverage', zh: '企业家日报网报道艾默森' },
      source: '企业家日报网',
      link: 'http://www.imnews.com.cn/a/content/2025-05/12/content_2732321.htm',
      date: '2025-05-12',
      description: { en: 'Entrepreneurship-focused story.', zh: '创业视角报道。' },
      image: entrepreneurImg,
    },
    {
      id: 'n-bnb',
      title: { en: 'Bnbnews Social Coverage', zh: '蚌埠新闻网报道艾默森' },
      source: '蚌埠新闻网',
      link: 'http://www.bnbnews.cn/shehui/p/97413.html',
      date: '2025-05-12',
      description: { en: 'Regional social coverage.', zh: '地方社会报道。' },
      image: bnbImg,
    },
  ]

  const wechatAccount: WeChatAccount = {
    name: { en: 'AIWASON Official', zh: 'AIWASON 官方公众号' },
    qr: wechatQr,
    homepage: 'https://mp.weixin.qq.com/...',
    intro: {
      en: 'Follow for project cases and technical notes.',
      zh: '关注获取项目案例与技术干货。',
    },
  }

  // 微信图文先留空，占位只显示账号与二维码
  const wechat: WeChatPost[] = []

  const payload: NewsPayload = { videos, news, wechat, wechatAccount }
  return payload
}
