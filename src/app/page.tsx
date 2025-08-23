
import HomeShell from '../components/home.HomeShell'
// Ensure the file exists at the specified path, or update the path if necessary
// import NewsHeroMosaic from '../components/news/NewsHeroMosaic'
// Ensure the file exists at the specified path, or update the path if necessary
import HomeNewsSections from '../components/news/HomeNewsSections'
import { getLocale } from '../lib/i18n'




export default async function Page({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const locale = getLocale(searchParams)

  return (
    <HomeShell>
      {/* NEWS: only the three categories */}
+       <HomeNewsSections locale={locale} />
    </HomeShell>
  )
}



