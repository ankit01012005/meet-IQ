import mongoose from "mongoose"
import {ENV} from "../config/env.js"

const db_connect = async ()=>{

    if(!ENV.DB_URL){
        console.log(ENV)
        console.log("undefined DB_URL")
        process.exit(1)

    }
    try{
        const conn = await mongoose.connect(ENV.DB_URL,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        console.log("Connected to DB",conn.connection.host)

    }catch(error){
        console.log("Faild DB connection",error)
        process.exit(1)

    }
        
}
export default db_connect
