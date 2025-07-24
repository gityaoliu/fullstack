const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// 注册
const registerUser = async (req, res) => {
  const { userName, email, password, role } = req.body;

  try {
    // 检查是否已存在
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with this email. Please try again.",
      });
    }

    // 密码加密
    const hashPassword = await bcrypt.hash(password, 12);

    // 创建用户（允许传入 role，默认为 user）
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      role: role || "user",
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// 登录
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist. Please register first.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // 生成 JWT
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // 设置 cookie 并返回包含角色的用户信息
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// 登出
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// 鉴权中间件
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
    req.user = decoded; // 包含 role
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

// 更新密码
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // 从中间件获取用户ID

  try {
    // 查找用户
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // 验证旧密码
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkOldPassword) {
      return res.json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // 加密新密码
    const hashNewPassword = await bcrypt.hash(newPassword, 12);

    // 更新密码
    user.password = hashNewPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  updatePassword,
};
