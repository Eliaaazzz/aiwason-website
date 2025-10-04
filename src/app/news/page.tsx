// src/app/news/page.tsx
import type { Metadata } from 'next'
import { getNewsData } from '@/lib/news/news-data'
import LanguageSwitch from '@/components/common/LanguageSwitch'
import NewsSectionsSlideIn, { type NewsGroup } from '@/components/news/NewsSectionsSlideIn'
import MediaCarousel from '@/components/news/MediaCarousel'
import coverCEEC from '@/assets/News/中欧企业对接会.png'
import coverNobel from '@/assets/News/诺贝尔创新工作站.png'
import coverNobelMeet from '@/assets/News/会面诺奖教授.png'
import coverCCTV1 from '@/assets/News/央视采访1.png'
import coverCCTV2 from '@/assets/News/央视采访2.png'
import wechatBanner from '@/assets/News/Wechat.png'
import wechatQrcode from '@/assets/News/Wechat-QRcode.png'
import creditChinaPoster from '@/assets/News/credit-china-poster.png'
import homeHeroPoster from '../../../public/res/home-hero-poster.jpg'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'News & Media | AIWASON',
  description: 'Latest videos, featured stories, media coverage, and WeChat.',
}

type PageProps = { searchParams?: { lang?: string } }

type Localised<T> = { en: T; zh: T }

const mediaImageMap = {
  'n-sina': '/res/新浪网.png',
  'n-chinadaily': '/res/中国日报.png',
  'n-china': '/res/中华.png',
  'n-ifeng': '/res/凤凰网.png',
  'n-manufacturing': '/res/中国制造.png',
  'n-dayang': '/res/大洋.png',
  'n-cinn': '/res/中国工业新闻网.png',
  'n-power': '/res/中国电力产业网.png',
  'n-entrepreneur': '/res/企业.png',
  'n-bnb': '/res/links.png',
} as const

const Separator = () => (
  <div className="h-2 w-full bg-gradient-to-r from-white via-[#aee28b] to-white" aria-hidden="true" />
)

