import { Router } from "express";
import User from "../model/userschema.js";
import bcrypt from "bcrypt";
import setuser from "../services/auth.js";
import { isuserauthenticated } from "../middleware/auth.js";
const router=Router();
router.post("/register",async(req,res)=>{
  try{
    const {firstname,lastname,email,gender,password}=req.body;
    if(!firstname || !lastname || !email || !gender || !password){
      return res.status(400).json({
        success:false,
        message:"please fill full form"
    })
    }
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"user already registered"
        })
    }

    const hashpassword = await bcrypt.hash(password, 10); // used to hash the password of 10 length

const newuser=new User({
firstname,lastname,email,password:hashpassword,gender
});
await newuser.save();

if(newuser){
    
    setuser(newuser, res);
    return res.status(200).json({
        success:true,
        message:"user created successfully",
        newuser
    })
   
}}catch(error){
  return res.status(400).json({
    success:false,
    message:"error in form"
})
}
});

router.post("/login", async(req, res) => {
    try {
      const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({
      success: false,
      message: "please fill full form",
    });
  }
      // Fetch user from the database
      const user = await User.findOne({ email });
      
      // Check if user exists
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not registered",
        });
      }
  
      // Compare the password with the stored hashed password
      const isPasswordMatched = await bcrypt.compare(password, user.password);
  
      // If password does not match
      if (!isPasswordMatched) {
        return res.status(400).json({
          success: false,
          message: "Please enter the correct password",
        });
      }
  
      // If password matches, proceed with login
      setuser(user, res);
      return res.status(200).json({
        success: true,
        message: "Successfully logged in",
        user,
      });
  
    } catch (error) {
      // Handle errors
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });

  router.post("/logout",async(req,res)=>{
    return res.status(200).cookie("cookieName","",{
      httpOnly:true,
      secure: true,
      sameSite: "strict",//third party cookies ko allow krne ke liye
    }).json({
      success:true,
      message:"user logout successfully"
    })
  });

  export default router;
  