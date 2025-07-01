import express from "express"
const app =express();
import cors from "cors"
import cookieParser from "cookie-parser";

app.use(cors({
    origin:process.env.CORCS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:'126kb'}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//Route import:
import userRouter from "./routes/user.route.js"

//route decleare:
//app.use("/users" ,userRouter)

app.use('/api/v1/users',userRouter)

//now url look like this https://localhost:8000/api/v1/users/register
//how the url looks loke like https://localhost:8000/users/register  and that users is called prefix


export {app}