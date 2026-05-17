'use client'

import { Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type Lang = 'en' | 'zh'

type Props = {
  className?: string
  defaultLang?: Lang
  labels?: { en: string; zh: string }
  tone?: 'light' | 'dark'
}

export default function LanguageSwitch({ className = '', defaultLang = 'en', labels, tone = 'light' }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [lang, setLang] = useState<Lang>(defaultLang)

  const syncFromUrl = useCallback(() => {
    if (typeof window === 'undefined') return
    const param = new URLSearchParams(window.location.search).get('lang')
    if (param === 'en' || param === 'zh') {
      setLang(param)
    } else {
      setLang(defaultLang)
    }
  }, [defaultLang])

  useEffect(() => {
    syncFromUrl()
    if (typeof window === 'undefined') return
    window.addEventListener('popstate', syncFromUrl)
    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [syncFromUrl])

  const toggle = () => {
    const next: Lang = lang === 'en' ? 'zh' : 'en'
    const params = new URLSearchParams(window.location.search)
    params.set('lang', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    setLang(next)
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
