import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { Getallcommentcontext } from '../context/Getallcomment';

function Comment({blogid}) {
  const{allcomments,setallcomments}=useContext(Getallcommentcontext);
  const [text,settext]=useState("")
  const handlesend=async(e)=>{
e.preventDefault();
try{
await axios.post(`http://localhost:5000/cmnt/comment/${blogid}`,{text},
  {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  }
).then((res)=>{
  toast.success(res.data.message);
  setallcomments((prevComments) => [...prevComments, res.data.comment]);
  settext("");

})}catch(error){
  toast.error(error.response.data.message);
  
}
  }
  return (
    <form onSubmit={handlesend}>
    <div>
       <div className="col-span-full">
              <label htmlFor="content" className="block text-sm font-medium text-red-600 py-2">
                Comment
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  value={text}
                  onChange={(e) => settext(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  placeholder="Write your blog comment..."
                />
              </div>
            </div>
            
            <button type="submit" className='bg-blue-500 my-2 rounded-3xl w-15'>Send</button>
    </div>
    </form>
  )
}

export default Comment
