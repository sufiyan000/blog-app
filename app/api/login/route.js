import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db';
import UserSchema from '@/app/schema/userSchema';
const bcrypt = require('bcrypt');
const jwt = require('jwt');
export async function POST(request) {
    await dbConnect();
    const {email,password} = await request.json();
    try{
        const existingUser = await UserSchema.findOne({email});
        if (!existingUser) {
            return NextResponse.json({ success: false,message:"Invalid email or password" }, {status: 401});
          }
          const isMatch = await bcrypt.compare(password, existingUser.password);
          if (!isMatch) {
            return NextResponse.json({ success: false,message:"Invalid email or password" }, {status: 401});

          }

          // generate token

          const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          const createdUser = await UserSchema(data).save();
          return NextResponse.json({ success: true,message:"user signup successful" }, {status: 200});



    }   
    catch (err) {
        return NextResponse.json({success: false,error: err.message});
    }
}