import React from 'react'
import { useContext } from 'react'
import { Getallcommentcontext } from '../context/Getallcomment'
function Allcomments({blogid}) {
    const {allcomments}=useContext(Getallcommentcontext);
    const blogComments = allcomments?.length
    ? allcomments.filter((comment) => comment?.commentblog === blogid)
    : [];
  // const userBlogs = blogs.filter((blog) => blog.createdby?._id === user?._id);
  if (!allcomments) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center text-gray-500">
        Loading data...
      </div>
    );
  }
    return (
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">All Comments</h3>
    
      <div className="h-64 sm:h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2 bg-white rounded-lg shadow-inner">
        {blogComments.length === 0 ? (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {blogComments.map((comment) => (
              <div 
                key={comment._id} 
                className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
              >
                <p className="text-gray-900 text-base sm:text-lg">{comment.text}</p>
                <span className="text-sm text-gray-500 block mt-1">
                  By {comment.createdby?.firstname || "Anonymous"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
  )
}

export default Allcomments
