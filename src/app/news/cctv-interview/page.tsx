// src/app/news/cctv-interview/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'
import img1 from '@/assets/News/央视采访1.png'
import img2 from '@/assets/News/央视采访2.png'

export const metadata = {
  title: 'CCTV Interview | AIWASON',
  description: 'CCTV interview covering fire-resistant intelligent optoelectronic busbar technology.',
}

type SearchParams = { [k: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'
  const paragraphs = {
    en: [
      'CCTV’s financial programme invited AIWASON to share the story behind fire-resistant intelligent optoelectronic busbars. During the interview, AIWASON detailed how integrated sensing, AI-enabled monitoring, and modular design help safeguard critical urban infrastructure.',
      'The dialogue covered successful deployments in data centers, transportation hubs, and high-rise landmarks, highlighting AIWASON’s roadmap for international collaboration and product innovation.',
    ],
    zh: [
      '央视财经栏目邀请 AIWASON 分享耐火智能光电母线的行业故事。采访中，AIWASON 重点介绍了如何通过感知一体化、AI 监测与模块化设计，守护城市关键基础设施的安全运行。',
      '节目同时呈现了在数据中心、交通枢纽与地标建筑的成功案例，并展望 AIWASON 的国际化合作布局与产品创新方向。',
    ],
  }
  return (
    <main className="bg-white text-gray-900">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.3em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Featured' : '重点新闻'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Interviewed by CCTV' : '接受央视采访'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Discussing fire‑resistant intelligent optoelectronic busbars and applications.'
                  : '围绕耐火智能光电母线及其应用接受央视采访。'}
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <LanguageSwitch defaultLang={lang} />
              <Link href={`/news?lang=${lang}`} className="text-[#2b7a00] font-semibold hover:underline">
                {lang === 'en' ? 'Back to News' : '返回新闻'}
              </Link>
            </div>
          </div>

          <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
            {paragraphs[lang].map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image src={img1} alt="CCTV studio" className="w-full h-auto object-cover" />
            </figure>
            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image src={img2} alt="Interview detail" className="w-full h-auto object-cover" />
            </figure>
          </div>
        </div>
      </section>
    </main>
  )
}
