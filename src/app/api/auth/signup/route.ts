import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import pool from '@/lib/db/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface ExistingUserRow extends RowDataPacket {
  id: string;
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, userType, id: profileId } = await request.json();

    // Validate inputs
    if (!firstName || !lastName || !email || !password || !userType || !profileId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    try {
      // Check if email already exists
      const [existingUsers] = await connection.query<ExistingUserRow[]>(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      const userId = uuidv4();
      const profileTableId = uuidv4();

      // Begin transaction
      await connection.beginTransaction();

      // Create user
      await connection.query<ResultSetHeader>(
        'INSERT INTO users (id, first_name, last_name, email, password, user_type) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, firstName, lastName, email, hashedPassword, userType]
      );

      // Create profile based on user type
      const profileTable = userType === 'teacher' ? 'teacher_profiles' : 'student_profiles';
      const profileIdField = userType === 'teacher' ? 'teacher_id' : 'student_id';

      await connection.query<ResultSetHeader>(
        `INSERT INTO ${profileTable} (id, user_id, ${profileIdField}) VALUES (?, ?, ?)`,
        [profileTableId, userId, profileId]
      );

      await connection.commit();

      return NextResponse.json(
        { message: 'User registered successfully' },
        { status: 201 }
      );
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}