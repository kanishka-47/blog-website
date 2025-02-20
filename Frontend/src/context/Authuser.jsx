import React from "react";
import { useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";

export const Authcontext=createContext();
export const Authprovider=(props)=>{
    const initialstate=Cookies.get("cookieName") || localStorage.getItem("Patient");
    const storedUser = localStorage.getItem("Patient");
    const initialUser = storedUser ? JSON.parse(storedUser).user : {};
    const [isAuthenticate,setisAuthenticated]=useState(initialstate?true:false);
    const [user,setuser]=useState(initialUser);
return(
    <Authcontext.Provider value={{isAuthenticate,setisAuthenticated,user,setuser}}>
        {props.children}
    </Authcontext.Provider>
);
}