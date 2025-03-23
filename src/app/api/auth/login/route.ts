import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db/database';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: string;
  email: string;
  password: string;
  user_type: 'teacher' | 'student';
  profile_id: string;
  first_name: string;
  last_name: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    try {
      // Get user with their profile information
      const [users] = await connection.query<UserRow[]>(
        `SELECT u.*, 
          COALESCE(tp.teacher_id, sp.student_id) as profile_id 
        FROM users u 
        LEFT JOIN teacher_profiles tp ON u.id = tp.user_id 
        LEFT JOIN student_profiles sp ON u.id = sp.user_id 
        WHERE u.email = ?`,
        [email]
      );

      const user = users[0];

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Create JWT token
      const token = jwt.sign(
        { 
          userId: user.id,
          email: user.email,
          userType: user.user_type,
          profileId: user.profile_id
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json({
        message: 'Login successful',
        user: userWithoutPassword,
        token
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}