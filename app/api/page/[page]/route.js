import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/db";
import blogSchema from "@/app/schema/blogSchema";
export async function GET(request, context) {
    await dbConnect();
    try{
        const page = context.params.page;
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const totalBlogs = await blogSchema.countDocuments();
        const blogs = await blogSchema.find().skip(startIndex).limit(limit);
        const result = {
            totalBlogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page,
            blogs
        };
        return NextResponse.json({ result },{status:200});

    }
    catch (err) {
        return NextResponse.json({ msg: err }, { status: 500 })
    }
    
  }