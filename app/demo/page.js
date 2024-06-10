
import {fetchBlog} from "@/app/lib/fetcher"
export default async function Page() {
  const blog = await fetchBlog();
  console.log(blog);
 
  return (
    <main>
      {
        console.log(blog)
      }
      
       {
        
          blog.map((items,index)=>(
            <>
              
                <div  className="border border-2 p-4 m-4 hover:bg-[#DAF7A6] cursor-pointer">
                  <h1>{items.title}</h1>
                  <hr />
                  <p>{items.content}</p>
                  <hr />
                  <p>{items.author}</p>
                </div>
              
            </>
          ))
          
          
        }
    </main>
  )
}