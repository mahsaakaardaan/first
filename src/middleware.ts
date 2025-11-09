import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = Boolean(request.cookies.get('access_token'));
  const protectedPaths = ['/profile', '/shipment', '/add-comment'];
  const currentPath = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  // 👇 دامنه‌ی سایتت (جایگزین کن با دامنه یا IP واقعی VPS)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  if (!isLoggedIn && isProtected) {
    const loginURL = new URL('/login', baseUrl);
    loginURL.searchParams.set(
      'callbackUrl',
      currentPath.includes('/add-comment')
        ? request.headers.get('referer') || '/'
        : request.nextUrl.pathname
    );
    return NextResponse.redirect(loginURL);
  }

  if (isLoggedIn && currentPath === '/login') {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
    const redirectUrl = new URL(callbackUrl || '/', baseUrl);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/shipment/:path*', '/add-comment/:path*', '/login'],
};
