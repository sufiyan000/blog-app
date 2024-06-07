"use client"
import axios from "axios";
import Link from "next/link";
import { useState,useEffect } from "react";


const Page = ({ params })=>{
    const [blog,setBlog] = useState([]);
    const [pagination,setPagination] = useState(null);
    const pages = Array.from({ length: pagination }, (_, index) => `Item ${index + 1}`);
    const getBlog = async ()=>{
    const {data} = await axios.get("/api/page/"+params.id);
    setBlog(data.result.blogs);
    // setPagination(data.result.);
    console.log(data.result);
    
    
  }
  useEffect(()=>{
    getBlog();
  },[])
    
    return (
        <>
            <div className="w-[70%] border-1  mx-auto">
        {
          blog.map((items,index)=>(
            <>
              <Link href={`/posts/${items._id}`}>
                <div className="h-[100px] border border-2 p-4 m-4 hover:bg-blue-500 cursor-pointer">
                <h1>{items.title}</h1>
                <hr />
                <p>{items.content}</p>
                <hr />
                <p>{items.author}</p>
                </div>
              </Link>
            </>
          ))
        
          
        }
        {
            pages.map((page, index) =>(
              <>
                <button className="w-[70px] h-[40px] border border-2">
                  page
                </button>
              </>
            ))
        }
        
        
      </div>
        </>
    )
}
export default Page