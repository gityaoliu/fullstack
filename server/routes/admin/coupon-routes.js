const express = require("express");
const Coupon = require("../../models/Coupon");
const router = express.Router();

// 创建优惠码
router.post("/create", async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json({ success: true, coupon });
    } catch (e) {
        res.status(500).json({ success: false, message: "Failed to create coupon", error: e });
    }
});

// 验证优惠码（前端调用）
router.post("/validate", async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon.findOne({ code, isActive: true });

        if (!coupon) {
            return res.json({ success: false, message: "Invalid or expired coupon" });
        }

        if (new Date() > new Date(coupon.expiresAt)) {
            return res.json({ success: false, message: "Coupon expired" });
        }

        res.json({ success: true, discount: coupon });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error validating coupon" });
    }
});

module.exports = router;