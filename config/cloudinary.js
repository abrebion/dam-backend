const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

// Access to Cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Upload file to Cloudinary account
const storage = cloudinaryStorage({
  cloudinary,
  folder: "dam", // Folder where files will be uploaded
  allowedFormats: ["jpg", "jpeg", "png", "gif", "pdf", "psd", "eps", "ai"], // To be updated
  params: {
    ressource_type: "raw" // Required if uploading media types other than images (video, audio...)
  }
  // The file on Cloudinary would have the same name as the original file name
  // filename: function(req, file, cb) {
  //   cb(null, file.originalname);
  // }
});

// Middleware designed to parse file from requests and associate to req.file
const fileUploader = multer({ storage });

module.exports = fileUploader;
