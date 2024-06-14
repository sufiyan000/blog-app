"use client"
import React, { useState, useEffect } from 'react';
import { fetchBlog } from '@/app/lib/fetcher';

export default function Page() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogData = await fetchBlog();
        setBlog(blogData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, []);

  return (
    <main>
      {blog.map((item, index) => (
        <div key={index} className="border border-2 p-4 m-4 hover:bg-[#DAF7A6] cursor-pointer">
          <h1>{item.title}</h1>
          <hr />
          <p>{item.content}</p>
          <hr />
          <p>{item.author}</p>
        </div>
      ))}
    </main>
  );
}
