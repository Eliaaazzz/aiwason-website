// src/app/news/nobel-workstation/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'
import img1 from '@/assets/News/会面诺奖教授.png'
import img2 from '@/assets/News/诺贝尔创新工作站.png'

export const metadata = {
  title: 'Nobel Innovation Workstation | AIWASON',
  description: 'Meeting Prof. Hartmut Michel and building a Nobel innovation workstation.',
}

type SearchParams = { [k: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang === 'en' ? 'en' : 'zh') as 'en' | 'zh'
  const paragraphs = {
    en: [
      'At the 24th Scientists Forum, AIWASON met Nobel Laureate Prof. Hartmut Michel to jointly establish the “Nobel Expert Innovation Workstation.” The partnership focuses on integrating Nobel-level research resources with AIWASON’s engineering capabilities to accelerate innovation in fire-resistant intelligent optoelectronic busbars.',
      'The workstation will explore materials science, thermal management, and intelligent sensing to deliver safer, greener, and more efficient power distribution solutions for mission-critical infrastructure.',
    ],
    zh: [
      '在第二十四届科学家论坛上，AIWASON 与诺贝尔化学奖得主哈特穆特·米歇尔教授正式会面，宣布共建“诺奖·专家创新工作站”，将诺奖级科研资源与企业工程能力深度融合，推动耐火智能光电母线持续创新。',
      '创新工作站将围绕材料科学、热管理与智能感知等方向展开研究，为关键基础设施提供更安全、绿色与高效的配电解决方案。',
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
                {lang === 'en' ? 'Meeting Prof. Michel; establishing Nobel Innovation Workstation' : '与诺奖教授米歇尔会面建立诺贝尔创新工作站'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Collaborating with Nobel laureate Prof. Hartmut Michel to build an innovation workstation.'
                  : '与诺贝尔奖获得者哈特穆特·米歇尔教授合作，建立“诺奖·专家创新工作站”。'}
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
              <Image src={img1} alt="Meeting" className="w-full h-auto object-cover" />
            </figure>
            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image src={img2} alt="Workstation" className="w-full h-auto object-cover" />
            </figure>
          </div>
        </div>
      </section>
    </main>
  )
}
