const cloudinary = require("cloudinary").v2;

const config = require("../config/config")

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true,
});

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "Customer",
    resource_type: "auto",
    height: 300,
    width: 300,
    overwrite: true,
  });
};


const deleteImage = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};



module.exports = { uploadImage, deleteImage };