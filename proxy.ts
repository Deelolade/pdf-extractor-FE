import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value

  console.log('Token in middleware:', token)

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*','/folders/:path*','/uploads/:path*', '/documents/:path*', '/chats/:path*', '/payment/:path*', '/payment/processing/:path*'],
}
