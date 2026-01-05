import dotenv from "dotenv"
import { app } from "./app.js";
import mongoose from "mongoose";

import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR",error);
        throw error 
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MongoDB Connection failed",err);
    
})


















// import express from "express"

// const app =express()

// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("ERR",error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=.{
//             console.log(`App is listening on port ${PORT}`)
//         })

//     }
//     catch(error){
//         console.error("Error",error)
//         throw err
//     }
// })()