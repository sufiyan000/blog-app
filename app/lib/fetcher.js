import axios from "axios";
export async function  fetchBlog() {
    const {data} = await axios.get("http://localhost:3000/api/blogs");
    const {totalPages} = (data.data);
    console.log(totalPages);
    return data.data.blogs;
    
}