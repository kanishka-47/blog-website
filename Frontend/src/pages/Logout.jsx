import React from 'react'
import { useContext } from 'react';
import axios from 'axios';
import { Authcontext } from '../context/Authuser';
import { useNavigate } from "react-router-dom";
function Logout() {
  const { isAuthenticate,setisAuthenticated ,setuser} = useContext(Authcontext);
  const navigate = useNavigate();
    const Logout = async () => {
        try {
            await axios.post("http://localhost:5000/adduser/logout", { withCredentials: true });
            setisAuthenticated(false);
            setuser(null);
            localStorage.removeItem("Patient"); // Remove user data from localStorage
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
  return (
    <div>
         <button onClick={Logout} className="block px-4 py-2 text-sm text-gray-700">
            Log out
        </button>
    </div>
  )
}

export default Logout
