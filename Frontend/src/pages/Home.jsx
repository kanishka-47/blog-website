import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import { useContext } from 'react'
import { Authcontext } from '../context/Authuser'
function Home() {
  const{isAuthenticate,setisAuthenticated}=useContext(Authcontext);
  return (
    <div>
      <Navbar/>
      {(isAuthenticate)?
     
     <Dashboard/>
    :<div className='bg-cover h-screen'style={{ backgroundImage: `url("/public/4.jpg")` }}>
      
    </div>
      }
    </div>
  )
}

export default Home
