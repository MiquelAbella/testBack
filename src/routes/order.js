const express = require("express");
const app = express();

const router = express.Router();

const {
    addNewOrder,allOrders, updateOrder, orderFinished, deleteOrder
} = require("../controllers/OrderController");

router.post("/add-new-order", addNewOrder);
router.get("/orders", allOrders);
router.patch("/update-order", updateOrder);
router.patch("/order-finished", orderFinished);
router.delete("/delete-order/:id", deleteOrder);

// router.get("/:id", getGif);
// router.get("/search/:query", searchGifs);
// router.patch("/update-gif", updateGif);
// router.delete("/delete-gif/:id", deleteGif);

module.exports = router;