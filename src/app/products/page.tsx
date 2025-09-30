import ProductsCenter from '@/components/products/ProductsCenter'

type SearchParams = Record<string, string | string[] | undefined>
type Lang = 'en' | 'zh'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const lang: Lang = sp?.lang === 'zh' ? 'zh' : 'en' 
  return <ProductsCenter lang={lang} />
}
