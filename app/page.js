"use client"
import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "antd";

// import all components here
import Header from "./header/page";

export default function Home() {
  const [ blog,setBlog ] = useState([]);
  const [pagination,setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pages = Array.from({ length: pagination }, (_, index) => `Item ${index + 1}`);
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
    alert(Number(event.target.id));
};
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pagination; i++) {
        pageNumbers.push(
          <Button 
                key={i}
                id={i}
                onClick={handleClick}
                className={currentPage === i ? 'active' : ''}
                type="primary" size="large">
          {i}
        </Button>
            
        );
    }
    return pageNumbers;
};
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
        <h1 className="text-3xl text-center font-bold">Login First to create delete and update Blog</h1>
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
        <div className="flex gap-2 justify-center">
          {renderPageNumbers()}
        </div>
        
        
      </div>
    </>
  );
}


