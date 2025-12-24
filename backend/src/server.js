//this is module type import
//where as commonjs use require
import express from "express"
import mongoose from "mongoose"
import {ENV} from "./config/env.js"
import path from "path"
import { fileURLToPath } from "url"
import db_connect from "./config/db.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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