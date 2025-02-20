import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
export const allusercontext=createContext();
import { SocketContext } from './Socketcontext';

export const Alluserprovider = ({ children }) => {
  const[alluser,setalluser]=useState([]);
  const socket=useContext(SocketContext);

    useEffect(()=>{
if(!socket)return;

      const handlesocket=(newuser)=>{
        setalluser((prev)=>[newuser,...prev]);
      }
      socket.on("socketuser",handlesocket);
      return()=>{
        socket.off("socketuser",handlesocket);
      }
    },[socket]);


  return (
    <allusercontext.Provider value={{alluser,setalluser}}>
      {children}
    </allusercontext.Provider>
  )
}

