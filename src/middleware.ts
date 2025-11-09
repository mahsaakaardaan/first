import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = Boolean(request.cookies.get('access_token'));

  const protectedPaths = ['/profile', '/shipment', '/add-comment'];
  const currentPath = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  // ✅ تعیین آدرس اصلی سایت از .env یا URL فعلی
  const baseUrl =
    'http://46.34.163.193:3335' || request.nextUrl.origin;

  // 🔒 اگر کاربر لاگین نکرده و داره مسیر محافظت‌شده رو باز می‌کنه
  if (!isLoggedIn && isProtected) {
    const loginURL = new URL('/login', baseUrl);

    // برمی‌گردونیمش به صفحه قبلی بعد از لاگین
    loginURL.searchParams.set(
      'callbackUrl',
      currentPath.includes('/add-comment')
        ? request.headers.get('referer') || '/'
        : request.url
    );

    return NextResponse.redirect(loginURL);
  }

  // 🧭 اگر کاربر لاگین کرده ولی روی صفحه لاگینه → بفرستش به callbackUrl یا صفحه اصلی
  if (isLoggedIn && currentPath === '/login') {
    const callbackUrl =
      request.nextUrl.searchParams.get('callbackUrl');

    const redirectUrl = callbackUrl
      ? new URL(callbackUrl, baseUrl)
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
