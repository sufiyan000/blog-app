import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import dbConnect from '@/app/lib/db';
import UserSchema from '@/app/schema/userSchema';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export async function POST(request,response) {
  
  await dbConnect();
  try{
      const {email,password} = await request.json();
        const existingUser = await UserSchema.findOne({email});
        if (!existingUser) {
            return NextResponse.json({ success: false,message:"user not exists" }, {status: 401});
          }
          const isMatch = await bcrypt.compare(password, existingUser.password);
          if (!isMatch) {
            return NextResponse.json({ success: false,message:"Invalid  password" }, {status: 401});

          }

          // generate token
          const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          cookies().set('session', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
          })
          return NextResponse.json({ success: true, message:"login successful"});




    }   
    catch (err) {
        return NextResponse.json({success: false,error: err.message});
    }
}