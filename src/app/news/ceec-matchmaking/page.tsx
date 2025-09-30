// src/app/news/ceec-matchmaking/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'
import img1 from '@/assets/News/中欧16+1.png'
import img2 from '@/assets/News/中欧企业对接会.png'

export const metadata = {
  title: 'China–CEEC SMEs Matchmaking | AIWASON',
  description: 'Invited to China–CEEC SMEs matchmaking and cooperation achievements exhibition.',
}

type SearchParams = { [k: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'
  const paragraphs = {
    en: [
      'AIWASON was the sole representative from China’s intelligent busbar industry to attend the China–CEEC SMEs Matchmaking and Cooperation Achievements Exhibition in Budapest. During the event, AIWASON showcased high-reliability fire-resistant busbar systems and received significant interest from government agencies and enterprise delegations across Central and Eastern Europe.',
      'Through one-to-one business matching sessions, the team explored deployment scenarios for data centers, commercial complexes, and smart transportation hubs, laying the groundwork for joint projects and distributor partnerships in multiple countries.',
    ],
    zh: [
      'AIWASON 作为中国智能母线行业唯一受邀企业，走进布达佩斯的中国—中东欧中小企业合作对接暨成果展，集中展示耐火智能母线的高可靠解决方案，受到中东欧多国政府机构及企业代表的高度关注。',
      '在多场一对一商务洽谈中，团队围绕数据中心、商业综合体、智慧交通等场景深入交流，为多国项目合作与渠道伙伴建立奠定了合作基础。',
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
                {lang === 'en' ? 'Invited to China–CEEC SMEs Matchmaking' : '受邀参加中国—中东欧企业对接会'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Participated in the China–CEEC Cooperation Achievements Exhibition and SME matchmaking event in Budapest.'
                  : '参加在布达佩斯举办的中国—中东欧合作成果展与中小企业对接会。'}
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
              <Image src={img1} alt="CEEC event" className="w-full h-auto object-cover" />
            </figure>
            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image src={img2} alt="Matchmaking" className="w-full h-auto object-cover" />
            </figure>
          </div>
        </div>
      </section>
    </main>
  )
}
