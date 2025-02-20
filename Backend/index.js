import express from "express";
import cors from "cors";   //used to connect frontend to backend 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"   //mongodb
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";  //used to upload images and videos 
import userroute from "./router/userroute.js";
import blogroute from "./router/blogrouter.js";
import commentrouter from "./router/commentrouter.js";
import likerouter from "./router/likerouter.js";
import notifationrouter from "./router/notifationrouter.js";
import { Server } from "socket.io";
import http from "http";
import path from "path";
const app=express();//with the help of this express ki all propreties ko app me lekr aate hai 
const server = http.createServer(app);

const _dirname=path.resolve();

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
        credentials: true,
    },
});

export const onlineUsers = new Map();


io.on("connection", (socket) => {
    // console.log("New user connected:", socket.id);

    // When a user logs in, store their socket ID
    socket.on("registerUser", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        // console.log("User disconnected:", socket.id);
        onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                onlineUsers.delete(key);
            }
        });
    });
});

// Export io to use in routes
export { io };

dotenv.config();//use to load environment variable from .env file to procrss.env object
mongoose.connect(process.env.MONGODB_URL, {
    dbName: "createblog"
  })//used to connnect mongodb
    .then(() => ("MongoDB connected"))
    // .catch((err) => console.log("Error:", err));
     
    app.use(cors({//connect frontend and backend
        origin:[process.env.FRONTEND_URL],
        methods: ["GET,POST,PUT,DELETE"],
        credentials: true, //this indicate that browser send cookies and authentication information
    }))

    
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)//fileupload is used to upload file to a server 

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    timeout: 60000,
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello");
})
app.use("/adduser",userroute);
app.use("/blog",blogroute);
app.use("/cmnt",commentrouter);
app.use("/lke",likerouter);
app.use("/notify",notifationrouter);

app.use(express.static(path.join(_dirname,"/Frontend")))

server.listen(process.env.PORT,()=>{
    console.log(`SERVER START ON PORT ${process.env.PORT}`)});
    