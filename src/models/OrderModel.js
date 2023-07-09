const { Schema, model } = require("mongoose")


const OrderSchema = Schema({
    customer: {
      type: String,
      required: true
    },
    order: [
      {
        producto: {
          type: String,
          required: true
        },
        estado: {
          type: String,
          enum: ['finished', 'notFinished'],
          required: true
        },
        cantidad: {
          type: Number,
          required: true
        }
      }
    ],
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer"
    },
    finished: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  });

const OrderModel = model("Order", OrderSchema)

module.exports = OrderModel