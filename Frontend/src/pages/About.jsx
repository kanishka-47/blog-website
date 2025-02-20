import React from 'react'
import Navbar from '../components/Navbar'

function About() {
  return (
    <>
   <div>
    <Navbar/>
   </div>
   
    <div className="m-10 p-6 bg-gray-400 shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
    <p className="text-gray-700 text-lg mb-4">
      Welcome to our blogging platform, where creativity meets technology! Our mission is to provide
      a space for writers, creators, and thinkers to share their ideas with the world.
    </p>
    <h2 className="text-2xl font-semibold text-gray-900 mt-6">Our Vision</h2>
    <p className="text-gray-700 text-lg mb-4">
      We believe in the power of words and storytelling. Whether you're a seasoned blogger or just starting out,
      our platform offers the tools and support you need to bring your voice to a global audience.
    </p>
    <h2 className="text-2xl font-semibold text-gray-900 mt-6">Why Choose Us?</h2>
    <ul className="list-disc list-inside text-gray-700 text-lg">
      <li>Seamless and user-friendly blogging experience.</li>
      <li>Secure and reliable platform with real-time updates.</li>
      <li>Engaging community of readers and writers.</li>
      <li>Advanced AI-driven features for content recommendations.</li>
    </ul>
    <h2 className="text-2xl font-semibold text-gray-900 mt-6">Join Our Community</h2>
    <p className="text-gray-700 text-lg mb-4">
      Be part of a growing network of passionate bloggers. Sign up today and start sharing your stories with the world!
    </p>
  </div>
  
  </>
  )
}

export default About
