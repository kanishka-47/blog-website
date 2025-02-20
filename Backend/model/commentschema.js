import mongoose from "mongoose";

const commentschema=new mongoose.Schema({
text:{
type:String,
require:true,
},
createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
commentblog:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog",
},
}, { timestamps: true });

const Comment=mongoose.model("comment",commentschema);
export default Comment;