const CustomerModel = require("../models/CustomerModel");
const fs = require("fs-extra");
const { uploadImage } = require("../cloudinary/cloudinary");
const OrderModel = require("../models/OrderModel")

const addNewOrder = async (req, res) => {
    const {customer, order, finished} = req.body
    console.log(req.body)
    
     try {
         const foundCustomer = await CustomerModel.findOne({customer})
         
        const newOrder = new OrderModel({customer, order, customerId:foundCustomer._id, finished})
        await newOrder.save()
        return res.status(200).json({ok:true, newOrder, foundCustomer})
     } catch (error) {
        console.log(error)
        return res.status(503).json({ok:false, msg:"something wrong"})
     }
}

const allOrders = async (req, res) => {
   try {
      const orders = await OrderModel.find({}).populate("customerId")
      console.log(orders)
      return res.status(200).send({ok:true, orders})
   } catch (error) {
      return res.status(503).send({ok:false, msg:"something wrong"})
   }
}

const updateOrder = async (req, res) => {
   const { newValue, orderId } = req.body;
   const { cantidad, estado, producto } = newValue;
   console.log(newValue);
 
   try {
     const orderChanged = await OrderModel.findOneAndUpdate(
       { _id: orderId, "order._id": newValue._id }, // Agrega la condición del ID del producto
       {
         $set: {
           "order.$.cantidad": cantidad,
           "order.$.estado": estado,
           "order.$.producto": producto,
         },
       },
       { new: true }
     );
     return res.status(200).json({ ok: true, orderChanged });
   } catch (error) {
     console.log(error);
     return res
       .status(303)
       .json({ ok: false, msg: "Something happened", error: error });
   }
 };
 
 module.exports = updateOrder;

module.exports = {
    addNewOrder,
    allOrders,
    updateOrder
};
