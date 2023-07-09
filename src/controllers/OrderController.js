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
        const newOrderWithCustomer = await newOrder.populate("customerId")
        return res.status(200).json({ok:true, newOrder:newOrderWithCustomer, foundCustomer})
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
   console.log(estado);
 
   try {
     const orderChanged = await OrderModel.findOneAndUpdate(
       { _id: orderId, "order._id": newValue._id },
       {
         $set: {
           "order.$.cantidad": cantidad,
           "order.$.estado": estado,
           "order.$.producto": producto,
         },
         finished: newValue.finished
       },
       { new: true }
     ).populate("customerId");
     
     console.log(orderChanged)
     
     return res.status(200).json({ ok: true, orderChanged });
   } catch (error) {
     console.log(error);
     return res
       .status(303)
       .json({ ok: false, msg: "Something happened", error: error });
   }
 };

const orderFinished = async (req, res) => {
   const { newValue, orderId } = req.body;
   const { order, finished, customer } = newValue;
   order.map((ord) => {
    return {...ord, estado: "finished"}})
    console.log(newValue,order)

   try {
     const orderChanged = await OrderModel.findOneAndUpdate(
       { _id: orderId } , {order:order, finished: finished, customer:customer} , { new: true }
     ).populate("customerId");
     return res.status(200).json({ ok: true, orderChanged });
   } catch (error) {
     console.log(error);
     return res
       .status(303)
       .json({ ok: false, msg: "Something happened", error: error });
   }
 };
 
 const deleteOrder = async (req, res) => {
    const {id} = req.params
    try {
      const deletedOrder = await OrderModel.findByIdAndDelete(id)
      return res.status(200).json({ok:true, id})
    } catch (error) {
      console.log(error)
      return res.status(303).json({ok:false, msg:"something wrong"})
      
    }
     


 }




module.exports = {
    addNewOrder,
    allOrders,
    updateOrder,
    orderFinished,
    deleteOrder
};
