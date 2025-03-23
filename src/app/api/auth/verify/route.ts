import { verifyAuth } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing or invalid authorization header' }),
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const payload = await verifyAuth(token)

    if (!payload) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401 }
      )
    }

    return new NextResponse(
      JSON.stringify({ message: 'Token verified', user: payload }),
      { status: 200 }
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Authentication failed' }),
      { status: 500 }
    )
  }
}