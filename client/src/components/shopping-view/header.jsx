import { Hand, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import nailcodeLogo from "../../assets/nailcodeLogo.png";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { Input } from "@/components/ui/input"; 

function MenuItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);

  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  useEffect(() => {
    if (keyword.trim().length > 2) {
      dispatch(getSearchResults(keyword.trim()));
    } else {
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch]);

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row relative">

      {/* 🔍 搜索框 */}
      <div className="relative w-full max-w-xs">
        <Input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="h-8 w-[200px]"
        />

        {/* 搜索结果浮层 */}
        {keyword.trim().length > 2 && searchResults.length > 0 && (
          <div className="absolute top-10 left-0 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-y-auto">
            {searchResults.map((item) => (
              <div
                key={item._id}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setKeyword("");
                  navigate(`/shop/listing?productId=${item._id}`);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// 右侧内容组件
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

    // 计算总价
  const totalPrice = cartItems?.items?.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    const price = item.price || 0;
    return sum + quantity * price;
  }, 0) ?? 0;

  // 格式化为两位小数的价格数字
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* 💰 显示总价 */}
      <span className="text-sm font-semibold text-muted-foreground">
        {formattedTotalPrice}
      </span>
      {/* 购物车图标 🛒 */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {/* 数量 */}
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>



          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

{/* 下拉菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/auth/update-password")}>
            <UserCog className="mr-2 h-4 w-4" />
            Update Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);



  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
    <img src={nailcodeLogo} alt="NailCode Logo" className="h-16 w-19 rounded" />
    <span className="font-bold text-lg"></span>
        </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <MenuItems />
              <HeaderRightContent />
            </SheetContent>
          </Sheet>

          <div className="flex-1 flex justify-center lg:justify-start">
            <MenuItems />
          </div>

          <div className="flex-shrink-0">
            <HeaderRightContent />
          </div>
        </div>
      </header>
    </>
  );
}

export default ShoppingHeader;
