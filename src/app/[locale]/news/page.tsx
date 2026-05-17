// src/app/news/page.tsx
import type { Metadata } from 'next'
import { getNewsData } from '@/lib/news/news-data'
import LanguageSwitch from '@/components/common/LanguageSwitch'
import NewsSectionsSlideIn, { type NewsGroup } from '@/components/news/NewsSectionsSlideIn'
// ❌ 移除 MediaCarousel
// import MediaCarousel from '@/components/news/MediaCarousel'
import MediaReportRail from '@/components/news/MediaReportRail'

import coverCEEC from '@/assets/News/中欧企业对接会.png'
import coverNobelMeet from '@/assets/News/诺奖教授个人.png'
import coverCCTV1 from '@/assets/News/央视采访1.png'
import wechatBanner from '@/assets/News/Wechat.png'
import wechatQrcode from '@/assets/News/Wechat-QRcode.png'
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'News & Media | AIWASON',
  description: 'Latest videos, featured stories, media coverage, and WeChat.',
  openGraph: {
    type: 'website',
    title: 'News & Media | AIWASON',
    description: 'Latest videos, featured stories, media coverage, and WeChat.',
    images: [{ url: '/res/aiwason_fireproof_busbar_hero.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Media | AIWASON',
    description: 'Latest videos, featured stories, media coverage, and WeChat.',
    images: ['/res/aiwason_fireproof_busbar_hero.png'],
  },
  alternates: {
    canonical: '/news',
    languages: { en: '/news?lang=en', zh: '/news?lang=zh' },
  },
}

// ✅ 按 Next.js 新规范：searchParams 是 Promise
type PageProps = { params: Promise<{ locale: string }> }

type Localised<T> = { en: T; zh: T }

const Separator = () => (
  <div className="h-2 w-full bg-gradient-to-r from-white via-[#aee28b] to-white" aria-hidden="true" />
)

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params
  const lang = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  const { videos, news } = await getNewsData()

  const copy = {
    pageTitle: {
      en: 'News & Media Center',
      zh: '新闻与媒体中心',
    },
    pageIntro: {
      en: 'Stay current with AIWASON highlights: in-depth videos, strategic collaborations, and media coverage that reveal fresh trends across the power industry.',
      zh: '聚焦 AIWASON 最新动态：纵览视频专栏、战略协同与主流媒体报道，洞察电力行业新趋势。',
    },
    headings: {
      videoCenter: { en: 'Video Center', zh: '视频专区' },
      media: { en: 'Media Report', zh: '媒体报道' }, // 标题文案统一
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
  } as const

  const localise = <T,>(value: Localised<T>) => value[lang]

  // 视频组
  const videoEntries = videos.slice(0, 2).map((video) => ({
    id: video.id,
    title: video.title[lang],
    desc: video.description?.[lang] ?? '',
    date: video.date,
    poster: video.thumbnail,
    embedUrl: video.embedUrl,
    sources:
      video.embedUrl || !video.videoUrl
        ? undefined
        : [{ src: video.videoUrl!, type: 'video/mp4' }],
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
        embedUrl: entry.embedUrl,
      },
    })),
  }

  // 重点新闻组
  const featuredConfigs = [
    { key: 'ceec', image: coverCEEC },
    { key: 'nobel', image: coverNobelMeet },
    { key: 'cctv', image: coverCCTV1 },
  ] as const

  const groupFeatured: NewsGroup = {
    heading: localise(copy.headings.featured),
    items: featuredConfigs.map(({ key, image }) => {
      const data = (copy.featuredEntries as Record<
        string,
        { title: Localised<string>; desc: Localised<string>; date: string; href: string }
      >)[key]
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

  // 媒体报道小卡（给 MediaReportRail 用）
  const mediaCards = news.map((item) => ({
    id: item.id,
    title: localise(item.title),
    desc: item.description ? item.description[lang] : localise(copy.mediaTagline),
    subline: item.source,
    href: item.link,
    img: item.image || coverCCTV1,
    date: item.date,
    source: item.source,
  }))

  // 微信组
  const groupWeChat: NewsGroup = {
    heading: localise(copy.headings.wechat),
    items: [
      {
        id: 'wechat-intro',
        title: localise({ en: 'Official Account Highlights', zh: '公众号精选内容' }),
       desc: localise({
          en: 'Follow AIWASON Official for project milestones, solution deep-dives, and power industry insights.',
          zh: '关注 AIWASON 官方公众号，获取项目进展、方案详解与电力行业洞察。',
        }),
        img: wechatBanner,
        imageFit: 'contain',
      },
      {
        id: 'wechat-qr',
        title: localise({ en: 'Scan to Follow', zh: '扫码关注' }),
        desc: localise({
          en: 'Scan the QR code to stay updated with AIWASON news on WeChat.',
          zh: '扫描二维码，即刻获取 AIWASON 微信端最新动态。',
        }),
        img: wechatQrcode,
        imageFit: 'contain',
      },
    ],
  }

  return (
    <main className="bg-white text-gray-900">
      {/* 顶部标题区 */}
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
      {/* ✅ 用专用的 MediaReportRail：粗体标题 + 右上 NavButton + 小图完整展示 */}
      <section>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <MediaReportRail
            title={localise(copy.headings.media)}
            items={mediaCards.map((m) => ({
              id: m.id,
              title: m.title,
              href: m.href,
              img: m.img,
              date: m.date,
              source: m.source,
            }))}
            lang={lang}
          />
        </div>
      </section>

      <Separator />
      <NewsSectionsSlideIn lang={lang} groups={[groupWeChat]} showMetaLabel={false} />
    </main>
  )
}
