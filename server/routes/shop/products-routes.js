const express = require("express");
const Product = require("../../models/Product");

const {
  addProduct,
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/products-controller");
const { upload } = require("../../helpers/local-upload");

const router = express.Router();

router.post("/add", upload.single("image"), addProduct);
router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

router.post("/add", async (req, res) => {
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
