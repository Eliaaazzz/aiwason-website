'use client'

import { Globe } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type Lang = 'en' | 'zh'

type Props = {
  className?: string
  defaultLang?: Lang
  labels?: { en: string; zh: string }
  tone?: 'light' | 'dark'
}

export default function LanguageSwitch({ className = '', defaultLang = 'zh', labels, tone = 'light' }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const lang = useMemo(() => {
    const param = searchParams.get('lang')
    return (param === 'en' || param === 'zh' ? param : defaultLang) as Lang
  }, [searchParams, defaultLang])

  const toggle = () => {
    const next: Lang = lang === 'en' ? 'zh' : 'en'
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const text = labels ?? { en: 'EN', zh: '中文' }
  const buttonLabel = lang === 'en' ? text.zh : text.en
  const isDark = tone === 'dark'

  return (
    <button
      onClick={toggle}
      className={[
        'inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300 border',
        isDark
          ? 'bg-white/90 hover:bg-white text-gray-900 border-white/40 hover:border-white'
          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-[#76B900]/50',
        className,
      ].join(' ')}
      aria-label={lang === 'en' ? '切换到中文' : 'Switch to English'}
      type="button"
    >
      <Globe className={`w-4 h-4 ${isDark ? 'text-[#1b6400]' : 'text-[#76B900]'}`} />
      <span className="text-sm font-semibold">{buttonLabel}</span>
    </button>
  )
}
