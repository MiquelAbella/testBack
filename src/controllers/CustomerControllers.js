const CustomerModel = require("../models/CustomerModel");
const fs = require("fs-extra");
const { uploadImage } = require("../cloudinary/cloudinary");

const addCustomer = async (req,res)=> {
  const {image} = req.files
  const resultImage = await uploadImage(image.tempFilePath);
  await fs.unlink(image.tempFilePath);

  try {
     const newCustomer = new CustomerModel({...req.body, image:resultImage.secure_url})
     await newCustomer.save()
     return res.status(200).json({ok:true, newCustomer})
  } catch (error) {
     console.log(error)
     return res.status(503).json({ok:false, msg:"something wrong"})
  }
}

const allCustomer = async (req,res) => {
  try {
    const customers = await CustomerModel.find({})
    res.status(200).send({ok:true, customers}) 
  } catch (error) {
    console.log(error)
    res.status(500).send({ok:false, msg:"something wrong"})
  }
}



module.exports = {
  addCustomer,
  allCustomer
};
