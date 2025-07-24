const jwt = require("jsonwebtoken");

// ✅ 用户认证中间件
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded; // 包含 user id、email、role
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or expired. Please log in again.",
    });
  }
};

// ✅ 仅管理员可访问的中间件
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admins only.",
    });
  }
  next();
};

module.exports = { authMiddleware, adminOnly };
