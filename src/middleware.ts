import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to the maintenance page, static assets, and images
  if (
    pathname === '/maintenance' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Bypass maintenance mode with a secret query param: ?squad=access
  const hasAccess = request.cookies.has('twww_access');
  const isSecretParam = request.nextUrl.searchParams.get('squad') === 'access';

  if (hasAccess || isSecretParam) {
    const response = NextResponse.next();
    if (isSecretParam && !hasAccess) {
      response.cookies.set('twww_access', 'true', {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }
    return response;
  }

  // Redirect all other requests to the maintenance page
  const url = request.nextUrl.clone();
  url.pathname = '/maintenance';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
