import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useToast } from "../ui/use-toast";
import UserCartItemsContent from "./cart-items-content";
import { validateCoupon, removeCoupon, clearCouponMessage } from "@/store/shop/cart-slice";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  
  const { appliedCoupon, couponDiscount, couponMessage, isValidatingCoupon } = useSelector(
    (state) => state.shopCart
  );

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // 计算应用优惠码后的最终金额
  const finalAmount = totalCartAmount - couponDiscount;

  const handleApplyCoupon = async () => {
    if (!promoCode.trim()) {
      toast({
        title: "Please enter a promotion code",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await dispatch(validateCoupon({ code: promoCode.trim() })).unwrap();
      if (result.success) {
        toast({
          title: "Coupon applied successfully!",
          description: `You saved ${result.coupon.discountType === 'percentage' ? result.coupon.value + '%' : '$' + result.coupon.value}`,
        });
        setPromoCode("");
      } else {
        toast({
          title: "Invalid coupon",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply coupon. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    toast({
      title: "Coupon removed",
    });
  };

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
          : null}
      </div>
      
      {/* Promotion Code Section */}
      <div className="mt-6 border-t pt-4">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Have a promotion code?</h4>
          
          {!appliedCoupon ? (
            <div className="flex gap-2">
              <Input
                placeholder="Enter promotion code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
              />
              <Button
                onClick={handleApplyCoupon}
                disabled={isValidatingCoupon || !promoCode.trim()}
                size="sm"
              >
                {isValidatingCoupon ? "Applying..." : "Apply"}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Code: {appliedCoupon.code}
                </p>
                <p className="text-xs text-green-600">
                  Discount: {appliedCoupon.discountType === 'percentage' 
                    ? `${appliedCoupon.value}%` 
                    : `$${appliedCoupon.value}`}
                </p>
              </div>
              <Button
                onClick={handleRemoveCoupon}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Subtotal</span>
          <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
        </div>
        
        {appliedCoupon && couponDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({appliedCoupon.code})</span>
            <span>-${couponDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-lg border-t pt-2">
          <span className="font-bold">Total</span>
          <span className="font-bold">${finalAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
