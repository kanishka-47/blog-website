import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import Allcomments from "./Allcomments";
export default function Fullblog() {
  const { blogid } = useParams();  
  const [blog, setBlog] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      // try {
        const response = await axios.get(`http://localhost:5000/blog/blog/${blogid}`, {
          withCredentials: true,
        });
        setBlog(response.data.blog);
      // } catch (err) {
      //   console.error("Error fetching blog:", err);
      //   setError("Failed to load blog. Please try again.");
      // }
    };
    fetchBlogs();
  }, [blogid]);

  
  // Show error message if request fails
  // if (error) {
  //   return (
  //     <div className="w-screen min-h-screen flex items-center justify-center text-red-500">
  //       {error}
  //     </div>
  //   );
  // }
  // Show loading state while fetching data
  


  if (!blog) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center text-gray-500">
        Loading blog...
      </div>
    );
  }

  return (
              
<div className=" bg-cover w-screen min-h-screen px-6 py-16 sm:py-24"style={{ backgroundImage: `url("/public/blog.jpg")` }}>
  <div className="max-w-4xl mx-auto bg-gray-200">
    
    {/* Blog Title & Author */}
    <div className="mb-8 text-center sm:text-left ">
      <p className="text-3xl font-semibold text-indigo-600 py-2">
        {blog.createdby ? `${blog.createdby.firstname} ${blog.createdby.lastname}` : "Unknown Author"}
      </p>
      <div className="mt-8 text-lg leading-8 text-gray-700 px-5">
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        {blog.title}
      </h1>
</div>

      {/* <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        {blog.title}
      </h1> */}
    </div>

    {/* Blog Image */}
    {blog.photo?.url && (
      <div className="w-full max-h-[500px] overflow-hidden rounded-lg shadow-lg px-5">
        <img
          src={blog.photo.url}
          alt="Blog"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    )}

    

    {/* Blog Content */}
    <div className="mt-8 text-lg leading-8 text-gray-700 px-5">
  <span className="text-2xl font-semibold text-gray-900">Content:</span>
  <p className="mt-2 break-words">{blog.content}</p>
</div>


    {/* Comments Section */}
    <div className="mt-10 space-y-6 px-5">
      <Allcomments blogid={blogid} />
      <Comment blogid={blogid} />
    </div>

  </div>
</div>


  );
}


