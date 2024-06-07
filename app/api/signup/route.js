import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db';
import UserSchema from '@/app/schema/userSchema';
const bcrypt = require('bcrypt');
export async function POST(request) {
    await dbConnect();
    const {email,password} = await request.json();
    try{
        const existingUser = await UserSchema.findOne({email});
        if (existingUser) {
            return NextResponse.json({ success: true,message:"User already exists" }, {status: 200});
          }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const data = {
            email,
            password: hashedPassword
          }
          const createdUser = await UserSchema(data).save();
          return NextResponse.json({ success: true,message:"user signup successful" }, {status: 200});



    }   
    catch (err) {
        return NextResponse.json({success: false,error: err.message});
    }
}