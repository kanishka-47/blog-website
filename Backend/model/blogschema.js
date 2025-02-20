import mongoose from "mongoose";
const blogschema=new mongoose.Schema({
 title:{
    type:String,
    required:true,
 },
 content:{
    type:String,
    required:true,
 },

 photo:{
    public_id:String,
    url:String
},
createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Likes remain in Blog
}, { timestamps: true });

const Blog= mongoose.model("Blog",blogschema);

export default Blog;