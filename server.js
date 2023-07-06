const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload')

const customerRouter = require("./src/routes/customer");
const orderRouter = require("./src/routes/order");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp',
    limits: { fileSize: 10000000 }, // 10MB max
    abortOnLimit: true
}));

app.use("/customer", customerRouter);
app.use("/order", orderRouter);

module.exports = app;
