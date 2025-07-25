const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: {
      type: [String], // 原来是 String，现在改成数组
      required: true,
    },
    price: Number,
    salePrice: Number,
    totalStock: Number,
    productCode: String,
  });

module.exports = mongoose.model("Product", ProductSchema);
