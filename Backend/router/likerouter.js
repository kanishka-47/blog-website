import { Router } from "express";;
import Blog from "../model/blogschema.js";
import User from "../model/userschema.js";
import { io } from "../index.js";
import { isuserauthenticated } from "../middleware/auth.js";

const router=Router();
router.post("/like/:blogId",isuserauthenticated, async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const userId = req.user._id;//login user =>this send the data
  
      // Check if the user already liked the blog
      const blog = await Blog.findById(blogId);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
  
      if (blog.likes.includes(userId)) {
        // Unlike (remove user ID)
        await Blog.findByIdAndUpdate(blogId, { $pull: { likes: userId } });
        return res.status(200).json({ message: "Blog unliked successfully" });
      } else {
        // Like (add user ID)
        await Blog.findByIdAndUpdate(blogId, { $push: { likes: userId } });
        if (userId.toString() !== blog.createdby.toString()) {
          const newNotification = new Notification({
              receiver: blog.createdby,
              sender: userId,
              blog: blogId,
              type: "like",
              message: `${req.user.fullname} liked your blog: ${blog.title}`,
          });
          await newNotification.save();

          // Send real-time notification via Socket.IO
          const recipientSocketId = onlineUsers.get(blog.createdby.toString());
          if (recipientSocketId) {
              io.to(recipientSocketId).emit("newNotification", newNotification);
          }
      }
  }

  await blog.save();
        return res.status(200).json({ message: "Blog liked successfully" });
      }
    catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  export default router;