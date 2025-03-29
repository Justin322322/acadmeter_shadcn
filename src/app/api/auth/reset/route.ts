import { NextResponse } from 'next/server'
import db from '@/lib/db/database'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Token and new password are required' 
      }, { status: 400 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, purpose: string }
    
    if (decoded.purpose !== 'password-reset') {
      return NextResponse.json({ 
        status: 'error',
        message: 'Invalid reset token' 
      }, { status: 400 })
    }

    // Check if token exists and is not expired in database
    const [tokens] = await db.execute(
      'SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at > NOW() AND used = 0',
      [token]
    )

    if (!(tokens as any[]).length) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Invalid or expired reset token' 
      }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password and mark token as used
    await db.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, decoded.userId]
    )

    await db.execute(
      'UPDATE password_reset_tokens SET used = 1 WHERE token = ?',
      [token]
    )

    return NextResponse.json({ 
      status: 'success',
      message: 'Password has been reset successfully'
    })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to reset password' 
    }, { status: 500 })
  }
}