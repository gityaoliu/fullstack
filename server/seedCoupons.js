require('dotenv').config();
const mongoose = require("mongoose");
const Coupon = require("./models/Coupon");

// 使用与server.js相同的MongoDB连接
console.log("🔍 Connecting to MongoDB at:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected for seeding"))
  .catch((error) => {
    console.log("❌ MongoDB connection error:", error);
    process.exit(1);
  });

const sampleCoupons = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    value: 10,
    expireAt: new Date("2025-12-31"), // 2025年底过期
  },
  {
    code: "SAVE20",
    discountType: "percentage",
    value: 20,
    expireAt: new Date("2025-06-30"), // 2025年中过期
  },
  {
    code: "NEWUSER",
    discountType: "percentage",
    value: 15,
    expireAt: new Date("2025-12-31"),
  },
  {
    code: "FLAT50",
    discountType: "fixed",
    value: 50,
    expireAt: new Date("2025-12-31"),
  },
  {
    code: "SPRING25",
    discountType: "percentage",
    value: 25,
    expireAt: new Date("2024-05-31"), // 已过期用于测试
  }
];

async function seedCoupons() {
  try {
    console.log("🌱 Starting to seed coupons...");
    
    // 清除现有的优惠码
    await Coupon.deleteMany({});
    console.log("🗑️ Cleared existing coupons");
    
    // 插入新的优惠码
    const insertedCoupons = await Coupon.insertMany(sampleCoupons);
    
    console.log("✅ Coupons seeded successfully:", insertedCoupons.length);
    console.log("🎫 Sample codes created:");
    insertedCoupons.forEach(coupon => {
      console.log(`  - ${coupon.code}: ${coupon.discountType === 'percentage' ? coupon.value + '%' : '$' + coupon.value} off`);
    });
    
    console.log("🎉 Seeding completed!");
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding coupons:", error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// 等待连接建立后再开始种子
mongoose.connection.once('open', () => {
  seedCoupons();
}); 