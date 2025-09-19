'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'

type Lang = 'en' | 'zh'

const COPY = {
  en: {
    title: 'About Us',
    strap: 'Hard-tech power distribution for critical infrastructure worldwide.',
    paragraphs: [
      'Zhongshan AIWASON Electric Co., Ltd. stands on the west bank of Qianhai in the Guangdong–Hong Kong–Macao Greater Bay Area, at the gateway of the Shenzhen–Zhongshan Corridor. Guided by the belief that technology lights the future and diligence fulfils ambition, AIWASON has grown over fifteen years into a high-tech enterprise spanning high-temperature materials, optoelectronic intelligent busbars, and microgrid systems. Our solutions serve more than 1,200 customers across China and Europe and hold a leading position in the industry.',
      'We embrace openness, exploration, and resilience. AIWASON continues to expand R&D investment, attracting top-tier talent and establishing three research centres in China. With more than 200 patents and industry-leading invention counts, we pursue breakthroughs in foundational materials, optoelectronics, and intelligent microgrids, uniting hardware and software to release continuously evolving products.',
      '“Focus on customer pain points, deliver the best solutions, and serve wholeheartedly” is our enduring mission. Regardless of market shifts, we stay committed to deep technology—removing distractions and tackling challenges head-on—to provide the safest, greenest, and smartest system solutions. We strive to make safety rock solid, energy efficiency omnipresent, and intelligence within everyone’s reach.',
    ],
    stats: [
      { k: '15+', v: 'Years of deep-tech focus' },
      { k: '3', v: 'R&D centres nationwide' },
      { k: '200+', v: 'Patent achievements' },
      { k: '1,200+', v: 'Customers served' },
    ],
  },
  zh: {
    title: '关于我们',
    strap: '以硬核科技赋能关键基础设施。',
    paragraphs: [
      '中山艾默森电器有限公司坐落在美丽富饶的粤港澳大湾区核心商圈前海西岸，深中通道首站。“科技点亮光明，实干成就梦想”。艾默森秉承硬科技造福社会、赢得未来的经营理念。经过十五年的发展，已成为一家集耐高温新材料、光电智能母线、微电网系统为一体的高科技企业，产品服务遍及中国及欧洲多个国家地区，用户多达1200多个，在行业具有领先地位。',
      '艾默森长期坚持开放进取、勇于探索、自强不息、艰苦奋斗的精神，持续加强研发投入，布局顶尖优秀研发资源，在国内构建三大研发中心，专利成果二百多项，发明专利行业第一，在（基础科学）新材料、光电技术、智能微电网系统三大板块自主研发，精准突破，软硬互联，不断创新升级新产品。',
      '“聚焦客户痛点，为客户提供最优解决方案，全心全意为客户服务”是我们肩负的责任与使命。不管时代如何变迁，市场竞争如何激烈，艾默森始终专注于硬科技发展，排除一切诱惑及困难，为用户提供最安全、绿色智能的系统解决方案，让安全稳如磐石、让节能无处不在、让智能无所不及。',
    ],
    stats: [
      { k: '15+', v: '年深耕硬科技' },
      { k: '3', v: '大研发中心' },
      { k: '200+', v: '项专利' },
      { k: '1200+', v: '位合作客户' },
    ],
  },
} as const

export default function AboutSection() {
  const router = useRouter()
  const sp = useSearchParams()
  const pathname = usePathname()

  const lang: Lang = (sp.get('lang') as Lang) || 'en'
  const t = COPY[lang]

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'zh' : 'en'
    const params = new URLSearchParams(sp.toString())
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const items = useMemo(() => t.paragraphs, [t])

  return (
    <div className="bg-white text-black">
      {/* Header with language toggle (matches News section spacing/accents) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t.title}</h1>
          <p className="mt-2 text-gray-700">{t.strap}</p>
        </div>

        <button
          onClick={toggleLang}
          className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#76B900]/50 rounded-lg px-4 py-2 transition-all duration-300"
          aria-label="Toggle language"
          title={lang === 'en' ? '切换到中文' : 'Switch to English'}
        >
          <Globe className="w-4 h-4 text-[#76B900]" />
          <span className="text-sm font-semibold text-gray-700">
            {lang === 'en' ? '中文' : 'EN'}
          </span>
        </button>
      </section>

      <div className="h-1 w-full bg-[#cde9aa]" aria-hidden="true" />

      {/* Content (white bg, green divider like News section) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 border-t border-[#76B900]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          {/* Left – rich text */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="text-[17px] leading-8 text-gray-900"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Right – quick stats card (optional but elegant, matches your theme) */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-[#76B900]/25 bg-white shadow-sm p-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {t.stats.map((s) => (
                  <div
                    key={s.k + s.v}
                    className="rounded-xl border border-[#76B900]/20 bg-white p-4 text-center"
                  >
                    <div className="text-3xl font-extrabold text-gray-900">{s.k}</div>
                    <div className="text-sm font-medium text-gray-600 mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
