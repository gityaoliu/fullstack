const Product = require("../../models/Product");

// ✅ 添加产品的 API
const addProduct = async (req, res) => {
  try {
    const { title, price, category, brand, image, productCode } = req.body;

    if (!title || !price || !category || !image) {
      return res.status(400).json({ success: false, message: "Missing required fields!" });
    }

    const newProduct = new Product({
      title,
      price,
      category: Array.isArray(category) ? category : [category], // 确保 category 是数组
      brand: Array.isArray(brand) ? brand : [brand], // 确保 brand 是数组
      image,
      productCode,
    });

    await newProduct.save();

    res.status(201).json({ success: true, message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Error adding product", error });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { addProduct, getFilteredProducts, getProductDetails };
