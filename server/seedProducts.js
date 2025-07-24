const mongoose = require("mongoose");
const Product = require("./models/Product");
require('dotenv').config();

const sampleProducts = [
  {
    title: "Red Rose Nail Design",
    description: "Beautiful red rose pattern nail art",
    category: "Trendy Styles",
    brand: ["Red Collection"],
    price: 25,
    salePrice: 20,
    totalStock: 50,
    averageReview: 4.5,
    productCode: "P001",
    image: "https://example.com/red-rose-nail.jpg"
  },
  {
    title: "Classic Red French Tips",
    description: "Elegant red French tip manicure",
    category: "French Tips", 
    brand: ["Red Collection"],
    price: 30,
    salePrice: 25,
    totalStock: 40,
    averageReview: 4.8,
    productCode: "P002",
    image: "https://example.com/red-french-tips.jpg"
  },
  {
    title: "Black Diamond Glitter",
    description: "Stunning black glitter with diamond accents",
    category: "Luxury & Glitter",
    brand: ["Black Collection"],
    price: 35,
    salePrice: 30,
    totalStock: 30,
    averageReview: 4.6,
    productCode: "P003",
    image: "https://example.com/black-diamond.jpg"
  },
  {
    title: "Blue Ocean Wave",
    description: "Ocean-inspired blue wave nail design",
    category: "Trendy Styles",
    brand: ["Blue Collection"],
    price: 28,
    totalStock: 45,
    averageReview: 4.7,
    productCode: "P004",
    image: "https://example.com/blue-ocean.jpg"
  },
  {
    title: "Green Forest Minimalist",
    description: "Simple green forest themed nails",
    category: "Minimalist",
    brand: ["Green Collection"],
    price: 22,
    totalStock: 60,
    averageReview: 4.4,
    productCode: "P005",
    image: "https://example.com/green-forest.jpg"
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 清除现有产品
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // 添加示例产品
    await Product.insertMany(sampleProducts);
    console.log("Sample products added successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts(); 