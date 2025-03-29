import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import db from '@/lib/db/database'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (token) {
      // Delete session from database
      await db.execute('DELETE FROM sessions WHERE token = ?', [token])
    }

    // Create response and clear cookie
    const response = NextResponse.json({ success: true })
    response.cookies.delete('token')

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}