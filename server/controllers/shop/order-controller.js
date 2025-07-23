const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// 创建订单（点击 Checkout 即可）
const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty.",
      });
    }

    const cartItems = cart.items.map((item) => ({
      productId: item.productId,
      title: item.title,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const newOrder = new Order({
      userId,
      cartItems,
      totalAmount,
      orderStatus: "confirmed",
    });

    await newOrder.save();

    // 扣库存
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { totalStock: -item.quantity },
      });
    }

    // 清空购物车
    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (e) {
    console.error("❌ Order create error:", e);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// 查询用户订单
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUser,
};
