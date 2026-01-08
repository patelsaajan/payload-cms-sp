import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add cache headers for media files
  if (request.nextUrl.pathname.startsWith('/api/media/file/')) {
    // Cache images for 1 year (they're content-addressed by filename)
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Add cache headers for GraphQL queries (shorter cache)
  if (request.nextUrl.pathname === '/api/graphql' && request.method === 'POST') {
    // Cache GraphQL responses for 1 hour
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400')
  }

  return response
}

export const config = {
  matcher: [
    '/api/media/file/:path*',
    '/api/graphql',
  ],
}
