import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import axios from "axios";
export const Getallcommentcontext=createContext();
export const Getallcommentprovider=(props)=>{
    const [allcomments,setallcomments]=useState([]);
    useEffect(()=>{
        const fetchcomments=async()=>{
            const res=await axios.get("http://localhost:5000/cmnt/comment",{
                withCredentials:true,
            })
            setallcomments(res.data.comment);
        }
        fetchcomments();
    },[setallcomments,allcomments]);
   
return(
    <Getallcommentcontext.Provider value={{allcomments,setallcomments}}>
       {props.children}
    </Getallcommentcontext.Provider>
);
}