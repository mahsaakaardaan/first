import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  //TODO: api
  const isLoggedIn = Boolean(request.cookies.get('access_token'));

  const protectedPaths = ['/profile', '/shipment', '/add-comment'];
  const currentPath = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  if (!isLoggedIn && isProtected) {
    const loginURL = new URL('/login', request.url);
    loginURL.searchParams.set(
      'callbackUrl',
      currentPath.includes('/add-comment')
        ? request.headers.get('referer') || '/'
        : request.url
    );
    return NextResponse.redirect(loginURL);
  }

  if (isLoggedIn && currentPath === '/login') {
    const callbackUrl =
      request.nextUrl.searchParams.get('callbackUrl');

      const baseUrl = 'http://46.34.163.193:3335' || request.nextUrl.origin;

      
    const redirectUrl = callbackUrl
      ? new URL(callbackUrl,baseUrl)
      : new URL('/', baseUrl);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/shipment/:path*',
    '/add-comment/:path*',
    '/login'
  ]
};