export default async function NewsPage({ searchParams }: PageProps) {
  const { videos, news } = await getNewsData()
  const lang = (searchParams?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'

  const copy = {
    pageTitle: {
      en: 'News & Media Center',
      zh: '新闻与媒体中心',
    },
    pageIntro: {
      en: 'Stay current with AIWASON highlights: in-depth videos, strategic collaborations, and media coverage that shape the intelligent busbar industry.',
      zh: '聚焦 AIWASON 最新动态：纵览视频专栏、战略协同与主流媒体报道，洞察耐火智能母线行业新趋势。',
    },
    headings: {
      videoCenter: { en: 'Video Center', zh: '视频专区' },
      media: { en: 'Media Coverage', zh: '媒体报道' },
      featured: { en: 'Featured Stories', zh: '重点新闻' },
      wechat: { en: 'WeChat Official', zh: '微信公众号' },
    },
    mediaTagline: {
      en: 'Fire-resistant intelligent optoelectronics reshaping the grid of tomorrow',
      zh: '智能耐火光电技术重塑未来配电格局',
    },
    featuredEntries: {
      ceec: {
        title: { en: 'Invited to China–CEEC SMEs Matchmaking', zh: '受邀参加中国—中东欧企业对接会' },
        desc: {
          en: 'As the sole representative from China’s intelligent busbar sector, AIWASON was invited to the China–CEEC SMEs Matchmaking and Cooperation Achievements Exhibition in Budapest. The team conducted deep exchanges with European partners and secured a portfolio of collaboration opportunities.',
          zh: 'AIWASON 作为中国智能母线行业唯一代表受邀前往布达佩斯，参与中国—中东欧中小企业合作对接暨成果展，与多国伙伴深入交流，促成系列合作成果。',
        },
        date: '2017/11/27',
        href: '/news/ceec-matchmaking',
      },
      nobel: {
        title: { en: 'Meeting Prof. Michel to Establish Nobel Innovation Workstation', zh: '与诺奖教授米歇尔会面建立诺贝尔创新工作站' },
        desc: {
          en: 'AIWASON met Nobel Laureate in Chemistry Prof. Hartmut Michel to jointly establish the “Nobel Expert Innovation Workstation.” The partnership accelerates research on high-reliability, green intelligent busbar solutions.',
          zh: 'AIWASON 与诺贝尔化学奖得主哈特穆特·米歇尔教授会面，携手共建“诺奖·专家创新工作站”，加速高可靠、绿色智能母线方案的研发落地。',
        },
        date: '2024/11/14',
        href: '/news/nobel-workstation',
      },
      cctv: {
        title: { en: 'Interviewed by CCTV', zh: '接受央视采访' },
        desc: {
          en: 'CCTV invited AIWASON to share insights on fire-resistant intelligent optoelectronic busbars, covering product innovation, urban infrastructure deployment, and enterprise vision.',
          zh: '中央电视台专访 AIWASON，聚焦耐火智能光电母线在产品创新、城市基础设施部署与企业战略愿景方面的成果。',
        },
        date: '2024/12/01',
        href: '/news/cctv-interview',
      },
    },
    wechatCards: [
      {
        id: 'wechat-intro',
        title: { en: 'Official Account Highlights', zh: '公众号精选内容' },
        desc: {
          en: 'Follow AIWASON Official for project milestones, solution deep-dives, and industry insights covering intelligent busbars.',
          zh: '关注 AIWASON 官方公众号，获取项目进展、方案详解与智能母线行业洞察。',
        },
        img: wechatBanner,
      },
      {
        id: 'wechat-qr',
        title: { en: 'Scan to Follow', zh: '扫码关注' },
        desc: {
          en: 'Scan the QR code to stay updated with AIWASON news on WeChat.',
          zh: '扫描二维码，即刻获取 AIWASON 微信端最新动态。',
        },
        img: wechatQrcode,
      },
    ],
  } satisfies Record<string, any>

  const localise = <T,>(value: Localised<T>) => value[lang]
  
  const videoEntries = videos.slice(0, 2).map((video, index) => ({
    id: video.id,
    title: video.title[lang],
    desc: video.description?.[lang] ?? '',
    date: video.date,
    poster: index === 0 ? homeHeroPoster : creditChinaPoster,
    sources: [{ src: video.videoUrl, type: 'video/mp4' }],
  }))

  const groupVideos: NewsGroup = {
    heading: localise(copy.headings.videoCenter),
    items: videoEntries.map((entry) => ({
      id: entry.id,
      title: entry.title,
      desc: entry.desc,
      date: entry.date,
      img: entry.poster,
      video: {
        title: entry.title,
        poster: entry.poster,
        sources: entry.sources,
      },
    })),
  }

  const featuredConfigs = [
    { key: 'ceec', image: coverCEEC },
    { key: 'nobel', image: coverNobelMeet },
    { key: 'cctv', image: coverCCTV1 },
  ] as const

  const groupFeatured: NewsGroup = {
    heading: localise(copy.headings.featured),
    items: featuredConfigs.map(({ key, image }) => {
      const data = (copy.featuredEntries as Record<string, { title: Localised<string>; desc: Localised<string>; date: string; href: string }>)[key]
      return {
        id: `feat-${key}`,
        title: localise(data.title),
        desc: localise(data.desc),
        date: data.date,
        img: image,
        href: `${data.href}?lang=${lang}`,
      }
    }),
  }

  const mediaCards = news.map((item) => ({
    id: item.id,
    title: localise(item.title),
    desc: item.description ? item.description[lang] : localise(copy.mediaTagline),
    subline: item.source,
    href: item.link,
    img: mediaImageMap[item.id as keyof typeof mediaImageMap] ?? '/res/links.png',
  }))

  const groupWeChat: NewsGroup = {
    heading: localise(copy.headings.wechat),
    items: copy.wechatCards.map((card) => ({
      id: card.id,
      title: localise(card.title),
      desc: localise(card.desc),
      img: card.img,
      imageFit: 'contain',
      href: 'https://mp.weixin.qq.com/...',
    })),
  }

  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900">{localise(copy.pageTitle)}</h1>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{localise(copy.pageIntro)}</p>
          </div>
          <LanguageSwitch defaultLang={lang} />
        </div>
      </section>

      <Separator />
      <NewsSectionsSlideIn lang={lang} groups={[groupVideos]} showMetaLabel={false} />

      <Separator />
      <NewsSectionsSlideIn lang={lang} groups={[groupFeatured]} showMetaLabel={false} />

      <Separator />
      <MediaCarousel title={localise(copy.headings.media)} items={mediaCards} lang={lang} />

      <Separator />
      <NewsSectionsSlideIn lang={lang} groups={[groupWeChat]} showMetaLabel={false} />
    </main>
  )
}
