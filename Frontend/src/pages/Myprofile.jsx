import React from 'react'
import { useContext } from 'react'
import { Authcontext } from '../context/Authuser'
import { useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/Blogcontext';
import Updateblog from '../components/Updateblog';
import Deleteblog from '../components/Deleteblog';
import { useParams } from 'react-router-dom';
function Myprofile() {
  const {blogs}=useContext(BlogContext);
  const {user}=useContext(Authcontext);
const {userid}=useParams();
  const navigate=useNavigate();
  const userBlogs = blogs.filter((blog) => blog.createdby?._id === userid);
  if (userBlogs.length==0 ) {
    return (
      <>
      {/* <div>
        
{user?
         `User- ${user.firstname} ${user.lastname}`
        :""}
      </div> */}
      
      <div className="w-screen min-h-screen flex items-center justify-center text-gray-500">
        Loading data...
      </div>
      </>
    );
  }
  return (
    <div className="bg-gray-400 min-h-screen py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      {/* User Info */}
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          {userBlogs.length > 0 && userBlogs[0].createdby
            ? `User - ${userBlogs[0].createdby.firstname} ${userBlogs[0].createdby.lastname}`
            : "User - Unknown"}
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          {userBlogs.length > 0 && userBlogs[0].createdby ? `Email - ${userBlogs[0].createdby.email}` : ""}
        </p>
      </div>
  
      {/* Blog Posts */}
      <div className="mx-auto mt-10 grid gap-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {userBlogs.map((post) => (
          <article 
            key={post.id} 
            className="flex flex-col overflow-hidden rounded-lg shadow-md bg-white transition transform hover:scale-[1.02]"
          >
            
            {/* Blog Image - Fully Responsive */}
            <div className="relative w-full h-64 sm:h-56 md:h-48 lg:h-56 xl:h-64">
              <img
                src={post.photo?.url}
                alt="Blog Image"
                className="absolute inset-0 w-full h-full object-cover cursor-pointer rounded-t-lg"
                onClick={() => navigate(`/blog/${post._id}`)}
              />
            </div>
  
            {/* Blog Content */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
  
              {/* Like Count */}
              <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                <span className="font-medium">Likes:</span> {post.likes.length}
              </div>
  
              {/* Buttons */}
              {
                user._id===userid?  <div className="mt-4 flex items-center gap-4">

                <button
                  onClick={() => navigate(`/update/${post._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Update
                </button>
              
                <Deleteblog blogid={post._id} />
              </div>:""
              }
              

            
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
  

  )
}

export default Myprofile
