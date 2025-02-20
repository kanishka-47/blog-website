import User from "../model/userschema.js";
import jwt from "jsonwebtoken";
export const isuserauthenticated=async (req, res, next) => {
    const token = req.cookies.cookieName;
  
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "user not authenticated",
      });
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user from database
      const user = await User.findById(decoded.id);
  
      // Check if user exists and has Admin role
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "user not authenticated",
        });
      }
  
      // Attach user to request object
      req.user = user;
  
      // Pass control to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };

