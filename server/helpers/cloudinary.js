// helpers/cloudinary.js
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// ✅ 1. Cloudinary 配置
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// ✅ 2. 使用内存存储的 Multer（用于上传 buffer）
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ 3. 接收 base64 string 并上传到 Cloudinary
const imageUploadUtil = async (base64String) => {
  return await cloudinary.uploader.upload(base64String, {
    folder: "products", // ✅ 建议加一个文件夹
    resource_type: "image", // 或 "auto"
  });
};

module.exports = {
  upload,
  imageUploadUtil,
};
