import React, { useState } from 'react';
import Logout from '../pages/Logout';
import { useContext } from 'react';
import { Authcontext } from '../context/Authuser';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isAuthenticate} = useContext(Authcontext);
  const {user}=useContext(Authcontext);
  
  const navigateTo=useNavigate();
    return (
        <>
        
            <nav className="bg-gray-800 sticky top-0 z-50">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button 
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? (
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Logo and navigation */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                    {isAuthenticate?<a href="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</a>:""}
                        {isAuthenticate?<a href="/createblog" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Create Blog</a>:<a href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</a>}
                      
                        {isAuthenticate?"":<a href="/register" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</a>}
                        {isAuthenticate?<a href="/alluser" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">All user</a>:""}
                        <a href="/about" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About us</a>
                    </div>
                </div>
            </div>

            {/* Notifications and Profile Dropdown */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAuthenticate?
                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">View notifications</span>
                    <Link to="/notification">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </Link>
                </button>:""}

                {/* Profile dropdown */}
                <div className="relative ml-3">
                    <button 
                        type="button"
                        className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                    </button>

                    {isProfileMenuOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                            {isAuthenticate?<button onClick={()=>navigateTo(`/myprofile/${user._id}`)} className="block px-4 py-2 text-sm text-gray-700">Your Profile</button>:""}
                            {(isAuthenticate) ? "" : <a href="/login" className="block px-4 py-2 text-sm text-gray-700">Login</a>}
                            {(isAuthenticate) ? "" : <a href="/register" className="block px-4 py-2 text-sm text-gray-700">Register</a>}
                            {(isAuthenticate) ? <Logout /> : ""}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>

    {/* Mobile menu */}
    {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
            {isAuthenticate?<a href="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</a>:""}
                {isAuthenticate?<a href="/createblog" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Create Blog</a>:<a href="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</a>}
                {isAuthenticate?"":<a href="/register" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</a>}
                <a href="/about" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About us</a>
            </div>
        </div>
    )}
</nav>

        </>
    );
}

export default Navbar;
