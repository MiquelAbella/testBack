const ProductModel = require("../models/ProductModel");
const fs = require("fs-extra");
const { uploadImage } = require("../cloudinary/cloudinary");

const addProduct = async (req,res)=> {
    const {image} = req.files
    const resultImage = await uploadImage(image.tempFilePath);
    await fs.unlink(image.tempFilePath);
  
    try {
       const newProduct = new ProductModel({...req.body, image:resultImage.secure_url})
       await newProduct.save()
       return res.status(200).json({ok:true, newProduct})
    } catch (error) {
       console.log(error)
       return res.status(503).json({ok:false, msg:"something wrong"})
    }
  }

  const allProducts = async (req,res) => {
    try {
      const products = await ProductModel.find({})
      res.status(200).send({ok:true, products}) 
    } catch (error) {
      console.log(error)
      res.status(500).send({ok:false, msg:"something wrong"})
    }
  }

  module.exports = {
    addProduct,
    allProducts
    // allCustomer
  };
  