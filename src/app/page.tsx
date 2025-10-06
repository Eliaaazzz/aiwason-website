// src/app/page.tsx  (Server Component)
import HomeShell from '../components/home/HomeShell'

type SearchParams = { lang?: string }
type Lang = 'en' | 'zh'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const lang: Lang = sp?.lang === 'en' ? 'en' : 'zh'
  return <HomeShell defaultLanguage={lang} />
}
