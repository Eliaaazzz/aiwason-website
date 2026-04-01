import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang')
  const locale = lang === 'zh' ? 'zh' : 'en'

  const response = NextResponse.next()
  response.headers.set('x-locale', locale)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|res/).*)'],
}
