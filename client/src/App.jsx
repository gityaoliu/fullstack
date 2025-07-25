import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingListing from "./pages/shopping-view/listing";
import UpdatePassword from "./pages/shopping-view/update-password";

import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { initializeGuestCart } from "./store/shop/cart-slice";

import SearchProducts from "./pages/shopping-view/search";

import Careers from "./pages/shopping-view/careers";


function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // 只在应用初始化时执行一次checkAuth
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // 当认证状态确定后，初始化游客购物车
    if (!isLoading && !isAuthenticated) {
      dispatch(initializeGuestCart());
    }
  }, [dispatch, isLoading, isAuthenticated]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          
          
          
          
          <Route path="careers" element={<Careers />} />
          <Route path="listing" element={<ShoppingListing />} />
          
          
          
          
          <Route path="search" element={<SearchProducts />} />
          <Route path="update-password" element={<UpdatePassword />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
