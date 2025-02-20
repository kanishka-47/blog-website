import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BlogContext } from '../context/Blogcontext';
function Dashboard() {
  const {blogs}=useContext(BlogContext);
  // const[blogs,setBlogs]=useState([]);
  const navigate=useNavigate();
  // useEffect(() => {
  //   const fetchBlogs = async () => {
    
  //       const response = await axios.get("http://localhost:5000/blog/allblog", {
  //         withCredentials: true,
  //       });
  //       setBlogs(response.data.blogs);
  //   };
  //   fetchBlogs();
  // }, []);
 // console.log("blogs",blogs);
  return (
    
    <div className="bg-cover py-24 sm:py-32 " style={{ backgroundImage: `url("/public/blog.jpg")` }}>
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0">
      <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        From the Blog
      </h2>
      <p className="mt-2 text-lg text-gray-300">
        Learn how to grow your business with our expert advice.
      </p>
    </div>
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {blogs.map((post) => (
        <article
          key={post._id}
          className="flex max-w-xl flex-col items-start justify-between bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          onClick={() => navigate(`/blog/${post._id}`)}
        >
          <div className="relative w-full h-0 pb-[56.25%]">
            {/* This creates a responsive container for the image with 16:9 aspect ratio */}
            <img
              src={post.photo?.url}
              alt="Blog Image"
              className="absolute inset-0 w-full h-full object-cover rounded-t-lg transition-all duration-500 transform hover:scale-105"
            />
          </div>
          <div className="p-6 flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">{post.title}</h3>
            {/* <p className="text-lg text-gray-600">{post.content?.substring(0, 150)}...</p> */}

            <div className="flex items-center justify-between text-xs text-gray-500">
              {/* <div className="flex items-center gap-x-2">
                <span className="font-medium">Likes: </span>
                <span>{post.likes.length}</span>
              </div> */}
              <div className="text-sm font-semibold text-gray-900">
                {post.createdby?.firstname}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</div>

  

  
  )
}

export default Dashboard
