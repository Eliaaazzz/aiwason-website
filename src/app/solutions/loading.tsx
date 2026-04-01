export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        <div className="h-10 w-56 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
