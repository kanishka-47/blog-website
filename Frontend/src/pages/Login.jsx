import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { Authcontext } from '../context/Authuser';
import { Link } from 'react-router-dom';
import { Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { isAuthenticate,setisAuthenticated,setuser } = useContext(Authcontext);
  const navigateTo = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/adduser/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        toast.success(res.data.message);
        setuser(res.data.user);
        setisAuthenticated(true);
        localStorage.setItem("Patient", JSON.stringify({ success: true, user: res.data.user }));  
              navigateTo("/");
        setEmail("");
        setPassword("");
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticate) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="bg-cover flex justify-center items-center min-h-screen"style={{ backgroundImage: `url("/public/3.jpg")` }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <p className="text-gray-500 text-center mb-4">Please Login to continue</p>

        <form onSubmit={handlelogin} className="space-y-4">
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Gender & Password */}
          <div className="flex gap-4">
           
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Login Link */}
          <div className="flex justify-end text-sm">
            <p className="text-gray-600">registere</p>
            <Link to={"/register"} className="ml-1 text-indigo-600 hover:underline">
              Register Now
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login 
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login
