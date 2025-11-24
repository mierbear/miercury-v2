// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

  const subdomain = host.split('.')[0];

  if (subdomain === 'santa') {
    url.pathname = `/santa${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (subdomain === 'pp') {
    url.pathname = `/pp${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith('/santa')) {
    return NextResponse.redirect('http://santa.localhost:3000');
  }

  if (url.pathname.startsWith('/pp')) {
    return NextResponse.redirect('http://pp.localhost:3000');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
