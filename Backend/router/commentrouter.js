import { Router } from "express";
import Comment from "../model/commentschema.js"
import Blog from "../model/blogschema.js";
import { isuserauthenticated } from "../middleware/auth.js";
import Notification from "../model/notifinationschema.js";
import { io } from "../index.js";
import { onlineUsers } from "../index.js";
const router=Router();

router.post("/comment/:blogid",isuserauthenticated,async(req,res)=>{
    try{
    const {blogid} = req.params;
    const userid = req.user._id;
    const blog = await Blog.findById(blogid);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const {text}=req.body;
if(!text){
    return res.status(400).json({
        success:false,
        message:"please write comment"
    })
}
const newComment = new Comment({ commentblog: blogid, createdby: userid, text });

if(!newComment){
    return res.status(400).json({
        success:false,
        message:"error comment"
    })
}

 await newComment.save();

if (userid.toString() !== blog.createdby.toString()) {
    const newNotification = new Notification({
        receiver: blog.createdby,
        sender: userid,
        blog: blogid,
        type: "comment",
        message: `${req.user.firstname} commented on your blog: ${blog.title}`, 
    });
    
    await newNotification.save();

    // Send real-time notification via Socket.IO
    const recipientSocketId = onlineUsers.get(blog.createdby.toString());
    if (recipientSocketId) {
        io.to(recipientSocketId).emit("newNotification", newNotification);
    }
    
}

// await blog.save();

return res.status(200).json({
    success:true,
    newComment
})}catch(error){
    return res.status(400).json({
        success:false,
        message: error.message || "Something went wrong",
    })
}
})

router.get("/comment",isuserauthenticated,async(req,res)=>{
    const comment = await Comment.find().populate("createdby", "firstname lastname email");

    if(!comment){
        return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ 
        message: "comment found",
        comment
    });
})

export default router;