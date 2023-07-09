const { Schema, model } = require("mongoose")


const ProductSchema = Schema({
    product: {
      type: String,
      required: true
    },
    image:{
        type: String,
        required: true
    }
  });

const ProductModel = model("Product", ProductSchema)

module.exports = ProductModel