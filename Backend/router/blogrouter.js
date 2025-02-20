import { Router } from "express";
import Blog from "../model/blogschema.js";
import { v2 as cloudinary } from "cloudinary";
import { isuserauthenticated } from "../middleware/auth.js";
// import {categorizeBlog} from "../aiagent/category.js"
import { io } from "../index.js";
const router=Router();

router.post("/createpost",isuserauthenticated,async(req,res)=>{
    try {
    if (!req.files || !req.files.photo) {
        return res.status(400).json({
          success: false,
          message: "Doctor avatar is required",
        });
      }

      const { photo } = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(photo.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "File format not supported",
        });
      }
    const{title,content}=req.body;
    if (!title || !content) {
      return res.status(400).json({
          success: false,
          message: "Title and content are required",
      });
  }
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

    const blog = new Blog({
       title,
       content,
        photo: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
        createdby: req.user._id,
      });
  
      
        await blog.save();

        io.emit("newBlog", blog);// jitne bhi online users h unke pas ye blog phuch jayega 

        return res.status(200).json({
            success: true,
            message: "Blog successfully registered",
            blog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to save blog",
           
        });
    }
});

router.put("/updatepost/:id",isuserauthenticated,async(req,res)=>{
    const {id}=req.params;
    let blog=await Blog.findById(id);
    if(!blog){
        return res.status(400).json({
              success:false,
            message:"no blog found"
        })
    }

    blog=await Blog.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    io.emit("blogUpdated", blog);
    return res.status(200).json({
        success:true,
       blog
    })
});

router.delete("/deletepost/:id",isuserauthenticated,async(req,res)=>{
    const{id}=req.params;
    let blog =await Blog.findById(id);
    if(!blog){
        return res.status(400).json({
              success:false,
            message:"no blog found",
        })
    }

    await blog.deleteOne();
    io.emit("blogDeleted", id);
    return res.status(200).json({
        success:true,
        message:"blog deleted"
    })
})

router.get("/allblog", isuserauthenticated, async (req, res) => {
    try {
        const blogs = await Blog.find().populate("createdby", "firstname lastname email")
        
        if (blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found",
            });
        }

        return res.status(200).json({
            success: true,
            blogs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/blog/:blogid", isuserauthenticated, async (req, res) => {
    try {
        const { blogid } = req.params;  // Extract blog ID from URL params
        const blog = await Blog.findById(blogid).populate("createdby", "firstname lastname");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            blog,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});


router.get("/getuserblog", isuserauthenticated, async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all blogs created by the logged-in user
        const blogs = await Blog.find({ createdby: userId })
        .populate("createdby", "email firstname lastname")
        // Populate only email & name of the user

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found for this user",
            });
        }

        return res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

router.get("/topblog",isuserauthenticated,async(req,res)=>{
const blog=await Blog.find().sort({ createdAt: -1 }).limit(5);
if(!blog){
    return res.status(404).json({
        success: false,
        message: "No blogs",
    });
}
return res.status(200).json({
    success: true,
    blog,
});
})

// router.get("/blogs/filter/:category", async (req, res) => {
//     try {
//         const blogs = await Blog.find();
//         const categoryToFilter = req.params.category.toLowerCase();

//         const filteredBlogs = [];

//         for (const blog of blogs) {
//             const category = await categorizeBlog(blog.content);
//             if (category.toLowerCase() === categoryToFilter) {
//                 filteredBlogs.push({ ...blog.toObject(), category });
//             }
//         }

//         return res.status(200).json({ success: true, blogs: filteredBlogs });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
//     }
// });

export default router;