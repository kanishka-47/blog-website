import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Authcontext } from "../context/Authuser.jsx";
import { Link, useNavigate, Navigate } from "react-router-dom";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  
  const { isAuthenticate,setisAuthenticated ,user,setuser} = useContext(Authcontext);
  const navigateTo = useNavigate();

  const handleregistration = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/adduser/register",
        { firstname, lastname, email, password, gender },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        toast.success(res.data.message);
       // console.log("user",res.data);
        setuser(res.data.newuser);
        setisAuthenticated(true);
        localStorage.setItem("Patient", JSON.stringify({ success: true, user: res.data.newuser }));     
           navigateTo("/");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setGender("");
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
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <p className="text-gray-500 text-center mb-4">Please sign up to continue</p>

        <form onSubmit={handleregistration} className="space-y-4">
          {/* Name Fields */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
            <p className="text-gray-600">Already registered?</p>
            <Link to={"/login"} className="ml-1 text-indigo-600 hover:underline">
              Login Now
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
