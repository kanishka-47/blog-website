import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const BlogContext = createContext();
import { useContext } from "react";
import { SocketContext } from "./Socketcontext";

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]); // Store all blogs
  const [loading, setLoading] = useState(true);
const socket=useContext(SocketContext);
  // Fetch all blogs

  useEffect(() => {
    const fetchBlogs = async () => {
    
        const response = await axios.get("http://localhost:5000/blog/allblog", {
          withCredentials: true,
        });
        setBlogs((prevBlogs) => {
          const newBlogs = response.data.blogs.filter(
            (blog) => !prevBlogs.some((prevBlog) => prevBlog._id === blog._id)
          );
          return [...prevBlogs, ...newBlogs];
        });
      };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!socket) return;
  
    const handleSocketBlog = (newBlog) => {
      setBlogs((prev) => {
        // Check if the new blog already exists (based on blog ID)
        const isDuplicate = prev.some((blog) => blog._id === newBlog._id);
        if (isDuplicate) return prev; // If it's a duplicate, return the previous state unchanged
  
        return [newBlog, ...prev]; // Otherwise, add the new blog
      });
    };
    const handleUpdatedBlog = (updatedBlog) => {
      setBlogs((prevBlogs) => {
        return prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        );
      });
    };
    const handleDeletedBlog = (deletedBlogId) => {
      setBlogs((prevBlogs) => {
        return prevBlogs.filter((blog) => blog._id !== deletedBlogId);
      });
    };
  
    socket.on("newBlog", handleSocketBlog);
    socket.on("blogUpdated", handleUpdatedBlog);
    socket.on("blogDeleted", handleDeletedBlog);
    return () => {
      socket.off("newBlog", handleSocketBlog); 
      socket.off("blogUpdated", handleUpdatedBlog);
      socket.off("blogDeleted", handleDeletedBlog);
    };
  }, [socket]);
  

  return (
    <BlogContext.Provider value={{ blogs, setBlogs}}>
      {children}
    </BlogContext.Provider>
  );
};
