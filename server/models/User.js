const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // 限定角色值只能是 user 或 admin
    default: 'user',          // 默认为 user
  },
}, {
  timestamps: true           // 建议加上时间戳，可记录用户创建与更新时间
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
