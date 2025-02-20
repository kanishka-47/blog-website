import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BlogContext } from '../context/Blogcontext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Updateblog() {
    const {blogid}=useParams();
    const navigateTo=useNavigate();
    const { blogs, setBlogs } = useContext(BlogContext);
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState(""); 
 
 
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
              const response = await axios.put(
            `http://localhost:5000/blog/updatepost/${blogid}`,
            {title,content},
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) => (blog._id === blogid ? response.data.blog : blog))
        );
        navigateTo("/myprofile");
        alert("Blog updated successfully!");
        setTitle(""); 
        setContent(""); 
      
    } catch (error) {
        console.error("Update failed:", error.response?.data?.message || error.message);
    }
};


    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Update Blog</h2>
            <form className="m-10">
  <div className="space-y-12">
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold text-gray-900">Blog</h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Title Input */}
        <div className="sm:col-span-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        {/* Content Input */}
        <div className="col-span-full">
          <label htmlFor="content" className="block text-sm font-medium text-gray-900">
            Content
          </label>
          <div className="mt-2">
            <textarea
              id="content"
              name="content"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              placeholder="Write your blog content here..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Buttons */}
  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" className="text-sm font-semibold text-gray-900">
      Cancel
    </button>
    <button
      type="button" // ❗ Change type="submit" to type="button"
      onClick={handleUpdate} // ❗ Move handleUpdate here instead of form onSubmit
      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
    >
      Update Blog
    </button>
  </div>
</form>

        </div>
    );
}

export default Updateblog;
