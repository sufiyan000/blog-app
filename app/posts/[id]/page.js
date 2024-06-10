"use client"
import axios from "axios";
import { useState,useEffect } from "react";
import { redirect } from 'next/navigation';
import {LoadingOutlined} from "@ant-design/icons";
const PostDetails = ({ params })=>{
    const [post,setPost] = useState();
    const id = params.id;
    const getSinglePost = async ()=>{
        const {data} = await axios.get("/api/posts/"+id);
        setPost(data.blogs);
        console.log(data.blogs);
    }
    useEffect(()=>{
        getSinglePost();
    },[])
    return (
        <>
            <div className="w-[70%] border-1  mx-auto">
                {
                    post ? post.map((items,index)=>(
                        <>  
                            <div key={index}>
                                <h1>{items._id}</h1>
                                <h1 className="text-3xl">{items.title}</h1>
                                <h3 className="font-">{items.content}</h3>
                                <p>{items.author}</p>
                                <p>{items.createdAt}</p>
                            </div>
                        </>
                    )): <LoadingOutlined />
                }
                
                </div>
        </>
    )
}
export default PostDetails