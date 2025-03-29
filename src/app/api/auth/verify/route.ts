import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import db from '@/lib/db/database'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string
      userType: 'admin' | 'teacher' | 'student'
      profileId: string
    }

    // Check if session exists and is valid
    const [sessions] = await db.execute(
      'SELECT * FROM sessions WHERE user_id = ? AND token = ? AND expires_at > NOW()',
      [decoded.userId, token]
    )

    if (!(sessions as any[]).length) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    // Get user data
    const [users] = await db.execute(
      'SELECT u.*, ap.admin_id, tp.teacher_id, sp.student_id FROM users u ' +
      'LEFT JOIN admin_profiles ap ON u.id = ap.user_id ' +
      'LEFT JOIN teacher_profiles tp ON u.id = tp.user_id ' +
      'LEFT JOIN student_profiles sp ON u.id = sp.user_id ' +
      'WHERE u.id = ?',
      [decoded.userId]
    )

    const user = (users as any[])[0]
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        userType: user.user_type,
        profileId: user.admin_id || user.teacher_id || user.student_id
      }
    })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}