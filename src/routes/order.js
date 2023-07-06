const express = require("express");
const app = express();

const router = express.Router();

const {
    addNewOrder,allOrders, updateOrder
} = require("../controllers/OrderController");

router.post("/add-new-order", addNewOrder);
router.get("/orders", allOrders);
router.patch("/update-order", updateOrder);
// router.get("/:id", getGif);
// router.get("/search/:query", searchGifs);
// router.patch("/update-gif", updateGif);
// router.delete("/delete-gif/:id", deleteGif);

module.exports = router;