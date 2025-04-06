import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'

// const connectCloudinary = async()=>{
//     cloudinary.config({
//         cloud_name :process.env.CLOUDINARY_NAME ,
//         api_key:process.env.CLOUDINARY_API_KEY,
//         api_secret:process.env.CLOUDINARY_SECRET_KEY
//     })
// }

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const connectCloudinary = () => {
  console.log('Cloudinary connected ✅');
};

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'prescripto',
//       allowedFormats:["png","jpg","jpeg","pdf"], // supports promises as well
    
//     },
//   });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "prescripto", // Folder name in your Cloudinary account
    allowedFormats:["png","jpg","jpeg","pdf"], 
    public_id: (req, file) => Date.now(), // Generate unique public IDs
  },
});

export const upload = multer({ storage });


  // export default {connectCloudinary,storage,upload}


  