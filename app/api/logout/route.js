import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req, res) {
    // Clear the session cookie
    cookies().set('session', '', {
        httpOnly: true,
        maxAge: -1, // Set the cookie's expiration to a past date
        path: '/',
      });
    
      return NextResponse.json({ success: true, message: 'Logout successful' });

}
