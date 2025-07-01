//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDb from "./db/index.js";
import {app} from './app.js'
 dotenv.config({
    path:'./.env'
 })
connectDb()
.then(()=>{
   app.listen(process.env.PORT ||8000,()=>{
      console.log('Server is running in Port 8000')
   } )
})
.catch((err)=>{
   console.log('Mongodb databsae connection failed',err)
})

   
// import express from 'express'
// const app = express();
// ;(async ()=>{
//     try{
// await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
// app.on("error",(err)=>{
// console.log("Error",err);
// throw err;
// })
// app.listen(process.env.PORT,()=>{
//     console.log(`Your app is running in ${PORT}`)
// })
//     }catch(error){
// console.log("ERROR:",error)
// throw error
//     }
// })