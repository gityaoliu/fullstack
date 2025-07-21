const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    expireAt: {
        type: Date,
    },
});

module.exports = mongoose.model("Coupon", CouponSchema);