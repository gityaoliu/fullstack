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
    productCode: "P002",
    image: "https://example.com/red-french-tips.jpg"
  },
  {
    title: "Minimalist Black Nails",
    description: "Simple and elegant black manicure",
    category: "Minimalist",
    brand: ["Black Collection"],
    price: 18,
    salePrice: 15,
    totalStock: 60,
    productCode: "P003", 
    image: "https://example.com/minimalist-black.jpg"
  },
  {
    title: "Gold Glitter Party Nails",
    description: "Sparkly gold glitter for special occasions",
    category: "Luxury & Glitter",
    brand: ["Yellow Collection"],
    price: 35,
    salePrice: 0,
    totalStock: 30,
    productCode: "P004",
    image: "https://example.com/gold-glitter.jpg"
  },
  {
    title: "Dark Gothic Nails",
    description: "Edgy dark design with gothic elements",
    category: "Dark & Edgy", 
    brand: ["Black Collection"],
    price: 28,
    salePrice: 22,
    totalStock: 35,
    productCode: "P005",
    image: "https://example.com/gothic-nails.jpg"
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