const express = require("express");
const app = express();

const router = express.Router();

const {
addCustomer,
allCustomer
} = require("../controllers/CustomerControllers");

router.post("/add-new-customer", addCustomer);
router.get("/customers", allCustomer);
// router.post("/add-gif", addGif);
// router.get("/:id", getGif);
// router.get("/search/:query", searchGifs);
// router.patch("/update-gif", updateGif);
// router.delete("/delete-gif/:id", deleteGif);

module.exports = router;