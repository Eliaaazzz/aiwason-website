import { Suspense } from 'react'
import SolutionsSection from '@/components/solutions/SolutionsSection'

export const metadata = { title: 'Solutions | AIWASON' }

export default function SolutionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SolutionsSection />
    </Suspense>
  )
}
