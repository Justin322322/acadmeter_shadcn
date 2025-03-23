import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function verifyAuth(token: string | null) {
  if (!token) return false;

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret')
    );
    return verified.payload;
  } catch (error) {
    return false;
  }
}

export function redirectToLogin(message?: string) {
  return NextResponse.redirect(new URL('/?authError=' + (message || 'Please login first'), process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
}
