'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Globe } from 'lucide-react'
import { otherLocale, withLocaleSwitched, type Locale } from '@/lib/i18n'

interface Props {
  locale: Locale
  className?: string
}

export default function LanguageSwitcher({ locale, className }: Props) {
  const pathname = usePathname() || `/${locale}`
  const searchParams = useSearchParams()
  const target = otherLocale(locale)
  const targetPath = withLocaleSwitched(pathname, target)
  const query = searchParams?.toString()
  const href = query ? `${targetPath}?${query}` : targetPath
  const label = target === 'en' ? 'EN' : '中文'
  const aria = target === 'en' ? 'Switch to English' : '切换到中文'

  return (
    <Link
      href={href}
      hrefLang={target === 'zh' ? 'zh-CN' : 'en'}
      prefetch={false}
      scroll={false}
      aria-label={aria}
      title={aria}
      className={
        className ??
        'inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#76B900]/50 rounded-lg px-4 py-2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76B900]'
      }
    >
      <Globe className="w-4 h-4 text-[#76B900]" aria-hidden="true" />
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </Link>
  )
}
