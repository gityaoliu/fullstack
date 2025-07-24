const express = require("express");
const Product = require("../../models/Product");
const {
  addProduct,
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/products-controller");

const { authMiddleware, adminOnly } = require("../../middleware/authMiddleware");

const router = express.Router();

// ✅ 所有人都可以获取商品列表和详情
router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

// ✅ 仅 admin 可以添加商品
router.post("/add", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, price, salePrice, category, image, stock, productCode } = req.body;

    const newProduct = new Product({
      name,
      price,
      salePrice,
      category,
      image,
      stock,
      productCode,
    });

    await newProduct.save();
    res.status(201).json({ message: "Add the product successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to add a product", error });
  }
});

module.exports = router;
