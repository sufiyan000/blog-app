"use client"
import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";

// import all components here
import Header from "./header/page";

export default function Home() {
  const [ blog,setBlog ] = useState([]);
  const [pagination,setPagination] = useState(null);
  const pages = Array.from({ length: pagination }, (_, index) => `Item ${index + 1}`);

  const getBlog = async ()=>{
    const {data} = await axios.get("/api/blogs");
    const {totalPages} = (data.data);
    console.log(totalPages);
    setBlog(data.data.blogs);
    setPagination(totalPages);
    
  }
  useEffect(()=>{
    getBlog();
  },[])
  return (
    <>
      <Header />
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
  );
}


