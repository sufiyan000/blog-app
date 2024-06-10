"use client"
import axios from "axios";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Button } from "antd";


const Page = ({ params })=>{
    const router = useRouter();
    const [blog,setBlog] = useState([]);
    const [pagination,setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const itemsPerPage = 10;
    const pages = Array.from({ length: pagination }, (_, index) => `Item ${index + 1}`);

    const handleClick = (event) => {
      setCurrentPage(Number(event.target.id));
      router.push(`/page/${Number(event.target.id)}`)
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
        const {data} = await axios.get("/api/page/"+params.id);
        setBlog(data.result.blogs);
        const {totalPages} = data.result;
        setPagination(totalPages)
        setCurrentPage(data.result.currentPage)
    
    
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
              <Link href={`/posts/${items._id}`} key={index}>
                <div className="h-[100px] border border-2 p-4 m-4 hover:bg-blue-500 cursor-pointer shadow-lg rounded-lg">
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
    )
}
export default Page