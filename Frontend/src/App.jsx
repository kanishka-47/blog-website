import React from 'react'
import { Authprovider } from './context/Authuser'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Notification from "./components/Notification"
import Createblog from './pages/Createblog'
import Category from './pages/category'
import Myprofile from './pages/Myprofile'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"; 
import Logout from './pages/Logout'
import Fullblog from './components/Fullblog'
import { BlogContext, BlogProvider } from './context/Blogcontext'
import Updateblog from './components/Updateblog'
import { Getallcommentprovider } from './context/Getallcomment'
import { Notificationprovider } from './context/Notification'
import { SocketProvider } from './context/Socketcontext'
import { Alluserprovider } from './context/Alluser'
import Alluser from './pages/Alluser'
function App() {
  return (
    <>
    
   <Authprovider>
    <SocketProvider>
    <Alluserprovider>
    <BlogProvider>
    <Notificationprovider>
      <Getallcommentprovider>
       
<BrowserRouter>
<Routes>
  
  <Route path="/" element={<Home/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/notification" element={<Notification/>}/>
  <Route path="/category/:categoryName" element={<Category/>}/>
  <Route path="/createblog" element={<Createblog/>}/>
  <Route path="/myprofile/:userid" element={<Myprofile/>}/>
  <Route path="/logout" element={<Logout/>}/>
  <Route path="/blog/:blogid" element={<Fullblog/>}/>
  <Route path="/update/:blogid" element={<Updateblog/>}/>
  <Route path="/notification" element={<Notification/>}/>
  <Route path="/alluser" element={<Alluser/>}/>

</Routes>
</BrowserRouter>

</Getallcommentprovider>
</Notificationprovider>
</BlogProvider>
</Alluserprovider>
</SocketProvider>
   </Authprovider>
   <ToastContainer position="top-right" autoClose={3000} />
   </>
  )
}

export default App;
