import React from 'react'
import { useContext } from 'react'
import { allusercontext } from '../context/Alluser'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Alluser() {
    const{alluser,setalluser}=useContext(allusercontext);
const navigateTo=useNavigate();
        useEffect(()=>{
           
            const fetchuser = async () => {
        
              const response =await axios.get("http://localhost:5000/adduser/alluser",{
                withCredentials: true,
              });
    
              setalluser(response.data.user);

            }
            fetchuser();
        },[]);
  return (
    <div>
       <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {alluser.map((user) => (
        <article
          key={user._id} onClick={()=>navigateTo(`/myprofile/${user._id}`)}
          className="flex max-w-xl flex-col items-start justify-between bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          
        >
        
          <div className="p-6 flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">{user.firstname}</h3>
            {/* <p className="text-lg text-gray-600">{post.content?.substring(0, 150)}...</p> */}

            <div className="flex items-center justify-between text-xs text-gray-500">
              {/* <div className="flex items-center gap-x-2">
                <span className="font-medium">Likes: </span>
                <span>{post.likes.length}</span>
              </div> */}
              <div className="text-sm font-semibold text-gray-900">
                {user.email}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
    </div>
  )
}

export default Alluser
