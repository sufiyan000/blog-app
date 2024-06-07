import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function middleware(req, res, next) {
  const token = cookies().get('session')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
    // return NextResponse.json({ success: false,message: 'Token is required' }, { status: 401 });
  }
  try{
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    req.nextUrl.searchParams.set('user', JSON.stringify(payload));
    return NextResponse.next();

  }
  catch(err){
    NextResponse.redirect("http://localhost:3000/login");
    console.error(err);
    // return NextResponse.json({success : false, message: 'Invalid token', error: error.message }, { status: 401 });
  }
  console.log(JSON.stringify(payload));
  
    // return NextResponse.redirect("http://localhost:3000/login");
}
export const config = {
    matcher: "/admin",
}