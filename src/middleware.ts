import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup']
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    // Verify user session
    const res = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
      headers: {
        Cookie: `token=${token}`
      }
    })

    if (!res.ok) {
      throw new Error('Invalid session')
    }

    const data = await res.json()
    const { user } = data

    // Route protection based on user type
    if (request.nextUrl.pathname.startsWith('/dashboard') && user.userType !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/teacher-dashboard') && user.userType !== 'teacher') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/student-dashboard') && user.userType !== 'student') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (_error) {
    // Clear invalid session
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete('token')
    return response
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/teacher-dashboard/:path*',
    '/student-dashboard/:path*',
  ]
}