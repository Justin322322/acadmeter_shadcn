import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import db from '@/lib/db/database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Get user from database
    const [users] = await db.execute(
      'SELECT u.*, ap.admin_id, tp.teacher_id, sp.student_id FROM users u ' +
      'LEFT JOIN admin_profiles ap ON u.id = ap.user_id ' +
      'LEFT JOIN teacher_profiles tp ON u.id = tp.user_id ' +
      'LEFT JOIN student_profiles sp ON u.id = sp.user_id ' +
      'WHERE u.email = ?',
      [email]
    )

    const user = (users as any[])[0]

    // Check if user exists and verify password in a way that doesn't reveal which was incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ 
        error: 'Invalid email or password' 
      }, { 
        status: 401 
      })
    }

    // Determine user type based on which profile exists
    let userType = 'student'
    let profileId = user.student_id
    
    if (user.admin_id) {
      userType = 'admin'
      profileId = user.admin_id
    } else if (user.teacher_id) {
      userType = 'teacher'
      profileId = user.teacher_id
    }

    // Calculate token expiration based on remember me
    const expiresIn = rememberMe ? '30d' : '24h'
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 24 hours in seconds

    // Create session token
    const token = jwt.sign(
      { 
        userId: user.id,
        userType,
        profileId
      },
      JWT_SECRET,
      { expiresIn }
    )

    // Save session to database with appropriate expiration
    await db.execute(
      'INSERT INTO sessions (id, user_id, token, expires_at) VALUES (UUID(), ?, ?, DATE_ADD(NOW(), INTERVAL ? HOUR))',
      [user.id, token, rememberMe ? 720 : 24] // 720 hours = 30 days
    )

    // Create response with cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        userType,
        profileId
      }
    })

    // Set cookie with appropriate maxAge
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: maxAge
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      error: 'An error occurred during login. Please try again.' 
    }, { 
      status: 500 
    })
  }
}