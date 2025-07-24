import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import QuantitySelector from "../shopping-view/quantity-selector";

function ProductTile({
  product,
  isAdmin = false,
  handleAddToCart,
  onEditClick,
  handleDelete,
  handleGetProductDetails,
}) {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // 检查商品是否在购物车中
  const cartItem = cartItems?.items?.find(item => item.productId === product?._id);
  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;

  // 处理数量变更
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      // 如果数量为0，相当于从购物车删除
      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: product?._id,
          quantity: 0,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Product removed from cart",
          });
        }
      });
    } else {
      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: product?._id,
          quantity: newQuantity,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart updated successfully",
          });
        }
      });
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      {/* 点击整个卡片可查看商品详情 */}
      <div onClick={() => handleGetProductDetails?.(product?._id)}>
        <div className="relative">
          <img
            src={product?.image || "/nail.png"}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
            onError={(e) => (e.target.src = "/nail.png")}
          />

          {/* 库存/打折徽章 */}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500">Out Of Stock</Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-pink-500">Sale</Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-muted-foreground">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex-col gap-2">
        {/* 购物车按钮或数量选择器 */}
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">Out Of Stock</Button>
        ) : isInCart ? (
          <QuantitySelector
            quantity={cartQuantity}
            onQuantityChange={handleQuantityChange}
            maxStock={product?.totalStock}
          />
        ) : (
          <Button
            onClick={() => handleAddToCart?.(product?._id, product?.totalStock)}
            className="w-full bg-[#EF4DA2] hover:bg-[#D63D90] text-white font-semibold"
          >
            Add to cart
          </Button>
        )}

        {/* ✅ 只有 admin 显示 Edit / Delete */}
        {isAdmin && (
          <div className="flex justify-between w-full gap-2">
            <Button
              variant="outline"
              className="w-1/2 text-sm"
              onClick={() => onEditClick?.(product)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              className="w-1/2 text-sm"
              onClick={() => handleDelete?.(product?._id)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductTile;
