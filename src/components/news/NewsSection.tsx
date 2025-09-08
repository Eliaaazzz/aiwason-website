// // src/components/news/NewsSection.tsx
// import NewsGrid from './NewsGrid'
// import { newsProvider } from '../../lib/news'
// import { CATEGORY_LABELS, type CategoryKey } from '../../lib/news/categories'
// import type { Locale } from '../../lib/types/news'

// export default async function NewsSection({
//   category, locale,
// }: { category: CategoryKey; locale: Locale }) {
//   const { items } = await newsProvider.list({ page: 1, pageSize: 3, tag: category, locale })
//   if (!items?.length) return null

//   return (
//     <section className="py-10 border-t border-[#76B900]/20">
//       <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
//         {CATEGORY_LABELS[category][locale]}
//       </h2>
//       <NewsGrid items={items} locale={locale} />
//     </section>
//   )
// }

