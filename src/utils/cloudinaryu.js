import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
const uploadOnCloudinary = async (localfilepath) => {
    try{
        if (!localfilepath) return null
        const response=await cloudinary.uploader.upload(localfilepath, {
            resource_type:"auto"
        })
         console.log("file is successfully uploaded on cloudinary.")
        return response;
    }
    catch(error){
        fs.unlinkSync(localfilepath)//remove locally save temp file when upload is failed
        return null
    }
    }
    cloudinary.uploader.upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
       export {uploadOnCloudinary}