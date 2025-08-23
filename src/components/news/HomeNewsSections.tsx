// src/components/news/HomeNewsSections.tsx
// Server component
import NewsSection from './NewsSection'
import type { Locale } from '../../lib/types/news'

export default async function HomeNewsSections({ locale }: { locale: Locale }) {
  return (
    <>
      <NewsSection category="conference"  locale={locale} /> 
      <NewsSection category="datacenter"  locale={locale} />
      <NewsSection category="commercial"  locale={locale} />
      <NewsSection category="residential" locale={locale} />
      
    </>
  )
}
