//this is module type import
//where as commonjs use require
import express from "express"
import mongoose from "mongoose"
import {ENV} from "./config/env.js"
import path from "path"
import { fileURLToPath } from "url"
import db_connect from "./config/db.js"
import cors from "cors"
import {serve} from "inngest/express"
import { inngest,functions } from "./config/inngest.js"
import { clerkMiddleware, requireAuth } from '@clerk/express'
import { protectRoute } from "./middleware/protectedRoute.js"
import routeChat from "./routes/routeChat.js"
import routeSession from "./routes/routeSession.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//middleware
app.use(express.json()) 
app.use(clerkMiddleware()) //this adds auth field to the request req.auth()

//credential true - > the server allow the browser to include cookies on req
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))

app.use("/api/chat",routeChat)
app.use("/api/session",routeSession)


app.use("/api/inngest",serve({client:inngest,functions}))

// when you pass a array of middlewares it auto flattens them and extecute sequentially
app.get("/protected",protectRoute,(req,res)=>{
    const user_id = req.auth;
    res.status(200).json({
        success:true,
        message:"Into the protected route"
    })
})

app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"sever is accessing the api"
    })
})

app.get("/books",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"book endpoint"
    })
})

console.log(ENV.NODE_ENV)
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../../frontend/meet/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../../frontend/meet","dist","index.html"))
    })
    
}

const startServer = async()=>{
    try{
        await db_connect()
        app.listen(ENV.PORT,()=>{console.log("server is running at ",ENV.PORT)})
    }catch(error){
        console.log("server start failed",error.message)
    }
}
startServer()
