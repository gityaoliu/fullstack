require('dotenv').config();
console.log("🔍 Connecting to MongoDB at:", process.env.MONGO_URI);  //

const path = require("path")
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const adminCouponRouter = require("./routes/admin/coupon-routes");


const commonFeatureRouter = require("./routes/common/feature-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((error) => console.log("❌ MongoDB connection error:", error));

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));// 前端通过访问 /uploads/xxx.jpg 来加载本地图片
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/admin/coupons", adminCouponRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.get("/", (req, res) => {
  res.send("🚀 Server is running on port " + PORT);
});

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));