import { v2 as cloud} from "cloudinary";
import fs from "fs"


cloud.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});
const uploadonCloudinary = async (localFilepath)=>{
    try{
        if(!localFilepath)return null
        //upload the file
        const res= await cloud.uploader.upload(localFilepath,{
            resource_type:"auto"
        })
//file has been uploaded sucessfully
console.log("File has been upload sucessfully" ,res.url)
return res;
    }catch(err){
        fs.unlinkSync(localFilepath)//remove the locallly save the tempeorary file 
        return null;
    }
}

// cloud.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     {public_id :'olympic_flag'},
// function(error,result){console.log(result)}
// )


export {uploadonCloudinary}