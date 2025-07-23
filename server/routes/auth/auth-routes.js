const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const User = require("../../models/User"); // 确保引入 User 模型
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-password/:id", authMiddleware, updatePassword);

// ✅ 添加获取所有用户的 API
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 检查是否登录
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;

