import { NextResponse } from 'next/server'
import dbConnect from '@/app/lib/db';
import Blog from "@/app/schema/blogSchema"
export async function GET(request) {
    await dbConnect();
    try{
        const totalBlogs = await Blog.countDocuments();
        const blogs = await Blog.find().limit(10);
        const result = {
            totalBlogs,
            totalPages: Math.ceil(totalBlogs / 10),
            blogs
        };
        return NextResponse.json({success:true, data: result }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ msg: err }, { status: 500 })

    }
}

export async function POST(request) {
    const {title,content,author} = await request.json();
    
    try{
        const data = {
            title,
            content,
            author,
            }
        const newPost = await Blog(data).save();
        return NextResponse.json({ success: true,message:"blog created",data: newPost }, {status: 200});

    }
    catch (err) {
        return next(err);
    }
}

export async function DELETE(request) {
    await dbConnect();
    try{
        const {id} = await request.json()
        const data = await Blog.findByIdAndDelete({_id: id});
        if(data) return NextResponse.json({success:true, message: "delete", data}, {status: 200} );
        return NextResponse.json({success:false, message : "items not found"}, {status: 404} );
    }
    catch (err) {
        return NextResponse.json({msg: err.message}, {status:500} );
    }
}

export async function PUT(request){
    await dbConnect();
    try{
        const {data} = await request.json();
        console.log(data.id,data.title);
        const datas = {
            title: data.title,
            content: data.content,
            author : data.author
        }
        const update = await Blog.findByIdAndUpdate(data.id, data, { new: true });
        if(!update) return NextResponse.json({success:false, message:"blog Not Found"},{status:404});
        return NextResponse.json({success:true,updatedData:update},{status:200});
    }
    catch (err) {
        return NextResponse.json({success:false,err},{status:404});
    }
}