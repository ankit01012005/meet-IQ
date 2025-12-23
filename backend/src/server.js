//this is module type import
//where as commonjs use require

import express from "express"
import mongoose from "mongoose"
import {ENV} from "../src/config/env.js"
import path from "path"

const app = express()

const __dirname = path.resolve()

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

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/meet/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/meet","dist","index.html"))
    })
}

app.listen(ENV.PORT,()=>{console.log("server is running at ",ENV.PORT)})