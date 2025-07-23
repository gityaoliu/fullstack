const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.get("/list/:userId", getAllOrdersByUser);

module.exports = router;
