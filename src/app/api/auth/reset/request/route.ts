import { NextResponse } from 'next/server'
import db from '@/lib/db/database'
import jwt from 'jsonwebtoken'
import { sendEmail } from '@/lib/utils/email-service'
import { getPasswordResetEmailTemplate } from '@/lib/utils/email-templates'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Email is required' 
      }, { status: 400 })
    }

    // Find user
    const [users] = await db.execute(
      'SELECT id, first_name, last_name, email FROM users WHERE email = ?',
      [email]
    )

    const user = (users as any[])[0]

    // If user not found, return 404 but with a success message for security
    if (!user) {
      return NextResponse.json({ 
        status: 'warning',
        message: 'If an account exists with this email, you will receive password reset instructions.',
        notFound: true // Frontend will use this to show appropriate UI
      }, { status: 200 })
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Save reset token in database
    await db.execute(
      'INSERT INTO password_reset_tokens (id, token, user_id, expires_at) VALUES (UUID(), ?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))',
      [resetToken, user.id]
    )

    // Generate reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    // Send email
    const emailSent = await sendEmail(
      email,
      'Reset Your Password - AcadMeter',
      getPasswordResetEmailTemplate(user.first_name, user.last_name, resetLink)
    )

    if (!emailSent) {
      throw new Error('Failed to send email')
    }

    return NextResponse.json({ 
      status: 'success',
      message: 'Password reset instructions have been sent to your email.'
    })
  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: 'An error occurred while processing your request.' 
    }, { 
      status: 500 
    })
  }
}