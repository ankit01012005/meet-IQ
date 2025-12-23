//this is module type import
//where as commonjs use require

import express from "express"
import mongoose from "mongoose"
import {ENV} from "../src/config/env.js"

const app = express()

app.get("/health",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"sever is accessing the api"
    })
})

app.listen(ENV.PORT,()=>{console.log("server is running at ",ENV.PORT)})