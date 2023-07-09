const express = require("express");
const app = express();

const router = express.Router();

const {
    addProduct,
    allProducts
} = require("../controllers/ProductControllers");

router.post("/add-new-product", addProduct);
router.get("/products", allProducts);

module.exports = router;