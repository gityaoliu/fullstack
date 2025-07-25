const express = require("express");
const Coupon = require("../../models/Coupon");
const router = express.Router();

// 验证优惠码（前端用户调用）
router.post("/validate", async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.json({ success: false, message: "Invalid coupon code" });
        }

        if (coupon.expireAt && new Date() > new Date(coupon.expireAt)) {
            return res.json({ success: false, message: "Coupon has expired" });
        }

        res.json({ 
            success: true, 
            coupon: {
                code: coupon.code,
                discountType: coupon.discountType,
                value: coupon.value
            }
        });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error validating coupon" });
    }
});

module.exports = router; 