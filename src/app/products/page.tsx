// src/app/products/page.tsx
import ProductsCenter from '@/components/products/ProductsCenter'

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  // Default to English unless lang=zh is explicitly set
  const lang = (searchParams?.lang as 'en' | 'zh') === 'zh' ? 'zh' : 'en'
  return <ProductsCenter lang={lang} />
}
