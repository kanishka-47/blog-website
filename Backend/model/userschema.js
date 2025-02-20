import mongoose from "mongoose";
import validator from "validator";
const Userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"please provide a valid email"]
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    password:{
        type:String,
        required:true,
    },
}, { timestamps: true });
const User=mongoose.model("User",Userschema);

export default User;