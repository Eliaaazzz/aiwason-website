import { NextResponse, type NextRequest } from 'next/server'

const SUPPORTED = ['en', 'zh'] as const
type Supported = (typeof SUPPORTED)[number]
const DEFAULT_LOCALE: Supported = 'zh'

function negotiateLocale(req: NextRequest): Supported {
  const cookie = req.cookies.get('NEXT_LOCALE')?.value
  if (cookie === 'en' || cookie === 'zh') return cookie
  const header = req.headers.get('accept-language')?.toLowerCase() ?? ''
  const tokens = header.split(',').map((t) => t.split(';')[0].trim())
  for (const t of tokens) {
    if (t.startsWith('zh')) return 'zh'
    if (t.startsWith('en')) return 'en'
  }
  return DEFAULT_LOCALE
}

function pathHasLocale(pathname: string): Supported | null {
  const match = pathname.match(/^\/(en|zh)(\/|$)/)
  return match ? (match[1] as Supported) : null
}

const SKIP_PREFIXES = [
  '/_next/',
  '/api/',
  '/res/',
  '/projects/',
  '/images/',
] as const

const SKIP_EXACT = new Set([
  '/icon',
  '/apple-icon',
  '/favicon.ico',
  '/sitemap.xml',
  '/robots.txt',
  '/manifest.webmanifest',
])

function shouldSkip(pathname: string): boolean {
  if (SKIP_EXACT.has(pathname)) return true
  if (pathname.startsWith('/opengraph-image')) return true
  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return true
  // Files: anything with a `.` after the last `/`
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1)
  if (lastSegment.includes('.')) return true
  return false
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  if (shouldSkip(pathname)) return NextResponse.next()

  const existing = pathHasLocale(pathname)

  if (existing) {
    const res = NextResponse.next()
    res.headers.set('x-locale', existing)
    res.headers.set('x-pathname', pathname)
    if (req.cookies.get('NEXT_LOCALE')?.value !== existing) {
      res.cookies.set('NEXT_LOCALE', existing, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      })
    }
    return res
  }

  const target = negotiateLocale(req)
  const url = req.nextUrl.clone()
  url.pathname = `/${target}${pathname === '/' ? '' : pathname}`
  url.search = search
  const res = NextResponse.redirect(url, 307)
  res.cookies.set('NEXT_LOCALE', target, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
