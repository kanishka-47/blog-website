import React, { useState } from 'react';
import axios from 'axios';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BlogContext } from '../context/Blogcontext';

function Createblog() {
  const{blogs,setBlogs}=useContext(BlogContext);
  const navigateTo = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (photo) {
        formData.append('photo', photo);
      }

      await axios.post("http://localhost:5000/blog/createpost", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        setBlogs([res.data.blog, ...blogs]);
        toast.success(res.data.message);
        setTitle("");
        setContent("");
        setFile(null);
        navigateTo("/");
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-cover min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8"style={{ backgroundImage: `url("/1.jpg")` }}>
      <div className="w-full max-w-2xl space-y-8 bg-white p-8 rounded-lg shadow-lg">

   
    <form className="m-10" onSubmit={handleSubmit}>
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
                <div className="flex items-center rounded-md bg-white pl-3 outline  -outline-offset-1 outline-gray-300 focus-within:outline  focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm">Title</div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block min-w-0 grow py-2 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  />
                </div>
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
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  placeholder="Write your blog content here..."
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">
                Upload Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
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
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </div>
    </div>
  );

}

export default Createblog;
