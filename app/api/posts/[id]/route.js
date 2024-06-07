import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/db";
import blogSchema from "@/app/schema/blogSchema";
export async function GET(request, context) {
    await dbConnect();
    try{
        const id = context.params.id;
        const blogs = await blogSchema.find({_id:id});
        return NextResponse.json({ blogs },{status:200});

    }
    catch (err) {
        return NextResponse.json({ msg: err }, { status: 500 })
    }
    
  }