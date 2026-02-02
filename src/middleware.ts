import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const { pathname } = request.nextUrl

  // Allow /portal (admin) routes through
  if (pathname.startsWith('/portal')) {
    return response
  }

  // Add cache headers for media files
  if (pathname.startsWith('/api/media/file/')) {
    // Cache images for 1 year (they're content-addressed by filename)
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Add cache headers for GraphQL queries (shorter cache)
  if (pathname === '/api/graphql' && request.method === 'POST') {
    // Cache GraphQL responses for 1 hour
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    )
  }

  // Redirect everything else to frontend domain
  const frontendUrl = process.env.FRONTEND_URL
  if (frontendUrl) {
    return NextResponse.redirect(new URL('', frontendUrl))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
