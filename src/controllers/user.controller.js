import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apierror.js";
import User from "../models/Usered.models.js"
import {apiResponse} from "../utils/apiResponse.js"
import {uploadonCloudinary} from "../utils/cloudinary.js"
const registerUser = asyncHandler(async (req,res)=>{
    // get user details from fortend
    //validation -not empty
    //check user if already exists :username or email
    //check for images ,check for avatar
    //upload them in cloudnairy,avatar
    //craete user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

   const {username,email,fullname,password} = req.body;
//   if(fullname===""){
//     throw new ApiError(400,"Full name is required")
//   }
if(
    [fullname,username,email,password].some((field)=>
    field?.trim() ==="")
){
    throw new ApiError(400,"All this field is required")
}
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
if (!emailRegex.test(email)) {
  throw new ApiError(400, "Invalid email format");
}
//begginer check:
// if (!email.includes("@") || !email.includes(".")) {   
//   throw new Error("Email must contain @ and .");
// }

const exitedUser=User.findOne({
    $or:[{username},{email}]
})
if(exitedUser){
    throw ApiError(409,"User with email or username already existed")
}
const avatarLocalpath =req.files?.avatar[0]?.path;
const coverImage=req.files?.coverImage[0]?.path;
if(!avatarLocalpath){
    throw new ApiError(400,"Avatar is needed")
}
const avatar =await uploadonCloudinary(avatarLocalpath)
const coverImages =await uploadonCloudinary(coverImage)

if(!avatar){
       throw new ApiError(400,"Avatar is needed");
}
const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImages?.url || "",
    email,
    password,
    username:username.toLowerCase()
})
 const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
 )
 if(!createdUser){
    throw new ApiError(500,"Something went wrong while registring a user")
 }
 
 return res.status(201).json(
    new apiResponse(200,createdUser,"User register sucessfully")
 )

})

export {registerUser};