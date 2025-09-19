// src/app/events/datacenter-summit/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitch from '@/components/common/LanguageSwitch'

export const metadata = {
  title: '会议中心 | Conference Center',
  description: 'AIWASON 会议与展会活动：国际数据中心大会等。',
}

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const lang = (searchParams?.lang as 'zh' | 'en') || 'zh'

  const detailCopy: Record<'zh' | 'en', string[]> = {
    en: [
      'We showcase real deployments that combine fire-resistant busbars, intelligent monitoring, and lifecycle services to meet the uptime targets of hyperscale campuses and colocation sites.',
      'Visit our booth for live demos, compliance consultations, and a hands-on look at the digital tools that shorten design-to-go-live timelines.',
    ],
    zh: [
      '我们分享耐火母线、智能监测与全生命周期服务如何协同，帮助超大规模与托管数据中心达成高等级运行指标。',
      '欢迎莅临展位体验现场演示、资质合规咨询，以及加速设计到投运进程的数字化工具。',
    ],
  }

  const heroImage = '/res/conference.jpg'

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="border-b border-[#cde9aa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.35em] text-[#76B900]/80 uppercase">
                {lang === 'en' ? 'Conference' : '会议中心'}
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-black text-gray-900">
                {lang === 'en' ? 'Global Data Center Summit' : '国际数据中心大会'}
              </h1>
              <p className="mt-4 max-w-3xl text-gray-600 text-base md:text-lg">
                {lang === 'en'
                  ? 'Showcasing AIWASON’s latest fire-resistant optoelectronic busbar technologies for data centers.'
                  : '展示 AIWASON 最新耐火智能光电母线技术，面向数据中心应用场景。'}
              </p>
            </div>
            <LanguageSwitch defaultLang={lang} />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              {detailCopy[lang].map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <figure className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={heroImage}
                alt={lang === 'en' ? 'Summit showcase' : '大会现场'}
                width={960}
                height={640}
                className="w-full h-auto object-cover"
                priority
              />
              <figcaption className="px-4 py-3 text-sm text-gray-500">
                {lang === 'en'
                  ? 'Live demonstrations of AIWASON fire-resistant intelligent busbar systems.'
                  : '现场演示 AIWASON 耐火智能母线系统。'}
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <Link
              href={`/solutions?lang=${lang}#cloud-platform`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#76B900] px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-110 transition"
            >
              {lang === 'en' ? 'View Cloud Platform Features' : '查看云平台功能'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
