import React from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { BlogContext } from '../context/Blogcontext'
function Deleteblog({blogid}) {
    const{ blogs, setBlogs }=useContext(BlogContext)
    const handledelete = async () => {
        try {
          const response = await axios.delete(
            `http://localhost:5000/blog/deletepost/${blogid}`,
            
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
    
          // Update the state with the new blog details
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogid));

    
          alert("Blog deletd successfully!");
        } catch (error) {
          console.error("delete failed:", error.response?.data?.message || error.message);
        }
      };
  return (
    <div>
      <button onClick={handledelete} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">delete Blog</button>
    </div>
  )
}

export default Deleteblog
