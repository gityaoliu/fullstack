import img1 from "../../assets/banner.jpg";
import img2 from "../../assets/banner2.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useNavigate } from "react-router-dom";

const images = [img1, img2];

function ShoppingCheckout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const totalCartAmount =
    cartItems?.items?.reduce((sum, item) => {
      const price = item?.salePrice > 0 ? item.salePrice : item.price;
      return sum + price * item.quantity;
    }, 0) || 0;

  const handlePlaceOrder = () => {
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      orderStatus: "confirmed",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData)).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Order created successfully!" });
        navigate("/shop/account");
      } else {
        toast({ title: "Failed to create order", variant: "destructive" });
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden transition-all duration-500">
        <img
          src={images[currentIndex]}
          className="h-full w-full object-cover object-center"
          alt="Promo Banner"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <div className="flex flex-col gap-4 col-span-full">
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item, idx) => (
              <UserCartItemsContent key={idx} cartItem={item} />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button onClick={handlePlaceOrder} className="w-full">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
