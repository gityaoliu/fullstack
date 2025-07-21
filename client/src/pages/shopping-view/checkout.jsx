import Address from "@/components/shopping-view/address";
import img1 from "../../assets/banner.jpg";
import img2 from "../../assets/banner2.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";


const images = [img1, img2];

function ShoppingCheckout() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 每4秒切换一张

    return () => clearInterval(interval);
  }, []);

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountData, setDiscountData] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleCopy() {
    navigator.clipboard.writeText("WELCOME10").then(() => {
      toast({ title: "Coupon copied to clipboard!" });
    });
  }

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  const discountedTotal = discountData
    ? discountData.discountType === "percentage"
      ? totalCartAmount * (1 - discountData.value / 100)
      : totalCartAmount - discountData.value
    : totalCartAmount;

  function applyCoupon() {
    axios
      .post("http://localhost:8000/api/admin/coupons/validate", { code: couponCode })
      .then((res) => {
        if (res.data.success) {
          setDiscountData(res.data.discount);
          toast({ title: "Coupon applied!" });
        } else {
          toast({ title: res.data.message, variant: "destructive" });
        }
      });
  }

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: discountedTotal,
      discountInfo: discountData,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log("✅ createNewOrder 返回值：", data);
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden transition-all duration-500">
        <img
          src={images[currentIndex]}
          className="h-full w-full object-cover object-center"
          alt="Promo Banner"
        />

        {/* Only show button if it's the SAVE10 banner */}
        {currentIndex === 1 && (
          <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 text-center">
            <button
              onClick={handleCopy}
              className="bg-gradient-to-r from-pink-200 via-purple-200 to-yellow-100 
              text-purple-800 font-semibold text-sm px-6 py-2 rounded-xl 
              shadow-lg border border-white/60 backdrop-blur-md 
              hover:brightness-105 transition-all duration-300"
            >
              Copy Code: WELCOME10
            </button>
          </div>
        )}

      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
              <UserCartItemsContent cartItem={item} />
            ))
            : null}
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button onClick={applyCoupon}>Apply</Button>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                ${discountedTotal.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;