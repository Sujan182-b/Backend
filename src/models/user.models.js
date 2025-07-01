import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema(
    {
username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true

},
fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
},
avatar:{
    type:String,//cloudinary url
    required:true
},
coverImage:{
    type:String,//cloudnary url

},
watchHistory:{
    type:Schema.Types.ObjectId,
    ref:"Video"
},
password:{
    type:String,
    required:[true,'Password is required']
}
},
{timestamps:true});
userSchema.pre("save" ,async function(next){
    if(!this.isModified("password"))return next();
    this.password = bcrypt.hash(this.password,10)

});
userSchema.methods.isPasswordCorrect = async function(password){
return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAcessToken = function(){
return jwt.sign(
    {
    _id:this._id,
    email:this.email,
    username:this.username,
    fullname:this.fullname
},
process.env.ACESS_TOKEN_SCERET,
{
    expiresIn:process.env.ACESS_TOKEN_EXPIRY
}
)
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
    {
    _id:this._id,
},
process.env.REFERSH_TOKEN_SCERET,
{
    expiresIn:process.env.REFERSH_TOKEN_EXPIRY,
}
)
}
export const User = mongoose.model('User',userSchema)