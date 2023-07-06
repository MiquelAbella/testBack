const { Schema, model } = require("mongoose")

const CustomerSchema = Schema({
    customer:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    tfno:{
        type: String,
        required: true
    },
    cif:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

const CustomerModel = model("Customer", CustomerSchema)

module.exports = CustomerModel