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

    // 构建聚合管道
    let pipeline = [];

    // 1. 匹配过滤条件
    if (Object.keys(filters).length > 0) {
      pipeline.push({ $match: filters });
    }

    // 2. 添加有效价格字段（如果有sale price就用sale price，否则用price）
    pipeline.push({
      $addFields: {
        effectivePrice: {
          $cond: {
            if: { $and: [{ $ne: ["$salePrice", null] }, { $gt: ["$salePrice", 0] }] },
            then: "$salePrice",
            else: "$price"
          }
        }
      }
    });

    // 3. 根据sortBy参数添加排序
    let sortStage = {};
    
    switch (sortBy) {
      case "price-lowtohigh":
        sortStage = { effectivePrice: 1 };
        break;
      case "price-hightolow":
        sortStage = { effectivePrice: -1 };
        break;
      case "title-atoz":
        sortStage = { title: 1 };
        break;
      case "title-ztoa":
        sortStage = { title: -1 };
        break;
      default:
        sortStage = { effectivePrice: 1 };
        break;
    }

    pipeline.push({ $sort: sortStage });

    // 4. 移除临时字段
    pipeline.push({
      $project: {
        effectivePrice: 0
      }
    });

    const products = await Product.aggregate(pipeline);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
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
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { addProduct, getFilteredProducts, getProductDetails };
