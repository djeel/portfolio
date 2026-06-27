import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'fr']
const defaultLocale = 'en'

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const preferred = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, q] = lang.trim().split(';q=')
      return { code: code.split('-')[0], q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { code } of preferred) {
    if (locales.includes(code)) return code
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.svg' ||
    pathname === '/favicon.png'
  ) {
    return NextResponse.next()
  }

  // Check if the URL already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // Extract locale from URL and set cookie
    const locale = pathname.split('/')[1]
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  // Detect locale from browser
  const locale = getLocaleFromHeaders(request)

  // Redirect to locale-prefixed URL
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  const response = NextResponse.redirect(url)
  response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  return response
}

export const config = {
  matcher: ['/((?!_next|api|favicon|.*\\.).*)'],
}
