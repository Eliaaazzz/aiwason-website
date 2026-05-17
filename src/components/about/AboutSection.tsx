'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import LanguageSwitcher from '../common/LanguageSwitcher'
import type { Locale } from '@/lib/i18n'

type Lang = 'en' | 'zh'

const COPY = {
  en: {
    title: 'About Us',
    strap: 'Deep tech for a safer, greener, more intelligent world.',
    paragraphs: [
      `Zhongshan AIWASON Electric Co., Ltd. is located on the west bank of Qianhai—the core business district of the Guangdong–Hong Kong–Macao Greater Bay Area—at the first station of the Shenzhen–Zhongshan Corridor. “Technology lights up the future, and hard work makes dreams come true.” AIWASON adheres to the philosophy of using deep technology to benefit society and win the future. After fifteen years of development, we have grown into a high-tech company that integrates high-temperature-resistant new materials, optoelectronic intelligent busbars, and microgrid systems. Our products and services cover China and many European countries and regions, serving 1,200+ customers and holding a leading position in the industry.`,
      `AIWASON upholds an open and progressive spirit—bold exploration, self-improvement, and perseverance—continually increasing R&D investment and building top-tier capabilities. We operate three R&D centers in China and hold more than 200 patents, ranking first in the industry for invention patents. Focusing on three domains—(fundamental) new materials, optoelectronic technologies, and intelligent microgrid systems—we pursue independent research and targeted breakthroughs, integrating software and hardware to continuously launch upgraded products.`,
      `“Focus on customer pain points, provide the best solutions, and serve wholeheartedly” is our responsibility and mission. No matter how times change or competition intensifies, AIWASON remains committed to deep tech—cutting through distractions and difficulties—to provide the safest, greenest, and smartest system solutions. We strive to make safety rock-solid, energy efficiency everywhere, and intelligence ubiquitous.`,
    ],
    stats: [
      { k: '15+', v: 'Years' },
      { k: '3', v: 'R&D Centers' },
      { k: '200+', v: 'Patents' },
      { k: '1,200+', v: 'Customers' },
    ],
  },
  zh: {
    title: '关于我们',
    strap: '以硬科技，构建更安全、更绿色、更智能的世界。',
    paragraphs: [
      `中山艾默森电器有限公司坐落在美丽富饶的粤港澳大湾区核心商圈前海西岸，深中通道首站。“科技点亮光明，实干成就梦想”。艾默森秉承硬科技造福社会、赢得未来的经营理念。经过十五年的发展，已成为一家集耐高温新材料、光电智能母线、微电网系统为一体的高科技企业，产品服务遍及中国及欧洲多个国家地区，用户多达1200多个，在行业具有领先地位。`,
      `艾默森长期坚持开放进取、勇于探索、自强不息、艰苦奋斗的精神，持续加强研发投入，布局顶尖研发资源，在国内构建三大研发中心，专利成果二百多项，发明专利行业第一。围绕新材料、光电技术、智能微电网系统三大板块自主研发、精准突破，软硬互联，持续创新升级产品。`,
      `“聚焦客户痛点，为客户提供最优解决方案，全心全意为客户服务”是我们的责任与使命。不管时代如何变迁、竞争如何激烈，艾默森始终专注于硬科技发展，排除一切诱惑及困难，为用户提供最安全、绿色智能的系统解决方案——让安全稳如磐石、让节能无处不在、让智能无所不及。`,
    ],
    stats: [
      { k: '15+', v: '年' },
      { k: '3', v: '研发中心' },
      { k: '200+', v: '项专利' },
      { k: '1200+', v: '位客户' },
    ],
  },
} as const

export default function AboutSection({ lang = 'zh' as Lang }: { lang?: Locale }) {
  const t = COPY[lang as Lang]
  const items = useMemo(() => t.paragraphs, [t])

  return (
    <div className="bg-white text-black">
      {/* Header with language toggle (matches News section spacing/accents) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t.title}</h1>
          <p className="mt-2 text-gray-700">{t.strap}</p>
        </div>

        <LanguageSwitcher locale={lang} />
      </section>

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



























